import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';
import { ApiError } from '../types/errors.js';

export interface AuthenticatedUser {
  userId: string;
  customerId?: string;
  email: string;
  role: string;
  permissions: string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export const authenticateToken = (required: boolean = true) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      if (required) {
        const error = new ApiError('Authentication token required', 401);
        return next(error);
      }
      return next();
    }

    try {
      const decoded = jwt.verify(token, config.jwt.secret) as any;
      
      req.user = {
        userId: decoded.userId,
        customerId: decoded.customerId,
        email: decoded.email,
        role: decoded.role || 'user',
        permissions: decoded.permissions || [],
      };

      logger.debug('Authentication successful', {
        userId: req.user.userId,
        email: req.user.email,
        role: req.user.role,
        path: req.path,
        method: req.method,
      });

      next();
    } catch (error) {
      logger.warn('Authentication failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        token: token.substring(0, 20) + '...',
        path: req.path,
        method: req.method,
      });

      if (required) {
        const authError = new ApiError('Invalid or expired authentication token', 401);
        return next(authError);
      }
      
      next();
    }
  };
};

export const requireRole = (allowedRoles: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      const error = new ApiError('Authentication required', 401);
      return next(error);
    }

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    
    if (!roles.includes(req.user.role)) {
      logger.warn('Insufficient permissions', {
        userId: req.user.userId,
        userRole: req.user.role,
        requiredRoles: roles,
        path: req.path,
        method: req.method,
      });

      const error = new ApiError('Insufficient permissions', 403);
      return next(error);
    }

    next();
  };
};

export const requirePermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      const error = new ApiError('Authentication required', 401);
      return next(error);
    }

    if (!req.user.permissions.includes(permission)) {
      logger.warn('Missing required permission', {
        userId: req.user.userId,
        userPermissions: req.user.permissions,
        requiredPermission: permission,
        path: req.path,
        method: req.method,
      });

      const error = new ApiError('Missing required permission', 403);
      return next(error);
    }

    next();
  };
};

export const attachServiceToken = (req: Request, res: Response, next: NextFunction): void => {
  // Add service-to-service authentication token
  if (req.user) {
    req.headers['x-service-token'] = 'internal-service-token';
    req.headers['x-user-id'] = req.user.userId;
    req.headers['x-customer-id'] = req.user.customerId || '';
  }
  
  next();
};