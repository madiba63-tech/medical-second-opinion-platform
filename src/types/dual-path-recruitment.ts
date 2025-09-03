import { z } from 'zod';

// ========================================================================================
// DUAL-PATH PROFESSIONAL RECRUITMENT SYSTEM - TYPE DEFINITIONS
// ========================================================================================

// Base Enums
export const ApplicationPathType = z.enum(['AI_ASSISTED', 'MANUAL']);
export type ApplicationPathType = z.infer<typeof ApplicationPathType>;

export const ApplicationStatus = z.enum([
  'DRAFT',
  'IN_PROGRESS', 
  'PENDING_REVIEW',
  'UNDER_ADMIN_REVIEW',
  'APPROVED',
  'REJECTED',
  'REQUIRES_INFO',
  'WITHDRAWN'
]);
export type ApplicationStatus = z.infer<typeof ApplicationStatus>;

export const DocumentType = z.enum([
  'MEDICAL_LICENSE',
  'BOARD_CERTIFICATION', 
  'GOOD_STANDING_CERTIFICATE',
  'MALPRACTICE_INSURANCE',
  'GOVERNMENT_ID',
  'CV_DOCUMENT',
  'MEDICAL_DEGREE',
  'RESIDENCY_CERTIFICATE',
  'FELLOWSHIP_CERTIFICATE',
  'ADDITIONAL_CERTIFICATES'
]);
export type DocumentType = z.infer<typeof DocumentType>;

export const SelfDeclaredLevel = z.enum(['JUNIOR', 'SENIOR', 'EXPERT', 'DISTINGUISHED']);
export type SelfDeclaredLevel = z.infer<typeof SelfDeclaredLevel>;

export const AdminActionType = z.enum([
  'APPROVE',
  'REJECT', 
  'REQUEST_INFO',
  'OVERRIDE_SCORE',
  'ESCALATE',
  'ADD_NOTE'
]);
export type AdminActionType = z.infer<typeof AdminActionType>;

// ========================================================================================
// APPLICATION PATH TRACKING
// ========================================================================================

export const ApplicationPathSchema = z.object({
  id: z.string().uuid(),
  candidateId: z.string().uuid(),
  pathType: ApplicationPathType,
  startedAt: z.date(),
  completedAt: z.date().optional(),
  aiConfidenceScore: z.number().min(0).max(1).optional(),
  aiProcessingTime: z.number().int().optional(),
  userCorrectionsCount: z.number().int().default(0),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type ApplicationPath = z.infer<typeof ApplicationPathSchema>;

// ========================================================================================
// SELF-ASSESSMENT QUESTIONNAIRE
// ========================================================================================

export const SelfAssessmentResponseSchema = z.object({
  id: z.string().uuid(),
  candidateId: z.string().uuid(),
  section: z.enum(['disease_diagnosis', 'imaging_technology', 'overall']),
  questionKey: z.string(),
  questionText: z.string(),
  responseValue: z.number().int().min(0).max(5).optional(),
  responseText: z.string().optional(),
  completedAt: z.date(),
  createdAt: z.date()
});

export type SelfAssessmentResponse = z.infer<typeof SelfAssessmentResponseSchema>;

// Self-Assessment Question Structure
export const SelfAssessmentQuestionSchema = z.object({
  key: z.string(),
  text: z.string(),
  type: z.enum(['rating', 'text', 'multiple_choice']),
  section: z.enum(['disease_diagnosis', 'imaging_technology', 'overall']),
  required: z.boolean().default(true),
  options: z.array(z.string()).optional(),
  maxRating: z.number().int().default(5)
});

export type SelfAssessmentQuestion = z.infer<typeof SelfAssessmentQuestionSchema>;

// Complete Self-Assessment Data
export const SelfAssessmentDataSchema = z.object({
  diseaseCompetencies: z.record(z.number().int().min(0).max(5)),
  imagingTechnologies: z.record(z.number().int().min(0).max(5)),
  expertiseCancerTypes: z.string().optional(),
  frequentImagingTech: z.string().optional(),
  selfDeclaredLevel: SelfDeclaredLevel,
  additionalNotes: z.string().optional()
});

export type SelfAssessmentData = z.infer<typeof SelfAssessmentDataSchema>;

// ========================================================================================
// AI PROCESSING
// ========================================================================================

export const AIProcessingResultSchema = z.object({
  id: z.string().uuid(),
  candidateId: z.string().uuid(),
  documentType: z.enum(['CV', 'CERTIFICATE', 'LICENSE', 'OTHER']),
  originalFilename: z.string(),
  s3Key: z.string(),
  aiService: z.enum(['openai-gpt4', 'tesseract-ocr', 'custom-parser']),
  processingStatus: z.enum(['PROCESSING', 'COMPLETED', 'FAILED', 'REJECTED']),
  confidenceScore: z.number().min(0).max(1).optional(),
  extractedData: z.record(z.any()),
  errorDetails: z.string().optional(),
  processingStartedAt: z.date(),
  processingCompletedAt: z.date().optional(),
  createdAt: z.date()
});

export type AIProcessingResult = z.infer<typeof AIProcessingResultSchema>;

// AI Extracted CV Data Structure
export const AIExtractedCVDataSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    nationality: z.string().optional()
  }).optional(),
  
  education: z.object({
    medicalDegree: z.object({
      institution: z.string(),
      year: z.string(),
      degree: z.string()
    }).optional(),
    residency: z.object({
      institution: z.string(),
      specialty: z.string(),
      startYear: z.string(),
      endYear: z.string()
    }).optional(),
    fellowship: z.object({
      institution: z.string(),
      specialty: z.string(),
      year: z.string()
    }).optional()
  }).optional(),
  
  professional: z.object({
    currentAffiliation: z.string().optional(),
    yearsPractice: z.number().int().optional(),
    subspecialties: z.array(z.string()).optional(),
    publications: z.number().int().optional(),
    clinicalTrials: z.boolean().optional(),
    teachingRoles: z.boolean().optional()
  }).optional(),
  
  licensing: z.object({
    licenseNumber: z.string().optional(),
    licenseCountry: z.string().optional(),
    boardCertifications: z.array(z.string()).optional()
  }).optional(),
  
  confidence: z.object({
    overall: z.number().min(0).max(1),
    personal: z.number().min(0).max(1),
    education: z.number().min(0).max(1),
    professional: z.number().min(0).max(1),
    licensing: z.number().min(0).max(1)
  })
});

