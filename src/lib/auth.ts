import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be set and at least 32 characters long');
}
const API_KEY_HEADER = 'x-api-key';
const BEARER_TOKEN_HEADER = 'authorization';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: 'customer' | 'professional' | 'admin';
  customerId?: string;
  professionalId?: string;
}

export interface ApiAuthResult {
  success: boolean;
  user?: AuthenticatedUser;
  error?: string;
  statusCode?: number;
}

export interface JWTPayload {
  userId: string;
  iat: number;
  exp: number;
}

/**
 * Extract and verify JWT token from Authorization header
 */
export async function verifyJWTToken(token: string): Promise<AuthenticatedUser | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    
    if (!decoded.userId) {
      return null;
    }
    
    // Verify user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        customer: true,
        professional: true,
      }
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.customer ? 'customer' : user.professional ? 'professional' : 'admin',
      customerId: user.customer?.id,
      professionalId: user.professional?.id,
    };
  } catch (error) {
    // Log error securely without exposing sensitive data
    if (error instanceof Error) {
      console.warn('JWT verification failed: Invalid or expired token');
    }
    return null;
  }
}

/**
 * Extract Bearer token from Authorization header
 */
export function extractBearerToken(authHeader: string): string | null {
  if (!authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

/**
 * Authenticate user from request headers
 */
export async function authenticateRequest(request: NextRequest): Promise<ApiAuthResult> {
  try {
    const authHeader = request.headers.get(BEARER_TOKEN_HEADER);
    const apiKey = request.headers.get(API_KEY_HEADER);

    // Check for API key authentication (for internal services)
    if (apiKey) {
      if (apiKey === process.env.INTERNAL_API_KEY) {
        return {
          success: true,
          user: {
            id: 'system',
            email: 'system@internal',
            role: 'admin'
          }
        };
      } else {
        return {
          success: false,
          error: 'Invalid API key',
          statusCode: 401
        };
      }
    }

    // Check for JWT authentication
    if (!authHeader) {
      return {
        success: false,
        error: 'Authorization header required',
        statusCode: 401
      };
    }

    const token = extractBearerToken(authHeader);
    if (!token) {
      return {
        success: false,
        error: 'Invalid authorization header format',
        statusCode: 401
      };
    }

    const user = await verifyJWTToken(token);
    if (!user) {
      return {
        success: false,
        error: 'Invalid or expired token',
        statusCode: 401
      };
    }

    return {
      success: true,
      user
    };

  } catch (error) {
    console.warn('Authentication failed: System error occurred');
    return {
      success: false,
      error: 'Authentication failed',
      statusCode: 500
    };
  }
}

/**
 * Authorize user for specific customer access
 */
export function authorizeCustomerAccess(user: AuthenticatedUser, customerId: string): boolean {
  // System/admin users can access any customer
  if (user.role === 'admin' || user.id === 'system') {
    return true;
  }

  // Customer users can only access their own data
  if (user.role === 'customer') {
    return user.customerId === customerId;
  }

  // Professional users can access customers they are assigned to
  if (user.role === 'professional') {
    // This would need additional logic to check professional-customer assignments
    // For now, returning false for security
    return false;
  }

  return false;
}

/**
 * Generate JWT token for user
 */
export function generateJWTToken(userId: string, expiresIn: string = '24h'): string {
  return jwt.sign(
    { userId, iat: Math.floor(Date.now() / 1000) },
    JWT_SECRET,
    { expiresIn }
  );
}

/**
 * Rate limiting storage (in-memory for demo - use Redis in production)
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  skipSuccessfulRequests?: boolean;
}

/**
 * Check rate limit for a given key
 */
export function checkRateLimit(
  key: string, 
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || now > current.resetTime) {
    // First request or window expired
    const resetTime = now + config.windowMs;
    rateLimitStore.set(key, { count: 1, resetTime });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime
    };
  }

  if (current.count >= config.maxRequests) {
    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetTime: current.resetTime
    };
  }

  // Increment counter
  current.count++;
  rateLimitStore.set(key, current);

  return {
    allowed: true,
    remaining: config.maxRequests - current.count,
    resetTime: current.resetTime
  };
}

/**
 * Get rate limit key from request
 */
export function getRateLimitKey(request: NextRequest, user?: AuthenticatedUser): string {
  if (user) {
    return `user:${user.id}`;
  }

  // Fall back to IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return `ip:${ip}`;
}

/**
 * CORS configuration
 */
export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key, x-rate-limit',
  'Access-Control-Expose-Headers': 'x-rate-limit-remaining, x-rate-limit-reset',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Credentials': 'true',
};

/**
 * Apply CORS headers to response
 */
export function applyCORSHeaders(headers: Record<string, string>): Record<string, string> {
  return {
    ...headers,
    ...CORS_HEADERS,
  };
}