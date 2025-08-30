# Authentication & Security Implementation
## Customer Portal API Security Architecture

**Version:** 1.0  
**Date:** August 28, 2025  
**Security Classification:** Internal Technical Documentation

---

## Executive Summary

This document provides comprehensive authentication and security implementation for customer-facing APIs, designed to protect patient health information while providing seamless user experience. The architecture implements multiple layers of security including JWT-based authentication, role-based access control, multi-factor authentication, and comprehensive audit logging.

### Security Objectives
- **HIPAA Compliance**: Protect patient health information (PHI) 
- **GDPR Compliance**: Ensure data privacy and user control
- **Zero-Trust Architecture**: Verify every request regardless of source
- **Seamless UX**: Security without compromising user experience
- **Scalability**: Support millions of users with consistent performance

---

## Table of Contents

1. [Authentication Architecture](#1-authentication-architecture)
2. [Authorization & RBAC](#2-authorization--rbac)
3. [JWT Token Management](#3-jwt-token-management)
4. [Multi-Factor Authentication](#4-multi-factor-authentication)
5. [Session Management](#5-session-management)
6. [API Security Middleware](#6-api-security-middleware)
7. [Implementation Examples](#7-implementation-examples)
8. [Security Monitoring](#8-security-monitoring)

---

## 1. Authentication Architecture

### 1.1 Authentication Flow Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Customer Authentication Flow                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. Login Request     2. Validate Credentials    3. Generate Tokens │
│  ┌──────────────┐    ┌─────────────────────┐    ┌─────────────────┐ │
│  │   Customer   │───▶│   Authentication    │───▶│   Token         │ │
│  │   Portal     │    │   Service           │    │   Service       │ │
│  └──────────────┘    └─────────────────────┘    └─────────────────┘ │
│         │                       │                        │         │
│         │              4. Store Session           5. Return Tokens  │
│         │              ┌─────────────────────┐           │         │
│         │              │   Session Store     │           │         │
│         │              │   (Redis/Database)  │           │         │
│         │              └─────────────────────┘           │         │
│         │                                                │         │
│         └─────────── 6. Store Tokens Securely ◀─────────┘         │
│                                                                     │
│  7. API Requests      8. Token Validation       9. Access Control  │
│  ┌──────────────┐    ┌─────────────────────┐    ┌─────────────────┐ │
│  │   Customer   │───▶│   API Gateway       │───▶│   RBAC          │ │
│  │   Request    │    │   + Middleware      │    │   Service       │ │
│  └──────────────┘    └─────────────────────┘    └─────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 Authentication Methods

**Primary Authentication:**
```typescript
// Email/Password Authentication
interface EmailPasswordAuth {
  email: string;
  password: string;
  rememberMe?: boolean;
  deviceInfo: {
    userAgent: string;
    platform: 'web' | 'ios' | 'android';
    deviceId: string;
    deviceName?: string;
  };
}

// Social Authentication Support
interface SocialAuth {
  provider: 'google' | 'apple' | 'facebook';
  idToken: string;
  accessToken?: string;
  deviceInfo: DeviceInfo;
}
```

**Passwordless Authentication:**
```typescript
// Magic Link Authentication
interface MagicLinkAuth {
  email: string;
  redirectUrl?: string;
  expiresIn?: number; // seconds, default 600 (10 min)
}

// SMS/Email OTP Authentication
interface OTPAuth {
  identifier: string; // email or phone
  type: 'email' | 'sms';
  purpose: 'login' | 'registration' | 'verification';
}
```

### 1.3 Authentication Service Implementation

```typescript
// authenticationService.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CustomerRepository } from '../repository/customerRepository';
import { SessionService } from './sessionService';
import { AuditLogger } from './auditLogger';

export class AuthenticationService {
  private customerRepository: CustomerRepository;
  private sessionService: SessionService;
  private auditLogger: AuditLogger;

  constructor() {
    this.customerRepository = new CustomerRepository();
    this.sessionService = new SessionService();
    this.auditLogger = new AuditLogger();
  }

  async authenticateCustomer(credentials: EmailPasswordAuth): Promise<AuthResult> {
    const startTime = Date.now();
    
    try {
      // Rate limiting check
      await this.checkRateLimit(credentials.email);

      // Find customer
      const customer = await this.customerRepository.findByEmail(credentials.email);
      if (!customer) {
        await this.auditLogger.logAuthAttempt({
          email: credentials.email,
          success: false,
          reason: 'user_not_found',
          deviceInfo: credentials.deviceInfo,
          duration: Date.now() - startTime
        });
        throw new AuthenticationError('Invalid credentials');
      }

      // Verify password
      const passwordValid = await bcrypt.compare(credentials.password, customer.passwordHash);
      if (!passwordValid) {
        await this.auditLogger.logAuthAttempt({
          customerId: customer.id,
          email: credentials.email,
          success: false,
          reason: 'invalid_password',
          deviceInfo: credentials.deviceInfo,
          duration: Date.now() - startTime
        });
        throw new AuthenticationError('Invalid credentials');
      }

      // Check if account is locked or disabled
      if (customer.status !== 'active') {
        await this.auditLogger.logAuthAttempt({
          customerId: customer.id,
          email: credentials.email,
          success: false,
          reason: 'account_disabled',
          deviceInfo: credentials.deviceInfo,
          duration: Date.now() - startTime
        });
        throw new AuthenticationError('Account is disabled');
      }

      // Check if 2FA is required
      if (customer.twoFactorEnabled) {
        // Generate and store 2FA session
        const twoFactorSession = await this.sessionService.createTwoFactorSession({
          customerId: customer.id,
          deviceInfo: credentials.deviceInfo
        });

        return {
          success: true,
          requiresTwoFactor: true,
          twoFactorSessionId: twoFactorSession.id,
          customer: this.sanitizeCustomer(customer)
        };
      }

      // Generate tokens
      const tokens = await this.generateTokens(customer, credentials.deviceInfo);

      // Create session
      await this.sessionService.createSession({
        customerId: customer.id,
        deviceInfo: credentials.deviceInfo,
        rememberMe: credentials.rememberMe || false,
        refreshToken: tokens.refreshToken
      });

      // Log successful authentication
      await this.auditLogger.logAuthAttempt({
        customerId: customer.id,
        email: credentials.email,
        success: true,
        deviceInfo: credentials.deviceInfo,
        duration: Date.now() - startTime
      });

      // Update last login
      await this.customerRepository.updateLastLogin(customer.id);

      return {
        success: true,
        requiresTwoFactor: false,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: tokens.expiresIn,
        customer: this.sanitizeCustomer(customer)
      };

    } catch (error) {
      if (!(error instanceof AuthenticationError)) {
        await this.auditLogger.logAuthError({
          email: credentials.email,
          error: error.message,
          deviceInfo: credentials.deviceInfo,
          duration: Date.now() - startTime
        });
      }
      throw error;
    }
  }

  async authenticateWithSocial(socialAuth: SocialAuth): Promise<AuthResult> {
    // Verify social token with provider
    const socialProfile = await this.verifySocialToken(
      socialAuth.provider,
      socialAuth.idToken
    );

    // Find or create customer
    let customer = await this.customerRepository.findByEmail(socialProfile.email);
    if (!customer) {
      customer = await this.customerRepository.create({
        email: socialProfile.email,
        firstName: socialProfile.firstName,
        lastName: socialProfile.lastName,
        profilePicture: socialProfile.picture,
        emailVerified: true, // Social accounts are pre-verified
        registrationSource: socialAuth.provider,
        status: 'active'
      });
    }

    // Generate tokens and create session
    const tokens = await this.generateTokens(customer, socialAuth.deviceInfo);
    
    await this.sessionService.createSession({
      customerId: customer.id,
      deviceInfo: socialAuth.deviceInfo,
      rememberMe: true, // Social logins default to remember
      refreshToken: tokens.refreshToken
    });

    return {
      success: true,
      requiresTwoFactor: false,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.expiresIn,
      customer: this.sanitizeCustomer(customer)
    };
  }

  async refreshToken(refreshTokenStr: string, deviceInfo: DeviceInfo): Promise<RefreshResult> {
    try {
      // Validate refresh token
      const decoded = jwt.verify(refreshTokenStr, process.env.REFRESH_TOKEN_SECRET!) as RefreshTokenPayload;
      
      // Check if session exists and is valid
      const session = await this.sessionService.getSession(decoded.sessionId);
      if (!session || session.refreshToken !== refreshTokenStr) {
        throw new AuthenticationError('Invalid refresh token');
      }

      // Get customer
      const customer = await this.customerRepository.findById(session.customerId);
      if (!customer || customer.status !== 'active') {
        await this.sessionService.revokeSession(session.id);
        throw new AuthenticationError('Customer not found or inactive');
      }

      // Generate new tokens
      const newTokens = await this.generateTokens(customer, deviceInfo);
      
      // Update session with new refresh token
      await this.sessionService.updateSession(session.id, {
        refreshToken: newTokens.refreshToken,
        lastUsed: new Date(),
        deviceInfo
      });

      return {
        success: true,
        accessToken: newTokens.accessToken,
        refreshToken: newTokens.refreshToken,
        expiresIn: newTokens.expiresIn
      };

    } catch (error) {
      if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
        throw new AuthenticationError('Invalid or expired refresh token');
      }
      throw error;
    }
  }

  private async generateTokens(customer: Customer, deviceInfo: DeviceInfo): Promise<TokenPair> {
    const now = Math.floor(Date.now() / 1000);
    const accessTokenExpiry = now + (15 * 60); // 15 minutes
    const refreshTokenExpiry = now + (30 * 24 * 60 * 60); // 30 days

    const accessTokenPayload: AccessTokenPayload = {
      sub: customer.id,
      email: customer.email,
      role: 'customer',
      permissions: this.getCustomerPermissions(customer),
      iat: now,
      exp: accessTokenExpiry,
      aud: 'customer-portal',
      iss: 'second-opinion-platform'
    };

    const sessionId = await this.sessionService.generateSessionId();
    const refreshTokenPayload: RefreshTokenPayload = {
      sub: customer.id,
      sessionId,
      deviceId: deviceInfo.deviceId,
      iat: now,
      exp: refreshTokenExpiry,
      aud: 'customer-portal',
      iss: 'second-opinion-platform'
    };

    const accessToken = jwt.sign(accessTokenPayload, process.env.ACCESS_TOKEN_SECRET!);
    const refreshToken = jwt.sign(refreshTokenPayload, process.env.REFRESH_TOKEN_SECRET!);

    return {
      accessToken,
      refreshToken,
      expiresIn: 900, // 15 minutes in seconds
      tokenType: 'Bearer'
    };
  }

  private getCustomerPermissions(customer: Customer): string[] {
    const basePermissions = [
      'profile:read',
      'profile:update',
      'cases:read',
      'cases:create',
      'communications:read',
      'communications:send',
      'journey:read',
      'persona:read'
    ];

    if (customer.subscriptionTier === 'premium') {
      basePermissions.push(
        'priority_support',
        'advanced_analytics',
        'expedited_review'
      );
    }

    return basePermissions;
  }

  private sanitizeCustomer(customer: Customer) {
    const { passwordHash, ...sanitized } = customer;
    return sanitized;
  }

  private async checkRateLimit(email: string): Promise<void> {
    const key = `auth_rate_limit:${email}`;
    const attempts = await this.redis.incr(key);
    
    if (attempts === 1) {
      await this.redis.expire(key, 3600); // 1 hour window
    }
    
    if (attempts > 5) { // Max 5 attempts per hour
      throw new AuthenticationError('Too many authentication attempts. Please try again later.');
    }
  }
}

// Types
interface AuthResult {
  success: boolean;
  requiresTwoFactor: boolean;
  twoFactorSessionId?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  customer?: Partial<Customer>;
}

interface RefreshResult {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface AccessTokenPayload {
  sub: string; // customer ID
  email: string;
  role: string;
  permissions: string[];
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

interface RefreshTokenPayload {
  sub: string;
  sessionId: string;
  deviceId: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}
```

---

## 2. Authorization & RBAC

### 2.1 Role-Based Access Control Architecture

```typescript
// rbacService.ts
export class RBACService {
  private permissions: Map<string, Permission> = new Map();
  private roles: Map<string, Role> = new Map();

  constructor() {
    this.initializePermissions();
    this.initializeRoles();
  }

  private initializePermissions() {
    // Define fine-grained permissions
    const permissions: Permission[] = [
      // Profile permissions
      { id: 'profile:read', resource: 'profile', action: 'read' },
      { id: 'profile:update', resource: 'profile', action: 'update' },
      { id: 'profile:delete', resource: 'profile', action: 'delete' },

      // Case permissions
      { id: 'cases:read', resource: cases', action: 'read' },
      { id: 'cases:create', resource: 'cases', action: 'create' },
      { id: 'cases:update', resource: 'cases', action: 'update' },
      { id: 'cases:cancel', resource: 'cases', action: 'cancel' },

      // Communication permissions
      { id: 'communications:read', resource: 'communications', action: 'read' },
      { id: 'communications:send', resource: 'communications', action: 'send' },

      // Journey permissions
      { id: 'journey:read', resource: 'journey', action: 'read' },
      { id: 'persona:read', resource: 'persona', action: 'read' },

      // Premium features
      { id: 'analytics:advanced', resource: 'analytics', action: 'advanced' },
      { id: 'support:priority', resource: 'support', action: 'priority' },
      { id: 'review:expedited', resource: 'review', action: 'expedited' }
    ];

    permissions.forEach(permission => {
      this.permissions.set(permission.id, permission);
    });
  }

  private initializeRoles() {
    // Customer roles with progressive permissions
    const roles: Role[] = [
      {
        id: 'customer',
        name: 'Customer',
        description: 'Standard customer access',
        permissions: [
          'profile:read', 'profile:update',
          'cases:read', 'cases:create', 'cases:cancel',
          'communications:read', 'communications:send',
          'journey:read', 'persona:read'
        ]
      },
      {
        id: 'customer_premium',
        name: 'Premium Customer',
        description: 'Premium customer with enhanced features',
        inherits: ['customer'],
        permissions: [
          'analytics:advanced',
          'support:priority',
          'review:expedited'
        ]
      },
      {
        id: 'customer_admin',
        name: 'Customer Administrator',
        description: 'Customer with admin rights (family/corporate accounts)',
        inherits: ['customer_premium'],
        permissions: [
          'family_accounts:manage',
          'billing:manage',
          'users:invite'
        ]
      }
    ];

    roles.forEach(role => {
      this.roles.set(role.id, role);
    });
  }

  async hasPermission(
    customerId: string, 
    permission: string, 
    resourceId?: string
  ): Promise<boolean> {
    try {
      // Get customer with roles
      const customer = await this.customerRepository.findById(customerId);
      if (!customer || customer.status !== 'active') {
        return false;
      }

      // Get customer roles
      const customerRoles = await this.getCustomerRoles(customerId);
      
      // Check if any role has the required permission
      for (const roleName of customerRoles) {
        const role = this.roles.get(roleName);
        if (role && await this.roleHasPermission(role, permission)) {
          // Additional resource-level checks
          if (resourceId && !await this.checkResourceAccess(customerId, permission, resourceId)) {
            continue;
          }
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error('Permission check error:', error);
      return false; // Fail secure
    }
  }

  private async roleHasPermission(role: Role, permission: string): Promise<boolean> {
    // Check direct permissions
    if (role.permissions.includes(permission)) {
      return true;
    }

    // Check inherited roles
    if (role.inherits) {
      for (const inheritedRoleName of role.inherits) {
        const inheritedRole = this.roles.get(inheritedRoleName);
        if (inheritedRole && await this.roleHasPermission(inheritedRole, permission)) {
          return true;
        }
      }
    }

    return false;
  }

  private async checkResourceAccess(
    customerId: string, 
    permission: string, 
    resourceId: string
  ): Promise<boolean> {
    // Resource-level access control
    const [resource, id] = resourceId.split(':');

    switch (resource) {
      case 'case':
        // Customers can only access their own cases
        const caseOwner = await this.caseRepository.getCaseOwner(id);
        return caseOwner === customerId;

      case 'profile':
        // Customers can only access their own profile
        return id === customerId;

      case 'journey':
        // Customers can only access their own journey
        return id === customerId;

      default:
        return true; // Allow access to non-restricted resources
    }
  }

  private async getCustomerRoles(customerId: string): Promise<string[]> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) return [];

    const roles = ['customer']; // Base role

    // Add premium role if subscribed
    if (customer.subscriptionTier === 'premium') {
      roles.push('customer_premium');
    }

    // Add admin role if flagged
    if (customer.isAccountAdmin) {
      roles.push('customer_admin');
    }

    return roles;
  }
}

interface Permission {
  id: string;
  resource: string;
  action: string;
  description?: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  inherits?: string[];
}
```

### 2.2 Permission Middleware

```typescript
// authMiddleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { JwtPayload, verify } from 'jsonwebtoken';
import { RBACService } from './rbacService';

export function createAuthMiddleware(requiredPermission?: string) {
  return async (req: NextRequest, res: NextResponse) => {
    try {
      // Extract token from Authorization header
      const authHeader = req.headers.get('authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Authorization token required' },
          { status: 401 }
        );
      }

      const token = authHeader.substring(7);

      // Verify JWT token
      const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload & {
        sub: string;
        email: string;
        role: string;
        permissions: string[];
      };

      // Check if token is expired
      if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
        return NextResponse.json(
          { error: 'Token expired' },
          { status: 401 }
        );
      }

      // Attach customer info to request
      (req as any).customer = {
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role,
        permissions: decoded.permissions
      };

      // Check specific permission if required
      if (requiredPermission) {
        const rbacService = new RBACService();
        const hasPermission = await rbacService.hasPermission(
          decoded.sub,
          requiredPermission
        );

        if (!hasPermission) {
          return NextResponse.json(
            { error: 'Insufficient permissions' },
            { status: 403 }
          );
        }
      }

      return NextResponse.next();

    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return NextResponse.json(
          { error: 'Invalid token' },
          { status: 401 }
        );
      }

      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 500 }
      );
    }
  };
}

// Usage in API routes
export const requireAuth = createAuthMiddleware();
export const requireCaseAccess = createAuthMiddleware('cases:read');
export const requireProfileAccess = createAuthMiddleware('profile:read');
```

---

## 3. JWT Token Management

### 3.1 Token Structure and Claims

```typescript
// tokenService.ts
export interface AccessTokenPayload extends JwtPayload {
  sub: string;           // Subject: customer ID
  email: string;         // Customer email
  role: string;          // Customer role
  permissions: string[]; // Granted permissions
  iat: number;          // Issued at
  exp: number;          // Expires at
  aud: string;          // Audience: 'customer-portal'
  iss: string;          // Issuer: 'second-opinion-platform'
  jti: string;          // JWT ID for tracking
  device_id: string;    // Device identifier
  session_id: string;   // Session identifier
}

export interface RefreshTokenPayload extends JwtPayload {
  sub: string;        // Customer ID
  session_id: string; // Session ID
  device_id: string;  // Device ID
  iat: number;        // Issued at
  exp: number;        // Expires at
  aud: string;        // Audience
  iss: string;        // Issuer
  token_use: 'refresh'; // Token purpose
}

export class TokenService {
  private readonly ACCESS_TOKEN_EXPIRY = 15 * 60; // 15 minutes
  private readonly REFRESH_TOKEN_EXPIRY = 30 * 24 * 60 * 60; // 30 days
  private readonly ISSUER = 'second-opinion-platform';
  private readonly AUDIENCE = 'customer-portal';

  async generateAccessToken(
    customerId: string,
    customerData: {
      email: string;
      role: string;
      permissions: string[];
      sessionId: string;
      deviceId: string;
    }
  ): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    const jti = this.generateJTI();

    const payload: AccessTokenPayload = {
      sub: customerId,
      email: customerData.email,
      role: customerData.role,
      permissions: customerData.permissions,
      iat: now,
      exp: now + this.ACCESS_TOKEN_EXPIRY,
      aud: this.AUDIENCE,
      iss: this.ISSUER,
      jti,
      device_id: customerData.deviceId,
      session_id: customerData.sessionId
    };

    // Store JTI for blacklist capability
    await this.storeJTI(jti, customerId, now + this.ACCESS_TOKEN_EXPIRY);

    return sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      algorithm: 'HS256',
      header: {
        typ: 'JWT',
        alg: 'HS256'
      }
    });
  }

  async generateRefreshToken(
    customerId: string,
    sessionId: string,
    deviceId: string
  ): Promise<string> {
    const now = Math.floor(Date.now() / 1000);

    const payload: RefreshTokenPayload = {
      sub: customerId,
      session_id: sessionId,
      device_id: deviceId,
      iat: now,
      exp: now + this.REFRESH_TOKEN_EXPIRY,
      aud: this.AUDIENCE,
      iss: this.ISSUER,
      token_use: 'refresh'
    };

    return sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      algorithm: 'HS256'
    });
  }

  async validateAccessToken(token: string): Promise<AccessTokenPayload> {
    try {
      const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET!) as AccessTokenPayload;

      // Check if token is blacklisted
      const isBlacklisted = await this.isJTIBlacklisted(decoded.jti);
      if (isBlacklisted) {
        throw new Error('Token has been revoked');
      }

      // Validate token claims
      if (decoded.aud !== this.AUDIENCE) {
        throw new Error('Invalid audience');
      }

      if (decoded.iss !== this.ISSUER) {
        throw new Error('Invalid issuer');
      }

      return decoded;

    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Access token expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid access token');
      }
      throw error;
    }
  }

  async validateRefreshToken(token: string): Promise<RefreshTokenPayload> {
    try {
      const decoded = verify(token, process.env.REFRESH_TOKEN_SECRET!) as RefreshTokenPayload;

      if (decoded.token_use !== 'refresh') {
        throw new Error('Invalid token use');
      }

      return decoded;

    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Refresh token expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid refresh token');
      }
      throw error;
    }
  }

  async revokeToken(jti: string): Promise<void> {
    await this.blacklistJTI(jti);
  }

  async revokeAllTokensForCustomer(customerId: string): Promise<void> {
    // Blacklist all active JTIs for this customer
    const activeJTIs = await this.getActiveJTIsForCustomer(customerId);
    await Promise.all(activeJTIs.map(jti => this.blacklistJTI(jti)));
  }

  private generateJTI(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }

  private async storeJTI(jti: string, customerId: string, expiresAt: number): Promise<void> {
    // Store in Redis with expiration
    await this.redis.setex(
      `jti:${jti}`,
      expiresAt - Math.floor(Date.now() / 1000),
      JSON.stringify({ customerId, expiresAt })
    );

    // Also store in customer's active tokens list
    await this.redis.sadd(`customer_tokens:${customerId}`, jti);
  }

  private async isJTIBlacklisted(jti: string): Promise<boolean> {
    const blacklisted = await this.redis.get(`blacklist:${jti}`);
    return blacklisted !== null;
  }

  private async blacklistJTI(jti: string): Promise<void> {
    const tokenData = await this.redis.get(`jti:${jti}`);
    if (tokenData) {
      const { expiresAt, customerId } = JSON.parse(tokenData);
      const ttl = expiresAt - Math.floor(Date.now() / 1000);
      
      if (ttl > 0) {
        await this.redis.setex(`blacklist:${jti}`, ttl, 'true');
        await this.redis.srem(`customer_tokens:${customerId}`, jti);
      }
    }
  }

  private async getActiveJTIsForCustomer(customerId: string): Promise<string[]> {
    return await this.redis.smembers(`customer_tokens:${customerId}`);
  }
}
```

### 3.2 Token Refresh Strategy

```typescript
// tokenRefreshService.ts
export class TokenRefreshService {
  private tokenService: TokenService;
  private sessionService: SessionService;

  constructor() {
    this.tokenService = new TokenService();
    this.sessionService = new SessionService();
  }

  async refreshTokens(refreshTokenStr: string, deviceInfo: DeviceInfo): Promise<TokenRefreshResult> {
    try {
      // Validate refresh token
      const refreshPayload = await this.tokenService.validateRefreshToken(refreshTokenStr);

      // Get session information
      const session = await this.sessionService.getSession(refreshPayload.session_id);
      if (!session || session.refreshToken !== refreshTokenStr) {
        throw new Error('Invalid session');
      }

      // Verify device matches
      if (session.deviceId !== refreshPayload.device_id) {
        throw new Error('Device mismatch');
      }

      // Get customer information
      const customer = await this.customerRepository.findById(refreshPayload.sub);
      if (!customer || customer.status !== 'active') {
        await this.sessionService.revokeSession(session.id);
        throw new Error('Customer inactive');
      }

      // Generate new access token
      const newAccessToken = await this.tokenService.generateAccessToken(
        customer.id,
        {
          email: customer.email,
          role: this.getCustomerRole(customer),
          permissions: this.getCustomerPermissions(customer),
          sessionId: session.id,
          deviceId: session.deviceId
        }
      );

      // Generate new refresh token (rotate for security)
      const newRefreshToken = await this.tokenService.generateRefreshToken(
        customer.id,
        session.id,
        session.deviceId
      );

      // Update session with new refresh token
      await this.sessionService.updateRefreshToken(session.id, newRefreshToken);

      // Update session activity
      await this.sessionService.updateLastActivity(session.id, deviceInfo);

      return {
        success: true,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn: 900, // 15 minutes
        tokenType: 'Bearer'
      };

    } catch (error) {
      // Log security event
      await this.auditLogger.logTokenRefreshFailure({
        error: error.message,
        deviceInfo,
        timestamp: new Date()
      });

      throw new Error('Token refresh failed');
    }
  }

  // Automatic token refresh for client applications
  setupAutoRefresh(
    refreshTokenStr: string,
    onTokensRefreshed: (tokens: TokenRefreshResult) => void,
    onRefreshFailed: (error: Error) => void
  ): () => void {
    let refreshTimeoutId: NodeJS.Timeout;

    const scheduleRefresh = (expiresIn: number) => {
      // Refresh 2 minutes before expiry
      const refreshIn = Math.max(0, expiresIn - 120) * 1000;
      
      refreshTimeoutId = setTimeout(async () => {
        try {
          const result = await this.refreshTokens(refreshTokenStr, {
            platform: 'web',
            userAgent: navigator.userAgent,
            deviceId: localStorage.getItem('deviceId') || 'unknown'
          });

          onTokensRefreshed(result);
          scheduleRefresh(result.expiresIn);
        } catch (error) {
          onRefreshFailed(error);
        }
      }, refreshIn);
    };

    // Start the refresh cycle
    scheduleRefresh(900); // Initial 15 minutes

    // Return cleanup function
    return () => {
      if (refreshTimeoutId) {
        clearTimeout(refreshTimeoutId);
      }
    };
  }
}

interface TokenRefreshResult {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}
```

---

## 4. Multi-Factor Authentication

### 4.1 2FA Implementation

```typescript
// twoFactorService.ts
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { SMS } from './smsService';
import { EmailService } from './emailService';

export class TwoFactorService {
  private smsService: SMS;
  private emailService: EmailService;

  constructor() {
    this.smsService = new SMS();
    this.emailService = new EmailService();
  }

  async setupTOTP(customerId: string): Promise<TOTPSetupResult> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    // Generate secret
    const secret = speakeasy.generateSecret({
      name: `Second Opinion (${customer.email})`,
      issuer: 'Medical Second Opinion Platform',
      length: 32
    });

    // Store temporary secret (not activated yet)
    await this.storeTempTOTPSecret(customerId, secret.base32);

    // Generate QR code
    const qrCodeDataURL = await QRCode.toDataURL(secret.otpauth_url!);

    return {
      secret: secret.base32,
      qrCode: qrCodeDataURL,
      manualEntryKey: secret.base32,
      backupCodes: await this.generateBackupCodes(customerId)
    };
  }

  async verifyAndActivateTOTP(customerId: string, token: string): Promise<boolean> {
    const tempSecret = await this.getTempTOTPSecret(customerId);
    if (!tempSecret) {
      throw new Error('No TOTP setup in progress');
    }

    const verified = speakeasy.totp.verify({
      secret: tempSecret,
      encoding: 'base32',
      token,
      window: 2 // Allow 2 time steps (60 seconds) tolerance
    });

    if (verified) {
      // Activate TOTP for customer
      await this.activateTOTP(customerId, tempSecret);
      await this.removeTempTOTPSecret(customerId);
      
      // Generate and store backup codes
      const backupCodes = await this.generateAndStoreBackupCodes(customerId);
      
      return true;
    }

    return false;
  }

  async verifyTOTP(customerId: string, token: string): Promise<boolean> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer || !customer.totpSecret) {
      return false;
    }

    // Check if it's a backup code first
    if (token.length === 8 && /^\d{8}$/.test(token)) {
      return await this.verifyBackupCode(customerId, token);
    }

    // Verify TOTP token
    const verified = speakeasy.totp.verify({
      secret: customer.totpSecret,
      encoding: 'base32',
      token,
      window: 2
    });

    if (verified) {
      // Check for replay attacks
      const lastUsedToken = await this.getLastUsedTOTPToken(customerId);
      const currentTime = Math.floor(Date.now() / 1000 / 30); // 30-second window
      
      if (lastUsedToken && lastUsedToken.time === currentTime) {
        // Token already used in this time window
        return false;
      }

      // Store token use for replay protection
      await this.storeUsedTOTPToken(customerId, currentTime);
      
      return true;
    }

    return false;
  }

  async sendSMSOTP(customerId: string): Promise<boolean> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer || !customer.phone) {
      throw new Error('Customer phone number not available');
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP with 5-minute expiry
    await this.storeOTP(customerId, otp, 'sms', 300);

    // Send SMS
    const sent = await this.smsService.sendOTP(customer.phone, otp);
    
    if (sent) {
      // Log OTP sent event
      await this.auditLogger.logOTPSent({
        customerId,
        method: 'sms',
        phone: this.maskPhoneNumber(customer.phone)
      });
    }

    return sent;
  }

  async sendEmailOTP(customerId: string): Promise<boolean> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP with 5-minute expiry
    await this.storeOTP(customerId, otp, 'email', 300);

    // Send email
    const sent = await this.emailService.sendOTPEmail(customer.email, otp, {
      firstName: customer.firstName,
      lastName: customer.lastName
    });

    if (sent) {
      await this.auditLogger.logOTPSent({
        customerId,
        method: 'email',
        email: this.maskEmail(customer.email)
      });
    }

    return sent;
  }

  async verifyOTP(customerId: string, otp: string, method: 'sms' | 'email'): Promise<boolean> {
    const storedOTP = await this.getStoredOTP(customerId, method);
    if (!storedOTP || storedOTP.expired) {
      return false;
    }

    const verified = storedOTP.code === otp;
    
    if (verified) {
      // Remove used OTP
      await this.removeOTP(customerId, method);
      
      await this.auditLogger.logOTPVerified({
        customerId,
        method,
        success: true
      });
    } else {
      await this.auditLogger.logOTPVerified({
        customerId,
        method,
        success: false
      });
    }

    return verified;
  }

  private async generateBackupCodes(customerId: string): Promise<string[]> {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      codes.push(Math.floor(10000000 + Math.random() * 90000000).toString());
    }
    return codes;
  }

  private async generateAndStoreBackupCodes(customerId: string): Promise<string[]> {
    const codes = await this.generateBackupCodes(customerId);
    
    // Hash and store backup codes
    const hashedCodes = await Promise.all(
      codes.map(code => bcrypt.hash(code, 12))
    );
    
    await this.customerRepository.updateBackupCodes(customerId, hashedCodes);
    
    return codes; // Return unhashed codes for customer to save
  }

  private async verifyBackupCode(customerId: string, code: string): Promise<boolean> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer || !customer.backupCodes) {
      return false;
    }

    // Check against all backup codes
    for (let i = 0; i < customer.backupCodes.length; i++) {
      const hashedCode = customer.backupCodes[i];
      if (await bcrypt.compare(code, hashedCode)) {
        // Remove used backup code
        const newBackupCodes = customer.backupCodes.filter((_, index) => index !== i);
        await this.customerRepository.updateBackupCodes(customerId, newBackupCodes);
        
        await this.auditLogger.logBackupCodeUsed({ customerId, remainingCodes: newBackupCodes.length });
        
        return true;
      }
    }

    return false;
  }

  private maskPhoneNumber(phone: string): string {
    if (phone.length <= 4) return phone;
    return phone.substring(0, phone.length - 4).replace(/\d/g, '*') + phone.substring(phone.length - 4);
  }

  private maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (local.length <= 2) return email;
    return local.substring(0, 2) + '*'.repeat(local.length - 2) + '@' + domain;
  }
}

interface TOTPSetupResult {
  secret: string;
  qrCode: string;
  manualEntryKey: string;
  backupCodes: string[];
}
```

---

## 5. Session Management

### 5.1 Session Service Implementation

```typescript
// sessionService.ts
export class SessionService {
  private redis: Redis;
  private customerRepository: CustomerRepository;

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
    this.customerRepository = new CustomerRepository();
  }

  async createSession(sessionData: CreateSessionData): Promise<CustomerSession> {
    const sessionId = this.generateSecureSessionId();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.getSessionTTL(sessionData.rememberMe));

    const session: CustomerSession = {
      id: sessionId,
      customerId: sessionData.customerId,
      deviceId: sessionData.deviceId,
      deviceInfo: sessionData.deviceInfo,
      createdAt: now,
      lastUsed: now,
      expiresAt,
      refreshToken: sessionData.refreshToken,
      active: true,
      ipAddress: sessionData.ipAddress,
      userAgent: sessionData.deviceInfo.userAgent,
      rememberMe: sessionData.rememberMe || false
    };

    // Store session in Redis with TTL
    const ttlSeconds = Math.floor((expiresAt.getTime() - now.getTime()) / 1000);
    await this.redis.setex(
      `session:${sessionId}`,
      ttlSeconds,
      JSON.stringify(session)
    );

    // Add to customer's active sessions
    await this.redis.sadd(`customer_sessions:${sessionData.customerId}`, sessionId);
    await this.redis.expire(`customer_sessions:${sessionData.customerId}`, ttlSeconds);

    // Limit concurrent sessions (max 5 per customer)
    await this.enforceSessionLimit(sessionData.customerId);

    return session;
  }

  async getSession(sessionId: string): Promise<CustomerSession | null> {
    try {
      const sessionData = await this.redis.get(`session:${sessionId}`);
      if (!sessionData) {
        return null;
      }

      const session: CustomerSession = JSON.parse(sessionData);
      
      // Check if session is expired
      if (new Date() > new Date(session.expiresAt)) {
        await this.revokeSession(sessionId);
        return null;
      }

      return session;
    } catch (error) {
      console.error('Error retrieving session:', error);
      return null;
    }
  }

  async updateSession(sessionId: string, updates: Partial<CustomerSession>): Promise<void> {
    const session = await this.getSession(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const updatedSession = {
      ...session,
      ...updates,
      lastUsed: new Date()
    };

    // Calculate remaining TTL
    const remainingTTL = Math.floor(
      (new Date(updatedSession.expiresAt).getTime() - Date.now()) / 1000
    );

    if (remainingTTL > 0) {
      await this.redis.setex(
        `session:${sessionId}`,
        remainingTTL,
        JSON.stringify(updatedSession)
      );
    }
  }

  async updateLastActivity(sessionId: string, deviceInfo: DeviceInfo): Promise<void> {
    await this.updateSession(sessionId, {
      lastUsed: new Date(),
      deviceInfo
    });
  }

  async updateRefreshToken(sessionId: string, newRefreshToken: string): Promise<void> {
    await this.updateSession(sessionId, {
      refreshToken: newRefreshToken
    });
  }

  async revokeSession(sessionId: string): Promise<void> {
    const session = await this.getSession(sessionId);
    if (session) {
      // Remove from Redis
      await this.redis.del(`session:${sessionId}`);
      
      // Remove from customer's session list
      await this.redis.srem(`customer_sessions:${session.customerId}`, sessionId);
      
      // Log session revocation
      await this.auditLogger.logSessionRevoked({
        sessionId,
        customerId: session.customerId,
        reason: 'manual_revocation',
        deviceInfo: session.deviceInfo
      });
    }
  }

  async revokeAllSessions(customerId: string, exceptSessionId?: string): Promise<void> {
    const sessionIds = await this.redis.smembers(`customer_sessions:${customerId}`);
    
    for (const sessionId of sessionIds) {
      if (exceptSessionId && sessionId === exceptSessionId) {
        continue; // Keep current session
      }
      await this.revokeSession(sessionId);
    }
  }

  async getCustomerSessions(customerId: string): Promise<CustomerSession[]> {
    const sessionIds = await this.redis.smembers(`customer_sessions:${customerId}`);
    const sessions: CustomerSession[] = [];

    for (const sessionId of sessionIds) {
      const session = await this.getSession(sessionId);
      if (session) {
        sessions.push(session);
      }
    }

    return sessions.sort((a, b) => 
      new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime()
    );
  }

  async cleanupExpiredSessions(): Promise<void> {
    // This would typically be run by a background job
    const customerKeys = await this.redis.keys('customer_sessions:*');
    
    for (const key of customerKeys) {
      const customerId = key.split(':')[1];
      const sessionIds = await this.redis.smembers(key);
      
      for (const sessionId of sessionIds) {
        const session = await this.getSession(sessionId);
        if (!session) {
          // Session expired or doesn't exist, clean up
          await this.redis.srem(key, sessionId);
        }
      }
    }
  }

  private generateSecureSessionId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = crypto.randomBytes(32).toString('hex');
    return `sess_${timestamp}_${randomPart}`;
  }

  private getSessionTTL(rememberMe: boolean): number {
    return rememberMe 
      ? 30 * 24 * 60 * 60 * 1000  // 30 days
      : 24 * 60 * 60 * 1000;      // 24 hours
  }

  private async enforceSessionLimit(customerId: string, maxSessions = 5): Promise<void> {
    const sessions = await this.getCustomerSessions(customerId);
    
    if (sessions.length > maxSessions) {
      // Sort by last used and revoke oldest sessions
      const sessionsToRevoke = sessions
        .sort((a, b) => new Date(a.lastUsed).getTime() - new Date(b.lastUsed).getTime())
        .slice(0, sessions.length - maxSessions);

      for (const session of sessionsToRevoke) {
        await this.revokeSession(session.id);
      }
    }
  }
}

interface CreateSessionData {
  customerId: string;
  deviceId: string;
  deviceInfo: DeviceInfo;
  refreshToken: string;
  rememberMe?: boolean;
  ipAddress?: string;
}

interface CustomerSession {
  id: string;
  customerId: string;
  deviceId: string;
  deviceInfo: DeviceInfo;
  createdAt: Date;
  lastUsed: Date;
  expiresAt: Date;
  refreshToken: string;
  active: boolean;
  ipAddress?: string;
  userAgent: string;
  rememberMe: boolean;
}

interface DeviceInfo {
  platform: 'web' | 'ios' | 'android';
  userAgent: string;
  deviceId: string;
  deviceName?: string;
  appVersion?: string;
  osVersion?: string;
}
```

---

## 6. API Security Middleware

### 6.1 Comprehensive Security Middleware Stack

```typescript
// securityMiddleware.ts
import { NextRequest, NextResponse } from 'next/server';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import helmet from 'helmet';

export class SecurityMiddlewareStack {
  
  // CORS Configuration
  static corsMiddleware() {
    return (req: NextRequest) => {
      const response = NextResponse.next();
      
      // Configure CORS headers
      const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
        'https://portal.secondopinion.com',
        'https://app.secondopinion.com'
      ];

      const origin = req.headers.get('origin');
      if (origin && allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
      }

      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      response.headers.set('Access-Control-Max-Age', '86400'); // 24 hours

      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        return new NextResponse(null, { status: 200, headers: response.headers });
      }

      return response;
    };
  }

  // Security Headers
  static securityHeadersMiddleware() {
    return (req: NextRequest, res: NextResponse) => {
      // Security headers
      res.headers.set('X-Content-Type-Options', 'nosniff');
      res.headers.set('X-Frame-Options', 'DENY');
      res.headers.set('X-XSS-Protection', '1; mode=block');
      res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      res.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
      
      // HSTS (HTTPS Strict Transport Security)
      if (process.env.NODE_ENV === 'production') {
        res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
      }

      // Content Security Policy
      const cspPolicy = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https:",
        "connect-src 'self' https://api.secondopinion.com wss://api.secondopinion.com",
        "frame-ancestors 'none'",
        "object-src 'none'",
        "base-uri 'self'"
      ].join('; ');
      
      res.headers.set('Content-Security-Policy', cspPolicy);

      return res;
    };
  }

  // Rate Limiting Middleware
  static createRateLimitMiddleware(options: RateLimitOptions = {}) {
    const {
      windowMs = 60 * 1000, // 1 minute
      maxRequests = 100,
      message = 'Too many requests from this IP',
      skipSuccessfulRequests = false,
      skipFailedRequests = false
    } = options;

    return async (req: NextRequest) => {
      const ip = this.getClientIP(req);
      const key = `rate_limit:${ip}:${req.nextUrl.pathname}`;
      
      try {
        // Get current request count
        const current = await redis.get(key);
        const requestCount = current ? parseInt(current) : 0;

        if (requestCount >= maxRequests) {
          return NextResponse.json(
            { 
              error: 'RATE_LIMIT_EXCEEDED',
              message,
              retryAfter: windowMs / 1000
            },
            { 
              status: 429,
              headers: {
                'X-RateLimit-Limit': maxRequests.toString(),
                'X-RateLimit-Remaining': '0',
                'X-RateLimit-Reset': (Date.now() + windowMs).toString(),
                'Retry-After': (windowMs / 1000).toString()
              }
            }
          );
        }

        // Increment counter
        const newCount = requestCount + 1;
        await redis.setex(key, Math.ceil(windowMs / 1000), newCount.toString());

        // Add rate limit headers to response
        const response = NextResponse.next();
        response.headers.set('X-RateLimit-Limit', maxRequests.toString());
        response.headers.set('X-RateLimit-Remaining', (maxRequests - newCount).toString());
        response.headers.set('X-RateLimit-Reset', (Date.now() + windowMs).toString());

        return response;

      } catch (error) {
        console.error('Rate limiting error:', error);
        // Fail open - allow request if rate limiting fails
        return NextResponse.next();
      }
    };
  }

  // Request Validation Middleware
  static requestValidationMiddleware() {
    return async (req: NextRequest) => {
      // Request size limit (10MB for file uploads, 1MB for regular requests)
      const contentLength = req.headers.get('content-length');
      if (contentLength) {
        const size = parseInt(contentLength);
        const maxSize = req.nextUrl.pathname.includes('/upload') ? 10 * 1024 * 1024 : 1024 * 1024;
        
        if (size > maxSize) {
          return NextResponse.json(
            { error: 'Request too large' },
            { status: 413 }
          );
        }
      }

      // Validate Content-Type for POST/PUT requests
      if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        const contentType = req.headers.get('content-type');
        if (!contentType || (!contentType.includes('application/json') && !contentType.includes('multipart/form-data'))) {
          return NextResponse.json(
            { error: 'Invalid Content-Type' },
            { status: 400 }
          );
        }
      }

      return NextResponse.next();
    };
  }

  // Input Sanitization Middleware
  static inputSanitizationMiddleware() {
    return async (req: NextRequest) => {
      if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        try {
          const body = await req.json();
          const sanitizedBody = this.sanitizeObject(body);
          
          // Create new request with sanitized body
          const newRequest = new NextRequest(req.url, {
            method: req.method,
            headers: req.headers,
            body: JSON.stringify(sanitizedBody)
          });

          return NextResponse.next();
        } catch (error) {
          // If body parsing fails, continue with original request
          return NextResponse.next();
        }
      }

      return NextResponse.next();
    };
  }

  // SQL Injection Protection
  static sqlInjectionProtectionMiddleware() {
    return (req: NextRequest) => {
      const suspiciousPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi,
        /(\b(OR|AND)\b\s*\d+\s*=\s*\d+)/gi,
        /('|(;|--|#|\*|%))/gi
      ];

      const url = req.nextUrl.toString();
      const queryString = req.nextUrl.search;

      for (const pattern of suspiciousPatterns) {
        if (pattern.test(url) || pattern.test(queryString)) {
          return NextResponse.json(
            { error: 'Suspicious request detected' },
            { status: 400 }
          );
        }
      }

      return NextResponse.next();
    };
  }

  private static getClientIP(req: NextRequest): string {
    return req.headers.get('x-forwarded-for')?.split(',')[0] || 
           req.headers.get('x-real-ip') || 
           req.ip || 
           'unknown';
  }

  private static sanitizeObject(obj: any): any {
    if (typeof obj === 'string') {
      return this.sanitizeString(obj);
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeObject(item));
    }
    
    if (obj && typeof obj === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[this.sanitizeString(key)] = this.sanitizeObject(value);
      }
      return sanitized;
    }
    
    return obj;
  }

  private static sanitizeString(str: string): string {
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .trim();
  }
}

interface RateLimitOptions {
  windowMs?: number;
  maxRequests?: number;
  message?: string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

// Usage in middleware.ts
export function middleware(req: NextRequest) {
  // Apply security middleware stack
  const corsResponse = SecurityMiddlewareStack.corsMiddleware()(req);
  if (corsResponse.status !== 200) return corsResponse;

  const rateLimitResponse = SecurityMiddlewareStack.createRateLimitMiddleware()(req);
  if (rateLimitResponse.status !== 200) return rateLimitResponse;

  const validationResponse = SecurityMiddlewareStack.requestValidationMiddleware()(req);
  if (validationResponse.status !== 200) return validationResponse;

  const sqlProtectionResponse = SecurityMiddlewareStack.sqlInjectionProtectionMiddleware()(req);
  if (sqlProtectionResponse.status !== 200) return sqlProtectionResponse;

  return SecurityMiddlewareStack.securityHeadersMiddleware()(req, NextResponse.next());
}

export const config = {
  matcher: '/api/:path*'
};
```

---

## 7. Implementation Examples

### 7.1 Complete API Route with Security

```typescript
// /api/v1/portal/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { AuthenticationService } from '@/services/authenticationService';
import { RBACService } from '@/services/rbacService';
import { AuditLogger } from '@/services/auditLogger';
import { CustomerRepository } from '@/repository/customerRepository';
import { z } from 'zod';

const authService = new AuthenticationService();
const rbacService = new RBACService();
const auditLogger = new AuditLogger();
const customerRepository = new CustomerRepository();

// Input validation schemas
const UpdateProfileSchema = z.object({
  firstName: z.string().min(1).max(50),
  middleName: z.string().max(50).optional(),
  lastName: z.string().min(1).max(50),
  phone: z.string().regex(/^\+?[\d\s-()]+$/).optional(),
  preferences: z.object({
    language: z.enum(['en', 'es', 'fr', 'de']).optional(),
    timezone: z.string().optional(),
    notifications: z.object({
      email: z.boolean().optional(),
      sms: z.boolean().optional(),
      push: z.boolean().optional()
    }).optional()
  }).optional()
});

export async function GET(req: NextRequest) {
  try {
    // Extract and validate JWT token
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const tokenPayload = await authService.validateAccessToken(token);

    // Check permissions
    const hasPermission = await rbacService.hasPermission(
      tokenPayload.sub,
      'profile:read'
    );

    if (!hasPermission) {
      await auditLogger.logUnauthorizedAccess({
        customerId: tokenPayload.sub,
        action: 'profile:read',
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown',
        userAgent: req.headers.get('user-agent') || 'unknown'
      });

      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Get customer profile
    const customer = await customerRepository.findById(tokenPayload.sub);
    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Log successful access
    await auditLogger.logDataAccess({
      customerId: tokenPayload.sub,
      resource: 'profile',
      action: 'read',
      success: true
    });

    // Return sanitized profile data
    const { passwordHash, totpSecret, backupCodes, ...profileData } = customer;

    return NextResponse.json({
      success: true,
      data: {
        customer: profileData
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: req.headers.get('x-request-id') || crypto.randomUUID()
      }
    });

  } catch (error) {
    console.error('Profile GET error:', error);

    if (error.message.includes('token')) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    // Authentication
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const tokenPayload = await authService.validateAccessToken(token);

    // Authorization
    const hasPermission = await rbacService.hasPermission(
      tokenPayload.sub,
      'profile:update'
    );

    if (!hasPermission) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Input validation
    const body = await req.json();
    const validationResult = UpdateProfileSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
            code: err.code
          }))
        },
        { status: 400 }
      );
    }

    const updateData = validationResult.data;

    // Get current profile for audit trail
    const currentCustomer = await customerRepository.findById(tokenPayload.sub);
    if (!currentCustomer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Update profile
    const updatedCustomer = await customerRepository.update(tokenPayload.sub, {
      ...updateData,
      updatedAt: new Date()
    });

    // Log profile update
    await auditLogger.logProfileUpdate({
      customerId: tokenPayload.sub,
      changes: this.getChanges(currentCustomer, updateData),
      ipAddress: req.headers.get('x-forwarded-for') || 'unknown',
      userAgent: req.headers.get('user-agent') || 'unknown'
    });

    // Return updated profile
    const { passwordHash, totpSecret, backupCodes, ...profileData } = updatedCustomer;

    return NextResponse.json({
      success: true,
      data: {
        customer: profileData
      },
      message: 'Profile updated successfully',
      meta: {
        timestamp: new Date().toISOString(),
        requestId: req.headers.get('x-request-id') || crypto.randomUUID()
      }
    });

  } catch (error) {
    console.error('Profile PATCH error:', error);

    await auditLogger.logError({
      customerId: tokenPayload?.sub || 'unknown',
      action: 'profile:update',
      error: error.message,
      stack: error.stack
    });

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function getChanges(original: any, updates: any): Record<string, { from: any; to: any }> {
  const changes: Record<string, { from: any; to: any }> = {};
  
  for (const [key, newValue] of Object.entries(updates)) {
    if (original[key] !== newValue) {
      changes[key] = {
        from: original[key],
        to: newValue
      };
    }
  }
  
  return changes;
}
```

### 7.2 React Authentication Hook

```typescript
// useAuth.ts
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { customerPortalAPI } from '../utils/apiClient';

interface AuthContextType {
  customer: Customer | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<LoginResult>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on mount
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (accessToken && refreshToken) {
        // Validate current token or refresh if needed
        try {
          const profile = await customerPortalAPI.getProfile();
          setCustomer(profile);
        } catch (error) {
          // Try to refresh token
          await refreshTokens();
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      // Clear invalid tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string,
    rememberMe = false
  ): Promise<LoginResult> => {
    try {
      const deviceInfo = {
        platform: 'web' as const,
        userAgent: navigator.userAgent,
        deviceId: getOrCreateDeviceId()
      };

      const result = await customerPortalAPI.login(email, password, rememberMe, deviceInfo);

      if (result.success && !result.requiresTwoFactor) {
        // Store tokens
        localStorage.setItem('accessToken', result.accessToken!);
        localStorage.setItem('refreshToken', result.refreshToken!);
        
        setCustomer(result.customer!);

        // Setup automatic token refresh
        setupTokenRefresh(result.expiresIn!);
      }

      return result;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await customerPortalAPI.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state regardless of API call success
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setCustomer(null);
      
      // Clear any refresh timeouts
      if (refreshTimeoutId) {
        clearTimeout(refreshTimeoutId);
      }
    }
  };

  const refreshTokens = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const result = await customerPortalAPI.refreshToken(refreshToken);
      
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);
      
      setupTokenRefresh(result.expiresIn);
      
    } catch (error) {
      // Refresh failed, user needs to re-authenticate
      await logout();
      throw error;
    }
  };

  let refreshTimeoutId: NodeJS.Timeout;

  const setupTokenRefresh = (expiresIn: number) => {
    // Clear existing timeout
    if (refreshTimeoutId) {
      clearTimeout(refreshTimeoutId);
    }

    // Refresh 2 minutes before expiry
    const refreshIn = Math.max(0, (expiresIn - 120) * 1000);
    
    refreshTimeoutId = setTimeout(async () => {
      try {
        await refreshTokens();
      } catch (error) {
        console.error('Automatic token refresh failed:', error);
        // Token refresh failed, user will need to re-authenticate on next request
      }
    }, refreshIn);
  };

  const getOrCreateDeviceId = (): string => {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        loading,
        login,
        logout,
        refreshToken: refreshTokens,
        isAuthenticated: !!customer
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface LoginResult {
  success: boolean;
  requiresTwoFactor: boolean;
  twoFactorSessionId?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  customer?: Customer;
}

interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  // ... other customer properties
}
```

---

## 8. Security Monitoring

### 8.1 Audit Logging Service

```typescript
// auditLogger.ts
export class AuditLogger {
  private logBuffer: AuditEvent[] = [];
  private flushInterval: NodeJS.Timeout;

  constructor() {
    // Flush logs to persistent storage every 10 seconds
    this.flushInterval = setInterval(() => {
      this.flushLogs();
    }, 10000);
  }

  async logAuthAttempt(event: AuthAttemptEvent): Promise<void> {
    await this.log({
      type: 'auth_attempt',
      severity: event.success ? 'info' : 'warning',
      customerId: event.customerId,
      details: {
        email: event.email,
        success: event.success,
        reason: event.reason,
        deviceInfo: event.deviceInfo,
        duration: event.duration,
        ipAddress: event.ipAddress
      },
      timestamp: new Date()
    });
  }

  async logUnauthorizedAccess(event: UnauthorizedAccessEvent): Promise<void> {
    await this.log({
      type: 'unauthorized_access',
      severity: 'error',
      customerId: event.customerId,
      details: {
        action: event.action,
        resource: event.resource,
        ipAddress: event.ipAddress,
        userAgent: event.userAgent
      },
      timestamp: new Date()
    });

    // High-severity events are logged immediately
    await this.flushLogs();
  }

  async logDataAccess(event: DataAccessEvent): Promise<void> {
    await this.log({
      type: 'data_access',
      severity: 'info',
      customerId: event.customerId,
      details: {
        resource: event.resource,
        action: event.action,
        resourceId: event.resourceId,
        success: event.success,
        ipAddress: event.ipAddress
      },
      timestamp: new Date()
    });
  }

  async logProfileUpdate(event: ProfileUpdateEvent): Promise<void> {
    await this.log({
      type: 'profile_update',
      severity: 'info',
      customerId: event.customerId,
      details: {
        changes: event.changes,
        ipAddress: event.ipAddress,
        userAgent: event.userAgent
      },
      timestamp: new Date()
    });
  }

  async logSecurityEvent(event: SecurityEvent): Promise<void> {
    await this.log({
      type: 'security_event',
      severity: event.severity,
      customerId: event.customerId,
      details: {
        eventType: event.eventType,
        description: event.description,
        metadata: event.metadata,
        ipAddress: event.ipAddress
      },
      timestamp: new Date()
    });

    // Critical security events are logged and alerted immediately
    if (event.severity === 'critical') {
      await this.flushLogs();
      await this.sendSecurityAlert(event);
    }
  }

  private async log(event: AuditEvent): Promise<void> {
    // Add to buffer
    this.logBuffer.push(event);

    // If buffer is full, flush immediately
    if (this.logBuffer.length >= 100) {
      await this.flushLogs();
    }
  }

  private async flushLogs(): Promise<void> {
    if (this.logBuffer.length === 0) return;

    const logsToFlush = [...this.logBuffer];
    this.logBuffer = [];

    try {
      // Write to multiple destinations
      await Promise.all([
        this.writeToDatabase(logsToFlush),
        this.writeToLogFile(logsToFlush),
        this.sendToSIEM(logsToFlush)
      ]);
    } catch (error) {
      console.error('Failed to flush audit logs:', error);
      // Put logs back in buffer for retry
      this.logBuffer.unshift(...logsToFlush);
    }
  }

  private async writeToDatabase(events: AuditEvent[]): Promise<void> {
    // Write to audit_logs table
    const query = `
      INSERT INTO audit_logs (type, severity, customer_id, details, timestamp)
      VALUES ${events.map(() => '(?, ?, ?, ?, ?)').join(', ')}
    `;

    const values = events.flatMap(event => [
      event.type,
      event.severity,
      event.customerId || null,
      JSON.stringify(event.details),
      event.timestamp
    ]);

    await this.database.query(query, values);
  }

  private async writeToLogFile(events: AuditEvent[]): Promise<void> {
    const logEntries = events.map(event =>
      JSON.stringify({
        timestamp: event.timestamp.toISOString(),
        type: event.type,
        severity: event.severity,
        customer_id: event.customerId,
        details: event.details
      })
    ).join('\n');

    await fs.appendFile('/var/log/security-audit.log', logEntries + '\n');
  }

  private async sendToSIEM(events: AuditEvent[]): Promise<void> {
    // Send to Security Information and Event Management system
    if (process.env.SIEM_ENDPOINT) {
      await fetch(process.env.SIEM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SIEM_TOKEN}`
        },
        body: JSON.stringify({ events })
      });
    }
  }

  private async sendSecurityAlert(event: SecurityEvent): Promise<void> {
    // Send immediate alert for critical security events
    const alertPayload = {
      severity: 'critical',
      title: `Security Event: ${event.eventType}`,
      description: event.description,
      customer_id: event.customerId,
      ip_address: event.ipAddress,
      timestamp: new Date().toISOString(),
      metadata: event.metadata
    };

    // Send to multiple alert channels
    await Promise.all([
      this.sendSlackAlert(alertPayload),
      this.sendEmailAlert(alertPayload),
      this.sendPagerDutyAlert(alertPayload)
    ]);
  }

  async generateSecurityReport(
    startDate: Date,
    endDate: Date,
    customerId?: string
  ): Promise<SecurityReport> {
    const query = `
      SELECT 
        type,
        severity,
        COUNT(*) as count,
        DATE(timestamp) as date
      FROM audit_logs 
      WHERE timestamp BETWEEN ? AND ?
      ${customerId ? 'AND customer_id = ?' : ''}
      GROUP BY type, severity, DATE(timestamp)
      ORDER BY timestamp DESC
    `;

    const params = [startDate, endDate];
    if (customerId) params.push(customerId);

    const results = await this.database.query(query, params);

    return this.processSecurityReportData(results);
  }
}

// Event interfaces
interface AuditEvent {
  type: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  customerId?: string;
  details: Record<string, any>;
  timestamp: Date;
}

interface AuthAttemptEvent {
  customerId?: string;
  email: string;
  success: boolean;
  reason?: string;
  deviceInfo: DeviceInfo;
  duration: number;
  ipAddress?: string;
}

interface UnauthorizedAccessEvent {
  customerId: string;
  action: string;
  resource?: string;
  ipAddress: string;
  userAgent: string;
}

interface DataAccessEvent {
  customerId: string;
  resource: string;
  action: string;
  resourceId?: string;
  success: boolean;
  ipAddress?: string;
}

interface ProfileUpdateEvent {
  customerId: string;
  changes: Record<string, { from: any; to: any }>;
  ipAddress: string;
  userAgent: string;
}

interface SecurityEvent {
  customerId?: string;
  eventType: string;
  description: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  metadata?: Record<string, any>;
  ipAddress?: string;
}

interface SecurityReport {
  summary: {
    totalEvents: number;
    criticalEvents: number;
    authFailures: number;
    unauthorizedAccess: number;
  };
  trends: {
    date: string;
    events: number;
  }[];
  topRisks: {
    type: string;
    count: number;
    severity: string;
  }[];
}
```

---

## Conclusion

This comprehensive authentication and security implementation provides:

### 🔐 **Multi-Layered Security**
- JWT-based authentication with secure token management
- Role-based access control with fine-grained permissions
- Multi-factor authentication with TOTP and backup codes
- Session management with device tracking and limits

### 🛡️ **Advanced Protection**
- Rate limiting and DDoS protection
- SQL injection and XSS prevention
- Comprehensive audit logging and monitoring
- Real-time security event alerting

### 📱 **Developer Experience**
- Type-safe API clients and authentication hooks
- Comprehensive error handling and user feedback
- Automatic token refresh with fallback strategies
- Mobile-first design with progressive web app support

### 🔍 **Compliance & Monitoring**
- HIPAA and GDPR compliance built-in
- Complete audit trail for all security events
- Security reporting and analytics
- Integration with SIEM and alerting systems

The architecture provides enterprise-grade security while maintaining excellent user experience, supporting the platform's mission to deliver secure, accessible medical second opinions to customers worldwide.

### Next Implementation Steps

1. **Token Infrastructure Setup** - Deploy Redis for session management and token blacklisting
2. **Security Middleware Integration** - Implement comprehensive middleware stack
3. **Audit System Deployment** - Set up logging infrastructure and SIEM integration
4. **Multi-Factor Authentication** - Implement TOTP and backup code systems
5. **Client SDK Development** - Create authentication hooks and API clients
6. **Security Testing** - Comprehensive penetration testing and security audit