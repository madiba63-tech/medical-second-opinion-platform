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

const app = express();
const PORT = process.env.PORT || 4008;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-for-development-only';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Configure multer for document uploads
const upload = multer({
  dest: 'temp/',
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  }
});

// Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    process.env.PATIENT_IDENTITY_SERVICE_URL || 'http://localhost:3001'
  ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Professional authentication middleware
const authenticateProfessional = (req, res, next) => {
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
      const professional = await prisma.medicalProfessional.findUnique({
        where: { id: decoded.professionalId },
        select: {
          id: true,
          proNumber: true,
          firstName: true,
          lastName: true,
          email: true,
          level: true,
          subspecialties: true,
          vetted: true,
          competencyData: true
        }
      });
      
      if (!professional || !professional.vetted) {
        return res.status(403).json({
          success: false,
          error: 'Professional access required',
          code: 'PROFESSIONAL_ACCESS_REQUIRED'
        });
      }
      
      req.professional = professional;
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

// Utility function for case assignment scoring
const calculateCaseMatch = (professional, medicalCase) => {
  let matchScore = 0;
  
  // Level compatibility (exact match gets bonus)
  if (professional.level === medicalCase.requestedProfessionalLevel) {
    matchScore += 40;
  } else {
    // Partial compatibility for higher levels
    const levels = ['JUNIOR', 'SENIOR', 'EXPERT', 'DISTINGUISHED'];
    const profIndex = levels.indexOf(professional.level);
    const caseIndex = levels.indexOf(medicalCase.requestedProfessionalLevel);
    if (profIndex >= caseIndex) {
      matchScore += 30 - ((profIndex - caseIndex) * 5);
    }
  }
  
  // Subspecialty match
  if (professional.subspecialties && medicalCase.category) {
    const subspecialties = Array.isArray(professional.subspecialties) 
      ? professional.subspecialties 
      : JSON.parse(professional.subspecialties || '[]');
    
    const categoryMatch = subspecialties.some(sub => 
      medicalCase.category.toLowerCase().includes(sub.toLowerCase()) ||
      sub.toLowerCase().includes(medicalCase.category.toLowerCase())
    );
    
    if (categoryMatch) {
      matchScore += 30;
    }
  }
  
  // Workload consideration (fewer active cases = higher score)
  // This will be calculated dynamically
  matchScore += 20; // Base availability score
  
  // Random factor for fairness (0-10 points)
  matchScore += Math.floor(Math.random() * 10);
  
  return Math.min(matchScore, 100);
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'professional-workplace-service',
    version: '1.0.0',
    features: [
      'case-backlog',
      'document-viewer',
      'ai-analysis-integration',
      'opinion-editor',
      'digital-signatures',
      'peer-review',
      'performance-metrics',
      'profile-management'
    ],
    endpoints: {
      health: '/health',
      login: 'POST /api/v1/auth/login',
      verify2FA: 'POST /api/v1/auth/verify-2fa',
      caseBacklog: 'GET /api/v1/cases/backlog',
      selectCase: 'POST /api/v1/cases/:id/select',
      caseDetails: 'GET /api/v1/cases/:id',
      saveOpinion: 'POST /api/v1/cases/:id/opinion',
      submitOpinion: 'POST /api/v1/cases/:id/submit',
      dashboard: 'GET /api/v1/professional/dashboard',
      profile: 'GET /api/v1/professional/profile'
    },
    status: 'operational',
    timestamp: new Date().toISOString()
  });
});

// Professional Login
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

    // Find professional by email
    const professional = await prisma.medicalProfessional.findUnique({
      where: { email }
    });

    if (!professional) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Check if professional is vetted
    if (!professional.vetted) {
      return res.status(403).json({
        success: false,
        error: 'Your application is still under review',
        code: 'NOT_VETTED'
      });
    }

    // Verify password
    if (!professional.hashedPassword) {
      return res.status(401).json({
        success: false,
        error: 'Account not properly configured',
        code: 'NO_PASSWORD'
      });
    }

    const validPassword = await bcrypt.compare(password, professional.hashedPassword);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Generate 2FA code
    const twoFactorCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Create temporary session for 2FA
    const tempToken = jwt.sign(
      { 
        professionalId: professional.id,
        email: professional.email,
        twoFactorRequired: true,
        twoFactorCode: await bcrypt.hash(twoFactorCode, 10)
      }, 
      JWT_SECRET, 
      { expiresIn: '10m' }
    );

    // In production: send 2FA code via email/SMS
    console.log(`[2FA] Code for ${professional.email}: ${twoFactorCode}`);

    res.status(200).json({
      success: true,
      message: '2FA verification required',
      data: {
        tempToken,
        twoFactorMethod: professional.twoFactorMethod,
        // Remove in production
        demoCode: twoFactorCode
      }
    });

  } catch (error) {
    console.error('[PROFESSIONAL-LOGIN] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed',
      code: 'LOGIN_ERROR'
    });
  }
});

