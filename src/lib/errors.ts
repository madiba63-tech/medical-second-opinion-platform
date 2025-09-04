/**
 * Standardized Error Handling for Medical Second Opinion Platform
 * Healthcare Industry Compliant Error Management
 * 
 * This module provides consistent error handling patterns across all services
 * with HIPAA compliance and audit trail support.
 */

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

// Standard HTTP Status Codes for Medical Applications
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

// Healthcare-Specific Error Codes
export const MEDICAL_ERROR_CODES = {
  // Authentication & Authorization
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  ACCESS_DENIED: 'ACCESS_DENIED',
  INSUFFICIENT_PRIVILEGES: 'INSUFFICIENT_PRIVILEGES',
  
  // Medical Data Validation
  MEDICAL_DATA_VALIDATION_FAILED: 'MEDICAL_DATA_VALIDATION_FAILED',
  INVALID_PATIENT_DATA: 'INVALID_PATIENT_DATA',
  MISSING_REQUIRED_MEDICAL_INFO: 'MISSING_REQUIRED_MEDICAL_INFO',
  
  // File Upload & Processing
  FILE_UPLOAD_FAILED: 'FILE_UPLOAD_FAILED',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  FILE_SIZE_EXCEEDED: 'FILE_SIZE_EXCEEDED',
  FILE_PROCESSING_FAILED: 'FILE_PROCESSING_FAILED',
  
  // Professional Services
  PROFESSIONAL_NOT_FOUND: 'PROFESSIONAL_NOT_FOUND',
  PROFESSIONAL_UNAVAILABLE: 'PROFESSIONAL_UNAVAILABLE',
  CREDENTIALS_VERIFICATION_FAILED: 'CREDENTIALS_VERIFICATION_FAILED',
  
  // Case Management
  CASE_NOT_FOUND: 'CASE_NOT_FOUND',
  CASE_ACCESS_DENIED: 'CASE_ACCESS_DENIED',
  CASE_STATUS_INVALID: 'CASE_STATUS_INVALID',
  CASE_CREATION_FAILED: 'CASE_CREATION_FAILED',
  
  // Payment & Billing
  PAYMENT_PROCESSING_FAILED: 'PAYMENT_PROCESSING_FAILED',
  PAYMENT_AUTHORIZATION_FAILED: 'PAYMENT_AUTHORIZATION_FAILED',
  INSUFFICIENT_FUNDS: 'INSUFFICIENT_FUNDS',
  
  // AI & Analysis
  AI_ANALYSIS_FAILED: 'AI_ANALYSIS_FAILED',
  AI_SERVICE_UNAVAILABLE: 'AI_SERVICE_UNAVAILABLE',
  MEDICAL_ANALYSIS_INCOMPLETE: 'MEDICAL_ANALYSIS_INCOMPLETE',
  
  // System & Infrastructure
  DATABASE_CONNECTION_FAILED: 'DATABASE_CONNECTION_FAILED',
  EXTERNAL_SERVICE_UNAVAILABLE: 'EXTERNAL_SERVICE_UNAVAILABLE',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  SYSTEM_MAINTENANCE: 'SYSTEM_MAINTENANCE',
  
  // HIPAA & Compliance
  PHI_ACCESS_VIOLATION: 'PHI_ACCESS_VIOLATION',
  AUDIT_LOG_FAILED: 'AUDIT_LOG_FAILED',
  ENCRYPTION_FAILED: 'ENCRYPTION_FAILED',
  DATA_RETENTION_VIOLATION: 'DATA_RETENTION_VIOLATION',
} as const;

// Base Error Interface for Healthcare Applications
export interface MedicalError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: string;
  correlationId?: string;
  userId?: string;
  patientId?: string;
  caseId?: string;
  hipaaCompliant: boolean;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category: 'AUTHENTICATION' | 'VALIDATION' | 'BUSINESS_LOGIC' | 'SYSTEM' | 'SECURITY' | 'COMPLIANCE';
}

// Standard API Error Response Format
export interface ApiErrorResponse {
  success: false;
  error: string;
  code: string;
  details?: unknown;
  timestamp: string;
  correlationId?: string;
  retryable: boolean;
  retryAfter?: number;
}

