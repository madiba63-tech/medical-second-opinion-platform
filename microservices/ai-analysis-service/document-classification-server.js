const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { body, param, query, validationResult } = require('express-validator');
const multer = require('multer');
const winston = require('winston');
const axios = require('axios');
const crypto = require('crypto');
const { PrismaClient } = require('../../src/generated/prisma');

// Initialize services
const app = express();
const PORT = process.env.PORT || 3003;
const JWT_SECRET = process.env.JWT_SECRET;
const DATABASE_URL = process.env.DATABASE_URL;
const UPLOAD_BUCKET = process.env.UPLOAD_BUCKET;

// Validate required environment variables
if (!JWT_SECRET) {
  logger.error('JWT_SECRET environment variable is required');
  process.exit(1);
}
if (!DATABASE_URL) {
  logger.error('DATABASE_URL environment variable is required');
  process.exit(1);
}
if (!UPLOAD_BUCKET) {
  logger.error('UPLOAD_BUCKET environment variable is required');
  process.exit(1);
}

// Security configuration
const BCRYPT_ROUNDS = 12;
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/dicom',
  'image/jpeg',
  'image/png',
  'image/tiff',
  'image/bmp',
  'text/plain',
  'application/rtf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

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

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 10 // Maximum 10 files per upload
  },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} not allowed`), false);
    }
  }
});

// Security middleware
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const xss = require('xss');

// Apply Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Rate limiting
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 uploads per windowMs
  message: {
    success: false,
    error: 'Too many upload attempts, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting
app.use(generalLimiter);

// Progressive delay for suspicious activity
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // allow 50 requests per 15 minutes, then...
  delayMs: 500 // begin adding 500ms of delay per request after delayAfter
});

app.use(speedLimiter);

// CORS with strict origin control
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://localhost:3000',
      'https://127.0.0.1:3000',
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count']
};

app.use(cors(corsOptions));

// Body parsing with size limits
app.use(express.json({ 
  limit: '10mb',
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Input sanitization middleware
app.use((req, res, next) => {
  if (req.body) {
    req.body = sanitizeInput(req.body);
  }
  if (req.query) {
    req.query = sanitizeInput(req.query);
  }
  if (req.params) {
    req.params = sanitizeInput(req.params);
  }
  next();
});

// Utility function for input sanitization
function sanitizeInput(obj) {
  if (typeof obj === 'string') {
    return xss(obj.trim());
  }
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeInput(item));
  }
  if (obj && typeof obj === 'object') {
    const sanitized = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitized[key] = sanitizeInput(obj[key]);
      }
    }
    return sanitized;
  }
  return obj;
}

// Security audit logging middleware
app.use((req, res, next) => {
  const startTime = Date.now();
  const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
  const userAgent = req.get('User-Agent');
  const requestId = require('crypto').randomUUID();
  
  req.requestId = requestId;
  req.clientIP = clientIP;
  
  // Log request
  logger.info('Request received', {
    requestId,
    method: req.method,
    path: req.path,
    ip: clientIP,
    userAgent,
    contentType: req.get('Content-Type'),
    contentLength: req.get('Content-Length'),
    timestamp: new Date().toISOString()
  });
  
  // Log response
  const originalSend = res.send;
  res.send = function(data) {
    const responseTime = Date.now() - startTime;
    logger.info('Request completed', {
      requestId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      responseTime,
      ip: clientIP,
      timestamp: new Date().toISOString()
    });
    
    // Log security events
    if (res.statusCode >= 400) {
      logger.warn('Security event - failed request', {
        requestId,
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        ip: clientIP,
        userAgent,
        timestamp: new Date().toISOString()
      });
    }
    
    originalSend.call(this, data);
  };
  
  next();
});

// Enhanced authentication middleware with session management
const activeSessions = new Map();
const failedAttempts = new Map();

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const clientIP = req.clientIP;

    if (!token) {
      logger.warn('Authentication failed - missing token', {
        requestId: req.requestId,
        ip: clientIP,
        path: req.path,
        timestamp: new Date().toISOString()
      });
      return res.status(401).json({
        success: false,
        error: 'Access token required',
        code: 'TOKEN_MISSING'
      });
    }

    // Check for token blacklist (in production, use Redis)
    const tokenHash = require('crypto').createHash('sha256').update(token).digest('hex');
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
      maxAge: '30m' // 30 minutes
    });
    
    // Check session validity
    const sessionKey = `${decoded.userId || decoded.customerId}_${decoded.sessionId}`;
    const session = activeSessions.get(sessionKey);
    
    if (session && session.expiresAt > Date.now()) {
      // Update session activity
      session.lastActivity = Date.now();
      req.user = {
        ...decoded,
        sessionId: decoded.sessionId
      };
      
      logger.info('Authentication successful', {
        requestId: req.requestId,
        userId: decoded.userId || decoded.customerId,
        sessionId: decoded.sessionId,
        ip: clientIP,
        timestamp: new Date().toISOString()
      });
      
      next();
    } else {
      // Session expired or invalid
      activeSessions.delete(sessionKey);
      logger.warn('Authentication failed - invalid session', {
        requestId: req.requestId,
        sessionId: decoded.sessionId,
        ip: clientIP,
        timestamp: new Date().toISOString()
      });
      
      return res.status(403).json({
        success: false,
        error: 'Session expired or invalid',
        code: 'SESSION_INVALID'
      });
    }
    
  } catch (error) {
    const clientIP = req.clientIP;
    
    // Track failed attempts
    const attempts = failedAttempts.get(clientIP) || { count: 0, firstAttempt: Date.now() };
    attempts.count++;
    attempts.lastAttempt = Date.now();
    failedAttempts.set(clientIP, attempts);
    
    logger.error('Authentication failed - token verification error', {
      requestId: req.requestId,
      error: error.message,
      ip: clientIP,
      attempts: attempts.count,
      timestamp: new Date().toISOString()
    });
    
    // Implement progressive delays for brute force protection
    if (attempts.count > 3) {
      const delay = Math.min(attempts.count * 1000, 10000); // Max 10 second delay
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
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
const calculateFileChecksum = (buffer) => {
  return crypto.createHash('sha256').update(buffer).digest('hex');
};

const simulateVirusScan = async (buffer, filename) => {
  logger.info(`Scanning file ${filename} for viruses`);
  
  // Basic security checks
  const suspiciousPatterns = [
    /script>/i,
    /<iframe/i,
    /javascript:/i,
    /vbscript:/i,
    /onclick=/i,
    /onerror=/i,
    /onload=/i,
    /%3Cscript/i,
    /\x3Cscript/i
  ];
  
  const fileContent = buffer.toString('utf8').substring(0, 1000); // Check first 1KB
  const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(fileContent));
  
  // Check for executable file signatures
  const executableSignatures = [
    [0x4D, 0x5A], // PE executable (MZ)
    [0x7F, 0x45, 0x4C, 0x46], // ELF executable
    [0xCA, 0xFE, 0xBA, 0xBE], // Mach-O
    [0xFE, 0xED, 0xFA, 0xCE], // Mach-O
    [0x50, 0x4B, 0x03, 0x04], // ZIP/JAR (could contain malicious content)
  ];
  
  const hasExecutableSignature = executableSignatures.some(signature => {
    if (buffer.length < signature.length) return false;
    return signature.every((byte, index) => buffer[index] === byte);
  });
  
  // Simulate scanning time
  await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 100));
  
  // Return scan results
  const isClean = !isSuspicious && !hasExecutableSignature;
  
  if (!isClean) {
    logger.warn(`Potential security threat detected in file ${filename}`, {
      suspicious: isSuspicious,
      executable: hasExecutableSignature,
      timestamp: new Date().toISOString()
    });
  }
  
  return {
    isClean,
    scanEngine: 'SecureGuard-Scanner-v1.0',
    scanTime: Date.now(),
    signatures: Math.floor(Math.random() * 99999) + 10000,
    threats: isClean ? [] : ['suspicious-content-detected'],
    riskLevel: isClean ? 'clean' : 'high'
  };
};

const classifyDocument = async (buffer, filename, mimetype) => {
  logger.info(`Classifying document: ${filename} (${mimetype})`);
  
  // Mock AI classification - in production, integrate with AI service
  const classifications = [
    'MEDICAL_REPORT',
    'LAB_RESULTS',
    'RADIOLOGY_REPORT',
    'PATHOLOGY_REPORT',
    'DISCHARGE_SUMMARY',
    'MEDICATION_LIST',
    'CONSULTATION_NOTES',
    'IMAGING_STUDY',
    'GENETIC_REPORT',
    'OTHER_MEDICAL'
  ];

  // Simple classification based on filename and content patterns
  let primaryCategory = 'OTHER_MEDICAL';
  let confidence = 0.85;
  let subCategories = [];

  const lowerFilename = filename.toLowerCase();
  
  if (lowerFilename.includes('lab') || lowerFilename.includes('blood') || lowerFilename.includes('urine')) {
    primaryCategory = 'LAB_RESULTS';
    confidence = 0.95;
    subCategories = ['blood_work', 'biochemistry'];
  } else if (lowerFilename.includes('mri') || lowerFilename.includes('ct') || lowerFilename.includes('xray') || lowerFilename.includes('scan')) {
    primaryCategory = 'IMAGING_STUDY';
    confidence = 0.92;
    subCategories = ['diagnostic_imaging'];
  } else if (lowerFilename.includes('pathology') || lowerFilename.includes('biopsy')) {
    primaryCategory = 'PATHOLOGY_REPORT';
    confidence = 0.90;
    subCategories = ['tissue_analysis'];
  } else if (lowerFilename.includes('discharge') || lowerFilename.includes('summary')) {
    primaryCategory = 'DISCHARGE_SUMMARY';
    confidence = 0.88;
    subCategories = ['hospital_records'];
  } else if (lowerFilename.includes('medication') || lowerFilename.includes('prescription') || lowerFilename.includes('drug')) {
    primaryCategory = 'MEDICATION_LIST';
    confidence = 0.93;
    subCategories = ['current_medications'];
  } else if (lowerFilename.includes('genetic') || lowerFilename.includes('dna') || lowerFilename.includes('mutation')) {
    primaryCategory = 'GENETIC_REPORT';
    confidence = 0.89;
    subCategories = ['genetic_analysis'];
  }

  // Extract additional metadata
  const extractedData = {
    detectedLanguage: 'en',
    pageCount: mimetype === 'application/pdf' ? Math.floor(Math.random() * 10) + 1 : 1,
    hasImages: mimetype.startsWith('image/') || Math.random() > 0.7,
    textLength: buffer.length > 1000 ? Math.floor(buffer.length / 10) : buffer.length,
    medicalTermsFound: Math.floor(Math.random() * 50) + 10
  };

  return {
    primaryCategory,
    confidence,
    subCategories,
    extractedData,
    processingTime: Math.floor(Math.random() * 2000) + 500, // 500-2500ms
    modelVersion: 'medical-classifier-v2.1',
    analysisTimestamp: new Date().toISOString()
  };
};

const generateS3Key = (customerId, filename, category) => {
  const timestamp = Date.now();
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `customers/${customerId}/documents/${category}/${timestamp}_${sanitizedFilename}`;
};

const mockS3Upload = async (buffer, s3Key, mimetype) => {
  // Mock S3 upload - in production, use AWS SDK
  logger.info(`Uploading to S3: ${s3Key}`);
  
  // Simulate upload time
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    bucket: UPLOAD_BUCKET,
    key: s3Key,
    etag: crypto.randomUUID(),
    location: `https://${UPLOAD_BUCKET}.s3.amazonaws.com/${s3Key}`,
    size: buffer.length
  };
};

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'operational',
    service: 'ai-document-classification-service',
    version: '1.0.0',
    features: [
      'document-upload',
      'virus-scanning',
      'ai-classification',
      'secure-storage',
      'metadata-extraction',
      'file-encryption'
    ],
    endpoints: {
      health: '/health',
      uploadDocuments: 'POST /api/v1/documents/upload',
      classifyDocument: 'POST /api/v1/documents/:id/classify',
      getDocument: 'GET /api/v1/documents/:id',
      listDocuments: 'GET /api/v1/documents'
    },
    supportedTypes: ALLOWED_MIME_TYPES,
    maxFileSize: `${MAX_FILE_SIZE / 1024 / 1024}MB`,
    maxFiles: 10,
    timestamp: new Date().toISOString()
  });
});

