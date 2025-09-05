const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { body, validationResult, param } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4002;
const JWT_SECRET = process.env.JWT_SECRET || 'second-opinion-jwt-secret-2025';
const PROFESSIONAL_SERVICE_URL = process.env.PROFESSIONAL_SERVICE_URL || 'http://localhost:4004';

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4000'],
  credentials: true
}));
app.use(express.json());

// In-memory storage (for development - replace with database in production)
let cases = [];
let caseProfiles = [];
let documents = [];
let caseAssignments = [];

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

// Case complexity assessment using AI-like heuristics
const assessCaseComplexity = (caseData) => {
  let complexityScore = 0;
  let reasons = [];

  // Document type complexity
  const documentTypes = caseData.documents?.map(doc => doc.type) || [];
  if (documentTypes.includes('GENOMIC_TESTING')) {
    complexityScore += 3;
    reasons.push('Genomic testing requires specialized interpretation');
  }
  if (documentTypes.includes('PATHOLOGY_REPORT')) {
    complexityScore += 2;
    reasons.push('Pathology reports require expert review');
  }
  if (documentTypes.includes('MEDICAL_IMAGING')) {
    complexityScore += 2;
    reasons.push('Medical imaging requires radiology expertise');
  }

  // Multiple document types increase complexity
  if (documentTypes.length > 3) {
    complexityScore += 2;
    reasons.push('Multiple document types require integrated analysis');
  }

  // Patient age complexity
  if (caseData.patientAge) {
    if (caseData.patientAge < 18) {
      complexityScore += 2;
      reasons.push('Pediatric cases require specialized expertise');
    } else if (caseData.patientAge > 75) {
      complexityScore += 1;
      reasons.push('Geriatric considerations may apply');
    }
  }

  // Disease type complexity
  const complexDiseases = [
    'SARCOMA', 'BRAIN_TUMOR', 'PEDIATRIC_LEUKEMIA', 'NEUROBLASTOMA',
    'MYELODYSPLASTIC_SYNDROME', 'MOLECULAR_ONCOLOGY'
  ];
  if (caseData.diseaseType && complexDiseases.includes(caseData.diseaseType)) {
    complexityScore += 3;
    reasons.push('Rare or complex disease type');
  }

  // Previous treatment complexity
  if (caseData.description) {
    const text = caseData.description.toLowerCase();
    if (text.includes('recurrent') || text.includes('metastatic')) {
      complexityScore += 2;
      reasons.push('Recurrent or metastatic disease increases complexity');
    }
    if (text.includes('failed') || text.includes('resistant')) {
      complexityScore += 2;
      reasons.push('Treatment resistance requires expert analysis');
    }
    if (text.includes('multiple') || text.includes('combination')) {
      complexityScore += 1;
      reasons.push('Multiple treatment considerations');
    }
  }

  // Determine complexity level
  let complexity;
  if (complexityScore >= 8) complexity = 'EXCEPTIONAL';
  else if (complexityScore >= 5) complexity = 'COMPLEX';
  else if (complexityScore >= 2) complexity = 'MODERATE';
  else complexity = 'ROUTINE';

  return {
    complexity,
    score: complexityScore,
    reasons
  };
};

// Disease type mapping from text to standardized enums
const mapDiseaseType = (diseaseText) => {
  const diseaseMap = {
    'breast': 'BREAST_CANCER',
    'lung': 'LUNG_CANCER',
    'prostate': 'PROSTATE_CANCER',
    'colorectal': 'COLORECTAL_CANCER',
    'colon': 'COLORECTAL_CANCER',
    'rectal': 'COLORECTAL_CANCER',
    'skin': 'SKIN_CANCER',
    'melanoma': 'SKIN_CANCER',
    'liver': 'LIVER_CANCER',
    'pancreatic': 'PANCREATIC_CANCER',
    'kidney': 'KIDNEY_CANCER',
    'bladder': 'BLADDER_CANCER',
    'leukemia': 'LEUKEMIA',
    'lymphoma': 'LYMPHOMA',
    'myeloma': 'MYELOMA',
    'sarcoma': 'SARCOMA',
    'brain': 'BRAIN_TUMOR',
    'ovarian': 'GYNECOLOGIC_CANCER',
    'cervical': 'GYNECOLOGIC_CANCER',
    'uterine': 'GYNECOLOGIC_CANCER',
    'head and neck': 'HEAD_AND_NECK_CANCER',
    'gastric': 'GASTRIC_CANCER',
    'stomach': 'GASTRIC_CANCER'
  };

  const lowerText = diseaseText.toLowerCase();
  for (const [key, value] of Object.entries(diseaseMap)) {
    if (lowerText.includes(key)) {
      return value;
    }
  }
  
  return 'LUNG_CANCER'; // Default fallback
};

