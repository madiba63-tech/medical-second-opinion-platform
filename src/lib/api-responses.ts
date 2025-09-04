/**
 * Standardized API Response Formats for Medical Second Opinion Platform
 * Healthcare Industry Compliant Response Management
 * 
 * This module provides consistent API response patterns across all services
 * with HIPAA compliance, audit trail support, and standardized pagination.
 */

import { NextResponse } from 'next/server';
import { HTTP_STATUS } from './errors';

// Standard Success Response Interface
export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
  timestamp: string;
  correlationId?: string;
  metadata?: ResponseMetadata;
}

// Pagination Interface
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Response Metadata for Healthcare Context
export interface ResponseMetadata {
  version: string;
  requestId?: string;
  processingTime?: number;
  cacheStatus?: 'HIT' | 'MISS' | 'BYPASS';
  warnings?: string[];
  pagination?: PaginationMeta;
  hipaaCompliant: boolean;
  auditTrail?: {
    action: string;
    timestamp: string;
    userId?: string;
    sessionId?: string;
  };
}

// Healthcare-Specific Response Types
export interface MedicalCaseResponse {
  id: string;
  caseNumber: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  patientInfo?: {
    // PHI should be minimal in responses
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string; // Consider age instead for privacy
    gender?: string;
  };
}

export interface ProfessionalResponse {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  specialization: string[];
  availability: boolean;
  rating?: number;
  credentials: {
    verified: boolean;
    licenseNumber: string; // Partial for privacy
    expirationDate: string;
  };
}

export interface FileUploadResponse {
  fileId: string;
  filename: string;
  size: number;
  mimetype: string;
  category: string;
  uploadedAt: string;
  encrypted: boolean;
  virusScanStatus: 'PENDING' | 'CLEAN' | 'INFECTED' | 'ERROR';
}

// Response Creation Utilities
export class ApiResponseBuilder {
  private correlationId?: string;
  private startTime?: number;

  constructor(correlationId?: string) {
    this.correlationId = correlationId;
    this.startTime = Date.now();
  }

  /**
   * Create a successful response with standardized format
   */
  public success<T>(
    data: T,
    message?: string,
    statusCode: number = HTTP_STATUS.OK,
    additionalMetadata?: Partial<ResponseMetadata>,
  ): NextResponse {
    const response: ApiSuccessResponse<T> = {
      success: true,
      data: this.sanitizeResponseData(data),
      message,
      timestamp: new Date().toISOString(),
      correlationId: this.correlationId,
      metadata: this.buildMetadata(additionalMetadata),
    };

    return NextResponse.json(response, { status: statusCode });
  }

  /**
   * Create a paginated response
   */
  public paginated<T>(
    data: T[],
    pagination: PaginationMeta,
    message?: string,
    additionalMetadata?: Partial<ResponseMetadata>,
  ): NextResponse {
    return this.success(
      data,
      message,
      HTTP_STATUS.OK,
      {
        ...additionalMetadata,
        pagination,
      },
    );
  }

  /**
   * Create a created response (201)
   */
  public created<T>(
    data: T,
    message: string = 'Resource created successfully',
    additionalMetadata?: Partial<ResponseMetadata>,
  ): NextResponse {
    return this.success(data, message, HTTP_STATUS.CREATED, additionalMetadata);
  }

  /**
   * Create an accepted response (202) for async operations
   */
  public accepted(
    message: string = 'Request accepted for processing',
    trackingInfo?: { jobId: string; statusUrl: string },
    additionalMetadata?: Partial<ResponseMetadata>,
  ): NextResponse {
    return this.success(
      trackingInfo || { status: 'PROCESSING' },
      message,
      HTTP_STATUS.ACCEPTED,
      additionalMetadata,
    );
  }

  /**
   * Create a no content response (204)
   */
  public noContent(): NextResponse {
    return new NextResponse(null, { status: HTTP_STATUS.NO_CONTENT });
  }

  private buildMetadata(additionalMetadata?: Partial<ResponseMetadata>): ResponseMetadata {
    return {
      version: '2.0',
      requestId: this.correlationId,
      processingTime: this.startTime ? Date.now() - this.startTime : undefined,
      hipaaCompliant: true, // Assume HIPAA compliance by default
      ...additionalMetadata,
    };
  }

  private sanitizeResponseData(data: any): any {
    // Remove sensitive fields from response data
    if (!data || typeof data !== 'object') {
      return data;
    }

    const sensitiveFields = [
      'password',
      'hashedPassword',
      'token',
      'secret',
      'apiKey',
      'ssn',
      'socialSecurityNumber',
      'creditCardNumber',
      'bankAccount',
      'medicalRecordNumber',
    ];

    const sanitizeObject = (obj: any): any => {
      if (Array.isArray(obj)) {
        return obj.map(item => sanitizeObject(item));
      }

      if (typeof obj !== 'object' || obj === null) {
        return obj;
      }

      const sanitized = { ...obj };

      for (const field of sensitiveFields) {
        if (field in sanitized) {
          delete sanitized[field];
        }
      }

      // Recursively sanitize nested objects
      for (const key in sanitized) {
        if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
          sanitized[key] = sanitizeObject(sanitized[key]);
        }
      }

      return sanitized;
    };

    return sanitizeObject(data);
  }
}

