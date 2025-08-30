const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { body, validationResult, param } = require('express-validator');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('../../src/generated/prisma');

const app = express();
const PORT = 3002;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-for-development-only';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow common medical document types
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/tiff', 'text/plain'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPEG, PNG, TIFF, and TXT files are allowed.'));
    }
  }
});

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3006'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log(`[AUTH] Token verification attempt - Header: ${authHeader ? 'present' : 'missing'}`);
  console.log(`[AUTH] Token: ${token ? token.substring(0, 20) + '...' : 'null'}`);
  console.log(`[AUTH] JWT_SECRET: ${JWT_SECRET.substring(0, 20)}...`);

  if (!token) {
    console.log('[AUTH] No token provided');
    return res.status(401).json({ 
      success: false, 
      error: 'Access token required',
      code: 'TOKEN_REQUIRED'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(`[AUTH] Token verification failed: ${err.message}`);
      return res.status(403).json({ 
        success: false, 
        error: 'Invalid or expired token',
        code: 'TOKEN_INVALID'
      });
    }
    
    console.log(`[AUTH] Token verified successfully for user: ${decoded.userId}`);
    req.user = decoded;
    next();
  });
};

// Database connection established above with Prisma Client
// Initialize demo data if needed
async function initializeDemoData() {
  try {
    const caseCount = await prisma.medicalCase.count();
    if (caseCount === 0) {
      console.log('No cases found in database - ready for new submissions');
    }
  } catch (error) {
    console.log('Demo data initialization:', error.message);
  }
}

initializeDemoData();

// Utility functions
const generateCaseNumber = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `CASE-${timestamp}-${random}`;
};

// Talent Pool Assignment Logic
const generateTalentPool = (category, professionalLevel) => {
  return `${category}_${professionalLevel}`;
};

const createStatusHistoryEntry = async (caseId, fromStatus, toStatus, reason, changedBy) => {
  const historyEntry = await prisma.caseStatusHistory.create({
    data: {
      id: uuidv4(),
      caseId,
      fromStatus,
      toStatus,
      reason,
      notes: null,
      changedByType: 'customer', // In production, determine from token
      changedById: changedBy
    }
  });
  return historyEntry;
};

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const totalCases = await prisma.medicalCase.count();
    const totalDocuments = await prisma.uploadedFile.count();
    const activeAssignments = await prisma.caseAssignment.count({
      where: { status: { in: ['assigned', 'in_progress'] } }
    });

    res.json({
      status: 'healthy',
      service: 'case-management-service',
      version: '2.0.0',
      features: ['case-creation', 'document-upload', 'case-tracking', 'assignments', 'talent-pools'],
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      stats: {
        totalCases,
        totalDocuments,
        activeAssignments
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: 'Database connection failed',
      timestamp: new Date().toISOString()
    });
  }
});

// Service info endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Case Management Service',
    version: '2.0.0',
    description: 'Medical case creation, document handling, and lifecycle management',
    endpoints: {
      health: '/health',
      authTest: 'GET /api/v1/auth/test',
      createCase: 'POST /api/v1/cases',
      getCases: 'GET /api/v1/cases',
      getCase: 'GET /api/v1/cases/{id}',
      updateCase: 'PUT /api/v1/cases/{id}',
      uploadDocument: 'POST /api/v1/cases/{id}/documents',
      getDocuments: 'GET /api/v1/cases/{id}/documents'
    },
    status: 'operational',
    timestamp: new Date().toISOString()
  });
});

