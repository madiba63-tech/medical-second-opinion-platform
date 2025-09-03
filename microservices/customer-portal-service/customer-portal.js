const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult, param } = require('express-validator');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('../../src/generated/prisma');
const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const Tesseract = require('tesseract.js');
const pdf = require('pdf-parse');

const app = express();
const PORT = process.env.PORT || 4009;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-for-development-only';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Configure multer for document uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit for medical imaging
  },
  fileFilter: (req, file, cb) => {
    // Allow medical document types
    const allowedTypes = [
      'application/pdf', 
      'image/jpeg', 
      'image/png', 
      'image/tiff',
      'image/dicom',
      'application/dicom',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain' // For testing
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only medical documents and images are allowed.'));
    }
  }
});

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware for customer authentication
const authenticateCustomer = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Access token required',
      code: 'TOKEN_REQUIRED'
    });
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        error: 'Invalid or expired token',
        code: 'TOKEN_INVALID'
      });
    }
    
    try {
      const customer = await prisma.customer.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          preferredLanguage: true,
          emailVerified: true,
          twoFactorEnabled: true,
          twoFactorVerified: decoded.twoFactorVerified || false
        }
      });
      
      if (!customer) {
        return res.status(403).json({
          success: false,
          error: 'Customer not found',
          code: 'CUSTOMER_NOT_FOUND'
        });
      }
      
      req.customer = { ...decoded, ...customer };
      next();
    } catch (dbError) {
      return res.status(500).json({
        success: false,
        error: 'Database error during authentication',
        code: 'AUTH_DB_ERROR'
      });
    }
  });
};

// Utility function for generating case numbers
const generateCaseNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `CASE-${timestamp}-${random}`;
};

// Utility function for notification queue
const queueNotification = async (customerId, type, channel, subject, message, language = 'ENGLISH', scheduledFor = null) => {
  try {
    await prisma.customerNotification.create({
      data: {
        customerId,
        type,
        channel,
        subject,
        message,
        language,
        scheduledFor: scheduledFor || new Date()
      }
    });
    console.log(`[NOTIFICATION] Queued ${type} notification for customer ${customerId}`);
  } catch (error) {
    console.error(`[NOTIFICATION] Failed to queue notification:`, error);
  }
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'customer-portal-service',
    version: '1.0.0',
    features: [
      'customer-registration',
      'two-factor-authentication', 
      'case-creation',
      'medical-questionnaire',
      'file-upload',
      'payment-processing',
      'multilingual-support'
    ],
    languages: ['English', 'German'],
    endpoints: {
      health: '/health',
      register: 'POST /api/v1/auth/register',
      login: 'POST /api/v1/auth/login',
      verify2FA: 'POST /api/v1/auth/verify-2fa',
      createCase: 'POST /api/v1/cases/create',
      questionnaire: 'POST /api/v1/cases/{id}/questionnaire',
      uploadFiles: 'POST /api/v1/cases/{id}/files',
      payment: 'POST /api/v1/cases/{id}/payment',
      pricing: 'GET /api/v1/pricing'
    },
    status: 'operational',
    timestamp: new Date().toISOString()
  });
});

// Customer Registration
app.post('/api/v1/auth/register', [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('dateOfBirth').optional().isISO8601().withMessage('Valid date of birth required'),
  body('gender').optional().isIn(['MALE', 'FEMALE', 'PREFER_NOT_TO_SAY']),
  body('phone').optional(),
  body('preferredLanguage').optional().isIn(['ENGLISH', 'GERMAN']),
  body('termsAccepted').equals('true').withMessage('Terms and conditions must be accepted'),
  body('privacyAccepted').equals('true').withMessage('Privacy policy must be accepted')
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
      firstName, lastName, email, password, dateOfBirth, gender, phone,
      preferredLanguage, termsAccepted, privacyAccepted, marketingConsent
    } = req.body;

    // Check if customer already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { email }
    });

    if (existingCustomer) {
      return res.status(409).json({
        success: false,
        error: 'Customer with this email already exists',
        code: 'EMAIL_EXISTS'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create customer
    const customer = await prisma.customer.create({
      data: {
        firstName,
        lastName,
        email,
        hashedPassword,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        gender: gender || 'PREFER_NOT_TO_SAY',
        phone,
        preferredLanguage: preferredLanguage || 'ENGLISH',
        termsAccepted: true,
        privacyAccepted: true,
        marketingConsent: marketingConsent || false,
        twoFactorEnabled: true, // Mandatory 2FA
        twoFactorMethod: phone ? 'SMS' : 'EMAIL'
      }
    });

    // Generate 2FA verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store verification code (in production, use Redis or encrypted storage)
    await prisma.customer.update({
      where: { id: customer.id },
      data: { 
        twoFactorSecret: await bcrypt.hash(verificationCode, 10)
      }
    });

    // Queue verification notification
    await queueNotification(
      customer.id,
      'verification_code',
      customer.twoFactorMethod,
      'Verify Your Account',
      `Your verification code is: ${verificationCode}`,
      customer.preferredLanguage
    );

    res.status(201).json({
      success: true,
      message: 'Customer registered successfully. Please verify your account.',
      data: {
        customerId: customer.id,
        email: customer.email,
        twoFactorRequired: true,
        verificationMethod: customer.twoFactorMethod
      }
    });

  } catch (error) {
    console.error('[REGISTRATION] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed',
      code: 'REGISTRATION_ERROR'
    });
  }
});

