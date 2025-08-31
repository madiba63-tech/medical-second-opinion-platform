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
const PORT = process.env.PORT || 3004;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-for-development-only';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Configure multer for document uploads
const upload = multer({
  dest: 'documents/',
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB limit for medical documents
  },
  fileFilter: (req, file, cb) => {
    // Allow common document types + text for AI parsing
    const allowedTypes = [
      'application/pdf', 
      'image/jpeg', 
      'image/png', 
      'image/tiff',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain' // Allow text files for AI parsing demos
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPEG, PNG, TIFF, DOC, DOCX, and TXT files are allowed.'));
    }
  }
});

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3006'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Competency Scoring System
const calculateCompetencyScore = (candidateData) => {
  let score = 0;
  const breakdown = {};

  // Years of Oncology Practice (0-20 points)
  const years = candidateData.yearsIndependentPractice || 0;
  if (years <= 5) breakdown.experience = 5;
  else if (years <= 10) breakdown.experience = 10;
  else if (years <= 20) breakdown.experience = 15;
  else breakdown.experience = 20;
  score += breakdown.experience;

  // Board Certification (10 points) - Required for eligibility
  breakdown.boardCertification = candidateData.boardCertificationNumber ? 10 : 0;
  score += breakdown.boardCertification;

  // Subspecialty Focus (5 points)
  const subspecialties = candidateData.subspecialties;
  breakdown.subspecialty = (subspecialties && Array.isArray(subspecialties) && subspecialties.length > 0) ? 5 : 0;
  score += breakdown.subspecialty;

  // Publications (0-15 points)
  const publications = candidateData.peerReviewedPublications || 0;
  if (publications === 0) breakdown.publications = 0;
  else if (publications <= 5) breakdown.publications = 5;
  else if (publications <= 20) breakdown.publications = 10;
  else breakdown.publications = 15;
  score += breakdown.publications;

  // Clinical Trials (0-10 points)
  if (candidateData.clinicalTrialInvolvement) {
    // Check if they're PI/lead (look for keywords in details)
    const details = candidateData.clinicalTrialDetails?.toLowerCase() || '';
    breakdown.clinicalTrials = (details.includes('principal investigator') || details.includes('lead')) ? 10 : 5;
  } else {
    breakdown.clinicalTrials = 0;
  }
  score += breakdown.clinicalTrials;

  // Conference/Teaching (0-10 points)
  breakdown.conferenceTeaching = 0;
  if (candidateData.conferencepresentations) breakdown.conferenceTeaching += 5;
  if (candidateData.teachingRoles) breakdown.conferenceTeaching += 5;
  score += breakdown.conferenceTeaching;

  // Society Membership (5 points)
  const societies = candidateData.oncologySocieties;
  breakdown.societyMembership = (societies && Array.isArray(societies) && societies.length > 0) ? 5 : 0;
  score += breakdown.societyMembership;

  // Leadership Roles (0-10 points)
  const leadership = candidateData.leadershipRoles || '';
  if (leadership.toLowerCase().includes('national') || leadership.toLowerCase().includes('board')) {
    breakdown.leadership = 10;
  } else if (leadership.toLowerCase().includes('hospital') || leadership.toLowerCase().includes('lead')) {
    breakdown.leadership = 5;
  } else {
    breakdown.leadership = 0;
  }
  score += breakdown.leadership;

  // Peer-Review/Guideline Involvement (0-15 points) - Inferred from other data
  // This would need additional fields in real implementation
  breakdown.peerReview = 0;
  score += breakdown.peerReview;

  // Determine competency level
  let level;
  if (score < 40) level = 'JUNIOR';
  else if (score < 60) level = 'SENIOR';
  else if (score < 80) level = 'EXPERT';
  else level = 'DISTINGUISHED';

  return {
    totalScore: score,
    level: level,
    breakdown: breakdown
  };
};