export type AIExtractedCVData = z.infer<typeof AIExtractedCVDataSchema>;

// ========================================================================================
// DOCUMENT REQUIREMENTS
// ========================================================================================

export const DocumentRequirementSchema = z.object({
  id: z.string().uuid(),
  documentType: DocumentType,
  countryCode: z.string().length(3).optional(),
  isRequired: z.boolean().default(true),
  allowsNotApplicable: z.boolean().default(false),
  alternativeDocuments: z.array(DocumentType).optional(),
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type DocumentRequirement = z.infer<typeof DocumentRequirementSchema>;

// ========================================================================================
// ENHANCED PROFESSIONAL APPLICATION
// ========================================================================================

export const DocumentUploadSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  s3Key: z.string(),
  notApplicable: z.boolean().default(false),
  notApplicableReason: z.string().optional()
});

export type DocumentUpload = z.infer<typeof DocumentUploadSchema>;

export const EnhancedProfessionalApplicationSchema = z.object({
  // Basic Information
  applicationNumber: z.string().optional(),
  pathType: ApplicationPathType,
  
  // Step 1: Identity & Contact (AI path doesn't require government ID)
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
  dob: z.string(),
  nationality: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  governmentId: DocumentUploadSchema.optional(), // Only required for manual path
  
  // Step 2: Education & Training
  medicalDegree: DocumentUploadSchema.optional(),
  residencyCertificate: DocumentUploadSchema.optional(),
  fellowshipCertificate: DocumentUploadSchema.optional(),
  boardCertification: z.object({
    number: z.string().optional(),
    certificate: DocumentUploadSchema.optional()
  }).optional(),
  additionalCertificates: z.array(DocumentUploadSchema).optional(),
  
  // Step 3: Licensing
  licenseNumber: z.string().min(1),
  licenseCountry: z.string().min(1), 
  licenseExpiry: z.string(),
  licenseCertificate: DocumentUploadSchema.optional(),
  goodStandingCertificate: DocumentUploadSchema, // Always required
  
  // Step 4: Professional Experience
  yearsPractice: z.number().min(0),
  currentAffiliation: z.string().min(1),
  cv: DocumentUploadSchema.optional(),
  subspecialties: z.array(z.string()),
  annualPatientLoad: z.number().min(0),
  previousSecondOpinions: z.number().min(0).optional(),
  
  // Step 5: Research & Academic
  publications: z.number().min(0),
  representativePublications: z.array(DocumentUploadSchema).optional(),
  clinicalTrials: z.object({
    involved: z.boolean(),
    description: z.string().optional()
  }),
  conferencePresentations: z.object({
    involved: z.boolean(),
    details: z.string().optional()
  }),
  teachingRoles: z.object({
    involved: z.boolean(),
    details: z.string().optional()
  }),
  
  // Step 6: Professional Recognition
  societyMemberships: z.array(z.string()),
  awards: z.string().optional(),
  leadershipRoles: z.string().optional(),
  
  // Step 7: Good Standing & Compliance
  references: z.array(z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    relationship: z.string()
  })),
  malpracticeInsurance: DocumentUploadSchema.optional(),
  noDisciplinaryProceedings: z.boolean(),
  dataProtectionAgreement: z.boolean(),
  
  // New: Self-Assessment (Step 8)
  selfAssessment: SelfAssessmentDataSchema.optional(),
  
  // Application Metadata
  aiProcessingResults: z.array(AIProcessingResultSchema).optional(),
  userReviewedAIData: z.boolean().default(false),
  applicationStatus: ApplicationStatus.default('DRAFT'),
  submittedAt: z.date().optional(),
  reviewedAt: z.date().optional()
});