// 2FA Verification for Professionals
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
      if (!decoded.twoFactorRequired) {
        throw new Error('Invalid temporary token');
      }
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired temporary token',
        code: 'INVALID_TEMP_TOKEN'
      });
    }

    // Verify the 2FA code
    const validCode = await bcrypt.compare(verificationCode, decoded.twoFactorCode);
    if (!validCode) {
      return res.status(401).json({
        success: false,
        error: 'Invalid verification code',
        code: 'INVALID_CODE'
      });
    }

    // Get professional details
    const professional = await prisma.medicalProfessional.findUnique({
      where: { id: decoded.professionalId }
    });

    // Generate full access token
    const token = jwt.sign(
      { 
        professionalId: professional.id, 
        email: professional.email,
        level: professional.level,
        twoFactorVerified: true
      }, 
      JWT_SECRET, 
      { expiresIn: '8h' } // 8 hour work session
    );

    // Create professional session
    await prisma.professionalSession.create({
      data: {
        professionalId: professional.id,
        sessionToken: token,
        twoFactorVerified: true,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 hours
      }
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        professional: {
          id: professional.id,
          proNumber: professional.proNumber,
          firstName: professional.firstName,
          lastName: professional.lastName,
          email: professional.email,
          level: professional.level,
          subspecialties: professional.subspecialties
        }
      }
    });

  } catch (error) {
    console.error('[PROFESSIONAL-2FA] Error:', error);
    res.status(500).json({
      success: false,
      error: '2FA verification failed',
      code: '2FA_VERIFY_ERROR'
    });
  }
});

// Get Case Details with Documents and AI Analysis
app.get('/api/v1/cases/:caseId', authenticateProfessional, async (req, res) => {
  try {
    const { caseId } = req.params;
    const professionalId = req.professional.id;

    // Get case with full details
    const medicalCase = await prisma.medicalCase.findUnique({
      where: { 
        id: caseId,
        OR: [
          { assignedProfessionalId: professionalId }, // Assigned to this professional
          { assignedProfessionalId: null, status: { in: ['FILES_UPLOADED', 'QUESTIONNAIRE_COMPLETED', 'PAYMENT_CONFIRMED'] } } // Available for selection
        ]
      },
      include: {
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            dateOfBirth: true,
            gender: true,
            medicalHistory: true
          }
        },
        caseDocuments: {
          orderBy: {
            uploadedAt: 'desc'
          }
        },
        questionnaire: {
          include: {
            responses: {
              include: {
                question: true
              }
            }
          }
        }
      }
    });

    if (!medicalCase) {
      return res.status(404).json({
        success: false,
        error: 'Case not found or not accessible',
        code: 'CASE_NOT_FOUND'
      });
    }

    // Get AI analysis for this case
    const aiAnalysis = await prisma.aIAnalysis.findFirst({
      where: { caseId: caseId },
      orderBy: { createdAt: 'desc' }
    });

    // Calculate professional match score
    const matchScore = calculateCaseMatch(req.professional, medicalCase);

    res.status(200).json({
      success: true,
      data: {
        case: {
          ...medicalCase,
          matchScore,
          isAssigned: medicalCase.assignedProfessionalId === professionalId
        },
        aiAnalysis: aiAnalysis ? {
          id: aiAnalysis.id,
          summary: aiAnalysis.summary,
          keyFindings: aiAnalysis.keyFindings,
          riskFactors: aiAnalysis.riskFactors,
          recommendations: aiAnalysis.recommendations,
          confidence: aiAnalysis.confidence,
          createdAt: aiAnalysis.createdAt
        } : null,
        documents: medicalCase.caseDocuments.map(doc => ({
          id: doc.id,
          fileName: doc.fileName,
          fileType: doc.fileType,
          fileSize: doc.fileSize,
          uploadedAt: doc.uploadedAt,
          // Don't expose full file path for security
          downloadUrl: `/api/v1/cases/${caseId}/documents/${doc.id}/download`
        }))
      }
    });

  } catch (error) {
    console.error('[CASE-DETAILS] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch case details',
      code: 'CASE_DETAILS_ERROR'
    });
  }
});

