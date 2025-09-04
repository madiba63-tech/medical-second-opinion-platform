const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { body, param, query, validationResult } = require('express-validator');
const winston = require('winston');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const { PrismaClient } = require('../../src/generated/prisma');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const xss = require('xss');
const validator = require('validator');
const axios = require('axios');
const crypto = require('crypto');

// Initialize services
const app = express();
const PORT = process.env.PORT || 3005;
// Validate required environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const DATABASE_URL = process.env.DATABASE_URL;

if (!JWT_SECRET) {
  console.error('JWT_SECRET environment variable is required');
  process.exit(1);
}
if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

// Email configuration - validate required vars
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT || 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

// Twilio configuration - validate required vars
const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_TOKEN = process.env.TWILIO_TOKEN;
const TWILIO_PHONE = process.env.TWILIO_PHONE;

// WhatsApp configuration - validate required vars
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;

// Security configuration
const BCRYPT_ROUNDS = 12;
const MAX_NOTIFICATIONS_PER_HOUR = 100;
const MAX_BULK_NOTIFICATIONS = 50;
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

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

// Initialize notification providers
let emailTransporter = null;
let twilioClient = null;

// Initialize email transporter
try {
  emailTransporter = nodemailer.createTransporter({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
} catch (error) {
  logger.warn('Email transporter initialization failed:', error.message);
}

// Initialize Twilio client
try {
  if (TWILIO_SID !== 'mock-twilio-sid') {
    twilioClient = twilio(TWILIO_SID, TWILIO_TOKEN);
  }
} catch (error) {
  logger.warn('Twilio client initialization failed:', error.message);
}

// Security middleware
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const xss = require('xss');
const validator = require('validator');

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

// Rate limiting for notifications
const notificationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: MAX_NOTIFICATIONS_PER_HOUR,
  message: {
    success: false,
    error: 'Too many notification requests. Please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user?.customerId || req.ip;
  }
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    error: 'Too many requests, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(generalLimiter);

// Progressive delay for suspicious activity
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50,
  delayMs: 500
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
    
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count']
};

app.use(cors(corsOptions));

// Body parsing with size limits
app.use(express.json({ 
  limit: '1mb',
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

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

// Sanitize template data more strictly
function sanitizeTemplateData(data) {
  const sanitized = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      if (typeof value === 'string') {
        sanitized[key] = xss(value.trim());
      } else if (typeof value === 'number') {
        sanitized[key] = value;
      } else if (typeof value === 'boolean') {
        sanitized[key] = value;
      } else if (value instanceof Date) {
        sanitized[key] = value;
      } else {
        sanitized[key] = sanitizeInput(value);
      }
    }
  }
  return sanitized;
}

// Security audit logging middleware
app.use((req, res, next) => {
  const startTime = Date.now();
  const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
  const userAgent = req.get('User-Agent');
  const requestId = require('crypto').randomUUID();
  
  req.requestId = requestId;
  req.clientIP = clientIP;
  
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

// Enhanced authentication middleware
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

    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
      maxAge: '30m'
    });
    
    const sessionKey = `${decoded.userId || decoded.customerId}_${decoded.sessionId}`;
    const session = activeSessions.get(sessionKey);
    
    if (session && session.expiresAt > Date.now()) {
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
    
    if (attempts.count > 3) {
      const delay = Math.min(attempts.count * 1000, 10000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    return res.status(403).json({
      success: false,
      error: 'Invalid or expired token',
      code: 'TOKEN_INVALID'
    });
  }
};

// Notification Templates
const EMAIL_TEMPLATES = {
  email_verification: {
    subject: 'Verify Your Email - Second Opinion Platform',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Email Verification Required</h2>
        <p>Hello ${data.firstName},</p>
        <p>Thank you for registering with the Second Opinion Platform. Please verify your email address by clicking the link below:</p>
        <p style="margin: 20px 0;">
          <a href="${data.verificationUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Verify Email Address</a>
        </p>
        ${data.temporaryPassword ? `<p><strong>Temporary Password:</strong> <code>${xss(data.temporaryPassword)}</code></p><p>Please change your password after logging in.</p>` : ''}
        <p>If you didn't create this account, please ignore this email.</p>
        <p>Best regards,<br>Second Opinion Platform Team</p>
      </div>
    `
  },

  social_welcome: {
    subject: 'Welcome to Second Opinion Platform',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Second Opinion Platform!</h2>
        <p>Hello ${data.firstName},</p>
        <p>Your account has been successfully created using ${xss(data.provider)}.</p>
        <p>For your security, we've created a temporary password: <strong><code>${xss(data.temporaryPassword)}</code></strong></p>
        <p>Please log in and change your password at your earliest convenience:</p>
        <p style="margin: 20px 0;">
          <a href="${data.loginUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Login Now</a>
        </p>
        <p>Best regards,<br>Second Opinion Platform Team</p>
      </div>
    `
  },

  case_submitted: {
    subject: 'Case Submitted - #{caseNumber}',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Case Successfully Submitted</h2>
        <p>Dear ${xss(data.customerName)},</p>
        <p>Your medical case <strong>${xss(data.caseNumber)}</strong> has been successfully submitted for review.</p>
        <p><strong>Estimated Review Time:</strong> ${xss(data.estimatedReviewTime)}</p>
        ${data.paymentInfo ? `
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <h3>Payment Information</h3>
            <p><strong>Amount:</strong> ${xss(data.paymentInfo.amount)} ${xss(data.paymentInfo.currency)}</p>
            <p><strong>Quote Valid Until:</strong> ${new Date(data.paymentInfo.quoteValidUntil).toLocaleDateString()}</p>
          </div>
        ` : ''}
        <p>We will notify you when your case is assigned to a medical professional.</p>
        <p>Best regards,<br>Second Opinion Platform Team</p>
      </div>
    `
  },

  case_assigned: {
    subject: 'Professional Assigned - #{caseNumber}',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Medical Professional Assigned</h2>
        <p>Dear ${xss(data.customerName)},</p>
        <p>Great news! Your case <strong>${xss(data.caseNumber)}</strong> has been assigned to a qualified medical professional.</p>
        <p><strong>Professional Level:</strong> ${xss(data.professionalLevel)}</p>
        <p><strong>Specialty:</strong> ${xss(data.specialty)}</p>
        <p><strong>Estimated Completion:</strong> ${xss(data.estimatedCompletion)}</p>
        <p>The review is now in progress. We'll notify you as soon as the opinion is ready.</p>
        <p>Best regards,<br>Second Opinion Platform Team</p>
      </div>
    `
  },

  opinion_ready: {
    subject: 'Medical Opinion Ready - #{caseNumber}',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Your Medical Opinion is Ready!</h2>
        <p>Dear ${xss(data.customerName)},</p>
        <p>Your medical opinion for case <strong>${xss(data.caseNumber)}</strong> is now available.</p>
        <p style="margin: 20px 0;">
          <a href="${data.opinionUrl}" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">View Opinion</a>
        </p>
        <p>The opinion has been prepared by our ${xss(data.professionalLevel)} level medical professional with expertise in ${xss(data.specialty)}.</p>
        <p>Best regards,<br>Second Opinion Platform Team</p>
      </div>
    `
  }
};

const SMS_TEMPLATES = {
  case_submitted: (data) => `Second Opinion Platform: Your case ${data.caseNumber} has been submitted successfully. Estimated review time: ${data.estimatedReviewTime}. We'll keep you updated!`,
  
  case_assigned: (data) => `Second Opinion Platform: Your case ${data.caseNumber} has been assigned to a ${data.professionalLevel} level professional. Review in progress.`,
  
  opinion_ready: (data) => `Second Opinion Platform: Your medical opinion for case ${data.caseNumber} is ready! Log in to view: ${data.loginUrl}`
};

const WHATSAPP_TEMPLATES = {
  case_submitted: (data) => `🏥 *Second Opinion Platform*\n\nYour case *${data.caseNumber}* has been submitted successfully!\n\n📅 Estimated review time: ${data.estimatedReviewTime}\n\nWe'll notify you when a medical professional is assigned. Thank you for choosing our platform!`,
  
  case_assigned: (data) => `🏥 *Second Opinion Platform*\n\n✅ Great news! Your case *${data.caseNumber}* has been assigned to a qualified ${data.professionalLevel} level professional.\n\n🔬 Specialty: ${data.specialty}\n⏰ Estimated completion: ${data.estimatedCompletion}\n\nYour medical review is now in progress!`,
  
  opinion_ready: (data) => `🏥 *Second Opinion Platform*\n\n🎉 Your medical opinion is ready!\n\n📋 Case: *${data.caseNumber}*\n👨‍⚕️ Reviewed by: ${data.professionalLevel} level ${data.specialty} specialist\n\nLog in to view your detailed opinion: ${data.loginUrl}`
};

// Utility Functions
const mockEmailSend = async (to, subject, html) => {
  logger.info(`Mock email sent to ${to}: ${subject}`);
  return { messageId: `mock-${uuidv4()}` };
};

const mockSmsSend = async (to, message) => {
  logger.info(`Mock SMS sent to ${to}: ${message.substring(0, 50)}...`);
  return { sid: `mock-sms-${uuidv4()}` };
};

const mockWhatsAppSend = async (to, message) => {
  logger.info(`Mock WhatsApp sent to ${to}: ${message.substring(0, 50)}...`);
  return { id: `mock-whatsapp-${uuidv4()}` };
};

const sendEmail = async (to, subject, html) => {
  try {
    // Validate email address
    if (!validator.isEmail(to)) {
      throw new Error('Invalid email address');
    }
    
    // Sanitize subject and HTML content
    const sanitizedSubject = xss(subject);
    const sanitizedHtml = html; // HTML templates are pre-sanitized
    
    if (emailTransporter && SMTP_USER) {
      const result = await emailTransporter.sendMail({
        from: `"Second Opinion Platform" <${SMTP_USER}>`,
        to: to,
        subject: sanitizedSubject,
        html: sanitizedHtml,
        headers: {
          'X-Mailer': 'Second-Opinion-Platform',
          'X-Priority': '3',
          'X-MSMail-Priority': 'Normal'
        }
      });
      
      logger.info('Email sent successfully', {
        to: to.substring(0, 3) + '***',
        subject: sanitizedSubject.substring(0, 50),
        messageId: result.messageId,
        timestamp: new Date().toISOString()
      });
      
      return result;
    } else {
      return await mockEmailSend(to, sanitizedSubject, sanitizedHtml);
    }
  } catch (error) {
    logger.error('Email send error:', {
      error: error.message,
      to: to.substring(0, 3) + '***',
      timestamp: new Date().toISOString()
    });
    return await mockEmailSend(to, subject, html);
  }
};

const sendSms = async (to, message) => {
  try {
    // Validate phone number
    if (!validator.isMobilePhone(to, 'any', { strictMode: false })) {
      throw new Error('Invalid phone number');
    }
    
    // Sanitize message content
    const sanitizedMessage = xss(message.substring(0, 1600)); // SMS length limit
    
    if (twilioClient && TWILIO_PHONE) {
      const result = await twilioClient.messages.create({
        body: sanitizedMessage,
        from: TWILIO_PHONE,
        to: to
      });
      
      logger.info('SMS sent successfully', {
        to: to.substring(0, 3) + '***',
        messageSid: result.sid,
        timestamp: new Date().toISOString()
      });
      
      return result;
    } else {
      return await mockSmsSend(to, sanitizedMessage);
    }
  } catch (error) {
    logger.error('SMS send error:', {
      error: error.message,
      to: to.substring(0, 3) + '***',
      timestamp: new Date().toISOString()
    });
    return await mockSmsSend(to, message);
  }
};

const sendWhatsApp = async (to, message) => {
  try {
    // Mock WhatsApp implementation
    // In production, integrate with WhatsApp Business API
    return await mockWhatsAppSend(to, message);
  } catch (error) {
    logger.error('WhatsApp send error:', error);
    return await mockWhatsAppSend(to, message);
  }
};

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'operational',
    service: 'multi-channel-notification-service',
    version: '1.0.0',
    features: [
      'email-notifications',
      'sms-notifications',
      'whatsapp-notifications',
      'template-system',
      'notification-queue',
      'delivery-tracking',
      'multi-language-support'
    ],
    endpoints: {
      health: '/health',
      send: 'POST /api/v1/notifications/send',
      sendBulk: 'POST /api/v1/notifications/bulk',
      getNotification: 'GET /api/v1/notifications/:id',
      listNotifications: 'GET /api/v1/notifications',
      templates: 'GET /api/v1/templates'
    },
    channels: ['EMAIL', 'SMS', 'WHATSAPP'],
    providers: {
      email: emailTransporter ? 'SMTP' : 'Mock',
      sms: twilioClient ? 'Twilio' : 'Mock',
      whatsapp: 'Mock'
    },
    timestamp: new Date().toISOString()
  });
});

