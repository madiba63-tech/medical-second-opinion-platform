// Comprehensive health check system for all microservices
const { PrismaClient } = require('../src/generated/prisma');
const { createLogger } = require('./logger');

class HealthChecker {
  constructor(serviceName, config = {}) {
    this.serviceName = serviceName;
    this.logger = createLogger(serviceName);
    this.checks = new Map();
    this.config = {
      timeout: config.timeout || 5000,
      interval: config.interval || 30000,
      retries: config.retries || 3,
      ...config
    };
  }

  // Add a health check
  addCheck(name, checkFunction, options = {}) {
    this.checks.set(name, {
      name,
      checkFunction,
      timeout: options.timeout || this.config.timeout,
      critical: options.critical !== false, // Default to critical
      lastStatus: 'unknown',
      lastCheck: null,
      consecutive_failures: 0
    });
  }

  // Database health check
  addDatabaseCheck(prismaClient) {
    this.addCheck('database', async () => {
      const startTime = Date.now();
      try {
        // Simple query to test database connection
        await prismaClient.$queryRaw`SELECT 1 as health_check`;
        return {
          status: 'healthy',
          responseTime: Date.now() - startTime,
          details: 'Database connection successful'
        };
      } catch (error) {
        return {
          status: 'unhealthy',
          responseTime: Date.now() - startTime,
          details: `Database connection failed: ${error.message}`,
          error: error.message
        };
      }
    }, { critical: true });
  }

  // Redis health check
  addRedisCheck(redisClient) {
    this.addCheck('redis', async () => {
      const startTime = Date.now();
      try {
        await redisClient.ping();
        return {
          status: 'healthy',
          responseTime: Date.now() - startTime,
          details: 'Redis connection successful'
        };
      } catch (error) {
        return {
          status: 'unhealthy',
          responseTime: Date.now() - startTime,
          details: `Redis connection failed: ${error.message}`,
          error: error.message
        };
      }
    }, { critical: false }); // Redis is often not critical
  }

  // External service health check
  addExternalServiceCheck(serviceName, url, options = {}) {
    this.addCheck(`external-${serviceName}`, async () => {
      const startTime = Date.now();
      try {
        const fetch = require('node-fetch');
        const response = await fetch(url, {
          method: 'GET',
          timeout: options.timeout || 5000,
          headers: {
            'User-Agent': `health-check/${this.serviceName}`
          }
        });
        
        const responseTime = Date.now() - startTime;
        
        if (response.ok) {
          return {
            status: 'healthy',
            responseTime,
            details: `${serviceName} service responding`,
            statusCode: response.status
          };
        } else {
          return {
            status: 'unhealthy',
            responseTime,
            details: `${serviceName} service returned ${response.status}`,
            statusCode: response.status
          };
        }
      } catch (error) {
        return {
          status: 'unhealthy',
          responseTime: Date.now() - startTime,
          details: `${serviceName} service unreachable: ${error.message}`,
          error: error.message
        };
      }
    }, { critical: options.critical !== false });
  }

  // Memory health check
  addMemoryCheck(options = {}) {
    const maxMemoryMB = options.maxMemoryMB || 512;
    
    this.addCheck('memory', async () => {
      const memoryUsage = process.memoryUsage();
      const usedMemoryMB = memoryUsage.heapUsed / 1024 / 1024;
      const totalMemoryMB = memoryUsage.heapTotal / 1024 / 1024;
      
      const isHealthy = usedMemoryMB < maxMemoryMB;
      
      return {
        status: isHealthy ? 'healthy' : 'unhealthy',
        details: `Memory usage: ${usedMemoryMB.toFixed(2)}MB / ${maxMemoryMB}MB limit`,
        metrics: {
          heapUsed: memoryUsage.heapUsed,
          heapTotal: memoryUsage.heapTotal,
          external: memoryUsage.external,
          rss: memoryUsage.rss
        }
      };
    }, { critical: false });
  }