// AI Document Parser - Extract information from uploaded documents with OCR support
const parseDocumentContent = async (filePath, documentType, originalName) => {
  try {
    console.log(`[AI-PARSER] Processing ${originalName} (${documentType})`);
    
    const fileBuffer = await fs.readFile(filePath);
    const fileExtension = path.extname(originalName).toLowerCase();
    let fileContent = '';
    
    // Handle different file types with OCR
    if (fileExtension === '.pdf') {
      console.log('[AI-PARSER] Extracting text from PDF...');
      try {
        const pdfData = await pdf(fileBuffer);
        fileContent = pdfData.text.toLowerCase();
        console.log(`[AI-PARSER] Extracted ${pdfData.text.length} characters from PDF`);
      } catch (pdfError) {
        console.error('[AI-PARSER] PDF parsing failed:', pdfError.message);
        throw new Error('Failed to extract text from PDF document');
      }
    } else if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'].includes(fileExtension)) {
      console.log('[AI-PARSER] Performing OCR on image...');
      try {
        // Convert image to optimal format for OCR
        const processedBuffer = await sharp(fileBuffer)
          .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
          .greyscale()
          .normalize()
          .png()
          .toBuffer();
        
        // Perform OCR
        const { data: { text } } = await Tesseract.recognize(processedBuffer, 'eng', {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              console.log(`[AI-PARSER] OCR Progress: ${Math.round(m.progress * 100)}%`);
            }
          }
        });
        
        fileContent = text.toLowerCase();
        console.log(`[AI-PARSER] OCR extracted ${text.length} characters from image`);
      } catch (ocrError) {
        console.error('[AI-PARSER] OCR failed:', ocrError.message);
        throw new Error('Failed to extract text from image document');
      }
    } else {
      // Handle text files (existing functionality)
      try {
        fileContent = fileBuffer.toString('utf8').toLowerCase();
      } catch (textError) {
        console.error('[AI-PARSER] Text extraction failed:', textError.message);
        throw new Error('Failed to read document content');
      }
    }
    
    let extractedData = {};

    // Parse based on document type
    switch (documentType) {
      case 'CV':
        extractedData = await parseCVDocument(fileContent, originalName);
        break;
      case 'MEDICAL_DEGREE':
        extractedData = await parseMedicalDegree(fileContent);
        break;
      case 'LICENSE_CERTIFICATE':
        extractedData = await parseLicenseCertificate(fileContent);
        break;
      case 'BOARD_CERTIFICATION':
        extractedData = await parseBoardCertification(fileContent);
        break;
      default:
        extractedData = await parseGenericDocument(fileContent, documentType);
    }

    return extractedData;
  } catch (error) {
    console.error(`[AI-PARSER] Error parsing ${documentType}:`, error.message);
    return null;
  }
};

