// Case Management Routes
// Following v2.0 Architecture requirements for case lifecycle management

import { Router } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { prisma } from '../utils/database';
import { logger } from '../utils/logger';
import { config } from '../config/environment';
import { rateLimit } from '../middleware/rate-limit';
import { validateRequest } from '../middleware/validation';
import { authenticateJWT } from '../middleware/auth';
import { CaseService } from '../services/case-service';
import { NotificationService } from '../services/notification-service';
import { z } from 'zod';

const router = Router();
const caseService = new CaseService();
const notificationService = new NotificationService();

// ===== VALIDATION SCHEMAS =====
const createCaseSchema = z.object({
  // Patient information (for temporary cases before registration)
  firstName: z.string().min(1).max(50),
  middleName: z.string().max(50).optional(),
  lastName: z.string().min(1).max(50),
  dateOfBirth: z.string().datetime(),
  email: z.string().email(),
  phone: z.string().optional(),
  
  // Case details
  title: z.string().max(200).optional(),
  description: z.string().max(2000).optional(),
  chiefComplaint: z.string().max(500).optional(),
  category: z.enum(['ONCOLOGY', 'CARDIOLOGY', 'NEUROLOGY', 'ORTHOPEDICS', 'DERMATOLOGY', 'RADIOLOGY', 'PATHOLOGY', 'GENERAL_MEDICINE', 'PEDIATRICS', 'SURGERY', 'OTHER']),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']).default('NORMAL'),
  urgencyReason: z.string().max(500).optional(),
  
  // Medical context
  medicalHistory: z.array(z.object({
    condition: z.string(),
    diagnosedDate: z.string().optional(),
    notes: z.string().optional(),
  })).optional(),
  currentMedications: z.array(z.object({
    name: z.string(),
    dosage: z.string().optional(),
    frequency: z.string().optional(),
    startDate: z.string().optional(),
  })).optional(),
  allergies: z.array(z.object({
    allergen: z.string(),
    reaction: z.string().optional(),
    severity: z.enum(['MILD', 'MODERATE', 'SEVERE']).optional(),
  })).optional(),
  familyHistory: z.array(z.object({
    relation: z.string(),
    condition: z.string(),
    ageAtDiagnosis: z.number().optional(),
  })).optional(),
  
  // Metadata
  tags: z.array(z.string()).optional(),
});

const updateCaseSchema = z.object({
  title: z.string().max(200).optional(),
  description: z.string().max(2000).optional(),
  chiefComplaint: z.string().max(500).optional(),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']).optional(),
  urgencyReason: z.string().max(500).optional(),
  tags: z.array(z.string()).optional(),
});

// ===== CREATE CASE =====
router.post('/',
  rateLimit({ maxRequests: 10, windowMs: 3600000 }), // 10 cases per hour
  async (req, res) => {
    try {
      const validatedData = createCaseSchema.parse(req.body);
      
      // Generate unique case number
      const caseNumber = await caseService.generateCaseNumber();
      
      // Extract customer ID from JWT or create temporary case
      const customerId = req.user?.customerId;
      
      if (customerId) {
        // Authenticated user - create permanent case
        const newCase = await caseService.createCase({
          ...validatedData,
          customerId,
          caseNumber,
          status: 'SUBMITTED',
        });
        
        // Send notifications
        await notificationService.notifyCaseCreated(newCase.id, customerId);
        
        logger.info('Case created successfully:', { 
          caseId: newCase.id, 
          caseNumber: newCase.caseNumber,
          customerId 
        });
        
        res.status(201).json({
          success: true,
          case: newCase,
          message: 'Case created successfully',
        });
        
      } else {
        // Anonymous user - create temporary case submission
        const tempSubmission = await caseService.createTempCaseSubmission(validatedData, req.ip);
        
        res.status(201).json({
          success: true,
          submissionToken: tempSubmission.submissionToken,
          expiresAt: tempSubmission.expiresAt,
          message: 'Case submitted. Please register to continue with your case.',
        });
      }
      
    } catch (error) {
      logger.error('Error creating case:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors,
        });
      }
      
      res.status(500).json({
        error: 'Failed to create case',
      });
    }
  }
);

// ===== GET CASES (LIST) =====
router.get('/',
  authenticateJWT,
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('status').optional().isIn(['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_ANALYSIS', 'AWAITING_PROFESSIONAL', 'PROFESSIONAL_REVIEWING', 'COMPLETED', 'ON_HOLD', 'CANCELLED', 'EXPIRED']),
  query('category').optional(),
  query('search').optional().isLength({ max: 100 }),
  validateRequest,
  async (req, res) => {
    try {
      const { page = 1, limit = 20, status, category, search } = req.query;
      const customerId = req.user.customerId;
      
      if (!customerId) {
        return res.status(403).json({
          error: 'Customer access required',
        });
      }
      
      const filters = {
        customerId,
        status: status as string,
        category: category as string,
        search: search as string,
      };
      
      const result = await caseService.getCases(
        filters,
        Number(page),
        Number(limit)
      );
      
      res.json({
        success: true,
        ...result,
      });
      
    } catch (error) {
      logger.error('Error getting cases:', error);
      res.status(500).json({
        error: 'Failed to retrieve cases',
      });
    }
  }
);