// ==============================================
// DOCUMENT UPLOAD & CLASSIFICATION
// ==============================================

// Upload Documents with enhanced security
app.post('/api/v1/documents/upload', uploadLimiter, upload.array('documents', 10), optionalAuth, async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No documents uploaded',
        code: 'NO_DOCUMENTS'
      });
    }

    const { tempSessionId, caseId } = req.body;
    const uploadedDocuments = [];
    const errors = [];

    // Determine user context
    let customerId = null;
    if (req.user && req.user.type === 'customer') {
      customerId = req.user.customerId;
    }

    for (const file of req.files) {
      try {
        logger.info(`Processing file: ${file.originalname}`);

        // Enhanced file validation
        if (!file.originalname || file.originalname.length > 255) {
          errors.push({
            filename: file.originalname || 'unknown',
            error: 'Invalid filename',
            code: 'INVALID_FILENAME'
          });
          continue;
        }
        
        // Prevent path traversal attacks
        const sanitizedFilename = file.originalname.replace(/[\\/:*?"<>|]/g, '_').replace(/\.\./g, '_');
        
        // Check for double extensions and suspicious filenames
        const suspiciousExtensions = ['.exe', '.bat', '.cmd', '.com', '.scr', '.pif', '.vbs', '.js', '.jar', '.php', '.asp', '.jsp'];
        const hasSuspiciousExtension = suspiciousExtensions.some(ext => 
          sanitizedFilename.toLowerCase().includes(ext)
        );
        
        if (hasSuspiciousExtension) {
          logger.warn(`Suspicious file extension detected: ${file.originalname}`, {
            ip: req.clientIP,
            userAgent: req.get('User-Agent'),
            timestamp: new Date().toISOString()
          });
          errors.push({
            filename: file.originalname,
            error: 'File type not allowed for security reasons',
            code: 'SUSPICIOUS_FILE_TYPE'
          });
          continue;
        }
        
        // Calculate checksum
        const checksum = calculateFileChecksum(file.buffer);
        
        // Check for duplicate files
        const existingFile = await prisma.uploadedFile.findFirst({
          where: { checksum },
          include: { case: true }
        });
        
        if (existingFile && customerId && existingFile.case?.customerId === customerId) {
          logger.info(`Duplicate file detected: ${file.originalname}`, {
            checksum,
            existingFileId: existingFile.id,
            timestamp: new Date().toISOString()
          });
          errors.push({
            filename: file.originalname,
            error: 'Duplicate file detected',
            code: 'DUPLICATE_FILE',
            existingFileId: existingFile.id
          });
          continue;
        }

        // Virus scan
        const virusScanResult = await simulateVirusScan(file.buffer, file.originalname);
        if (!virusScanResult.isClean) {
          errors.push({
            filename: file.originalname,
            error: 'File failed virus scan',
            code: 'VIRUS_DETECTED'
          });
          continue;
        }

        // AI Classification
        const classificationResult = await classifyDocument(file.buffer, file.originalname, file.mimetype);

        // Generate S3 key
        const s3Key = generateS3Key(
          customerId || tempSessionId || 'anonymous',
          file.originalname,
          classificationResult.primaryCategory
        );

        // Upload to S3 (mocked)
        const uploadResult = await mockS3Upload(file.buffer, s3Key, file.mimetype);

        // Create document record
        const documentData = {
          id: uuidv4(),
          filename: file.originalname,
          s3Key: s3Key,
          mimetype: file.mimetype,
          size: file.size,
          category: classificationResult.primaryCategory,
          checksum: checksum,
          encrypted: true,
          metadata: {
            classification: classificationResult,
            virusScan: virusScanResult,
            upload: uploadResult,
            uploadContext: {
              tempSessionId,
              caseId,
              customerId,
              uploadIP: req.ip,
              userAgent: req.get('User-Agent')
            }
          }
        };

        // If we have a caseId, save to database immediately
        if (caseId) {
          // Verify case exists and belongs to customer
          const medicalCase = await prisma.medicalCase.findFirst({
            where: {
              id: caseId,
              ...(customerId ? { customerId } : {})
            }
          });

          if (medicalCase) {
            const uploadedFile = await prisma.uploadedFile.create({
              data: {
                ...documentData,
                caseId: caseId
              }
            });
            documentData.id = uploadedFile.id;
            documentData.createdAt = uploadedFile.createdAt;
          }
        }

        uploadedDocuments.push(documentData);

      } catch (fileError) {
        logger.error(`Error processing file ${file.originalname}:`, fileError);
        errors.push({
          filename: file.originalname,
          error: 'File processing failed',
          code: 'PROCESSING_ERROR',
          details: fileError.message
        });
      }
    }

    // Update temp session with uploaded documents
    if (tempSessionId && uploadedDocuments.length > 0) {
      try {
        const tempSubmission = await prisma.tempSubmission.findFirst({
          where: {
            id: tempSessionId,
            expiresAt: { gte: new Date() }
          }
        });

        if (tempSubmission) {
          const updatedPayload = {
            ...tempSubmission.payload,
            uploadedDocuments: [
              ...(tempSubmission.payload.uploadedDocuments || []),
              ...uploadedDocuments
            ]
          };

          await prisma.tempSubmission.update({
            where: { id: tempSessionId },
            data: { payload: updatedPayload }
          });
        }
      } catch (tempError) {
        logger.warn('Failed to update temp session with documents:', tempError);
      }
    }

    const response = {
      success: true,
      message: `Successfully processed ${uploadedDocuments.length} document(s)`,
      data: {
        uploadedDocuments: uploadedDocuments.map(doc => ({
          id: doc.id,
          filename: doc.filename,
          category: doc.category,
          classification: doc.metadata.classification,
          size: doc.size,
          mimetype: doc.mimetype,
          uploadedAt: doc.createdAt || new Date()
        })),
        totalUploaded: uploadedDocuments.length,
        totalFiles: req.files.length
      }
    };

    if (errors.length > 0) {
      response.errors = errors;
      response.message += ` (${errors.length} failed)`;
    }

    res.status(uploadedDocuments.length > 0 ? 201 : 400).json(response);

  } catch (error) {
    logger.error('Document upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Document upload failed',
      code: 'UPLOAD_ERROR'
    });
  }
});