// CV Parser - Extract comprehensive professional information
const parseCVDocument = async (content, fileName) => {
  const extractedData = {
    confidence: 0.85,
    extractedFields: {},
    rawText: content.substring(0, 500) // First 500 chars for verification
  };

  try {
    // Extract name (look for common patterns)
    const namePatterns = [
      /(?:dr\.?\s+)?([a-z]+\s+[a-z]+(?:\s+[a-z]+)?)\s*,?\s*m\.?d\.?/i,
      /^([a-z]+\s+[a-z]+(?:\s+[a-z]+)?)\s*curriculum/i,
      /name[:\s]+([a-z]+\s+[a-z]+(?:\s+[a-z]+)?)/i
    ];
    
    for (const pattern of namePatterns) {
      const nameMatch = content.match(pattern);
      if (nameMatch && nameMatch[1]) {
        const nameParts = nameMatch[1].trim().split(/\s+/);
        extractedData.extractedFields.firstName = nameParts[0] || '';
        extractedData.extractedFields.lastName = nameParts[nameParts.length - 1] || '';
        if (nameParts.length > 2) {
          extractedData.extractedFields.middleName = nameParts[1];
        }
        break;
      }
    }

    // Extract email
    const emailMatch = content.match(/([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/i);
    if (emailMatch) {
      extractedData.extractedFields.email = emailMatch[1];
    }

    // Extract phone
    const phoneMatch = content.match(/(\+?[\d\s\-\(\)]{10,})/);
    if (phoneMatch) {
      extractedData.extractedFields.phone = phoneMatch[1].replace(/[^\d+]/g, '');
    }

    // Extract current affiliation
    const affiliationPatterns = [
      /(?:current|present).*?(?:position|affiliation)[:\s]+([^\n]+)/i,
      /(harvard|mayo|cleveland|johns hopkins|memorial sloan|dana-farber|md anderson|stanford|ucsf)[\s\w\-]*(?:medical|hospital|cancer|center)/i,
      /(?:professor|attending|chief|director).*?at\s+([^\n,]+)/i
    ];
    
    for (const pattern of affiliationPatterns) {
      const affiliationMatch = content.match(pattern);
      if (affiliationMatch && affiliationMatch[1]) {
        extractedData.extractedFields.currentAffiliation = affiliationMatch[1].trim();
        break;
      }
    }

    // Extract years of experience
    const experiencePatterns = [
      /(\d{1,2})\+?\s*years?\s*(?:of\s*)?(?:experience|practice)/gi,
      /experience[:\s]*(\d{1,2})\+?\s*years?/gi,
      /(19|20)\d{2}\s*[-–—]\s*(?:present|current|\d{4})/g
    ];
    
    let maxYears = 0;
    for (const pattern of experiencePatterns) {
      const matches = content.matchAll(pattern);
      for (const match of matches) {
        if (match[1] && !isNaN(match[1])) {
          const years = parseInt(match[1]);
          if (years > maxYears && years < 50) { // Reasonable bounds
            maxYears = years;
          }
        }
      }
    }
    if (maxYears > 0) {
      extractedData.extractedFields.yearsIndependentPractice = maxYears;
    }

    // Extract publications count
    const publicationPatterns = [
      /(\d+)\+?\s*(?:peer.?reviewed\s*)?publications?/i,
      /publications?[:\s]*(\d+)/i,
      /authored\s*(\d+)\s*(?:papers?|articles?)/i
    ];
    
    for (const pattern of publicationPatterns) {
      const pubMatch = content.match(pattern);
      if (pubMatch && pubMatch[1] && !isNaN(pubMatch[1])) {
        extractedData.extractedFields.peerReviewedPublications = parseInt(pubMatch[1]);
        break;
      }
    }

    // Extract subspecialties
    const subspecialtyKeywords = [
      'breast cancer', 'lung cancer', 'colorectal', 'pancreatic', 'prostate',
      'gynecologic', 'hematologic', 'lymphoma', 'leukemia', 'myeloma',
      'pediatric oncology', 'radiation oncology', 'surgical oncology',
      'immunotherapy', 'precision medicine', 'clinical trials'
    ];
    
    const foundSubspecialties = subspecialtyKeywords.filter(keyword => 
      content.includes(keyword.toLowerCase())
    );
    
    if (foundSubspecialties.length > 0) {
      extractedData.extractedFields.subspecialties = foundSubspecialties.slice(0, 5); // Max 5
    }

    // Extract society memberships
    const societyKeywords = ['asco', 'esmo', 'aacr', 'ons', 'nccn', 'cap', 'ascp'];
    const foundSocieties = societyKeywords.filter(society => 
      content.includes(society.toLowerCase())
    );
    
    if (foundSocieties.length > 0) {
      extractedData.extractedFields.oncologySocieties = foundSocieties.map(s => s.toUpperCase());
    }

    // Check for clinical trial involvement
    if (content.includes('clinical trial') || content.includes('principal investigator') || content.includes('co-investigator')) {
      extractedData.extractedFields.clinicalTrialInvolvement = true;
      
      // Extract details
      const trialMatch = content.match(/(?:principal investigator|pi|co-investigator).*?(?:trial|study).*?(?:[.\n]|$)/i);
      if (trialMatch) {
        extractedData.extractedFields.clinicalTrialDetails = trialMatch[0].trim();
      }
    }

    // Check for teaching roles
    if (content.includes('professor') || content.includes('instructor') || content.includes('faculty')) {
      extractedData.extractedFields.teachingRoles = true;
      
      const teachingMatch = content.match(/(professor|associate professor|assistant professor|instructor).*?(?:[,.\n]|$)/i);
      if (teachingMatch) {
        extractedData.extractedFields.teachingDetails = teachingMatch[0].trim();
      }
    }

    // Check for conference presentations
    if (content.includes('speaker') || content.includes('presentation') || content.includes('lecture')) {
      extractedData.extractedFields.conferencepresentations = true;
      
      const confMatch = content.match(/(keynote|invited|speaker).*?(?:conference|symposium|meeting).*?(?:[,.\n]|$)/i);
      if (confMatch) {
        extractedData.extractedFields.conferenceDetails = confMatch[0].trim();
      }
    }

    // Extract leadership roles
    const leadershipKeywords = ['chair', 'director', 'chief', 'head', 'leader', 'board member', 'committee'];
    const leadershipMentions = [];
    
    for (const keyword of leadershipKeywords) {
      const regex = new RegExp(`(${keyword}[^.\n]{0,50})`, 'gi');
      const matches = content.matchAll(regex);
      for (const match of matches) {
        leadershipMentions.push(match[1].trim());
      }
    }
    
    if (leadershipMentions.length > 0) {
      extractedData.extractedFields.leadershipRoles = leadershipMentions.slice(0, 3).join('; ');
    }

    return extractedData;
  } catch (error) {
    console.error('[AI-PARSER] CV parsing error:', error);
    return extractedData;
  }
};

// Medical Degree Parser
const parseMedicalDegree = async (content) => {
  return {
    confidence: 0.7,
    extractedFields: {
      // Extract graduation year, institution, etc.
      medicalDegreeVerified: true
    },
    rawText: content.substring(0, 200)
  };
};

// License Certificate Parser
const parseLicenseCertificate = async (content) => {
  const extractedData = {
    confidence: 0.8,
    extractedFields: {},
    rawText: content.substring(0, 200)
  };

  // Extract license number
  const licenseMatch = content.match(/(?:license|registration)\s*(?:number|no\.?|#)[:\s]*([a-z0-9\-]+)/i);
  if (licenseMatch) {
    extractedData.extractedFields.medicalLicenseNumber = licenseMatch[1];
  }

  // Extract expiration date
  const expiryMatch = content.match(/(?:expir|valid|renew).*?(\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{1,2}-\d{1,2})/i);
  if (expiryMatch) {
    extractedData.extractedFields.licenseExpiry = expiryMatch[1];
  }

  return extractedData;
};

// Board Certification Parser
const parseBoardCertification = async (content) => {
  const extractedData = {
    confidence: 0.75,
    extractedFields: {},
    rawText: content.substring(0, 200)
  };

  // Extract certification number
  const certMatch = content.match(/(?:certificate|certification|board)\s*(?:number|no\.?|#)[:\s]*([a-z0-9\-]+)/i);
  if (certMatch) {
    extractedData.extractedFields.boardCertificationNumber = certMatch[1];
  }

  return extractedData;
};

// Generic document parser
const parseGenericDocument = async (content, documentType) => {
  return {
    confidence: 0.5,
    extractedFields: {
      [`${documentType.toLowerCase()}Uploaded`]: true
    },
    rawText: content.substring(0, 200)
  };
};

// Authentication middleware for admin functions
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Admin access token required',
      code: 'ADMIN_TOKEN_REQUIRED'
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
    
    // Check if user is admin
    try {
      const admin = await prisma.admin.findUnique({
        where: { id: decoded.userId }
      });
      
      if (!admin) {
        return res.status(403).json({
          success: false,
          error: 'Admin access required',
          code: 'ADMIN_ACCESS_REQUIRED'
        });
      }
      
      req.admin = decoded;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Admin verification failed',
        code: 'ADMIN_VERIFICATION_ERROR'
      });
    }
  });
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'professional-recruitment-service',
    version: '1.0.0',
    features: ['candidate-onboarding', 'document-upload', 'competency-scoring', 'admin-review'],
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Service info endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Professional Recruitment Service',
    version: '1.0.0',
    description: 'Medical professional candidate onboarding, vetting, and competency assessment',
    endpoints: {
      health: '/health',
      submitApplication: 'POST /api/v1/candidates/apply',
      uploadDocuments: 'POST /api/v1/candidates/{id}/documents',
      getCandidates: 'GET /api/v1/admin/candidates',
      reviewApplication: 'POST /api/v1/admin/candidates/{id}/review'
    },
    onboardingSteps: [
      'Identity & Contact Info',
      'Education & Training', 
      'Licensing',
      'Professional Experience',
      'Research & Academic Contributions',
      'Professional Recognition',
      'Good Standing & Compliance',
      'Competency Assessment'
    ],
    competencyLevels: {
      'JUNIOR': '< 40 points',
      'SENIOR': '40-59 points', 
      'EXPERT': '60-79 points',
      'DISTINGUISHED': '80+ points'
    },
    status: 'operational',
    timestamp: new Date().toISOString()
  });
});

