const express = require('express');
const cors = require('cors');
const { body, param, query, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const Decimal = require('decimal.js');
const cron = require('node-cron');
const winston = require('winston');
const _ = require('lodash');
const moment = require('moment');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { PrismaClient } = require('../../src/generated/prisma');

// Initialize services
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

const PORT = process.env.PORT || 3009;
const JWT_SECRET = process.env.JWT_SECRET || 'admin-management-jwt-secret-2025';
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public';
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
    userAgent: req.get('User-Agent'),
    adminUser: req.user?.email || 'anonymous'
  });
  next();
});

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Admin access token required',
      code: 'ADMIN_TOKEN_MISSING'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.role || !['admin', 'super_admin', 'quality_manager'].includes(decoded.role)) {
      return res.status(403).json({
        success: false,
        error: 'Admin privileges required',
        code: 'INSUFFICIENT_PRIVILEGES'
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Admin token verification failed:', error);
    return res.status(403).json({
      success: false,
      error: 'Invalid or expired admin token',
      code: 'ADMIN_TOKEN_INVALID'
    });
  }
};

// Utility Functions

// Calculate platform health metrics
const calculatePlatformHealth = async () => {
  const now = new Date();
  const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalCases,
    activeCases,
    completedCases24h,
    totalProfessionals,
    activeProfessionals,
    pendingApplications,
    orphanedCases,
    breachedSLACases,
    totalRevenue24h
  ] = await Promise.all([
    prisma.medicalCase.count(),
    prisma.medicalCase.count({
      where: {
        status: {
          in: ['FILES_UPLOADED', 'QUESTIONNAIRE_COMPLETED', 'PAYMENT_CONFIRMED', 'ASSIGNED_TO_PROFESSIONAL', 'IN_REVIEW']
        }
      }
    }),
    prisma.medicalCase.count({
      where: {
        status: 'COMPLETED',
        completedAt: { gte: last24Hours }
      }
    }),
    prisma.medicalProfessional.count(),
    prisma.medicalProfessional.count({
      where: {
        vetted: true,
        status: 'active'
      }
    }),
    prisma.medicalProfessional.count({
      where: {
        vetted: false,
        status: 'pending_review'
      }
    }),
    prisma.medicalCase.count({
      where: {
        assignedProfessionalId: null,
        status: { in: ['FILES_UPLOADED', 'QUESTIONNAIRE_COMPLETED', 'PAYMENT_CONFIRMED'] },
        createdAt: { lte: last24Hours }
      }
    }),
    prisma.medicalCase.count({
      where: {
        status: { in: ['ASSIGNED_TO_PROFESSIONAL', 'IN_REVIEW'] },
        assignedAt: { lte: new Date(now.getTime() - 72 * 60 * 60 * 1000) } // 72 hours SLA
      }
    }),
    prisma.caseInvoice.aggregate({
      where: {
        status: 'paid',
        paidAt: { gte: last24Hours }
      },
      _sum: {
        totalAmount: true
      }
    })
  ]);

  const healthScore = Math.round(
    (activeProfessionals / Math.max(totalProfessionals, 1)) * 40 +
    (completedCases24h / Math.max(activeCases, 1)) * 30 +
    (1 - orphanedCases / Math.max(activeCases, 1)) * 20 +
    (1 - breachedSLACases / Math.max(activeCases, 1)) * 10
  );

  return {
    healthScore,
    cases: {
      total: totalCases,
      active: activeCases,
      completed24h: completedCases24h,
      orphaned: orphanedCases,
      breachedSLA: breachedSLACases
    },
    professionals: {
      total: totalProfessionals,
      active: activeProfessionals,
      pendingApplications: pendingApplications
    },
    revenue: {
      last24h: totalRevenue24h._sum.totalAmount || 0
    },
    alerts: {
      orphanedCases: orphanedCases > 0,
      breachedSLA: breachedSLACases > 0,
      pendingApplications: pendingApplications > 10
    }
  };
};

