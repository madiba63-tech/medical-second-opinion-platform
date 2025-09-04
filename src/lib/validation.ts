/**
 * Standardized Input Validation for Medical Second Opinion Platform
 * Healthcare Industry Compliant Validation with HIPAA Protection
 * 
 * This module provides consistent validation patterns across all services
 * with medical data validation, security checks, and PHI protection.
 */

import { z } from 'zod';

// Common Medical Data Types
export const MEDICAL_DATA_TYPES = {
  GENDER: ['MALE', 'FEMALE', 'PREFER_NOT_TO_SAY', 'OTHER'] as const,
  URGENCY_LEVELS: ['STANDARD', 'URGENT', 'EMERGENCY'] as const,
  PROFESSIONAL_LEVELS: ['JUNIOR', 'SENIOR', 'EXPERT', 'DISTINGUISHED'] as const,
  CASE_STATUSES: ['DRAFT', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as const,
  CASE_PRIORITIES: ['LOW', 'NORMAL', 'HIGH', 'URGENT', 'CRITICAL'] as const,
  FILE_CATEGORIES: [
    'MEDICAL_REPORT', 'PATHOLOGY', 'LABORATORY', 'IMAGING', 'DICOM_IMAGING',
    'PRESCRIPTION', 'DISCHARGE_SUMMARY', 'CONSULTATION_NOTES', 'OTHER'
  ] as const,
  LANGUAGES: ['ENGLISH', 'GERMAN', 'SPANISH', 'FRENCH'] as const,
  NOTIFICATION_CHANNELS: ['EMAIL', 'SMS', 'PUSH', 'IN_APP'] as const,
} as const;

// Healthcare-Specific Validation Patterns
const VALIDATION_PATTERNS = {
  // Medical Record Number (flexible pattern for international use)
  MRN: /^[A-Z0-9]{6,20}$/,
  
  // Phone number (international format)
  PHONE: /^\+?[1-9]\d{1,14}$/,
  
  // Strong password requirement
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  
  // Date formats
  DATE_ISO: /^\d{4}-\d{2}-\d{2}$/,
  DATETIME_ISO: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,
  
  // Medical-specific patterns
  ICD_10: /^[A-Z]\d{2}(\.[A-Z0-9]{1,4})?$/,
  CPT_CODE: /^\d{5}$/,
  LOINC_CODE: /^\d{1,5}-\d$/,
  
  // File naming (sanitized)
  SAFE_FILENAME: /^[a-zA-Z0-9._-]+$/,
  
  // Case number format
  CASE_NUMBER: /^CASE-[A-Z0-9]{8,}-[A-Z0-9]{4,}$/,
} as const;

// Common Validation Schemas

// Basic String Validations
export const stringValidation = {
  nonEmpty: z.string().min(1, 'Field cannot be empty'),
  email: z.string().email('Must be a valid email address'),
  phone: z.string().regex(VALIDATION_PATTERNS.PHONE, 'Must be a valid phone number'),
  strongPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(VALIDATION_PATTERNS.STRONG_PASSWORD, 
      'Password must contain uppercase, lowercase, number, and special character'),
  safeFilename: z.string().regex(VALIDATION_PATTERNS.SAFE_FILENAME, 'Invalid filename format'),
  caseNumber: z.string().regex(VALIDATION_PATTERNS.CASE_NUMBER, 'Invalid case number format'),
};

// Date/Time Validations
export const dateValidation = {
  dateString: z.string().regex(VALIDATION_PATTERNS.DATE_ISO, 'Must be valid ISO date (YYYY-MM-DD)'),
  dateTimeString: z.string().regex(VALIDATION_PATTERNS.DATETIME_ISO, 'Must be valid ISO datetime'),
  pastDate: z.date().max(new Date(), 'Date cannot be in the future'),
  futureDate: z.date().min(new Date(), 'Date cannot be in the past'),
  age: z.number().int().min(0).max(150, 'Age must be between 0 and 150'),
  dateOfBirth: z.date()
    .min(new Date('1900-01-01'), 'Date of birth too far in past')
    .max(new Date(), 'Date of birth cannot be in future'),
};

// Medical Data Validations
export const medicalValidation = {
  gender: z.enum(MEDICAL_DATA_TYPES.GENDER),
  urgencyLevel: z.enum(MEDICAL_DATA_TYPES.URGENCY_LEVELS),
  professionalLevel: z.enum(MEDICAL_DATA_TYPES.PROFESSIONAL_LEVELS),
  caseStatus: z.enum(MEDICAL_DATA_TYPES.CASE_STATUSES),
  casePriority: z.enum(MEDICAL_DATA_TYPES.CASE_PRIORITIES),
  fileCategory: z.enum(MEDICAL_DATA_TYPES.FILE_CATEGORIES),
  language: z.enum(MEDICAL_DATA_TYPES.LANGUAGES),
  notificationChannel: z.enum(MEDICAL_DATA_TYPES.NOTIFICATION_CHANNELS),
  
  // Medical codes
  icd10Code: z.string().regex(VALIDATION_PATTERNS.ICD_10, 'Invalid ICD-10 code format'),
  cptCode: z.string().regex(VALIDATION_PATTERNS.CPT_CODE, 'Invalid CPT code format'),
  loincCode: z.string().regex(VALIDATION_PATTERNS.LOINC_CODE, 'Invalid LOINC code format'),
  
  // Medical measurements
  height: z.number().min(30).max(300, 'Height must be between 30-300 cm'),
  weight: z.number().min(0.5).max(1000, 'Weight must be between 0.5-1000 kg'),
  bloodPressureSystolic: z.number().int().min(50).max(300, 'Invalid systolic pressure'),
  bloodPressureDiastolic: z.number().int().min(30).max(200, 'Invalid diastolic pressure'),
  heartRate: z.number().int().min(30).max(300, 'Heart rate must be between 30-300 bpm'),
  temperature: z.number().min(30).max(45, 'Temperature must be between 30-45°C'),
};

// File Upload Validations
export const fileValidation = {
  size: (maxSizeMB: number) => z.number()
    .min(1, 'File size must be greater than 0')
    .max(maxSizeMB * 1024 * 1024, `File size cannot exceed ${maxSizeMB}MB`),
    
  mimeType: (allowedTypes: string[]) => z.string()
    .refine(type => allowedTypes.includes(type), 
      `File type must be one of: ${allowedTypes.join(', ')}`),
    
  filename: z.string()
    .min(1, 'Filename is required')
    .max(255, 'Filename too long')
    .refine(filename => {
      // Check for path traversal
      if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
        return false;
      }
      
      // Check for dangerous extensions
      const dangerousExts = ['.exe', '.bat', '.cmd', '.scr', '.vbs', '.js', '.jar'];
      const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
      return !dangerousExts.includes(ext);
    }, 'Invalid or dangerous filename'),
};