export type EnhancedProfessionalApplication = z.infer<typeof EnhancedProfessionalApplicationSchema>;

// ========================================================================================
// ADMIN DASHBOARD
// ========================================================================================

export const AdminReviewActionSchema = z.object({
  id: z.string().uuid(),
  candidateId: z.string().uuid(),
  adminUserId: z.string().uuid(),
  actionType: AdminActionType,
  actionDetails: z.record(z.any()).optional(),
  competencyScoreOverride: z.number().int().optional(),
  levelOverride: SelfDeclaredLevel.optional(),
  reviewNotes: z.string().optional(),
  requiresFollowUp: z.boolean().default(false),
  createdAt: z.date()
});

export type AdminReviewAction = z.infer<typeof AdminReviewActionSchema>;

export const ApplicationSummarySchema = z.object({
  candidateId: z.string().uuid(),
  applicationNumber: z.string(),
  applicantName: z.string(),
  email: z.string().email(),
  pathType: ApplicationPathType,
  currentStatus: ApplicationStatus,
  submittedAt: z.date().optional(),
  selfDeclaredLevel: SelfDeclaredLevel.optional(),
  computedLevel: SelfDeclaredLevel.optional(),
  computedScore: z.number().int().optional(),
  hasConflict: z.boolean(), // self-declared vs computed level mismatch
  documentCount: z.number().int(),
  missingDocuments: z.array(DocumentType),
  lastUpdated: z.date()
});

export type ApplicationSummary = z.infer<typeof ApplicationSummarySchema>;

// ========================================================================================
// API REQUEST/RESPONSE SCHEMAS
// ========================================================================================

export const StartApplicationRequestSchema = z.object({
  pathType: ApplicationPathType,
  cvFile: z.any().optional(), // File object for AI path
  applicantEmail: z.string().email()
});

export type StartApplicationRequest = z.infer<typeof StartApplicationRequestSchema>;

export const StartApplicationResponseSchema = z.object({
  success: z.boolean(),
  applicationNumber: z.string(),
  candidateId: z.string().uuid(),
  pathType: ApplicationPathType,
  aiExtractedData: AIExtractedCVDataSchema.optional(),
  nextStep: z.string(),
  message: z.string()
});

export type StartApplicationResponse = z.infer<typeof StartApplicationResponseSchema>;

// ========================================================================================
// APPLICATION FORM DATA STRUCTURE
// ========================================================================================