// Determine required diagnostic expertise based on case data
const determineDiagnosticExpertise = (caseData) => {
  const documentTypes = caseData.documents?.map(doc => doc.type) || [];
  const expertise = [];

  if (documentTypes.includes('MEDICAL_IMAGING') || documentTypes.includes('RADIOLOGY_IMAGES')) {
    expertise.push('RADIOLOGY_FOCUSED');
  }
  if (documentTypes.includes('PATHOLOGY_REPORT')) {
    expertise.push('PATHOLOGY_FOCUSED');
  }
  if (documentTypes.includes('GENOMIC_TESTING')) {
    expertise.push('GENOMICS_SPECIALIST');
  }
  
  // If multiple types, suggest multimodal reviewer
  if (expertise.length > 1) {
    expertise.push('MULTIMODAL_REVIEWER');
  }
  
  return expertise.length > 0 ? expertise : ['MULTIMODAL_REVIEWER'];
};

// Initialize demo data
const initializeDemoData = () => {
  try {
    if (cases.length === 0) {
      const demoCase = {
        id: '1',
        caseNumber: 'CASE-2024-001',
        customerId: 'customer-123',
        patientName: 'John Doe',
        patientAge: 65,
        patientGender: 'Male',
        diseaseType: 'Lung Cancer',
        submittedDate: new Date().toISOString(),
        status: 'assigned',
        priority: 'high',
        description: 'Patient presents with persistent cough, chest pain, and unexplained weight loss over the past 3 months. Recent CT scan shows suspicious mass in right upper lobe.',
        documents: [
          {
            id: '1',
            name: 'CT_Chest_Scan.pdf',
            type: 'MEDICAL_IMAGING',
            size: 2450000,
            uploadedAt: new Date().toISOString()
          },
          {
            id: '2', 
            name: 'Pathology_Report.pdf',
            type: 'PATHOLOGY_REPORT',
            size: 890000,
            uploadedAt: new Date().toISOString()
          }
        ],
        expertiseLevel: 'EXPERT',
        urgency: 'STANDARD',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Create case profile for demo case
      const complexityAssessment = assessCaseComplexity(demoCase);
      const demoProfile = {
        id: '1',
        caseId: demoCase.id,
        caseNumber: demoCase.caseNumber,
        requestedExpertiseLevel: 'EXPERT',
        requestedUrgency: 'STANDARD',
        estimatedComplexity: complexityAssessment.complexity,
        primarySpecialtyRequired: mapDiseaseType(demoCase.diseaseType),
        diagnosticExpertiseRequired: determineDiagnosticExpertise(demoCase),
        documentTypes: demoCase.documents.map(doc => doc.type),
        requiredLanguage: 'ENGLISH',
        regulatoryJurisdiction: 'US_LICENSED',
        complexityReasons: complexityAssessment.reasons,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      cases.push(demoCase);
      caseProfiles.push(demoProfile);
      
      console.log('Demo case and profile created');
    }
  } catch (error) {
    console.log('Demo case initialization:', error.message);
  }
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'case-management-service-enhanced',
    version: '2.1.0',
    features: [
      'intelligent-case-profiling',
      'automatic-complexity-assessment',
      'professional-matching-integration',
      'document-type-analysis',
      'regulatory-compliance'
    ],
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    stats: {
      totalCases: cases.length,
      totalProfiles: caseProfiles.length,
      assignedCases: caseAssignments.length,
      averageComplexityScore: caseProfiles.reduce((sum, p) => sum + (p.complexityScore || 0), 0) / caseProfiles.length || 0
    }
  });
});

