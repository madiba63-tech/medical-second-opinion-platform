/**
 * Standardized Configuration Management for Medical Second Opinion Platform
 * Healthcare Industry Compliant Configuration with Security Standards
 * 
 * This module provides consistent configuration patterns across all services
 * with environment validation, secret management, and HIPAA compliance.
 */

import { z } from 'zod';

// Environment Types
export type Environment = 'development' | 'staging' | 'production' | 'test';

// Database Configuration Schema
const databaseConfigSchema = z.object({
  url: z.string().url('Database URL must be valid'),
  host: z.string().min(1, 'Database host is required'),
  port: z.number().int().min(1).max(65535, 'Database port must be valid'),
  name: z.string().min(1, 'Database name is required'),
  username: z.string().min(1, 'Database username is required'),
  password: z.string().min(1, 'Database password is required'),
  ssl: z.boolean().default(true),
  poolSize: z.number().int().min(1).max(100).default(10),
  maxConnections: z.number().int().min(1).max(1000).default(50),
  connectionTimeout: z.number().int().min(1000).default(30000),
  queryTimeout: z.number().int().min(1000).default(60000),
});

// Redis Configuration Schema
const redisConfigSchema = z.object({
  url: z.string().url('Redis URL must be valid').optional(),
  host: z.string().min(1, 'Redis host is required'),
  port: z.number().int().min(1).max(65535).default(6379),
  password: z.string().optional(),
  db: z.number().int().min(0).max(15).default(0),
  tls: z.boolean().default(false),
  maxRetriesPerRequest: z.number().int().min(0).default(3),
  retryDelayOnFailover: z.number().int().min(100).default(100),
  enableOfflineQueue: z.boolean().default(false),
  connectTimeout: z.number().int().min(1000).default(10000),
  commandTimeout: z.number().int().min(1000).default(5000),
});

// JWT Configuration Schema
const jwtConfigSchema = z.object({
  secret: z.string().min(32, 'JWT secret must be at least 32 characters'),
  algorithm: z.enum(['HS256', 'HS384', 'HS512', 'RS256']).default('HS256'),
  accessTokenExpiration: z.string().default('15m'),
  refreshTokenExpiration: z.string().default('7d'),
  issuer: z.string().min(1, 'JWT issuer is required'),
  audience: z.string().min(1, 'JWT audience is required'),
});

// AWS Configuration Schema
const awsConfigSchema = z.object({
  region: z.string().min(1, 'AWS region is required'),
  accessKeyId: z.string().min(1, 'AWS access key ID is required'),
  secretAccessKey: z.string().min(1, 'AWS secret access key is required'),
  s3: z.object({
    bucketName: z.string().min(1, 'S3 bucket name is required'),
    region: z.string().min(1, 'S3 region is required'),
    presignedUrlExpiration: z.number().int().min(300).max(3600).default(900), // 15 minutes default
  }),
  ses: z.object({
    region: z.string().min(1, 'SES region is required'),
    fromEmail: z.string().email('Valid SES from email is required'),
    replyToEmail: z.string().email('Valid SES reply-to email is required'),
  }).optional(),
});

// Email Configuration Schema
const emailConfigSchema = z.object({
  provider: z.enum(['smtp', 'ses', 'sendgrid']).default('smtp'),
  smtp: z.object({
    host: z.string().min(1, 'SMTP host is required'),
    port: z.number().int().min(1).max(65535),
    secure: z.boolean().default(true),
    username: z.string().min(1, 'SMTP username is required'),
    password: z.string().min(1, 'SMTP password is required'),
    from: z.string().email('Valid from email is required'),
  }).optional(),
  templates: z.object({
    verificationCode: z.string().min(1),
    passwordReset: z.string().min(1),
    caseCreated: z.string().min(1),
    professionalAssigned: z.string().min(1),
  }),
});