// Download Case Document (Secure)
app.get('/api/v1/cases/:caseId/documents/:documentId/download', authenticateProfessional, async (req, res) => {
  try {
    const { caseId, documentId } = req.params;
    const professionalId = req.professional.id;

    // Verify professional has access to this case
    const medicalCase = await prisma.medicalCase.findFirst({
      where: {
        id: caseId,
        OR: [
          { assignedProfessionalId: professionalId },
          { assignedProfessionalId: null, status: { in: ['FILES_UPLOADED', 'QUESTIONNAIRE_COMPLETED', 'PAYMENT_CONFIRMED'] } }
        ]
      }
    });

    if (!medicalCase) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to case documents',
        code: 'DOCUMENT_ACCESS_DENIED'
      });
    }

    // Get document details
    const document = await prisma.caseDocument.findFirst({
      where: {
        id: documentId,
        caseId: caseId
      }
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        error: 'Document not found',
        code: 'DOCUMENT_NOT_FOUND'
      });
    }

    // Log document access for audit trail
    await prisma.documentAccess.create({
      data: {
        documentId: document.id,
        professionalId: professionalId,
        accessType: 'VIEW',
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    // In production, this would stream from secure file storage (AWS S3, etc.)
    // For now, return document metadata and secure download instructions
    res.status(200).json({
      success: true,
      data: {
        document: {
          id: document.id,
          fileName: document.fileName,
          fileType: document.fileType,
          fileSize: document.fileSize,
          uploadedAt: document.uploadedAt
        },
        // In production, this would be a pre-signed URL or streaming response
        downloadMethod: 'SECURE_STREAM',
        message: 'Document access logged and authorized'
      }
    });

  } catch (error) {
    console.error('[DOCUMENT-DOWNLOAD] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to download document',
      code: 'DOCUMENT_DOWNLOAD_ERROR'
    });
  }
});

// Get Case Backlog for Professional
app.get('/api/v1/cases/backlog', authenticateProfessional, async (req, res) => {
  try {
    const professionalId = req.professional.id;
    const { status = 'available', page = 1, limit = 10 } = req.query;

    // Get cases that match professional's competency
    const whereClause = {
      status: {
        in: ['FILES_UPLOADED', 'QUESTIONNAIRE_COMPLETED', 'PAYMENT_CONFIRMED']
      },
      assignedProfessionalId: null, // Unassigned cases
      // Match professional level or allow higher levels to take lower level cases
      requestedProfessionalLevel: {
        in: req.professional.level === 'DISTINGUISHED' 
          ? ['JUNIOR', 'SENIOR', 'EXPERT', 'DISTINGUISHED']
          : req.professional.level === 'EXPERT' 
          ? ['JUNIOR', 'SENIOR', 'EXPERT']
          : req.professional.level === 'SENIOR' 
          ? ['JUNIOR', 'SENIOR'] 
          : ['JUNIOR']
      }
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const [cases, totalCount] = await Promise.all([
      prisma.medicalCase.findMany({
        where: whereClause,
        include: {
          customer: {
            select: {
              firstName: true,
              lastName: true,
              preferredLanguage: true,
              dateOfBirth: true,
              gender: true
            }
          },
          uploadedFiles: {
            select: {
              id: true,
              filename: true,
              category: true,
              size: true,
              mimetype: true,
              createdAt: true
            }
          },
          casePayment: {
            select: {
              amount: true,
              status: true,
              professionalLevel: true
            }
          },
          aiAnalyses: {
            select: {
              id: true,
              analysisType: true,
              confidence: true,
              createdAt: true
            },
            orderBy: { createdAt: 'desc' },
            take: 1
          }
        },
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'asc' }
        ],
        skip,
        take
      }),
      prisma.medicalCase.count({ where: whereClause })
    ]);

    // Calculate match scores for each case
    const casesWithScores = cases.map(case_ => {
      const matchScore = calculateCaseMatch(req.professional, case_);
      const daysWaiting = Math.floor((new Date() - new Date(case_.createdAt)) / (1000 * 60 * 60 * 24));
      
      return {
        id: case_.id,
        caseNumber: case_.caseNumber,
        title: case_.title,
        category: case_.category,
        priority: case_.priority,
        requestedLevel: case_.requestedProfessionalLevel,
        status: case_.status,
        patient: {
          name: `${case_.customer.firstName} ${case_.customer.lastName}`,
          age: case_.customer.dateOfBirth 
            ? Math.floor((new Date() - new Date(case_.customer.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
            : null,
          gender: case_.customer.gender,
          language: case_.customer.preferredLanguage
        },
        documents: case_.uploadedFiles.map(file => ({
          id: file.id,
          filename: file.filename,
          category: file.category,
          size: file.size,
          mimetype: file.mimetype,
          uploadedAt: file.createdAt
        })),
        payment: case_.casePayment,
        aiAnalysis: case_.aiAnalyses.length > 0 ? {
          available: true,
          confidence: case_.aiAnalyses[0].confidence,
          lastAnalysis: case_.aiAnalyses[0].createdAt
        } : {
          available: false
        },
        matchScore,
        daysWaiting,
        submittedAt: case_.createdAt,
        estimatedTime: '2-4 hours' // Based on case complexity
      };
    });

    // Sort by match score
    casesWithScores.sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json({
      success: true,
      data: {
        cases: casesWithScores,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount,
          totalPages: Math.ceil(totalCount / parseInt(limit))
        },
        filters: {
          status,
          availableStatuses: ['available', 'assigned', 'in_progress', 'completed'],
          professionalLevel: req.professional.level
        }
      }
    });

  } catch (error) {
    console.error('[CASE-BACKLOG] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch case backlog',
      code: 'BACKLOG_ERROR'
    });
  }
});

