import { z } from 'zod';

export const ProLevel = z.enum(["JUNIOR", "SENIOR", "EXPERT", "DISTINGUISHED"]);
export type ProLevel = z.infer<typeof ProLevel>;

export const ProfessionalApplication = z.object({
  // Step 1: Identity & Contact
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
  dob: z.string(),
  nationality: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  governmentId: z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  }),

  // Step 2: Education & Training
  medicalDegree: z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  }).nullable().optional(),
  residencyCertificate: z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  }).nullable().optional(),
  fellowshipCertificate: z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  }).nullable().optional(),
  boardCertification: z.object({
    number: z.string().optional(),
    certificate: z.object({
      name: z.string(),
      size: z.number(),
      type: z.string(),
      s3Key: z.string(),
    }).nullable().optional(),
  }).optional(),
  additionalCertificates: z.array(z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  })).optional(),

  // Step 3: Licensing
  licenseNumber: z.string().min(1),
  licenseCountry: z.string().min(1),
  licenseExpiry: z.string(),
  licenseCertificate: z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  }).nullable().optional(),
  goodStandingCertificate: z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  }).nullable().optional(),

  // Step 4: Professional Experience
  yearsPractice: z.number().min(0),
  currentAffiliation: z.string().min(1),
  cv: z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  }).nullable().optional(),
  subspecialties: z.array(z.string()),
  annualPatientLoad: z.number().min(0),
  previousSecondOpinions: z.number().min(0).optional(),

  // Step 5: Research & Academic
  publications: z.number().min(0),
  representativePublications: z.array(z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  })).optional(),
  clinicalTrials: z.object({
    involved: z.boolean(),
    description: z.string().optional(),
  }),
  conferencePresentations: z.object({
    involved: z.boolean(),
    details: z.string().optional(),
  }),
  teachingRoles: z.object({
    involved: z.boolean(),
    details: z.string().optional(),
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
    relationship: z.string(),
  })),
  malpracticeInsurance: z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    s3Key: z.string(),
  }).nullable().optional(),
  noDisciplinaryProceedings: z.boolean(),
  dataProtectionAgreement: z.boolean(),
});

export type ProfessionalApplication = z.infer<typeof ProfessionalApplication>;

export const CompetencyScore = z.object({
  yearsPractice: z.number().min(0).max(20),
  boardCertification: z.number().min(0).max(10),
  subspecialtyFocus: z.number().min(0).max(5),
  publications: z.number().min(0).max(15),
  clinicalTrials: z.number().min(0).max(10),
  conferenceTeaching: z.number().min(0).max(10),
  societyMembership: z.number().min(0).max(5),
  leadershipRoles: z.number().min(0).max(10),
  peerReviewGuidelines: z.number().min(0).max(15),
  totalScore: z.number().min(0).max(100),
  level: ProLevel,
});

export type CompetencyScore = z.infer<typeof CompetencyScore>;

// Professional Profiling Enums and Types
export const CancerSubspecialty = z.enum([
  // Solid Tumors
  "BREAST_CANCER",
  "PROSTATE_CANCER", 
  "LUNG_CANCER",
  "COLORECTAL_CANCER",
  "GYNECOLOGIC_CANCER",
  "HEAD_AND_NECK_CANCER",
  "SKIN_CANCER",
  "LIVER_CANCER",
  "PANCREATIC_CANCER",
  "KIDNEY_CANCER",
  "BLADDER_CANCER",
  "GASTRIC_CANCER",
  
  // Hematologic Malignancies
  "LEUKEMIA",
  "LYMPHOMA",
  "MYELOMA",
  "MYELODYSPLASTIC_SYNDROME",
  
  // Rare & Pediatric
  "SARCOMA",
  "NEUROBLASTOMA",
  "PEDIATRIC_LEUKEMIA",
  "BRAIN_TUMOR",
  "BONE_CANCER",
  
  // Molecular/Genetic
  "MOLECULAR_ONCOLOGY",
  "GENETIC_ONCOLOGY",
  "PRECISION_MEDICINE",
  "IMMUNOTHERAPY",
  "TARGETED_THERAPY"
]);

