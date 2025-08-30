// Database Connection and Utilities
// Following v2.0 Architecture requirements for PostgreSQL 17

import { PrismaClient } from '../generated/prisma';
import { logger } from './logger';
import { config } from '../config/environment';

// Prisma Client instance with connection pooling and optimization
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.database.url,
    },
  },
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'warn', emit: 'event' },
  ],
  errorFormat: 'pretty',
});

// Enhanced logging for database queries
if (config.environment === 'development') {
  prisma.$on('query', (e) => {
    logger.debug('Database Query:', {
      query: e.query,
      params: e.params,
      duration: e.duration,
      timestamp: e.timestamp,
    });
  });
}

prisma.$on('error', (e) => {
  logger.error('Database Error:', {
    message: e.message,
    target: e.target,
    timestamp: e.timestamp,
  });
});

prisma.$on('info', (e) => {
  logger.info('Database Info:', {
    message: e.message,
    target: e.target,
    timestamp: e.timestamp,
  });
});

prisma.$on('warn', (e) => {
  logger.warn('Database Warning:', {
    message: e.message,
    target: e.target,
    timestamp: e.timestamp,
  });
});

// Database health check
export const checkDatabaseHealth = async (): Promise<{
  status: 'healthy' | 'unhealthy';
  responseTime: number;
  error?: string;
}> => {
  const startTime = Date.now();
  
  try {
    // Simple query to test connectivity
    await prisma.$queryRaw`SELECT 1`;
    
    const responseTime = Date.now() - startTime;
    
    return {
      status: 'healthy',
      responseTime,
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    logger.error('Database health check failed:', error);
    
    return {
      status: 'unhealthy',
      responseTime,
      error: (error as Error).message,
    };
  }
};

// Database connection test with retry
export const connectWithRetry = async (maxRetries: number = 5): Promise<void> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await prisma.$connect();
      logger.info('Database connected successfully');
      return;
    } catch (error) {
      logger.error(`Database connection attempt ${i + 1} failed:`, error);
      
      if (i === maxRetries - 1) {
        throw new Error(`Failed to connect to database after ${maxRetries} attempts`);
      }
      
      // Wait before retrying (exponential backoff)
      const waitTime = Math.pow(2, i) * 1000;
      logger.info(`Retrying database connection in ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
};

// Graceful disconnect
export const disconnect = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    logger.info('Database disconnected successfully');
  } catch (error) {
    logger.error('Error disconnecting from database:', error);
  }
};

// Database metrics and monitoring
export const getDatabaseMetrics = async () => {
  try {
    // Get connection pool status
    const metrics = await prisma.$metrics.json();
    
    // Get database size information
    const dbSize = await prisma.$queryRaw<Array<{ size: string }>>`
      SELECT pg_size_pretty(pg_database_size(current_database())) as size
    `;
    
    // Get active connections
    const connections = await prisma.$queryRaw<Array<{ count: number }>>`
      SELECT count(*) as count FROM pg_stat_activity WHERE state = 'active'
    `;
    
    return {
      metrics,
      databaseSize: dbSize[0]?.size || 'unknown',
      activeConnections: connections[0]?.count || 0,
    };
  } catch (error) {
    logger.error('Error fetching database metrics:', error);
    return null;
  }
};

// Transaction wrapper with retry logic
export const withTransaction = async <T>(
  operation: (tx: PrismaClient) => Promise<T>,
  maxRetries: number = 3
): Promise<T> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await prisma.$transaction(operation, {
        timeout: config.database.timeout,
        isolationLevel: 'ReadCommitted',
      });
    } catch (error) {
      const isRetryableError = error instanceof Error && (
        error.message.includes('deadlock') ||
        error.message.includes('serialization_failure') ||
        error.message.includes('connection')
      );
      
      if (attempt === maxRetries || !isRetryableError) {
        throw error;
      }
      
      const waitTime = Math.pow(2, attempt - 1) * 100; // Exponential backoff
      logger.warn(`Transaction attempt ${attempt} failed, retrying in ${waitTime}ms:`, error);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  
  throw new Error('Transaction failed after all retries');
};

// Cleanup expired records
export const cleanupExpiredRecords = async (): Promise<void> => {
  try {
    const now = new Date();
    
    // Clean up expired email verification tokens
    const expiredEmailTokens = await prisma.emailVerificationToken.deleteMany({
      where: {
        expiresAt: { lt: now },
      },
    });
    
    // Clean up expired password reset tokens
    const expiredPasswordTokens = await prisma.passwordResetToken.deleteMany({
      where: {
        expiresAt: { lt: now },
      },
    });
    
    // Clean up expired rate limits
    const expiredRateLimits = await prisma.rateLimit.deleteMany({
      where: {
        expiresAt: { lt: now },
      },
    });
    
    // Clean up revoked sessions older than 7 days
    const oldRevokedSessions = await prisma.userSession.deleteMany({
      where: {
        revokedAt: {
          not: null,
          lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });
    
    // Clean up expired sessions
    const expiredSessions = await prisma.userSession.deleteMany({
      where: {
        expiresAt: { lt: now },
        revokedAt: null,
      },
    });
    
    logger.info('Database cleanup completed:', {
      expiredEmailTokens: expiredEmailTokens.count,
      expiredPasswordTokens: expiredPasswordTokens.count,
      expiredRateLimits: expiredRateLimits.count,
      oldRevokedSessions: oldRevokedSessions.count,
      expiredSessions: expiredSessions.count,
    });
    
  } catch (error) {
    logger.error('Database cleanup failed:', error);
  }
};

// Schedule cleanup to run every hour
if (config.environment === 'production') {
  setInterval(cleanupExpiredRecords, 60 * 60 * 1000); // 1 hour
}

export default prisma;