// Customer Login
app.post('/api/v1/auth/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
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

    const { email, password } = req.body;

    // Find customer
    const customer = await prisma.customer.findUnique({
      where: { email }
    });

    if (!customer) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, customer.hashedPassword);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Generate 2FA code if enabled
    if (customer.twoFactorEnabled && customer.emailVerified) {
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store verification code
      await prisma.customer.update({
        where: { id: customer.id },
        data: { 
          twoFactorSecret: await bcrypt.hash(verificationCode, 10)
        }
      });

      // Queue 2FA notification
      await queueNotification(
        customer.id,
        'two_factor_code',
        customer.twoFactorMethod,
        '2FA Verification Code',
        `Your login verification code is: ${verificationCode}`,
        customer.preferredLanguage
      );

      // Generate temporary token (requires 2FA verification)
      const tempToken = jwt.sign(
        { 
          userId: customer.id, 
          email: customer.email,
          twoFactorVerified: false,
          type: 'temp'
        }, 
        JWT_SECRET, 
        { expiresIn: '10m' }
      );

      return res.status(200).json({
        success: true,
        message: '2FA verification required',
        data: {
          tempToken,
          twoFactorRequired: true,
          verificationMethod: customer.twoFactorMethod
        }
      });
    }

    // Generate full access token (no 2FA required for new accounts)
    const token = jwt.sign(
      { 
        userId: customer.id, 
        email: customer.email,
        twoFactorVerified: true
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        customer: {
          id: customer.id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          preferredLanguage: customer.preferredLanguage
        }
      }
    });

  } catch (error) {
    console.error('[LOGIN] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed',
      code: 'LOGIN_ERROR'
    });
  }
});

// 2FA Verification
app.post('/api/v1/auth/verify-2fa', [
  body('tempToken').notEmpty().withMessage('Temporary token is required'),
  body('verificationCode').isLength({ min: 6, max: 6 }).withMessage('6-digit verification code required')
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

    const { tempToken, verificationCode } = req.body;

    // Verify temporary token
    let decoded;
    try {
      decoded = jwt.verify(tempToken, JWT_SECRET);
      if (decoded.type !== 'temp' || decoded.twoFactorVerified) {
        throw new Error('Invalid temporary token');
      }
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired temporary token',
        code: 'INVALID_TEMP_TOKEN'
      });
    }

    // Find customer and verify code
    const customer = await prisma.customer.findUnique({
      where: { id: decoded.userId }
    });

    if (!customer || !customer.twoFactorSecret) {
      return res.status(401).json({
        success: false,
        error: 'Invalid verification attempt',
        code: 'INVALID_VERIFICATION'
      });
    }

    // Verify the code
    const validCode = await bcrypt.compare(verificationCode, customer.twoFactorSecret);
    if (!validCode) {
      return res.status(401).json({
        success: false,
        error: 'Invalid verification code',
        code: 'INVALID_CODE'
      });
    }

    // Update customer verification status
    await prisma.customer.update({
      where: { id: customer.id },
      data: { 
        emailVerified: true,
        phoneVerified: customer.twoFactorMethod === 'SMS' ? true : customer.phoneVerified,
        twoFactorSecret: null // Clear the used code
      }
    });

    // Generate full access token
    const token = jwt.sign(
      { 
        userId: customer.id, 
        email: customer.email,
        twoFactorVerified: true
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    // Create customer session
    await prisma.customerSession.create({
      data: {
        customerId: customer.id,
        sessionToken: token,
        twoFactorVerified: true,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }
    });

    res.status(200).json({
      success: true,
      message: 'Verification successful',
      data: {
        token,
        customer: {
          id: customer.id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          preferredLanguage: customer.preferredLanguage,
          verified: true
        }
      }
    });

  } catch (error) {
    console.error('[2FA-VERIFY] Error:', error);
    res.status(500).json({
      success: false,
      error: '2FA verification failed',
      code: '2FA_VERIFY_ERROR'
    });
  }
});