// Error Classification
export class StandardizedError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details: unknown;
  public readonly timestamp: string;
  public readonly correlationId: string;
  public readonly severity: MedicalError['severity'];
  public readonly category: MedicalError['category'];
  public readonly hipaaCompliant: boolean;
  public readonly retryable: boolean;
  public readonly userId?: string;
  public readonly patientId?: string;
  public readonly caseId?: string;

  constructor(
    message: string,
    code: string,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    options: {
      details?: unknown;
      correlationId?: string;
      severity?: MedicalError['severity'];
      category?: MedicalError['category'];
      userId?: string;
      patientId?: string;
      caseId?: string;
      retryable?: boolean;
    } = {},
  ) {
    super(message);
    this.name = 'StandardizedError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = options.details;
    this.timestamp = new Date().toISOString();
    this.correlationId = options.correlationId || generateCorrelationId();
    this.severity = options.severity || 'MEDIUM';
    this.category = options.category || 'SYSTEM';
    this.hipaaCompliant = this.isHIPAACompliant();
    this.retryable = options.retryable || false;
    this.userId = options.userId;
    this.patientId = options.patientId;
    this.caseId = options.caseId;
  }

  private isHIPAACompliant(): boolean {
    // Ensure error doesn't expose PHI
    const phiIndicators = [
      'ssn', 'social security', 'date of birth', 'phone number',
      'email address', 'medical record number', 'patient name',
    ];
    
    const messageToCheck = this.message.toLowerCase();
    const detailsToCheck = JSON.stringify(this.details || '').toLowerCase();
    
    return !phiIndicators.some(indicator => 
      messageToCheck.includes(indicator) || detailsToCheck.includes(indicator),
    );
  }

  public toJSON(): MedicalError {
    return {
      code: this.code,
      message: this.message,
      details: this.sanitizeDetails(),
      timestamp: this.timestamp,
      correlationId: this.correlationId,
      userId: this.userId,
      patientId: this.patientId ? '[REDACTED]' : undefined, // Always redact patient ID in responses
      caseId: this.caseId,
      hipaaCompliant: this.hipaaCompliant,
      severity: this.severity,
      category: this.category,
    };
  }

  private sanitizeDetails(): unknown {
    if (!this.details) return undefined;
    
    // Remove sensitive information from details
    const sanitized = JSON.parse(JSON.stringify(this.details));
    const sensitiveFields = ['password', 'token', 'ssn', 'social_security_number', 'phone', 'email'];
    
    const sanitizeObject = (obj: any): any => {
      if (typeof obj !== 'object' || obj === null) return obj;
      
      for (const key in obj) {
        if (sensitiveFields.includes(key.toLowerCase())) {
          obj[key] = '[REDACTED]';
        } else if (typeof obj[key] === 'object') {
          obj[key] = sanitizeObject(obj[key]);
        }
      }
      
      return obj;
    };
    
    return sanitizeObject(sanitized);
  }
}

// Specific Error Classes for Common Scenarios
export class ValidationError extends StandardizedError {
  constructor(message: string, details?: unknown, correlationId?: string) {
    super(message, MEDICAL_ERROR_CODES.MEDICAL_DATA_VALIDATION_FAILED, HTTP_STATUS.BAD_REQUEST, {
      details,
      correlationId,
      severity: 'LOW',
      category: 'VALIDATION',
      retryable: false,
    });
  }
}

export class AuthenticationError extends StandardizedError {
  constructor(message: string, code: string = MEDICAL_ERROR_CODES.INVALID_CREDENTIALS, correlationId?: string) {
    super(message, code, HTTP_STATUS.UNAUTHORIZED, {
      correlationId,
      severity: 'HIGH',
      category: 'AUTHENTICATION',
      retryable: false,
    });
  }
}

export class AuthorizationError extends StandardizedError {
  constructor(message: string, userId?: string, correlationId?: string) {
    super(message, MEDICAL_ERROR_CODES.ACCESS_DENIED, HTTP_STATUS.FORBIDDEN, {
      userId,
      correlationId,
      severity: 'HIGH',
      category: 'SECURITY',
      retryable: false,
    });
  }
}

export class NotFoundError extends StandardizedError {
  constructor(resource: string, resourceId?: string, correlationId?: string) {
    super(`${resource} not found`, `${resource.toUpperCase()}_NOT_FOUND`, HTTP_STATUS.NOT_FOUND, {
      details: { resourceId },
      correlationId,
      severity: 'LOW',
      category: 'BUSINESS_LOGIC',
      retryable: false,
    });
  }
}

export class SystemError extends StandardizedError {
  constructor(message: string, details?: unknown, correlationId?: string) {
    super(message, 'SYSTEM_ERROR', HTTP_STATUS.INTERNAL_SERVER_ERROR, {
      details,
      correlationId,
      severity: 'CRITICAL',
      category: 'SYSTEM',
      retryable: true,
    });
  }
}