export const DiagnosticExpertise = z.enum([
  "RADIOLOGY_FOCUSED",    // MRI, CT, PET/CT interpretation
  "PATHOLOGY_FOCUSED",    // Histopathology, immunohistochemistry
  "GENOMICS_SPECIALIST",  // NGS, liquid biopsy, hereditary syndromes
  "MULTIMODAL_REVIEWER"   // Integrating imaging, pathology, genetics
]);

export const RegionalLicensing = z.enum([
  "EU_LICENSED",      // EMA standards, GDPR compliant
  "US_LICENSED",      // FDA standards, HIPAA compliant
  "APAC_LICENSED",    // Asia-Pacific region
  "CROSS_LICENSED"    // Multiple jurisdictions
]);

export const LanguageCapability = z.enum([
  "ENGLISH",
  "GERMAN", 
  "FRENCH",
  "SPANISH",
  "MANDARIN",
  "HINDI",
  "ARABIC",
  "PORTUGUESE",
  "ITALIAN",
  "JAPANESE",
  "DUTCH",
  "SWEDISH"
]);

export const AvailabilityTier = z.enum([
  "RAPID_RESPONSE",   // 24-48h turnaround
  "STANDARD",         // 3-7 days
  "COMPLEX_CASE"      // Detailed reviews, longer timeframe
]);

// Professional Profile Schema
export const ProfessionalProfile = z.object({
  // Unique identifier (better than "employee number")
  professionalId: z.string().min(1), // e.g., "MED-2024-001" 
  
  // Clinical Seniority/Expertise Level (existing)
  expertiseLevel: ProLevel,
  
  // Enhanced Cancer Subspecialties
  primarySpecialties: z.array(CancerSubspecialty).min(1).max(3),
  secondarySpecialties: z.array(CancerSubspecialty).max(5),
  
  // Diagnostic Expertise
  diagnosticCapabilities: z.array(DiagnosticExpertise).min(1),
  
  // Regional/Regulatory Licensing
  licensingJurisdictions: z.array(RegionalLicensing).min(1),
  regulatoryCompliance: z.object({
    gdprCompliant: z.boolean(),
    hipaaCompliant: z.boolean(),
    localRegulationsAware: z.array(z.string()), // Country codes
  }),
  
  // Language & Communication Skills
  languages: z.array(z.object({
    language: LanguageCapability,
    proficiencyLevel: z.enum(["BASIC", "INTERMEDIATE", "ADVANCED", "NATIVE"]),
    medicalTerminology: z.boolean(), // Can handle medical terms in this language
  })).min(1),
  
  // Availability & Workload Management
  availabilityProfile: z.object({
    tier: AvailabilityTier,
    maxConcurrentCases: z.number().min(1).max(20),
    workingHours: z.object({
      timezone: z.string(), // e.g., "America/New_York", "Europe/London"
      weekdays: z.object({
        start: z.string(), // "09:00"
        end: z.string(),   // "17:00"
      }),
      weekends: z.boolean(),
      urgentCasesAfterHours: z.boolean(),
    }),
    vacationSchedule: z.array(z.object({
      startDate: z.string(),
      endDate: z.string(),
      available: z.boolean(), // Available for urgent cases during vacation
    })).optional(),
  }),
  
  // Performance Metrics (historical)
  performanceMetrics: z.object({
    averageResponseTime: z.number().optional(), // hours
    customerSatisfactionRating: z.number().min(1).max(5).optional(),
    caseAccuracyRating: z.number().min(1).max(5).optional(),
    peerReviewScore: z.number().min(1).max(5).optional(),
    totalCasesCompleted: z.number().min(0),
    successfulMatches: z.number().min(0), // Cases completed without reassignment
    specialtySuccessRates: z.record(CancerSubspecialty, z.number().min(0).max(1)).optional(),
  }).optional(),
  
  // Quality Assurance
  qualityProfile: z.object({
    verificationStatus: z.enum(["PENDING", "VERIFIED", "REQUIRES_UPDATE"]),
    lastVerificationDate: z.string().optional(),
    competencyAssessmentScore: z.number().min(0).max(100).optional(),
    peerEndorsements: z.array(z.object({
      endorserId: z.string(),
      specialty: CancerSubspecialty,
      endorsementDate: z.string(),
      comment: z.string().optional(),
    })).optional(),
    continuousEducationCredits: z.number().min(0).optional(),
    recentTrainingCertificates: z.array(z.object({
      title: z.string(),
      provider: z.string(),
      completionDate: z.string(),
      creditHours: z.number(),
    })).optional(),
  }),
  
  // Professional Preferences
  preferences: z.object({
    preferredCaseTypes: z.array(z.enum([
      "DIAGNOSTIC_REVIEW",
      "TREATMENT_PLANNING", 
      "SECOND_OPINION",
      "COMPLEX_CONSULTATION",
      "MULTIDISCIPLINARY_REVIEW",
      "GENOMIC_INTERPRETATION"
    ])).optional(),
    avoidCaseTypes: z.array(z.string()).optional(), // Cases professional prefers not to handle
    mentorshipAvailable: z.boolean(), // Available to mentor junior professionals
    researchInterests: z.array(z.string()).optional(),
    continuousLearningPreferences: z.array(z.string()).optional(),
  }).optional(),
  
  // Administrative
  createdAt: z.string(),
  updatedAt: z.string(),
  isActive: z.boolean(),
  profileCompleteness: z.number().min(0).max(100), // Percentage
});