// User Authentication Schemas
export const authSchemas = {
  register: z.object({
    firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
    lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
    email: stringValidation.email,
    password: stringValidation.strongPassword,
    confirmPassword: z.string(),
    dateOfBirth: z.date().optional(),
    gender: medicalValidation.gender.optional(),
    phone: stringValidation.phone.optional(),
    preferredLanguage: medicalValidation.language.default('ENGLISH'),
    termsAccepted: z.boolean().refine(val => val === true, 'Terms must be accepted'),
    privacyAccepted: z.boolean().refine(val => val === true, 'Privacy policy must be accepted'),
    marketingConsent: z.boolean().optional().default(false),
  }).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
  
  login: z.object({
    email: stringValidation.email,
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional().default(false),
  }),
  
  verifyTwoFactor: z.object({
    tempToken: z.string().min(1, 'Temporary token is required'),
    verificationCode: z.string().length(6, '6-digit verification code required'),
  }),
  
  resetPassword: z.object({
    email: stringValidation.email,
  }),
  
  newPassword: z.object({
    token: z.string().min(1, 'Reset token is required'),
    password: stringValidation.strongPassword,
    confirmPassword: z.string(),
  }).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
};

// Medical Case Schemas
export const caseSchemas = {
  create: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title too long'),
    description: z.string().min(10, 'Description must be at least 10 characters').max(5000, 'Description too long'),
    urgency: medicalValidation.urgencyLevel.default('STANDARD'),
    professionalLevel: medicalValidation.professionalLevel,
    category: z.string().min(1, 'Category is required'),
    symptoms: z.array(z.string()).optional(),
    currentMedications: z.array(z.string()).optional(),
    allergies: z.array(z.string()).optional(),
    medicalHistory: z.string().max(10000, 'Medical history too long').optional(),
  }),
  
  update: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title too long').optional(),
    description: z.string().min(10, 'Description must be at least 10 characters').max(5000, 'Description too long').optional(),
    status: medicalValidation.caseStatus.optional(),
    priority: medicalValidation.casePriority.optional(),
    notes: z.string().max(5000, 'Notes too long').optional(),
  }),
  
  fileUpload: z.object({
    files: z.array(z.object({
      filename: fileValidation.filename,
      mimetype: z.string(),
      size: z.number(),
      category: medicalValidation.fileCategory.optional(),
    })).min(1, 'At least one file is required').max(10, 'Maximum 10 files allowed'),
  }),
  
  questionnaire: z.object({
    type: z.enum(['FAST_TRACK', 'COMPREHENSIVE']),
    responses: z.record(z.any()), // Flexible structure for questionnaire responses
    completedAt: z.date().optional().default(() => new Date()),
  }),
};