// Security Configuration Schema
const securityConfigSchema = z.object({
  encryption: z.object({
    algorithm: z.enum(['aes-256-gcm', 'aes-256-cbc']).default('aes-256-gcm'),
    key: z.string().min(64, 'Encryption key must be at least 64 characters'),
    ivLength: z.number().int().min(12).max(16).default(16),
  }),
  rateLimiting: z.object({
    windowMs: z.number().int().min(60000).default(900000), // 15 minutes
    maxRequests: z.number().int().min(1).default(100),
    skipSuccessfulRequests: z.boolean().default(false),
    skipFailedRequests: z.boolean().default(false),
  }),
  cors: z.object({
    allowedOrigins: z.array(z.string().url()).min(1),
    allowedMethods: z.array(z.string()).default(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
    allowedHeaders: z.array(z.string()).default(['Content-Type', 'Authorization', 'X-Requested-With']),
    credentials: z.boolean().default(true),
    maxAge: z.number().int().min(0).default(86400), // 24 hours
  }),
  helmet: z.object({
    contentSecurityPolicy: z.boolean().default(true),
    hsts: z.boolean().default(true),
    noSniff: z.boolean().default(true),
    xssFilter: z.boolean().default(true),
    referrerPolicy: z.string().default('strict-origin-when-cross-origin'),
  }),
});

// Logging Configuration Schema
const loggingConfigSchema = z.object({
  level: z.enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']).default('info'),
  format: z.enum(['json', 'text']).default('json'),
  enableConsole: z.boolean().default(true),
  enableFile: z.boolean().default(true),
  maxFileSize: z.number().int().min(1024 * 1024).default(10 * 1024 * 1024), // 10MB
  maxFiles: z.number().int().min(1).default(5),
  auditRetentionDays: z.number().int().min(30).default(2555), // 7 years for HIPAA
});

// Healthcare Specific Configuration Schema
const healthcareConfigSchema = z.object({
  hipaa: z.object({
    enabled: z.boolean().default(true),
    auditLogging: z.boolean().default(true),
    dataRetentionYears: z.number().int().min(6).default(7), // HIPAA requirement
    encryptionRequired: z.boolean().default(true),
    accessControlEnabled: z.boolean().default(true),
  }),
  fileUpload: z.object({
    maxFileSize: z.number().int().min(1024).default(100 * 1024 * 1024), // 100MB
    allowedMimeTypes: z.array(z.string()).min(1),
    virusScanEnabled: z.boolean().default(true),
    encryptionEnabled: z.boolean().default(true),
    quarantineEnabled: z.boolean().default(true),
  }),
  ai: z.object({
    enabled: z.boolean().default(true),
    providers: z.array(z.enum(['openai', 'anthropic', 'google'])).min(1),
    maxTokens: z.number().int().min(100).default(4000),
    temperature: z.number().min(0).max(1).default(0.1),
    timeoutMs: z.number().int().min(5000).default(30000),
  }),
});

// Main Configuration Schema
const configSchema = z.object({
  environment: z.enum(['development', 'staging', 'production', 'test']),
  port: z.number().int().min(1).max(65535).default(3000),
  host: z.string().default('0.0.0.0'),
  serviceName: z.string().min(1, 'Service name is required'),
  version: z.string().min(1, 'Version is required').default('2.0.0'),
  database: databaseConfigSchema,
  redis: redisConfigSchema.optional(),
  jwt: jwtConfigSchema,
  aws: awsConfigSchema.optional(),
  email: emailConfigSchema,
  security: securityConfigSchema,
  logging: loggingConfigSchema,
  healthcare: healthcareConfigSchema,
});

// Configuration Type
export type Config = z.infer<typeof configSchema>;
export type DatabaseConfig = z.infer<typeof databaseConfigSchema>;
export type RedisConfig = z.infer<typeof redisConfigSchema>;
export type JWTConfig = z.infer<typeof jwtConfigSchema>;
export type SecurityConfig = z.infer<typeof securityConfigSchema>;
export type HealthcareConfig = z.infer<typeof healthcareConfigSchema>;

// Environment Variable Mapping
function getEnvironmentConfig(): Partial<Config> {
  return {
    environment: (process.env.NODE_ENV as Environment) || 'development',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    host: process.env.HOST || '0.0.0.0',
    serviceName: process.env.SERVICE_NAME || 'medical-service',
    version: process.env.SERVICE_VERSION || '2.0.0',
    
    database: {
      url: process.env.DATABASE_URL || '',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      name: process.env.DB_NAME || '',
      username: process.env.DB_USER || '',
      password: process.env.DB_PASSWORD || '',
      ssl: process.env.DB_SSL === 'true',
      poolSize: process.env.DB_POOL_SIZE ? parseInt(process.env.DB_POOL_SIZE, 10) : 10,
      maxConnections: process.env.DB_MAX_CONNECTIONS ? parseInt(process.env.DB_MAX_CONNECTIONS, 10) : 50,
      connectionTimeout: process.env.DB_CONNECTION_TIMEOUT ? parseInt(process.env.DB_CONNECTION_TIMEOUT, 10) : 30000,
      queryTimeout: process.env.DB_QUERY_TIMEOUT ? parseInt(process.env.DB_QUERY_TIMEOUT, 10) : 60000,
    },
    
    redis: process.env.REDIS_URL || process.env.REDIS_HOST ? {
      url: process.env.REDIS_URL,
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
      password: process.env.REDIS_PASSWORD,
      db: process.env.REDIS_DB ? parseInt(process.env.REDIS_DB, 10) : 0,
      tls: process.env.REDIS_TLS === 'true',
    } : undefined,
    
    jwt: {
      secret: process.env.JWT_SECRET || '',
      algorithm: (process.env.JWT_ALGORITHM as any) || 'HS256',
      accessTokenExpiration: process.env.JWT_ACCESS_EXPIRATION || '15m',
      refreshTokenExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
      issuer: process.env.JWT_ISSUER || 'medical-platform',
      audience: process.env.JWT_AUDIENCE || 'medical-users',
    },
    
    aws: process.env.AWS_ACCESS_KEY_ID ? {
      region: process.env.AWS_REGION || 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      s3: {
        bucketName: process.env.AWS_S3_BUCKET || '',
        region: process.env.AWS_S3_REGION || process.env.AWS_REGION || 'us-east-1',
        presignedUrlExpiration: process.env.AWS_S3_PRESIGNED_EXPIRATION ? 
          parseInt(process.env.AWS_S3_PRESIGNED_EXPIRATION, 10) : 900,
      },
      ses: process.env.AWS_SES_FROM_EMAIL ? {
        region: process.env.AWS_SES_REGION || process.env.AWS_REGION || 'us-east-1',
        fromEmail: process.env.AWS_SES_FROM_EMAIL || '',
        replyToEmail: process.env.AWS_SES_REPLY_TO_EMAIL || process.env.AWS_SES_FROM_EMAIL || '',
      } : undefined,
    } : undefined,
    
    email: {
      provider: (process.env.EMAIL_PROVIDER as any) || 'smtp',
      smtp: process.env.SMTP_HOST ? {
        host: process.env.SMTP_HOST || '',
        port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
        secure: process.env.SMTP_SECURE === 'true',
        username: process.env.SMTP_USER || '',
        password: process.env.SMTP_PASSWORD || '',
        from: process.env.SMTP_FROM || '',
      } : undefined,
      templates: {
        verificationCode: process.env.EMAIL_TEMPLATE_VERIFICATION || 'verification-code',
        passwordReset: process.env.EMAIL_TEMPLATE_PASSWORD_RESET || 'password-reset',
        caseCreated: process.env.EMAIL_TEMPLATE_CASE_CREATED || 'case-created',
        professionalAssigned: process.env.EMAIL_TEMPLATE_PROFESSIONAL_ASSIGNED || 'professional-assigned',
      },
    },
    
    security: {
      encryption: {
        algorithm: (process.env.ENCRYPTION_ALGORITHM as any) || 'aes-256-gcm',
        key: process.env.ENCRYPTION_KEY || '',
        ivLength: process.env.ENCRYPTION_IV_LENGTH ? parseInt(process.env.ENCRYPTION_IV_LENGTH, 10) : 16,
      },
      rateLimiting: {
        windowMs: process.env.RATE_LIMIT_WINDOW ? parseInt(process.env.RATE_LIMIT_WINDOW, 10) : 900000,
        maxRequests: process.env.RATE_LIMIT_MAX ? parseInt(process.env.RATE_LIMIT_MAX, 10) : 100,
        skipSuccessfulRequests: process.env.RATE_LIMIT_SKIP_SUCCESS === 'true',
        skipFailedRequests: process.env.RATE_LIMIT_SKIP_FAILED === 'true',
      },
      cors: {
        allowedOrigins: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000'],
        allowedMethods: process.env.CORS_METHODS ? 
          process.env.CORS_METHODS.split(',') : ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: process.env.CORS_HEADERS ? 
          process.env.CORS_HEADERS.split(',') : ['Content-Type', 'Authorization', 'X-Requested-With'],
        credentials: process.env.CORS_CREDENTIALS !== 'false',
        maxAge: process.env.CORS_MAX_AGE ? parseInt(process.env.CORS_MAX_AGE, 10) : 86400,
      },
      helmet: {
        contentSecurityPolicy: process.env.HELMET_CSP !== 'false',
        hsts: process.env.HELMET_HSTS !== 'false',
        noSniff: process.env.HELMET_NO_SNIFF !== 'false',
        xssFilter: process.env.HELMET_XSS_FILTER !== 'false',
        referrerPolicy: process.env.HELMET_REFERRER_POLICY || 'strict-origin-when-cross-origin',
      },
    },
    
    logging: {
      level: (process.env.LOG_LEVEL as any) || 'info',
      format: (process.env.LOG_FORMAT as any) || 'json',
      enableConsole: process.env.LOG_CONSOLE !== 'false',
      enableFile: process.env.LOG_FILE !== 'false',
      maxFileSize: process.env.LOG_MAX_SIZE ? parseInt(process.env.LOG_MAX_SIZE, 10) : 10 * 1024 * 1024,
      maxFiles: process.env.LOG_MAX_FILES ? parseInt(process.env.LOG_MAX_FILES, 10) : 5,
      auditRetentionDays: process.env.LOG_AUDIT_RETENTION ? parseInt(process.env.LOG_AUDIT_RETENTION, 10) : 2555,
    },
    
    healthcare: {
      hipaa: {
        enabled: process.env.HIPAA_ENABLED !== 'false',
        auditLogging: process.env.HIPAA_AUDIT !== 'false',
        dataRetentionYears: process.env.HIPAA_RETENTION ? parseInt(process.env.HIPAA_RETENTION, 10) : 7,
        encryptionRequired: process.env.HIPAA_ENCRYPTION !== 'false',
        accessControlEnabled: process.env.HIPAA_ACCESS_CONTROL !== 'false',
      },
      fileUpload: {
        maxFileSize: process.env.FILE_MAX_SIZE ? parseInt(process.env.FILE_MAX_SIZE, 10) : 100 * 1024 * 1024,
        allowedMimeTypes: process.env.FILE_ALLOWED_TYPES ? 
          process.env.FILE_ALLOWED_TYPES.split(',') : [
            'application/pdf', 'image/jpeg', 'image/png', 'image/tiff',
            'application/dicom', 'text/plain'
          ],
        virusScanEnabled: process.env.FILE_VIRUS_SCAN !== 'false',
        encryptionEnabled: process.env.FILE_ENCRYPTION !== 'false',
        quarantineEnabled: process.env.FILE_QUARANTINE !== 'false',
      },
      ai: {
        enabled: process.env.AI_ENABLED !== 'false',
        providers: process.env.AI_PROVIDERS ? 
          process.env.AI_PROVIDERS.split(',') as any : ['openai'],
        maxTokens: process.env.AI_MAX_TOKENS ? parseInt(process.env.AI_MAX_TOKENS, 10) : 4000,
        temperature: process.env.AI_TEMPERATURE ? parseFloat(process.env.AI_TEMPERATURE) : 0.1,
        timeoutMs: process.env.AI_TIMEOUT ? parseInt(process.env.AI_TIMEOUT, 10) : 30000,
      },
    },
  };
}

// Configuration Validation and Loading
export function loadConfig(): Config {
  try {
    const envConfig = getEnvironmentConfig();
    const validatedConfig = configSchema.parse(envConfig);
    
    // Additional validation for production
    if (validatedConfig.environment === 'production') {
      validateProductionConfig(validatedConfig);
    }
    
    return validatedConfig;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingEnvVars = error.errors.map(err => 
        `${err.path.join('.')}: ${err.message}`
      ).join('\n');
      
      throw new Error(`Configuration validation failed:\n${missingEnvVars}`);
    }
    
    throw error;
  }
}