export type ProfessionalProfile = z.infer<typeof ProfessionalProfile>;

// Case Profiling Schema
export const CaseComplexity = z.enum([
  "ROUTINE",      // Standard cases, clear presentation
  "MODERATE",     // Some complexity, multiple factors
  "COMPLEX",      // High complexity, rare conditions
  "EXCEPTIONAL"   // Extremely rare, research-level
]);

export const CaseUrgency = z.enum([
  "STANDARD",     // 5-7 days
  "URGENT",       // 2-3 days (1.5x surcharge)
  "EMERGENCY"     // 24-48 hours (2x surcharge)
]);

export const CaseProfile = z.object({
  caseId: z.string(),
  caseNumber: z.string(),
  
  // Customer Requirements
  requestedExpertiseLevel: ProLevel,
  requestedUrgency: CaseUrgency,
  
  // Case Characteristics (AI-derived or manually assigned)
  estimatedComplexity: CaseComplexity,
  primarySpecialtyRequired: CancerSubspecialty,
  secondarySpecialtiesRequired: z.array(CancerSubspecialty).optional(),
  diagnosticExpertiseRequired: z.array(DiagnosticExpertise),
  
  // Document Analysis
  documentTypes: z.array(z.enum([
    "MEDICAL_IMAGING",
    "PATHOLOGY_REPORT", 
    "LAB_RESULTS",
    "GENOMIC_TESTING",
    "MEDICAL_HISTORY",
    "TREATMENT_RECORDS",
    "RADIOLOGY_IMAGES"
  ])),
  
  // Language Requirements
  requiredLanguage: LanguageCapability,
  
  // Regulatory Requirements  
  regulatoryJurisdiction: RegionalLicensing,
  
  // Matching Constraints
  excludeProfessionals: z.array(z.string()).optional(), // Professional IDs to exclude
  preferredProfessionals: z.array(z.string()).optional(), // Professional IDs preferred
  
  // Matching Results
  eligibleProfessionals: z.array(z.object({
    professionalId: z.string(),
    matchScore: z.number().min(0).max(1), // 0-1 confidence score
    matchReasons: z.array(z.string()),
    estimatedResponseTime: z.number(), // hours
  })).optional(),
  
  assignedProfessional: z.string().optional(),
  assignmentTimestamp: z.string().optional(),
  
  // Metadata
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CaseProfile = z.infer<typeof CaseProfile>;
