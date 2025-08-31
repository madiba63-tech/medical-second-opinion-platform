const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { body, param, query, validationResult } = require('express-validator');
const winston = require('winston');
const axios = require('axios');
const { PrismaClient } = require('../../src/generated/prisma');

// Initialize services
const app = express();
const PORT = process.env.PORT || 3006;
const JWT_SECRET = process.env.JWT_SECRET || 'second-opinion-jwt-secret-2025';
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public';
const AI_ANALYSIS_SERVICE_URL = process.env.AI_ANALYSIS_SERVICE_URL || 'http://localhost:3003';

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

// Optional authentication middleware
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      logger.warn('Optional auth token invalid:', error.message);
    }
  }
  next();
};

// Questionnaire Templates
const FAST_TRACK_QUESTIONS = [
  {
    id: 'primary_concern',
    type: 'textarea',
    question: 'What is your main health concern or reason for seeking a second opinion?',
    required: true,
    placeholder: 'Please describe your primary medical concern...',
    maxLength: 1000
  },
  {
    id: 'current_diagnosis',
    type: 'textarea',
    question: 'What diagnosis or medical condition have you been given by your doctor?',
    required: true,
    placeholder: 'Please share any diagnoses you have received...',
    maxLength: 500
  },
  {
    id: 'current_symptoms',
    type: 'checkbox_multiple',
    question: 'Which symptoms are you currently experiencing?',
    required: false,
    options: [
      'Pain or discomfort',
      'Fatigue or weakness',
      'Shortness of breath',
      'Nausea or vomiting',
      'Changes in appetite',
      'Sleep difficulties',
      'Anxiety or depression',
      'Other symptoms'
    ],
    allowOther: true
  },
  {
    id: 'treatment_history',
    type: 'textarea',
    question: 'What treatments have you tried so far?',
    required: true,
    placeholder: 'Include medications, procedures, therapies, etc.',
    maxLength: 800
  },
  {
    id: 'urgency_level',
    type: 'radio',
    question: 'How urgent is your need for a second opinion?',
    required: true,
    options: [
      { value: 'routine', label: 'Routine - I can wait 7-14 days' },
      { value: 'moderate', label: 'Moderate - I would like a response within 3-7 days' },
      { value: 'urgent', label: 'Urgent - I need a response within 1-3 days' },
      { value: 'emergency', label: 'Emergency - I need immediate attention' }
    ]
  },
  {
    id: 'specific_questions',
    type: 'textarea',
    question: 'Do you have any specific questions for the medical professional?',
    required: false,
    placeholder: 'Any particular aspects you would like the specialist to focus on?',
    maxLength: 600
  },
  {
    id: 'preferred_language',
    type: 'select',
    question: 'In which language would you prefer to receive your medical opinion?',
    required: true,
    options: [
      { value: 'english', label: 'English' },
      { value: 'german', label: 'German' },
      { value: 'spanish', label: 'Spanish' },
      { value: 'french', label: 'French' }
    ]
  }
];

