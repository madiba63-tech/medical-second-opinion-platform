// Logging Utility
// Following v2.0 Architecture requirements for observability

import winston from 'winston';
import { config } from '../config/environment';

// Define log levels and colors
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
};

winston.addColors(logColors);

// Create logger instance
export const logger = winston.createLogger({
  level: config.logging.level,
  levels: logLevels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS',
    }),
    winston.format.errors({ stack: true }),
    winston.format.metadata({
      fillExcept: ['message', 'level', 'timestamp'],
    }),
    // Conditional formatting based on environment
    config.logging.format === 'json'
      ? winston.format.combine(
          winston.format.json(),
          winston.format.printf((info) => {
            const log = {
              timestamp: info.timestamp,
              level: info.level,
              message: info.message,
              service: 'patient-identity-service',
              environment: config.environment,
              ...(info.metadata && Object.keys(info.metadata).length > 0 ? { metadata: info.metadata } : {}),
            };
            return JSON.stringify(log);
          })
        )
      : winston.format.combine(
          winston.format.colorize(),
          winston.format.printf((info) => {
            let log = `${info.timestamp} [${info.level}]: ${info.message}`;
            
            if (info.metadata && Object.keys(info.metadata).length > 0) {
              log += `\n${JSON.stringify(info.metadata, null, 2)}`;
            }
            
            if (info.stack) {
              log += `\n${info.stack}`;
            }
            
            return log;
          })
        )
  ),
  defaultMeta: {
    service: 'patient-identity-service',
    version: '1.0.0',
    environment: config.environment,
  },
  transports: [
    // Console transport
    new winston.transports.Console({
      handleExceptions: true,
      handleRejections: true,
    }),
    
    // File transport for errors
    new winston.transports.File({
      filename: '/tmp/microservice/error.log',
      level: 'error',
      handleExceptions: true,
      handleRejections: true,
      maxsize: 10 * 1024 * 1024, // 10MB
      maxFiles: 5,
      tailable: true,
    }),
    
    // File transport for all logs
    new winston.transports.File({
      filename: '/tmp/microservice/combined.log',
      handleExceptions: true,
      handleRejections: true,
      maxsize: 10 * 1024 * 1024, // 10MB
      maxFiles: 5,
      tailable: true,
    }),
  ],
  exitOnError: false,
});

// Production-specific configuration
if (config.environment === 'production') {
  // Add structured logging for production
  logger.add(new winston.transports.File({
    filename: '/tmp/microservice/audit.log',
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    maxsize: 50 * 1024 * 1024, // 50MB
    maxFiles: 10,
    tailable: true,
  }));
}

// Development-specific configuration
if (config.environment === 'development') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }));
}

// Health check logger
export const healthLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'patient-identity-service',
    type: 'health-check',
  },
  transports: [
    new winston.transports.File({
      filename: '/tmp/microservice/health.log',
      maxsize: 5 * 1024 * 1024, // 5MB
      maxFiles: 3,
      tailable: true,
    }),
  ],
});

// Security audit logger
export const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'patient-identity-service',
    type: 'security',
  },
  transports: [
    new winston.transports.File({
      filename: '/tmp/microservice/security.log',
      maxsize: 20 * 1024 * 1024, // 20MB
      maxFiles: 10,
      tailable: true,
    }),
  ],
});

// Performance logger
export const performanceLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'patient-identity-service',
    type: 'performance',
  },
  transports: [
    new winston.transports.File({
      filename: '/tmp/microservice/performance.log',
      maxsize: 10 * 1024 * 1024, // 10MB
      maxFiles: 5,
      tailable: true,
    }),
  ],
});

// Utility functions for structured logging
export const logWithContext = (
  level: 'error' | 'warn' | 'info' | 'debug',
  message: string,
  context: Record<string, any> = {},
  error?: Error
) => {
  logger.log(level, message, {
    ...context,
    ...(error && { error: error.message, stack: error.stack }),
  });
};

export const logError = (message: string, error: Error, context: Record<string, any> = {}) => {
  logger.error(message, {
    error: error.message,
    stack: error.stack,
    ...context,
  });
};

export const logPerformance = (
  operation: string,
  duration: number,
  context: Record<string, any> = {}
) => {
  performanceLogger.info('Performance metric', {
    operation,
    duration,
    ...context,
  });
};

export const logSecurity = (
  event: string,
  userId?: string,
  context: Record<string, any> = {}
) => {
  securityLogger.info('Security event', {
    event,
    userId,
    timestamp: new Date().toISOString(),
    ...context,
  });
};

// Request correlation ID generator
export const generateCorrelationId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Log sanitization for sensitive data
export const sanitizeLogData = (data: any): any => {
  if (!data || typeof data !== 'object') {
    return data;
  }

  const sensitiveFields = [
    'password',
    'hashedPassword',
    'token',
    'secret',
    'apiKey',
    'authorization',
    'cookie',
    'ssn',
    'socialSecurityNumber',
    'creditCard',
    'bankAccount',
  ];

  const sanitized = { ...data };

  for (const field of sensitiveFields) {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]';
    }
  }

  // Recursively sanitize nested objects
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeLogData(sanitized[key]);
    }
  }

  return sanitized;
};

// Middleware for request logging
export const createRequestLogger = () => {
  return (req: any, res: any, next: any) => {
    const correlationId = generateCorrelationId();
    req.correlationId = correlationId;
    
    const startTime = Date.now();
    
    // Log request start
    logger.info('Request started', {
      correlationId,
      method: req.method,
      url: req.url,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      timestamp: new Date().toISOString(),
    });
    
    // Override res.end to log response
    const originalEnd = res.end;
    res.end = function (chunk: any, encoding: any) {
      const duration = Date.now() - startTime;
      
      logger.info('Request completed', {
        correlationId,
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        duration,
        timestamp: new Date().toISOString(),
      });
      
      // Log performance metrics for slow requests
      if (duration > 1000) {
        logPerformance('slow_request', duration, {
          correlationId,
          method: req.method,
          url: req.url,
          statusCode: res.statusCode,
        });
      }
      
      originalEnd.call(res, chunk, encoding);
    };
    
    next();
  };
};

export default logger;