// Select/Claim a Case
app.post('/api/v1/cases/:caseId/select', authenticateProfessional, [
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
    const professionalId = req.professional.id;

    // Check if case is still available
    const medicalCase = await prisma.medicalCase.findUnique({
      where: { id: caseId },
      include: { customer: true }
    });

    if (!medicalCase) {
      return res.status(404).json({
        success: false,
        error: 'Case not found',
        code: 'CASE_NOT_FOUND'
      });
    }

    if (medicalCase.assignedProfessionalId) {
      return res.status(409).json({
        success: false,
        error: 'Case already assigned to another professional',
        code: 'CASE_ALREADY_ASSIGNED'
      });
    }

    // Assign the case
    const updatedCase = await prisma.medicalCase.update({
      where: { id: caseId },
      data: {
        assignedProfessionalId: professionalId,
        assignedAt: new Date(),
        status: 'ASSIGNED_TO_PROFESSIONAL'
      }
    });

    // Create case assignment record
    await prisma.caseAssignment.create({
      data: {
        caseId: caseId,
        professionalId: professionalId,
        status: 'assigned',
        assignedAt: new Date()
      }
    });

    // Update case status history
    await prisma.caseStatusHistory.create({
      data: {
        caseId: caseId,
        fromStatus: medicalCase.status,
        toStatus: 'ASSIGNED_TO_PROFESSIONAL',
        reason: 'Case selected by professional',
        changedByType: 'professional',
        changedById: professionalId
      }
    });

    res.status(200).json({
      success: true,
      message: 'Case successfully assigned',
      data: {
        caseId,
        caseNumber: medicalCase.caseNumber,
        assignedAt: updatedCase.assignedAt,
        nextStep: 'review_documents'
      }
    });

  } catch (error) {
    console.error('[CASE-SELECT] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to select case',
      code: 'CASE_SELECT_ERROR'
    });
  }
});

// Get Professional Dashboard Data
app.get('/api/v1/professional/dashboard', authenticateProfessional, async (req, res) => {
  try {
    const professionalId = req.professional.id;
    const currentDate = new Date();
    const quarterStart = new Date(currentDate.getFullYear(), Math.floor(currentDate.getMonth() / 3) * 3, 1);

    // Get dashboard metrics
    const [
      casesThisQuarter,
      totalCases,
      avgRating,
      totalEarnings,
      recentActivity,
      activeCases
    ] = await Promise.all([
      // Cases this quarter
      prisma.medicalCase.count({
        where: {
          assignedProfessionalId: professionalId,
          assignedAt: { gte: quarterStart }
        }
      }),
      
      // Total cases ever
      prisma.medicalCase.count({
        where: { assignedProfessionalId: professionalId }
      }),
      
      // Average rating (mock for now - would come from customer feedback)
      Promise.resolve(4.8),
      
      // Total earnings
      prisma.professionalPayment.aggregate({
        where: { professionalId },
        _sum: { amount: true }
      }),
      
      // Recent activity
      prisma.medicalCase.findMany({
        where: { assignedProfessionalId: professionalId },
        include: {
          customer: { select: { firstName: true, lastName: true } },
          medicalOpinions: { 
            select: { status: true, publishedAt: true },
            orderBy: { createdAt: 'desc' },
            take: 1
          }
        },
        orderBy: { updatedAt: 'desc' },
        take: 5
      }),
      
      // Active cases
      prisma.medicalCase.findMany({
        where: {
          assignedProfessionalId: professionalId,
          status: {
            in: ['ASSIGNED_TO_PROFESSIONAL', 'IN_PROGRESS', 'DRAFT_OPINION']
          }
        },
        include: {
          customer: { select: { firstName: true, lastName: true } }
        },
        orderBy: { assignedAt: 'desc' }
      })
    ]);

    // Calculate average response time (mock for now)
    const avgResponseTime = 2.3; // days

    res.status(200).json({
      success: true,
      data: {
        metrics: {
          casesThisQuarter,
          totalCases,
          averageRating: avgRating,
          totalEarnings: totalEarnings._sum.amount || 0,
          avgResponseTime
        },
        activeCases: activeCases.map(case_ => ({
          id: case_.id,
          caseNumber: case_.caseNumber,
          title: case_.title,
          patient: `${case_.customer.firstName} ${case_.customer.lastName}`,
          status: case_.status,
          assignedAt: case_.assignedAt,
          dueDate: new Date(case_.assignedAt.getTime() + 5 * 24 * 60 * 60 * 1000) // 5 days
        })),
        recentActivity: recentActivity.map(case_ => ({
          id: case_.id,
          caseNumber: case_.caseNumber,
          action: case_.medicalOpinions.length > 0 && case_.medicalOpinions[0].publishedAt 
            ? 'Opinion published' 
            : 'Case in progress',
          timestamp: case_.updatedAt,
          amount: case_.status === 'COMPLETED' ? '+$350' : null
        }))
      }
    });

  } catch (error) {
    console.error('[PROFESSIONAL-DASHBOARD] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard data',
      code: 'DASHBOARD_ERROR'
    });
  }
});