// Submit complete application (8-step wizard in one call)
app.post('/api/v1/candidates/apply', [
  // Step 1: Identity & Contact Info
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('dateOfBirth').isISO8601().withMessage('Valid date of birth is required'),
  body('nationality').notEmpty().withMessage('Nationality is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  
  // Step 3: Licensing
  body('medicalLicenseNumber').notEmpty().withMessage('Medical license number is required'),
  body('licenseCountry').notEmpty().withMessage('License country is required'),
  body('licenseExpiry').isISO8601().withMessage('Valid license expiry date is required'),
  
  // Step 4: Professional Experience
  body('yearsIndependentPractice').isInt({ min: 0 }).withMessage('Years of practice must be a positive number'),
  body('currentAffiliation').notEmpty().withMessage('Current affiliation is required'),
  
  // Step 7: Compliance
  body('noActiveDisciplinary').isBoolean().withMessage('Disciplinary declaration is required'),
  body('dataProtectionAgreed').equals('true').withMessage('Data protection agreement must be accepted')
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

    const candidateData = req.body;

    // Check if candidate already exists
    const existingCandidate = await prisma.professionalCandidate.findUnique({
      where: { email: candidateData.email }
    });

    if (existingCandidate) {
      return res.status(409).json({
        success: false,
        error: 'Application with this email already exists',
        code: 'CANDIDATE_EXISTS'
      });
    }

    // Calculate competency score
    const competencyResult = calculateCompetencyScore(candidateData);

    // Create candidate record
    const candidate = await prisma.professionalCandidate.create({
      data: {
        // Step 1: Identity & Contact Info
        firstName: candidateData.firstName,
        middleName: candidateData.middleName || null,
        lastName: candidateData.lastName,
        dateOfBirth: new Date(candidateData.dateOfBirth),
        nationality: candidateData.nationality,
        email: candidateData.email,
        phone: candidateData.phone || null,
        
        // Step 2: Education & Training
        boardCertificationNumber: candidateData.boardCertificationNumber || null,
        
        // Step 3: Licensing
        medicalLicenseNumber: candidateData.medicalLicenseNumber,
        licenseCountry: candidateData.licenseCountry,
        licenseState: candidateData.licenseState || null,
        licenseExpiry: new Date(candidateData.licenseExpiry),
        
        // Step 4: Professional Experience
        yearsIndependentPractice: candidateData.yearsIndependentPractice,
        currentAffiliation: candidateData.currentAffiliation,
        subspecialties: candidateData.subspecialties || null,
        annualPatientLoad: candidateData.annualPatientLoad || null,
        secondOpinionsGiven: candidateData.secondOpinionsGiven || null,
        
        // Step 5: Research & Academic
        peerReviewedPublications: candidateData.peerReviewedPublications || 0,
        clinicalTrialInvolvement: candidateData.clinicalTrialInvolvement || false,
        clinicalTrialDetails: candidateData.clinicalTrialDetails || null,
        conferencepresentations: candidateData.conferencepresentations || false,
        conferenceDetails: candidateData.conferenceDetails || null,
        teachingRoles: candidateData.teachingRoles || false,
        teachingDetails: candidateData.teachingDetails || null,
        
        // Step 6: Professional Recognition
        oncologySocieties: candidateData.oncologySocieties || null,
        awardsHonors: candidateData.awardsHonors || null,
        leadershipRoles: candidateData.leadershipRoles || null,
        
        // Step 7: Good Standing & Compliance
        professionalReferences: candidateData.professionalReferences || null,
        noActiveDisciplinary: candidateData.noActiveDisciplinary,
        dataProtectionAgreed: candidateData.dataProtectionAgreed,
        
        // Step 8: Competency Assessment
        competencyScore: competencyResult.totalScore,
        competencyLevel: competencyResult.level,
        scoreBreakdown: competencyResult.breakdown,
        
        submittedAt: new Date()
      }
    });

    console.log(`[RECRUITMENT] New candidate application: ${candidate.email} (Score: ${competencyResult.totalScore}, Level: ${competencyResult.level})`);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        candidateId: candidate.id,
        competencyAssessment: {
          score: competencyResult.totalScore,
          level: competencyResult.level,
          breakdown: competencyResult.breakdown
        },
        nextSteps: 'Your application is under review. You will be contacted if additional documents are required.'
      }
    });

  } catch (error) {
    console.error('[RECRUITMENT] Application submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during application submission',
      code: 'APPLICATION_SUBMISSION_ERROR'
    });
  }
});

