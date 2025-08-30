// Redis Connection and Utilities
// Following v2.0 Architecture requirements for session management

import { createClient, RedisClientType } from 'redis';
import { logger } from './logger';
import { config } from '../config/environment';

// Create Redis client
export const redisClient: RedisClientType = createClient({
  url: config.redis.url,
  password: config.redis.password,
  socket: {
    connectTimeout: config.redis.timeout,
    lazyConnect: true,
  },
  retryDelayOnFailover: 100,
  retryDelayOnClusterDown: 300,
});

// Redis connection event handlers
redisClient.on('connect', () => {
  logger.info('Redis client connected');
});

redisClient.on('ready', () => {
  logger.info('Redis client ready');
});

redisClient.on('error', (error) => {
  logger.error('Redis client error:', error);
});

redisClient.on('end', () => {
  logger.info('Redis client disconnected');
});

redisClient.on('reconnecting', () => {
  logger.info('Redis client reconnecting...');
});

// Initialize Redis connection
export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
    logger.info('Redis connected successfully');
  } catch (error) {
    logger.error('Failed to connect to Redis:', error);
    throw error;
  }
};

// Redis health check
export const checkRedisHealth = async (): Promise<{
  status: 'healthy' | 'unhealthy';
  responseTime: number;
  error?: string;
}> => {
  const startTime = Date.now();
  
  try {
    await redisClient.ping();
    const responseTime = Date.now() - startTime;
    
    return {
      status: 'healthy',
      responseTime,
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    return {
      status: 'unhealthy',
      responseTime,
      error: (error as Error).message,
    };
  }
};

// Session management utilities
export class SessionManager {
  private static readonly SESSION_PREFIX = 'session:';
  private static readonly DEFAULT_TTL = 24 * 60 * 60; // 24 hours

  static async createSession(
    userId: string,
    sessionData: Record<string, any>,
    ttl: number = SessionManager.DEFAULT_TTL
  ): Promise<string> {
    const sessionId = `${SessionManager.SESSION_PREFIX}${userId}:${Date.now()}`;
    
    await redisClient.setEx(
      sessionId,
      ttl,
      JSON.stringify({
        ...sessionData,
        createdAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
      })
    );
    
    logger.debug('Session created:', { sessionId, userId, ttl });
    return sessionId;
  }

  static async getSession(sessionId: string): Promise<any | null> {
    try {
      const sessionData = await redisClient.get(sessionId);
      
      if (!sessionData) {
        return null;
      }
      
      const parsed = JSON.parse(sessionData);
      
      // Update last activity
      await redisClient.setEx(
        sessionId,
        await redisClient.ttl(sessionId),
        JSON.stringify({
          ...parsed,
          lastActivity: new Date().toISOString(),
        })
      );
      
      return parsed;
    } catch (error) {
      logger.error('Error retrieving session:', error);
      return null;
    }
  }

  static async updateSession(
    sessionId: string,
    updateData: Record<string, any>
  ): Promise<boolean> {
    try {
      const existingSession = await redisClient.get(sessionId);
      
      if (!existingSession) {
        return false;
      }
      
      const parsed = JSON.parse(existingSession);
      const ttl = await redisClient.ttl(sessionId);
      
      await redisClient.setEx(
        sessionId,
        ttl,
        JSON.stringify({
          ...parsed,
          ...updateData,
          lastActivity: new Date().toISOString(),
        })
      );
      
      return true;
    } catch (error) {
      logger.error('Error updating session:', error);
      return false;
    }
  }

  static async deleteSession(sessionId: string): Promise<boolean> {
    try {
      const result = await redisClient.del(sessionId);
      logger.debug('Session deleted:', { sessionId, result });
      return result === 1;
    } catch (error) {
      logger.error('Error deleting session:', error);
      return false;
    }
  }

  static async deleteAllUserSessions(userId: string): Promise<number> {
    try {
      const pattern = `${SessionManager.SESSION_PREFIX}${userId}:*`;
      const keys = await redisClient.keys(pattern);
      
      if (keys.length === 0) {
        return 0;
      }
      
      const result = await redisClient.del(keys);
      logger.info('All user sessions deleted:', { userId, count: result });
      return result;
    } catch (error) {
      logger.error('Error deleting user sessions:', error);
      return 0;
    }
  }

  static async getAllUserSessions(userId: string): Promise<string[]> {
    try {
      const pattern = `${SessionManager.SESSION_PREFIX}${userId}:*`;
      return await redisClient.keys(pattern);
    } catch (error) {
      logger.error('Error getting user sessions:', error);
      return [];
    }
  }
}

// Rate limiting utilities
export class RateLimiter {
  private static readonly RATE_LIMIT_PREFIX = 'rate_limit:';

  static async checkRateLimit(
    key: string,
    maxRequests: number,
    windowMs: number
  ): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: number;
  }> {
    const rateLimitKey = `${RateLimiter.RATE_LIMIT_PREFIX}${key}`;
    const windowStart = Math.floor(Date.now() / windowMs) * windowMs;
    const windowEnd = windowStart + windowMs;
    
    try {
      // Use Redis pipeline for atomic operations
      const pipeline = redisClient.multi();
      
      // Remove expired entries
      pipeline.zRemRangeByScore(rateLimitKey, 0, Date.now() - windowMs);
      
      // Count current requests
      pipeline.zCard(rateLimitKey);
      
      // Add current request
      pipeline.zAdd(rateLimitKey, {
        score: Date.now(),
        value: `${Date.now()}-${Math.random()}`,
      });
      
      // Set expiry for cleanup
      pipeline.expire(rateLimitKey, Math.ceil(windowMs / 1000));
      
      const results = await pipeline.exec();
      const currentCount = (results?.[1] as number) || 0;
      
      const allowed = currentCount < maxRequests;
      const remaining = Math.max(0, maxRequests - currentCount - 1);
      
      return {
        allowed,
        remaining,
        resetTime: windowEnd,
      };
    } catch (error) {
      logger.error('Rate limit check failed:', error);
      
      // Fail open - allow the request if Redis is down
      return {
        allowed: true,
        remaining: maxRequests - 1,
        resetTime: windowEnd,
      };
    }
  }

  static async resetRateLimit(key: string): Promise<void> {
    try {
      const rateLimitKey = `${RateLimiter.RATE_LIMIT_PREFIX}${key}`;
      await redisClient.del(rateLimitKey);
    } catch (error) {
      logger.error('Error resetting rate limit:', error);
    }
  }
}

