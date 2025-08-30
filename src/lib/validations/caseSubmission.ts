import { z } from 'zod';

/**
 * Case Submission Validation Schemas
 * 
 * These schemas validate API requests for the case submission endpoints,
 * ensuring data integrity and providing clear error messages for clients.
 */

// Base patient information schema
export const PatientInfoSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .max(100, 'First name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name contains invalid characters'),
  
  middleName: z.string()
    .max(100, 'Middle name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]*$/, 'Middle name contains invalid characters')
    .optional(),
  
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(100, 'Last name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name contains invalid characters'),
  
  dateOfBirth: z.string()
    .refine((date) => {
      const parsedDate = new Date(date);
      const now = new Date();
      const age = (now.getTime() - parsedDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      return !isNaN(parsedDate.getTime()) && age >= 0 && age <= 150;
    }, 'Invalid date of birth'),
  
  email: z.string()
    .email('Invalid email format')
    .min(5, 'Email is required')
    .max(255, 'Email must be less than 255 characters'),
  
  phone: z.string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number format')
    .optional(),
});

// Medical context schema
export const MedicalContextSchema = z.object({
  diseaseType: z.string()
    .min(1, 'Disease type is required')
    .max(200, 'Disease type must be less than 200 characters')
    .optional(),
  
  ethnicity: z.enum([
    'hispanic_latino',
    'white',
    'black_african_american',
    'native_american',
    'asian',
    'pacific_islander',
    'other',
    'prefer_not_to_say'
  ]).optional(),
  
  gender: z.enum([
    'male',
    'female',
    'non_binary',
    'other',
    'prefer_not_to_say'
  ]).optional(),
  
  isFirstOccurrence: z.boolean().optional(),
  
  geneticFamilyHistory: z.string()
    .refine((val) => {
      if (!val) return true;
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    }, 'Invalid genetic family history format')
    .optional(),
});

// File upload schema
export const FileUploadSchema = z.object({
  s3Key: z.string().min(1, 'S3 key is required'),
  filename: z.string().min(1, 'Filename is required'),
  mimetype: z.string().min(1, 'MIME type is required'),
  size: z.number().positive('File size must be positive'),
  category: z.enum([
    'medical_records',
    'lab_results',
    'imaging',
    'pathology',
    'genetic_tests',
    'other'
  ]),
});

// Main case submission schema
export const CaseSubmissionSchema = z.object({
  ...PatientInfoSchema.shape,
  ...MedicalContextSchema.shape,
  
  customerId: z.string()
    .uuid('Invalid customer ID format'),
  
  paymentId: z.string()
    .min(1, 'Payment ID is required')
    .optional(),
  
  consentAccepted: z.boolean()
    .refine((val) => val === true, 'Consent must be accepted'),
  
  uploadedFiles: z.array(z.string())
    .max(20, 'Maximum 20 files allowed')
    .optional(),
  
  // Additional metadata
  submissionSource: z.enum(['web', 'mobile', 'api']).default('api'),
  
  timezone: z.string()
    .regex(/^[A-Za-z_\/]+$/, 'Invalid timezone format')
    .optional(),
});

// Pre-submission validation schema
export const ValidationRequestSchema = z.object({
  customerId: z.string().uuid('Invalid customer ID format'),
  
  // Optional fields for validation checking
  email: z.string().email().optional(),
  diseaseType: z.string().optional(),
  checkDuplicates: z.boolean().default(true),
  
  // Timeframe for duplicate checking
  duplicateCheckDays: z.number()
    .min(1)
    .max(30)
    .default(7),
});

// Analytics request schema
export const AnalyticsRequestSchema = z.object({
  customerId: z.string().uuid().optional(),
  
  dateFrom: z.string()
    .refine((date) => !isNaN(new Date(date).getTime()), 'Invalid from date')
    .optional(),
  
  dateTo: z.string()
    .refine((date) => !isNaN(new Date(date).getTime()), 'Invalid to date')
    .optional(),
  
  groupBy: z.enum([
    'day',
    'week',
    'month',
    'disease_type',
    'persona'
  ]).default('month'),
  
  metrics: z.array(z.enum([
    'submission_count',
    'unique_customers',
    'first_time_submissions',
    'returning_submissions',
    'conversion_rate',
    'disease_distribution',
    'persona_distribution'
  ])).default(['submission_count']),
}).refine((data) => {
  // Validate date range
  if (data.dateFrom && data.dateTo) {
    const from = new Date(data.dateFrom);
    const to = new Date(data.dateTo);
    return from <= to;
  }
  return true;
}, 'From date must be before to date');