// Create new case with automatic profiling
app.post('/api/v1/cases', authenticateToken, [
  body('patientName').notEmpty().withMessage('Patient name is required'),
  body('diseaseType').notEmpty().withMessage('Disease type is required'),
  body('description').notEmpty().withMessage('Case description is required'),
  body('expertiseLevel').isIn(['JUNIOR', 'SENIOR', 'EXPERT', 'DISTINGUISHED']),
  body('urgency').optional().isIn(['STANDARD', 'URGENT', 'EMERGENCY'])
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

    const caseData = req.body;
    const caseId = uuidv4();
    const caseNumber = `CASE-${new Date().getFullYear()}-${(cases.length + 1).toString().padStart(3, '0')}`;

    // Create case
    const newCase = {
      id: caseId,
      caseNumber,
      customerId: req.user.id,
      ...caseData,
      status: 'pending_assignment',
      submittedDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Assess complexity
    const complexityAssessment = assessCaseComplexity(newCase);

    // Create case profile
    const caseProfile = {
      id: uuidv4(),
      caseId,
      caseNumber,
      requestedExpertiseLevel: caseData.expertiseLevel,
      requestedUrgency: caseData.urgency || 'STANDARD',
      estimatedComplexity: complexityAssessment.complexity,
      primarySpecialtyRequired: mapDiseaseType(caseData.diseaseType),
      diagnosticExpertiseRequired: determineDiagnosticExpertise(caseData),
      documentTypes: caseData.documents?.map(doc => doc.type) || [],
      requiredLanguage: caseData.requiredLanguage || 'ENGLISH',
      regulatoryJurisdiction: caseData.regulatoryJurisdiction || 'US_LICENSED',
      complexityScore: complexityAssessment.score,
      complexityReasons: complexityAssessment.reasons,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save case and profile
    cases.push(newCase);
    caseProfiles.push(caseProfile);

    console.log(`[CASES] New case created: ${caseNumber} (Complexity: ${complexityAssessment.complexity})`);

    res.status(201).json({
      success: true,
      message: 'Case created successfully with intelligent profiling',
      data: {
        case: newCase,
        profile: caseProfile,
        complexityAssessment: {
          level: complexityAssessment.complexity,
          score: complexityAssessment.score,
          reasons: complexityAssessment.reasons
        }
      }
    });

  } catch (error) {
    console.error('[CASES] Case creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during case creation',
      code: 'CASE_CREATION_ERROR'
    });
  }
});

// Get all cases (for admin/verification)
app.get('/api/v1/cases', authenticateToken, (req, res) => {
  try {
    const casesWithProfiles = cases.map(caseData => {
      const profile = caseProfiles.find(p => p.caseId === caseData.id);
      return {
        ...caseData,
        profile: profile || null
      };
    });

    res.json({
      success: true,
      data: casesWithProfiles,
      total: cases.length
    });

  } catch (error) {
    console.error('[CASES] All cases fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'ALL_CASES_ERROR'
    });
  }
});

// Get case profile
app.get('/api/v1/cases/:id/profile', (req, res) => {
  try {
    const { id } = req.params;
    const caseProfile = caseProfiles.find(p => p.caseId === id);
    
    if (!caseProfile) {
      return res.status(404).json({
        success: false,
        error: 'Case profile not found',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      data: {
        profile: caseProfile
      }
    });

  } catch (error) {
    console.error('[CASES] Profile fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'PROFILE_FETCH_ERROR'
    });
  }
});

// Find matching professionals for a case
app.post('/api/v1/cases/:id/find-professionals', async (req, res) => {
  try {
    const { id } = req.params;
    
    const caseData = cases.find(c => c.id === id);
    const caseProfile = caseProfiles.find(p => p.caseId === id);
    
    if (!caseData || !caseProfile) {
      return res.status(404).json({
        success: false,
        error: 'Case or case profile not found',
        code: 'CASE_NOT_FOUND'
      });
    }

    try {
      // Call professional service matching API
      const response = await axios.post(`${PROFESSIONAL_SERVICE_URL}/api/v1/matching/find-professionals`, {
        caseProfile
      });

      if (response.data.success) {
        // Update case profile with matching results
        const profileIndex = caseProfiles.findIndex(p => p.caseId === id);
        if (profileIndex >= 0) {
          caseProfiles[profileIndex].eligibleProfessionals = response.data.data.eligibleProfessionals;
          caseProfiles[profileIndex].updatedAt = new Date().toISOString();
        }

        res.json({
          success: true,
          data: {
            case: {
              id: caseData.id,
              caseNumber: caseData.caseNumber,
              diseaseType: caseData.diseaseType,
              expertiseLevel: caseData.expertiseLevel,
              urgency: caseData.urgency
            },
            profile: caseProfile,
            matching: response.data.data
          }
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Professional matching service error',
          code: 'MATCHING_SERVICE_ERROR'
        });
      }
    } catch (matchingError) {
      console.error('Professional service error:', matchingError.message);
      
      // Fallback to mock matching data
      const mockMatching = {
        eligibleProfessionals: [{
          professionalId: 'MED-2024-001',
          matchScore: 0.85,
          matchReasons: ['Primary specialty match', 'High customer satisfaction'],
          estimatedResponseTime: 48,
          professional: {
            firstName: 'Dr. John',
            lastName: 'Smith',
            specialization: [caseProfile.primarySpecialtyRequired],
            rating: 4.8,
            availableSlots: 3
          }
        }]
      };

      res.json({
        success: true,
        data: {
          case: {
            id: caseData.id,
            caseNumber: caseData.caseNumber,
            diseaseType: caseData.diseaseType,
            expertiseLevel: caseData.expertiseLevel,
            urgency: caseData.urgency
          },
          profile: caseProfile,
          matching: mockMatching
        },
        note: 'Using fallback matching data due to professional service unavailability'
      });
    }

  } catch (error) {
    console.error('[CASES] Professional matching error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'MATCHING_ERROR'
    });
  }
});