// Cache utilities
export class CacheManager {
  private static readonly CACHE_PREFIX = 'cache:';

  static async set(
    key: string,
    value: any,
    ttl: number = 3600 // 1 hour default
  ): Promise<boolean> {
    try {
      const cacheKey = `${CacheManager.CACHE_PREFIX}${key}`;
      const serialized = JSON.stringify(value);
      
      await redisClient.setEx(cacheKey, ttl, serialized);
      return true;
    } catch (error) {
      logger.error('Cache set failed:', error);
      return false;
    }
  }

  static async get<T = any>(key: string): Promise<T | null> {
    try {
      const cacheKey = `${CacheManager.CACHE_PREFIX}${key}`;
      const cached = await redisClient.get(cacheKey);
      
      if (!cached) {
        return null;
      }
      
      return JSON.parse(cached);
    } catch (error) {
      logger.error('Cache get failed:', error);
      return null;
    }
  }

  static async delete(key: string): Promise<boolean> {
    try {
      const cacheKey = `${CacheManager.CACHE_PREFIX}${key}`;
      const result = await redisClient.del(cacheKey);
      return result === 1;
    } catch (error) {
      logger.error('Cache delete failed:', error);
      return false;
    }
  }

  static async exists(key: string): Promise<boolean> {
    try {
      const cacheKey = `${CacheManager.CACHE_PREFIX}${key}`;
      const result = await redisClient.exists(cacheKey);
      return result === 1;
    } catch (error) {
      logger.error('Cache exists check failed:', error);
      return false;
    }
  }

  static async clear(pattern?: string): Promise<number> {
    try {
      const searchPattern = pattern
        ? `${CacheManager.CACHE_PREFIX}${pattern}`
        : `${CacheManager.CACHE_PREFIX}*`;
      
      const keys = await redisClient.keys(searchPattern);
      
      if (keys.length === 0) {
        return 0;
      }
      
      return await redisClient.del(keys);
    } catch (error) {
      logger.error('Cache clear failed:', error);
      return 0;
    }
  }
}

// Distributed lock utilities
export class DistributedLock {
  private static readonly LOCK_PREFIX = 'lock:';
  private static readonly DEFAULT_TTL = 10; // 10 seconds

  static async acquire(
    resource: string,
    ttl: number = DistributedLock.DEFAULT_TTL,
    retryDelay: number = 100,
    maxRetries: number = 10
  ): Promise<string | null> {
    const lockKey = `${DistributedLock.LOCK_PREFIX}${resource}`;
    const lockValue = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const result = await redisClient.set(lockKey, lockValue, {
          EX: ttl,
          NX: true,
        });
        
        if (result === 'OK') {
          logger.debug('Distributed lock acquired:', { resource, lockValue, ttl });
          return lockValue;
        }
        
        // Wait before retrying
        if (attempt < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      } catch (error) {
        logger.error('Error acquiring distributed lock:', error);
        return null;
      }
    }
    
    logger.warn('Failed to acquire distributed lock after all retries:', { resource, maxRetries });
    return null;
  }

  static async release(resource: string, lockValue: string): Promise<boolean> {
    const lockKey = `${DistributedLock.LOCK_PREFIX}${resource}`;
    
    // Use Lua script to ensure atomic check-and-delete
    const script = `
      if redis.call("GET", KEYS[1]) == ARGV[1] then
        return redis.call("DEL", KEYS[1])
      else
        return 0
      end
    `;
    
    try {
      const result = await redisClient.eval(script, {
        keys: [lockKey],
        arguments: [lockValue],
      });
      
      const released = result === 1;
      
      if (released) {
        logger.debug('Distributed lock released:', { resource, lockValue });
      } else {
        logger.warn('Failed to release distributed lock (not owner or expired):', { resource, lockValue });
      }
      
      return released;
    } catch (error) {
      logger.error('Error releasing distributed lock:', error);
      return false;
    }
  }

  static async extend(
    resource: string,
    lockValue: string,
    ttl: number
  ): Promise<boolean> {
    const lockKey = `${DistributedLock.LOCK_PREFIX}${resource}`;
    
    // Use Lua script to ensure atomic check-and-extend
    const script = `
      if redis.call("GET", KEYS[1]) == ARGV[1] then
        return redis.call("EXPIRE", KEYS[1], ARGV[2])
      else
        return 0
      end
    `;
    
    try {
      const result = await redisClient.eval(script, {
        keys: [lockKey],
        arguments: [lockValue, ttl.toString()],
      });
      
      return result === 1;
    } catch (error) {
      logger.error('Error extending distributed lock:', error);
      return false;
    }
  }
}

// Graceful shutdown
export const disconnectRedis = async (): Promise<void> => {
  try {
    await redisClient.quit();
    logger.info('Redis client disconnected');
  } catch (error) {
    logger.error('Error disconnecting Redis client:', error);
  }
};

export default redisClient;