const COMPREHENSIVE_ONCOLOGY_QUESTIONS = [
  // Section 1: Primary Concern & Diagnosis
  {
    section: 'Primary Concern & Diagnosis',
    questions: [
      {
        id: 'primary_concern',
        type: 'textarea',
        question: 'What is your main oncological concern or reason for seeking a second opinion?',
        required: true,
        placeholder: 'Please describe your primary cancer-related concern...',
        maxLength: 1200
      },
      {
        id: 'cancer_type',
        type: 'select',
        question: 'What type of cancer have you been diagnosed with?',
        required: true,
        options: [
          { value: 'breast', label: 'Breast Cancer' },
          { value: 'lung', label: 'Lung Cancer' },
          { value: 'colorectal', label: 'Colorectal Cancer' },
          { value: 'prostate', label: 'Prostate Cancer' },
          { value: 'pancreatic', label: 'Pancreatic Cancer' },
          { value: 'liver', label: 'Liver Cancer' },
          { value: 'kidney', label: 'Kidney Cancer' },
          { value: 'brain', label: 'Brain Cancer' },
          { value: 'lymphoma', label: 'Lymphoma' },
          { value: 'leukemia', label: 'Leukemia' },
          { value: 'melanoma', label: 'Melanoma' },
          { value: 'ovarian', label: 'Ovarian Cancer' },
          { value: 'cervical', label: 'Cervical Cancer' },
          { value: 'thyroid', label: 'Thyroid Cancer' },
          { value: 'stomach', label: 'Stomach Cancer' },
          { value: 'other', label: 'Other (please specify)' }
        ],
        allowOther: true
      },
      {
        id: 'cancer_stage',
        type: 'select',
        question: 'What stage is your cancer?',
        required: false,
        options: [
          { value: 'stage_0', label: 'Stage 0 (In situ)' },
          { value: 'stage_1', label: 'Stage I (Early-stage)' },
          { value: 'stage_2', label: 'Stage II' },
          { value: 'stage_3', label: 'Stage III' },
          { value: 'stage_4', label: 'Stage IV (Advanced)' },
          { value: 'unknown', label: 'Unknown' },
          { value: 'not_staged', label: 'Not yet staged' }
        ]
      },
      {
        id: 'diagnosis_date',
        type: 'date',
        question: 'When were you first diagnosed?',
        required: true
      }
    ]
  },
  // Section 2: Treatment History
  {
    section: 'Treatment History',
    questions: [
      {
        id: 'previous_treatments',
        type: 'checkbox_multiple',
        question: 'Which treatments have you received or are you currently receiving?',
        required: true,
        options: [
          'Surgery',
          'Chemotherapy',
          'Radiation therapy',
          'Immunotherapy',
          'Targeted therapy',
          'Hormone therapy',
          'Stem cell/bone marrow transplant',
          'Clinical trial participation',
          'Other treatments'
        ],
        allowOther: true
      },
      {
        id: 'current_medications',
        type: 'textarea',
        question: 'Please list all current cancer-related medications and dosages:',
        required: false,
        placeholder: 'Include chemotherapy drugs, supportive medications, supplements, etc.',
        maxLength: 1000
      },
      {
        id: 'treatment_response',
        type: 'radio',
        question: 'How has your cancer responded to treatment so far?',
        required: false,
        options: [
          { value: 'complete_response', label: 'Complete response - No evidence of cancer' },
          { value: 'partial_response', label: 'Partial response - Cancer has shrunk' },
          { value: 'stable_disease', label: 'Stable disease - Cancer hasn\'t grown' },
          { value: 'progressive', label: 'Progressive disease - Cancer has grown' },
          { value: 'unknown', label: 'Unknown or too early to tell' }
        ]
      },
      {
        id: 'side_effects',
        type: 'checkbox_multiple',
        question: 'Which treatment side effects are you experiencing?',
        required: false,
        options: [
          'Fatigue',
          'Nausea/vomiting',
          'Hair loss',
          'Neuropathy (tingling/numbness)',
          'Mouth sores',
          'Diarrhea',
          'Constipation',
          'Skin changes',
          'Cognitive changes',
          'Depression/anxiety',
          'Sleep problems',
          'Other side effects'
        ],
        allowOther: true
      }
    ]
  },
  // Section 3: Family & Medical History
  {
    section: 'Family & Medical History',
    questions: [
      {
        id: 'family_cancer_history',
        type: 'textarea',
        question: 'Please describe any family history of cancer:',
        required: false,
        placeholder: 'Include relatives, types of cancer, ages at diagnosis...',
        maxLength: 800
      },
      {
        id: 'genetic_testing',
        type: 'radio',
        question: 'Have you undergone genetic testing for cancer predisposition?',
        required: false,
        options: [
          { value: 'yes_positive', label: 'Yes - Positive for genetic mutations' },
          { value: 'yes_negative', label: 'Yes - No genetic mutations found' },
          { value: 'yes_unclear', label: 'Yes - Results unclear or variants of unknown significance' },
          { value: 'no', label: 'No genetic testing done' },
          { value: 'planned', label: 'Genetic testing planned' }
        ]
      },
      {
        id: 'genetic_mutations',
        type: 'textarea',
        question: 'If you tested positive, which genetic mutations were found?',
        required: false,
        placeholder: 'e.g., BRCA1, BRCA2, Lynch syndrome, p53, etc.',
        maxLength: 300,
        dependsOn: {
          questionId: 'genetic_testing',
          value: 'yes_positive'
        }
      },
      {
        id: 'other_conditions',
        type: 'textarea',
        question: 'Do you have any other significant medical conditions?',
        required: false,
        placeholder: 'Diabetes, heart disease, autoimmune conditions, etc.',
        maxLength: 600
      }
    ]
  },
  // Section 4: Current Status & Symptoms
  {
    section: 'Current Status & Symptoms',
    questions: [
      {
        id: 'current_symptoms',
        type: 'checkbox_multiple',
        question: 'Which symptoms are you currently experiencing?',
        required: false,
        options: [
          'Pain (please specify location)',
          'Fatigue or weakness',
          'Shortness of breath',
          'Persistent cough',
          'Weight loss/gain',
          'Changes in appetite',
          'Fever or infections',
          'Bruising or bleeding',
          'Swelling or lumps',
          'Neurological symptoms',
          'Digestive issues',
          'Other symptoms'
        ],
        allowOther: true
      },
      {
        id: 'performance_status',
        type: 'radio',
        question: 'How would you describe your current activity level?',
        required: true,
        options: [
          { value: 'normal', label: 'Normal activity - Able to carry on normal activities without restrictions' },
          { value: 'light_restriction', label: 'Light restriction - Restricted in strenuous activity but can do light work' },
          { value: 'ambulatory', label: 'Ambulatory - Can walk and do self-care but cannot work' },
          { value: 'limited_selfcare', label: 'Limited self-care - Confined to bed/chair >50% of day' },
          { value: 'disabled', label: 'Completely disabled - Cannot do any self-care' }
        ]
      },
      {
        id: 'quality_of_life',
        type: 'scale',
        question: 'Rate your current quality of life:',
        required: true,
        scale: {
          min: 1,
          max: 10,
          minLabel: 'Very poor',
          maxLabel: 'Excellent'
        }
      }
    ]
  },
  // Section 5: Second Opinion Focus
  {
    section: 'Second Opinion Focus',
    questions: [
      {
        id: 'second_opinion_reason',
        type: 'checkbox_multiple',
        question: 'Why are you seeking a second opinion?',
        required: true,
        options: [
          'Want confirmation of diagnosis',
          'Exploring different treatment options',
          'Current treatment not working',
          'Considering clinical trials',
          'Facing difficult treatment decisions',
          'Want expert opinion on prognosis',
          'Experiencing severe side effects',
          'Preparing for surgery',
          'Considering alternative approaches',
          'Other reasons'
        ],
        allowOther: true
      },
      {
        id: 'specific_questions',
        type: 'textarea',
        question: 'What specific questions do you want the oncology specialist to address?',
        required: true,
        placeholder: 'Please be as specific as possible about what you want to know...',
        maxLength: 1200
      },
      {
        id: 'treatment_preferences',
        type: 'textarea',
        question: 'Do you have any preferences or concerns about treatment approaches?',
        required: false,
        placeholder: 'Quality of life priorities, treatment tolerance, lifestyle considerations, etc.',
        maxLength: 800
      },
      {
        id: 'urgency_level',
        type: 'radio',
        question: 'How urgent is your need for this second opinion?',
        required: true,
        options: [
          { value: 'routine', label: 'Routine - I can wait 10-14 days' },
          { value: 'moderate', label: 'Moderate - I would like a response within 5-7 days' },
          { value: 'urgent', label: 'Urgent - I need a response within 2-3 days' },
          { value: 'emergency', label: 'Emergency - I need immediate attention' }
        ]
      }
    ]
  },
  // Section 6: Additional Information
  {
    section: 'Additional Information',
    questions: [
      {
        id: 'lifestyle_factors',
        type: 'checkbox_multiple',
        question: 'Which lifestyle factors apply to you?',
        required: false,
        options: [
          'Current smoker',
          'Former smoker',
          'Regular alcohol use',
          'Physically active/exercise regularly',
          'Occupational exposures',
          'Environmental exposures',
          'Special dietary requirements',
          'None of the above'
        ]
      },
      {
        id: 'support_system',
        type: 'radio',
        question: 'Do you have adequate support during your cancer journey?',
        required: false,
        options: [
          { value: 'excellent', label: 'Excellent - Strong family/friend support' },
          { value: 'good', label: 'Good - Adequate support available' },
          { value: 'limited', label: 'Limited - Some support but could use more' },
          { value: 'minimal', label: 'Minimal - Very limited support system' }
        ]
      },
      {
        id: 'preferred_language',
        type: 'select',
        question: 'In which language would you prefer to receive your medical opinion?',
        required: true,
        options: [
          { value: 'english', label: 'English' },
          { value: 'german', label: 'German' },
          { value: 'spanish', label: 'Spanish' },
          { value: 'french', label: 'French' }
        ]
      },
      {
        id: 'additional_notes',
        type: 'textarea',
        question: 'Is there anything else you would like the oncology specialist to know?',
        required: false,
        placeholder: 'Any additional information that might be relevant to your case...',
        maxLength: 1000
      }
    ]
  }
];

