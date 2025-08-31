const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { body, param, query, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const axios = require('axios');
const crypto = require('crypto');
const { PrismaClient } = require('../../src/generated/prisma');

// Initialize services
const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'second-opinion-jwt-secret-2025';
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public';
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

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

// Configure rate limiting
const createAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    error: 'Too many account creation attempts, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    success: false,
    error: 'Too many login attempts, please try again later.',
    code: 'LOGIN_RATE_LIMIT_EXCEEDED'
  }
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

// Optional authentication middleware (doesn't fail if no token)
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      // Token invalid but continue without user
      logger.warn('Optional auth token invalid:', error.message);
    }
  }
  next();
};

// Utility Functions
const generateEmailVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const generateSecurePassword = () => {
  // Generate a secure 12-character password with complexity requirements
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*';
  
  let password = '';
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  const allChars = lowercase + uppercase + numbers + symbols;
  for (let i = 4; i < 12; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => 0.5 - Math.random()).join('');
};

const sendNotification = async (recipientEmail, type, templateData) => {
  try {
    await axios.post(`${NOTIFICATION_SERVICE_URL}/api/v1/notifications/send`, {
      recipient: recipientEmail,
      type: type,
      template: `customer_${type}`,
      data: templateData
    }, {
      timeout: 5000
    });
  } catch (error) {
    logger.error('Failed to send notification:', error.message);
  }
};

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'operational',
    service: 'customer-onboarding-service',
    version: '1.0.0',
    features: [
      'temporary-session-management',
      'customer-registration',
      'social-login-integration',
      'email-verification',
      'session-management',
      'oauth-providers'
    ],
    endpoints: {
      health: '/health',
      tempSession: 'POST /api/v1/temp-sessions',
      register: 'POST /api/v1/customers/register',
      login: 'POST /api/v1/customers/login',
      socialAuth: 'POST /api/v1/customers/social-auth',
      verifyEmail: 'POST /api/v1/customers/verify-email',
      profile: 'GET /api/v1/customers/profile'
    },
    oauthProviders: ['google', 'apple'],
    sessionExpiryHours: 1,
    timestamp: new Date().toISOString()
  });
});

// ==============================================
// TEMPORARY SESSION MANAGEMENT
// ==============================================

// Create temporary session for anonymous users
app.post('/api/v1/temp-sessions', [
  body('payload').isObject(),
  body('expiryMinutes').optional().isInt({ min: 30, max: 120 }).withMessage('Expiry must be between 30 and 120 minutes')
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

    const { payload, expiryMinutes = 60 } = req.body;
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

    const tempSubmission = await prisma.tempSubmission.create({
      data: {
        id: uuidv4(),
        payload,
        expiresAt,
        createdAt: new Date()
      }
    });

    // Generate a temporary session token
    const tempToken = jwt.sign(
      { 
        tempSessionId: tempSubmission.id,
        type: 'temporary',
        expiresAt: expiresAt.toISOString()
      },
      JWT_SECRET,
      { expiresIn: `${expiryMinutes}m` }
    );

    res.status(201).json({
      success: true,
      data: {
        sessionId: tempSubmission.id,
        sessionToken: tempToken,
        expiresAt: expiresAt,
        expiryMinutes: expiryMinutes
      }
    });

  } catch (error) {
    logger.error('Temp session creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create temporary session',
      code: 'TEMP_SESSION_ERROR'
    });
  }
});

