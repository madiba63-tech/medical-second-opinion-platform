import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { config } from './config/index.js';
import { logger } from './utils/logger.js';

export const createApp = (): Application => {
  const app = express();

  // Trust proxy headers (important for rate limiting and logging)
  app.set('trust proxy', 1);

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }));

  // CORS configuration
  app.use(cors({
    origin: config.cors.origin,
    credentials: config.cors.credentials,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Customer-ID',
      'X-Correlation-ID',
    ],
  }));

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Compression middleware
  app.use(compression());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: config.rateLimiting.windowMs,
    max: config.rateLimiting.maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
    },
  });
  app.use(limiter);

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      service: 'patient-identity-service',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // Metrics endpoint
  app.get('/metrics', async (req: Request, res: Response) => {
    // Placeholder for Prometheus metrics
    const metrics = `
# HELP identity_service_requests_total Total number of requests
# TYPE identity_service_requests_total counter
identity_service_requests_total 0

# HELP identity_service_response_time Response time in seconds
# TYPE identity_service_response_time histogram
identity_service_response_time_bucket{le="0.1"} 0
identity_service_response_time_bucket{le="0.5"} 0
identity_service_response_time_bucket{le="1"} 0
identity_service_response_time_bucket{le="+Inf"} 0
identity_service_response_time_sum 0
identity_service_response_time_count 0
`;
    
    res.set('Content-Type', 'text/plain');
    res.send(metrics);
  });

  // Ready check endpoint
  app.get('/ready', (req: Request, res: Response) => {
    // TODO: Check database connectivity, Redis, etc.
    res.json({
      status: 'ready',
      service: 'patient-identity-service',
      timestamp: new Date().toISOString(),
    });
  });

  // Root endpoint
  app.get('/', (req: Request, res: Response) => {
    res.json({
      service: 'Patient Identity Service',
      version: '1.0.0',
      description: 'Authentication and identity management for the Second Opinion Platform',
      endpoints: {
        health: '/health',
        metrics: '/metrics',
        ready: '/ready',
        api: '/api/v1',
      },
      timestamp: new Date().toISOString(),
    });
  });

  // API routes placeholder
  app.use('/api/v1', (req: Request, res: Response) => {
    res.json({
      message: 'Patient Identity Service API v1',
      endpoints: [
        'POST /auth/register',
        'POST /auth/login',
        'GET /profile/me',
        'PUT /profile/me',
      ],
      status: 'available',
    });
  });

  // 404 handler
  app.use('*', (req: Request, res: Response) => {
    res.status(404).json({
      error: 'Route not found',
      message: `The requested route ${req.method} ${req.originalUrl} was not found.`,
      service: 'patient-identity-service',
      timestamp: new Date().toISOString(),
    });
  });

  // Error handling middleware
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error('Identity Service Error', {
      error: error.message,
      stack: error.stack,
      path: req.path,
      method: req.method,
    });

    res.status(500).json({
      error: 'Internal server error',
      message: config.nodeEnv === 'development' ? error.message : 'An unexpected error occurred.',
      service: 'patient-identity-service',
      timestamp: new Date().toISOString(),
    });
  });

  return app;
};