// AI Analysis Service - Main Server
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
import { AnalysisJobProcessor } from './services/job-processor';

// Import route handlers
import { analysisRoutes } from './routes/analysis';
import { modelsRoutes } from './routes/models';
import { insightsRoutes } from './routes/insights';
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
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-API-Key', 'X-Service-Token']
}));

// Rate limiting with higher limits for AI processing
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Conservative limit for AI operations
  message: {
    error: 'Too many AI analysis requests, please try again later',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// ===== MIDDLEWARE =====
app.use(compression());
app.use(express.json({ limit: '100mb' })); // Large limit for medical data
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(requestLogger);
app.use(metricsMiddleware);

// ===== HEALTH CHECK =====
app.use('/health', healthRoutes);
app.use('/metrics', metricsRoutes);

// ===== API ROUTES =====
app.use('/api/v1/analysis', analysisRoutes);
app.use('/api/v1/models', modelsRoutes);
app.use('/api/v1/insights', insightsRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'AI Analysis Service',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    capabilities: [
      'medical-document-analysis',
      'symptom-analysis',
      'differential-diagnosis',
      'risk-assessment',
      'treatment-recommendations',
      'drug-interaction-checking',
      'medical-imaging-analysis',
      'lab-result-interpretation'
    ],
    supportedModels: [
      'OpenAI GPT-4',
      'Anthropic Claude',
      'Google Med-PaLM',
      'Custom Medical Models',
      'Ensemble Models'
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
    logger.info(`AI Analysis Service running on port ${config.port}`);
  });

  // Stop accepting new connections
  server.close(async () => {
    logger.info('HTTP server closed');
    
    try {
      // Stop job processor
      await AnalysisJobProcessor.shutdown();
      logger.info('Job processor shut down');
      
      // Close database connection
      await prisma.$disconnect();
      logger.info('Database connection closed');
      
      // Close Redis connection
      await redisClient.quit();
      logger.info('Redis connection closed');
      
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
    
    // Initialize job processor
    await AnalysisJobProcessor.initialize();
    logger.info('Job processor initialized');
    
    // Validate AI model connections
    const modelValidation = await validateAIModels();
    logger.info('AI model validation:', modelValidation);
    
    // Start HTTP server
    app.listen(config.port, '0.0.0.0', () => {
      logger.info(`AI Analysis Service started on port ${config.port}`);
      logger.info(`Environment: ${config.environment}`);
      logger.info(`AI Providers: ${Object.keys(config.ai.providers).join(', ')}`);
      logger.info(`Queue Processing: ${config.queue.enabled ? 'Enabled' : 'Disabled'}`);
    });
    
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Validate AI model connections
const validateAIModels = async () => {
  const results: Record<string, boolean> = {};
  
  // Test OpenAI connection
  if (config.ai.providers.openai.enabled) {
    try {
      // Simple test to validate API key
      results.openai = !!config.ai.providers.openai.apiKey;
    } catch (error) {
      results.openai = false;
      logger.warn('OpenAI connection validation failed:', error);
    }
  }
  
  // Test Anthropic connection
  if (config.ai.providers.anthropic.enabled) {
    try {
      results.anthropic = !!config.ai.providers.anthropic.apiKey;
    } catch (error) {
      results.anthropic = false;
      logger.warn('Anthropic connection validation failed:', error);
    }
  }
  
  // Test Google AI connection
  if (config.ai.providers.google.enabled) {
    try {
      results.google = !!config.ai.providers.google.apiKey;
    } catch (error) {
      results.google = false;
      logger.warn('Google AI connection validation failed:', error);
    }
  }
  
  return results;
};

// Start the server if this file is executed directly
if (require.main === module) {
  startServer();
}

export { app };