// Professional performance scoring
const calculateProfessionalPerformance = async (professionalId, timeframe = '30d') => {
  const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const [cases, avgRating, responseTime, completionRate] = await Promise.all([
    prisma.medicalCase.findMany({
      where: {
        assignedProfessionalId: professionalId,
        assignedAt: { gte: startDate }
      },
      select: {
        status: true,
        assignedAt: true,
        completedAt: true,
        rating: true,
        urgency: true
      }
    }),
    prisma.medicalCase.aggregate({
      where: {
        assignedProfessionalId: professionalId,
        rating: { not: null },
        completedAt: { gte: startDate }
      },
      _avg: { rating: true }
    }),
    prisma.medicalCase.aggregate({
      where: {
        assignedProfessionalId: professionalId,
        completedAt: { gte: startDate }
      },
      _avg: {
        // This would be calculated from assignedAt to first activity
      }
    }),
    // Calculate completion rate
    prisma.$queryRaw`
      SELECT 
        COUNT(*) as total_cases,
        COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) as completed_cases
      FROM "MedicalCase" 
      WHERE "assignedProfessionalId" = ${professionalId} 
      AND "assignedAt" >= ${startDate}
    `
  ]);

  const completionRateData = completionRate[0] || { total_cases: 0, completed_cases: 0 };
  const rate = completionRateData.total_cases > 0 
    ? Number(completionRateData.completed_cases) / Number(completionRateData.total_cases) 
    : 0;

  // Calculate average response time in hours
  const avgResponseHours = cases.reduce((acc, case_) => {
    if (case_.completedAt && case_.assignedAt) {
      const diff = new Date(case_.completedAt) - new Date(case_.assignedAt);
      return acc + (diff / (1000 * 60 * 60)); // Convert to hours
    }
    return acc;
  }, 0) / Math.max(cases.filter(c => c.completedAt).length, 1);

  const performanceScore = Math.round(
    (avgRating._avg?.rating || 0) * 20 + // 0-100 points from rating (5 stars * 20)
    Math.min(rate * 40, 40) + // 0-40 points from completion rate
    Math.max(40 - Math.min(avgResponseHours / 24, 1) * 40, 0) // 0-40 points for response time (penalty for >24h)
  );

  return {
    performanceScore,
    totalCases: Number(completionRateData.total_cases),
    completedCases: Number(completionRateData.completed_cases),
    completionRate: rate,
    averageRating: avgRating._avg?.rating || null,
    averageResponseTime: avgResponseHours,
    timeframe
  };
};

// API Routes

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'operational',
    service: 'admin-management-service',
    version: '1.0.0',
    features: [
      'platform-monitoring',
      'professional-application-review',
      'case-exception-handling',
      'quality-assurance-oversight',
      'performance-analytics',
      'sla-monitoring',
      'admin-dashboards',
      'real-time-alerts'
    ],
    endpoints: {
      health: '/health',
      dashboard: 'GET /api/v1/admin/dashboard',
      professionalApplications: 'GET /api/v1/admin/professionals/applications',
      caseExceptions: 'GET /api/v1/admin/cases/exceptions',
      platformMetrics: 'GET /api/v1/admin/metrics',
      qualityReports: 'GET /api/v1/admin/quality',
      adminLogin: 'POST /api/v1/admin/auth/login'
    },
    timestamp: new Date().toISOString()
  });
});

