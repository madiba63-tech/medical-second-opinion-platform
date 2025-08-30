const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult, param } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('./src/generated/prisma');

const app = express();
const PORT = 3004;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-for-development-only';
const JWT_EXPIRES_IN = '24h';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3006'],
  credentials: true
}));
app.use(express.json());

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Access token required',
      code: 'TOKEN_REQUIRED'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        error: 'Invalid or expired token',
        code: 'TOKEN_INVALID'
      });
    }
    
    req.user = decoded;
    next();
  });
};

// Database connection established above with Prisma Client
// Initialize demo professional if it doesn't exist
async function initializeDemoData() {
  try {
    const existingProfessional = await prisma.professional.findUnique({
      where: { email: 'dr.smith@hospital.com' }
    });
    
    if (!existingProfessional) {
      await prisma.professional.create({
        data: {
          id: '1',
          email: 'dr.smith@hospital.com',
          hashedPassword: '$2a$10$Hw1QZmK9LTwGAXsZZ3QVKOZaUpHZJjCr4eSWO4d5qGa.k4bRuXK22', // 'doctor123'
          firstName: 'Dr. John',
          lastName: 'Smith',
          title: 'MD, PhD',
          specialization: ['CARDIOLOGY', 'INTERNAL_MEDICINE'],
          licenseNumber: 'MD123456',
          licenseState: 'CA',
          hospitalAffiliation: 'General Hospital',
          yearsOfExperience: 15,
          verificationStatus: 'VERIFIED',
          isActive: true,
          maxCaseLoad: 10,
          currentCaseLoad: 3,
          rating: 4.8,
          totalReviews: 156,
          availability: {
            monday: { available: true, hours: '09:00-17:00' },
            tuesday: { available: true, hours: '09:00-17:00' },
            wednesday: { available: true, hours: '09:00-17:00' },
            thursday: { available: true, hours: '09:00-17:00' },
            friday: { available: true, hours: '09:00-17:00' },
            saturday: { available: false, hours: null },
            sunday: { available: false, hours: null }
          }
        }
      });
      console.log('Demo professional created in database');
    }
  } catch (error) {
    console.log('Demo professional initialization:', error.message);
  }
}

initializeDemoData();

// Utility functions
const generateAccessToken = (professional) => {
  return jwt.sign(
    { 
      professionalId: professional.id, 
      email: professional.email,
      type: 'professional_access',
      specializations: professional.specialization
    }, 
    JWT_SECRET, 
    { expiresIn: JWT_EXPIRES_IN }
  );
};

const generateRefreshToken = (professional) => {
  return jwt.sign(
    { 
      professionalId: professional.id, 
      type: 'professional_refresh'
    }, 
    JWT_SECRET, 
    { expiresIn: '7d' }
  );
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'professional-service',
    version: '2.0.0',
    features: ['professional-registration', 'credential-verification', 'case-assignment', 'availability-management'],
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    stats: {
      totalProfessionals: professionals.length,
      verifiedProfessionals: professionals.filter(p => p.verificationStatus === 'VERIFIED').length,
      activeProfessionals: professionals.filter(p => p.isActive).length,
      averageRating: professionals.reduce((sum, p) => sum + (p.rating || 0), 0) / professionals.length
    }
  });
});

// Service info endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Professional Service',
    version: '2.0.0',
    description: 'Medical professional management, credentials verification, and case assignments',
    endpoints: {
      health: '/health',
      register: 'POST /api/v1/professionals/register',
      login: 'POST /api/v1/professionals/login',
      profile: 'GET /api/v1/professionals/me',
      updateProfile: 'PUT /api/v1/professionals/me',
      availability: 'GET/PUT /api/v1/professionals/availability',
      assignments: 'GET /api/v1/professionals/assignments',
      search: 'GET /api/v1/professionals/search'
    },
    status: 'operational',
    timestamp: new Date().toISOString()
  });
});