// Debug endpoint to test authentication
app.get('/api/v1/auth/test', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Authentication successful',
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

// Create a new case
app.post('/api/v1/cases', authenticateToken, [
  body('title').notEmpty().withMessage('Case title is required'),
  body('description').notEmpty().withMessage('Case description is required'),
  body('category').isIn(['ONCOLOGY', 'CARDIOLOGY', 'NEUROLOGY', 'ORTHOPEDICS', 'DERMATOLOGY', 'RADIOLOGY', 'PATHOLOGY', 'GENERAL_MEDICINE', 'PEDIATRICS', 'SURGERY', 'OTHER']).withMessage('Invalid case category'),
  body('requestedProfessionalLevel').isIn(['JUNIOR', 'SENIOR', 'EXPERT', 'DISTINGUISHED']).withMessage('Valid professional experience level is required'),
  body('priority').optional().isIn(['LOW', 'NORMAL', 'HIGH', 'URGENT']),
  body('firstName').notEmpty().withMessage('Patient first name is required'),
  body('lastName').notEmpty().withMessage('Patient last name is required'),
  body('dateOfBirth').isISO8601().withMessage('Valid date of birth is required'),
  body('email').isEmail().withMessage('Valid email is required')
], async (req, res) => {
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

    const {
      title,
      description,
      chiefComplaint,
      category,
      requestedProfessionalLevel,
      priority = 'NORMAL',
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      email,
      phone,
      medicalHistory,
      currentMedications,
      allergies,
      familyHistory,
      urgencyReason
    } = req.body;

    // Generate talent pool assignment
    const talentPool = generateTalentPool(category, requestedProfessionalLevel);

    // Create new case in database
    const newCase = await prisma.medicalCase.create({
      data: {
        id: uuidv4(),
        caseNumber: generateCaseNumber(),
        customerId: req.user.userId,
        firstName,
        middleName: middleName || null,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        email,
        phone: phone || null,
        title,
        description,
        chiefComplaint: chiefComplaint || null,
        category,
        requestedProfessionalLevel,
        talentPool,
        medicalHistory: medicalHistory || null,
        currentMedications: currentMedications || null,
        allergies: allergies || null,
        familyHistory: familyHistory || null,
        status: 'DRAFT',
        priority,
        urgencyReason: urgencyReason || null,
        submittedAt: null,
        reviewStartedAt: null,
        completedAt: null,
        expiresAt: null,
        assignedProfessionalId: null,
        assignedAt: null,
        qualityScore: null,
        completenessScore: null,
        metadata: {},
        tags: [],
        version: 1
      }
    });

    // Create initial status history entry
    await createStatusHistoryEntry(newCase.id, null, 'DRAFT', 'Case created', req.user.userId);

    console.log(`[CASES] New case created: ${newCase.caseNumber} by user ${req.user.userId}, assigned to talent pool: ${talentPool}`);

    res.status(201).json({
      success: true,
      message: 'Case created successfully',
      data: {
        case: newCase
      }
    });

  } catch (error) {
    console.error('[CASES] Case creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during case creation',
      code: 'CASE_CREATION_ERROR'
    });
  }
});

// Get all cases for the authenticated user
app.get('/api/v1/cases', authenticateToken, async (req, res) => {
  try {
    const { status, category, priority, page = 1, limit = 10 } = req.query;
    
    // Build where clause for filtering
    const whereClause = {
      customerId: req.user.userId,
      ...(status && { status: status.toUpperCase() }),
      ...(category && { category: category.toUpperCase() }),
      ...(priority && { priority: priority.toUpperCase() })
    };

    // Get total count for pagination
    const total = await prisma.medicalCase.count({
      where: whereClause
    });

    // Get paginated cases
    const paginatedCases = await prisma.medicalCase.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      },
      skip: (page - 1) * parseInt(limit),
      take: parseInt(limit)
    });

    res.json({
      success: true,
      data: {
        cases: paginatedCases,
        pagination: {
          total: total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / limit)
        },
        filters: {
          status,
          category,
          priority
        }
      }
    });

  } catch (error) {
    console.error('[CASES] Error fetching cases:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'CASES_FETCH_ERROR'
    });
  }
});

// Get a specific case by ID
app.get('/api/v1/cases/:id', authenticateToken, [
  param('id').isUUID().withMessage('Valid case ID is required')
], (req, res) => {
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

    const { id } = req.params;
    
    const case_ = cases.find(c => c.id === id && c.customerId === req.user.userId);
    
    if (!case_) {
      return res.status(404).json({
        success: false,
        error: 'Case not found',
        code: 'CASE_NOT_FOUND'
      });
    }

    // Get related documents
    const caseDocuments = documents.filter(d => d.caseId === id);
    
    // Get status history
    const statusHistory = caseStatusHistory.filter(h => h.caseId === id);
    
    // Get assignments
    const assignments = caseAssignments.filter(a => a.caseId === id);

    res.json({
      success: true,
      data: {
        case: case_,
        documents: caseDocuments,
        statusHistory: statusHistory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        assignments: assignments.filter(a => a.isActive)
      }
    });

  } catch (error) {
    console.error('[CASES] Error fetching case:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'CASE_FETCH_ERROR'
    });
  }
});