// Assign case to professional
app.post('/api/v1/cases/:id/assign', [
  body('professionalId').notEmpty().withMessage('Professional ID is required')
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
    const { professionalId } = req.body;
    
    const caseIndex = cases.findIndex(c => c.id === id);
    const profileIndex = caseProfiles.findIndex(p => p.caseId === id);
    
    if (caseIndex === -1 || profileIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Case not found',
        code: 'CASE_NOT_FOUND'
      });
    }

    // Update case status
    cases[caseIndex].status = 'assigned';
    cases[caseIndex].assignedProfessional = professionalId;
    cases[caseIndex].assignedAt = new Date().toISOString();
    cases[caseIndex].updatedAt = new Date().toISOString();

    // Update case profile
    caseProfiles[profileIndex].assignedProfessional = professionalId;
    caseProfiles[profileIndex].assignmentTimestamp = new Date().toISOString();
    caseProfiles[profileIndex].updatedAt = new Date().toISOString();

    // Create assignment record
    const assignment = {
      id: uuidv4(),
      caseId: id,
      caseNumber: cases[caseIndex].caseNumber,
      professionalId,
      assignedAt: new Date().toISOString(),
      status: 'active',
      isActive: true
    };
    caseAssignments.push(assignment);

    console.log(`[CASES] Case ${cases[caseIndex].caseNumber} assigned to ${professionalId}`);

    res.json({
      success: true,
      message: 'Case assigned successfully',
      data: {
        case: cases[caseIndex],
        assignment
      }
    });

  } catch (error) {
    console.error('[CASES] Case assignment error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'ASSIGNMENT_ERROR'
    });
  }
});

// Get cases for professional (used by professional portal)
app.get('/api/v1/cases/professional', authenticateToken, (req, res) => {
  try {
    // Find cases assigned to this professional
    const professionalId = req.user.professionalId || req.user.id;
    const assignedCases = caseAssignments
      .filter(a => a.professionalId === professionalId && a.isActive)
      .map(assignment => {
        const caseData = cases.find(c => c.id === assignment.caseId);
        const caseProfile = caseProfiles.find(p => p.caseId === assignment.caseId);
        
        return {
          ...caseData,
          profile: caseProfile,
          assignment
        };
      })
      .filter(c => c.id); // Filter out cases that might have been deleted

    res.json({
      success: true,
      data: {
        cases: assignedCases,
        total: assignedCases.length
      }
    });

  } catch (error) {
    console.error('[CASES] Professional cases fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'PROFESSIONAL_CASES_ERROR'
    });
  }
});

// Get case details
app.get('/api/v1/cases/:id', (req, res) => {
  try {
    const { id } = req.params;
    const caseData = cases.find(c => c.id === id);
    const caseProfile = caseProfiles.find(p => p.caseId === id);
    
    if (!caseData) {
      return res.status(404).json({
        success: false,
        error: 'Case not found',
        code: 'CASE_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      data: {
        case: {
          ...caseData,
          profile: caseProfile || null
        }
      }
    });

  } catch (error) {
    console.error('[CASES] Case fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'CASE_FETCH_ERROR'
    });
  }
});