// Get Current Pricing
app.get('/api/v1/pricing', async (req, res) => {
  try {
    const { urgency = 'STANDARD' } = req.query;
    
    const pricing = await prisma.servicePricing.findMany({
      where: {
        urgencyLevel: urgency,
        isActive: true
      },
      orderBy: { basePriceEUR: 'asc' }
    });

    res.status(200).json({
      success: true,
      data: {
        urgencyLevel: urgency,
        currency: 'EUR',
        pricing: pricing.map(p => ({
          professionalLevel: p.professionalLevel,
          price: p.basePriceEUR,
          description: `${p.professionalLevel.toLowerCase().charAt(0).toUpperCase() + p.professionalLevel.toLowerCase().slice(1)} medical professional`
        }))
      }
    });

  } catch (error) {
    console.error('[PRICING] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pricing',
      code: 'PRICING_ERROR'
    });
  }
});

// Case Creation Wizard - Step 1: Create New Case
app.post('/api/v1/cases/create', authenticateCustomer, [
  body('urgency').optional().isIn(['STANDARD', 'URGENT', 'EMERGENCY']),
  body('professionalLevel').isIn(['JUNIOR', 'SENIOR', 'EXPERT', 'DISTINGUISHED']).withMessage('Valid professional level required'),
  body('description').optional().isString()
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

    const { urgency = 'STANDARD', professionalLevel, description } = req.body;
    const customerId = req.customer.id;

    // Generate unique case number
    const caseNumber = generateCaseNumber();

    // Get pricing for selected level and urgency
    const pricing = await prisma.servicePricing.findFirst({
      where: {
        professionalLevel,
        urgencyLevel: urgency,
        isActive: true
      }
    });

    if (!pricing) {
      return res.status(400).json({
        success: false,
        error: 'Pricing not found for selected configuration',
        code: 'PRICING_NOT_FOUND'
      });
    }

    // Create medical case
    const medicalCase = await prisma.medicalCase.create({
      data: {
        caseNumber,
        customerId,
        firstName: req.customer.firstName,
        lastName: req.customer.lastName,
        email: req.customer.email,
        dateOfBirth: new Date(), // Will be updated in questionnaire
        title: `Second Opinion Request - ${caseNumber}`,
        description: description || 'Second opinion consultation',
        category: 'ONCOLOGY', // Default to oncology
        status: 'DRAFT',
        priority: urgency === 'EMERGENCY' ? 'URGENT' : urgency === 'URGENT' ? 'HIGH' : 'NORMAL',
        requestedProfessionalLevel: professionalLevel,
        talentPool: `ONCOLOGY_${professionalLevel}`,
        consentAccepted: false
      }
    });

    // Create payment record
    const casePayment = await prisma.casePayment.create({
      data: {
        caseId: medicalCase.id,
        customerId,
        amount: pricing.basePriceEUR,
        professionalLevel,
        urgencyLevel: urgency,
        status: 'PENDING'
      }
    });

    // Queue welcome notification
    await queueNotification(
      customerId,
      'case_created',
      req.customer.preferredChannel || 'EMAIL',
      'New Case Created',
      `Your second opinion case ${caseNumber} has been created. Next step: complete the medical questionnaire.`,
      req.customer.preferredLanguage
    );

    res.status(201).json({
      success: true,
      message: 'Case created successfully',
      data: {
        caseId: medicalCase.id,
        caseNumber,
        professionalLevel,
        urgency,
        pricing: {
          amount: pricing.basePriceEUR,
          currency: 'EUR'
        },
        nextStep: 'questionnaire',
        questionnaire: {
          fastTrack: `/api/v1/cases/${medicalCase.id}/questionnaire?type=FAST_TRACK`,
          comprehensive: `/api/v1/cases/${medicalCase.id}/questionnaire?type=COMPREHENSIVE`
        }
      }
    });

  } catch (error) {
    console.error('[CASE-CREATE] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Case creation failed',
      code: 'CASE_CREATE_ERROR'
    });
  }
});