// Update a case
app.put('/api/v1/cases/:id', authenticateToken, [
  param('id').isUUID().withMessage('Valid case ID is required'),
  body('title').optional().notEmpty(),
  body('description').optional().notEmpty(),
  body('status').optional().isIn(['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_ANALYSIS', 'AWAITING_PROFESSIONAL', 'PROFESSIONAL_REVIEWING', 'COMPLETED', 'ON_HOLD', 'CANCELLED', 'EXPIRED'])
], (req, res) => {
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

    const { id } = req.params;
    const caseIndex = cases.findIndex(c => c.id === id && c.customerId === req.user.userId);
    
    if (caseIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Case not found',
        code: 'CASE_NOT_FOUND'
      });
    }

    const oldCase = { ...cases[caseIndex] };
    const updates = req.body;
    
    // Update the case
    cases[caseIndex] = {
      ...cases[caseIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
      version: cases[caseIndex].version + 1
    };

    // Track status changes
    if (updates.status && updates.status !== oldCase.status) {
      createStatusHistoryEntry(id, oldCase.status, updates.status, 'Status updated by user', req.user.userId);
      
      // Set special timestamps
      if (updates.status === 'SUBMITTED' && !cases[caseIndex].submittedAt) {
        cases[caseIndex].submittedAt = new Date().toISOString();
      }
      if (updates.status === 'COMPLETED' && !cases[caseIndex].completedAt) {
        cases[caseIndex].completedAt = new Date().toISOString();
      }
    }

    console.log(`[CASES] Case updated: ${cases[caseIndex].caseNumber} by user ${req.user.userId}`);

    res.json({
      success: true,
      message: 'Case updated successfully',
      data: {
        case: cases[caseIndex]
      }
    });

  } catch (error) {
    console.error('[CASES] Error updating case:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'CASE_UPDATE_ERROR'
    });
  }
});

// Upload documents to a case
app.post('/api/v1/cases/:id/documents', authenticateToken, upload.array('files', 5), [
  param('id').isUUID().withMessage('Valid case ID is required')
], async (req, res) => {
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

    const { id } = req.params;
    const { documentType = 'OTHER', description } = req.body;
    
    // Verify case ownership using database
    const case_ = await prisma.medicalCase.findUnique({
      where: { 
        id: id,
        customerId: req.user.userId // Ensure user owns this case
      }
    });
    if (!case_) {
      return res.status(404).json({
        success: false,
        error: 'Case not found',
        code: 'CASE_NOT_FOUND'
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files uploaded',
        code: 'NO_FILES'
      });
    }

    const uploadedDocuments = [];

    // Process each uploaded file and store in database
    for (const file of req.files) {
      const document = await prisma.uploadedFile.create({
        data: {
          id: uuidv4(),
          caseId: id,
          filename: file.originalname,
          s3Key: file.path, // For now, storing local path
          mimetype: file.mimetype,
          size: file.size,
          category: documentType.toUpperCase(),
          metadata: {
            uploadPath: file.path,
            originalSize: file.size,
            description: description || null
          },
          checksum: null, // Could add file checksum later
          encrypted: false // For now, not encrypted
        }
      });

      uploadedDocuments.push(document);
    }

    console.log(`[CASES] ${uploadedDocuments.length} documents uploaded to case ${case_.caseNumber}`);

    res.status(201).json({
      success: true,
      message: `${uploadedDocuments.length} document(s) uploaded successfully`,
      data: {
        documents: uploadedDocuments
      }
    });

  } catch (error) {
    console.error('[CASES] Document upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during document upload',
      code: 'DOCUMENT_UPLOAD_ERROR'
    });
  }
});

// Get documents for a case
app.get('/api/v1/cases/:id/documents', authenticateToken, [
  param('id').isUUID().withMessage('Valid case ID is required')
], async (req, res) => {
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

    const { id } = req.params;
    
    // Verify case ownership using database
    const case_ = await prisma.medicalCase.findUnique({
      where: { 
        id: id,
        customerId: req.user.userId 
      }
    });
    
    if (!case_) {
      return res.status(404).json({
        success: false,
        error: 'Case not found',
        code: 'CASE_NOT_FOUND'
      });
    }

    // Get documents from database
    const caseDocuments = await prisma.uploadedFile.findMany({
      where: { caseId: id },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: {
        documents: caseDocuments,
        total: caseDocuments.length,
        caseNumber: case_.caseNumber
      }
    });

  } catch (error) {
    console.error('[CASES] Error fetching documents:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'DOCUMENTS_FETCH_ERROR'
    });
  }
});