// Upload documents for a candidate
app.post('/api/v1/candidates/:id/documents', upload.any(), [
  param('id').isUUID().withMessage('Valid candidate ID is required')
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

    const candidateId = req.params.id;
    const uploadedFiles = req.files || [];

    if (uploadedFiles.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No documents provided',
        code: 'NO_DOCUMENTS'
      });
    }

    // Check if candidate exists
    const candidate = await prisma.professionalCandidate.findUnique({
      where: { id: candidateId }
    });

    if (!candidate) {
      return res.status(404).json({
        success: false,
        error: 'Candidate not found',
        code: 'CANDIDATE_NOT_FOUND'
      });
    }

    // Process each uploaded file
    const documents = [];
    for (const file of uploadedFiles) {
      // Determine document type from fieldname or filename
      let documentType = 'ADDITIONAL_DIPLOMA'; // Default
      
      if (file.fieldname && file.fieldname.includes('_')) {
        const typeMap = {
          'government_id': 'GOVERNMENT_ID',
          'medical_degree': 'MEDICAL_DEGREE',
          'residency_certificate': 'RESIDENCY_CERTIFICATE',
          'fellowship_certificate': 'FELLOWSHIP_CERTIFICATE',
          'board_certification': 'BOARD_CERTIFICATION',
          'license_certificate': 'LICENSE_CERTIFICATE',
          'good_standing': 'GOOD_STANDING_CERTIFICATE',
          'cv': 'CV',
          'publication_1': 'PUBLICATION_1',
          'publication_2': 'PUBLICATION_2',
          'publication_3': 'PUBLICATION_3',
          'malpractice_insurance': 'MALPRACTICE_INSURANCE'
        };
        documentType = typeMap[file.fieldname] || 'ADDITIONAL_DIPLOMA';
      }

      // Generate unique filename
      const fileExtension = file.originalname.split('.').pop();
      const uniqueFilename = `${candidateId}_${documentType}_${Date.now()}.${fileExtension}`;

      // In a real implementation, upload to S3. For now, use local path
      const s3Key = `documents/${uniqueFilename}`;

      // Parse document content with AI
      let aiParsingResult = null;
      try {
        aiParsingResult = await parseDocumentContent(file.path, documentType, file.originalname);
      } catch (parseError) {
        console.log(`[AI-PARSER] Failed to parse ${documentType}: ${parseError.message}`);
      }

      // Create document record
      const document = await prisma.candidateDocument.create({
        data: {
          candidateId: candidateId,
          documentType: documentType,
          fileName: uniqueFilename,
          originalName: file.originalname,
          s3Key: s3Key,
          mimetype: file.mimetype,
          size: file.size,
          checksum: null, // Would calculate in production
          encrypted: true
        }
      });

      documents.push({
        id: document.id,
        documentType: document.documentType,
        fileName: document.fileName,
        originalName: document.originalName,
        size: document.size,
        uploadedAt: document.uploadedAt,
        aiParsingResult: aiParsingResult // Include AI parsing results
      });
    }

    console.log(`[RECRUITMENT] ${documents.length} documents uploaded for candidate ${candidateId}`);

    res.status(201).json({
      success: true,
      message: 'Documents uploaded successfully',
      data: {
        candidateId: candidateId,
        documents: documents,
        totalUploaded: documents.length
      }
    });

  } catch (error) {
    console.error('[RECRUITMENT] Document upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during document upload',
      code: 'DOCUMENT_UPLOAD_ERROR'
    });
  }
});