// Utility Functions
const calculateCompletenessScore = (responses, questionnaireType) => {
  const questions = questionnaireType === 'FAST_TRACK' ? FAST_TRACK_QUESTIONS : 
    COMPREHENSIVE_ONCOLOGY_QUESTIONS.flatMap(section => section.questions);
  
  const requiredQuestions = questions.filter(q => q.required);
  const answeredRequired = requiredQuestions.filter(q => {
    const response = responses[q.id];
    return response && response.answer && response.answer.toString().trim().length > 0;
  }).length;

  const totalAnswered = Object.keys(responses).filter(key => {
    const response = responses[key];
    return response && response.answer && response.answer.toString().trim().length > 0;
  }).length;

  const requiredScore = requiredQuestions.length > 0 ? (answeredRequired / requiredQuestions.length) : 1;
  const totalScore = questions.length > 0 ? (totalAnswered / questions.length) : 1;

  return {
    requiredCompleteness: requiredScore,
    overallCompleteness: totalScore,
    answeredRequired: answeredRequired,
    totalRequired: requiredQuestions.length,
    totalAnswered: totalAnswered,
    totalQuestions: questions.length
  };
};

const analyzeResponses = async (responses, questionnaireType) => {
  // Mock AI analysis of responses
  // In production, this would call actual AI services
  
  const analysis = {
    medicalComplexity: 'moderate',
    urgencyLevel: responses.urgency_level?.answer || 'routine',
    primaryConcerns: [],
    riskFactors: [],
    recommendedSpecialty: 'general_medicine',
    confidence: 0.85
  };

  // Analyze based on questionnaire type
  if (questionnaireType === 'COMPREHENSIVE') {
    const cancerType = responses.cancer_type?.answer;
    const stage = responses.cancer_stage?.answer;
    
    if (cancerType) {
      analysis.recommendedSpecialty = 'oncology';
      analysis.primaryConcerns.push(`${cancerType} cancer`);
      
      if (stage && (stage.includes('stage_3') || stage.includes('stage_4'))) {
        analysis.medicalComplexity = 'high';
        analysis.urgencyLevel = 'urgent';
      }
    }
  }

  // Extract concerns from primary concern text
  const primaryConcernText = responses.primary_concern?.answer?.toLowerCase() || '';
  if (primaryConcernText.includes('pain')) {
    analysis.primaryConcerns.push('pain management');
  }
  if (primaryConcernText.includes('cancer') || primaryConcernText.includes('tumor')) {
    analysis.recommendedSpecialty = 'oncology';
  }

  return analysis;
};

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'operational',
    service: 'questionnaire-service',
    version: '1.0.0',
    features: [
      'fast-track-questionnaire',
      'comprehensive-oncology-questionnaire',
      'ai-response-analysis',
      'completeness-scoring',
      'multi-language-support'
    ],
    endpoints: {
      health: '/health',
      getQuestionnaire: 'GET /api/v1/questionnaires/:type',
      submitResponse: 'POST /api/v1/questionnaires/responses',
      getResponse: 'GET /api/v1/questionnaires/responses/:id',
      updateResponse: 'PUT /api/v1/questionnaires/responses/:id'
    },
    questionnaireTypes: ['FAST_TRACK', 'COMPREHENSIVE'],
    languages: ['english', 'german', 'spanish', 'french'],
    timestamp: new Date().toISOString()
  });
});