// Document upload schema
export const DocumentUploadSchema = z.object({
  caseId: z.string()
    .uuid('Invalid case ID format')
    .optional(),
  
  customerId: z.string()
    .uuid('Invalid customer ID format'),
  
  files: z.array(FileUploadSchema)
    .min(1, 'At least one file is required')
    .max(10, 'Maximum 10 files allowed per request'),
  
  associateWithCase: z.boolean().default(false),
  
  // Optional case association for pre-submission uploads
  tempCaseId: z.string().optional(),
});

// Webhook event schema
export const WebhookEventSchema = z.object({
  eventType: z.enum([
    'case.submitted',
    'case.validated',
    'case.processing_started',
    'case.assigned',
    'case.completed',
    'customer.onboarded',
    'customer.reengaged',
    'communication.sent',
    'automation.triggered'
  ]),
  
  customerId: z.string().uuid(),
  
  caseId: z.string().uuid().optional(),
  
  data: z.record(z.any()),
  
  timestamp: z.string()
    .refine((date) => !isNaN(new Date(date).getTime()), 'Invalid timestamp'),
  
  retryCount: z.number().min(0).default(0),
});

// Response schemas for OpenAPI documentation
export const CaseSubmissionResponseSchema = z.object({
  success: z.boolean(),
  caseId: z.string().uuid(),
  caseNumber: z.string(),
  metrics: z.object({
    submissionId: z.string(),
    customerId: z.string(),
    caseNumber: z.string(),
    submissionTimestamp: z.string(),
    isFirstSubmission: z.boolean(),
    personaAnalyzed: z.boolean(),
    lifecycleStageUpdated: z.boolean(),
    communicationsSent: z.array(z.string()),
    automationTriggered: z.array(z.string()),
    healthScoreImpact: z.number(),
    segmentationUpdated: z.boolean(),
  }),
  lifecycleEvents: z.array(z.string()),
  message: z.string().optional(),
});

export const ValidationResponseSchema = z.object({
  success: z.boolean(),
  isValid: z.boolean(),
  errors: z.array(z.string()),
  warnings: z.array(z.string()),
  recommendations: z.array(z.string()),
  duplicateCheck: z.object({
    hasDuplicates: z.boolean(),
    duplicateCount: z.number(),
    mostRecentDate: z.string().optional(),
  }).optional(),
});

export const AnalyticsResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    totalSubmissions: z.number(),
    uniqueCustomers: z.number(),
    firstTimeSubmissions: z.number(),
    returningSubmissions: z.number(),
    diseaseTypeDistribution: z.record(z.number()),
    averageSubmissionsPerCustomer: z.number(),
    timeframe: z.object({
      from: z.string().optional(),
      to: z.string().optional(),
    }),
    // Time series data for charts
    timeSeries: z.array(z.object({
      date: z.string(),
      count: z.number(),
      uniqueCustomers: z.number().optional(),
    })).optional(),
  }),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
  }).optional(),
});

export const DocumentUploadResponseSchema = z.object({
  success: z.boolean(),
  uploadedFiles: z.array(z.object({
    id: z.string(),
    s3Key: z.string(),
    filename: z.string(),
    size: z.number(),
    category: z.string(),
    uploadedAt: z.string(),
  })),
  caseAssociation: z.object({
    caseId: z.string().optional(),
    tempCaseId: z.string().optional(),
  }).optional(),
  message: z.string().optional(),
});

// Error response schema
export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  details: z.record(z.any()).optional(),
  timestamp: z.string(),
  path: z.string(),
  statusCode: z.number(),
});

// Rate limit response schema
export const RateLimitResponseSchema = z.object({
  success: z.literal(false),
  error: z.literal('Rate limit exceeded'),
  retryAfter: z.number(),
  limit: z.number(),
  remaining: z.number(),
  resetTime: z.number(),
});

// Type exports for TypeScript
export type CaseSubmissionRequest = z.infer<typeof CaseSubmissionSchema>;
export type ValidationRequest = z.infer<typeof ValidationRequestSchema>;
export type AnalyticsRequest = z.infer<typeof AnalyticsRequestSchema>;
export type DocumentUploadRequest = z.infer<typeof DocumentUploadSchema>;
export type WebhookEvent = z.infer<typeof WebhookEventSchema>;

export type CaseSubmissionResponse = z.infer<typeof CaseSubmissionResponseSchema>;
export type ValidationResponse = z.infer<typeof ValidationResponseSchema>;
export type AnalyticsResponse = z.infer<typeof AnalyticsResponseSchema>;
export type DocumentUploadResponse = z.infer<typeof DocumentUploadResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export type RateLimitResponse = z.infer<typeof RateLimitResponseSchema>;