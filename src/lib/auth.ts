/**
 * Standardized Authentication & Authorization for Medical Second Opinion Platform
 * Healthcare Industry Compliant Security with HIPAA Protection
 * 
 * This module provides consistent authentication and authorization patterns
 * with JWT management, role-based access control, and security audit logging.
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { createHealthcareLogger } from './logging';
import { StandardizedError, MEDICAL_ERROR_CODES, HTTP_STATUS, AuthenticationError, AuthorizationError } from './errors';

// User Types and Roles
export enum UserRole {
  PATIENT = 'PATIENT',
  PROFESSIONAL = 'PROFESSIONAL', 
  ADMIN = 'ADMIN',
  SUPPORT = 'SUPPORT',
  SYSTEM = 'SYSTEM',
}

export enum Permission {
  // Case Management
  CREATE_CASE = 'CREATE_CASE',
  READ_OWN_CASES = 'READ_OWN_CASES',
  READ_ALL_CASES = 'READ_ALL_CASES',
  UPDATE_CASE = 'UPDATE_CASE',
  DELETE_CASE = 'DELETE_CASE',
  
  // Professional Management
  CREATE_PROFESSIONAL = 'CREATE_PROFESSIONAL',
  READ_PROFESSIONAL = 'READ_PROFESSIONAL',
  UPDATE_PROFESSIONAL = 'UPDATE_PROFESSIONAL',
  VERIFY_CREDENTIALS = 'VERIFY_CREDENTIALS',
  
  // Patient Management
  CREATE_PATIENT = 'CREATE_PATIENT',
  READ_PATIENT = 'READ_PATIENT',
  UPDATE_PATIENT = 'UPDATE_PATIENT',
  READ_PHI = 'READ_PHI',
  
  // Administrative
  ADMIN_ACCESS = 'ADMIN_ACCESS',
  USER_MANAGEMENT = 'USER_MANAGEMENT',
  SYSTEM_CONFIG = 'SYSTEM_CONFIG',
  AUDIT_ACCESS = 'AUDIT_ACCESS',
  
  // File Management
  UPLOAD_FILES = 'UPLOAD_FILES',
  DOWNLOAD_FILES = 'DOWNLOAD_FILES',
  DELETE_FILES = 'DELETE_FILES',
  
  // AI Services
  USE_AI_ANALYSIS = 'USE_AI_ANALYSIS',
  CONFIGURE_AI = 'CONFIGURE_AI',
}

// Authenticated User (simplified interface for API utils)
export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
}

// JWT Token Payload
export interface JWTPayload {
  sub: string; // User ID
  email: string;
  role: UserRole;
  permissions: Permission[];
  sessionId: string;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
  twoFactorVerified?: boolean;
  professionalId?: string;
  patientId?: string;
  organizationId?: string;
}

// Session Information
export interface SessionInfo {
  userId: string;
  sessionId: string;
  role: UserRole;
  permissions: Permission[];
  email: string;
  isActive: boolean;
  lastActivity: Date;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  twoFactorVerified?: boolean;
}

// Role-based permissions mapping
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.PATIENT]: [
    Permission.CREATE_CASE,
    Permission.READ_OWN_CASES,
    Permission.UPDATE_CASE,
    Permission.UPLOAD_FILES,
    Permission.DOWNLOAD_FILES,
  ],
  [UserRole.PROFESSIONAL]: [
    Permission.READ_ALL_CASES,
    Permission.UPDATE_CASE,
    Permission.READ_PROFESSIONAL,
    Permission.UPDATE_PROFESSIONAL,
    Permission.UPLOAD_FILES,
    Permission.DOWNLOAD_FILES,
    Permission.USE_AI_ANALYSIS,
    Permission.READ_PHI,
  ],
  [UserRole.ADMIN]: [
    Permission.CREATE_CASE,
    Permission.READ_ALL_CASES,
    Permission.UPDATE_CASE,
    Permission.DELETE_CASE,
    Permission.CREATE_PROFESSIONAL,
    Permission.READ_PROFESSIONAL,
    Permission.UPDATE_PROFESSIONAL,
    Permission.VERIFY_CREDENTIALS,
    Permission.CREATE_PATIENT,
    Permission.READ_PATIENT,
    Permission.UPDATE_PATIENT,
    Permission.ADMIN_ACCESS,
    Permission.USER_MANAGEMENT,
    Permission.SYSTEM_CONFIG,
    Permission.AUDIT_ACCESS,
    Permission.UPLOAD_FILES,
    Permission.DOWNLOAD_FILES,
    Permission.DELETE_FILES,
    Permission.USE_AI_ANALYSIS,
    Permission.CONFIGURE_AI,
    Permission.READ_PHI,
  ],
  [UserRole.SUPPORT]: [
    Permission.READ_ALL_CASES,
    Permission.READ_PROFESSIONAL,
    Permission.READ_PATIENT,
    Permission.AUDIT_ACCESS,
  ],
  [UserRole.SYSTEM]: [
    Permission.READ_ALL_CASES,
    Permission.UPDATE_CASE,
    Permission.CREATE_PROFESSIONAL,
    Permission.UPDATE_PROFESSIONAL,
    Permission.SYSTEM_CONFIG,
    Permission.USE_AI_ANALYSIS,
  ],
};

// Authentication Service
export class AuthService {
  private logger = createHealthcareLogger('auth-service');

  // Generate secure tokens
  public generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp' | 'iss' | 'aud'>): string {
    const now = Math.floor(Date.now() / 1000);
    const jwtSecret = process.env.JWT_SECRET || 'dev-jwt-secret-for-development-32-chars';
    
    const tokenPayload: JWTPayload = {
      ...payload,
      iat: now,
      exp: now + this.parseExpirationTime('15m'), // 15 minutes default
      iss: 'medical-platform',
      aud: 'medical-users',
    };

    return jwt.sign(tokenPayload, jwtSecret, { algorithm: 'HS256' });
  }

  public generateRefreshToken(userId: string, sessionId: string): string {
    const now = Math.floor(Date.now() / 1000);
    const jwtSecret = process.env.JWT_SECRET || 'dev-jwt-secret-for-development-32-chars';
    
    const payload = {
      sub: userId,
      sessionId,
      type: 'refresh',
      iat: now,
      exp: now + this.parseExpirationTime('7d'), // 7 days default
      iss: 'medical-platform',
      aud: 'medical-users',
    };

    return jwt.sign(payload, jwtSecret, { algorithm: 'HS256' });
  }

  // Verify and decode tokens
  public async verifyAccessToken(token: string, correlationId?: string): Promise<JWTPayload> {
    try {
      const jwtSecret = process.env.JWT_SECRET || 'dev-jwt-secret-for-development-32-chars';
      const decoded = jwt.verify(token, jwtSecret, {
        issuer: 'medical-platform',
        audience: 'medical-users',
      }) as JWTPayload;

      // Validate token structure
      if (!decoded.sub || !decoded.email || !decoded.role || !decoded.sessionId) {
        throw new Error('Invalid token structure');
      }

      return decoded;
    } catch (error) {
      this.logger.securityEvent(
        'Invalid JWT token verification attempt',
        'MEDIUM',
        {
          correlationId,
          metadata: {
            error: (error as Error).message,
            tokenPrefix: token.substring(0, 20) + '...',
          },
        },
      );

      if (error instanceof jwt.TokenExpiredError) {
        throw new AuthenticationError(
          'Access token expired',
          MEDICAL_ERROR_CODES.TOKEN_EXPIRED,
          correlationId,
        );
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new AuthenticationError(
          'Invalid access token',
          MEDICAL_ERROR_CODES.TOKEN_INVALID,
          correlationId,
        );
      }

      throw new AuthenticationError(
        'Token verification failed',
        MEDICAL_ERROR_CODES.TOKEN_INVALID,
        correlationId,
      );
    }
  }

  // Password management
  public async hashPassword(password: string): Promise<string> {
    const saltRounds = 12; // High security for healthcare
    return bcrypt.hash(password, saltRounds);
  }

  public async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // Two-Factor Authentication
  public generateTwoFactorCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  public async hashTwoFactorCode(code: string): Promise<string> {
    return bcrypt.hash(code, 8); // Lower rounds for temporary codes
  }

  public async verifyTwoFactorCode(code: string, hashedCode: string): Promise<boolean> {
    return bcrypt.compare(code, hashedCode);
  }

  // Session management
  public generateSessionId(): string {
    return crypto.randomUUID();
  }

  // Security utilities
  public generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  private parseExpirationTime(expiration: string): number {
    const unit = expiration.slice(-1);
    const value = parseInt(expiration.slice(0, -1), 10);

    switch (unit) {
      case 's': return value;
      case 'm': return value * 60;
      case 'h': return value * 60 * 60;
      case 'd': return value * 24 * 60 * 60;
      default: throw new Error(`Invalid expiration format: ${expiration}`);
    }
  }
}

// Authorization Service
export class AuthorizationService {
  private logger = createHealthcareLogger('authorization-service');

  // Check if user has permission
  public hasPermission(userRole: UserRole, permission: Permission): boolean {
    const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
    return rolePermissions.includes(permission);
  }

  // Check if user has any of the required permissions
  public hasAnyPermission(userRole: UserRole, permissions: Permission[]): boolean {
    return permissions.some(permission => this.hasPermission(userRole, permission));
  }

  // Check if user has all required permissions
  public hasAllPermissions(userRole: UserRole, permissions: Permission[]): boolean {
    return permissions.every(permission => this.hasPermission(userRole, permission));
  }

  // Resource-based authorization
  public canAccessResource(
    userPayload: JWTPayload,
    resourceType: string,
    resourceId?: string,
  ): boolean {
    const { role, sub: userId, patientId, professionalId } = userPayload;

    // Admin can access everything
    if (role === UserRole.ADMIN) {
      return true;
    }

    // Resource-specific logic
    switch (resourceType) {
      case 'case':
        if (role === UserRole.PATIENT && patientId) {
          return true; // Additional check needed with case ownership
        }
        if (role === UserRole.PROFESSIONAL) {
          return true; // Additional check needed with case assignment
        }
        return false;

      case 'professional':
        if (role === UserRole.PROFESSIONAL && resourceId === professionalId) {
          return true;
        }
        return this.hasPermission(role, Permission.READ_PROFESSIONAL);

      case 'patient':
        if (role === UserRole.PATIENT && resourceId === patientId) {
          return true;
        }
        return this.hasPermission(role, Permission.READ_PATIENT);

      case 'phi':
        return this.hasPermission(role, Permission.READ_PHI);

      default:
        return false;
    }
  }

  // Log authorization attempt
  public logAuthorizationAttempt(
    userId: string,
    resource: string,
    action: string,
    result: 'GRANTED' | 'DENIED',
    correlationId?: string,
  ): void {
    this.logger.auditLog(
      `Authorization ${result.toLowerCase()}`,
      resource,
      'authorization',
      {
        userId,
        correlationId,
        result: result === 'GRANTED' ? 'SUCCESS' : 'DENIED',
        metadata: {
          action,
          resource,
        },
      },
    );
  }
}

// Higher-order function for protecting API routes
export function withAuth<T extends (...args: any[]) => Promise<NextResponse>>(
  handler: T,
  options: {
    requiredPermissions?: Permission[];
    resourceCheck?: (userPayload: JWTPayload, ...args: any[]) => boolean;
  } = {},
): T {
  const authService = new AuthService();
  const authzService = new AuthorizationService();

  return (async (...args: any[]) => {
    const req = args[0] as NextRequest;
    const correlationId = req.headers.get('x-correlation-id') || crypto.randomUUID();

    try {
      // Authentication
      const authHeader = req.headers.get('authorization');
      
      if (!authHeader?.startsWith('Bearer ')) {
        throw new AuthenticationError(
          'Authorization header required',
          MEDICAL_ERROR_CODES.INVALID_CREDENTIALS,
          correlationId,
        );
      }

      const token = authHeader.substring(7);
      const userPayload = await authService.verifyAccessToken(token, correlationId);

      // Authorization
      if (options.requiredPermissions?.length) {
        const hasPermission = authzService.hasAllPermissions(userPayload.role, options.requiredPermissions);

        authzService.logAuthorizationAttempt(
          userPayload.sub,
          'api-endpoint',
          'access',
          hasPermission ? 'GRANTED' : 'DENIED',
          correlationId,
        );

        if (!hasPermission) {
          throw new AuthorizationError(
            'Insufficient permissions',
            userPayload.sub,
            correlationId,
          );
        }
      }

      // Resource-specific authorization
      if (options.resourceCheck && !options.resourceCheck(userPayload, ...args)) {
        throw new AuthorizationError(
          'Resource access denied',
          userPayload.sub,
          correlationId,
        );
      }

      // Add user context to request
      (req as any).user = userPayload;
      (req as any).correlationId = correlationId;

      return await handler(...args);
    } catch (error) {
      if (error instanceof StandardizedError) {
        const response = {
          success: false,
          error: error.message,
          code: error.code,
          timestamp: new Date().toISOString(),
          correlationId,
        };

        return NextResponse.json(response, { status: error.statusCode });
      }

      // Unexpected error
      const response = {
        success: false,
        error: 'Authentication/Authorization failed',
        code: 'AUTH_ERROR',
        timestamp: new Date().toISOString(),
        correlationId,
      };

      return NextResponse.json(response, { status: HTTP_STATUS.UNAUTHORIZED });
    }
  }) as T;
}

// Express middleware for microservices
export function expressAuthMiddleware() {
  const authService = new AuthService();
  
  return async (req: any, res: any, next: any) => {
    const correlationId = req.headers['x-correlation-id'] || crypto.randomUUID();
    
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          error: 'Authorization header required',
          code: MEDICAL_ERROR_CODES.INVALID_CREDENTIALS,
          correlationId,
        });
      }

      const token = authHeader.substring(7);
      const payload = await authService.verifyAccessToken(token, correlationId);

      req.user = payload;
      req.correlationId = correlationId;
      next();
    } catch (error) {
      const statusCode = error instanceof AuthenticationError ? 401 : 500;
      const code = error instanceof StandardizedError ? error.code : 'AUTH_ERROR';

      return res.status(statusCode).json({
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
        code,
        correlationId,
      });
    }
  };
}

// Service instances
export const authService = new AuthService();
export const authorizationService = new AuthorizationService();

// Export types
export type { JWTPayload, SessionInfo };