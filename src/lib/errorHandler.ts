// Comprehensive error handling library for medical second opinion platform
import { NextResponse } from 'next/server';

// Error codes for consistent error handling
export enum ErrorCodes {
  // Authentication & Authorization
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  
  // Validation
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELDS = 'MISSING_REQUIRED_FIELDS',
  
  // Professional Recruitment
  PROFESSIONAL_NOT_FOUND = 'PROFESSIONAL_NOT_FOUND',
  INVALID_COMPETENCY_DATA = 'INVALID_COMPETENCY_DATA',
  DOCUMENT_ANALYSIS_FAILED = 'DOCUMENT_ANALYSIS_FAILED',
  
  // File Upload
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE = 'INVALID_FILE_TYPE',
  UPLOAD_FAILED = 'UPLOAD_FAILED',
  
  // Database
  DATABASE_ERROR = 'DATABASE_ERROR',
  RECORD_NOT_FOUND = 'RECORD_NOT_FOUND',
  CONSTRAINT_VIOLATION = 'CONSTRAINT_VIOLATION',
  
  // External Services
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  
  // System
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
}

export interface ErrorDetails {
  code: ErrorCodes;
  message: string;
  statusCode: number;
  details?: any;
  timestamp?: string;
  requestId?: string;
  userMessage?: string; // User-friendly message for UI
}

export class ApplicationError extends Error {
  public readonly code: ErrorCodes;
  public readonly statusCode: number;
  public readonly details?: any;
  public readonly timestamp: string;
  public readonly requestId?: string;
  public readonly userMessage?: string;

  constructor(errorDetails: ErrorDetails) {
    super(errorDetails.message);
    this.name = 'ApplicationError';
    this.code = errorDetails.code;
    this.statusCode = errorDetails.statusCode;
    this.details = errorDetails.details;
    this.timestamp = errorDetails.timestamp || new Date().toISOString();
    this.requestId = errorDetails.requestId;
    this.userMessage = errorDetails.userMessage;
    
    Error.captureStackTrace(this, ApplicationError);
  }
}

// Predefined error factories
export const ErrorFactory = {
  unauthorized(message: string = 'Authentication required'): ApplicationError {
    return new ApplicationError({
      code: ErrorCodes.UNAUTHORIZED,
      message,
      statusCode: 401,
      userMessage: 'Please log in to continue'
    });
  },

  forbidden(message: string = 'Insufficient permissions'): ApplicationError {
    return new ApplicationError({
      code: ErrorCodes.INSUFFICIENT_PERMISSIONS,
      message,
      statusCode: 403,
      userMessage: 'You do not have permission to perform this action'
    });
  },

  validationError(message: string, details?: any): ApplicationError {
    return new ApplicationError({
      code: ErrorCodes.VALIDATION_ERROR,
      message,
      statusCode: 400,
      details,
      userMessage: 'Please check your input and try again'
    });
  },

  fileUploadError(message: string, details?: any): ApplicationError {
    return new ApplicationError({
      code: ErrorCodes.UPLOAD_FAILED,
      message,
      statusCode: 400,
      details,
      userMessage: 'File upload failed. Please try again with a valid file.'
    });
  },

  professionalNotFound(professionalId: string): ApplicationError {
    return new ApplicationError({
      code: ErrorCodes.PROFESSIONAL_NOT_FOUND,
      message: `Professional with ID ${professionalId} not found`,
      statusCode: 404,
      details: { professionalId },
      userMessage: 'Professional profile not found'
    });
  },

  databaseError(message: string, originalError?: Error): ApplicationError {
    return new ApplicationError({
      code: ErrorCodes.DATABASE_ERROR,
      message: `Database operation failed: ${message}`,
      statusCode: 500,
      details: { originalError: originalError?.message },
      userMessage: 'A system error occurred. Please try again later.'
    });
  },

  externalServiceError(service: string, originalError?: Error): ApplicationError {
    return new ApplicationError({
      code: ErrorCodes.EXTERNAL_SERVICE_ERROR,
      message: `External service error: ${service}`,
      statusCode: 503,
      details: { service, originalError: originalError?.message },
      userMessage: 'A service is temporarily unavailable. Please try again later.'
    });
  },

  rateLimitExceeded(resetTime?: number): ApplicationError {
    return new ApplicationError({
      code: ErrorCodes.RATE_LIMIT_EXCEEDED,
      message: 'Rate limit exceeded',
      statusCode: 429,
      details: { resetTime },
      userMessage: 'Too many requests. Please wait before trying again.'
    });
  },

  internalServerError(message: string = 'Internal server error'): ApplicationError {
    return new ApplicationError({
      code: ErrorCodes.INTERNAL_SERVER_ERROR,
      message,
      statusCode: 500,
      userMessage: 'An unexpected error occurred. Please try again later.'
    });
  }
};