// Professional Registration
app.post('/api/v1/professionals/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('title').notEmpty().withMessage('Professional title is required'),
  body('specialization').isArray().withMessage('Specialization must be an array'),
  body('licenseNumber').notEmpty().withMessage('License number is required'),
  body('licenseState').isLength({ min: 2, max: 2 }).withMessage('License state must be 2 characters'),
  body('hospitalAffiliation').notEmpty().withMessage('Hospital affiliation is required'),
  body('yearsOfExperience').isInt({ min: 0 }).withMessage('Years of experience must be a positive number')
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
      password,
      firstName,
      lastName,
      title,
      specialization,
      licenseNumber,
      licenseState,
      hospitalAffiliation,
      yearsOfExperience
    } = req.body;

    // Check if professional already exists
    const existingProfessional = professionals.find(p => p.email === email || p.licenseNumber === licenseNumber);
    if (existingProfessional) {
      return res.status(409).json({
        success: false,
        error: 'Professional with this email or license number already exists',
        code: 'PROFESSIONAL_EXISTS'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new professional profile
    const newProfessional = {
      id: (professionals.length + 1).toString(),
      email,
      hashedPassword,
      firstName,
      lastName,
      title,
      specialization,
      licenseNumber,
      licenseState,
      hospitalAffiliation,
      yearsOfExperience,
      verificationStatus: 'PENDING', // Requires manual verification
      isActive: false, // Activated after verification
      maxCaseLoad: 5, // Default case load
      currentCaseLoad: 0,
      rating: null,
      totalReviews: 0,
      availability: {
        monday: { available: false, hours: null },
        tuesday: { available: false, hours: null },
        wednesday: { available: false, hours: null },
        thursday: { available: false, hours: null },
        friday: { available: false, hours: null },
        saturday: { available: false, hours: null },
        sunday: { available: false, hours: null }
      },
      profileCompleteness: 60, // Basic profile completion
      verificationDocuments: [],
      lastActiveAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    professionals.push(newProfessional);

    // Generate tokens (for immediate access to profile management)
    const accessToken = generateAccessToken(newProfessional);
    const refreshToken = generateRefreshToken(newProfessional);

    console.log(`[PROFESSIONALS] New professional registered: ${email} (ID: ${newProfessional.id})`);

    res.status(201).json({
      success: true,
      message: 'Professional registration submitted successfully',
      data: {
        professional: {
          id: newProfessional.id,
          email: newProfessional.email,
          firstName: newProfessional.firstName,
          lastName: newProfessional.lastName,
          title: newProfessional.title,
          specialization: newProfessional.specialization,
          verificationStatus: newProfessional.verificationStatus,
          isActive: newProfessional.isActive
        },
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: JWT_EXPIRES_IN
        },
        nextSteps: [
          'Complete your professional profile',
          'Upload verification documents',
          'Set your availability schedule',
          'Wait for credential verification'
        ]
      }
    });

  } catch (error) {
    console.error('[PROFESSIONALS] Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during registration',
      code: 'REGISTRATION_ERROR'
    });
  }
});

// Professional Login
app.post('/api/v1/professionals/login', [
  body('email').isEmail().normalizeEmail(),
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

    // Find professional
    const professional = professionals.find(p => p.email === email);
    if (!professional) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, professional.hashedPassword);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Update last active
    const professionalIndex = professionals.findIndex(p => p.id === professional.id);
    professionals[professionalIndex].lastActiveAt = new Date().toISOString();

    // Generate tokens
    const accessToken = generateAccessToken(professional);
    const refreshToken = generateRefreshToken(professional);

    console.log(`[PROFESSIONALS] Professional logged in: ${email} (ID: ${professional.id})`);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        professional: {
          id: professional.id,
          email: professional.email,
          firstName: professional.firstName,
          lastName: professional.lastName,
          title: professional.title,
          specialization: professional.specialization,
          verificationStatus: professional.verificationStatus,
          isActive: professional.isActive,
          currentCaseLoad: professional.currentCaseLoad,
          maxCaseLoad: professional.maxCaseLoad,
          rating: professional.rating
        },
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: JWT_EXPIRES_IN
        }
      }
    });

  } catch (error) {
    console.error('[PROFESSIONALS] Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during login',
      code: 'LOGIN_ERROR'
    });
  }
});

// Get professional profile
app.get('/api/v1/professionals/me', authenticateToken, (req, res) => {
  try {
    const professional = professionals.find(p => p.id === req.user.professionalId);
    
    if (!professional) {
      return res.status(404).json({
        success: false,
        error: 'Professional not found',
        code: 'PROFESSIONAL_NOT_FOUND'
      });
    }

    // Get case assignments
    const assignments = caseAssignments.filter(a => a.professionalId === professional.id && a.isActive);

    res.json({
      success: true,
      data: {
        professional: {
          ...professional,
          hashedPassword: undefined // Remove sensitive data
        },
        assignments: assignments.length,
        recentAssignments: assignments.slice(-5)
      }
    });

  } catch (error) {
    console.error('[PROFESSIONALS] Profile fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'PROFILE_FETCH_ERROR'
    });
  }
});