// Get temporary session data
app.get('/api/v1/temp-sessions/:sessionId', [
  param('sessionId').isUUID()
], optionalAuth, async (req, res) => {
  try {
    const { sessionId } = req.params;

    const tempSubmission = await prisma.tempSubmission.findFirst({
      where: {
        id: sessionId,
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

    res.status(200).json({
      success: true,
      data: {
        sessionId: tempSubmission.id,
        payload: tempSubmission.payload,
        expiresAt: tempSubmission.expiresAt,
        createdAt: tempSubmission.createdAt
      }
    });

  } catch (error) {
    logger.error('Temp session fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch temporary session',
      code: 'TEMP_SESSION_FETCH_ERROR'
    });
  }
});

// Update temporary session data
app.put('/api/v1/temp-sessions/:sessionId', [
  param('sessionId').isUUID(),
  body('payload').isObject()
], optionalAuth, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { payload } = req.body;

    const tempSubmission = await prisma.tempSubmission.findFirst({
      where: {
        id: sessionId,
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

    // Merge existing payload with new data
    const updatedPayload = {
      ...tempSubmission.payload,
      ...payload
    };

    const updatedSubmission = await prisma.tempSubmission.update({
      where: { id: sessionId },
      data: { payload: updatedPayload }
    });

    res.status(200).json({
      success: true,
      data: {
        sessionId: updatedSubmission.id,
        payload: updatedSubmission.payload,
        expiresAt: updatedSubmission.expiresAt
      }
    });

  } catch (error) {
    logger.error('Temp session update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update temporary session',
      code: 'TEMP_SESSION_UPDATE_ERROR'
    });
  }
});

// ==============================================
// CUSTOMER REGISTRATION & AUTHENTICATION
// ==============================================

// Customer Registration
app.post('/api/v1/customers/register', createAccountLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('firstName').isLength({ min: 2, max: 50 }).trim(),
  body('lastName').isLength({ min: 2, max: 50 }).trim(),
  body('password').optional().isLength({ min: 12 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/),
  body('tempSessionId').optional().isUUID(),
  body('preferredLanguage').optional().isIn(['ENGLISH', 'GERMAN']),
  body('marketingConsent').optional().isBoolean()
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
      email,
      firstName,
      lastName,
      password,
      tempSessionId,
      preferredLanguage = 'ENGLISH',
      marketingConsent = false
    } = req.body;

    // Check if customer already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { email }
    });

    if (existingCustomer) {
      return res.status(409).json({
        success: false,
        error: 'Customer already exists with this email',
        code: 'CUSTOMER_EXISTS'
      });
    }

    // Generate password if not provided (for social login or temp session conversion)
    const finalPassword = password || generateSecurePassword();
    const hashedPassword = await bcrypt.hash(finalPassword, 12);

    // Generate email verification token
    const emailVerificationToken = generateEmailVerificationToken();

    // Create customer
    const customer = await prisma.customer.create({
      data: {
        id: uuidv4(),
        firstName,
        lastName,
        email,
        hashedPassword,
        preferredLanguage,
        marketingConsent,
        emailVerified: false,
        profileCompleted: false,
        termsAccepted: true,
        privacyAccepted: true,
        metadata: {
          registrationSource: tempSessionId ? 'temp_session_conversion' : 'direct_registration',
          emailVerificationToken,
          registrationIP: req.ip,
          userAgent: req.get('User-Agent')
        }
      }
    });

    // If temp session provided, transfer data to the new customer
    let tempSessionData = null;
    if (tempSessionId) {
      try {
        const tempSubmission = await prisma.tempSubmission.findFirst({
          where: {
            id: tempSessionId,
            expiresAt: { gte: new Date() }
          }
        });

        if (tempSubmission) {
          tempSessionData = tempSubmission.payload;
          
          // Clean up temp session
          await prisma.tempSubmission.delete({
            where: { id: tempSessionId }
          });
        }
      } catch (tempError) {
        logger.warn('Failed to process temp session during registration:', tempError);
      }
    }

    // Create customer session
    const sessionToken = jwt.sign(
      {
        customerId: customer.id,
        email: customer.email,
        type: 'customer',
        emailVerified: false
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const customerSession = await prisma.customerSession.create({
      data: {
        id: uuidv4(),
        customerId: customer.id,
        sessionToken,
        twoFactorVerified: false,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        lastActivity: new Date()
      }
    });

    // Send email verification
    await sendNotification(customer.email, 'email_verification', {
      firstName: customer.firstName,
      verificationUrl: `${FRONTEND_URL}/verify-email?token=${emailVerificationToken}&email=${encodeURIComponent(customer.email)}`,
      temporaryPassword: !password ? finalPassword : undefined
    });

    res.status(201).json({
      success: true,
      message: 'Customer registration successful. Please check your email for verification.',
      data: {
        customerId: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        emailVerified: customer.emailVerified,
        sessionToken,
        expiresAt: customerSession.expiresAt,
        tempSessionData: tempSessionData,
        temporaryPassword: !password ? finalPassword : undefined
      }
    });

  } catch (error) {
    logger.error('Customer registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed',
      code: 'REGISTRATION_ERROR'
    });
  }
});