// Generate Second Opinion Document Template
app.get('/api/v1/cases/:caseId/opinion/template', authenticateProfessional, async (req, res) => {
  try {
    const { caseId } = req.params;
    const professionalId = req.professional.id;

    // Verify professional has access to this case
    const medicalCase = await prisma.medicalCase.findFirst({
      where: {
        id: caseId,
        assignedProfessionalId: professionalId
      },
      include: {
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            dateOfBirth: true,
            gender: true,
            medicalHistory: true
          }
        },
        questionnaire: {
          include: {
            responses: {
              include: {
                question: true
              }
            }
          }
        }
      }
    });

    if (!medicalCase) {
      return res.status(403).json({
        success: false,
        error: 'Access denied or case not assigned',
        code: 'TEMPLATE_ACCESS_DENIED'
      });
    }

    // Get AI analysis for context
    const aiAnalysis = await prisma.aIAnalysis.findFirst({
      where: { caseId: caseId },
      orderBy: { createdAt: 'desc' }
    });

    // Generate template with pre-filled information
    const template = {
      header: {
        caseNumber: medicalCase.caseNumber,
        customerNumber: medicalCase.customer.id,
        professionalName: `Dr. ${req.professional.firstName} ${req.professional.lastName}`,
        professionalNumber: req.professional.proNumber,
        dateGenerated: new Date().toISOString(),
        patientInfo: {
          name: `${medicalCase.customer.firstName} ${medicalCase.customer.lastName}`,
          dateOfBirth: medicalCase.customer.dateOfBirth,
          gender: medicalCase.customer.gender,
          caseCategory: medicalCase.category
        }
      },
      sections: {
        executiveSummary: {
          title: "Executive Summary",
          content: `Second opinion request for ${medicalCase.customer.firstName} ${medicalCase.customer.lastName} regarding ${medicalCase.category.toLowerCase()}.`,
          editable: true,
          required: true
        },
        clinicalHistory: {
          title: "Clinical History and Background",
          content: medicalCase.customer.medicalHistory || "Medical history to be reviewed based on submitted documents.",
          editable: true,
          required: true
        },
        documentsReviewed: {
          title: "Documents Reviewed",
          content: "The following medical documents were reviewed as part of this second opinion assessment:",
          documentList: [], // Will be populated from case documents
          editable: true,
          required: true
        },
        aiAnalysisSummary: {
          title: "AI Analysis Summary",
          content: aiAnalysis ? aiAnalysis.summary : "AI analysis pending or unavailable.",
          aiFindings: aiAnalysis ? aiAnalysis.keyFindings : null,
          editable: false,
          required: false
        },
        clinicalOpinion: {
          title: "Clinical Opinion",
          content: "[Please provide your professional clinical opinion based on the reviewed materials]",
          editable: true,
          required: true
        },
        recommendations: {
          title: "Recommendations",
          content: aiAnalysis && aiAnalysis.recommendations ? 
            `Initial AI recommendations: ${aiAnalysis.recommendations}\n\n[Please review and provide your professional recommendations]` :
            "[Please provide your clinical recommendations]",
          editable: true,
          required: true
        },
        riskAssessment: {
          title: "Risk Assessment",
          content: aiAnalysis && aiAnalysis.riskFactors ? 
            `Identified risk factors: ${aiAnalysis.riskFactors}\n\n[Please provide your risk assessment]` :
            "[Please provide your risk assessment]",
          editable: true,
          required: true
        },
        followUp: {
          title: "Follow-up Recommendations",
          content: "[Please specify any follow-up care recommendations]",
          editable: true,
          required: false
        },
        limitations: {
          title: "Limitations and Disclaimers",
          content: "This second opinion is based solely on the medical documents provided and does not constitute a complete medical examination. The patient should discuss these findings with their primary healthcare provider.",
          editable: true,
          required: true
        }
      },
      metadata: {
        templateVersion: "1.0",
        generatedAt: new Date().toISOString(),
        requiresSignature: true,
        requiresPeerReview: req.professional.level === 'JUNIOR' || Math.random() < 0.15, // 15% random selection for peer review
        estimatedCompletionTime: "2-3 hours"
      }
    };

    res.status(200).json({
      success: true,
      data: {
        template,
        caseInfo: {
          id: medicalCase.id,
          caseNumber: medicalCase.caseNumber,
          category: medicalCase.category,
          urgency: medicalCase.urgency,
          status: medicalCase.status
        }
      }
    });

  } catch (error) {
    console.error('[OPINION-TEMPLATE] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate opinion template',
      code: 'TEMPLATE_GENERATION_ERROR'
    });
  }
});