// Update professional profile
app.put('/api/v1/professionals/me', authenticateToken, [
  body('firstName').optional().notEmpty(),
  body('lastName').optional().notEmpty(),
  body('title').optional().notEmpty(),
  body('hospitalAffiliation').optional().notEmpty(),
  body('yearsOfExperience').optional().isInt({ min: 0 }),
  body('maxCaseLoad').optional().isInt({ min: 1, max: 50 })
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

    const professionalIndex = professionals.findIndex(p => p.id === req.user.professionalId);
    
    if (professionalIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Professional not found',
        code: 'PROFESSIONAL_NOT_FOUND'
      });
    }

    const updates = req.body;
    
    // Update the professional profile
    professionals[professionalIndex] = {
      ...professionals[professionalIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    console.log(`[PROFESSIONALS] Profile updated for professional ${req.user.professionalId}`);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        professional: {
          ...professionals[professionalIndex],
          hashedPassword: undefined
        }
      }
    });

  } catch (error) {
    console.error('[PROFESSIONALS] Profile update error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'PROFILE_UPDATE_ERROR'
    });
  }
});

// Get professional availability
app.get('/api/v1/professionals/availability', authenticateToken, (req, res) => {
  try {
    const professional = professionals.find(p => p.id === req.user.professionalId);
    
    if (!professional) {
      return res.status(404).json({
        success: false,
        error: 'Professional not found',
        code: 'PROFESSIONAL_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      data: {
        availability: professional.availability,
        currentCaseLoad: professional.currentCaseLoad,
        maxCaseLoad: professional.maxCaseLoad,
        availableSlots: professional.maxCaseLoad - professional.currentCaseLoad
      }
    });

  } catch (error) {
    console.error('[PROFESSIONALS] Availability fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'AVAILABILITY_FETCH_ERROR'
    });
  }
});

// Update professional availability
app.put('/api/v1/professionals/availability', authenticateToken, [
  body('availability').isObject().withMessage('Availability must be an object'),
  body('maxCaseLoad').optional().isInt({ min: 1, max: 50 })
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

    const professionalIndex = professionals.findIndex(p => p.id === req.user.professionalId);
    
    if (professionalIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Professional not found',
        code: 'PROFESSIONAL_NOT_FOUND'
      });
    }

    const { availability, maxCaseLoad } = req.body;
    
    // Update availability
    if (availability) {
      professionals[professionalIndex].availability = {
        ...professionals[professionalIndex].availability,
        ...availability
      };
    }
    
    if (maxCaseLoad) {
      professionals[professionalIndex].maxCaseLoad = maxCaseLoad;
    }

    professionals[professionalIndex].updatedAt = new Date().toISOString();

    console.log(`[PROFESSIONALS] Availability updated for professional ${req.user.professionalId}`);

    res.json({
      success: true,
      message: 'Availability updated successfully',
      data: {
        availability: professionals[professionalIndex].availability,
        maxCaseLoad: professionals[professionalIndex].maxCaseLoad,
        availableSlots: professionals[professionalIndex].maxCaseLoad - professionals[professionalIndex].currentCaseLoad
      }
    });

  } catch (error) {
    console.error('[PROFESSIONALS] Availability update error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'AVAILABILITY_UPDATE_ERROR'
    });
  }
});

// Get case assignments for professional
app.get('/api/v1/professionals/assignments', authenticateToken, (req, res) => {
  try {
    const { status = 'active', page = 1, limit = 10 } = req.query;
    
    let assignments = caseAssignments.filter(a => a.professionalId === req.user.professionalId);

    // Filter by status
    if (status === 'active') {
      assignments = assignments.filter(a => a.isActive && !a.completedAt);
    } else if (status === 'completed') {
      assignments = assignments.filter(a => a.completedAt);
    } else if (status === 'pending') {
      assignments = assignments.filter(a => !a.acceptedAt && !a.declinedAt);
    }

    // Sort by assigned date (newest first)
    assignments.sort((a, b) => new Date(b.assignedAt) - new Date(a.assignedAt));

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedAssignments = assignments.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        assignments: paginatedAssignments,
        pagination: {
          total: assignments.length,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(assignments.length / limit)
        }
      }
    });

  } catch (error) {
    console.error('[PROFESSIONALS] Assignments fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'ASSIGNMENTS_FETCH_ERROR'
    });
  }
});