// ==============================================
// QUESTIONNAIRE MANAGEMENT
// ==============================================

// Get Questionnaire Template
app.get('/api/v1/questionnaires/:type', [
  param('type').isIn(['fast-track', 'comprehensive'])
], (req, res) => {
  try {
    const { type } = req.params;
    const { language = 'english' } = req.query;

    let questionnaire;
    if (type === 'fast-track') {
      questionnaire = {
        type: 'FAST_TRACK',
        title: 'Fast-Track Medical Questionnaire',
        description: 'A streamlined questionnaire for quick medical second opinion requests',
        estimatedTime: '5-7 minutes',
        totalQuestions: FAST_TRACK_QUESTIONS.length,
        questions: FAST_TRACK_QUESTIONS
      };
    } else {
      questionnaire = {
        type: 'COMPREHENSIVE',
        title: 'Comprehensive Oncology Questionnaire',
        description: 'Detailed questionnaire for comprehensive oncology second opinions',
        estimatedTime: '15-20 minutes',
        totalSections: COMPREHENSIVE_ONCOLOGY_QUESTIONS.length,
        totalQuestions: COMPREHENSIVE_ONCOLOGY_QUESTIONS.reduce((count, section) => count + section.questions.length, 0),
        sections: COMPREHENSIVE_ONCOLOGY_QUESTIONS
      };
    }

    res.status(200).json({
      success: true,
      data: {
        ...questionnaire,
        language: language,
        version: '1.0.0',
        lastUpdated: '2024-01-01T00:00:00Z'
      }
    });

  } catch (error) {
    logger.error('Questionnaire fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch questionnaire',
      code: 'QUESTIONNAIRE_FETCH_ERROR'
    });
  }
});