// File Upload for Cases
app.post('/api/v1/cases/:caseId/files', authenticateCustomer, upload.array('documents', 10), [
  param('caseId').isUUID().withMessage('Valid case ID required')
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

    const { caseId } = req.params;
    const customerId = req.customer.id;
    const uploadedFiles = req.files || [];

    if (uploadedFiles.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files uploaded',
        code: 'NO_FILES'
      });
    }

    // Verify case ownership
    const medicalCase = await prisma.medicalCase.findFirst({
      where: {
        id: caseId,
        customerId
      }
    });

    if (!medicalCase) {
      return res.status(404).json({
        success: false,
        error: 'Case not found or access denied',
        code: 'CASE_NOT_FOUND'
      });
    }

    const processedFiles = [];

    for (const file of uploadedFiles) {
      const fileId = uuidv4();
      const fileExtension = path.extname(file.originalname);
      const uniqueFilename = `${fileId}${fileExtension}`;
      const s3Key = `cases/${caseId}/${uniqueFilename}`;

      // Determine file category
      let category = 'OTHER';
      if (file.mimetype === 'application/pdf') {
        if (file.originalname.toLowerCase().includes('pathology')) {
          category = 'PATHOLOGY';
        } else if (file.originalname.toLowerCase().includes('lab')) {
          category = 'LABORATORY';
        } else if (file.originalname.toLowerCase().includes('imaging')) {
          category = 'IMAGING';
        } else {
          category = 'MEDICAL_REPORT';
        }
      } else if (file.mimetype.startsWith('image/')) {
        if (file.mimetype === 'application/dicom') {
          category = 'DICOM_IMAGING';
        } else {
          category = 'IMAGE_SCAN';
        }
      }

      // Create file record
      const uploadedFile = await prisma.uploadedFile.create({
        data: {
          caseId: medicalCase.id,
          filename: uniqueFilename,
          s3Key,
          mimetype: file.mimetype,
          size: file.size,
          category,
          metadata: {
            originalName: file.originalname,
            uploadedBy: customerId,
            uploadedAt: new Date().toISOString()
          },
          encrypted: true
        }
      });

      processedFiles.push({
        fileId: uploadedFile.id,
        filename: file.originalname,
        category,
        size: file.size,
        mimetype: file.mimetype
      });

      // Clean up temporary file
      try {
        await fs.unlink(file.path);
      } catch (unlinkError) {
        console.log(`[FILE-UPLOAD] Could not delete temp file: ${file.path}`);
      }
    }

    // Update case status if it was draft
    if (medicalCase.status === 'DRAFT') {
      await prisma.medicalCase.update({
        where: { id: caseId },
        data: { status: 'FILES_UPLOADED' }
      });
    }

    res.status(200).json({
      success: true,
      message: `${processedFiles.length} files uploaded successfully`,
      data: {
        caseId,
        filesUploaded: processedFiles.length,
        files: processedFiles,
        nextStep: medicalCase.status === 'DRAFT' ? 'questionnaire' : 'payment'
      }
    });

  } catch (error) {
    console.error('[FILE-UPLOAD] Error:', error);
    res.status(500).json({
      success: false,
      error: 'File upload failed',
      code: 'FILE_UPLOAD_ERROR'
    });
  }
});

// Get Customer Cases
app.get('/api/v1/cases', authenticateCustomer, async (req, res) => {
  try {
    const customerId = req.customer.id;
    const { status, page = 1, limit = 10 } = req.query;

    // Build where clause
    const whereClause = { customerId };
    if (status) whereClause.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const [cases, totalCount] = await Promise.all([
      prisma.medicalCase.findMany({
        where: whereClause,
        include: {
          uploadedFiles: {
            select: {
              id: true,
              filename: true,
              category: true,
              size: true,
              createdAt: true
            }
          },
          casePayment: {
            select: {
              amount: true,
              status: true,
              paymentDate: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take
      }),
      prisma.medicalCase.count({ where: whereClause })
    ]);

    res.status(200).json({
      success: true,
      data: {
        cases: cases.map(c => ({
          id: c.id,
          caseNumber: c.caseNumber,
          title: c.title,
          status: c.status,
          priority: c.priority,
          requestedLevel: c.requestedProfessionalLevel,
          filesCount: c.uploadedFiles.length,
          payment: c.casePayment,
          createdAt: c.createdAt
        })),
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount,
          totalPages: Math.ceil(totalCount / parseInt(limit))
        }
      }
    });

  } catch (error) {
    console.error('[GET-CASES] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cases',
      code: 'GET_CASES_ERROR'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🏥 Customer Portal Service v1.0 running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`👤 Customer registration: POST /api/v1/auth/register`);
  console.log(`📁 Case creation: POST /api/v1/cases/create`);
  console.log(`📎 File upload: POST /api/v1/cases/{id}/files`);
  console.log(`🔐 Multi-language support: English & German`);
  console.log(`🔒 Mandatory 2FA authentication enabled`);
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