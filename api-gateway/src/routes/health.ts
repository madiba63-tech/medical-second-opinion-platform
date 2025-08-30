import { Router, Request, Response } from 'express';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';
import { checkServiceHealth, getServiceHealth } from '../middleware/proxy.js';
import { getRateLimitStats } from '../middleware/rateLimiting.js';

const router = Router();

interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  uptime: number;
  version: string;
  services: Record<string, {
    status: 'healthy' | 'unhealthy';
    responseTime?: number;
    lastCheck?: string;
  }>;
  system: {
    memory: {
      used: number;
      free: number;
      percentage: number;
    };
    cpu: {
      loadAverage: number[];
    };
  };
  rateLimiting?: Record<string, any>;
}

// Basic health check endpoint
router.get('/', async (req: Request, res: Response) => {
  try {
    const startTime = Date.now();
    
    // Check all microservices health
    const serviceChecks = await Promise.allSettled([
      checkServiceHealth('identity', config.services.identity),
      checkServiceHealth('cases', config.services.cases),
      checkServiceHealth('ai', config.services.ai),
      checkServiceHealth('professional', config.services.professional),
      checkServiceHealth('notification', config.services.notification),
    ]);

    const services: Record<string, any> = {};
    const serviceNames = ['identity', 'cases', 'ai', 'professional', 'notification'];
    
    serviceChecks.forEach((check, index) => {
      const serviceName = serviceNames[index];
      services[serviceName] = {
        status: check.status === 'fulfilled' && check.value ? 'healthy' : 'unhealthy',
        responseTime: check.status === 'fulfilled' ? Date.now() - startTime : undefined,
        lastCheck: new Date().toISOString(),
      };
    });

    // Get system information
    const memUsage = process.memoryUsage();
    const totalMemory = memUsage.heapTotal;
    const usedMemory = memUsage.heapUsed;
    const freeMemory = totalMemory - usedMemory;
    const memoryPercentage = Math.round((usedMemory / totalMemory) * 100);

    // Determine overall health status
    const healthyServices = Object.values(services).filter(s => s.status === 'healthy').length;
    const totalServices = Object.values(services).length;
    
    let overallStatus: 'healthy' | 'unhealthy' | 'degraded';
    if (healthyServices === totalServices) {
      overallStatus = 'healthy';
    } else if (healthyServices > totalServices / 2) {
      overallStatus = 'degraded';
    } else {
      overallStatus = 'unhealthy';
    }

    const healthStatus: HealthStatus = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      version: process.env.npm_package_version || '1.0.0',
      services,
      system: {
        memory: {
          used: Math.round(usedMemory / 1024 / 1024), // MB
          free: Math.round(freeMemory / 1024 / 1024), // MB
          percentage: memoryPercentage,
        },
        cpu: {
          loadAverage: require('os').loadavg(),
        },
      },
    };

    // Add rate limiting stats in development mode
    if (config.nodeEnv === 'development') {
      try {
        healthStatus.rateLimiting = await getRateLimitStats();
      } catch (error) {
        logger.warn('Failed to get rate limiting stats', { 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }

    const statusCode = overallStatus === 'healthy' ? 200 : overallStatus === 'degraded' ? 207 : 503;
    
    res.status(statusCode).json(healthStatus);

    logger.info('Health check completed', {
      overallStatus,
      healthyServices: `${healthyServices}/${totalServices}`,
      responseTime: `${Date.now() - startTime}ms`,
    });

  } catch (error) {
    logger.error('Health check failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Liveness probe (simple check that the service is running)
router.get('/live', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'alive',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
  });
});

// Readiness probe (check if the service is ready to handle requests)
router.get('/ready', async (req: Request, res: Response) => {
  try {
    // Quick check of critical services
    const identityHealthy = await checkServiceHealth('identity', config.services.identity);
    
    if (identityHealthy) {
      res.status(200).json({
        status: 'ready',
        timestamp: new Date().toISOString(),
        services: {
          identity: 'healthy',
        },
      });
    } else {
      res.status(503).json({
        status: 'not_ready',
        timestamp: new Date().toISOString(),
        services: {
          identity: 'unhealthy',
        },
      });
    }
  } catch (error) {
    logger.error('Readiness check failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    res.status(503).json({
      status: 'not_ready',
      timestamp: new Date().toISOString(),
      error: 'Readiness check failed',
    });
  }
});

// Detailed service health check
router.get('/services', async (req: Request, res: Response) => {
  try {
    const serviceHealth = getServiceHealth();
    const detailedChecks: Record<string, any> = {};

    // Perform detailed health checks for each service
    const services = [
      { name: 'identity', url: config.services.identity },
      { name: 'cases', url: config.services.cases },
      { name: 'ai', url: config.services.ai },
      { name: 'professional', url: config.services.professional },
      { name: 'notification', url: config.services.notification },
    ];

    for (const service of services) {
      const startTime = Date.now();
      try {
        const isHealthy = await checkServiceHealth(service.name, service.url);
        detailedChecks[service.name] = {
          status: isHealthy ? 'healthy' : 'unhealthy',
          url: service.url,
          responseTime: Date.now() - startTime,
          lastCheck: new Date().toISOString(),
        };
      } catch (error) {
        detailedChecks[service.name] = {
          status: 'unhealthy',
          url: service.url,
          responseTime: Date.now() - startTime,
          lastCheck: new Date().toISOString(),
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    }

    res.json({
      timestamp: new Date().toISOString(),
      services: detailedChecks,
      cached: serviceHealth,
    });

  } catch (error) {
    logger.error('Service health check failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    res.status(500).json({
      timestamp: new Date().toISOString(),
      error: 'Service health check failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;