// Search professionals (internal service call)
app.get('/api/v1/professionals/search', [
  body('specialization').optional().isArray(),
  body('minRating').optional().isFloat({ min: 0, max: 5 }),
  body('maxCaseLoad').optional().isInt({ min: 1 })
], (req, res) => {
  try {
    const { specialization, minRating, maxCaseLoad, available = true } = req.query;
    
    let filteredProfessionals = professionals.filter(p => p.isActive && p.verificationStatus === 'VERIFIED');

    // Filter by specialization
    if (specialization) {
      const searchSpecializations = Array.isArray(specialization) ? specialization : [specialization];
      filteredProfessionals = filteredProfessionals.filter(p => 
        p.specialization.some(spec => searchSpecializations.includes(spec))
      );
    }

    // Filter by minimum rating
    if (minRating) {
      filteredProfessionals = filteredProfessionals.filter(p => 
        p.rating && p.rating >= parseFloat(minRating)
      );
    }

    // Filter by availability
    if (available === 'true') {
      filteredProfessionals = filteredProfessionals.filter(p => 
        p.currentCaseLoad < p.maxCaseLoad
      );
    }

    // Sort by rating (highest first) and available slots
    filteredProfessionals.sort((a, b) => {
      const ratingDiff = (b.rating || 0) - (a.rating || 0);
      if (ratingDiff !== 0) return ratingDiff;
      
      const slotsA = a.maxCaseLoad - a.currentCaseLoad;
      const slotsB = b.maxCaseLoad - b.currentCaseLoad;
      return slotsB - slotsA;
    });

    // Remove sensitive information
    const publicProfessionals = filteredProfessionals.map(p => ({
      id: p.id,
      firstName: p.firstName,
      lastName: p.lastName,
      title: p.title,
      specialization: p.specialization,
      hospitalAffiliation: p.hospitalAffiliation,
      yearsOfExperience: p.yearsOfExperience,
      rating: p.rating,
      totalReviews: p.totalReviews,
      availableSlots: p.maxCaseLoad - p.currentCaseLoad,
      isAvailable: p.currentCaseLoad < p.maxCaseLoad
    }));

    res.json({
      success: true,
      data: {
        professionals: publicProfessionals,
        total: publicProfessionals.length,
        filters: {
          specialization,
          minRating,
          available
        }
      }
    });

  } catch (error) {
    console.error('[PROFESSIONALS] Search error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'SEARCH_ERROR'
    });
  }
});

// Get professional statistics
app.get('/api/v1/professionals/stats', authenticateToken, (req, res) => {
  try {
    const professional = professionals.find(p => p.id === req.user.professionalId);
    
    if (!professional) {
      return res.status(404).json({
        success: false,
        error: 'Professional not found',
        code: 'PROFESSIONAL_NOT_FOUND'
      });
    }

    const assignments = caseAssignments.filter(a => a.professionalId === professional.id);
    const reviews = professionalReviews.filter(r => r.professionalId === professional.id);

    const stats = {
      profile: {
        verificationStatus: professional.verificationStatus,
        isActive: professional.isActive,
        profileCompleteness: professional.profileCompleteness || 60
      },
      caseLoad: {
        current: professional.currentCaseLoad,
        maximum: professional.maxCaseLoad,
        available: professional.maxCaseLoad - professional.currentCaseLoad,
        utilizationRate: Math.round((professional.currentCaseLoad / professional.maxCaseLoad) * 100)
      },
      performance: {
        rating: professional.rating,
        totalReviews: professional.totalReviews,
        totalAssignments: assignments.length,
        completedCases: assignments.filter(a => a.completedAt).length,
        averageCompletionTime: null // Would calculate from real data
      },
      recentActivity: assignments
        .sort((a, b) => new Date(b.assignedAt) - new Date(a.assignedAt))
        .slice(0, 5)
    };

    res.json({
      success: true,
      data: {
        stats,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('[PROFESSIONALS] Stats fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'STATS_FETCH_ERROR'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('[PROFESSIONALS] Unhandled error:', error);
  
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
  console.log(`👩‍⚕️ Professional Service v2.0 running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🩺 Professional management endpoints available at /api/v1/professionals/*`);
  console.log(`👤 Demo professional: dr.smith@hospital.com / doctor123`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Professional Service shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Professional Service shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});