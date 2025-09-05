const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult, param } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 4004;
const JWT_SECRET = process.env.JWT_SECRET || 'second-opinion-jwt-secret-2025';
const JWT_EXPIRES_IN = '24h';

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4000'],
  credentials: true
}));
app.use(express.json());

// In-memory storage (for development - replace with database in production)
let professionals = [];
let professionalProfiles = [];
let caseAssignments = [];
let performanceMetrics = [];

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

// Generate Professional ID (better than "employee number")
const generateProfessionalId = () => {
  const year = new Date().getFullYear();
  const sequence = professionals.length + 1;
  return `MED-${year}-${sequence.toString().padStart(3, '0')}`;
};

// Initialize demo data
const initializeDemoData = () => {
  try {
    // Create demo professional if doesn't exist
    if (professionals.length === 0) {
      const demoProf = {
        id: '1',
        professionalId: 'MED-2024-001',
        email: 'dr.smith@hospital.com',
        hashedPassword: '$2b$10$dyU/viFTgjzrOJuN5HChWewW2MLZu/I/FUaaeMpt7bN9wwM/h9MMC', // 'doctor123'
        firstName: 'Dr. John',
        lastName: 'Smith',
        title: 'MD, PhD',
        specialization: ['LUNG_CANCER', 'BREAST_CANCER'],
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
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const demoProfile = {
        id: '1',
        professionalId: 'MED-2024-001',
        expertiseLevel: 'EXPERT',
        primarySpecialties: ['LUNG_CANCER', 'BREAST_CANCER'],
        secondarySpecialties: ['COLORECTAL_CANCER'],
        diagnosticCapabilities: ['RADIOLOGY_FOCUSED', 'MULTIMODAL_REVIEWER'],
        licensingJurisdictions: ['US_LICENSED'],
        regulatoryCompliance: {
          gdprCompliant: false,
          hipaaCompliant: true,
          localRegulationsAware: ['US', 'CA']
        },
        languages: [{
          language: 'ENGLISH',
          proficiencyLevel: 'NATIVE',
          medicalTerminology: true
        }],
        availabilityProfile: {
          tier: 'STANDARD',
          maxConcurrentCases: 10,
          workingHours: {
            timezone: 'America/Los_Angeles',
            weekdays: {
              start: '09:00',
              end: '17:00'
            },
            weekends: false,
            urgentCasesAfterHours: true
          }
        },
        performanceMetrics: {
          averageResponseTime: 48,
          customerSatisfactionRating: 4.8,
          caseAccuracyRating: 4.9,
          peerReviewScore: 4.7,
          totalCasesCompleted: 156,
          successfulMatches: 148,
          specialtySuccessRates: {
            'LUNG_CANCER': 0.95,
            'BREAST_CANCER': 0.92
          }
        },
        qualityProfile: {
          verificationStatus: 'VERIFIED',
          lastVerificationDate: new Date().toISOString(),
          competencyAssessmentScore: 92,
          continuousEducationCredits: 45
        },
        preferences: {
          preferredCaseTypes: ['SECOND_OPINION', 'COMPLEX_CONSULTATION'],
          mentorshipAvailable: true,
          researchInterests: ['Precision Medicine', 'Immunotherapy']
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        profileCompleteness: 95
      };

      professionals.push(demoProf);
      professionalProfiles.push(demoProfile);
      
      console.log('Demo professional and profile created');
    }
  } catch (error) {
    console.log('Demo data initialization:', error.message);
  }
};

// Utility functions
const generateAccessToken = (professional) => {
  return jwt.sign(
    { 
      professionalId: professional.professionalId, 
      id: professional.id,
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
      professionalId: professional.professionalId,
      id: professional.id, 
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
    service: 'professional-service-enhanced',
    version: '2.1.0',
    features: [
      'professional-profiling',
      'intelligent-matching',
      'performance-metrics',
      'regulatory-compliance',
      'multi-language-support'
    ],
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    stats: {
      totalProfessionals: professionals.length,
      verifiedProfessionals: professionals.filter(p => p.verificationStatus === 'VERIFIED').length,
      activeProfessionals: professionals.filter(p => p.isActive).length,
      averageRating: professionals.reduce((sum, p) => sum + (p.rating || 0), 0) / professionals.length || 0,
      totalProfiles: professionalProfiles.length,
      completeProfiles: professionalProfiles.filter(p => p.profileCompleteness >= 90).length
    }
  });
});

// Professional registration endpoint
app.post('/api/v1/professionals/register', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('title').optional().isString(),
  body('specialization').optional().isArray(),
  body('yearsOfExperience').optional().isInt({ min: 0 }),
  body('profile').optional().isObject()
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

    const { email, password, firstName, middleName, lastName, title, specialization, yearsOfExperience, profile } = req.body;

    // Check if professional already exists
    const existingProfessional = professionals.find(p => p.email === email);
    if (existingProfessional) {
      return res.status(409).json({
        success: false,
        error: 'Professional already registered with this email',
        code: 'DUPLICATE_EMAIL'
      });
    }

    // Hash password
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate professional ID
    const professionalId = generateProfessionalId();

    // Create professional record
    const newProfessional = {
      id: (professionals.length + 1).toString(),
      professionalId,
      email,
      hashedPassword,
      firstName,
      middleName: middleName || '',
      lastName,
      title: title || 'MD',
      specialization: specialization || [],
      yearsOfExperience: yearsOfExperience || 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    professionals.push(newProfessional);

    // Create comprehensive professional profile if provided
    if (profile) {
      const newProfile = {
        id: uuidv4(),
        professionalId,
        clinicalSeniority: profile.clinicalSeniority || 'JUNIOR',
        primarySpecialty: profile.primarySpecialty || [],
        secondarySpecialties: profile.secondarySpecialties || [],
        diagnosticExpertise: profile.diagnosticExpertise || [],
        regionalLicensing: profile.regionalLicensing || [],
        languageCapabilities: profile.languageCapabilities || ['ENGLISH'],
        availabilityTier: profile.availabilityTier || 'STANDARD',
        preferences: {
          caseTypes: profile.preferences?.caseTypes || ['routine'],
          maxCasesPerWeek: profile.preferences?.maxCasesPerWeek || 10,
          preferredResponseTime: profile.preferences?.preferredResponseTime || 48,
          workingHours: profile.preferences?.workingHours || { start: 9, end: 17 },
          timeZone: profile.preferences?.timeZone || 'UTC'
        },
        certifications: profile.certifications || [],
        researchInterests: profile.researchInterests || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      professionalProfiles.push(newProfile);
    }

    // Initialize performance metrics
    const performanceRecord = {
      professionalId,
      totalCasesHandled: 0,
      averageResponseTime: 0,
      customerSatisfactionRating: 0,
      completionRate: 0,
      specialtyExpertiseRating: 0,
      qualityScores: [],
      caseComplexityHandled: [],
      lastCaseDate: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    performanceMetrics.push(performanceRecord);

    console.log(`🩺 New professional registered: ${firstName} ${middleName} ${lastName} (${professionalId})`);

    res.status(201).json({
      success: true,
      message: 'Professional registered successfully',
      data: {
        professionalId,
        email,
        firstName,
        middleName,
        lastName,
        title,
        specialization,
        yearsOfExperience,
        profile: profile ? 'Profile configured' : 'Basic registration',
        createdAt: newProfessional.createdAt
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during registration',
      code: 'REGISTRATION_ERROR'
    });
  }
});

// Service info endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Professional Service Enhanced',
    version: '2.1.0',
    description: 'Advanced medical professional management with intelligent profiling and case matching',
    features: [
      'Comprehensive Professional Profiling',
      'Cancer Subspecialty Matching',
      'Multi-language Support', 
      'Regulatory Compliance Tracking',
      'Performance Metrics & Analytics',
      'Intelligent Case Assignment',
      'Availability Management',
      'Quality Assurance'
    ],
    endpoints: {
      health: '/health',
      register: 'POST /api/v1/professionals/register',
      login: 'POST /api/v1/professionals/login',
      profile: 'GET /api/v1/professionals/me',
      updateProfile: 'PUT /api/v1/professionals/me',
      professionalProfile: 'GET/PUT /api/v1/professionals/profile',
      matching: 'POST /api/v1/matching/find-professionals',
      availability: 'GET/PUT /api/v1/professionals/availability',
      assignments: 'GET /api/v1/professionals/assignments',
      stats: 'GET /api/v1/professionals/stats',
      search: 'GET /api/v1/professionals/search'
    },
    status: 'operational',
    timestamp: new Date().toISOString()
  });
});

