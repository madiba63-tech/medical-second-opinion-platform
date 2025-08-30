import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from './config/index.js';
import { logger, requestLogger } from './utils/logger.js';
import { ApiError } from './types/errors.js';
import { authenticateToken, attachServiceToken } from './middleware/auth.js';
import { dynamicRateLimiter } from './middleware/rateLimiting.js';
import { createProxyRoutes } from './middleware/proxy.js';
import healthRouter from './routes/health.js';

// Import monitoring middleware
import promClient from 'prom-client';

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
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
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
      'X-Request-ID',
    ],
    exposedHeaders: [
      'X-RateLimit-Limit',
      'X-RateLimit-Remaining',
      'X-RateLimit-Reset',
      'X-Gateway-Version',
    ],
  }));

  // Body parsing middleware
  app.use(express.json({ 
    limit: '10mb',
    verify: (req: any, res, buf) => {
      req.rawBody = buf;
    },
  }));
  app.use(express.urlencoded({ 
    extended: true, 
    limit: '10mb' 
  }));

  // Compression middleware
  app.use(compression({
    level: 6,
    threshold: 1024,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
  }));

  // Request logging middleware
  app.use(requestLogger);

  // Correlation ID middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    const correlationId = req.headers['x-correlation-id'] || 
                         req.headers['x-request-id'] || 
                         `gw-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    
    req.headers['x-correlation-id'] = correlationId;
    res.setHeader('x-correlation-id', correlationId);
    next();
  });

  // Health check routes (no authentication required)
  app.use('/health', healthRouter);

  // Metrics endpoint for Prometheus
  if (config.monitoring.metricsEnabled) {
    // Create default metrics
    const collectDefaultMetrics = promClient.collectDefaultMetrics;
    collectDefaultMetrics({
      gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
      eventLoopMonitoringPrecision: 10,
    });

    // Custom metrics
    const httpRequestDuration = new promClient.Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code', 'user_role'],
    });

    const httpRequestsTotal = new promClient.Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code', 'user_role'],
    });

    const activeConnections = new promClient.Gauge({
      name: 'active_connections',
      help: 'Number of active connections',
    });

    // Middleware to collect metrics
    app.use((req: Request, res: Response, next: NextFunction) => {
      const start = Date.now();
      activeConnections.inc();

      res.on('finish', () => {
        const duration = (Date.now() - start) / 1000;
        const route = req.route?.path || req.path;
        const userRole = req.user?.role || 'anonymous';

        httpRequestDuration
          .labels(req.method, route, res.statusCode.toString(), userRole)
          .observe(duration);

        httpRequestsTotal
          .labels(req.method, route, res.statusCode.toString(), userRole)
          .inc();

        activeConnections.dec();
      });

      next();
    });

    app.get(config.monitoring.metricsPath, async (req: Request, res: Response) => {
      res.set('Content-Type', promClient.register.contentType);
      res.end(await promClient.register.metrics());
    });
  }

  // Rate limiting middleware (apply to all API routes)
  app.use('/api', dynamicRateLimiter);

  // Authentication middleware for protected routes
  app.use('/api', authenticateToken(false)); // Optional authentication
  app.use('/api', attachServiceToken);

  // Create and mount proxy routes
  const proxyRoutes = createProxyRoutes();
  proxyRoutes.forEach(({ path, proxy }) => {
    app.use(path, proxy);
  });

  // API documentation (Swagger)
  if (config.swagger.enabled) {
    const swaggerUi = require('swagger-ui-express');
    const YAML = require('yamljs');
    const path = require('path');
    
    try {
      const swaggerDocument = YAML.load(path.join(__dirname, '../docs/openapi.yaml'));
      app.use(config.swagger.path, swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'Second Opinion API Gateway',
      }));
    } catch (error) {
      logger.warn('Could not load Swagger documentation', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }

  // Root endpoint
  app.get('/', (req: Request, res: Response) => {
    res.json({
      service: 'Second Opinion API Gateway',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
      documentation: config.swagger.enabled ? config.swagger.path : null,
      health: '/health',
      metrics: config.monitoring.metricsEnabled ? config.monitoring.metricsPath : null,
    });
  });

  // 404 handler for unknown routes
  app.use('*', (req: Request, res: Response) => {
    logger.warn('Route not found', {
      path: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.status(404).json({
      success: false,
      error: 'Route not found',
      message: `The requested route ${req.method} ${req.originalUrl} was not found.`,
      code: 'ROUTE_NOT_FOUND',
      timestamp: new Date().toISOString(),
    });
  });

  // Error handling middleware
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    // Log the error
    logger.error('API Gateway Error', {
      error: error.message,
      stack: error.stack,
      path: req.path,
      method: req.method,
      userId: req.user?.userId,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      correlationId: req.headers['x-correlation-id'],
    });

    // Handle specific error types
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        error: error.message,
        code: error.name.toUpperCase().replace('ERROR', ''),
        details: error.details,
        timestamp: new Date().toISOString(),
        correlationId: req.headers['x-correlation-id'],
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: error.message,
        code: 'VALIDATION_ERROR',
        timestamp: new Date().toISOString(),
        correlationId: req.headers['x-correlation-id'],
      });
    }

    // Handle JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Invalid token',
        message: 'The provided authentication token is invalid.',
        code: 'INVALID_TOKEN',
        timestamp: new Date().toISOString(),
        correlationId: req.headers['x-correlation-id'],
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expired',
        message: 'The authentication token has expired. Please log in again.',
        code: 'TOKEN_EXPIRED',
        timestamp: new Date().toISOString(),
        correlationId: req.headers['x-correlation-id'],
      });
    }

    // Default error response
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: config.nodeEnv === 'development' ? error.message : 'An unexpected error occurred.',
      code: 'INTERNAL_SERVER_ERROR',
      timestamp: new Date().toISOString(),
      correlationId: req.headers['x-correlation-id'],
    });
  });

  return app;
};