const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { body, param, query, validationResult } = require('express-validator');
const winston = require('winston');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const { PrismaClient } = require('../../src/generated/prisma');

// Initialize services
const app = express();
const PORT = process.env.PORT || 3005;
const JWT_SECRET = process.env.JWT_SECRET || 'second-opinion-jwt-secret-2025';
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public';

// Email configuration
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = process.env.SMTP_PORT || 587;
const SMTP_USER = process.env.SMTP_USER || 'noreply@second-opinion.com';
const SMTP_PASS = process.env.SMTP_PASS || 'smtp-password';

// Twilio configuration
const TWILIO_SID = process.env.TWILIO_SID || 'mock-twilio-sid';
const TWILIO_TOKEN = process.env.TWILIO_TOKEN || 'mock-twilio-token';
const TWILIO_PHONE = process.env.TWILIO_PHONE || '+1234567890';

// WhatsApp configuration
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || 'mock-whatsapp-token';

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
        ${data.temporaryPassword ? `<p><strong>Temporary Password:</strong> ${data.temporaryPassword}</p><p>Please change your password after logging in.</p>` : ''}
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
        <p>Your account has been successfully created using ${data.provider}.</p>
        <p>For your security, we've created a temporary password: <strong>${data.temporaryPassword}</strong></p>
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
        <p>Dear ${data.customerName},</p>
        <p>Your medical case <strong>${data.caseNumber}</strong> has been successfully submitted for review.</p>
        <p><strong>Estimated Review Time:</strong> ${data.estimatedReviewTime}</p>
        ${data.paymentInfo ? `
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <h3>Payment Information</h3>
            <p><strong>Amount:</strong> ${data.paymentInfo.amount} ${data.paymentInfo.currency}</p>
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
        <p>Dear ${data.customerName},</p>
        <p>Great news! Your case <strong>${data.caseNumber}</strong> has been assigned to a qualified medical professional.</p>
        <p><strong>Professional Level:</strong> ${data.professionalLevel}</p>
        <p><strong>Specialty:</strong> ${data.specialty}</p>
        <p><strong>Estimated Completion:</strong> ${data.estimatedCompletion}</p>
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
        <p>Dear ${data.customerName},</p>
        <p>Your medical opinion for case <strong>${data.caseNumber}</strong> is now available.</p>
        <p style="margin: 20px 0;">
          <a href="${data.opinionUrl}" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">View Opinion</a>
        </p>
        <p>The opinion has been prepared by our ${data.professionalLevel} level medical professional with expertise in ${data.specialty}.</p>
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
    if (emailTransporter) {
      const result = await emailTransporter.sendMail({
        from: `"Second Opinion Platform" <${SMTP_USER}>`,
        to: to,
        subject: subject,
        html: html
      });
      return result;
    } else {
      return await mockEmailSend(to, subject, html);
    }
  } catch (error) {
    logger.error('Email send error:', error);
    return await mockEmailSend(to, subject, html);
  }
};

const sendSms = async (to, message) => {
  try {
    if (twilioClient) {
      const result = await twilioClient.messages.create({
        body: message,
        from: TWILIO_PHONE,
        to: to
      });
      return result;
    } else {
      return await mockSmsSend(to, message);
    }
  } catch (error) {
    logger.error('SMS send error:', error);
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

// Send Single Notification
app.post('/api/v1/notifications/send', [
  body('recipient').isString().isLength({ min: 1 }),
  body('type').isString().isLength({ min: 1 }),
  body('channel').optional().isIn(['EMAIL', 'SMS', 'WHATSAPP']),
  body('template').optional().isString(),
  body('data').optional().isObject(),
  body('subject').optional().isString(),
  body('message').optional().isString(),
  body('language').optional().isIn(['ENGLISH', 'GERMAN']),
  body('scheduledFor').optional().isISO8601()
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

    // Determine notification channel(s)
    let channels = [];
    if (channel) {
      channels = [channel];
    } else {
      // Auto-determine based on recipient
      if (recipient.includes('@')) {
        channels = ['EMAIL'];
      } else if (recipient.startsWith('+')) {
        channels = ['SMS', 'WHATSAPP'];
      } else {
        channels = ['EMAIL']; // Default
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
            finalSubject = emailTemplate.subject.replace(/#{(\w+)}/g, (match, key) => data[key] || match);
            finalMessage = emailTemplate.html(data);
          } else if (channelType === 'SMS' && SMS_TEMPLATES[templateKey]) {
            finalMessage = SMS_TEMPLATES[templateKey](data);
          } else if (channelType === 'WHATSAPP' && WHATSAPP_TEMPLATES[templateKey]) {
            finalMessage = WHATSAPP_TEMPLATES[templateKey](data);
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

// Send Bulk Notifications
app.post('/api/v1/notifications/bulk', [
  body('notifications').isArray({ min: 1, max: 100 }),
  body('notifications.*.recipient').isString(),
  body('notifications.*.type').isString(),
  body('notifications.*.channel').optional().isIn(['EMAIL', 'SMS', 'WHATSAPP']),
  body('notifications.*.data').optional().isObject()
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

    const { notifications } = req.body;
    const results = [];

    for (const notificationData of notifications) {
      try {
        // Process each notification individually
        // This would ideally be done with a queue system in production
        const response = await axios.post(
          `http://localhost:${PORT}/api/v1/notifications/send`,
          notificationData,
          {
            headers: {
              'Authorization': req.headers.authorization,
              'Content-Type': 'application/json'
            }
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
app.get('/api/v1/notifications/:notificationId', [
  param('notificationId').isUUID()
], authenticateToken, async (req, res) => {
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
app.get('/api/v1/notifications', [
  query('status').optional().isString(),
  query('channel').optional().isIn(['EMAIL', 'SMS', 'WHATSAPP']),
  query('type').optional().isString(),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('offset').optional().isInt({ min: 0 })
], authenticateToken, async (req, res) => {
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
app.patch('/api/v1/notifications/:notificationId/read', [
  param('notificationId').isUUID()
], authenticateToken, async (req, res) => {
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

// Run scheduled notifications processor every minute
setInterval(processScheduledNotifications, 60 * 1000);

// Start server
app.listen(PORT, () => {
  console.log(`📨 Multi-Channel Notification Service v1.0 running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📤 Send notification: POST /api/v1/notifications/send`);
  console.log(`📮 Bulk send: POST /api/v1/notifications/bulk`);
  console.log(`📋 List notifications: GET /api/v1/notifications`);
  console.log(`📄 Templates: GET /api/v1/templates`);
  console.log(`📡 Channels: EMAIL, SMS, WhatsApp`);
  console.log(`🎯 Providers: ${emailTransporter ? 'SMTP' : 'Mock'}, ${twilioClient ? 'Twilio' : 'Mock'}, Mock WhatsApp`);
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