// Customer Login
app.post('/api/v1/customers/login', loginLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 1 })
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
        error: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, customer.hashedPassword);
    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Create customer session
    const sessionToken = jwt.sign(
      {
        customerId: customer.id,
        email: customer.email,
        type: 'customer',
        emailVerified: customer.emailVerified
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Clean up any existing sessions
    await prisma.customerSession.deleteMany({
      where: {
        customerId: customer.id,
        expiresAt: { lt: new Date() }
      }
    });

    const customerSession = await prisma.customerSession.create({
      data: {
        id: uuidv4(),
        customerId: customer.id,
        sessionToken,
        twoFactorVerified: !customer.twoFactorEnabled,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        lastActivity: new Date()
      }
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        customerId: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        emailVerified: customer.emailVerified,
        profileCompleted: customer.profileCompleted,
        sessionToken,
        expiresAt: customerSession.expiresAt,
        twoFactorRequired: customer.twoFactorEnabled && !customerSession.twoFactorVerified
      }
    });

  } catch (error) {
    logger.error('Customer login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed',
      code: 'LOGIN_ERROR'
    });
  }
});

// Social Authentication (Google/Apple)
app.post('/api/v1/customers/social-auth', [
  body('provider').isIn(['google', 'apple']),
  body('providerId').isLength({ min: 1 }),
  body('email').isEmail().normalizeEmail(),
  body('firstName').optional().isLength({ min: 1, max: 50 }),
  body('lastName').optional().isLength({ min: 1, max: 50 }),
  body('tempSessionId').optional().isUUID()
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

    const { provider, providerId, email, firstName, lastName, tempSessionId } = req.body;

    // Check if customer exists by OAuth provider ID
    const providerField = `${provider}Id`;
    let customer = await prisma.customer.findUnique({
      where: { [providerField]: providerId }
    });

    // If not found by provider ID, check by email
    if (!customer) {
      customer = await prisma.customer.findUnique({
        where: { email }
      });

      if (customer) {
        // Link OAuth account to existing customer
        await prisma.customer.update({
          where: { id: customer.id },
          data: {
            [providerField]: providerId,
            oauthProvider: provider,
            emailVerified: true // Social login implies verified email
          }
        });
      }
    }

    // If still no customer, create new one
    if (!customer) {
      const generatedPassword = generateSecurePassword();
      const hashedPassword = await bcrypt.hash(generatedPassword, 12);

      customer = await prisma.customer.create({
        data: {
          id: uuidv4(),
          firstName: firstName || 'Unknown',
          lastName: lastName || 'User',
          email,
          hashedPassword,
          emailVerified: true, // Social login implies verified email
          [providerField]: providerId,
          oauthProvider: provider,
          profileCompleted: false,
          termsAccepted: true,
          privacyAccepted: true,
          metadata: {
            registrationSource: 'social_login',
            socialProvider: provider,
            registrationIP: req.ip,
            userAgent: req.get('User-Agent')
          }
        }
      });

      // Send welcome email with temporary password
      await sendNotification(customer.email, 'social_welcome', {
        firstName: customer.firstName,
        provider: provider.charAt(0).toUpperCase() + provider.slice(1),
        temporaryPassword: generatedPassword,
        loginUrl: `${FRONTEND_URL}/login`
      });
    }

    // Handle temp session transfer
    let tempSessionData = null;
    if (tempSessionId) {
      try {
        const tempSubmission = await prisma.tempSubmission.findFirst({
          where: {
            id: tempSessionId,
            expiresAt: { gte: new Date() }
          }
        });

        if (tempSubmission) {
          tempSessionData = tempSubmission.payload;
          await prisma.tempSubmission.delete({
            where: { id: tempSessionId }
          });
        }
      } catch (tempError) {
        logger.warn('Failed to process temp session during social auth:', tempError);
      }
    }

    // Create customer session
    const sessionToken = jwt.sign(
      {
        customerId: customer.id,
        email: customer.email,
        type: 'customer',
        emailVerified: customer.emailVerified
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const customerSession = await prisma.customerSession.create({
      data: {
        id: uuidv4(),
        customerId: customer.id,
        sessionToken,
        twoFactorVerified: true, // Social login bypasses 2FA for now
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        lastActivity: new Date()
      }
    });

    res.status(200).json({
      success: true,
      message: 'Social authentication successful',
      data: {
        customerId: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        emailVerified: customer.emailVerified,
        profileCompleted: customer.profileCompleted,
        sessionToken,
        expiresAt: customerSession.expiresAt,
        tempSessionData: tempSessionData
      }
    });

  } catch (error) {
    logger.error('Social authentication error:', error);
    res.status(500).json({
      success: false,
      error: 'Social authentication failed',
      code: 'SOCIAL_AUTH_ERROR'
    });
  }
});

// Email Verification
app.post('/api/v1/customers/verify-email', [
  body('email').isEmail().normalizeEmail(),
  body('token').isLength({ min: 1 })
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

    const { email, token } = req.body;

    const customer = await prisma.customer.findUnique({
      where: { email }
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        error: 'Customer not found',
        code: 'CUSTOMER_NOT_FOUND'
      });
    }

    if (customer.emailVerified) {
      return res.status(400).json({
        success: false,
        error: 'Email already verified',
        code: 'EMAIL_ALREADY_VERIFIED'
      });
    }

    // Check verification token
    const storedToken = customer.metadata?.emailVerificationToken;
    if (!storedToken || storedToken !== token) {
      return res.status(400).json({
        success: false,
        error: 'Invalid verification token',
        code: 'INVALID_TOKEN'
      });
    }

    // Update customer
    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        emailVerified: true,
        metadata: {
          ...customer.metadata,
          emailVerificationToken: null,
          emailVerifiedAt: new Date().toISOString()
        }
      }
    });

    res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    });

  } catch (error) {
    logger.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Email verification failed',
      code: 'EMAIL_VERIFICATION_ERROR'
    });
  }
});