// Save Second Opinion Draft
app.post('/api/v1/cases/:caseId/opinion/draft', [
  param('caseId').isUUID(),
  body('sections').isObject(),
  body('metadata').optional().isObject()
], authenticateProfessional, async (req, res) => {
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
    const { sections, metadata } = req.body;
    const professionalId = req.professional.id;

    // Verify professional has access to this case
    const medicalCase = await prisma.medicalCase.findFirst({
      where: {
        id: caseId,
        assignedProfessionalId: professionalId
      }
    });

    if (!medicalCase) {
      return res.status(403).json({
        success: false,
        error: 'Access denied or case not assigned',
        code: 'DRAFT_ACCESS_DENIED'
      });
    }

    // Save or update draft
    const draftData = {
      caseId: caseId,
      professionalId: professionalId,
      sections: JSON.stringify(sections),
      metadata: JSON.stringify(metadata || {}),
      status: 'draft',
      lastModified: new Date()
    };

    const existingDraft = await prisma.secondOpinion.findFirst({
      where: {
        caseId: caseId,
        professionalId: professionalId,
        status: 'draft'
      }
    });

    let savedDraft;
    if (existingDraft) {
      savedDraft = await prisma.secondOpinion.update({
        where: { id: existingDraft.id },
        data: draftData
      });
    } else {
      savedDraft = await prisma.secondOpinion.create({
        data: {
          ...draftData,
          createdAt: new Date()
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Draft saved successfully',
      data: {
        draftId: savedDraft.id,
        lastModified: savedDraft.lastModified,
        status: savedDraft.status
      }
    });

  } catch (error) {
    console.error('[OPINION-DRAFT] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save opinion draft',
      code: 'DRAFT_SAVE_ERROR'
    });
  }
});

// Get Existing Opinion Draft
app.get('/api/v1/cases/:caseId/opinion/draft', authenticateProfessional, async (req, res) => {
  try {
    const { caseId } = req.params;
    const professionalId = req.professional.id;

    // Verify access and get draft
    const draft = await prisma.secondOpinion.findFirst({
      where: {
        caseId: caseId,
        professionalId: professionalId,
        status: 'draft'
      },
      include: {
        case: {
          select: {
            caseNumber: true,
            category: true,
            status: true
          }
        }
      }
    });

    if (!draft) {
      return res.status(404).json({
        success: false,
        error: 'No draft found for this case',
        code: 'DRAFT_NOT_FOUND'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        draftId: draft.id,
        sections: JSON.parse(draft.sections),
        metadata: JSON.parse(draft.metadata || '{}'),
        lastModified: draft.lastModified,
        caseInfo: draft.case
      }
    });

  } catch (error) {
    console.error('[OPINION-DRAFT-GET] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve opinion draft',
      code: 'DRAFT_GET_ERROR'
    });
  }
});

// Finalize Second Opinion (Ready for Signature)
app.post('/api/v1/cases/:caseId/opinion/finalize', [
  param('caseId').isUUID(),
  body('sections').isObject()
], authenticateProfessional, async (req, res) => {
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
    const { sections } = req.body;
    const professionalId = req.professional.id;

    // Verify required sections are completed
    const requiredSections = ['executiveSummary', 'clinicalHistory', 'clinicalOpinion', 'recommendations', 'riskAssessment', 'limitations'];
    const missingSections = requiredSections.filter(section => {
      const content = sections[section]?.content;
      return !content || content.includes('[Please') || content.trim().length < 10;
    });

    if (missingSections.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Required sections incomplete',
        details: { missingSections },
        code: 'INCOMPLETE_SECTIONS'
      });
    }

    // Update draft to finalized status
    const finalizedOpinion = await prisma.secondOpinion.updateMany({
      where: {
        caseId: caseId,
        professionalId: professionalId,
        status: 'draft'
      },
      data: {
        sections: JSON.stringify(sections),
        status: 'ready_for_signature',
        finalizedAt: new Date(),
        lastModified: new Date()
      }
    });

    if (finalizedOpinion.count === 0) {
      return res.status(404).json({
        success: false,
        error: 'No draft found to finalize',
        code: 'NO_DRAFT_TO_FINALIZE'
      });
    }

    // Update case status
    await prisma.medicalCase.update({
      where: { id: caseId },
      data: {
        status: 'OPINION_READY_FOR_SIGNATURE'
      }
    });

    res.status(200).json({
      success: true,
      message: 'Second opinion finalized and ready for signature',
      data: {
        status: 'ready_for_signature',
        nextStep: 'digital_signature',
        finalizedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('[OPINION-FINALIZE] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to finalize opinion',
      code: 'FINALIZE_ERROR'
    });
  }
});

