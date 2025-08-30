// Environment Configuration
// Following v2.0 Architecture requirements for cloud-agnostic deployment

import { config as dotenvConfig } from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenvConfig();

// Environment validation schema
const envSchema = z.object({
  // Server configuration
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  PORT: z.coerce.number().default(3001),
  HOST: z.string().default('0.0.0.0'),
  
  // Database configuration
  DATABASE_URL: z.string().min(1),
  DATABASE_POOL_SIZE: z.coerce.number().default(20),
  DATABASE_TIMEOUT: z.coerce.number().default(30000),
  
  // Redis configuration
  REDIS_URL: z.string().min(1),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_TIMEOUT: z.coerce.number().default(5000),
  
  // JWT configuration
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('24h'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  
  // Encryption configuration
  ENCRYPTION_KEY: z.string().min(32),
  
  // Email configuration
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM: z.string().default('noreply@second-opinion.com'),
  
  // Two-Factor Authentication
  TOTP_SERVICE_NAME: z.string().default('Second Opinion'),
  TOTP_ISSUER: z.string().default('Second Opinion Platform'),
  
  // Security configuration
  BCRYPT_ROUNDS: z.coerce.number().default(12),
  PASSWORD_MIN_LENGTH: z.coerce.number().default(8),
  MAX_LOGIN_ATTEMPTS: z.coerce.number().default(5),
  LOCKOUT_DURATION: z.coerce.number().default(900000), // 15 minutes
  
  // Rate limiting
  RATE_LIMIT_WINDOW: z.coerce.number().default(900000), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),
  
  // CORS configuration
  CORS_ORIGINS: z.string().default('http://localhost:3000'),
  
  // Logging configuration
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  LOG_FORMAT: z.enum(['json', 'simple']).default('json'),
  
  // Cloud provider configuration
  CLOUD_PROVIDER: z.enum(['aws', 'azure', 'gcp', 'local']).default('local'),
  
  // Monitoring configuration
  METRICS_ENABLED: z.coerce.boolean().default(true),
  JAEGER_ENDPOINT: z.string().optional(),
  
  // Service mesh configuration
  SERVICE_MESH_ENABLED: z.coerce.boolean().default(false),
  
  // Internal API configuration
  INTERNAL_API_KEY: z.string().optional(),
});

// Validate environment variables
const env = envSchema.parse(process.env);

// Export configuration object
export const config = {
  environment: env.NODE_ENV,
  port: env.PORT,
  host: env.HOST,
  
  database: {
    url: env.DATABASE_URL,
    poolSize: env.DATABASE_POOL_SIZE,
    timeout: env.DATABASE_TIMEOUT,
  },
  
  redis: {
    url: env.REDIS_URL,
    password: env.REDIS_PASSWORD,
    timeout: env.REDIS_TIMEOUT,
  },
  
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
    refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
  },
  
  encryption: {
    key: env.ENCRYPTION_KEY,
  },
  
  email: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    user: env.SMTP_USER,
    password: env.SMTP_PASSWORD,
    from: env.SMTP_FROM,
  },
  
  totp: {
    serviceName: env.TOTP_SERVICE_NAME,
    issuer: env.TOTP_ISSUER,
  },
  
  security: {
    bcryptRounds: env.BCRYPT_ROUNDS,
    passwordMinLength: env.PASSWORD_MIN_LENGTH,
    maxLoginAttempts: env.MAX_LOGIN_ATTEMPTS,
    lockoutDuration: env.LOCKOUT_DURATION,
  },
  
  rateLimit: {
    windowMs: env.RATE_LIMIT_WINDOW,
    maxRequests: env.RATE_LIMIT_MAX_REQUESTS,
  },
  
  cors: {
    allowedOrigins: env.CORS_ORIGINS.split(',').map(origin => origin.trim()),
  },
  
  logging: {
    level: env.LOG_LEVEL,
    format: env.LOG_FORMAT,
  },
  
  cloud: {
    provider: env.CLOUD_PROVIDER,
  },
  
  monitoring: {
    metricsEnabled: env.METRICS_ENABLED,
    jaegerEndpoint: env.JAEGER_ENDPOINT,
  },
  
  serviceMesh: {
    enabled: env.SERVICE_MESH_ENABLED,
  },
  
  internal: {
    apiKey: env.INTERNAL_API_KEY,
  },
};

// Environment-specific overrides
if (config.environment === 'production') {
  // Production security hardening
  config.security.bcryptRounds = Math.max(config.security.bcryptRounds, 14);
  config.security.passwordMinLength = Math.max(config.security.passwordMinLength, 12);
  
  // Production rate limiting
  config.rateLimit.maxRequests = Math.min(config.rateLimit.maxRequests, 50);
}

if (config.environment === 'development') {
  // Development convenience settings
  config.security.bcryptRounds = Math.min(config.security.bcryptRounds, 8);
  config.logging.format = 'simple';
}

export type Config = typeof config;