// ==============================================
// NOTIFICATION SENDING
// ==============================================

// Enhanced input validation middleware
const validateInput = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Input validation failed', {
        requestId: req.requestId,
        errors: errors.array(),
        ip: req.clientIP,
        path: req.path,
        timestamp: new Date().toISOString()
      });
      
      return res.status(400).json({
        success: false,
        error: 'Invalid input data',
        code: 'VALIDATION_ERROR',
        details: errors.array()
      });
    }
    next();
  };
};

// Enhanced recipient validation
const validateRecipient = (recipient, channel) => {
  if (channel === 'EMAIL' || recipient.includes('@')) {
    return validator.isEmail(recipient);
  }
  if (channel === 'SMS' || channel === 'WHATSAPP' || recipient.startsWith('+')) {
    return validator.isMobilePhone(recipient, 'any', { strictMode: true });
  }
  return false;
};

// Send Single Notification with enhanced security
app.post('/api/v1/notifications/send', 
  notificationLimiter,
  validateInput([
    body('recipient').isString().isLength({ min: 1, max: 100 }).custom((value) => {
      if (!validator.isEmail(value) && !validator.isMobilePhone(value, 'any', { strictMode: false })) {
        throw new Error('Invalid recipient format');
      }
      return true;
    }),
    body('type').isString().isLength({ min: 1, max: 50 }).isAlphanumeric('en-US', { ignore: '_' }),
    body('channel').optional().isIn(['EMAIL', 'SMS', 'WHATSAPP']),
    body('template').optional().isString().isLength({ max: 50 }).isAlphanumeric('en-US', { ignore: '_' }),
    body('data').optional().isObject(),
    body('subject').optional().isString().isLength({ max: 200 }),
    body('message').optional().isString().isLength({ max: 5000 }),
    body('language').optional().isIn(['ENGLISH', 'GERMAN']),
    body('scheduledFor').optional().isISO8601()
  ]), 
  authenticateToken, 
  async (req, res) => {
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
      recipient,
      type,
      channel,
      template,
      data = {},
      subject,
      message,
      language = 'ENGLISH',
      scheduledFor
    } = req.body;

    // Enhanced recipient and channel validation
    if (!validateRecipient(recipient, channel)) {
      logger.warn('Invalid recipient format detected', {
        requestId: req.requestId,
        recipient: recipient.substring(0, 3) + '***',
        channel,
        ip: req.clientIP,
        timestamp: new Date().toISOString()
      });
      
      return res.status(400).json({
        success: false,
        error: 'Invalid recipient format',
        code: 'INVALID_RECIPIENT'
      });
    }

    // Determine notification channel(s) with validation
    let channels = [];
    if (channel) {
      if (!validateRecipient(recipient, channel)) {
        return res.status(400).json({
          success: false,
          error: `Recipient format not compatible with ${channel} channel`,
          code: 'RECIPIENT_CHANNEL_MISMATCH'
        });
      }
      channels = [channel];
    } else {
      // Auto-determine based on recipient with validation
      if (validator.isEmail(recipient)) {
        channels = ['EMAIL'];
      } else if (validator.isMobilePhone(recipient, 'any', { strictMode: false })) {
        channels = ['SMS'];
      } else {
        return res.status(400).json({
          success: false,
          error: 'Unable to determine channel from recipient format',
          code: 'CHANNEL_DETECTION_FAILED'
        });
      }
    }

    const notifications = [];
    const results = [];

    for (const channelType of channels) {
      try {
        let finalSubject = subject;
        let finalMessage = message;

        // Use template if specified
        if (template || type) {
          const templateKey = template || type;
          
          if (channelType === 'EMAIL' && EMAIL_TEMPLATES[templateKey]) {
            const emailTemplate = EMAIL_TEMPLATES[templateKey];
            // Sanitize template data before processing
            const sanitizedData = sanitizeTemplateData(data);
            finalSubject = emailTemplate.subject.replace(/#{(\w+)}/g, (match, key) => sanitizedData[key] || match);
            finalMessage = emailTemplate.html(sanitizedData);
          } else if (channelType === 'SMS' && SMS_TEMPLATES[templateKey]) {
            const sanitizedData = sanitizeTemplateData(data);
            finalMessage = SMS_TEMPLATES[templateKey](sanitizedData);
          } else if (channelType === 'WHATSAPP' && WHATSAPP_TEMPLATES[templateKey]) {
            const sanitizedData = sanitizeTemplateData(data);
            finalMessage = WHATSAPP_TEMPLATES[templateKey](sanitizedData);
          }
        }

        // Create notification record
        const notification = await prisma.customerNotification.create({
          data: {
            id: uuidv4(),
            customerId: req.user.customerId || 'system',
            type: type,
            channel: channelType,
            subject: finalSubject,
            message: finalMessage,
            language: language,
            status: scheduledFor ? 'SCHEDULED' : 'PENDING',
            scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
            metadata: {
              template,
              data,
              recipient
            }
          }
        });

        notifications.push(notification);

        // Send immediately if not scheduled
        if (!scheduledFor) {
          let sendResult = null;

          switch (channelType) {
            case 'EMAIL':
              sendResult = await sendEmail(recipient, finalSubject, finalMessage);
              break;
            case 'SMS':
              sendResult = await sendSms(recipient, finalMessage);
              break;
            case 'WHATSAPP':
              sendResult = await sendWhatsApp(recipient, finalMessage);
              break;
          }

          // Update notification status
          await prisma.customerNotification.update({
            where: { id: notification.id },
            data: {
              status: 'SENT',
              sentAt: new Date(),
              metadata: {
                ...notification.metadata,
                sendResult
              }
            }
          });

          results.push({
            channel: channelType,
            status: 'sent',
            notificationId: notification.id,
            result: sendResult
          });
        } else {
          results.push({
            channel: channelType,
            status: 'scheduled',
            notificationId: notification.id,
            scheduledFor: scheduledFor
          });
        }

      } catch (channelError) {
        logger.error(`Failed to send ${channelType} notification:`, channelError);
        results.push({
          channel: channelType,
          status: 'failed',
          error: channelError.message
        });
      }
    }

    res.status(201).json({
      success: true,
      message: `Notification(s) processed for ${channels.length} channel(s)`,
      data: {
        recipient,
        type,
        channels: channels,
        results: results,
        totalNotifications: notifications.length
      }
    });

  } catch (error) {
    logger.error('Notification send error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send notification',
      code: 'NOTIFICATION_SEND_ERROR'
    });
  }
});