// Production Configuration Validation
function validateProductionConfig(config: Config): void {
  const requiredSecrets = [];
  
  if (!config.jwt.secret || config.jwt.secret.length < 64) {
    requiredSecrets.push('JWT_SECRET must be at least 64 characters in production');
  }
  
  if (!config.security.encryption.key || config.security.encryption.key.length < 64) {
    requiredSecrets.push('ENCRYPTION_KEY must be at least 64 characters in production');
  }
  
  if (!config.database.password) {
    requiredSecrets.push('DB_PASSWORD is required in production');
  }
  
  if (requiredSecrets.length > 0) {
    throw new Error(`Production configuration errors:\n${requiredSecrets.join('\n')}`);
  }
  
  // Ensure security settings are properly configured for production
  if (!config.security.cors.allowedOrigins.length) {
    throw new Error('CORS_ORIGINS must be configured in production');
  }
  
  if (config.security.cors.allowedOrigins.includes('*')) {
    throw new Error('CORS wildcard (*) is not allowed in production');
  }
}

// Configuration Singleton
let configInstance: Config | null = null;

export function getConfig(): Config {
  if (!configInstance) {
    configInstance = loadConfig();
  }
  return configInstance;
}

// Environment Helpers
export function isDevelopment(): boolean {
  return getConfig().environment === 'development';
}

export function isProduction(): boolean {
  return getConfig().environment === 'production';
}

export function isTest(): boolean {
  return getConfig().environment === 'test';
}

// Configuration Utilities
export function getRequiredEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required environment variable ${name} is not set`);
  }
  return value;
}

export function getOptionalEnvVar(name: string, defaultValue: string): string {
  return process.env[name] || defaultValue;
}

export function getBooleanEnvVar(name: string, defaultValue: boolean = false): boolean {
  const value = process.env[name];
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true';
}

export function getIntEnvVar(name: string, defaultValue: number): number {
  const value = process.env[name];
  if (value === undefined) return defaultValue;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`Environment variable ${name} must be a valid integer`);
  }
  return parsed;
}

// Health Check Configuration
export function getHealthCheckConfig() {
  const config = getConfig();
  
  return {
    database: {
      enabled: true,
      timeout: config.database.connectionTimeout,
    },
    redis: config.redis ? {
      enabled: true,
      timeout: config.redis.connectTimeout,
    } : { enabled: false },
    external: {
      enabled: isProduction(),
      services: ['ai-service', 'notification-service'],
    },
  };
}

export default getConfig;