export const ApplicationFormDataSchema = z.object({
  personalInfo: z.object({
    firstName: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    nationality: z.string().optional(),
    dateOfBirth: z.date().optional(),
    governmentIdType: z.string().optional(),
    governmentIdNumber: z.string().optional()
  }),
  professionalInfo: z.object({
    currentAffiliation: z.string(),
    currentPosition: z.string(),
    subspecialties: z.array(z.string()),
    yearsPractice: z.number().int(),
    publications: z.number().int(),
    clinicalTrials: z.boolean(),
    teachingRoles: z.boolean(),
    primarySpecialty: z.string(),
    workPhone: z.string().optional(),
    workEmail: z.string().optional()
  }),
  medicalEducation: z.object({
    medicalSchool: z.string(),
    graduationYear: z.string(),
    degree: z.string(),
    residencyProgram: z.string(),
    residencySpecialty: z.string(),
    residencyStartYear: z.string(),
    residencyEndYear: z.string(),
    fellowshipProgram: z.string().optional(),
    fellowshipSpecialty: z.string().optional(),
    fellowshipYear: z.string().optional()
  }),
  licensingInfo: z.object({
    licenseNumber: z.string(),
    licenseCountry: z.string(),
    licenseExpirationDate: z.date().optional(),
    boardCertifications: z.array(z.string()),
    malpracticeInsurance: z.boolean().optional()
  }),
  documents: z.object({
    cv: z.any().optional(), // File
    medicalLicense: z.any().optional(), // File
    boardCertifications: z.array(z.any()).optional(), // File[]
    malpracticeInsurance: z.any().optional(), // File
    governmentId: z.any().optional(), // File
    additionalDocuments: z.array(z.any()).optional() // File[]
  }),
  compliance: z.object({
    backgroundCheckConsent: z.boolean(),
    dataProcessingConsent: z.boolean(),
    communicationConsent: z.boolean(),
    qualityAssuranceConsent: z.boolean(),
    intellectualPropertyConsent: z.boolean()
  })
});

export type ApplicationFormData = z.infer<typeof ApplicationFormDataSchema>;

export const SubmitSelfAssessmentRequestSchema = z.object({
  candidateId: z.string().uuid(),
  assessmentData: SelfAssessmentDataSchema
});

export type SubmitSelfAssessmentRequest = z.infer<typeof SubmitSelfAssessmentRequestSchema>;

export const AdminApprovalRequestSchema = z.object({
  candidateId: z.string().uuid(),
  action: AdminActionType,
  reviewNotes: z.string().optional(),
  competencyScoreOverride: z.number().int().optional(),
  levelOverride: SelfDeclaredLevel.optional()
});

export type AdminApprovalRequest = z.infer<typeof AdminApprovalRequestSchema>;

// ========================================================================================
// SELF-ASSESSMENT QUESTIONNAIRE CONFIGURATION
// ========================================================================================

export const DISEASE_DIAGNOSIS_QUESTIONS: SelfAssessmentQuestion[] = [
  { key: 'breast_cancer', text: 'Breast Cancer', type: 'rating', section: 'disease_diagnosis', required: true, maxRating: 5 },
  { key: 'prostate_cancer', text: 'Prostate Cancer', type: 'rating', section: 'disease_diagnosis', required: true, maxRating: 5 },
  { key: 'lung_cancer', text: 'Lung Cancer', type: 'rating', section: 'disease_diagnosis', required: true, maxRating: 5 },
  { key: 'colorectal_cancer', text: 'Colorectal Cancer', type: 'rating', section: 'disease_diagnosis', required: true, maxRating: 5 },
  { key: 'cervical_cancer', text: 'Cervical Cancer', type: 'rating', section: 'disease_diagnosis', required: true, maxRating: 5 },
  { key: 'ovarian_cancer', text: 'Ovarian Cancer', type: 'rating', section: 'disease_diagnosis', required: true, maxRating: 5 },
  { key: 'pancreatic_cancer', text: 'Pancreatic Cancer', type: 'rating', section: 'disease_diagnosis', required: true, maxRating: 5 },
  { key: 'hematologic_malignancies', text: 'Hematologic Malignancies (e.g., Leukemia, Lymphoma)', type: 'rating', section: 'disease_diagnosis', required: true, maxRating: 5 },
  { key: 'skin_cancers', text: 'Skin Cancers (e.g., Melanoma)', type: 'rating', section: 'disease_diagnosis', required: true, maxRating: 5 },
  { key: 'rare_pediatric_cancers', text: 'Rare / Pediatric Cancers', type: 'rating', section: 'disease_diagnosis', required: true, maxRating: 5 }
];