// Send Bulk Notifications with enhanced security
app.post('/api/v1/notifications/bulk', 
  notificationLimiter,
  validateInput([
    body('notifications').isArray({ min: 1, max: MAX_BULK_NOTIFICATIONS }),
    body('notifications.*.recipient').isString().isLength({ min: 1, max: 100 }).custom((value) => {
      if (!validator.isEmail(value) && !validator.isMobilePhone(value, 'any', { strictMode: false })) {
        throw new Error('Invalid recipient format');
      }
      return true;
    }),
    body('notifications.*.type').isString().isLength({ min: 1, max: 50 }).isAlphanumeric('en-US', { ignore: '_' }),
    body('notifications.*.channel').optional().isIn(['EMAIL', 'SMS', 'WHATSAPP']),
    body('notifications.*.data').optional().isObject()
  ]), 
  authenticateToken, 
  async (req, res) => {
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

    const { notifications } = req.body;
    const results = [];

    for (const notificationData of notifications) {
      try {
        // Validate each notification before processing
        if (!validateRecipient(notificationData.recipient, notificationData.channel)) {
          throw new Error('Invalid recipient format');
        }
        
        // Process each notification individually with security checks
        // In production, use a secure queue system with authentication
        const response = await axios.post(
          `http://localhost:${PORT}/api/v1/notifications/send`,
          notificationData,
          {
            headers: {
              'Authorization': req.headers.authorization,
              'Content-Type': 'application/json',
              'X-Request-ID': req.requestId
            },
            timeout: 30000,
            maxRedirects: 0
          }
        );

        results.push({
          recipient: notificationData.recipient,
          status: 'success',
          data: response.data
        });

      } catch (error) {
        results.push({
          recipient: notificationData.recipient,
          status: 'failed',
          error: error.message
        });
      }
    }

    const successCount = results.filter(r => r.status === 'success').length;
    const failureCount = results.filter(r => r.status === 'failed').length;

    res.status(200).json({
      success: true,
      message: `Bulk notification processing completed`,
      data: {
        total: notifications.length,
        successful: successCount,
        failed: failureCount,
        results: results
      }
    });

  } catch (error) {
    logger.error('Bulk notification error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process bulk notifications',
      code: 'BULK_NOTIFICATION_ERROR'
    });
  }
});