// AI-powered application pre-population
app.post('/api/v1/candidates/ai-prepopulate', upload.any(), [
  body('email').isEmail().withMessage('Valid email address is required for identification')
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

    const uploadedFiles = req.files || [];
    const { email } = req.body;

    if (uploadedFiles.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No documents provided for AI analysis',
        code: 'NO_DOCUMENTS'
      });
    }

    console.log(`[AI-PREPOPULATE] Starting AI analysis for ${email} with ${uploadedFiles.length} documents`);

    // Process all uploaded files with AI
    const aiResults = [];
    let mergedApplicationData = {
      email: email, // Provided by user
      extractionResults: []
    };

    for (const file of uploadedFiles) {
      // Determine document type from fieldname
      let documentType = 'CV'; // Default to CV for pre-population
      if (file.fieldname) {
        const typeMap = {
          'government_id': 'GOVERNMENT_ID',
          'medical_degree': 'MEDICAL_DEGREE',
          'residency_certificate': 'RESIDENCY_CERTIFICATE',
          'fellowship_certificate': 'FELLOWSHIP_CERTIFICATE',
          'board_certification': 'BOARD_CERTIFICATION',
          'license_certificate': 'LICENSE_CERTIFICATE',
          'good_standing': 'GOOD_STANDING_CERTIFICATE',
          'cv': 'CV',
          'malpractice_insurance': 'MALPRACTICE_INSURANCE'
        };
        documentType = typeMap[file.fieldname] || 'CV';
      }

      // Parse document with AI
      try {
        const aiResult = await parseDocumentContent(file.path, documentType, file.originalname);
        if (aiResult && aiResult.extractedFields) {
          aiResults.push({
            documentType: documentType,
            fileName: file.originalname,
            confidence: aiResult.confidence,
            extractedFields: aiResult.extractedFields,
            rawTextPreview: aiResult.rawText
          });

          // Merge extracted fields into application data
          Object.assign(mergedApplicationData, aiResult.extractedFields);
        }
      } catch (parseError) {
        console.error(`[AI-PREPOPULATE] Error parsing ${documentType}:`, parseError.message);
        aiResults.push({
          documentType: documentType,
          fileName: file.originalname,
          error: parseError.message,
          confidence: 0
        });
      }
    }

    // Clean up temporary files
    for (const file of uploadedFiles) {
      try {
        await fs.unlink(file.path);
      } catch (unlinkError) {
        console.log(`[AI-PREPOPULATE] Could not delete temp file: ${file.path}`);
      }
    }

    // Calculate overall confidence score
    const validResults = aiResults.filter(r => r.confidence > 0);
    const avgConfidence = validResults.length > 0 
      ? validResults.reduce((sum, r) => sum + r.confidence, 0) / validResults.length 
      : 0;

    // Generate preliminary competency score if enough data is available
    let preliminaryAssessment = null;
    if (mergedApplicationData.yearsIndependentPractice || mergedApplicationData.peerReviewedPublications) {
      try {
        preliminaryAssessment = calculateCompetencyScore(mergedApplicationData);
      } catch (scoreError) {
        console.log('[AI-PREPOPULATE] Could not calculate preliminary score:', scoreError.message);
      }
    }

    // Structure response for frontend consumption
    const prepopulatedApplication = {
      // Step 1: Identity & Contact Info
      firstName: mergedApplicationData.firstName || '',
      middleName: mergedApplicationData.middleName || '',
      lastName: mergedApplicationData.lastName || '',
      email: email,
      phone: mergedApplicationData.phone || '',
      
      // Step 3: Licensing (if detected)
      medicalLicenseNumber: mergedApplicationData.medicalLicenseNumber || '',
      licenseExpiry: mergedApplicationData.licenseExpiry || '',
      
      // Step 4: Professional Experience
      yearsIndependentPractice: mergedApplicationData.yearsIndependentPractice || null,
      currentAffiliation: mergedApplicationData.currentAffiliation || '',
      subspecialties: mergedApplicationData.subspecialties || [],
      
      // Step 5: Research & Academic
      peerReviewedPublications: mergedApplicationData.peerReviewedPublications || 0,
      clinicalTrialInvolvement: mergedApplicationData.clinicalTrialInvolvement || false,
      clinicalTrialDetails: mergedApplicationData.clinicalTrialDetails || '',
      conferencepresentations: mergedApplicationData.conferencepresentations || false,
      conferenceDetails: mergedApplicationData.conferenceDetails || '',
      teachingRoles: mergedApplicationData.teachingRoles || false,
      teachingDetails: mergedApplicationData.teachingDetails || '',
      
      // Step 6: Professional Recognition
      oncologySocieties: mergedApplicationData.oncologySocieties || [],
      leadershipRoles: mergedApplicationData.leadershipRoles || '',
      
      // Step 2: Education & Training
      boardCertificationNumber: mergedApplicationData.boardCertificationNumber || ''
    };

    console.log(`[AI-PREPOPULATE] Completed AI analysis for ${email} - Confidence: ${Math.round(avgConfidence * 100)}%`);

    res.status(200).json({
      success: true,
      message: 'AI document analysis completed',
      data: {
        prepopulatedApplication,
        aiAnalysis: {
          documentsProcessed: uploadedFiles.length,
          successfulExtractions: validResults.length,
          overallConfidence: Math.round(avgConfidence * 100),
          extractionResults: aiResults,
          preliminaryAssessment
        },
        instructions: {
          message: 'Review and modify the pre-populated fields before submitting your application.',
          nextStep: 'Submit the reviewed application to POST /api/v1/candidates/apply'
        }
      }
    });

  } catch (error) {
    console.error('[AI-PREPOPULATE] Application pre-population error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during AI document analysis',
      code: 'AI_PREPOPULATE_ERROR'
    });
  }
});