// Submit Questionnaire Response
app.post('/api/v1/questionnaires/responses', [
  body('questionnaireType').isIn(['FAST_TRACK', 'COMPREHENSIVE']),
  body('responses').isObject(),
  body('caseId').optional().isUUID(),
  body('tempSessionId').optional().isUUID(),
  body('language').optional().isIn(['english', 'german', 'spanish', 'french'])
], optionalAuth, async (req, res) => {
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
      questionnaireType,
      responses,
      caseId,
      tempSessionId,
      language = 'english'
    } = req.body;

    // Calculate completeness score
    const completenessScore = calculateCompletenessScore(responses, questionnaireType);
    
    // Analyze responses with AI
    const aiAnalysis = await analyzeResponses(responses, questionnaireType);

    let questionnaireResponse = null;

    // If we have a caseId, save to database
    if (caseId) {
      // Verify case exists and belongs to customer
      let medicalCase = null;
      if (req.user && req.user.type === 'customer') {
        medicalCase = await prisma.medicalCase.findFirst({
          where: {
            id: caseId,
            customerId: req.user.customerId
          }
        });
      } else {
        medicalCase = await prisma.medicalCase.findUnique({
          where: { id: caseId }
        });
      }

      if (medicalCase) {
        questionnaireResponse = await prisma.questionnaireResponse.create({
          data: {
            id: uuidv4(),
            caseId: caseId,
            questionnaireType: questionnaireType,
            language: language.toUpperCase(),
            responses: responses,
            aiAnalysis: aiAnalysis,
            completenessScore: completenessScore.overallCompleteness,
            confidence: aiAnalysis.confidence,
            createdAt: new Date()
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          error: 'Case not found or access denied',
          code: 'CASE_NOT_FOUND'
        });
      }
    }

    // Update temp session with questionnaire data
    if (tempSessionId) {
      try {
        const tempSubmission = await prisma.tempSubmission.findFirst({
          where: {
            id: tempSessionId,
            expiresAt: { gte: new Date() }
          }
        });

        if (tempSubmission) {
          const updatedPayload = {
            ...tempSubmission.payload,
            questionnaireResponse: {
              type: questionnaireType,
              responses: responses,
              aiAnalysis: aiAnalysis,
              completenessScore: completenessScore,
              language: language,
              submittedAt: new Date().toISOString()
            }
          };

          await prisma.tempSubmission.update({
            where: { id: tempSessionId },
            data: { payload: updatedPayload }
          });
        }
      } catch (tempError) {
        logger.warn('Failed to update temp session with questionnaire:', tempError);
      }
    }

    const responseData = {
      id: questionnaireResponse?.id || uuidv4(),
      questionnaireType,
      language,
      completenessScore: completenessScore,
      aiAnalysis: {
        medicalComplexity: aiAnalysis.medicalComplexity,
        recommendedSpecialty: aiAnalysis.recommendedSpecialty,
        urgencyLevel: aiAnalysis.urgencyLevel,
        primaryConcerns: aiAnalysis.primaryConcerns,
        confidence: aiAnalysis.confidence
      },
      submittedAt: questionnaireResponse?.createdAt || new Date(),
      caseId: caseId
    };

    res.status(201).json({
      success: true,
      message: 'Questionnaire response submitted successfully',
      data: responseData
    });

  } catch (error) {
    logger.error('Questionnaire submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit questionnaire response',
      code: 'QUESTIONNAIRE_SUBMISSION_ERROR'
    });
  }
});