// Professional login endpoint
app.post('/api/v1/professionals/login', [
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
    const professional = professionals.find(p => p.email.toLowerCase() === email.toLowerCase());
    
    if (!professional) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Check if professional is active
    if (!professional.isActive) {
      return res.status(403).json({
        success: false,
        error: 'Account is deactivated',
        code: 'ACCOUNT_DEACTIVATED'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, professional.hashedPassword);
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: professional.id,
        professionalId: professional.professionalId,
        email: professional.email,
        role: 'professional'
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Get professional profile
    const profile = professionalProfiles.find(p => p.professionalId === professional.professionalId);

    // Update last login
    professional.lastLogin = new Date().toISOString();
    professional.updatedAt = new Date().toISOString();

    console.log(`[AUTH] Professional ${professional.professionalId} logged in successfully`);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        professional: {
          id: professional.id,
          professionalId: professional.professionalId,
          email: professional.email,
          firstName: professional.firstName,
          lastName: professional.lastName,
          title: professional.title,
          specialization: professional.specialization,
          verificationStatus: professional.verificationStatus,
          rating: professional.rating,
          totalReviews: professional.totalReviews,
          profile: profile || null
        }
      }
    });

  } catch (error) {
    console.error('[AUTH] Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during authentication',
      code: 'AUTH_ERROR'
    });
  }
});

