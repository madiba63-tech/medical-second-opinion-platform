import { createApp } from './app';
import { config } from './config/index';
import { logger } from './utils/logger';

const startServer = async () => {
  try {
    // Create Express application
    const app = createApp();

    // Start the server
    const server = app.listen(config.port, () => {
      logger.info('API Gateway started successfully', {
        port: config.port,
        environment: config.nodeEnv,
        services: config.services,
        cors: config.cors.origin,
        rateLimiting: {
          windowMs: config.rateLimiting.windowMs,
          maxRequests: config.rateLimiting.maxRequests,
        },
        monitoring: {
          metricsEnabled: config.monitoring.metricsEnabled,
          metricsPath: config.monitoring.metricsPath,
        },
      });
    });

    // Handle server errors
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.syscall !== 'listen') {
        throw error;
      }

      const bind = typeof config.port === 'string' ? `Pipe ${config.port}` : `Port ${config.port}`;

      switch (error.code) {
        case 'EACCES':
          logger.error(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          logger.error(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });

    // Graceful shutdown handling
    const gracefulShutdown = (signal: string) => {
      logger.info(`Received ${signal}. Starting graceful shutdown...`);
      
      server.close((error) => {
        if (error) {
          logger.error('Error during server shutdown', { error: error.message });
          process.exit(1);
        }

        logger.info('API Gateway shut down successfully');
        process.exit(0);
      });

      // Force shutdown after 30 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 30000);
    };

    // Handle shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception', {
        error: error.message,
        stack: error.stack,
      });
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection', {
        reason: reason instanceof Error ? reason.message : reason,
        stack: reason instanceof Error ? reason.stack : undefined,
        promise,
      });
      process.exit(1);
    });

    // Health check for service readiness
    const performStartupHealthCheck = async () => {
      try {
        logger.info('Performing startup health checks...');
        
        // Test Redis connection
        try {
          const Redis = (await import('ioredis')).default;
          const redis = new Redis(config.redis.url);
          await redis.ping();
          await redis.disconnect();
          logger.info('Redis connection: OK');
        } catch (error) {
          logger.warn('Redis connection: FAILED', {
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }

        // Test microservice connectivity
        const axios = (await import('axios')).default;
        const serviceChecks = [
          { name: 'identity', url: config.services.identity },
          { name: 'cases', url: config.services.cases },
          { name: 'ai', url: config.services.ai },
          { name: 'professional', url: config.services.professional },
          { name: 'notification', url: config.services.notification },
        ];

        for (const service of serviceChecks) {
          try {
            await axios.get(`${service.url}/health`, { timeout: 5000 });
            logger.info(`${service.name} service: OK`);
          } catch (error) {
            logger.warn(`${service.name} service: UNAVAILABLE`, {
              url: service.url,
              error: error instanceof Error ? error.message : 'Unknown error',
            });
          }
        }

        logger.info('Startup health checks completed');
      } catch (error) {
        logger.error('Startup health checks failed', {
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };

    // Perform health checks after server starts
    setTimeout(performStartupHealthCheck, 2000);

    // Log memory usage periodically in development
    if (config.nodeEnv === 'development') {
      setInterval(() => {
        const memUsage = process.memoryUsage();
        const memInfo = {
          heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024), // MB
          heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024), // MB
          external: Math.round(memUsage.external / 1024 / 1024), // MB
          rss: Math.round(memUsage.rss / 1024 / 1024), // MB
        };
        logger.debug('Memory usage', memInfo);
      }, 30000); // Every 30 seconds
    }

  } catch (error) {
    logger.error('Failed to start API Gateway', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    process.exit(1);
  }
};

// Start the server
startServer().catch((error) => {
  logger.error('Server startup failed', {
    error: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
  });
  process.exit(1);
});