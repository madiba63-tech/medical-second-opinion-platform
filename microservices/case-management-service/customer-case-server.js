const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { body, param, query, validationResult } = require('express-validator');
const winston = require('winston');
const axios = require('axios');
const { PrismaClient } = require('../../src/generated/prisma');

// Initialize services
const app = express();
const PORT = process.env.PORT || 3002;
const JWT_SECRET = process.env.JWT_SECRET || 'second-opinion-jwt-secret-2025';
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public';
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || 'http://localhost:3008';
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005';
const WORKFLOW_SERVICE_URL = process.env.WORKFLOW_SERVICE_URL || 'http://localhost:3010';

// Initialize Prisma client
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ],
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required',
      code: 'TOKEN_MISSING'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Token verification failed:', error);
    return res.status(403).json({
      success: false,
      error: 'Invalid or expired token',
      code: 'TOKEN_INVALID'
    });
  }
};

// Optional authentication middleware
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      logger.warn('Optional auth token invalid:', error.message);
    }
  }
  next();
};

// Utility Functions
const generateCaseNumber = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CASE-${timestamp}-${random}`;
};

const determineCategory = (aiAnalysis, questionnaireType) => {
  if (questionnaireType === 'COMPREHENSIVE') {
    return 'ONCOLOGY';
  }
  
  if (aiAnalysis?.recommendedSpecialty === 'oncology') {
    return 'ONCOLOGY';
  } else if (aiAnalysis?.recommendedSpecialty === 'cardiology') {
    return 'CARDIOLOGY';
  } else if (aiAnalysis?.recommendedSpecialty === 'neurology') {
    return 'NEUROLOGY';
  }
  
  return 'GENERAL_MEDICINE';
};

const determinePriority = (urgencyLevel, aiAnalysis) => {
  if (urgencyLevel === 'emergency') {
    return 'CRITICAL';
  } else if (urgencyLevel === 'urgent' || aiAnalysis?.medicalComplexity === 'high') {
    return 'HIGH';
  } else if (urgencyLevel === 'moderate') {
    return 'NORMAL';
  }
  return 'LOW';
};

const notifyService = async (url, payload, authToken) => {
  try {
    await axios.post(url, payload, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });
  } catch (error) {
    logger.error(`Failed to notify service ${url}:`, error.message);
  }
};

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'operational',
    service: 'customer-case-management-service',
    version: '1.0.0',
    features: [
      'case-creation',
      'case-submission',
      'case-tracking',
      'status-management',
      'customer-dashboard',
      'payment-integration',
      'workflow-automation'
    ],
    endpoints: {
      health: '/health',
      createCase: 'POST /api/v1/cases',
      getCase: 'GET /api/v1/cases/:id',
      listCases: 'GET /api/v1/cases',
      updateCase: 'PUT /api/v1/cases/:id',
      submitCase: 'POST /api/v1/cases/:id/submit',
      getCaseStatus: 'GET /api/v1/cases/:id/status',
      dashboard: 'GET /api/v1/dashboard'
    },
    caseStatuses: ['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'OPINION_DELIVERED', 'COMPLETED', 'CANCELLED'],
    priorities: ['LOW', 'NORMAL', 'HIGH', 'CRITICAL'],
    categories: ['GENERAL_MEDICINE', 'ONCOLOGY', 'CARDIOLOGY', 'NEUROLOGY'],
    timestamp: new Date().toISOString()
  });
});

// ==============================================
// CASE CREATION & MANAGEMENT
// ==============================================

// Create Case from Temp Session
app.post('/api/v1/cases', [
  body('tempSessionId').isUUID(),
  body('personalInfo').isObject(),
  body('personalInfo.firstName').isLength({ min: 2, max: 50 }).trim(),
  body('personalInfo.lastName').isLength({ min: 2, max: 50 }).trim(),
  body('personalInfo.dateOfBirth').isISO8601(),
  body('personalInfo.email').isEmail().normalizeEmail(),
  body('personalInfo.phone').optional().isMobilePhone()
], authenticateToken, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array(),
        code: 'VALIDATION_ERROR'
      });
    }

    if (req.user.type !== 'customer') {
      return res.status(403).json({
        success: false,
        error: 'Only customers can create cases',
        code: 'ACCESS_DENIED'
      });
    }

    const { tempSessionId, personalInfo, caseTitle, caseDescription } = req.body;

    // Get temp session data
    const tempSubmission = await prisma.tempSubmission.findFirst({
      where: {
        id: tempSessionId,
        expiresAt: { gte: new Date() }
      }
    });

    if (!tempSubmission) {
      return res.status(404).json({
        success: false,
        error: 'Temporary session not found or expired',
        code: 'TEMP_SESSION_NOT_FOUND'
      });
    }

    const sessionData = tempSubmission.payload;
    const questionnaireResponse = sessionData.questionnaireResponse;
    const uploadedDocuments = sessionData.uploadedDocuments || [];

    if (!questionnaireResponse) {
      return res.status(400).json({
        success: false,
        error: 'Questionnaire response required',
        code: 'QUESTIONNAIRE_MISSING'
      });
    }

    // Extract case details from questionnaire
    const primaryConcern = questionnaireResponse.responses.primary_concern?.answer || '';
    const urgencyLevel = questionnaireResponse.responses.urgency_level?.answer || 'routine';
    
    // Determine case characteristics
    const category = determineCategory(questionnaireResponse.aiAnalysis, questionnaireResponse.type);
    const priority = determinePriority(urgencyLevel, questionnaireResponse.aiAnalysis);
    const professionalLevel = questionnaireResponse.type === 'COMPREHENSIVE' ? 'EXPERT' : 'SENIOR';

    // Generate case number
    const caseNumber = generateCaseNumber();

    // Create medical case
    const medicalCase = await prisma.medicalCase.create({
      data: {
        id: uuidv4(),
        caseNumber,
        customerId: req.user.customerId,
        firstName: personalInfo.firstName,
        middleName: personalInfo.middleName,
        lastName: personalInfo.lastName,
        dateOfBirth: new Date(personalInfo.dateOfBirth),
        email: personalInfo.email,
        phone: personalInfo.phone,
        title: caseTitle || `${questionnaireResponse.type === 'COMPREHENSIVE' ? 'Comprehensive Oncology' : 'Fast-Track'} Second Opinion`,
        description: caseDescription || primaryConcern,
        chiefComplaint: primaryConcern,
        category,
        priority,
        requestedProfessionalLevel: professionalLevel,
        status: 'DRAFT',
        consentAccepted: true,
        metadata: {
          tempSessionId,
          questionnaireType: questionnaireResponse.type,
          aiAnalysis: questionnaireResponse.aiAnalysis,
          urgencyLevel,
          creationSource: 'customer_portal'
        }
      }
    });

    // Create questionnaire response record
    const questionnaireResponseRecord = await prisma.questionnaireResponse.create({
      data: {
        id: uuidv4(),
        caseId: medicalCase.id,
        questionnaireType: questionnaireResponse.type,
        language: (questionnaireResponse.language || 'ENGLISH').toUpperCase(),
        responses: questionnaireResponse.responses,
        aiAnalysis: questionnaireResponse.aiAnalysis,
        completenessScore: questionnaireResponse.completenessScore?.overallCompleteness || 0.8,
        confidence: questionnaireResponse.aiAnalysis?.confidence || 0.85
      }
    });

    // Transfer documents to case
    const transferredDocuments = [];
    for (const doc of uploadedDocuments) {
      const uploadedFile = await prisma.uploadedFile.create({
        data: {
          id: uuidv4(),
          caseId: medicalCase.id,
          filename: doc.filename,
          s3Key: doc.s3Key,
          mimetype: doc.mimetype,
          size: doc.size,
          category: doc.category,
          checksum: doc.checksum,
          encrypted: doc.encrypted,
          metadata: doc.metadata
        }
      });
      transferredDocuments.push(uploadedFile);
    }

    // Create initial status history
    await prisma.caseStatusHistory.create({
      data: {
        id: uuidv4(),
        caseId: medicalCase.id,
        fromStatus: null,
        toStatus: 'DRAFT',
        reason: 'Case created from customer portal',
        notes: `Created from ${questionnaireResponse.type} questionnaire`,
        changedByType: 'customer',
        changedById: req.user.customerId
      }
    });

    // Clean up temp session
    await prisma.tempSubmission.delete({
      where: { id: tempSessionId }
    });

    res.status(201).json({
      success: true,
      message: 'Medical case created successfully',
      data: {
        caseId: medicalCase.id,
        caseNumber: medicalCase.caseNumber,
        title: medicalCase.title,
        category: medicalCase.category,
        priority: medicalCase.priority,
        status: medicalCase.status,
        requestedProfessionalLevel: medicalCase.requestedProfessionalLevel,
        questionnaireResponseId: questionnaireResponseRecord.id,
        documentsTransferred: transferredDocuments.length,
        createdAt: medicalCase.createdAt
      }
    });

  } catch (error) {
    logger.error('Case creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create case',
      code: 'CASE_CREATION_ERROR'
    });
  }
});

// Get Case Details
app.get('/api/v1/cases/:caseId', [
  param('caseId').isUUID()
], authenticateToken, async (req, res) => {
  try {
    const { caseId } = req.params;

    const whereClause = { id: caseId };
    
    // If customer, ensure they can only see their own cases
    if (req.user.type === 'customer') {
      whereClause.customerId = req.user.customerId;
    }

    const medicalCase = await prisma.medicalCase.findFirst({
      where: whereClause,
      include: {
        uploadedFiles: {
          select: {
            id: true,
            filename: true,
            category: true,
            mimetype: true,
            size: true,
            createdAt: true
          }
        },
        statusHistory: {
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        questionnaireResponse: true,
        casePayment: true
      }
    });

    if (!medicalCase) {
      return res.status(404).json({
        success: false,
        error: 'Case not found',
        code: 'CASE_NOT_FOUND'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: medicalCase.id,
        caseNumber: medicalCase.caseNumber,
        title: medicalCase.title,
        description: medicalCase.description,
        category: medicalCase.category,
        priority: medicalCase.priority,
        status: medicalCase.status,
        requestedProfessionalLevel: medicalCase.requestedProfessionalLevel,
        patient: {
          firstName: medicalCase.firstName,
          middleName: medicalCase.middleName,
          lastName: medicalCase.lastName,
          dateOfBirth: medicalCase.dateOfBirth,
          email: medicalCase.email,
          phone: medicalCase.phone
        },
        questionnaire: medicalCase.questionnaireResponse ? {
          type: medicalCase.questionnaireResponse.questionnaireType,
          language: medicalCase.questionnaireResponse.language,
          completenessScore: medicalCase.questionnaireResponse.completenessScore,
          confidence: medicalCase.questionnaireResponse.confidence
        } : null,
        documents: medicalCase.uploadedFiles,
        payment: medicalCase.casePayment ? {
          status: medicalCase.casePayment.status,
          amount: medicalCase.casePayment.amount,
          currency: medicalCase.casePayment.currency
        } : null,
        statusHistory: medicalCase.statusHistory,
        createdAt: medicalCase.createdAt,
        updatedAt: medicalCase.updatedAt,
        submittedAt: medicalCase.submittedAt,
        completedAt: medicalCase.completedAt
      }
    });

  } catch (error) {
    logger.error('Case fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch case',
      code: 'CASE_FETCH_ERROR'
    });
  }
});

// List Cases (Customer Dashboard)
app.get('/api/v1/cases', [
  query('status').optional().isString(),
  query('category').optional().isString(),
  query('priority').optional().isString(),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('offset').optional().isInt({ min: 0 })
], authenticateToken, async (req, res) => {
  try {
    const { status, category, priority, limit = 20, offset = 0 } = req.query;

    const whereClause = {};

    // If customer, filter by their cases only
    if (req.user.type === 'customer') {
      whereClause.customerId = req.user.customerId;
    }

    // Apply filters
    if (status) {
      whereClause.status = status.toUpperCase();
    }
    if (category) {
      whereClause.category = category.toUpperCase();
    }
    if (priority) {
      whereClause.priority = priority.toUpperCase();
    }

    const cases = await prisma.medicalCase.findMany({
      where: whereClause,
      include: {
        uploadedFiles: {
          select: {
            id: true,
            category: true
          }
        },
        questionnaireResponse: {
          select: {
            questionnaireType: true,
            completenessScore: true
          }
        },
        casePayment: {
          select: {
            status: true,
            amount: true,
            currency: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    const totalCount = await prisma.medicalCase.count({
      where: whereClause
    });

    res.status(200).json({
      success: true,
      data: {
        cases: cases.map(medicalCase => ({
          id: medicalCase.id,
          caseNumber: medicalCase.caseNumber,
          title: medicalCase.title,
          category: medicalCase.category,
          priority: medicalCase.priority,
          status: medicalCase.status,
          requestedProfessionalLevel: medicalCase.requestedProfessionalLevel,
          documentCount: medicalCase.uploadedFiles.length,
          questionnaireType: medicalCase.questionnaireResponse?.questionnaireType,
          paymentStatus: medicalCase.casePayment?.status,
          createdAt: medicalCase.createdAt,
          submittedAt: medicalCase.submittedAt,
          completedAt: medicalCase.completedAt
        })),
        pagination: {
          total: totalCount,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: totalCount > parseInt(offset) + parseInt(limit)
        }
      }
    });

  } catch (error) {
    logger.error('Case list error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to list cases',
      code: 'CASE_LIST_ERROR'
    });
  }
});

// Submit Case for Review
app.post('/api/v1/cases/:caseId/submit', [
  param('caseId').isUUID()
], authenticateToken, async (req, res) => {
  try {
    const { caseId } = req.params;

    const medicalCase = await prisma.medicalCase.findFirst({
      where: {
        id: caseId,
        ...(req.user.type === 'customer' ? { customerId: req.user.customerId } : {}),
        status: 'DRAFT'
      },
      include: {
        questionnaireResponse: true,
        uploadedFiles: true,
        customer: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    if (!medicalCase) {
      return res.status(404).json({
        success: false,
        error: 'Case not found or not in draft status',
        code: 'CASE_NOT_FOUND'
      });
    }

    // Validate case completeness
    const validationErrors = [];
    
    if (!medicalCase.questionnaireResponse) {
      validationErrors.push('Questionnaire response required');
    }
    
    if (medicalCase.uploadedFiles.length === 0) {
      validationErrors.push('At least one document required');
    }

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Case validation failed',
        details: validationErrors,
        code: 'CASE_VALIDATION_ERROR'
      });
    }

    // Generate payment quote
    let paymentQuote = null;
    try {
      const quoteResponse = await axios.post(
        `${PAYMENT_SERVICE_URL}/api/v1/cases/${caseId}/quote`,
        {
          professionalLevel: medicalCase.requestedProfessionalLevel,
          customerCountry: 'DE', // Default to Germany
          currency: 'EUR',
          urgency: medicalCase.metadata?.urgencyLevel?.toUpperCase() || 'STANDARD'
        },
        {
          headers: {
            'Authorization': req.headers.authorization,
            'Content-Type': 'application/json'
          }
        }
      );

      if (quoteResponse.data.success) {
        paymentQuote = quoteResponse.data.data;
      }
    } catch (paymentError) {
      logger.error('Failed to generate payment quote:', paymentError);
      // Don't fail submission, continue without quote
    }

    // Update case status
    const updatedCase = await prisma.medicalCase.update({
      where: { id: caseId },
      data: {
        status: 'SUBMITTED',
        submittedAt: new Date()
      }
    });

    // Create status history
    await prisma.caseStatusHistory.create({
      data: {
        id: uuidv4(),
        caseId: caseId,
        fromStatus: 'DRAFT',
        toStatus: 'SUBMITTED',
        reason: 'Case submitted for review',
        notes: paymentQuote ? `Payment quote generated: €${paymentQuote.pricing.totalAmount}` : 'Payment quote pending',
        changedByType: 'customer',
        changedById: req.user.customerId
      }
    });

    // Notify workflow service
    const authToken = jwt.sign({ system: true }, JWT_SECRET, { expiresIn: '1h' });
    await notifyService(`${WORKFLOW_SERVICE_URL}/api/v1/cases/${caseId}/events`, {
      eventType: 'case_submitted',
      caseId: caseId,
      data: {
        category: medicalCase.category,
        priority: medicalCase.priority,
        professionalLevel: medicalCase.requestedProfessionalLevel,
        documentCount: medicalCase.uploadedFiles.length
      }
    }, authToken);

    // Send customer notification
    await notifyService(`${NOTIFICATION_SERVICE_URL}/api/v1/notifications/send`, {
      recipient: medicalCase.customer.email,
      type: 'case_submitted',
      template: 'case_submission_confirmation',
      data: {
        customerName: `${medicalCase.customer.firstName} ${medicalCase.customer.lastName}`,
        caseNumber: medicalCase.caseNumber,
        estimatedReviewTime: medicalCase.priority === 'CRITICAL' ? '24 hours' : 
                             medicalCase.priority === 'HIGH' ? '2-3 days' : '3-7 days',
        paymentInfo: paymentQuote ? {
          amount: paymentQuote.pricing.totalAmount,
          currency: paymentQuote.pricing.currency,
          quoteValidUntil: paymentQuote.validUntil
        } : null
      }
    }, authToken);

    res.status(200).json({
      success: true,
      message: 'Case submitted successfully',
      data: {
        caseId: updatedCase.id,
        caseNumber: updatedCase.caseNumber,
        status: updatedCase.status,
        submittedAt: updatedCase.submittedAt,
        paymentQuote: paymentQuote ? {
          quoteId: paymentQuote.quoteId,
          totalAmount: paymentQuote.pricing.totalAmount,
          currency: paymentQuote.pricing.currency,
          validUntil: paymentQuote.validUntil
        } : null
      }
    });

  } catch (error) {
    logger.error('Case submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit case',
      code: 'CASE_SUBMISSION_ERROR'
    });
  }
});

// Update Case
app.put('/api/v1/cases/:caseId', [
  param('caseId').isUUID(),
  body('title').optional().isLength({ min: 5, max: 200 }).trim(),
  body('description').optional().isLength({ min: 10, max: 2000 }).trim(),
  body('chiefComplaint').optional().isLength({ max: 1000 }).trim()
], authenticateToken, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array(),
        code: 'VALIDATION_ERROR'
      });
    }

    const { caseId } = req.params;
    const updateData = req.body;

    const medicalCase = await prisma.medicalCase.findFirst({
      where: {
        id: caseId,
        ...(req.user.type === 'customer' ? { customerId: req.user.customerId } : {}),
        status: { in: ['DRAFT', 'SUBMITTED'] }
      }
    });

    if (!medicalCase) {
      return res.status(404).json({
        success: false,
        error: 'Case not found or cannot be updated',
        code: 'CASE_NOT_FOUND'
      });
    }

    const updatedCase = await prisma.medicalCase.update({
      where: { id: caseId },
      data: {
        ...updateData,
        updatedAt: new Date()
      }
    });

    // Create status history for updates
    await prisma.caseStatusHistory.create({
      data: {
        id: uuidv4(),
        caseId: caseId,
        fromStatus: medicalCase.status,
        toStatus: medicalCase.status,
        reason: 'Case details updated',
        notes: `Updated: ${Object.keys(updateData).join(', ')}`,
        changedByType: req.user.type,
        changedById: req.user.customerId || req.user.adminId || req.user.professionalId
      }
    });

    res.status(200).json({
      success: true,
      message: 'Case updated successfully',
      data: {
        id: updatedCase.id,
        caseNumber: updatedCase.caseNumber,
        title: updatedCase.title,
        description: updatedCase.description,
        chiefComplaint: updatedCase.chiefComplaint,
        updatedAt: updatedCase.updatedAt
      }
    });

  } catch (error) {
    logger.error('Case update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update case',
      code: 'CASE_UPDATE_ERROR'
    });
  }
});

// ==============================================
// CUSTOMER DASHBOARD
// ==============================================

// Customer Dashboard
app.get('/api/v1/dashboard', authenticateToken, async (req, res) => {
  try {
    if (req.user.type !== 'customer') {
      return res.status(403).json({
        success: false,
        error: 'Access denied',
        code: 'ACCESS_DENIED'
      });
    }

    const customerId = req.user.customerId;

    // Get case statistics
    const caseStats = await prisma.medicalCase.groupBy({
      by: ['status'],
      where: { customerId },
      _count: true
    });

    // Get recent cases
    const recentCases = await prisma.medicalCase.findMany({
      where: { customerId },
      include: {
        questionnaireResponse: {
          select: {
            questionnaireType: true
          }
        },
        casePayment: {
          select: {
            status: true,
            amount: true,
            currency: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    // Get active cases (submitted but not completed)
    const activeCases = await prisma.medicalCase.findMany({
      where: {
        customerId,
        status: { in: ['SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS'] }
      },
      include: {
        questionnaireResponse: {
          select: {
            questionnaireType: true
          }
        }
      },
      orderBy: { submittedAt: 'desc' }
    });

    // Get completed cases
    const completedCases = await prisma.medicalCase.findMany({
      where: {
        customerId,
        status: { in: ['OPINION_DELIVERED', 'COMPLETED'] }
      },
      include: {
        questionnaireResponse: {
          select: {
            questionnaireType: true
          }
        }
      },
      orderBy: { completedAt: 'desc' },
      take: 10
    });

    // Calculate total cases
    const totalCases = caseStats.reduce((sum, stat) => sum + stat._count, 0);

    // Group cases by status
    const casesByStatus = caseStats.reduce((acc, stat) => {
      acc[stat.status.toLowerCase()] = stat._count;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalCases,
          activeCases: activeCases.length,
          completedCases: completedCases.length,
          draftCases: casesByStatus.draft || 0
        },
        casesByStatus: {
          draft: casesByStatus.draft || 0,
          submitted: casesByStatus.submitted || 0,
          under_review: casesByStatus.under_review || 0,
          assigned: casesByStatus.assigned || 0,
          in_progress: casesByStatus.in_progress || 0,
          opinion_delivered: casesByStatus.opinion_delivered || 0,
          completed: casesByStatus.completed || 0,
          cancelled: casesByStatus.cancelled || 0
        },
        recentActivity: recentCases.map(medicalCase => ({
          id: medicalCase.id,
          caseNumber: medicalCase.caseNumber,
          title: medicalCase.title,
          status: medicalCase.status,
          category: medicalCase.category,
          priority: medicalCase.priority,
          questionnaireType: medicalCase.questionnaireResponse?.questionnaireType,
          paymentStatus: medicalCase.casePayment?.status,
          createdAt: medicalCase.createdAt,
          submittedAt: medicalCase.submittedAt,
          completedAt: medicalCase.completedAt
        })),
        activeCases: activeCases.map(medicalCase => ({
          id: medicalCase.id,
          caseNumber: medicalCase.caseNumber,
          title: medicalCase.title,
          status: medicalCase.status,
          category: medicalCase.category,
          priority: medicalCase.priority,
          questionnaireType: medicalCase.questionnaireResponse?.questionnaireType,
          submittedAt: medicalCase.submittedAt,
          estimatedCompletion: medicalCase.priority === 'CRITICAL' ? 
            new Date(Date.now() + 24 * 60 * 60 * 1000) :
            medicalCase.priority === 'HIGH' ? 
              new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) :
              new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })),
        completedCases: completedCases.map(medicalCase => ({
          id: medicalCase.id,
          caseNumber: medicalCase.caseNumber,
          title: medicalCase.title,
          category: medicalCase.category,
          questionnaireType: medicalCase.questionnaireResponse?.questionnaireType,
          completedAt: medicalCase.completedAt
        }))
      }
    });

  } catch (error) {
    logger.error('Dashboard fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard data',
      code: 'DASHBOARD_ERROR'
    });
  }
});

// Get Case Status with Timeline
app.get('/api/v1/cases/:caseId/status', [
  param('caseId').isUUID()
], authenticateToken, async (req, res) => {
  try {
    const { caseId } = req.params;

    const medicalCase = await prisma.medicalCase.findFirst({
      where: {
        id: caseId,
        ...(req.user.type === 'customer' ? { customerId: req.user.customerId } : {})
      },
      include: {
        statusHistory: {
          orderBy: { createdAt: 'asc' }
        },
        casePayment: {
          select: {
            status: true,
            amount: true,
            currency: true,
            paymentDate: true
          }
        }
      }
    });

    if (!medicalCase) {
      return res.status(404).json({
        success: false,
        error: 'Case not found',
        code: 'CASE_NOT_FOUND'
      });
    }

    // Create status timeline
    const timeline = medicalCase.statusHistory.map(history => ({
      status: history.toStatus,
      timestamp: history.createdAt,
      reason: history.reason,
      notes: history.notes,
      changedBy: history.changedByType
    }));

    // Determine next steps
    let nextSteps = [];
    switch (medicalCase.status) {
      case 'DRAFT':
        nextSteps = ['Complete questionnaire', 'Upload medical documents', 'Submit case for review'];
        break;
      case 'SUBMITTED':
        nextSteps = ['Payment processing', 'Case review assignment', 'Professional matching'];
        break;
      case 'UNDER_REVIEW':
        nextSteps = ['Document review', 'Professional assignment', 'Case prioritization'];
        break;
      case 'ASSIGNED':
        nextSteps = ['Professional review begins', 'Additional information may be requested'];
        break;
      case 'IN_PROGRESS':
        nextSteps = ['Medical analysis in progress', 'Opinion preparation'];
        break;
      case 'OPINION_DELIVERED':
        nextSteps = ['Review opinion', 'Case completion'];
        break;
    }

    res.status(200).json({
      success: true,
      data: {
        caseId: medicalCase.id,
        caseNumber: medicalCase.caseNumber,
        currentStatus: medicalCase.status,
        priority: medicalCase.priority,
        timeline: timeline,
        nextSteps: nextSteps,
        payment: medicalCase.casePayment,
        estimatedCompletion: medicalCase.priority === 'CRITICAL' ? 
          new Date(Date.now() + 24 * 60 * 60 * 1000) :
          medicalCase.priority === 'HIGH' ? 
            new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) :
            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: medicalCase.createdAt,
        submittedAt: medicalCase.submittedAt,
        completedAt: medicalCase.completedAt
      }
    });

  } catch (error) {
    logger.error('Case status fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch case status',
      code: 'CASE_STATUS_ERROR'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🏥 Customer Case Management Service v1.0 running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 Create case: POST /api/v1/cases`);
  console.log(`👀 Get case: GET /api/v1/cases/:id`);
  console.log(`📋 List cases: GET /api/v1/cases`);
  console.log(`🚀 Submit case: POST /api/v1/cases/:id/submit`);
  console.log(`📊 Dashboard: GET /api/v1/dashboard`);
  console.log(`⏱️ Status tracking: GET /api/v1/cases/:id/status`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});