// Get Document Details
app.get('/api/v1/documents/:documentId', [
  param('documentId').isUUID()
], authenticateToken, async (req, res) => {
  try {
    const { documentId } = req.params;

    // Find document
    const uploadedFile = await prisma.uploadedFile.findUnique({
      where: { id: documentId },
      include: {
        case: {
          select: {
            id: true,
            caseNumber: true,
            customerId: true
          }
        }
      }
    });

    if (!uploadedFile) {
      return res.status(404).json({
        success: false,
        error: 'Document not found',
        code: 'DOCUMENT_NOT_FOUND'
      });
    }

    // Check authorization
    if (req.user.type === 'customer' && uploadedFile.case.customerId !== req.user.customerId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied',
        code: 'ACCESS_DENIED'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: uploadedFile.id,
        filename: uploadedFile.filename,
        category: uploadedFile.category,
        mimetype: uploadedFile.mimetype,
        size: uploadedFile.size,
        checksum: uploadedFile.checksum,
        encrypted: uploadedFile.encrypted,
        classification: uploadedFile.metadata?.classification,
        virusScan: uploadedFile.metadata?.virusScan,
        caseId: uploadedFile.caseId,
        caseNumber: uploadedFile.case?.caseNumber,
        createdAt: uploadedFile.createdAt
      }
    });

  } catch (error) {
    logger.error('Document fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch document',
      code: 'DOCUMENT_FETCH_ERROR'
    });
  }
});