// Professional dashboard data endpoint
app.get('/api/v1/professionals/dashboard', authenticateToken, async (req, res) => {
  try {
    const professionalId = req.user.professionalId || req.user.id;
    
    // Get professional data
    const professional = professionals.find(p => 
      p.id === req.user.id || p.professionalId === professionalId
    );
    
    if (!professional) {
      return res.status(404).json({
        success: false,
        error: 'Professional not found',
        code: 'PROFESSIONAL_NOT_FOUND'
      });
    }

    const profile = professionalProfiles.find(p => p.professionalId === professional.professionalId);

    // Get recent cases (mock data for now - this would come from case service)
    const recentCases = [
      {
        caseNumber: 'CASE-2025-001',
        diseaseType: 'BREAST_CANCER',
        completedAt: '2025-01-15T10:30:00Z',
        rating: 5,
        compensation: 750.00
      }
    ];

    // Get active cases (mock data for now)
    const activeCases = [];

    // Get available cases count (mock data for now)
    const availableCasesCount = 12;

    res.json({
      success: true,
      data: {
        professional: {
          id: professional.id,
          professionalId: professional.professionalId,
          firstName: professional.firstName,
          lastName: professional.lastName,
          email: professional.email,
          title: professional.title,
          specialization: professional.specialization,
          rating: professional.rating,
          totalReviews: professional.totalReviews,
          currentCaseLoad: professional.currentCaseLoad,
          maxCaseLoad: professional.maxCaseLoad,
          profile: profile
        },
        dashboard: {
          recentCases,
          activeCases,
          availableCasesCount,
          totalEarnings: recentCases.reduce((sum, c) => sum + c.compensation, 0),
          averageRating: professional.rating,
          completedCasesCount: recentCases.length
        }
      }
    });

  } catch (error) {
    console.error('[DASHBOARD] Dashboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'DASHBOARD_ERROR'
    });
  }
});