// ===== GET CASE BY ID =====
router.get('/:id',
  authenticateJWT,
  param('id').isUUID(),
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;
      const customerId = req.user.customerId;
      
      const caseData = await caseService.getCaseById(id, customerId);
      
      if (!caseData) {
        return res.status(404).json({
          error: 'Case not found',
        });
      }
      
      res.json({
        success: true,
        case: caseData,
      });
      
    } catch (error) {
      logger.error('Error getting case:', error);
      res.status(500).json({
        error: 'Failed to retrieve case',
      });
    }
  }
);

// ===== GET CASE BY CASE NUMBER =====
router.get('/number/:caseNumber',
  authenticateJWT,
  param('caseNumber').matches(/^CASE-\d+-[A-Z0-9]+$/),
  validateRequest,
  async (req, res) => {
    try {
      const { caseNumber } = req.params;
      const customerId = req.user.customerId;
      
      const caseData = await caseService.getCaseByCaseNumber(caseNumber, customerId);
      
      if (!caseData) {
        return res.status(404).json({
          error: 'Case not found',
        });
      }
      
      res.json({
        success: true,
        case: caseData,
      });
      
    } catch (error) {
      logger.error('Error getting case by number:', error);
      res.status(500).json({
        error: 'Failed to retrieve case',
      });
    }
  }
);

// ===== UPDATE CASE =====
router.put('/:id',
  authenticateJWT,
  param('id').isUUID(),
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;
      const customerId = req.user.customerId;
      
      const validatedData = updateCaseSchema.parse(req.body);
      
      const updatedCase = await caseService.updateCase(id, validatedData, customerId);
      
      if (!updatedCase) {
        return res.status(404).json({
          error: 'Case not found or access denied',
        });
      }
      
      logger.info('Case updated successfully:', { caseId: id, customerId });
      
      res.json({
        success: true,
        case: updatedCase,
        message: 'Case updated successfully',
      });
      
    } catch (error) {
      logger.error('Error updating case:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors,
        });
      }
      
      res.status(500).json({
        error: 'Failed to update case',
      });
    }
  }
);

// ===== CHANGE CASE STATUS =====
router.patch('/:id/status',
  authenticateJWT,
  param('id').isUUID(),
  body('status').isIn(['DRAFT', 'SUBMITTED', 'ON_HOLD', 'CANCELLED']),
  body('reason').optional().isLength({ max: 500 }),
  body('notes').optional().isLength({ max: 1000 }),
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status, reason, notes } = req.body;
      const customerId = req.user.customerId;
      const userId = req.user.userId;
      
      const updatedCase = await caseService.updateCaseStatus(
        id,
        status,
        customerId,
        userId,
        'customer',
        reason,
        notes
      );
      
      if (!updatedCase) {
        return res.status(404).json({
          error: 'Case not found or access denied',
        });
      }
      
      // Send status change notification
      await notificationService.notifyCaseStatusChange(id, status, customerId);
      
      logger.info('Case status changed:', { 
        caseId: id, 
        newStatus: status, 
        customerId,
        reason 
      });
      
      res.json({
        success: true,
        case: updatedCase,
        message: 'Case status updated successfully',
      });
      
    } catch (error) {
      logger.error('Error updating case status:', error);
      res.status(500).json({
        error: 'Failed to update case status',
      });
    }
  }
);

// ===== GET CASE STATUS HISTORY =====
router.get('/:id/status-history',
  authenticateJWT,
  param('id').isUUID(),
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;
      const customerId = req.user.customerId;
      
      const statusHistory = await caseService.getCaseStatusHistory(id, customerId);
      
      if (!statusHistory) {
        return res.status(404).json({
          error: 'Case not found or access denied',
        });
      }
      
      res.json({
        success: true,
        statusHistory,
      });
      
    } catch (error) {
      logger.error('Error getting case status history:', error);
      res.status(500).json({
        error: 'Failed to retrieve status history',
      });
    }
  }
);

// ===== CONVERT TEMP SUBMISSION TO CASE =====
router.post('/convert/:token',
  authenticateJWT,
  param('token').isUUID(),
  validateRequest,
  async (req, res) => {
    try {
      const { token } = req.params;
      const customerId = req.user.customerId;
      
      if (!customerId) {
        return res.status(403).json({
          error: 'Customer access required',
        });
      }
      
      const convertedCase = await caseService.convertTempSubmissionToCase(token, customerId);
      
      if (!convertedCase) {
        return res.status(404).json({
          error: 'Submission not found or expired',
        });
      }
      
      // Send notifications
      await notificationService.notifyCaseCreated(convertedCase.id, customerId);
      
      logger.info('Temp submission converted to case:', { 
        caseId: convertedCase.id,
        token,
        customerId 
      });
      
      res.status(201).json({
        success: true,
        case: convertedCase,
        message: 'Case created successfully from submission',
      });
      
    } catch (error) {
      logger.error('Error converting temp submission:', error);
      res.status(500).json({
        error: 'Failed to convert submission to case',
      });
    }
  }
);

// ===== GET CASE STATISTICS =====
router.get('/stats/summary',
  authenticateJWT,
  async (req, res) => {
    try {
      const customerId = req.user.customerId;
      
      if (!customerId) {
        return res.status(403).json({
          error: 'Customer access required',
        });
      }
      
      const stats = await caseService.getCaseStatistics(customerId);
      
      res.json({
        success: true,
        statistics: stats,
      });
      
    } catch (error) {
      logger.error('Error getting case statistics:', error);
      res.status(500).json({
        error: 'Failed to retrieve statistics',
      });
    }
  }
);

export { router as caseRoutes };