// Digital Signature System for Second Opinions

// Get Opinion Ready for Signature
app.get('/api/v1/cases/:caseId/opinion/signature', authenticateProfessional, async (req, res) => {
  try {
    const { caseId } = req.params;
    const professionalId = req.professional.id;

    // Get finalized opinion ready for signature
    const opinion = await prisma.secondOpinion.findFirst({
      where: {
        caseId: caseId,
        professionalId: professionalId,
        status: 'ready_for_signature'
      },
      include: {
        case: {
          include: {
            customer: {
              select: {
                firstName: true,
                lastName: true,
                dateOfBirth: true
              }
            }
          }
        }
      }
    });

    if (!opinion) {
      return res.status(404).json({
        success: false,
        error: 'No opinion ready for signature found',
        code: 'OPINION_NOT_READY'
      });
    }

    // Generate signature document data
    const signatureDocument = {
      opinionId: opinion.id,
      caseNumber: opinion.case.caseNumber,
      patientName: `${opinion.case.customer.firstName} ${opinion.case.customer.lastName}`,
      professionalName: `Dr. ${req.professional.firstName} ${req.professional.lastName}`,
      professionalNumber: req.professional.proNumber,
      sections: JSON.parse(opinion.sections),
      finalizedAt: opinion.finalizedAt,
      requiresPeerReview: opinion.metadata ? JSON.parse(opinion.metadata).requiresPeerReview : false
    };

    // Generate document hash for integrity verification
    const crypto = require('crypto');
    const documentContent = JSON.stringify(signatureDocument.sections);
    const documentHash = crypto.createHash('sha256').update(documentContent).digest('hex');

    res.status(200).json({
      success: true,
      data: {
        signatureDocument,
        documentHash,
        signatureRequired: {
          type: 'digital_signature',
          method: 'certificate_based',
          certificationRequired: req.professional.level === 'DISTINGUISHED'
        }
      }
    });

  } catch (error) {
    console.error('[SIGNATURE-PREP] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to prepare opinion for signature',
      code: 'SIGNATURE_PREP_ERROR'
    });
  }
});

// Apply Digital Signature
app.post('/api/v1/cases/:caseId/opinion/sign', [
  param('caseId').isUUID(),
  body('signatureData').isObject(),
  body('documentHash').isString(),
  body('signatureMethod').isIn(['digital_certificate', 'biometric', 'pin_based'])
], authenticateProfessional, async (req, res) => {
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
    const { signatureData, documentHash, signatureMethod } = req.body;
    const professionalId = req.professional.id;

    // Get opinion ready for signature
    const opinion = await prisma.secondOpinion.findFirst({
      where: {
        caseId: caseId,
        professionalId: professionalId,
        status: 'ready_for_signature'
      },
      include: {
        case: true
      }
    });

    if (!opinion) {
      return res.status(404).json({
        success: false,
        error: 'No opinion ready for signature',
        code: 'OPINION_NOT_READY'
      });
    }

    // Verify document integrity
    const crypto = require('crypto');
    const currentDocumentHash = crypto.createHash('sha256')
      .update(opinion.sections)
      .digest('hex');

    if (currentDocumentHash !== documentHash) {
      return res.status(400).json({
        success: false,
        error: 'Document integrity check failed',
        code: 'DOCUMENT_TAMPERED'
      });
    }

    // Generate signature
    const signatureId = crypto.randomUUID();
    const timestamp = new Date();
    
    // Create digital signature record
    const digitalSignature = {
      signatureId,
      method: signatureMethod,
      timestamp: timestamp.toISOString(),
      professionalId,
      documentHash,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      // In production, this would include actual signature verification
      verified: true,
      signatureData: JSON.stringify(signatureData)
    };

    // Update opinion with signature
    const signedOpinion = await prisma.secondOpinion.update({
      where: { id: opinion.id },
      data: {
        status: 'signed',
        signedAt: timestamp,
        digitalSignature: JSON.stringify(digitalSignature),
        lastModified: timestamp
      }
    });

    // Check if peer review is required
    const metadata = opinion.metadata ? JSON.parse(opinion.metadata) : {};
    const requiresPeerReview = metadata.requiresPeerReview || 
                               req.professional.level === 'JUNIOR' || 
                               Math.random() < 0.15; // 15% random selection

    let nextStatus = 'OPINION_SIGNED';
    let nextStep = 'delivery';

    if (requiresPeerReview) {
      nextStatus = 'PENDING_PEER_REVIEW';
      nextStep = 'peer_review';
      
      // Create peer review assignment
      await prisma.peerReview.create({
        data: {
          secondOpinionId: opinion.id,
          caseId: caseId,
          status: 'pending',
          assignedAt: timestamp,
          requiredLevel: 'DISTINGUISHED'
        }
      });
    }

    // Update case status
    await prisma.medicalCase.update({
      where: { id: caseId },
      data: { status: nextStatus }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        entityType: 'second_opinion',
        entityId: opinion.id,
        action: 'digital_signature_applied',
        performedBy: professionalId,
        details: JSON.stringify({
          signatureId,
          method: signatureMethod,
          requiresPeerReview,
          caseNumber: opinion.case.caseNumber
        }),
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    res.status(200).json({
      success: true,
      message: 'Second opinion successfully signed',
      data: {
        opinionId: opinion.id,
        signatureId,
        signedAt: timestamp.toISOString(),
        status: 'signed',
        requiresPeerReview,
        nextStep,
        caseStatus: nextStatus
      }
    });

  } catch (error) {
    console.error('[DIGITAL-SIGNATURE] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to apply digital signature',
      code: 'SIGNATURE_ERROR'
    });
  }
});