// Get documents for a candidate
app.get('/api/v1/candidates/:id/documents', [
  param('id').isUUID().withMessage('Valid candidate ID is required')
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

    const candidateId = req.params.id;

    // Check if candidate exists
    const candidate = await prisma.professionalCandidate.findUnique({
      where: { id: candidateId },
      include: {
        documents: {
          orderBy: { uploadedAt: 'desc' }
        }
      }
    });

    if (!candidate) {
      return res.status(404).json({
        success: false,
        error: 'Candidate not found',
        code: 'CANDIDATE_NOT_FOUND'
      });
    }

    const documentSummary = candidate.documents.map(doc => ({
      id: doc.id,
      documentType: doc.documentType,
      fileName: doc.fileName,
      originalName: doc.originalName,
      size: doc.size,
      mimetype: doc.mimetype,
      uploadedAt: doc.uploadedAt
    }));

    // Calculate document completion status
    const requiredDocuments = [
      'GOVERNMENT_ID', 'MEDICAL_DEGREE', 'RESIDENCY_CERTIFICATE', 
      'FELLOWSHIP_CERTIFICATE', 'BOARD_CERTIFICATION', 'LICENSE_CERTIFICATE',
      'GOOD_STANDING_CERTIFICATE', 'CV'
    ];

    const uploadedTypes = candidate.documents.map(doc => doc.documentType);
    const missingDocuments = requiredDocuments.filter(type => !uploadedTypes.includes(type));

    res.json({
      success: true,
      data: {
        candidateId: candidateId,
        documents: documentSummary,
        totalDocuments: documentSummary.length,
        documentCompletion: {
          required: requiredDocuments.length,
          uploaded: requiredDocuments.filter(type => uploadedTypes.includes(type)).length,
          missing: missingDocuments,
          completionPercentage: Math.round((requiredDocuments.filter(type => uploadedTypes.includes(type)).length / requiredDocuments.length) * 100)
        }
      }
    });

  } catch (error) {
    console.error('[RECRUITMENT] Document retrieval error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during document retrieval',
      code: 'DOCUMENT_RETRIEVAL_ERROR'
    });
  }
});

// Download/view document (for admin review)
app.get('/api/v1/candidates/:id/documents/:documentId/view', authenticateAdmin, [
  param('id').isUUID().withMessage('Valid candidate ID is required'),
  param('documentId').isUUID().withMessage('Valid document ID is required')
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

    const { id: candidateId, documentId } = req.params;

    // Find document
    const document = await prisma.candidateDocument.findFirst({
      where: {
        id: documentId,
        candidateId: candidateId
      }
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        error: 'Document not found',
        code: 'DOCUMENT_NOT_FOUND'
      });
    }

    // In a real implementation, this would stream from S3
    // For now, return document metadata with download URL
    res.json({
      success: true,
      data: {
        document: {
          id: document.id,
          documentType: document.documentType,
          fileName: document.fileName,
          originalName: document.originalName,
          size: document.size,
          mimetype: document.mimetype,
          uploadedAt: document.uploadedAt
        },
        downloadUrl: `/api/v1/candidates/${candidateId}/documents/${documentId}/download`,
        previewAvailable: ['application/pdf', 'image/jpeg', 'image/png'].includes(document.mimetype)
      }
    });

  } catch (error) {
    console.error('[RECRUITMENT] Document view error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during document viewing',
      code: 'DOCUMENT_VIEW_ERROR'
    });
  }
});

