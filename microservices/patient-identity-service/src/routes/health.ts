// Health Check Routes
// Following v2.0 Architecture requirements for monitoring

import { Router } from 'express';
import { checkDatabaseHealth, getDatabaseMetrics } from '../utils/database';
import { checkRedisHealth } from '../utils/redis';
import { healthLogger, performanceLogger } from '../utils/logger';
import { config } from '../config/environment';

const router = Router();

// Basic health check
router.get('/', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'patient-identity-service',
      version: '1.0.0',
      environment: config.environment,
      checks: {
        database: { status: 'unknown', responseTime: 0 },
        redis: { status: 'unknown', responseTime: 0 },
      },
    };

    // Check database health
    const dbHealth = await checkDatabaseHealth();
    health.checks.database = dbHealth;

    // Check Redis health
    const redisHealth = await checkRedisHealth();
    health.checks.redis = redisHealth;

    // Determine overall health status
    const isHealthy = dbHealth.status === 'healthy' && redisHealth.status === 'healthy';
    health.status = isHealthy ? 'healthy' : 'unhealthy';

    const responseTime = Date.now() - startTime;
    
    // Log health check
    healthLogger.info('Health check completed', {
      ...health,
      responseTime,
      requestId: req.headers['x-request-id'] || 'unknown',
    });

    // Return appropriate status code
    const statusCode = isHealthy ? 200 : 503;
    
    res.status(statusCode).json({
      ...health,
      responseTime,
    });

  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    healthLogger.error('Health check failed', {
      error: (error as Error).message,
      responseTime,
      requestId: req.headers['x-request-id'] || 'unknown',
    });

    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      service: 'patient-identity-service',
      version: '1.0.0',
      environment: config.environment,
      error: 'Health check failed',
      responseTime,
    });
  }
});

// Ready check (for Kubernetes readiness probe)
router.get('/ready', async (req, res) => {
  const startTime = Date.now();
  
  try {
    // Check if service can handle requests
    const dbHealth = await checkDatabaseHealth();
    const redisHealth = await checkRedisHealth();
    
    const isReady = dbHealth.status === 'healthy' && redisHealth.status === 'healthy';
    const responseTime = Date.now() - startTime;
    
    if (isReady) {
      res.json({
        status: 'ready',
        timestamp: new Date().toISOString(),
        service: 'patient-identity-service',
        version: '1.0.0',
        responseTime,
      });
    } else {
      res.status(503).json({
        status: 'not_ready',
        timestamp: new Date().toISOString(),
        service: 'patient-identity-service',
        version: '1.0.0',
        responseTime,
        checks: {
          database: dbHealth.status,
          redis: redisHealth.status,
        },
      });
    }
    
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    res.status(503).json({
      status: 'not_ready',
      timestamp: new Date().toISOString(),
      service: 'patient-identity-service',
      version: '1.0.0',
      error: 'Readiness check failed',
      responseTime,
    });
  }
});

// Live check (for Kubernetes liveness probe)
router.get('/live', (req, res) => {
  // Simple liveness check - just return 200 if the service is running
  res.json({
    status: 'alive',
    timestamp: new Date().toISOString(),
    service: 'patient-identity-service',
    version: '1.0.0',
    uptime: process.uptime(),
  });
});

// Detailed health check with metrics
router.get('/detailed', async (req, res) => {
  const startTime = Date.now();
  
  try {
    // Get system information
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    
    // Get database metrics
    const dbMetrics = await getDatabaseMetrics();
    
    // Get detailed health information
    const detailedHealth = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'patient-identity-service',
      version: '1.0.0',
      environment: config.environment,
      uptime: process.uptime(),
      system: {
        memory: {
          rss: memUsage.rss,
          heapTotal: memUsage.heapTotal,
          heapUsed: memUsage.heapUsed,
          external: memUsage.external,
          arrayBuffers: memUsage.arrayBuffers,
        },
        cpu: cpuUsage,
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
      },
      checks: {
        database: await checkDatabaseHealth(),
        redis: await checkRedisHealth(),
      },
      metrics: {
        database: dbMetrics,
      },
    };

    // Determine overall health
    const isHealthy = 
      detailedHealth.checks.database.status === 'healthy' && 
      detailedHealth.checks.redis.status === 'healthy';
    
    detailedHealth.status = isHealthy ? 'healthy' : 'unhealthy';

    const responseTime = Date.now() - startTime;
    
    // Log performance metrics
    performanceLogger.info('Detailed health check', {
      responseTime,
      memoryUsage: memUsage.heapUsed,
      uptime: process.uptime(),
    });

    res.status(isHealthy ? 200 : 503).json({
      ...detailedHealth,
      responseTime,
    });

  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      service: 'patient-identity-service',
      version: '1.0.0',
      error: 'Detailed health check failed',
      responseTime,
    });
  }
});

// Startup check
router.get('/startup', async (req, res) => {
  try {
    // Check if all critical services are available
    const dbHealth = await checkDatabaseHealth();
    const redisHealth = await checkRedisHealth();
    
    const isStarted = dbHealth.status === 'healthy' && redisHealth.status === 'healthy';
    
    if (isStarted) {
      res.json({
        status: 'started',
        timestamp: new Date().toISOString(),
        service: 'patient-identity-service',
        version: '1.0.0',
        message: 'Service started successfully',
      });
    } else {
      res.status(503).json({
        status: 'starting',
        timestamp: new Date().toISOString(),
        service: 'patient-identity-service',
        version: '1.0.0',
        message: 'Service is still starting up',
        checks: {
          database: dbHealth.status,
          redis: redisHealth.status,
        },
      });
    }
    
  } catch (error) {
    res.status(503).json({
      status: 'startup_failed',
      timestamp: new Date().toISOString(),
      service: 'patient-identity-service',
      version: '1.0.0',
      error: 'Startup check failed',
    });
  }
});

export { router as healthRoutes };