// Verify Digital Signature
app.get('/api/v1/cases/:caseId/opinion/signature/verify', authenticateProfessional, async (req, res) => {
  try {
    const { caseId } = req.params;

    // Get signed opinion
    const opinion = await prisma.secondOpinion.findFirst({
      where: {
        caseId: caseId,
        status: { in: ['signed', 'peer_reviewed', 'delivered'] }
      },
      include: {
        professional: {
          select: {
            firstName: true,
            lastName: true,
            proNumber: true,
            level: true
          }
        },
        case: {
          select: {
            caseNumber: true
          }
        }
      }
    });

    if (!opinion || !opinion.digitalSignature) {
      return res.status(404).json({
        success: false,
        error: 'No signed opinion found',
        code: 'SIGNATURE_NOT_FOUND'
      });
    }

    const signature = JSON.parse(opinion.digitalSignature);
    
    // Verify document integrity
    const crypto = require('crypto');
    const currentDocumentHash = crypto.createHash('sha256')
      .update(opinion.sections)
      .digest('hex');
    
    const signatureValid = currentDocumentHash === signature.documentHash;
    const timestampValid = new Date(signature.timestamp) <= opinion.signedAt;

    res.status(200).json({
      success: true,
      data: {
        valid: signatureValid && timestampValid,
        signature: {
          id: signature.signatureId,
          method: signature.method,
          timestamp: signature.timestamp,
          professional: {
            name: `Dr. ${opinion.professional.firstName} ${opinion.professional.lastName}`,
            proNumber: opinion.professional.proNumber,
            level: opinion.professional.level
          },
          documentHash: signature.documentHash,
          verified: signature.verified
        },
        integrity: {
          documentHashMatch: signatureValid,
          timestampValid: timestampValid,
          noTampering: signatureValid && timestampValid
        },
        caseNumber: opinion.case.caseNumber
      }
    });

  } catch (error) {
    console.error('[SIGNATURE-VERIFY] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify signature',
      code: 'SIGNATURE_VERIFY_ERROR'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`👨‍⚕️ Professional Workplace Service v2.0 running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Professional login: POST /api/v1/auth/login`);
  console.log(`📋 Case backlog: GET /api/v1/cases/backlog`);
  console.log(`🎯 Case selection: POST /api/v1/cases/{id}/select`);
  console.log(`📈 Dashboard: GET /api/v1/professional/dashboard`);
  console.log(`📄 Case details: GET /api/v1/cases/{id}`);
  console.log(`📁 Document download: GET /api/v1/cases/{id}/documents/{docId}/download`);
  console.log(`📝 Opinion template: GET /api/v1/cases/{id}/opinion/template`);
  console.log(`💾 Save draft: POST /api/v1/cases/{id}/opinion/draft`);
  console.log(`📋 Get draft: GET /api/v1/cases/{id}/opinion/draft`);
  console.log(`✅ Finalize opinion: POST /api/v1/cases/{id}/opinion/finalize`);
  console.log(`🖋️ Digital signature: POST /api/v1/cases/{id}/opinion/sign`);
  console.log(`🔍 Verify signature: GET /api/v1/cases/{id}/opinion/signature/verify`);
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