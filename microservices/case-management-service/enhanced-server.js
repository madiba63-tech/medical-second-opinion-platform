const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { body, validationResult, param } = require('express-validator');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const winston = require('winston');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { PrismaClient } = require('../../src/generated/prisma');

const app = express();
const PORT = 3002;
const JWT_SECRET = process.env.JWT_SECRET || (() => {
  console.error('⚠️  CRITICAL: JWT_SECRET not set in environment variables');
  process.exit(1);
})();

// Initialize Prisma Client
const prisma = new PrismaClient();

// Configure Winston logger for healthcare compliance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format((info) => {
      // Sanitize PHI from logs
      if (info.message) {
        info.message = info.message.replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN-REDACTED]');
        info.message = info.message.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL-REDACTED]');
      }
      return info;
    })()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new winston.transports.File({ 
      filename: 'logs/case-management-audit.log',
      level: 'info'
    })
  ],
});

// Rate limiting for API protection
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});

const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // limit each IP to 20 file uploads per hour
  message: {
    success: false,
    error: 'Too many file uploads, please try again later.',
    code: 'UPLOAD_RATE_LIMIT_EXCEEDED'
  }
});

// Configure multer for secure file uploads
const path = require('path');
const crypto = require('crypto');

// Create secure upload directory
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '../../uploads/medical-documents');
const fs = require('fs');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true, mode: 0o700 });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (req, file, cb) => {
      // Generate secure filename with UUID and timestamp
      const secureFilename = `${Date.now()}-${crypto.randomUUID()}-${path.extname(file.originalname)}`;
      cb(null, secureFilename);
    }
  }),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB for medical documents
    files: 10 // Max 10 files per upload
  },
  fileFilter: (req, file, cb) => {
    // Stricter file type validation
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/tiff',
      'image/tif',
      'text/plain',
      'application/dicom'
    ];
    
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.tiff', '.tif', '.txt', '.dcm'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(file.mimetype) && allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${file.mimetype}. Only medical document formats are allowed.`));
    }
  }
});

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Apply rate limiting
app.use(apiLimiter);

// Configure CORS securely for healthcare environment
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000', 'http://localhost:3006'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing with healthcare document size limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logging middleware (PHI-safe)
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  next();
});

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Removed verbose logging that could leak sensitive information

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

    logger.info(`[CASES] New case created: ${newCase.caseNumber} by user ${req.user.userId}, assigned to talent pool: ${talentPool}`);

    res.status(201).json({
      success: true,
      message: 'Case created successfully',
      data: {
        case: newCase
      }
    });

  } catch (error) {
    logger.error('[CASES] Case creation error:', error);
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
    
    // Get case from database
    const case_ = await prisma.medicalCase.findUnique({
      where: { 
        id: id,
        customerId: req.user.userId 
      },
      include: {
        uploadedFiles: {
          orderBy: { createdAt: 'desc' }
        },
        statusHistory: {
          orderBy: { createdAt: 'desc' }
        },
        assignments: {
          where: { isActive: true }
        }
      }
    });
    
    if (!case_) {
      return res.status(404).json({
        success: false,
        error: 'Case not found',
        code: 'CASE_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      data: {
        case: case_,
        documents: case_.uploadedFiles,
        statusHistory: case_.statusHistory,
        assignments: case_.assignments
      }
    });

  } catch (error) {
    logger.error('[CASES] Error fetching case:', error);
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
    
    // Get current case from database
    const oldCase = await prisma.medicalCase.findUnique({
      where: { 
        id: id,
        customerId: req.user.userId 
      }
    });
    
    if (!oldCase) {
      return res.status(404).json({
        success: false,
        error: 'Case not found',
        code: 'CASE_NOT_FOUND'
      });
    }

    const updates = { ...req.body };
    
    // Set special timestamps based on status changes
    if (updates.status && updates.status !== oldCase.status) {
      if (updates.status === 'SUBMITTED' && !oldCase.submittedAt) {
        updates.submittedAt = new Date();
      }
      if (updates.status === 'COMPLETED' && !oldCase.completedAt) {
        updates.completedAt = new Date();
      }
      if (updates.status === 'UNDER_REVIEW' && !oldCase.reviewStartedAt) {
        updates.reviewStartedAt = new Date();
      }
    }

    // Increment version
    updates.version = oldCase.version + 1;
    
    // Update the case in database
    const updatedCase = await prisma.medicalCase.update({
      where: { id: id },
      data: updates
    });

    // Track status changes in history
    if (updates.status && updates.status !== oldCase.status) {
      await createStatusHistoryEntry(id, oldCase.status, updates.status, 'Status updated by user', req.user.userId);
    }

    logger.info(`[CASES] Case updated: ${updatedCase.caseNumber} by user ${req.user.userId}`);

    res.json({
      success: true,
      message: 'Case updated successfully',
      data: {
        case: updatedCase
      }
    });

  } catch (error) {
    logger.error('[CASES] Error updating case:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'CASE_UPDATE_ERROR'
    });
  }
});