// Update case profile
app.put('/api/v1/cases/:id/profile', [
  body('estimatedComplexity').optional().isIn(['ROUTINE', 'MODERATE', 'COMPLEX', 'EXCEPTIONAL']),
  body('primarySpecialtyRequired').optional().notEmpty(),
  body('diagnosticExpertiseRequired').optional().isArray()
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

    const { id } = req.params;
    const updates = req.body;
    
    const profileIndex = caseProfiles.findIndex(p => p.caseId === id);
    if (profileIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Case profile not found',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    // Update profile
    caseProfiles[profileIndex] = {
      ...caseProfiles[profileIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    console.log(`[CASES] Profile updated for case ${id}`);

    res.json({
      success: true,
      message: 'Case profile updated successfully',
      data: {
        profile: caseProfiles[profileIndex]
      }
    });

  } catch (error) {
    console.error('[CASES] Profile update error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'PROFILE_UPDATE_ERROR'
    });
  }
});

// Get all case profiles (for admin/analytics)
// Get available cases for a professional to claim
app.get('/api/v1/cases/available', authenticateToken, async (req, res) => {
  try {
    const professionalId = req.user.professionalId || req.user.id;
    
    // Get professional's specialties from professional service
    let professionalSpecialties = ['LUNG_CANCER', 'BREAST_CANCER']; // Default fallback
    try {
      const professionalResponse = await axios.get(`${process.env.PROFESSIONAL_SERVICE_URL}/api/v1/professionals/${professionalId}/profile`);
      if (professionalResponse.status === 200) {
        const profData = professionalResponse.data;
        professionalSpecialties = profData.data?.specialization || profData.data?.profile?.primarySpecialties || professionalSpecialties;
      }
    } catch (error) {
      console.warn('[CASES] Failed to fetch professional specialties, using defaults:', error.message);
    }

    // Find cases that are:
    // 1. Not assigned to any professional (active assignments)
    // 2. Match the professional's specialties
    // 3. Are in submitted status or ready for professional review
    const assignedCaseIds = caseAssignments
      .filter(a => a.isActive)
      .map(a => a.caseId);

    const availableCases = cases
      .filter(caseData => {
        // Must not be assigned
        if (assignedCaseIds.includes(caseData.id)) return false;
        
        // Must have a profile
        const profile = caseProfiles.find(p => p.caseId === caseData.id);
        if (!profile) return false;

        // Must match professional specialties
        const caseSpecialty = profile.primarySpecialtyRequired || caseData.diseaseType;
        if (!professionalSpecialties.includes(caseSpecialty)) return false;

        // Must be in appropriate status
        return ['SUBMITTED', 'PENDING_REVIEW', 'IN_REVIEW'].includes(caseData.status);
      })
      .map(caseData => {
        const profile = caseProfiles.find(p => p.caseId === caseData.id);
        return {
          ...caseData,
          profile: profile,
          estimatedCompensation: calculateCompensation(profile),
          professionalMatch: true
        };
      })
      .sort((a, b) => {
        // Sort by urgency first, then by complexity
        const urgencyOrder = { 'EMERGENCY': 3, 'URGENT': 2, 'STANDARD': 1 };
        const urgencyDiff = (urgencyOrder[b.profile?.requestedUrgency] || 1) - (urgencyOrder[a.profile?.requestedUrgency] || 1);
        if (urgencyDiff !== 0) return urgencyDiff;
        
        const complexityOrder = { 'EXCEPTIONAL': 4, 'COMPLEX': 3, 'MODERATE': 2, 'ROUTINE': 1 };
        return (complexityOrder[b.profile?.estimatedComplexity] || 1) - (complexityOrder[a.profile?.estimatedComplexity] || 1);
      });

    res.json({
      success: true,
      data: {
        cases: availableCases,
        total: availableCases.length,
        professionalSpecialties,
        filters: {
          specialties: professionalSpecialties,
          excludedAssigned: assignedCaseIds.length
        }
      }
    });

  } catch (error) {
    console.error('[CASES] Available cases fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'AVAILABLE_CASES_ERROR'
    });
  }
});

