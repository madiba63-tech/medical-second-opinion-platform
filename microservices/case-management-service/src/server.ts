// Case Management Service - Main Server
// Following v2.0 Architecture requirements for stateless microservices

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { config } from './config/environment';
import { logger } from './utils/logger';
import { prisma } from './utils/database';
import { redisClient } from './utils/redis';
import { errorHandler, notFoundHandler } from './middleware/error-handler';
import { requestLogger } from './middleware/request-logger';
import { metricsMiddleware } from './middleware/metrics';
import { CloudStorageService } from './services/storage-service';

// Import route handlers
import { caseRoutes } from './routes/cases';
import { documentRoutes } from './routes/documents';
import { assignmentRoutes } from './routes/assignments';
import { healthRoutes } from './routes/health';
import { metricsRoutes } from './routes/metrics';

const app = express();

// ===== SECURITY MIDDLEWARE =====
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// CORS configuration
app.use(cors({
  origin: config.cors.allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-API-Key', 'X-Customer-ID']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Higher limit for case management operations
  message: {
    error: 'Too many requests from this IP, please try again later',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// ===== MIDDLEWARE =====
app.use(compression());
app.use(express.json({ limit: '50mb' })); // Larger limit for document uploads
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(requestLogger);
app.use(metricsMiddleware);

// ===== HEALTH CHECK =====
app.use('/health', healthRoutes);
app.use('/metrics', metricsRoutes);

// ===== API ROUTES =====
app.use('/api/v1/cases', caseRoutes);
app.use('/api/v1/documents', documentRoutes);
app.use('/api/v1/assignments', assignmentRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Case Management Service',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    capabilities: [
      'case-creation',
      'document-management',
      'case-assignment',
      'status-tracking',
      'multi-cloud-storage'
    ],
    documentation: '/api/docs'
  });
});

// ===== ERROR HANDLING =====
app.use(notFoundHandler);
app.use(errorHandler);

// ===== GRACEFUL SHUTDOWN =====
const gracefulShutdown = async (signal: string) => {
  logger.info(`Received ${signal}. Starting graceful shutdown...`);
  
  const server = app.listen(config.port, () => {
    logger.info(`Case Management Service running on port ${config.port}`);
  });

  // Stop accepting new connections
  server.close(async () => {
    logger.info('HTTP server closed');
    
    try {
      // Close database connection
      await prisma.$disconnect();
      logger.info('Database connection closed');
      
      // Close Redis connection
      await redisClient.quit();
      logger.info('Redis connection closed');
      
      // Cleanup cloud storage connections
      await CloudStorageService.cleanup();
      logger.info('Cloud storage connections closed');
      
      process.exit(0);
    } catch (error) {
      logger.error('Error during graceful shutdown:', error);
      process.exit(1);
    }
  });

  // Force close after 30 seconds
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 30000);
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});

// ===== START SERVER =====
const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('Database connected successfully');
    
    // Test Redis connection
    await redisClient.ping();
    logger.info('Redis connected successfully');
    
    // Initialize cloud storage
    await CloudStorageService.initialize();
    logger.info('Cloud storage initialized');
    
    // Start HTTP server
    app.listen(config.port, '0.0.0.0', () => {
      logger.info(`Case Management Service started on port ${config.port}`);
      logger.info(`Environment: ${config.environment}`);
      logger.info(`Cloud Provider: ${config.cloud.provider}`);
      logger.info(`Storage Provider: ${config.storage.provider}`);
    });
    
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server if this file is executed directly
if (require.main === module) {
  startServer();
}

export { app };