// Professional Registration Schemas
export const professionalSchemas = {
  register: z.object({
    personalInfo: z.object({
      firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
      lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
      email: stringValidation.email,
      phone: stringValidation.phone,
      dateOfBirth: dateValidation.dateOfBirth,
      gender: medicalValidation.gender.optional(),
      nationality: z.string().min(2, 'Nationality is required'),
      preferredLanguage: medicalValidation.language.default('ENGLISH'),
    }),
    
    professionalInfo: z.object({
      title: z.enum(['DR', 'PROF', 'MR', 'MS', 'MRS']),
      specialization: z.array(z.string()).min(1, 'At least one specialization required'),
      yearsOfExperience: z.number().int().min(0).max(70, 'Years of experience must be 0-70'),
      currentPosition: z.string().min(1, 'Current position is required'),
      institution: z.string().min(1, 'Institution is required'),
      bio: z.string().max(2000, 'Bio too long').optional(),
    }),
    
    credentials: z.object({
      medicalLicenseNumber: z.string().min(1, 'Medical license number is required'),
      licenseExpirationDate: z.date().min(new Date(), 'License must not be expired'),
      boardCertifications: z.array(z.string()).optional(),
      publications: z.array(z.string()).optional(),
      education: z.array(z.object({
        degree: z.string(),
        institution: z.string(),
        graduationYear: z.number().int().min(1950).max(new Date().getFullYear()),
      })).min(1, 'At least one education entry required'),
    }),
    
    preferences: z.object({
      availableHours: z.object({
        monday: z.array(z.string()).optional(),
        tuesday: z.array(z.string()).optional(),
        wednesday: z.array(z.string()).optional(),
        thursday: z.array(z.string()).optional(),
        friday: z.array(z.string()).optional(),
        saturday: z.array(z.string()).optional(),
        sunday: z.array(z.string()).optional(),
      }),
      maxCasesPerWeek: z.number().int().min(1).max(50).default(10),
      consultationTypes: z.array(z.string()).min(1, 'At least one consultation type required'),
    }),
  }),
  
  availability: z.object({
    startDate: z.date(),
    endDate: z.date(),
    timeSlots: z.array(z.object({
      startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Time format must be HH:MM'),
      endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Time format must be HH:MM'),
    })),
  }).refine(data => data.endDate > data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
  }),
};

// API Query Parameters Validation
export const querySchemas = {
  pagination: z.object({
    page: z.string().optional().transform(val => val ? Math.max(1, parseInt(val, 10)) : 1),
    limit: z.string().optional().transform(val => val ? Math.min(100, Math.max(1, parseInt(val, 10))) : 10),
  }),
  
  caseFilters: z.object({
    status: medicalValidation.caseStatus.optional(),
    priority: medicalValidation.casePriority.optional(),
    urgency: medicalValidation.urgencyLevel.optional(),
    professionalLevel: medicalValidation.professionalLevel.optional(),
    category: z.string().optional(),
    createdAfter: z.string().optional().transform(val => val ? new Date(val) : undefined),
    createdBefore: z.string().optional().transform(val => val ? new Date(val) : undefined),
  }),
  
  professionalFilters: z.object({
    specialization: z.string().optional(),
    availability: z.boolean().optional(),
    minRating: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
    maxCasesPerWeek: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined),
  }),
};