// Get Questionnaire Response
app.get('/api/v1/questionnaires/responses/:responseId', [
  param('responseId').isUUID()
], authenticateToken, async (req, res) => {
  try {
    const { responseId } = req.params;

    const questionnaireResponse = await prisma.questionnaireResponse.findUnique({
      where: { id: responseId },
      include: {
        case: {
          select: {
            id: true,
            caseNumber: true,
            customerId: true
          }
        }
      }
    });

    if (!questionnaireResponse) {
      return res.status(404).json({
        success: false,
        error: 'Questionnaire response not found',
        code: 'RESPONSE_NOT_FOUND'
      });
    }

    // Check authorization
    if (req.user.type === 'customer' && questionnaireResponse.case.customerId !== req.user.customerId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied',
        code: 'ACCESS_DENIED'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: questionnaireResponse.id,
        questionnaireType: questionnaireResponse.questionnaireType,
        language: questionnaireResponse.language,
        responses: questionnaireResponse.responses,
        aiAnalysis: questionnaireResponse.aiAnalysis,
        completenessScore: questionnaireResponse.completenessScore,
        confidence: questionnaireResponse.confidence,
        caseId: questionnaireResponse.caseId,
        caseNumber: questionnaireResponse.case?.caseNumber,
        createdAt: questionnaireResponse.createdAt,
        updatedAt: questionnaireResponse.updatedAt
      }
    });

  } catch (error) {
    logger.error('Questionnaire response fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch questionnaire response',
      code: 'RESPONSE_FETCH_ERROR'
    });
  }
});