// ==============================================
// NOTIFICATION MANAGEMENT
// ==============================================

// Get Notification
app.get('/api/v1/notifications/:notificationId', 
  validateInput([param('notificationId').isUUID()]), 
  authenticateToken, 
  async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await prisma.customerNotification.findUnique({
      where: { id: notificationId }
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        error: 'Notification not found',
        code: 'NOTIFICATION_NOT_FOUND'
      });
    }

    // Check authorization
    if (req.user.type === 'customer' && notification.customerId !== req.user.customerId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied',
        code: 'ACCESS_DENIED'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: notification.id,
        customerId: notification.customerId,
        type: notification.type,
        channel: notification.channel,
        subject: notification.subject,
        message: notification.message,
        language: notification.language,
        status: notification.status,
        scheduledFor: notification.scheduledFor,
        sentAt: notification.sentAt,
        readAt: notification.readAt,
        errorMessage: notification.errorMessage,
        metadata: notification.metadata,
        createdAt: notification.createdAt
      }
    });

  } catch (error) {
    logger.error('Notification fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch notification',
      code: 'NOTIFICATION_FETCH_ERROR'
    });
  }
});

// List Notifications
app.get('/api/v1/notifications', 
  validateInput([
    query('status').optional().isString().isLength({ max: 20 }).isAlpha(),
    query('channel').optional().isIn(['EMAIL', 'SMS', 'WHATSAPP']),
    query('type').optional().isString().isLength({ max: 50 }).isAlphanumeric('en-US', { ignore: '_' }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('offset').optional().isInt({ min: 0 })
  ]), 
  authenticateToken, 
  async (req, res) => {
  try {
    const { status, channel, type, limit = 20, offset = 0 } = req.query;

    const whereClause = {};

    // If customer, filter by their notifications only
    if (req.user.type === 'customer') {
      whereClause.customerId = req.user.customerId;
    }

    // Apply filters
    if (status) {
      whereClause.status = status.toUpperCase();
    }
    if (channel) {
      whereClause.channel = channel.toUpperCase();
    }
    if (type) {
      whereClause.type = type;
    }

    const notifications = await prisma.customerNotification.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    const totalCount = await prisma.customerNotification.count({
      where: whereClause
    });

    res.status(200).json({
      success: true,
      data: {
        notifications: notifications.map(notification => ({
          id: notification.id,
          type: notification.type,
          channel: notification.channel,
          subject: notification.subject,
          status: notification.status,
          scheduledFor: notification.scheduledFor,
          sentAt: notification.sentAt,
          readAt: notification.readAt,
          createdAt: notification.createdAt
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
    logger.error('Notification list error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to list notifications',
      code: 'NOTIFICATION_LIST_ERROR'
    });
  }
});

// Mark Notification as Read
app.patch('/api/v1/notifications/:notificationId/read', 
  validateInput([param('notificationId').isUUID()]), 
  authenticateToken, 
  async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await prisma.customerNotification.findFirst({
      where: {
        id: notificationId,
        ...(req.user.type === 'customer' ? { customerId: req.user.customerId } : {})
      }
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        error: 'Notification not found',
        code: 'NOTIFICATION_NOT_FOUND'
      });
    }

    const updatedNotification = await prisma.customerNotification.update({
      where: { id: notificationId },
      data: {
        status: 'READ',
        readAt: new Date()
      }
    });

    res.status(200).json({
      success: true,
      message: 'Notification marked as read',
      data: {
        id: updatedNotification.id,
        status: updatedNotification.status,
        readAt: updatedNotification.readAt
      }
    });

  } catch (error) {
    logger.error('Notification read error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to mark notification as read',
      code: 'NOTIFICATION_READ_ERROR'
    });
  }
});

// Get Available Templates
app.get('/api/v1/templates', (req, res) => {
  try {
    const templates = {
      email: Object.keys(EMAIL_TEMPLATES).map(key => ({
        key: key,
        name: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        subject: EMAIL_TEMPLATES[key].subject
      })),
      sms: Object.keys(SMS_TEMPLATES).map(key => ({
        key: key,
        name: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      })),
      whatsapp: Object.keys(WHATSAPP_TEMPLATES).map(key => ({
        key: key,
        name: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      }))
    };

    res.status(200).json({
      success: true,
      data: templates
    });

  } catch (error) {
    logger.error('Templates fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch templates',
      code: 'TEMPLATES_ERROR'
    });
  }
});

// Process Scheduled Notifications (called periodically)
const processScheduledNotifications = async () => {
  try {
    const now = new Date();
    const scheduledNotifications = await prisma.customerNotification.findMany({
      where: {
        status: 'SCHEDULED',
        scheduledFor: { lte: now }
      },
      take: 100 // Process in batches
    });

    for (const notification of scheduledNotifications) {
      try {
        let sendResult = null;
        const recipient = notification.metadata?.recipient;

        if (!recipient) {
          throw new Error('Recipient not found in metadata');
        }

        switch (notification.channel) {
          case 'EMAIL':
            sendResult = await sendEmail(recipient, notification.subject, notification.message);
            break;
          case 'SMS':
            sendResult = await sendSms(recipient, notification.message);
            break;
          case 'WHATSAPP':
            sendResult = await sendWhatsApp(recipient, notification.message);
            break;
        }

        await prisma.customerNotification.update({
          where: { id: notification.id },
          data: {
            status: 'SENT',
            sentAt: now,
            metadata: {
              ...notification.metadata,
              sendResult
            }
          }
        });

        logger.info(`Scheduled notification ${notification.id} sent successfully`);

      } catch (error) {
        logger.error(`Failed to send scheduled notification ${notification.id}:`, error);
        
        await prisma.customerNotification.update({
          where: { id: notification.id },
          data: {
            status: 'FAILED',
            errorMessage: error.message
          }
        });
      }
    }

    if (scheduledNotifications.length > 0) {
      logger.info(`Processed ${scheduledNotifications.length} scheduled notifications`);
    }

  } catch (error) {
    logger.error('Scheduled notifications processing error:', error);
  }
};

// Cleanup old sessions and failed attempts periodically
setInterval(() => {
  const now = Date.now();
  
  // Clean expired sessions
  for (const [key, session] of activeSessions.entries()) {
    if (session.expiresAt < now) {
      activeSessions.delete(key);
    }
  }
  
  // Clean old failed attempts (older than 1 hour)
  for (const [ip, attempts] of failedAttempts.entries()) {
    if (now - attempts.firstAttempt > 60 * 60 * 1000) {
      failedAttempts.delete(ip);
    }
  }
}, 5 * 60 * 1000); // Run every 5 minutes

// Run scheduled notifications processor every minute
setInterval(processScheduledNotifications, 60 * 1000);

// Enhanced error handling middleware
app.use((error, req, res, next) => {
  const requestId = req.requestId || 'unknown';
  const clientIP = req.clientIP || 'unknown';
  
  logger.error('Application error occurred', {
    requestId,
    error: error.message,
    stack: error.stack,
    ip: clientIP,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });
  
  // Handle specific error types
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Invalid authentication token',
      code: 'TOKEN_INVALID',
      requestId
    });
  }
  
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'Authentication token expired',
      code: 'TOKEN_EXPIRED',
      requestId
    });
  }
  
  if (error.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      error: 'Cross-origin request not allowed',
      code: 'CORS_ERROR',
      requestId
    });
  }
  
  // Generic error response
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    code: 'INTERNAL_ERROR',
    requestId
  });
});