// Validation Helper Functions
export class ValidationHelper {
  /**
   * Sanitize input to prevent XSS and injection attacks
   */
  static sanitizeInput(input: any): any {
    if (typeof input === 'string') {
      return input
        .trim()
        .replace(/[<>'"]/g, '') // Remove potential XSS characters
        .replace(/[^\w\s@.-]/g, ''); // Keep only safe characters
    }
    
    if (typeof input === 'object' && input !== null) {
      if (Array.isArray(input)) {
        return input.map(item => ValidationHelper.sanitizeInput(item));
      }
      
      const sanitized: any = {};
      for (const [key, value] of Object.entries(input)) {
        sanitized[key] = ValidationHelper.sanitizeInput(value);
      }
      return sanitized;
    }
    
    return input;
  }
  
  /**
   * Validate PHI data for HIPAA compliance
   */
  static validatePHI(data: any): { isCompliant: boolean; violations: string[] } {
    const violations: string[] = [];
    const dataStr = JSON.stringify(data).toLowerCase();
    
    // Check for potential PHI exposure
    const phiPatterns = [
      { pattern: /\b\d{3}-\d{2}-\d{4}\b/, message: 'Social Security Number detected' },
      { pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, message: 'Email address detected' },
      { pattern: /\b\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})\b/, message: 'Phone number detected' },
      { pattern: /\b\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\b/, message: 'Credit card number detected' },
      { pattern: /\bmrn\s*:?\s*\d+/, message: 'Medical record number detected' },
    ];
    
    phiPatterns.forEach(({ pattern, message }) => {
      if (pattern.test(dataStr)) {
        violations.push(message);
      }
    });
    
    return {
      isCompliant: violations.length === 0,
      violations,
    };
  }
  
  /**
   * Validate file upload security
   */
  static validateFileUpload(file: {
    filename: string;
    mimetype: string;
    size: number;
  }, config: {
    maxSize: number;
    allowedTypes: string[];
  }): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Check file size
    if (file.size > config.maxSize) {
      errors.push(`File size exceeds limit of ${config.maxSize / (1024 * 1024)}MB`);
    }
    
    // Check MIME type
    if (!config.allowedTypes.includes(file.mimetype)) {
      errors.push(`File type ${file.mimetype} is not allowed`);
    }
    
    // Check filename for security issues
    if (!VALIDATION_PATTERNS.SAFE_FILENAME.test(file.filename)) {
      errors.push('Filename contains invalid characters');
    }
    
    // Check for dangerous file extensions
    const dangerousExts = ['.exe', '.bat', '.cmd', '.scr', '.vbs', '.js', '.jar'];
    const ext = file.filename.toLowerCase().substring(file.filename.lastIndexOf('.'));
    if (dangerousExts.includes(ext)) {
      errors.push('File extension is not allowed for security reasons');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
  
  /**
   * Create validation middleware for Express
   */
  static expressValidator(schema: z.ZodSchema) {
    return (req: any, res: any, next: any) => {
      try {
        const validated = schema.parse(req.body);
        req.validatedBody = validated;
        next();
      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: error.errors.map(err => ({
              field: err.path.join('.'),
              message: err.message,
              code: err.code,
            })),
          });
        }
        next(error);
      }
    };
  }
  
  /**
   * Create validation wrapper for Next.js API routes
   */
  static nextValidator<T>(schema: z.ZodSchema<T>) {
    return async (data: any): Promise<T> => {
      try {
        return schema.parse(data);
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`);
        }
        throw error;
      }
    };
  }
}

// Common validation patterns export
export const commonValidations = {
  uuid: z.string().uuid('Must be a valid UUID'),
  positiveInt: z.number().int().positive('Must be a positive integer'),
  nonNegativeInt: z.number().int().min(0, 'Must be non-negative'),
  url: z.string().url('Must be a valid URL'),
  base64: z.string().regex(/^[A-Za-z0-9+/]*={0,2}$/, 'Must be valid base64'),
  hexColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  ipAddress: z.string().ip('Must be a valid IP address'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Must be a valid slug (lowercase, numbers, hyphens only)'),
};

// Export all schemas for easy import
export const schemas = {
  auth: authSchemas,
  case: caseSchemas,
  professional: professionalSchemas,
  query: querySchemas,
};