// Factory Functions for Common Response Types
export const ApiResponses = {
  /**
   * Create a medical case response with proper data sanitization
   */
  medicalCase: (
    caseData: any,
    message?: string,
    correlationId?: string,
  ): NextResponse => {
    const builder = new ApiResponseBuilder(correlationId);
    
    const sanitizedCase: MedicalCaseResponse = {
      id: caseData.id,
      caseNumber: caseData.caseNumber,
      status: caseData.status,
      priority: caseData.priority,
      createdAt: caseData.createdAt,
      updatedAt: caseData.updatedAt,
      patientInfo: caseData.patientInfo ? {
        firstName: caseData.patientInfo.firstName,
        lastName: caseData.patientInfo.lastName?.[0] + '***', // Partially hide surname
        gender: caseData.patientInfo.gender,
        // Omit date of birth - use age calculation instead
      } : undefined,
    };

    return builder.success(sanitizedCase, message);
  },

  /**
   * Create a professional response with credential verification
   */
  professional: (
    professionalData: any,
    message?: string,
    correlationId?: string,
  ): NextResponse => {
    const builder = new ApiResponseBuilder(correlationId);
    
    const professionalResponse: ProfessionalResponse = {
      id: professionalData.id,
      firstName: professionalData.firstName,
      lastName: professionalData.lastName,
      title: professionalData.title,
      specialization: professionalData.specialization || [],
      availability: professionalData.availability || false,
      rating: professionalData.rating,
      credentials: {
        verified: professionalData.credentialsVerified || false,
        licenseNumber: professionalData.licenseNumber ? 
          professionalData.licenseNumber.substring(0, 4) + '***' : 'N/A',
        expirationDate: professionalData.licenseExpiration,
      },
    };

    return builder.success(professionalResponse, message);
  },

  /**
   * Create a file upload response with security information
   */
  fileUpload: (
    fileData: any,
    message?: string,
    correlationId?: string,
  ): NextResponse => {
    const builder = new ApiResponseBuilder(correlationId);
    
    const fileResponse: FileUploadResponse = {
      fileId: fileData.id,
      filename: fileData.filename,
      size: fileData.size,
      mimetype: fileData.mimetype,
      category: fileData.category,
      uploadedAt: fileData.createdAt || new Date().toISOString(),
      encrypted: fileData.encrypted || true,
      virusScanStatus: fileData.virusScanStatus || 'PENDING',
    };

    return builder.success(fileResponse, message);
  },

  /**
   * Create a paginated list response
   */
  paginatedList: <T>(
    items: T[],
    page: number,
    limit: number,
    total: number,
    message?: string,
    correlationId?: string,
  ): NextResponse => {
    const builder = new ApiResponseBuilder(correlationId);
    
    const pagination: PaginationMeta = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPreviousPage: page > 1,
    };

    return builder.paginated(items, pagination, message);
  },

  /**
   * Create an async operation response
   */
  asyncOperation: (
    jobId: string,
    statusUrl: string,
    estimatedCompletion?: string,
    correlationId?: string,
  ): NextResponse => {
    const builder = new ApiResponseBuilder(correlationId);
    
    return builder.accepted(
      'Operation started successfully',
      {
        jobId,
        statusUrl,
        estimatedCompletion: estimatedCompletion || 'Unknown',
      },
    );
  },

  /**
   * Create a health check response
   */
  healthCheck: (
    service: string,
    status: 'healthy' | 'degraded' | 'unhealthy',
    dependencies?: Array<{ name: string; status: string; latency?: number }>,
    correlationId?: string,
  ): NextResponse => {
    const builder = new ApiResponseBuilder(correlationId);
    
    const healthData = {
      service,
      status,
      timestamp: new Date().toISOString(),
      version: '2.0',
      dependencies: dependencies || [],
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    };

    const statusCode = status === 'healthy' ? HTTP_STATUS.OK : 
                      status === 'degraded' ? HTTP_STATUS.OK : 
                      HTTP_STATUS.SERVICE_UNAVAILABLE;

    return builder.success(healthData, `Service is ${status}`, statusCode);
  },
};

// Utility functions for common response patterns
export function createPaginationMeta(
  page: number,
  limit: number,
  total: number,
): PaginationMeta {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page < Math.ceil(total / limit),
    hasPreviousPage: page > 1,
  };
}

export function extractPaginationParams(searchParams: URLSearchParams): {
  page: number;
  limit: number;
  offset: number;
} {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10', 10))); // Max 100 items
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

export function generateCorrelationId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

// Express.js response helpers for microservices
export const ExpressResponses = {
  success: (res: any, data: any, message?: string, statusCode: number = 200) => {
    return res.status(statusCode).json({
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    });
  },

  error: (res: any, error: string, code: string, statusCode: number = 500, details?: any) => {
    return res.status(statusCode).json({
      success: false,
      error,
      code,
      details,
      timestamp: new Date().toISOString(),
    });
  },

  paginated: (res: any, data: any[], page: number, limit: number, total: number, message?: string) => {
    const pagination = createPaginationMeta(page, limit, total);
    
    return res.status(200).json({
      success: true,
      data,
      message,
      pagination,
      timestamp: new Date().toISOString(),
    });
  },
};

// Export types for use across the application
export type {
  ApiSuccessResponse,
  PaginationMeta,
  ResponseMetadata,
  MedicalCaseResponse,
  ProfessionalResponse,
  FileUploadResponse,
};