// Get professional profile with comprehensive profiling data
app.get('/api/v1/professionals/profile', authenticateToken, (req, res) => {
  try {
    const professional = professionals.find(p => 
      p.id === req.user.id || p.professionalId === req.user.professionalId
    );
    
    if (!professional) {
      return res.status(404).json({
        success: false,
        error: 'Professional not found',
        code: 'PROFESSIONAL_NOT_FOUND'
      });
    }

    const profile = professionalProfiles.find(p => p.professionalId === professional.professionalId);

    res.json({
      success: true,
      data: {
        professional: {
          ...professional,
          hashedPassword: undefined // Remove sensitive data
        },
        profile: profile || null,
        profileCompleteness: profile?.profileCompleteness || 60
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

// Update professional profile with comprehensive data
app.put('/api/v1/professionals/profile', authenticateToken, [
  body('primarySpecialties').isArray().withMessage('Primary specialties must be an array'),
  body('diagnosticCapabilities').isArray().withMessage('Diagnostic capabilities must be an array'),
  body('licensingJurisdictions').isArray().withMessage('Licensing jurisdictions must be an array'),
  body('languages').isArray().withMessage('Languages must be an array'),
  body('availabilityProfile.tier').isIn(['RAPID_RESPONSE', 'STANDARD', 'COMPLEX_CASE']),
  body('availabilityProfile.maxConcurrentCases').isInt({ min: 1, max: 20 })
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

    const professional = professionals.find(p => 
      p.id === req.user.id || p.professionalId === req.user.professionalId
    );
    
    if (!professional) {
      return res.status(404).json({
        success: false,
        error: 'Professional not found',
        code: 'PROFESSIONAL_NOT_FOUND'
      });
    }

    const profileData = req.body;
    
    // Calculate profile completeness
    let completeness = 0;
    if (profileData.primarySpecialties?.length > 0) completeness += 20;
    if (profileData.diagnosticCapabilities?.length > 0) completeness += 15;
    if (profileData.licensingJurisdictions?.length > 0) completeness += 15;
    if (profileData.languages?.length > 0) completeness += 15;
    if (profileData.availabilityProfile?.tier) completeness += 10;
    if (profileData.availabilityProfile?.maxConcurrentCases > 0) completeness += 10;
    if (profileData.preferences?.preferredCaseTypes?.length > 0) completeness += 10;
    if (profileData.regulatoryCompliance) completeness += 5;
    
    // Find or create profile
    let profileIndex = professionalProfiles.findIndex(p => p.professionalId === professional.professionalId);
    
    const updatedProfile = {
      id: profileIndex >= 0 ? professionalProfiles[profileIndex].id : uuidv4(),
      professionalId: professional.professionalId,
      expertiseLevel: professional.specialization?.[0] === 'DISTINGUISHED' ? 'DISTINGUISHED' : 
                     professional.yearsOfExperience > 15 ? 'EXPERT' :
                     professional.yearsOfExperience > 5 ? 'SENIOR' : 'JUNIOR',
      ...profileData,
      profileCompleteness: completeness,
      updatedAt: new Date().toISOString(),
      createdAt: profileIndex >= 0 ? professionalProfiles[profileIndex].createdAt : new Date().toISOString(),
      isActive: true
    };

    if (profileIndex >= 0) {
      professionalProfiles[profileIndex] = updatedProfile;
    } else {
      professionalProfiles.push(updatedProfile);
    }

    console.log(`[PROFESSIONALS] Profile updated for ${professional.professionalId}`);

    res.json({
      success: true,
      message: 'Professional profile updated successfully',
      data: {
        profile: updatedProfile
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

// Get professional statistics with enhanced metrics
app.get('/api/v1/professionals/stats', authenticateToken, (req, res) => {
  try {
    const professional = professionals.find(p => 
      p.id === req.user.id || p.professionalId === req.user.professionalId
    );
    
    if (!professional) {
      return res.status(404).json({
        success: false,
        error: 'Professional not found',
        code: 'PROFESSIONAL_NOT_FOUND'
      });
    }

    const profile = professionalProfiles.find(p => p.professionalId === professional.professionalId);
    const assignments = caseAssignments.filter(a => a.professionalId === professional.professionalId);

    const stats = {
      profile: {
        verificationStatus: professional.verificationStatus,
        isActive: professional.isActive,
        profileCompleteness: profile?.profileCompleteness || 60,
        expertiseLevel: profile?.expertiseLevel || 'SENIOR'
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
        averageResponseTime: profile?.performanceMetrics?.averageResponseTime || null,
        customerSatisfactionRating: profile?.performanceMetrics?.customerSatisfactionRating || null,
        specialtySuccessRates: profile?.performanceMetrics?.specialtySuccessRates || {}
      },
      profiling: {
        primarySpecialties: profile?.primarySpecialties || [],
        diagnosticCapabilities: profile?.diagnosticCapabilities || [],
        languages: profile?.languages?.map(l => l.language) || [],
        availabilityTier: profile?.availabilityProfile?.tier || null,
        mentorshipAvailable: profile?.preferences?.mentorshipAvailable || false
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

// Intelligent case-professional matching endpoint
app.post('/api/v1/matching/find-professionals', [
  body('caseProfile').isObject().withMessage('Case profile is required'),
  body('caseProfile.primarySpecialtyRequired').notEmpty(),
  body('caseProfile.requestedExpertiseLevel').isIn(['JUNIOR', 'SENIOR', 'EXPERT', 'DISTINGUISHED']),
  body('caseProfile.requestedUrgency').isIn(['STANDARD', 'URGENT', 'EMERGENCY'])
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

    const { caseProfile } = req.body;
    
    // Find eligible professionals based on case requirements
    const eligibleProfessionals = professionalProfiles
      .filter(profile => {
        // Must be active and verified
        if (!profile.isActive) return false;
        
        const professional = professionals.find(p => p.professionalId === profile.professionalId);
        if (!professional || !professional.isActive || professional.verificationStatus !== 'VERIFIED') return false;
        
        // Must have capacity
        if (professional.currentCaseLoad >= professional.maxCaseLoad) return false;
        
        // Must match expertise level
        const expertiseLevels = ['JUNIOR', 'SENIOR', 'EXPERT', 'DISTINGUISHED'];
        const requiredLevel = expertiseLevels.indexOf(caseProfile.requestedExpertiseLevel);
        const professionalLevel = expertiseLevels.indexOf(profile.expertiseLevel);
        if (professionalLevel < requiredLevel) return false;
        
        // Must have required specialty
        const hasSpecialty = profile.primarySpecialties.includes(caseProfile.primarySpecialtyRequired) ||
                           profile.secondarySpecialties?.includes(caseProfile.primarySpecialtyRequired);
        if (!hasSpecialty) return false;
        
        // Must have required diagnostic capability
        if (caseProfile.diagnosticExpertiseRequired) {
          const hasCapability = caseProfile.diagnosticExpertiseRequired.some(cap => 
            profile.diagnosticCapabilities.includes(cap)
          );
          if (!hasCapability) return false;
        }
        
        // Must meet language requirements
        if (caseProfile.requiredLanguage && caseProfile.requiredLanguage !== 'ENGLISH') {
          const hasLanguage = profile.languages.some(lang => 
            lang.language === caseProfile.requiredLanguage && lang.medicalTerminology
          );
          if (!hasLanguage) return false;
        }
        
        // Must meet regulatory requirements
        if (caseProfile.regulatoryJurisdiction) {
          if (!profile.licensingJurisdictions.includes(caseProfile.regulatoryJurisdiction)) return false;
        }
        
        // Check availability tier for urgency
        if (caseProfile.requestedUrgency === 'EMERGENCY' && profile.availabilityProfile.tier === 'COMPLEX_CASE') return false;
        if (caseProfile.requestedUrgency === 'URGENT' && profile.availabilityProfile.tier === 'COMPLEX_CASE') return false;
        
        return true;
      })
      .map(profile => {
        const professional = professionals.find(p => p.professionalId === profile.professionalId);
        
        // Calculate match score
        let matchScore = 0.0;
        
        // Expertise level match (0.3 weight)
        const expertiseLevels = ['JUNIOR', 'SENIOR', 'EXPERT', 'DISTINGUISHED'];
        const requiredLevel = expertiseLevels.indexOf(caseProfile.requestedExpertiseLevel);
        const professionalLevel = expertiseLevels.indexOf(profile.expertiseLevel);
        if (professionalLevel === requiredLevel) matchScore += 0.3;
        else if (professionalLevel > requiredLevel) matchScore += 0.25; // Overqualified
        
        // Primary specialty match (0.25 weight)
        if (profile.primarySpecialties.includes(caseProfile.primarySpecialtyRequired)) {
          matchScore += 0.25;
        } else if (profile.secondarySpecialties?.includes(caseProfile.primarySpecialtyRequired)) {
          matchScore += 0.15;
        }
        
        // Performance metrics (0.2 weight)
        const performanceScore = (
          (profile.performanceMetrics?.customerSatisfactionRating || 4.0) / 5.0 * 0.1 +
          (profile.performanceMetrics?.caseAccuracyRating || 4.0) / 5.0 * 0.1
        );
        matchScore += performanceScore;
        
        // Availability (0.15 weight)
        const availableSlots = professional.maxCaseLoad - professional.currentCaseLoad;
        const availabilityScore = Math.min(availableSlots / 5.0, 1.0) * 0.15;
        matchScore += availabilityScore;
        
        // Response time suitability (0.1 weight)
        if (caseProfile.requestedUrgency === 'EMERGENCY' && profile.availabilityProfile.tier === 'RAPID_RESPONSE') {
          matchScore += 0.1;
        } else if (caseProfile.requestedUrgency === 'URGENT' && 
                  ['RAPID_RESPONSE', 'STANDARD'].includes(profile.availabilityProfile.tier)) {
          matchScore += 0.08;
        } else if (caseProfile.requestedUrgency === 'STANDARD') {
          matchScore += 0.05;
        }
        
        // Match reasons
        const matchReasons = [];
        if (profile.primarySpecialties.includes(caseProfile.primarySpecialtyRequired)) {
          matchReasons.push(`Primary specialty: ${caseProfile.primarySpecialtyRequired}`);
        }
        if (profile.expertiseLevel === caseProfile.requestedExpertiseLevel) {
          matchReasons.push(`Exact expertise level match: ${profile.expertiseLevel}`);
        }
        if (profile.performanceMetrics?.customerSatisfactionRating >= 4.5) {
          matchReasons.push(`High customer satisfaction: ${profile.performanceMetrics.customerSatisfactionRating}/5.0`);
        }
        if (availableSlots >= 3) {
          matchReasons.push(`Good availability: ${availableSlots} open slots`);
        }
        
        // Estimated response time
        let estimatedResponseTime = 72; // Default 3 days
        if (profile.availabilityProfile.tier === 'RAPID_RESPONSE') estimatedResponseTime = 36;
        if (profile.availabilityProfile.tier === 'COMPLEX_CASE') estimatedResponseTime = 120;
        if (profile.performanceMetrics?.averageResponseTime) {
          estimatedResponseTime = profile.performanceMetrics.averageResponseTime;
        }
        
        return {
          professionalId: profile.professionalId,
          matchScore: Math.round(matchScore * 1000) / 1000, // Round to 3 decimal places
          matchReasons,
          estimatedResponseTime,
          professional: {
            firstName: professional.firstName,
            lastName: professional.lastName,
            title: professional.title,
            specialization: profile.primarySpecialties,
            yearsOfExperience: professional.yearsOfExperience,
            rating: professional.rating,
            availableSlots: availableSlots,
            tier: profile.availabilityProfile.tier
          }
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore) // Sort by match score descending
      .slice(0, 10); // Return top 10 matches

    res.json({
      success: true,
      data: {
        eligibleProfessionals,
        totalMatches: eligibleProfessionals.length,
        caseProfile: {
          ...caseProfile,
          eligibleProfessionals: eligibleProfessionals.map(ep => ({
            professionalId: ep.professionalId,
            matchScore: ep.matchScore,
            matchReasons: ep.matchReasons,
            estimatedResponseTime: ep.estimatedResponseTime
          }))
        },
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('[MATCHING] Professional matching error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'MATCHING_ERROR'
    });
  }
});

// Get all professionals (for admin/matching purposes)
app.get('/api/v1/professionals/all', (req, res) => {
  try {
    const allProfessionals = professionals.map(prof => {
      const profile = professionalProfiles.find(p => p.professionalId === prof.professionalId);
      return {
        ...prof,
        hashedPassword: undefined,
        profile: profile || null
      };
    });

    res.json({
      success: true,
      data: {
        professionals: allProfessionals,
        total: allProfessionals.length
      }
    });
  } catch (error) {
    console.error('[PROFESSIONALS] Get all professionals error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'GET_ALL_ERROR'
    });
  }
});

// Update professional performance metrics
app.post('/api/v1/professionals/:professionalId/performance', [
  body('customerSatisfactionRating').optional().isFloat({ min: 1, max: 5 }),
  body('caseAccuracyRating').optional().isFloat({ min: 1, max: 5 }),
  body('responseTime').optional().isInt({ min: 1 }),
  body('caseCompleted').optional().isBoolean(),
  body('specialty').optional().isString()
], (req, res) => {
  try {
    const { professionalId } = req.params;
    const metrics = req.body;
    
    const profileIndex = professionalProfiles.findIndex(p => p.professionalId === professionalId);
    if (profileIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Professional profile not found',
        code: 'PROFILE_NOT_FOUND'
      });
    }
    
    const profile = professionalProfiles[profileIndex];
    
    // Update performance metrics
    if (!profile.performanceMetrics) {
      profile.performanceMetrics = {
        totalCasesCompleted: 0,
        successfulMatches: 0
      };
    }
    
    if (metrics.customerSatisfactionRating) {
      // Calculate running average
      const currentRating = profile.performanceMetrics.customerSatisfactionRating || 4.0;
      const totalCases = profile.performanceMetrics.totalCasesCompleted || 1;
      profile.performanceMetrics.customerSatisfactionRating = 
        ((currentRating * totalCases) + metrics.customerSatisfactionRating) / (totalCases + 1);
    }
    
    if (metrics.caseAccuracyRating) {
      const currentRating = profile.performanceMetrics.caseAccuracyRating || 4.0;
      const totalCases = profile.performanceMetrics.totalCasesCompleted || 1;
      profile.performanceMetrics.caseAccuracyRating = 
        ((currentRating * totalCases) + metrics.caseAccuracyRating) / (totalCases + 1);
    }
    
    if (metrics.responseTime) {
      const currentTime = profile.performanceMetrics.averageResponseTime || 48;
      const totalCases = profile.performanceMetrics.totalCasesCompleted || 1;
      profile.performanceMetrics.averageResponseTime = 
        ((currentTime * totalCases) + metrics.responseTime) / (totalCases + 1);
    }
    
    if (metrics.caseCompleted) {
      profile.performanceMetrics.totalCasesCompleted = 
        (profile.performanceMetrics.totalCasesCompleted || 0) + 1;
      profile.performanceMetrics.successfulMatches = 
        (profile.performanceMetrics.successfulMatches || 0) + 1;
        
      // Update specialty success rates
      if (metrics.specialty) {
        if (!profile.performanceMetrics.specialtySuccessRates) {
          profile.performanceMetrics.specialtySuccessRates = {};
        }
        const current = profile.performanceMetrics.specialtySuccessRates[metrics.specialty] || 0.9;
        profile.performanceMetrics.specialtySuccessRates[metrics.specialty] = 
          Math.min(current + 0.01, 1.0); // Slight improvement, capped at 1.0
      }
    }
    
    profile.updatedAt = new Date().toISOString();
    professionalProfiles[profileIndex] = profile;
    
    console.log(`[PROFESSIONALS] Performance metrics updated for ${professionalId}`);
    
    res.json({
      success: true,
      message: 'Performance metrics updated successfully',
      data: {
        performanceMetrics: profile.performanceMetrics
      }
    });
    
  } catch (error) {
    console.error('[PROFESSIONALS] Performance update error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'PERFORMANCE_UPDATE_ERROR'
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

// Initialize demo data
initializeDemoData();

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🩺 Professional Service Enhanced v2.1 running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🧬 Professional profiling endpoints available at /api/v1/professionals/*`);
  console.log(`🎯 Intelligent matching available at /api/v1/matching/find-professionals`);
  console.log(`📈 Performance tracking enabled`);
  console.log(`👤 Demo professional: dr.smith@hospital.com / doctor123`);
  console.log(`🆔 Professional ID format: MED-YYYY-NNN`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Professional Service Enhanced shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Professional Service Enhanced shutting down gracefully');
  process.exit(0);
});