// Submit case for review
app.post('/api/v1/cases/:id/submit', authenticateToken, [
  param('id').isUUID().withMessage('Valid case ID is required')
], (req, res) => {
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

    const { id } = req.params;
    const caseIndex = cases.findIndex(c => c.id === id && c.customerId === req.user.userId);
    
    if (caseIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Case not found',
        code: 'CASE_NOT_FOUND'
      });
    }

    const case_ = cases[caseIndex];

    // Check if case can be submitted
    if (case_.status !== 'DRAFT') {
      return res.status(400).json({
        success: false,
        error: 'Case can only be submitted from DRAFT status',
        code: 'INVALID_STATUS_TRANSITION'
      });
    }

    // Check if case has required documents (basic validation)
    const caseDocuments = documents.filter(d => d.caseId === id);
    if (caseDocuments.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one document is required to submit a case',
        code: 'DOCUMENTS_REQUIRED'
      });
    }

    // Update case status
    const oldStatus = case_.status;
    cases[caseIndex].status = 'SUBMITTED';
    cases[caseIndex].submittedAt = new Date().toISOString();
    cases[caseIndex].updatedAt = new Date().toISOString();
    cases[caseIndex].version += 1;

    // Create status history entry
    createStatusHistoryEntry(id, oldStatus, 'SUBMITTED', 'Case submitted for review', req.user.userId);

    console.log(`[CASES] Case submitted: ${case_.caseNumber} by user ${req.user.userId}`);

    res.json({
      success: true,
      message: 'Case submitted successfully',
      data: {
        case: cases[caseIndex],
        submittedAt: cases[caseIndex].submittedAt
      }
    });

  } catch (error) {
    console.error('[CASES] Case submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'CASE_SUBMISSION_ERROR'
    });
  }
});

// Get case statistics for the user
app.get('/api/v1/cases/stats', authenticateToken, (req, res) => {
  try {
    const userCases = cases.filter(c => c.customerId === req.user.userId);
    const userDocuments = documents.filter(d => {
      const case_ = cases.find(c => c.id === d.caseId);
      return case_ && case_.customerId === req.user.userId;
    });

    const stats = {
      totalCases: userCases.length,
      totalDocuments: userDocuments.length,
      casesByStatus: {
        DRAFT: userCases.filter(c => c.status === 'DRAFT').length,
        SUBMITTED: userCases.filter(c => c.status === 'SUBMITTED').length,
        UNDER_REVIEW: userCases.filter(c => c.status === 'UNDER_REVIEW').length,
        COMPLETED: userCases.filter(c => c.status === 'COMPLETED').length,
        CANCELLED: userCases.filter(c => c.status === 'CANCELLED').length
      },
      casesByCategory: {},
      recentActivity: userCases
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 5)
        .map(c => ({
          id: c.id,
          caseNumber: c.caseNumber,
          title: c.title,
          status: c.status,
          updatedAt: c.updatedAt
        }))
    };

    // Calculate cases by category
    const categories = ['ONCOLOGY', 'CARDIOLOGY', 'NEUROLOGY', 'ORTHOPEDICS', 'DERMATOLOGY', 'RADIOLOGY', 'PATHOLOGY', 'GENERAL_MEDICINE', 'PEDIATRICS', 'SURGERY', 'OTHER'];
    categories.forEach(category => {
      stats.casesByCategory[category] = userCases.filter(c => c.category === category).length;
    });

    res.json({
      success: true,
      data: {
        stats,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('[CASES] Error fetching stats:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'STATS_FETCH_ERROR'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('[CASES] Unhandled error:', error);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File too large',
        message: 'File size must be less than 10MB',
        code: 'FILE_TOO_LARGE'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        error: 'Too many files',
        message: 'Maximum 5 files can be uploaded at once',
        code: 'TOO_MANY_FILES'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    code: 'INTERNAL_ERROR',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: `${req.method} ${req.originalUrl} not found`,
    code: 'ENDPOINT_NOT_FOUND'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`📋 Case Management Service v2.0 running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📁 Case management endpoints available at /api/v1/cases/*`);
  console.log(`📤 Document upload support enabled`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Case Management Service shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Case Management Service shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});