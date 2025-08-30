import { NextRequest, NextResponse } from 'next/server';
import { ZodError, ZodSchema } from 'zod';
import { 
  authenticateRequest, 
  checkRateLimit, 
  getRateLimitKey, 
  applyCORSHeaders,
  AuthenticatedUser,
  RateLimitConfig 
} from './auth';
import { ErrorResponse } from './validations/caseSubmission';

/**
 * API Utilities for Case Submission Endpoints
 * 
 * Provides middleware-like functionality for authentication, rate limiting,
 * validation, and error handling across all API endpoints.
 */

export interface ApiHandlerOptions {
  requireAuth?: boolean;
  rateLimit?: RateLimitConfig;
  validation?: {
    body?: ZodSchema;
    query?: ZodSchema;
    params?: ZodSchema;
  };
  allowedMethods?: string[];
  corsEnabled?: boolean;
}

export interface ApiContext {
  user?: AuthenticatedUser;
  validatedBody?: any;
  validatedQuery?: any;
  validatedParams?: any;
  request: NextRequest;
}

export type ApiHandler = (context: ApiContext) => Promise<NextResponse>;

/**
 * Rate limit configurations for different endpoint types
 */
export const RATE_LIMITS: Record<string, RateLimitConfig> = {
  // Strict limits for submission endpoints
  submission: {
    maxRequests: 5,
    windowMs: 60 * 1000, // 1 minute
  },
  
  // More lenient for validation endpoints
  validation: {
    maxRequests: 20,
    windowMs: 60 * 1000, // 1 minute
  },
  
  // Analytics can be called frequently
  analytics: {
    maxRequests: 50,
    windowMs: 60 * 1000, // 1 minute
  },
  
  // File uploads need stricter limits
  upload: {
    maxRequests: 10,
    windowMs: 5 * 60 * 1000, // 5 minutes
  },
  
  // Webhooks should have high limits for reliability
  webhook: {
    maxRequests: 100,
    windowMs: 60 * 1000, // 1 minute
  },
  
  // General API endpoints
  default: {
    maxRequests: 30,
    windowMs: 60 * 1000, // 1 minute
  },
};

/**
 * Create standardized error response
 */
export function createErrorResponse(
  error: string,
  statusCode: number = 400,
  details?: any,
  request?: NextRequest
): NextResponse {
  const errorResponse: ErrorResponse = {
    success: false,
    error,
    details,
    timestamp: new Date().toISOString(),
    path: request?.nextUrl.pathname || 'unknown',
    statusCode,
  };

  const headers = applyCORSHeaders({
    'Content-Type': 'application/json',
  });

  return NextResponse.json(errorResponse, { 
    status: statusCode,
    headers 
  });
}

/**
 * Create standardized success response
 */
export function createSuccessResponse(
  data: any,
  statusCode: number = 200,
  additionalHeaders?: Record<string, string>
): NextResponse {
  const response = {
    success: true,
    ...data,
    timestamp: new Date().toISOString(),
  };

  const headers = applyCORSHeaders({
    'Content-Type': 'application/json',
    ...additionalHeaders,
  });

  return NextResponse.json(response, { 
    status: statusCode,
    headers 
  });
}

/**
 * Create rate limit exceeded response
 */
export function createRateLimitResponse(
  remaining: number,
  resetTime: number,
  maxRequests: number
): NextResponse {
  const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);
  
  const headers = applyCORSHeaders({
    'Content-Type': 'application/json',
    'X-RateLimit-Limit': maxRequests.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': Math.floor(resetTime / 1000).toString(),
    'Retry-After': retryAfter.toString(),
  });

  return NextResponse.json({
    success: false,
    error: 'Rate limit exceeded',
    retryAfter,
    limit: maxRequests,
    remaining,
    resetTime: Math.floor(resetTime / 1000),
  }, { 
    status: 429,
    headers 
  });
}

/**
 * Validate request data using Zod schemas
 */
export async function validateRequestData(
  request: NextRequest,
  validation: ApiHandlerOptions['validation']
) {
  const result: {
    body?: any;
    query?: any;
    params?: any;
    errors: string[];
  } = { errors: [] };

  // Validate body
  if (validation?.body) {
    try {
      const body = await request.json().catch(() => ({}));
      result.body = validation.body.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        result.errors.push(...error.errors.map(e => `Body ${e.path.join('.')}: ${e.message}`));
      } else {
        result.errors.push('Invalid request body format');
      }
    }
  }

  // Validate query parameters
  if (validation?.query) {
    try {
      const { searchParams } = new URL(request.url);
      const queryObj = Object.fromEntries(searchParams.entries());
      result.query = validation.query.parse(queryObj);
    } catch (error) {
      if (error instanceof ZodError) {
        result.errors.push(...error.errors.map(e => `Query ${e.path.join('.')}: ${e.message}`));
      } else {
        result.errors.push('Invalid query parameters');
      }
    }
  }

  // Validate path parameters (would need to be extracted from the route)
  if (validation?.params) {
    try {
      // This would be populated by the specific route handler
      result.params = {};
    } catch (error) {
      if (error instanceof ZodError) {
        result.errors.push(...error.errors.map(e => `Param ${e.path.join('.')}: ${e.message}`));
      }
    }
  }

  return result;
}

