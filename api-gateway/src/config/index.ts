import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server Configuration
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Microservice URLs
  services: {
    identity: process.env.IDENTITY_SERVICE_URL || 'http://localhost:3001',
    cases: process.env.CASE_SERVICE_URL || 'http://localhost:3002',
    ai: process.env.AI_SERVICE_URL || 'http://localhost:3003',
    professional: process.env.PROFESSIONAL_SERVICE_URL || 'http://localhost:3004',
    notification: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005',
  },

  // Authentication
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-at-least-32-characters-long',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },

  // Redis Configuration
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    keyPrefix: process.env.REDIS_KEY_PREFIX || 'api-gateway:',
  },

  // Rate Limiting
  rateLimiting: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },

  // CORS Configuration
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000', 'http://localhost:3006'],
    credentials: true,
  },

  // Proxy Configuration
  proxy: {
    timeout: parseInt(process.env.PROXY_TIMEOUT || '30000', 10),
    retries: parseInt(process.env.PROXY_RETRIES || '3', 10),
  },

  // Health Check Configuration
  healthCheck: {
    interval: parseInt(process.env.HEALTH_CHECK_INTERVAL || '30000', 10),
    timeout: parseInt(process.env.HEALTH_CHECK_TIMEOUT || '5000', 10),
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'json',
  },

  // API Documentation
  swagger: {
    enabled: process.env.SWAGGER_ENABLED !== 'false',
    path: process.env.SWAGGER_PATH || '/api/docs',
  },

  // Monitoring
  monitoring: {
    metricsEnabled: process.env.METRICS_ENABLED !== 'false',
    metricsPath: process.env.METRICS_PATH || '/metrics',
  },

  // Circuit Breaker
  circuitBreaker: {
    failureThreshold: parseInt(process.env.CIRCUIT_BREAKER_FAILURE_THRESHOLD || '5', 10),
    resetTimeout: parseInt(process.env.CIRCUIT_BREAKER_RESET_TIMEOUT || '60000', 10),
  },
};