  // Disk space health check
  addDiskSpaceCheck(options = {}) {
    const maxUsagePercent = options.maxUsagePercent || 80;
    
    this.addCheck('disk-space', async () => {
      const { execSync } = require('child_process');
      try {
        const output = execSync('df -h /', { encoding: 'utf8' });
        const lines = output.trim().split('\n');
        const diskInfo = lines[1].split(/\s+/);
        const usagePercent = parseInt(diskInfo[4]);
        
        const isHealthy = usagePercent < maxUsagePercent;
        
        return {
          status: isHealthy ? 'healthy' : 'unhealthy',
          details: `Disk usage: ${usagePercent}% (limit: ${maxUsagePercent}%)`,
          metrics: {
            total: diskInfo[1],
            used: diskInfo[2],
            available: diskInfo[3],
            usagePercent
          }
        };
      } catch (error) {
        return {
          status: 'unhealthy',
          details: `Could not check disk space: ${error.message}`,
          error: error.message
        };
      }
    }, { critical: false });
  }

  // Run a single health check with timeout and retries
  async runSingleCheck(checkConfig) {
    const { name, checkFunction, timeout, critical } = checkConfig;
    
    for (let attempt = 1; attempt <= this.config.retries; attempt++) {
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Health check timeout after ${timeout}ms`)), timeout)
        );
        
        const result = await Promise.race([
          checkFunction(),
          timeoutPromise
        ]);
        
        // Success - reset failure counter
        checkConfig.consecutive_failures = 0;
        checkConfig.lastStatus = result.status;
        checkConfig.lastCheck = new Date().toISOString();
        
        return {
          name,
          ...result,
          critical,
          attempt,
          lastCheck: checkConfig.lastCheck
        };
        
      } catch (error) {
        checkConfig.consecutive_failures++;
        
        if (attempt === this.config.retries) {
          checkConfig.lastStatus = 'unhealthy';
          checkConfig.lastCheck = new Date().toISOString();
          
          return {
            name,
            status: 'unhealthy',
            critical,
            details: `Health check failed after ${attempt} attempts: ${error.message}`,
            error: error.message,
            attempt,
            consecutive_failures: checkConfig.consecutive_failures,
            lastCheck: checkConfig.lastCheck
          };
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  // Run all health checks
  async runAllChecks() {
    const startTime = Date.now();
    const results = [];
    
    this.logger.info('Starting health checks', {
      action: 'HEALTH_CHECK_START',
      checksCount: this.checks.size
    });
    
    // Run all checks in parallel
    const checkPromises = Array.from(this.checks.values()).map(
      checkConfig => this.runSingleCheck(checkConfig)
    );
    
    const checkResults = await Promise.allSettled(checkPromises);
    
    for (const result of checkResults) {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      } else {
        results.push({
          name: 'unknown',
          status: 'unhealthy',
          critical: true,
          details: `Health check execution failed: ${result.reason.message}`,
          error: result.reason.message
        });
      }
    }
    
    const duration = Date.now() - startTime;
    const healthyChecks = results.filter(r => r.status === 'healthy').length;
    const unhealthyChecks = results.filter(r => r.status === 'unhealthy').length;
    const criticalFailures = results.filter(r => r.status === 'unhealthy' && r.critical).length;
    
    const overallStatus = criticalFailures > 0 ? 'unhealthy' : 
                         unhealthyChecks > 0 ? 'degraded' : 'healthy';
    
    const healthReport = {
      service: this.serviceName,
      status: overallStatus,
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      summary: {
        total: results.length,
        healthy: healthyChecks,
        unhealthy: unhealthyChecks,
        critical_failures: criticalFailures
      },
      checks: results
    };
    
    // Log health status
    if (overallStatus === 'healthy') {
      this.logger.info('Health check completed - all systems healthy', {
        action: 'HEALTH_CHECK_SUCCESS',
        duration,
        checksCount: results.length
      });
    } else {
      this.logger.warn(`Health check completed - service ${overallStatus}`, {
        action: 'HEALTH_CHECK_WARNING',
        duration,
        overallStatus,
        criticalFailures,
        unhealthyChecks: results.filter(r => r.status === 'unhealthy').map(r => r.name)
      });
    }
    
    return healthReport;
  }

  // Express middleware for health endpoint
  createHealthEndpoint() {
    return async (req, res) => {
      try {
        const healthReport = await this.runAllChecks();
        
        const statusCode = healthReport.status === 'healthy' ? 200 :
                          healthReport.status === 'degraded' ? 200 : 503;
        
        res.status(statusCode).json({
          success: true,
          data: healthReport
        });
        
      } catch (error) {
        this.logger.error('Health check endpoint failed', {
          action: 'HEALTH_CHECK_ENDPOINT_ERROR',
          error: error.message
        });
        
        res.status(500).json({
          success: false,
          error: {
            code: 'HEALTH_CHECK_FAILED',
            message: 'Unable to perform health checks',
            timestamp: new Date().toISOString()
          }
        });
      }
    };
  }

  // Start periodic health checks
  startPeriodicChecks() {
    this.logger.info('Starting periodic health checks', {
      action: 'HEALTH_CHECK_PERIODIC_START',
      interval: this.config.interval
    });
    
    // Run immediately
    this.runAllChecks().catch(error => {
      this.logger.error('Initial health check failed', { error: error.message });
    });
    
    // Set up periodic execution
    this.healthCheckInterval = setInterval(async () => {
      try {
        await this.runAllChecks();
      } catch (error) {
        this.logger.error('Periodic health check failed', { error: error.message });
      }
    }, this.config.interval);
    
    return this.healthCheckInterval;
  }

  // Stop periodic health checks
  stopPeriodicChecks() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.logger.info('Stopped periodic health checks', {
        action: 'HEALTH_CHECK_PERIODIC_STOP'
      });
    }
  }
}

// Factory function for easy setup
function createHealthChecker(serviceName, config = {}) {
  const healthChecker = new HealthChecker(serviceName, config);
  
  // Add common health checks
  healthChecker.addMemoryCheck();
  healthChecker.addDiskSpaceCheck();
  
  return healthChecker;
}

// Professional recruitment service specific setup
function setupProfessionalRecruitmentHealth(app, prismaClient) {
  const healthChecker = createHealthChecker('professional-recruitment');
  
  // Add database check
  healthChecker.addDatabaseCheck(prismaClient);
  
  // Add external service checks for dependencies
  if (process.env.AI_ANALYSIS_SERVICE_URL) {
    healthChecker.addExternalServiceCheck(
      'ai-analysis',
      `${process.env.AI_ANALYSIS_SERVICE_URL}/health`,
      { critical: false }
    );
  }
  
  // Health endpoint
  app.get('/health', healthChecker.createHealthEndpoint());
  app.get('/health/detailed', healthChecker.createHealthEndpoint());
  
  // Simple liveness probe for Kubernetes
  app.get('/health/live', (req, res) => {
    res.status(200).json({
      status: 'alive',
      timestamp: new Date().toISOString(),
      service: 'professional-recruitment'
    });
  });
  
  // Readiness probe - more comprehensive
  app.get('/health/ready', async (req, res) => {
    try {
      // Quick database connectivity check
      await prismaClient.$queryRaw`SELECT 1`;
      res.status(200).json({
        status: 'ready',
        timestamp: new Date().toISOString(),
        service: 'professional-recruitment'
      });
    } catch (error) {
      res.status(503).json({
        status: 'not_ready',
        timestamp: new Date().toISOString(),
        service: 'professional-recruitment',
        error: 'Database connection failed'
      });
    }
  });
  
  // Start periodic health monitoring
  healthChecker.startPeriodicChecks();
  
  return healthChecker;
}

module.exports = {
  HealthChecker,
  createHealthChecker,
  setupProfessionalRecruitmentHealth
};