// ==============================================
// CUSTOMER PROFILE MANAGEMENT
// ==============================================

// Get Customer Profile
app.get('/api/v1/customers/profile', authenticateToken, async (req, res) => {
  try {
    if (req.user.type !== 'customer') {
      return res.status(403).json({
        success: false,
        error: 'Access denied',
        code: 'ACCESS_DENIED'
      });
    }

    const customer = await prisma.customer.findUnique({
      where: { id: req.user.customerId },
      include: {
        cases: {
          select: {
            id: true,
            caseNumber: true,
            status: true,
            category: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        error: 'Customer not found',
        code: 'CUSTOMER_NOT_FOUND'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        customerId: customer.id,
        firstName: customer.firstName,
        middleName: customer.middleName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        dateOfBirth: customer.dateOfBirth,
        gender: customer.gender,
        emailVerified: customer.emailVerified,
        phoneVerified: customer.phoneVerified,
        profileCompleted: customer.profileCompleted,
        preferredLanguage: customer.preferredLanguage,
        preferredChannel: customer.preferredChannel,
        emailNotifications: customer.emailNotifications,
        smsNotifications: customer.smsNotifications,
        whatsappNotifications: customer.whatsappNotifications,
        oauthProvider: customer.oauthProvider,
        recentCases: customer.cases,
        createdAt: customer.createdAt
      }
    });

  } catch (error) {
    logger.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile',
      code: 'PROFILE_FETCH_ERROR'
    });
  }
});