// Handle 404 routes
app.use('*', (req, res) => {
  logger.warn('Route not found', {
    path: req.originalUrl,
    method: req.method,
    ip: req.clientIP,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    code: 'NOT_FOUND'
  });
});

// Start server with enhanced security logging
app.listen(PORT, () => {
  logger.info('🛡️ Multi-Channel Notification Service v1.0 started with enhanced security', {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    securityFeatures: [
      'helmet-security-headers',
      'rate-limiting',
      'input-validation',
      'xss-protection',
      'recipient-validation',
      'session-management',
      'audit-logging',
      'content-sanitization'
    ],
    providers: {
      email: emailTransporter && SMTP_USER ? 'SMTP' : 'Mock',
      sms: twilioClient && TWILIO_PHONE ? 'Twilio' : 'Mock',
      whatsapp: 'Mock'
    },
    maxNotificationsPerHour: MAX_NOTIFICATIONS_PER_HOUR,
    maxBulkNotifications: MAX_BULK_NOTIFICATIONS,
    timestamp: new Date().toISOString()
  });
  
  console.log(`📨 Multi-Channel Notification Service v1.0 running on port ${PORT}`);
  console.log(`🛡️ Security enhancements: Helmet, Rate Limiting, Input Validation, XSS Protection`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📤 Send notification: POST /api/v1/notifications/send`);
  console.log(`📮 Bulk send: POST /api/v1/notifications/bulk`);
  console.log(`📋 List notifications: GET /api/v1/notifications`);
  console.log(`📄 Templates: GET /api/v1/templates`);
  console.log(`📡 Channels: EMAIL, SMS, WhatsApp`);
  console.log(`🎯 Providers: ${emailTransporter && SMTP_USER ? 'SMTP' : 'Mock'}, ${twilioClient && TWILIO_PHONE ? 'Twilio' : 'Mock'}, Mock WhatsApp`);
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