// Claim a case (assign to professional)
app.post('/api/v1/cases/:caseId/claim', authenticateToken, [
  param('caseId').isUUID().withMessage('Invalid case ID format')
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

    const { caseId } = req.params;
    const professionalId = req.user.professionalId || req.user.id;

    // Check if case exists
    const caseData = cases.find(c => c.id === caseId);
    if (!caseData) {
      return res.status(404).json({
        success: false,
        error: 'Case not found',
        code: 'CASE_NOT_FOUND'
      });
    }

    // Check if case is already assigned
    const existingAssignment = caseAssignments.find(a => a.caseId === caseId && a.isActive);
    if (existingAssignment) {
      return res.status(409).json({
        success: false,
        error: 'Case already assigned to another professional',
        code: 'CASE_ALREADY_ASSIGNED'
      });
    }

    // Create assignment
    const assignment = {
      id: `assign-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      caseId: caseId,
      professionalId: professionalId,
      assignedAt: new Date().toISOString(),
      isActive: true,
      status: 'CLAIMED',
      assignedBy: 'SELF_CLAIMED',
      expectedCompletionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
    };

    caseAssignments.push(assignment);

    // Update case status
    const caseIndex = cases.findIndex(c => c.id === caseId);
    if (caseIndex !== -1) {
      cases[caseIndex].status = 'IN_REVIEW';
      cases[caseIndex].assignedAt = assignment.assignedAt;
      cases[caseIndex].assignedProfessional = professionalId;
    }

    res.json({
      success: true,
      message: 'Case claimed successfully',
      data: {
        assignment,
        case: cases[caseIndex]
      }
    });

  } catch (error) {
    console.error('[CASES] Case claim error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'CLAIM_ERROR'
    });
  }
});

// Helper function to calculate compensation based on case complexity
function calculateCompensation(profile) {
  if (!profile) return 150; // Base compensation
  
  const baseCompensation = 150;
  const complexityMultipliers = {
    'ROUTINE': 1.0,
    'MODERATE': 1.3,
    'COMPLEX': 1.7,
    'EXCEPTIONAL': 2.2
  };
  
  const urgencyBonuses = {
    'STANDARD': 0,
    'URGENT': 50,
    'EMERGENCY': 100
  };
  
  const complexity = profile.estimatedComplexity || 'MODERATE';
  const urgency = profile.requestedUrgency || 'STANDARD';
  
  const baseAmount = baseCompensation * (complexityMultipliers[complexity] || 1.3);
  const urgencyBonus = urgencyBonuses[urgency] || 0;
  
  return Math.round(baseAmount + urgencyBonus);
}

app.get('/api/v1/cases/profiles/analytics', (req, res) => {
  try {
    const analytics = {
      totalProfiles: caseProfiles.length,
      complexityDistribution: {
        ROUTINE: caseProfiles.filter(p => p.estimatedComplexity === 'ROUTINE').length,
        MODERATE: caseProfiles.filter(p => p.estimatedComplexity === 'MODERATE').length,
        COMPLEX: caseProfiles.filter(p => p.estimatedComplexity === 'COMPLEX').length,
        EXCEPTIONAL: caseProfiles.filter(p => p.estimatedComplexity === 'EXCEPTIONAL').length
      },
      specialtyDistribution: {},
      urgencyDistribution: {
        STANDARD: caseProfiles.filter(p => p.requestedUrgency === 'STANDARD').length,
        URGENT: caseProfiles.filter(p => p.requestedUrgency === 'URGENT').length,
        EMERGENCY: caseProfiles.filter(p => p.requestedUrgency === 'EMERGENCY').length
      },
      averageComplexityScore: caseProfiles.reduce((sum, p) => sum + (p.complexityScore || 0), 0) / caseProfiles.length || 0,
      matchingSuccessRate: caseProfiles.filter(p => p.assignedProfessional).length / caseProfiles.length || 0
    };

    // Calculate specialty distribution
    caseProfiles.forEach(profile => {
      const specialty = profile.primarySpecialtyRequired;
      if (specialty) {
        analytics.specialtyDistribution[specialty] = (analytics.specialtyDistribution[specialty] || 0) + 1;
      }
    });

    res.json({
      success: true,
      data: {
        analytics,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('[CASES] Analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'ANALYTICS_ERROR'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('[CASES] Unhandled error:', error);
  
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
  console.log(`📋 Case Management Service Enhanced v2.1 running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🧬 Intelligent case profiling enabled`);
  console.log(`🎯 Professional matching integration: ${PROFESSIONAL_SERVICE_URL}`);
  console.log(`📈 Automatic complexity assessment active`);
  console.log(`🏥 Regulatory compliance tracking enabled`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Case Management Service Enhanced shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Case Management Service Enhanced shutting down gracefully');
  process.exit(0);
});