// Update Customer Profile
app.put('/api/v1/customers/profile', [
  body('firstName').optional().isLength({ min: 2, max: 50 }).trim(),
  body('middleName').optional().isLength({ max: 50 }).trim(),
  body('lastName').optional().isLength({ min: 2, max: 50 }).trim(),
  body('phone').optional().isMobilePhone(),
  body('dateOfBirth').optional().isISO8601(),
  body('gender').optional().isIn(['MALE', 'FEMALE', 'PREFER_NOT_TO_SAY']),
  body('preferredLanguage').optional().isIn(['ENGLISH', 'GERMAN']),
  body('preferredChannel').optional().isIn(['EMAIL', 'SMS', 'WHATSAPP']),
  body('emailNotifications').optional().isBoolean(),
  body('smsNotifications').optional().isBoolean(),
  body('whatsappNotifications').optional().isBoolean()
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
        error: 'Access denied',
        code: 'ACCESS_DENIED'
      });
    }

    const updateData = { ...req.body };
    
    // Check if profile is being completed
    const currentCustomer = await prisma.customer.findUnique({
      where: { id: req.user.customerId }
    });

    if (!currentCustomer.profileCompleted && updateData.firstName && updateData.lastName) {
      updateData.profileCompleted = true;
    }

    const customer = await prisma.customer.update({
      where: { id: req.user.customerId },
      data: updateData
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        customerId: customer.id,
        firstName: customer.firstName,
        middleName: customer.middleName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        profileCompleted: customer.profileCompleted,
        updatedAt: customer.updatedAt
      }
    });

  } catch (error) {
    logger.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update profile',
      code: 'PROFILE_UPDATE_ERROR'
    });
  }
});

// Logout
app.post('/api/v1/customers/logout', authenticateToken, async (req, res) => {
  try {
    if (req.user.type !== 'customer') {
      return res.status(403).json({
        success: false,
        error: 'Access denied',
        code: 'ACCESS_DENIED'
      });
    }

    // Find and delete the session
    await prisma.customerSession.deleteMany({
      where: {
        customerId: req.user.customerId,
        sessionToken: req.headers.authorization.split(' ')[1]
      }
    });

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Logout failed',
      code: 'LOGOUT_ERROR'
    });
  }
});

// Cleanup expired temp sessions (run periodically)
setInterval(async () => {
  try {
    const result = await prisma.tempSubmission.deleteMany({
      where: {
        expiresAt: { lt: new Date() }
      }
    });
    
    if (result.count > 0) {
      logger.info(`Cleaned up ${result.count} expired temp sessions`);
    }
  } catch (error) {
    logger.error('Temp session cleanup error:', error);
  }
}, 15 * 60 * 1000); // Every 15 minutes

// Start server
app.listen(PORT, () => {
  console.log(`👤 Customer Onboarding Service v1.0 running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Register: POST /api/v1/customers/register`);
  console.log(`🚪 Login: POST /api/v1/customers/login`);
  console.log(`📱 Social Auth: POST /api/v1/customers/social-auth`);
  console.log(`✉️ Verify Email: POST /api/v1/customers/verify-email`);
  console.log(`👤 Profile: GET/PUT /api/v1/customers/profile`);
  console.log(`⏱️ Temp Sessions: POST/GET/PUT /api/v1/temp-sessions`);
  console.log(`🌐 OAuth Providers: Google, Apple`);
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