// Utility Functions
export function generateCorrelationId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

export function handleZodError(error: ZodError, correlationId?: string): ValidationError {
  const details = {
    validationErrors: error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code,
    })),
  };
  
  return new ValidationError('Input validation failed', details, correlationId);
}

export function createApiErrorResponse(error: StandardizedError): ApiErrorResponse {
  return {
    success: false,
    error: error.message,
    code: error.code,
    details: error.details,
    timestamp: error.timestamp,
    correlationId: error.correlationId,
    retryable: error.retryable,
    retryAfter: error.retryable ? 60 : undefined, // 60 seconds retry delay for retryable errors
  };
}

export function createNextErrorResponse(error: StandardizedError): NextResponse {
  const apiResponse = createApiErrorResponse(error);
  return NextResponse.json(apiResponse, { status: error.statusCode });
}

// Error Handler Middleware for Next.js API Routes
export function withErrorHandler<T extends (...args: any[]) => Promise<NextResponse>>(
  handler: T,
): T {
  return (async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error('API Error:', error);
      
      // Handle known error types
      if (error instanceof StandardizedError) {
        return createNextErrorResponse(error);
      }
      
      // Handle Zod validation errors
      if (error instanceof ZodError) {
        const validationError = handleZodError(error);
        return createNextErrorResponse(validationError);
      }
      
      // Handle unknown errors
      const systemError = new SystemError(
        'An unexpected error occurred',
        { originalError: error instanceof Error ? error.message : String(error) },
      );
      
      return createNextErrorResponse(systemError);
    }
  }) as T;
}

// Express Error Handler for Microservices
export function expressErrorHandler(error: any, req: any, res: any, next: any): void {
  console.error('Express Error:', error);
  
  if (error instanceof StandardizedError) {
    const response = createApiErrorResponse(error);
    return res.status(error.statusCode).json(response);
  }
  
  if (error instanceof ZodError) {
    const validationError = handleZodError(error);
    const response = createApiErrorResponse(validationError);
    return res.status(validationError.statusCode).json(response);
  }
  
  // Handle unknown errors
  const systemError = new SystemError(
    'An unexpected error occurred',
    { originalError: error instanceof Error ? error.message : String(error) },
  );
  
  const response = createApiErrorResponse(systemError);
  return res.status(systemError.statusCode).json(response);
}

// Healthcare-Specific Error Factories
export const MedicalErrors = {
  invalidPatientData: (details?: unknown, correlationId?: string) =>
    new ValidationError('Invalid patient data provided', details, correlationId),
    
  caseNotFound: (caseId: string, correlationId?: string) =>
    new NotFoundError('Medical Case', caseId, correlationId),
    
  professionalUnavailable: (professionalId?: string, correlationId?: string) =>
    new StandardizedError(
      'Medical professional is currently unavailable',
      MEDICAL_ERROR_CODES.PROFESSIONAL_UNAVAILABLE,
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      {
        details: { professionalId },
        correlationId,
        severity: 'MEDIUM',
        category: 'BUSINESS_LOGIC',
        retryable: true,
      },
    ),
    
  fileProcessingFailed: (filename: string, reason: string, correlationId?: string) =>
    new StandardizedError(
      'Medical document processing failed',
      MEDICAL_ERROR_CODES.FILE_PROCESSING_FAILED,
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
      {
        details: { filename, reason },
        correlationId,
        severity: 'MEDIUM',
        category: 'SYSTEM',
        retryable: true,
      },
    ),
    
  hipaaViolation: (details: unknown, userId?: string, correlationId?: string) =>
    new StandardizedError(
      'HIPAA compliance violation detected',
      MEDICAL_ERROR_CODES.PHI_ACCESS_VIOLATION,
      HTTP_STATUS.FORBIDDEN,
      {
        details,
        userId,
        correlationId,
        severity: 'CRITICAL',
        category: 'COMPLIANCE',
        retryable: false,
      },
    ),
    
  paymentFailed: (paymentId: string, reason: string, correlationId?: string) =>
    new StandardizedError(
      'Payment processing failed',
      MEDICAL_ERROR_CODES.PAYMENT_PROCESSING_FAILED,
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
      {
        details: { paymentId, reason },
        correlationId,
        severity: 'HIGH',
        category: 'BUSINESS_LOGIC',
        retryable: false,
      },
    ),
};

// Export types for use across the application
export type { MedicalError, ApiErrorResponse };