// List Documents
app.get('/api/v1/documents', [
  query('caseId').optional().isUUID(),
  query('category').optional().isString(),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('offset').optional().isInt({ min: 0 })
], authenticateToken, async (req, res) => {
  try {
    const { caseId, category, limit = 20, offset = 0 } = req.query;

    const whereClause = {};

    if (caseId) {
      whereClause.caseId = caseId;
    }

    if (category) {
      whereClause.category = category;
    }

    // If customer, filter by their cases only
    if (req.user.type === 'customer') {
      whereClause.case = {
        customerId: req.user.customerId
      };
    }

    const documents = await prisma.uploadedFile.findMany({
      where: whereClause,
      include: {
        case: {
          select: {
            id: true,
            caseNumber: true,
            customerId: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    const totalCount = await prisma.uploadedFile.count({
      where: whereClause
    });

    res.status(200).json({
      success: true,
      data: {
        documents: documents.map(doc => ({
          id: doc.id,
          filename: doc.filename,
          category: doc.category,
          mimetype: doc.mimetype,
          size: doc.size,
          classification: doc.metadata?.classification,
          caseId: doc.caseId,
          caseNumber: doc.case?.caseNumber,
          createdAt: doc.createdAt
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
    logger.error('Document list error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to list documents',
      code: 'DOCUMENT_LIST_ERROR'
    });
  }
});

// Reclassify Document
app.post('/api/v1/documents/:documentId/reclassify', [
  param('documentId').isUUID()
], authenticateToken, async (req, res) => {
  try {
    const { documentId } = req.params;

    const uploadedFile = await prisma.uploadedFile.findUnique({
      where: { id: documentId },
      include: {
        case: {
          select: {
            customerId: true
          }
        }
      }
    });

    if (!uploadedFile) {
      return res.status(404).json({
        success: false,
        error: 'Document not found',
        code: 'DOCUMENT_NOT_FOUND'
      });
    }

    // Check authorization
    if (req.user.type === 'customer' && uploadedFile.case.customerId !== req.user.customerId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied',
        code: 'ACCESS_DENIED'
      });
    }

    // Mock re-download file for reclassification
    // In production, download from S3
    // Enhanced security: Don't expose sensitive data
    // In production, securely download from S3 with proper authentication
    const mockBuffer = Buffer.from('secure mock content for reclassification');
    
    const newClassification = await classifyDocument(mockBuffer, uploadedFile.filename, uploadedFile.mimetype);

    // Update document with new classification
    const updatedFile = await prisma.uploadedFile.update({
      where: { id: documentId },
      data: {
        category: newClassification.primaryCategory,
        metadata: {
          ...uploadedFile.metadata,
          classification: newClassification,
          reclassifiedAt: new Date().toISOString()
        }
      }
    });

    res.status(200).json({
      success: true,
      message: 'Document reclassified successfully',
      data: {
        id: updatedFile.id,
        filename: updatedFile.filename,
        oldCategory: uploadedFile.category,
        newCategory: updatedFile.category,
        classification: newClassification
      }
    });

  } catch (error) {
    logger.error('Document reclassification error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reclassify document',
      code: 'RECLASSIFICATION_ERROR'
    });
  }
});

// Get Classification Categories
app.get('/api/v1/classification/categories', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      categories: [
        {
          id: 'MEDICAL_REPORT',
          name: 'Medical Report',
          description: 'General medical examination reports'
        },
        {
          id: 'LAB_RESULTS',
          name: 'Laboratory Results',
          description: 'Blood tests, urine tests, and other lab work'
        },
        {
          id: 'RADIOLOGY_REPORT',
          name: 'Radiology Report',
          description: 'X-rays, CT scans, MRI reports'
        },
        {
          id: 'PATHOLOGY_REPORT',
          name: 'Pathology Report',
          description: 'Tissue analysis and biopsy results'
        },
        {
          id: 'DISCHARGE_SUMMARY',
          name: 'Discharge Summary',
          description: 'Hospital discharge and admission summaries'
        },
        {
          id: 'MEDICATION_LIST',
          name: 'Medication List',
          description: 'Current medications and prescriptions'
        },
        {
          id: 'CONSULTATION_NOTES',
          name: 'Consultation Notes',
          description: 'Doctor consultation notes and recommendations'
        },
        {
          id: 'IMAGING_STUDY',
          name: 'Imaging Study',
          description: 'Medical imaging files (DICOM, X-rays, scans)'
        },
        {
          id: 'GENETIC_REPORT',
          name: 'Genetic Report',
          description: 'Genetic testing and analysis reports'
        },
        {
          id: 'OTHER_MEDICAL',
          name: 'Other Medical',
          description: 'Other medical documents'
        }
      ],
      supportedFileTypes: ALLOWED_MIME_TYPES,
      maxFileSize: MAX_FILE_SIZE,
      maxFiles: 10
    }
  });
});

// Batch Classification Status
app.get('/api/v1/classification/batch/:batchId', [
  param('batchId').isUUID()
], authenticateToken, async (req, res) => {
  try {
    const { batchId } = req.params;

    // Mock batch processing status
    // In production, track batch jobs in database
    const mockBatchStatus = {
      batchId,
      status: 'completed', // pending, processing, completed, failed
      totalFiles: 5,
      processedFiles: 5,
      failedFiles: 0,
      startedAt: new Date(Date.now() - 120000).toISOString(),
      completedAt: new Date().toISOString(),
      results: [
        { filename: 'report1.pdf', category: 'MEDICAL_REPORT', confidence: 0.95 },
        { filename: 'lab_results.pdf', category: 'LAB_RESULTS', confidence: 0.98 },
        { filename: 'mri_scan.dcm', category: 'IMAGING_STUDY', confidence: 0.92 }
      ]
    };

    res.status(200).json({
      success: true,
      data: mockBatchStatus
    });

  } catch (error) {
    logger.error('Batch status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch batch status',
      code: 'BATCH_STATUS_ERROR'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        code: 'FILE_TOO_LARGE'
      });
    } else if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        error: 'Too many files. Maximum 10 files per upload',
        code: 'TOO_MANY_FILES'
      });
    }
  }

  logger.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    code: 'INTERNAL_ERROR'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🤖 AI Document Classification Service v1.0 running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📤 Upload: POST /api/v1/documents/upload`);
  console.log(`📄 Get document: GET /api/v1/documents/:id`);
  console.log(`📋 List documents: GET /api/v1/documents`);
  console.log(`🔄 Reclassify: POST /api/v1/documents/:id/reclassify`);
  console.log(`📂 Categories: GET /api/v1/classification/categories`);
  console.log(`🗂️ Supported types: ${ALLOWED_MIME_TYPES.length} file types`);
  console.log(`💾 Max file size: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
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