// Error handler middleware for Next.js API routes
export function handleApiError(error: unknown, requestId?: string): NextResponse {
  console.error('API Error:', error);

  let applicationError: ApplicationError;

  if (error instanceof ApplicationError) {
    applicationError = error;
  } else if (error instanceof Error) {
    // Convert known errors to ApplicationError
    if (error.message.includes('Prisma')) {
      applicationError = ErrorFactory.databaseError(error.message, error);
    } else if (error.message.includes('CORS')) {
      applicationError = ErrorFactory.validationError('CORS policy violation', { originalError: error.message });
    } else if (error.message.includes('timeout')) {
      applicationError = new ApplicationError({
        code: ErrorCodes.TIMEOUT_ERROR,
        message: 'Request timeout',
        statusCode: 408,
        userMessage: 'The request took too long. Please try again.'
      });
    } else {
      applicationError = ErrorFactory.internalServerError(error.message);
    }
  } else {
    applicationError = ErrorFactory.internalServerError('Unknown error occurred');
  }

  // Add request ID if provided
  if (requestId && !applicationError.requestId) {
    applicationError.requestId = requestId;
  }

  // Security: Don't expose internal details in production
  const isProduction = process.env.NODE_ENV === 'production';
  const responseBody = {
    success: false,
    error: {
      code: applicationError.code,
      message: isProduction ? applicationError.userMessage || 'An error occurred' : applicationError.message,
      ...(applicationError.requestId && { requestId: applicationError.requestId }),
      timestamp: applicationError.timestamp,
      ...(applicationError.statusCode === 429 && applicationError.details?.resetTime && {
        retryAfter: Math.ceil((applicationError.details.resetTime - Date.now()) / 1000)
      }),
      ...(!isProduction && applicationError.details && { details: applicationError.details })
    }
  };

  return NextResponse.json(responseBody, { 
    status: applicationError.statusCode,
    headers: {
      'Content-Type': 'application/json',
      ...(applicationError.statusCode === 429 && {
        'Retry-After': String(Math.ceil((applicationError.details?.resetTime - Date.now()) / 1000))
      })
    }
  });
}

// Express.js error handler middleware
export function expressErrorHandler() {
  return (error: unknown, req: any, res: any, next: any) => {
    console.error('Express Error:', error);

    let applicationError: ApplicationError;

    if (error instanceof ApplicationError) {
      applicationError = error;
    } else if (error instanceof Error) {
      if (error.message.includes('validation')) {
        applicationError = ErrorFactory.validationError(error.message);
      } else {
        applicationError = ErrorFactory.internalServerError(error.message);
      }
    } else {
      applicationError = ErrorFactory.internalServerError('Unknown error occurred');
    }

    const isProduction = process.env.NODE_ENV === 'production';
    const responseBody = {
      success: false,
      error: {
        code: applicationError.code,
        message: isProduction ? applicationError.userMessage || 'An error occurred' : applicationError.message,
        timestamp: applicationError.timestamp,
        ...(applicationError.requestId && { requestId: applicationError.requestId }),
        ...(!isProduction && applicationError.details && { details: applicationError.details })
      }
    };

    res.status(applicationError.statusCode).json(responseBody);
  };
}

// Async wrapper for route handlers
export function asyncHandler(fn: Function) {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Request ID generator for tracing
export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Health check error types
export function createHealthCheckError(service: string, error: Error): ApplicationError {
  return new ApplicationError({
    code: ErrorCodes.SERVICE_UNAVAILABLE,
    message: `Health check failed for ${service}`,
    statusCode: 503,
    details: { 
      service, 
      error: error.message,
      timestamp: new Date().toISOString()
    },
    userMessage: `${service} is currently unavailable`
  });
}

// Audit logging for errors
export function logSecurityError(error: ApplicationError, context: any = {}) {
  const securityLog = {
    timestamp: new Date().toISOString(),
    level: 'SECURITY_ERROR',
    error: {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode
    },
    context: {
      userAgent: context.userAgent,
      ip: context.ip,
      userId: context.userId,
      action: context.action,
      resource: context.resource
    },
    requestId: error.requestId
  };

  // In production, send to security monitoring system
  if (process.env.NODE_ENV === 'production') {
    // Send to external logging service (e.g., DataDog, Splunk)
    console.error('SECURITY_AUDIT:', JSON.stringify(securityLog));
  } else {
    console.error('Security Error:', securityLog);
  }
}

// GDPR/HIPAA compliant error logging (no PII)
export function logComplianceError(error: ApplicationError, sanitizedContext: any = {}) {
  const complianceLog = {
    timestamp: new Date().toISOString(),
    level: 'COMPLIANCE_ERROR',
    error: {
      code: error.code,
      statusCode: error.statusCode,
      // No error message to avoid PII leakage
    },
    context: {
      // Only log non-PII information
      action: sanitizedContext.action,
      resource: sanitizedContext.resource,
      sessionType: sanitizedContext.sessionType // e.g., 'professional', 'customer'
    },
    requestId: error.requestId
  };

  console.error('COMPLIANCE_AUDIT:', JSON.stringify(complianceLog));
}