// Upload documents to a case
app.post('/api/v1/cases/:id/documents', authenticateToken, uploadLimiter, upload.array('files', 10), [
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

    logger.info(`[CASES] ${uploadedDocuments.length} documents uploaded to case ${case_.caseNumber}`);

    res.status(201).json({
      success: true,
      message: `${uploadedDocuments.length} document(s) uploaded successfully`,
      data: {
        documents: uploadedDocuments
      }
    });

  } catch (error) {
    logger.error('[CASES] Document upload error:', error);
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
    
    // Get case from database
    const case_ = await prisma.medicalCase.findUnique({
      where: { 
        id: id,
        customerId: req.user.userId 
      },
      include: {
        uploadedFiles: true
      }
    });
    
    if (!case_) {
      return res.status(404).json({
        success: false,
        error: 'Case not found',
        code: 'CASE_NOT_FOUND'
      });
    }

    // Check if case can be submitted
    if (case_.status !== 'DRAFT') {
      return res.status(400).json({
        success: false,
        error: 'Case can only be submitted from DRAFT status',
        code: 'INVALID_STATUS_TRANSITION'
      });
    }

    // Check if case has required documents (basic validation)
    if (case_.uploadedFiles.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one document is required to submit a case',
        code: 'DOCUMENTS_REQUIRED'
      });
    }

    // Update case status in database
    const oldStatus = case_.status;
    const submittedAt = new Date();
    
    const updatedCase = await prisma.medicalCase.update({
      where: { id: id },
      data: {
        status: 'SUBMITTED',
        submittedAt: submittedAt,
        version: case_.version + 1
      }
    });

    // Create status history entry
    await createStatusHistoryEntry(id, oldStatus, 'SUBMITTED', 'Case submitted for review', req.user.userId);

    logger.info(`[CASES] Case submitted: ${case_.caseNumber} by user ${req.user.userId}`);

    res.json({
      success: true,
      message: 'Case submitted successfully',
      data: {
        case: updatedCase,
        submittedAt: submittedAt
      }
    });

  } catch (error) {
    logger.error('[CASES] Case submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'CASE_SUBMISSION_ERROR'
    });
  }
});

// Get case statistics for the user
app.get('/api/v1/cases/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get total counts
    const totalCases = await prisma.medicalCase.count({
      where: { customerId: userId }
    });
    
    const totalDocuments = await prisma.uploadedFile.count({
      where: {
        case: {
          customerId: userId
        }
      }
    });

    // Get cases by status
    const casesByStatus = await prisma.medicalCase.groupBy({
      by: ['status'],
      where: { customerId: userId },
      _count: { id: true }
    });

    // Get cases by category
    const casesByCategory = await prisma.medicalCase.groupBy({
      by: ['category'],
      where: { customerId: userId },
      _count: { id: true }
    });

    // Get recent activity
    const recentActivity = await prisma.medicalCase.findMany({
      where: { customerId: userId },
      select: {
        id: true,
        caseNumber: true,
        title: true,
        status: true,
        updatedAt: true
      },
      orderBy: { updatedAt: 'desc' },
      take: 5
    });

    // Transform data for response
    const statusStats = {};
    const categoryStats = {};
    
    casesByStatus.forEach(item => {
      statusStats[item.status] = item._count.id;
    });
    
    casesByCategory.forEach(item => {
      categoryStats[item.category] = item._count.id;
    });

    const stats = {
      totalCases,
      totalDocuments,
      casesByStatus: statusStats,
      casesByCategory: categoryStats,
      recentActivity
    };

    res.json({
      success: true,
      data: {
        stats,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    logger.error('[CASES] Error fetching stats:', error);
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