// Update Questionnaire Response
app.put('/api/v1/questionnaires/responses/:responseId', [
  param('responseId').isUUID(),
  body('responses').isObject(),
  body('language').optional().isIn(['english', 'german', 'spanish', 'french'])
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

    const { responseId } = req.params;
    const { responses, language } = req.body;

    const existingResponse = await prisma.questionnaireResponse.findUnique({
      where: { id: responseId },
      include: {
        case: {
          select: {
            customerId: true
          }
        }
      }
    });

    if (!existingResponse) {
      return res.status(404).json({
        success: false,
        error: 'Questionnaire response not found',
        code: 'RESPONSE_NOT_FOUND'
      });
    }

    // Check authorization
    if (req.user.type === 'customer' && existingResponse.case.customerId !== req.user.customerId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied',
        code: 'ACCESS_DENIED'
      });
    }

    // Recalculate completeness and analysis
    const completenessScore = calculateCompletenessScore(responses, existingResponse.questionnaireType);
    const aiAnalysis = await analyzeResponses(responses, existingResponse.questionnaireType);

    const updatedResponse = await prisma.questionnaireResponse.update({
      where: { id: responseId },
      data: {
        responses: responses,
        language: language ? language.toUpperCase() : existingResponse.language,
        aiAnalysis: aiAnalysis,
        completenessScore: completenessScore.overallCompleteness,
        confidence: aiAnalysis.confidence,
        updatedAt: new Date()
      }
    });

    res.status(200).json({
      success: true,
      message: 'Questionnaire response updated successfully',
      data: {
        id: updatedResponse.id,
        questionnaireType: updatedResponse.questionnaireType,
        language: updatedResponse.language,
        completenessScore: completenessScore,
        aiAnalysis: {
          medicalComplexity: aiAnalysis.medicalComplexity,
          recommendedSpecialty: aiAnalysis.recommendedSpecialty,
          urgencyLevel: aiAnalysis.urgencyLevel,
          primaryConcerns: aiAnalysis.primaryConcerns,
          confidence: aiAnalysis.confidence
        },
        updatedAt: updatedResponse.updatedAt
      }
    });

  } catch (error) {
    logger.error('Questionnaire response update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update questionnaire response',
      code: 'RESPONSE_UPDATE_ERROR'
    });
  }
});

// Get Questionnaire Statistics
app.get('/api/v1/questionnaires/statistics', authenticateToken, async (req, res) => {
  try {
    const { timeframe = '30d' } = req.query;
    
    // Calculate date range
    const now = new Date();
    let startDate;
    switch (timeframe) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const whereClause = {
      createdAt: { gte: startDate }
    };

    // If customer, filter by their responses only
    if (req.user.type === 'customer') {
      whereClause.case = {
        customerId: req.user.customerId
      };
    }

    const statistics = await prisma.questionnaireResponse.groupBy({
      by: ['questionnaireType'],
      where: whereClause,
      _count: true,
      _avg: {
        completenessScore: true,
        confidence: true
      }
    });

    const totalResponses = await prisma.questionnaireResponse.count({
      where: whereClause
    });

    res.status(200).json({
      success: true,
      data: {
        timeframe,
        startDate,
        endDate: now,
        totalResponses,
        byType: statistics.reduce((acc, stat) => {
          acc[stat.questionnaireType] = {
            count: stat._count,
            avgCompleteness: stat._avg.completenessScore,
            avgConfidence: stat._avg.confidence
          };
          return acc;
        }, {}),
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    logger.error('Statistics fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics',
      code: 'STATISTICS_ERROR'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`📝 Medical Questionnaire Service v1.0 running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📋 Get questionnaire: GET /api/v1/questionnaires/:type`);
  console.log(`✏️ Submit response: POST /api/v1/questionnaires/responses`);
  console.log(`📖 Get response: GET /api/v1/questionnaires/responses/:id`);
  console.log(`📈 Statistics: GET /api/v1/questionnaires/statistics`);
  console.log(`🚀 Fast-Track: ${FAST_TRACK_QUESTIONS.length} questions`);
  console.log(`🎯 Comprehensive: ${COMPREHENSIVE_ONCOLOGY_QUESTIONS.reduce((c, s) => c + s.questions.length, 0)} questions in ${COMPREHENSIVE_ONCOLOGY_QUESTIONS.length} sections`);
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