// Get all candidates (Admin endpoint)
app.get('/api/v1/admin/candidates', authenticateAdmin, async (req, res) => {
  try {
    const { status, level, page = 1, limit = 20 } = req.query;

    // Build where clause for filtering
    const whereClause = {};
    if (status) whereClause.applicationStatus = status;
    if (level) whereClause.competencyLevel = level;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const [candidates, totalCount] = await Promise.all([
      prisma.professionalCandidate.findMany({
        where: whereClause,
        include: {
          documents: {
            select: {
              documentType: true,
              uploadedAt: true
            }
          },
          reviews: {
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: {
              decision: true,
              notes: true,
              createdAt: true
            }
          }
        },
        skip,
        take,
        orderBy: { submittedAt: 'desc' }
      }),
      prisma.professionalCandidate.count({
        where: whereClause
      })
    ]);

    const candidateSummaries = candidates.map(candidate => ({
      id: candidate.id,
      name: `${candidate.firstName} ${candidate.lastName}`,
      email: candidate.email,
      nationality: candidate.nationality,
      yearsExperience: candidate.yearsIndependentPractice,
      currentAffiliation: candidate.currentAffiliation,
      competencyScore: candidate.competencyScore,
      competencyLevel: candidate.competencyLevel,
      applicationStatus: candidate.applicationStatus,
      submittedAt: candidate.submittedAt,
      documentsUploaded: candidate.documents.length,
      lastReview: candidate.reviews[0] || null,
      createdAt: candidate.createdAt
    }));

    res.json({
      success: true,
      data: {
        candidates: candidateSummaries,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount,
          totalPages: Math.ceil(totalCount / parseInt(limit))
        },
        filters: {
          status,
          level
        }
      }
    });

  } catch (error) {
    console.error('[RECRUITMENT] Admin candidates list error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'ADMIN_CANDIDATES_ERROR'
    });
  }
});

// Create admin (temporary endpoint for testing)
app.post('/api/v1/admin/create', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
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

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email }
    });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        error: 'Admin with this email already exists',
        code: 'ADMIN_EXISTS'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        email,
        hashedPassword,
        role: 'admin',
        permissions: { canReviewCandidates: true }
      }
    });

    // Generate token
    const token = jwt.sign(
      { 
        userId: admin.id, 
        email: admin.email,
        role: admin.role,
        type: 'admin'
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    console.log(`[RECRUITMENT] Admin created: ${email}`);

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: {
        admin: {
          id: admin.id,
          email: admin.email,
          role: admin.role
        },
        token
      }
    });

  } catch (error) {
    console.error('[RECRUITMENT] Admin creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during admin creation',
      code: 'ADMIN_CREATION_ERROR'
    });
  }
});

// Review candidate application (Admin endpoint)
app.post('/api/v1/admin/candidates/:id/review', authenticateAdmin, [
  param('id').isUUID().withMessage('Valid candidate ID is required'),
  body('decision').isIn(['APPROVE', 'REJECT', 'REQUEST_MORE_INFO']).withMessage('Valid decision is required'),
  body('notes').optional().isString()
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

    const candidateId = req.params.id;
    const { decision, notes, scoreAdjustment, recommendedLevel } = req.body;
    const adminId = req.admin.userId;

    // Check if candidate exists
    const candidate = await prisma.professionalCandidate.findUnique({
      where: { id: candidateId }
    });

    if (!candidate) {
      return res.status(404).json({
        success: false,
        error: 'Candidate not found',
        code: 'CANDIDATE_NOT_FOUND'
      });
    }

    // Create review record
    const review = await prisma.applicationReview.create({
      data: {
        candidateId,
        reviewerId: adminId,
        decision,
        notes: notes || null,
        scoreAdjustment: scoreAdjustment || null,
        recommendedLevel: recommendedLevel || null
      }
    });

    // Update candidate status based on decision
    let newStatus = candidate.applicationStatus;
    if (decision === 'APPROVE') {
      newStatus = 'APPROVED';
    } else if (decision === 'REJECT') {
      newStatus = 'REJECTED';
    } else if (decision === 'REQUEST_MORE_INFO') {
      newStatus = 'ADDITIONAL_INFO_REQUIRED';
    }

    const updatedCandidate = await prisma.professionalCandidate.update({
      where: { id: candidateId },
      data: {
        applicationStatus: newStatus,
        reviewedAt: new Date(),
        reviewedBy: adminId,
        reviewNotes: notes || null
      }
    });

    console.log(`[RECRUITMENT] Candidate ${candidateId} reviewed: ${decision} by admin ${adminId}`);

    res.json({
      success: true,
      message: `Candidate ${decision.toLowerCase()} successfully`,
      data: {
        candidateId,
        decision,
        newStatus,
        reviewId: review.id,
        reviewedAt: updatedCandidate.reviewedAt
      }
    });

  } catch (error) {
    console.error('[RECRUITMENT] Candidate review error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during candidate review',
      code: 'CANDIDATE_REVIEW_ERROR'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('[RECRUITMENT] Unhandled error:', error);
  
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
  console.log(`🎯 Professional Recruitment Service v1.0 running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📋 Candidate onboarding: POST /api/v1/candidates/apply`);
  console.log(`🔍 8-step wizard with competency scoring enabled`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Professional Recruitment Service shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Professional Recruitment Service shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});