import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { Redis } from 'ioredis';
import { Request, Response, NextFunction } from 'express';
import { config } from '../config/index';
import { logger } from '../utils/logger';
import { RateLimitError } from '../types/errors';

// Create Redis client for rate limiting
const redis = new Redis(config.redis.url, {
  keyPrefix: `${config.redis.keyPrefix}rate-limit:`,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
});

redis.on('error', (error) => {
  logger.error('Redis rate limiting error', { error: error.message });
});

// Custom key generator based on user authentication
const keyGenerator = (req: Request): string => {
  if (req.user?.userId) {
    return `user:${req.user.userId}`;
  }
  return req.ip || 'anonymous';
};

// Custom skip function for certain routes
const skipFunction = (req: Request): boolean => {
  // Skip rate limiting for health checks
  if (req.path === '/health' || req.path === '/metrics') {
    return true;
  }
  
  // Skip for internal service requests
  if (req.headers['x-service-token'] === 'internal-service-token') {
    return true;
  }
  
  return false;
};

// Standard rate limiter for general API usage
export const standardRateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redis.call(...args),
  }),
  windowMs: config.rateLimiting.windowMs,
  max: config.rateLimiting.maxRequests,
  keyGenerator,
  skip: skipFunction,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Rate limit exceeded',
    message: 'Too many requests from this client. Please try again later.',
    code: 'RATE_LIMIT_EXCEEDED',
    retryAfter: Math.ceil(config.rateLimiting.windowMs / 1000),
  },
  onLimitReached: (req: Request) => {
    logger.warn('Rate limit exceeded', {
      key: keyGenerator(req),
      path: req.path,
      method: req.method,
      userId: req.user?.userId,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });
  },
});

// Strict rate limiter for authentication endpoints
export const authRateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redis.call(...args),
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Only 5 attempts per 15 minutes
  keyGenerator: (req: Request) => {
    // Use email for login attempts, IP for other auth operations
    const email = req.body?.email;
    if (email && req.path.includes('/login')) {
      return `auth-email:${email}`;
    }
    return `auth-ip:${req.ip}`;
  },
  skip: skipFunction,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Authentication rate limit exceeded',
    message: 'Too many authentication attempts. Please try again later.',
    code: 'AUTH_RATE_LIMIT_EXCEEDED',
    retryAfter: 15 * 60, // 15 minutes
  },
  onLimitReached: (req: Request) => {
    logger.warn('Authentication rate limit exceeded', {
      email: req.body?.email,
      path: req.path,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });
  },
});

// Upload rate limiter for file uploads
export const uploadRateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redis.call(...args),
  }),
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // 20 file uploads per hour
  keyGenerator,
  skip: skipFunction,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Upload rate limit exceeded',
    message: 'Too many file uploads. Please try again later.',
    code: 'UPLOAD_RATE_LIMIT_EXCEEDED',
    retryAfter: 60 * 60, // 1 hour
  },
  onLimitReached: (req: Request) => {
    logger.warn('Upload rate limit exceeded', {
      userId: req.user?.userId,
      path: req.path,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });
  },
});

// Premium user rate limiter (higher limits)
export const premiumRateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redis.call(...args),
  }),
  windowMs: config.rateLimiting.windowMs,
  max: config.rateLimiting.maxRequests * 5, // 5x higher limit for premium users
  keyGenerator,
  skip: (req: Request) => {
    // Skip if not a premium user
    if (!req.user || req.user.role !== 'premium') {
      return true;
    }
    return skipFunction(req);
  },
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Premium rate limit exceeded',
    message: 'Premium rate limit exceeded. Please contact support.',
    code: 'PREMIUM_RATE_LIMIT_EXCEEDED',
    retryAfter: Math.ceil(config.rateLimiting.windowMs / 1000),
  },
});

// Dynamic rate limiter based on user role
export const dynamicRateLimiter = (req: Request, res: Response, next: NextFunction): void => {
  // Select appropriate rate limiter based on user role and endpoint
  if (req.path.includes('/auth/')) {
    return authRateLimiter(req, res, next);
  }
  
  if (req.path.includes('/upload') || req.method === 'POST' && req.path.includes('/documents')) {
    return uploadRateLimiter(req, res, next);
  }
  
  if (req.user?.role === 'premium') {
    return premiumRateLimiter(req, res, next);
  }
  
  return standardRateLimiter(req, res, next);
};

// Rate limiting metrics for monitoring
export const getRateLimitStats = async (): Promise<Record<string, any>> => {
  try {
    const keys = await redis.keys(`${config.redis.keyPrefix}rate-limit:*`);
    const stats: Record<string, any> = {
      totalKeys: keys.length,
      keysByType: {},
    };
    
    for (const key of keys.slice(0, 100)) { // Limit to first 100 keys for performance
      const type = key.split(':')[2] || 'unknown';
      stats.keysByType[type] = (stats.keysByType[type] || 0) + 1;
    }
    
    return stats;
  } catch (error) {
    logger.error('Error getting rate limit stats', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    return { error: 'Unable to retrieve stats' };
  }
};