/**
 * Main API handler wrapper with all middleware functionality
 */
export function createApiHandler(handler: ApiHandler, options: ApiHandlerOptions = {}) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      // Handle CORS preflight
      if (request.method === 'OPTIONS') {
        return new NextResponse(null, { 
          status: 200, 
          headers: applyCORSHeaders({})
        });
      }

      // Check allowed methods
      if (options.allowedMethods && !options.allowedMethods.includes(request.method)) {
        return createErrorResponse(
          `Method ${request.method} not allowed`,
          405,
          { allowedMethods: options.allowedMethods },
          request
        );
      }

      // Authentication
      let user: AuthenticatedUser | undefined;
      if (options.requireAuth) {
        const authResult = await authenticateRequest(request);
        if (!authResult.success) {
          return createErrorResponse(
            authResult.error || 'Authentication failed',
            authResult.statusCode || 401,
            undefined,
            request
          );
        }
        user = authResult.user;
      }

      // Rate limiting
      if (options.rateLimit) {
        const rateLimitKey = getRateLimitKey(request, user);
        const rateLimitResult = checkRateLimit(rateLimitKey, options.rateLimit);
        
        if (!rateLimitResult.allowed) {
          console.warn(`Rate limit exceeded for key: ${rateLimitKey}`);
          return createRateLimitResponse(
            rateLimitResult.remaining,
            rateLimitResult.resetTime,
            options.rateLimit.maxRequests
          );
        }

        // Add rate limit headers to successful responses
        // This will be handled by the success response creation
      }

      // Request validation
      let validatedBody, validatedQuery, validatedParams;
      if (options.validation) {
        const validationResult = await validateRequestData(request, options.validation);
        
        if (validationResult.errors.length > 0) {
          return createErrorResponse(
            'Validation failed',
            400,
            { validationErrors: validationResult.errors },
            request
          );
        }

        validatedBody = validationResult.body;
        validatedQuery = validationResult.query;
        validatedParams = validationResult.params;
      }

      // Create context and call handler
      const context: ApiContext = {
        user,
        validatedBody,
        validatedQuery,
        validatedParams,
        request,
      };

      const response = await handler(context);

      // Add rate limit headers to successful responses
      if (options.rateLimit && user) {
        const rateLimitKey = getRateLimitKey(request, user);
        const rateLimitResult = checkRateLimit(rateLimitKey, options.rateLimit);
        
        response.headers.set('X-RateLimit-Limit', options.rateLimit.maxRequests.toString());
        response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
        response.headers.set('X-RateLimit-Reset', Math.floor(rateLimitResult.resetTime / 1000).toString());
      }

      // Apply CORS headers if enabled
      if (options.corsEnabled !== false) {
        Object.entries(applyCORSHeaders({})).forEach(([key, value]) => {
          response.headers.set(key, value);
        });
      }

      return response;

    } catch (error) {
      console.error('API handler error:', error);
      
      // Handle specific error types
      if (error instanceof ZodError) {
        return createErrorResponse(
          'Validation error',
          400,
          { validationErrors: error.errors },
          request
        );
      }

      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          return createErrorResponse(
            'Request timeout',
            408,
            undefined,
            request
          );
        }

        if (error.message.includes('not found')) {
          return createErrorResponse(
            'Resource not found',
            404,
            undefined,
            request
          );
        }
      }

      return createErrorResponse(
        'Internal server error',
        500,
        process.env.NODE_ENV === 'development' ? { 
          stack: error instanceof Error ? error.stack : undefined 
        } : undefined,
        request
      );
    }
  };
}

/**
 * Logging utilities
 */
export function logApiRequest(
  request: NextRequest,
  user?: AuthenticatedUser,
  duration?: number,
  statusCode?: number
) {
  const logData = {
    method: request.method,
    path: request.nextUrl.pathname,
    userAgent: request.headers.get('user-agent'),
    userId: user?.id,
    customerId: user?.customerId,
    ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    duration,
    statusCode,
    timestamp: new Date().toISOString(),
  };

  // In production, this would go to a proper logging service
  console.log('API Request:', JSON.stringify(logData));
}

/**
 * Health check endpoint utility
 */
export function createHealthCheckResponse(services?: Record<string, boolean>): NextResponse {
  const status = services ? Object.values(services).every(Boolean) : true;
  
  return createSuccessResponse({
    status: status ? 'healthy' : 'unhealthy',
    services,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
  }, status ? 200 : 503);
}

/**
 * Pagination utilities
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export function parsePaginationParams(searchParams: URLSearchParams): PaginationParams {
  return {
    page: Math.max(1, parseInt(searchParams.get('page') || '1')),
    limit: Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '25'))),
    sortBy: searchParams.get('sortBy') || undefined,
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
  };
}

export function createPaginatedResponse(
  data: any[],
  totalCount: number,
  pagination: PaginationParams
) {
  const totalPages = Math.ceil(totalCount / (pagination.limit || 25));
  
  return {
    data,
    pagination: {
      page: pagination.page || 1,
      limit: pagination.limit || 25,
      total: totalCount,
      totalPages,
      hasNext: (pagination.page || 1) < totalPages,
      hasPrev: (pagination.page || 1) > 1,
    },
  };
}