export const IMAGING_TECHNOLOGY_QUESTIONS: SelfAssessmentQuestion[] = [
  { key: 'xray', text: 'X-ray', type: 'rating', section: 'imaging_technology', required: true, maxRating: 5 },
  { key: 'ultrasound', text: 'Ultrasound', type: 'rating', section: 'imaging_technology', required: true, maxRating: 5 },
  { key: 'mammography', text: 'Mammography', type: 'rating', section: 'imaging_technology', required: true, maxRating: 5 },
  { key: 'ct_scan', text: 'CT Scan (Computed Tomography)', type: 'rating', section: 'imaging_technology', required: true, maxRating: 5 },
  { key: 'mri', text: 'MRI (Magnetic Resonance Imaging)', type: 'rating', section: 'imaging_technology', required: true, maxRating: 5 },
  { key: 'pet_scan', text: 'PET Scan (Positron Emission Tomography)', type: 'rating', section: 'imaging_technology', required: true, maxRating: 5 },
  { key: 'pet_ct_fusion', text: 'PET-CT Fusion Imaging', type: 'rating', section: 'imaging_technology', required: true, maxRating: 5 },
  { key: 'digital_pathology', text: 'Digital Pathology / Histopathology', type: 'rating', section: 'imaging_technology', required: true, maxRating: 5 },
  { key: 'immunohistochemistry', text: 'Immunohistochemistry (IHC)', type: 'rating', section: 'imaging_technology', required: true, maxRating: 5 },
  { key: 'molecular_genetic_testing', text: 'Molecular/Genetic Testing (e.g., NGS, PCR)', type: 'rating', section: 'imaging_technology', required: true, maxRating: 5 },
  { key: 'dicom_imaging', text: 'DICOM Imaging Formats', type: 'rating', section: 'imaging_technology', required: true, maxRating: 5 }
];

export const OVERALL_ASSESSMENT_QUESTIONS: SelfAssessmentQuestion[] = [
  { key: 'expertise_cancer_types', text: 'Which cancer types do you consider yourself an expert in?', type: 'text', section: 'overall', required: false, maxRating: 5 },
  { key: 'frequent_imaging_tech', text: 'Which imaging technologies do you use most frequently in your practice?', type: 'text', section: 'overall', required: false, maxRating: 5 }
];

// Export all question sets combined
export const ALL_SELF_ASSESSMENT_QUESTIONS = [
  ...DISEASE_DIAGNOSIS_QUESTIONS,
  ...IMAGING_TECHNOLOGY_QUESTIONS,
  ...OVERALL_ASSESSMENT_QUESTIONS
];

// ========================================================================================
// RATING SCALE DEFINITIONS
// ========================================================================================

export const COMPETENCY_RATING_SCALE = {
  0: 'Not familiar',
  1: 'Limited familiarity', 
  2: 'Basic familiarity',
  3: 'Moderate competence',
  4: 'High competence',
  5: 'Extensive expertise'
} as const;

export const EXPERTISE_LEVEL_DESCRIPTIONS = {
  JUNIOR: {
    title: 'Junior Oncologist',
    description: 'Recently board-certified or within first 5 years of oncology practice. Basic clinical experience in diagnosing and treating common cancers. Familiarity with standard imaging and pathology techniques. Works under supervision or with mandatory peer review. Suitable for straightforward second opinions with oversight.'
  },
  SENIOR: {
    title: 'Senior Oncologist', 
    description: '5–15 years of independent oncology practice. Demonstrated experience across multiple cancer types. Competent in interpreting a wide range of imaging and diagnostic technologies. Regularly participates in multidisciplinary tumor boards. Can provide second opinions independently, with peer review for complex cases.'
  },
  EXPERT: {
    title: 'Expert Oncologist',
    description: '15–25 years of professional experience or subspecialist in oncology. Recognized authority in one or more cancer subtypes (e.g., breast, lung, hematology). Strong publication record and/or active involvement in clinical trials. Extensive experience with advanced imaging, pathology, and genetic testing. Trusted to review complex or rare cases; participates in peer review for quality assurance.'
  },
  DISTINGUISHED: {
    title: 'Distinguished Oncologist',
    description: '25+ years of leadership in oncology practice, research, or academia. Internationally recognized reputation (awards, keynote lectures, guideline authorship). Proven track record in mentoring, policy-shaping, or advancing oncology practice. Expert in AI-assisted diagnostics and integration into patient care. Provides second opinions on the most complex cases; acts as quality overseer in peer-review process.'
  }
} as const;