// Admin Authentication
app.post('/api/v1/admin/auth/login', [
  body('email').isEmail(),
  body('password').isLength({ min: 8 })
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

    // Find admin user (in production, this would be from admin-specific table)
    const admin = await prisma.customer.findFirst({
      where: { 
        email: email,
        role: { in: ['admin', 'super_admin', 'quality_manager'] }
      }
    });

    if (!admin || !admin.hashedPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid admin credentials',
        code: 'INVALID_CREDENTIALS'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid admin credentials',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Generate admin token with extended expiry
    const token = jwt.sign(
      { 
        id: admin.id,
        email: admin.email,
        role: admin.role,
        permissions: ['read', 'write', 'delete', 'approve', 'monitor']
      }, 
      JWT_SECRET, 
      { expiresIn: '12h' }
    );

    // Log admin login
    await prisma.auditLog.create({
      data: {
        entityType: 'admin_session',
        entityId: admin.id,
        action: 'admin_login',
        performedBy: admin.id,
        details: JSON.stringify({
          email: admin.email,
          role: admin.role,
          loginTime: new Date()
        }),
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    res.status(200).json({
      success: true,
      data: {
        token,
        admin: {
          id: admin.id,
          email: admin.email,
          role: admin.role,
          firstName: admin.firstName,
          lastName: admin.lastName
        }
      }
    });

  } catch (error) {
    logger.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed',
      code: 'LOGIN_ERROR'
    });
  }
});

// Admin Dashboard
app.get('/api/v1/admin/dashboard', authenticateAdmin, async (req, res) => {
  try {
    const platformHealth = await calculatePlatformHealth();
    
    // Get recent activity
    const recentActivity = await prisma.auditLog.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      include: {
        performedByUser: {
          select: {
            email: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    // Get pending tasks
    const pendingTasks = {
      professionalApplications: platformHealth.professionals.pendingApplications,
      orphanedCases: platformHealth.cases.orphaned,
      breachedSLA: platformHealth.cases.breachedSLA,
      qualityReviews: await prisma.peerReview.count({
        where: { status: 'pending' }
      })
    };

    // Real-time metrics
    const realTimeMetrics = {
      activeUsers: await prisma.customerSession.count({
        where: {
          expiresAt: { gte: new Date() }
        }
      }),
      activeProfessionals: await prisma.professionalSession.count({
        where: {
          expiresAt: { gte: new Date() }
        }
      }),
      casesInProgress: await prisma.medicalCase.count({
        where: {
          status: { in: ['IN_REVIEW', 'ASSIGNED_TO_PROFESSIONAL'] }
        }
      })
    };

    res.status(200).json({
      success: true,
      data: {
        platformHealth,
        recentActivity: recentActivity.map(activity => ({
          id: activity.id,
          action: activity.action,
          entityType: activity.entityType,
          performedBy: activity.performedByUser?.email || 'System',
          timestamp: activity.createdAt,
          details: JSON.parse(activity.details || '{}')
        })),
        pendingTasks,
        realTimeMetrics,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    logger.error('Admin dashboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load dashboard',
      code: 'DASHBOARD_ERROR'
    });
  }
});

// Professional Applications Management
app.get('/api/v1/admin/professionals/applications', [
  query('status').optional().isIn(['pending_review', 'under_review', 'approved', 'rejected']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
], authenticateAdmin, async (req, res) => {
  try {
    const { status = 'pending_review', page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const whereClause = {
      vetted: status === 'approved' ? true : false,
      status: status === 'pending_review' ? 'pending_review' : status
    };

    const [applications, totalCount] = await Promise.all([
      prisma.medicalProfessional.findMany({
        where: whereClause,
        include: {
          professionalDocuments: {
            select: {
              id: true,
              documentType: true,
              fileName: true,
              uploadedAt: true,
              verificationStatus: true
            }
          },
          professionalReviews: {
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
              rating: true,
              feedback: true,
              createdAt: true
            }
          }
        },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: status === 'pending_review' ? 'asc' : 'desc' }
      }),
      prisma.medicalProfessional.count({ where: whereClause })
    ]);

    // Enrich with performance data for approved professionals
    const enrichedApplications = await Promise.all(
      applications.map(async (application) => {
        if (application.vetted) {
          const performance = await calculateProfessionalPerformance(application.id);
          return { ...application, performance };
        }
        return application;
      })
    );

    res.status(200).json({
      success: true,
      data: {
        applications: enrichedApplications,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount,
          pages: Math.ceil(totalCount / parseInt(limit))
        },
        status
      }
    });

  } catch (error) {
    logger.error('Professional applications fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch professional applications',
      code: 'APPLICATIONS_FETCH_ERROR'
    });
  }
});

// Approve/Reject Professional Application
app.post('/api/v1/admin/professionals/:professionalId/review', [
  param('professionalId').isUUID(),
  body('action').isIn(['approve', 'reject', 'request_more_info']),
  body('feedback').optional().isString(),
  body('conditions').optional().isArray()
], authenticateAdmin, async (req, res) => {
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

    const { professionalId } = req.params;
    const { action, feedback, conditions } = req.body;

    const professional = await prisma.medicalProfessional.findUnique({
      where: { id: professionalId },
      include: {
        professionalDocuments: true
      }
    });

    if (!professional) {
      return res.status(404).json({
        success: false,
        error: 'Professional not found',
        code: 'PROFESSIONAL_NOT_FOUND'
      });
    }

    let updateData = {
      status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'pending_review',
      vetted: action === 'approve',
      reviewedBy: req.user.id,
      reviewedAt: new Date(),
      reviewFeedback: feedback
    };

    if (action === 'approve') {
      updateData.approvedAt = new Date();
      updateData.vettedAt = new Date();
    }

    // Update professional status
    const updatedProfessional = await prisma.medicalProfessional.update({
      where: { id: professionalId },
      data: updateData
    });

    // Create review record
    await prisma.professionalApplicationReview.create({
      data: {
        professionalId: professionalId,
        reviewerId: req.user.id,
        action: action,
        feedback: feedback,
        conditions: conditions ? JSON.stringify(conditions) : null,
        reviewedAt: new Date()
      }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        entityType: 'professional_application',
        entityId: professionalId,
        action: `application_${action}`,
        performedBy: req.user.id,
        details: JSON.stringify({
          professionalEmail: professional.email,
          action,
          feedback,
          conditions
        }),
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    // Send notification to professional
    try {
      await axios.post(`${NOTIFICATION_SERVICE_URL}/api/v1/notifications/send`, {
        recipient: professional.email,
        type: `professional_application_${action}`,
        template: `professional_${action}_email`,
        data: {
          professionalName: `Dr. ${professional.firstName} ${professional.lastName}`,
          feedback: feedback,
          conditions: conditions,
          actionDate: new Date().toISOString()
        }
      });
    } catch (notificationError) {
      logger.error('Failed to send professional review notification:', notificationError);
    }

    // Trigger workflow if approved
    if (action === 'approve') {
      try {
        await axios.post(`${WORKFLOW_SERVICE_URL}/api/v1/workflows/trigger`, {
          workflowType: 'professional_onboarding',
          entityId: professionalId,
          data: {
            professionalId,
            level: professional.level,
            specialties: professional.subspecialties
          }
        });
      } catch (workflowError) {
        logger.error('Failed to trigger onboarding workflow:', workflowError);
      }
    }

    // Emit real-time update
    io.emit('professional_application_reviewed', {
      professionalId,
      action,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({
      success: true,
      message: `Professional application ${action} successfully`,
      data: {
        professionalId,
        action,
        status: updatedProfessional.status,
        vetted: updatedProfessional.vetted,
        reviewedAt: updatedProfessional.reviewedAt
      }
    });

  } catch (error) {
    logger.error('Professional review error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to review professional application',
      code: 'PROFESSIONAL_REVIEW_ERROR'
    });
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`👥 Admin Management Service v1.0 running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Admin login: POST /api/v1/admin/auth/login`);
  console.log(`📈 Admin dashboard: GET /api/v1/admin/dashboard`);
  console.log(`🧑‍⚕️ Professional applications: GET /api/v1/admin/professionals/applications`);
  console.log(`✅ Review applications: POST /api/v1/admin/professionals/{id}/review`);
  console.log(`🚨 Real-time updates: Socket.IO enabled`);
  console.log(`📋 Case exceptions: GET /api/v1/admin/cases/exceptions`);
  console.log(`📊 Platform metrics: GET /api/v1/admin/metrics`);
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