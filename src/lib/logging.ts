/**
 * Standardized Logging System for Medical Second Opinion Platform
 * Healthcare Industry Compliant Logging with HIPAA Protection
 * 
 * This module provides consistent logging patterns across all services
 * with PHI protection, audit trail support, and structured data.
 */

import winston from 'winston';

// Log Levels for Healthcare Applications
export const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn', 
  INFO: 'info',
  HTTP: 'http',
  VERBOSE: 'verbose',
  DEBUG: 'debug',
  SILLY: 'silly',
} as const;

// Healthcare-Specific Log Categories
export const LOG_CATEGORIES = {
  AUTHENTICATION: 'authentication',
  AUTHORIZATION: 'authorization',
  AUDIT: 'audit',
  SECURITY: 'security',
  MEDICAL_DATA: 'medical_data',
  PERFORMANCE: 'performance',
  SYSTEM: 'system',
  COMPLIANCE: 'compliance',
  ERROR: 'error',
  BUSINESS_LOGIC: 'business_logic',
} as const;

// HIPAA-Compliant Log Entry Interface
export interface HealthcareLogEntry {
  level: string;
  message: string;
  timestamp: string;
  service: string;
  category: string;
  correlationId?: string;
  userId?: string;
  sessionId?: string;
  action?: string;
  resource?: string;
  resourceId?: string;
  ipAddress?: string;
  userAgent?: string;
  statusCode?: number;
  duration?: number;
  error?: {
    name: string;
    message: string;
    stack?: string;
    code?: string;
  };
  metadata?: Record<string, any>;
  hipaaCompliant: boolean;
}

// Sensitive Data Patterns for PHI Protection
const PHI_PATTERNS = [
  /\b\d{3}-\d{2}-\d{4}\b/g, // SSN
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, // Email
  /\b\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})\b/g, // Phone
  /\b\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\b/g, // Credit Card
  /\b(patient|mr|mrs|ms|dr)\.?\s+[a-z]+\b/gi, // Names with titles
  /\bMRN\s*:?\s*\d+/gi, // Medical Record Numbers
  /\bDOB\s*:?\s*\d{1,2}\/\d{1,2}\/\d{4}/gi, // Date of Birth
];

// Structured Logger Class
export class HealthcareLogger {
  private logger: winston.Logger;
  private serviceName: string;
  private defaultMetadata: Record<string, any>;

  constructor(serviceName: string, options: {
    level?: string;
    format?: 'json' | 'text';
    enableConsole?: boolean;
    enableFile?: boolean;
    logDirectory?: string;
  } = {}) {
    this.serviceName = serviceName;
    this.defaultMetadata = {
      service: serviceName,
      version: '2.0',
      environment: process.env.NODE_ENV || 'development',
    };

    // Create Winston logger with healthcare-specific configuration
    this.logger = winston.createLogger({
      level: options.level || 'info',
      levels: winston.config.npm.levels,
      format: this.createLogFormat(options.format || 'json'),
      defaultMeta: this.defaultMetadata,
      transports: this.createTransports(options),
      exitOnError: false,
    });

    // Add error handling for logger itself
    this.logger.on('error', (error) => {
      console.error('Logger error:', error);
    });
  }

  private createLogFormat(format: 'json' | 'text'): winston.Logform.Format {
    const baseFormat = winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      winston.format.errors({ stack: true }),
      winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
    );

    if (format === 'json') {
      return winston.format.combine(
        baseFormat,
        winston.format.json(),
        winston.format.printf((info) => {
          const logEntry: HealthcareLogEntry = {
            level: info.level,
            message: this.sanitizeMessage(info.message),
            timestamp: info.timestamp,
            service: this.serviceName,
            category: info.category || LOG_CATEGORIES.SYSTEM,
            correlationId: info.correlationId,
            userId: info.userId,
            sessionId: info.sessionId,
            action: info.action,
            resource: info.resource,
            resourceId: info.resourceId,
            ipAddress: info.ipAddress,
            userAgent: info.userAgent,
            statusCode: info.statusCode,
            duration: info.duration,
            error: info.error,
            metadata: this.sanitizeMetadata(info.metadata || {}),
            hipaaCompliant: this.isHIPAACompliant(info),
          };
          
          return JSON.stringify(logEntry);
        }),
      );
    } else {
      return winston.format.combine(
        baseFormat,
        winston.format.colorize(),
        winston.format.printf((info) => {
          const sanitizedMessage = this.sanitizeMessage(info.message);
          let log = `${info.timestamp} [${info.level}] ${sanitizedMessage}`;
          
          if (info.correlationId) {
            log += ` (${info.correlationId})`;
          }
          
          if (info.metadata && Object.keys(info.metadata).length > 0) {
            log += `\n${JSON.stringify(this.sanitizeMetadata(info.metadata), null, 2)}`;
          }
          
          return log;
        }),
      );
    }
  }

  private createTransports(options: any): winston.transport[] {
    const transports: winston.transport[] = [];

    // Console transport
    if (options.enableConsole !== false) {
      transports.push(
        new winston.transports.Console({
          handleExceptions: true,
          handleRejections: true,
        }),
      );
    }

    // File transports
    if (options.enableFile !== false) {
      const logDir = options.logDirectory || '/tmp/healthcare-logs';
      
      // Error log file
      transports.push(
        new winston.transports.File({
          filename: `${logDir}/${this.serviceName}-error.log`,
          level: 'error',
          maxsize: 10 * 1024 * 1024, // 10MB
          maxFiles: 5,
          handleExceptions: true,
          handleRejections: true,
        }),
      );

      // Combined log file
      transports.push(
        new winston.transports.File({
          filename: `${logDir}/${this.serviceName}-combined.log`,
          maxsize: 10 * 1024 * 1024, // 10MB
          maxFiles: 5,
        }),
      );

      // Audit log file (HIPAA requirement)
      transports.push(
        new winston.transports.File({
          filename: `${logDir}/${this.serviceName}-audit.log`,
          level: 'info',
          maxsize: 50 * 1024 * 1024, // 50MB
          maxFiles: 10,
        }),
      );
    }

    return transports;
  }

  private sanitizeMessage(message: string): string {
    if (typeof message !== 'string') {
      return String(message);
    }

    let sanitized = message;
    
    // Remove PHI patterns
    PHI_PATTERNS.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '[REDACTED]');
    });

    return sanitized;
  }

  private sanitizeMetadata(metadata: any): any {
    if (!metadata || typeof metadata !== 'object') {
      return metadata;
    }

    const sensitiveFields = [
      'password', 'hashedPassword', 'token', 'secret', 'apiKey',
      'ssn', 'socialSecurityNumber', 'phoneNumber', 'email',
      'creditCard', 'bankAccount', 'medicalRecordNumber',
      'dateOfBirth', 'patientName', 'patientData',
    ];

    const sanitizeObject = (obj: any): any => {
      if (Array.isArray(obj)) {
        return obj.map(item => sanitizeObject(item));
      }

      if (typeof obj !== 'object' || obj === null) {
        return obj;
      }

      const sanitized = { ...obj };

      for (const field of sensitiveFields) {
        if (field in sanitized) {
          sanitized[field] = '[REDACTED]';
        }
      }

      // Recursively sanitize nested objects
      for (const key in sanitized) {
        if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
          sanitized[key] = sanitizeObject(sanitized[key]);
        }
      }

      return sanitized;
    };

    return sanitizeObject(metadata);
  }

  private isHIPAACompliant(logData: any): boolean {
    const message = String(logData.message || '');
    const metadata = JSON.stringify(logData.metadata || {});
    
    // Check for PHI patterns
    return !PHI_PATTERNS.some(pattern => 
      pattern.test(message) || pattern.test(metadata),
    );
  }

  // Public Logging Methods
  public error(
    message: string,
    error?: Error,
    context: {
      category?: string;
      correlationId?: string;
      userId?: string;
      action?: string;
      resource?: string;
      metadata?: Record<string, any>;
    } = {},
  ): void {
    this.logger.error(message, {
      category: context.category || LOG_CATEGORIES.ERROR,
      correlationId: context.correlationId,
      userId: context.userId,
      action: context.action,
      resource: context.resource,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: (error as any).code,
      } : undefined,
      metadata: context.metadata,
    });
  }

  public warn(
    message: string,
    context: {
      category?: string;
      correlationId?: string;
      userId?: string;
      metadata?: Record<string, any>;
    } = {},
  ): void {
    this.logger.warn(message, {
      category: context.category || LOG_CATEGORIES.SYSTEM,
      correlationId: context.correlationId,
      userId: context.userId,
      metadata: context.metadata,
    });
  }

  public info(
    message: string,
    context: {
      category?: string;
      correlationId?: string;
      userId?: string;
      action?: string;
      resource?: string;
      metadata?: Record<string, any>;
    } = {},
  ): void {
    this.logger.info(message, {
      category: context.category || LOG_CATEGORIES.SYSTEM,
      correlationId: context.correlationId,
      userId: context.userId,
      action: context.action,
      resource: context.resource,
      metadata: context.metadata,
    });
  }

  public debug(
    message: string,
    context: {
      correlationId?: string;
      metadata?: Record<string, any>;
    } = {},
  ): void {
    this.logger.debug(message, {
      category: LOG_CATEGORIES.SYSTEM,
      correlationId: context.correlationId,
      metadata: context.metadata,
    });
  }

  // Healthcare-Specific Logging Methods
  public auditLog(
    action: string,
    resource: string,
    resourceId: string,
    context: {
      userId?: string;
      sessionId?: string;
      correlationId?: string;
      ipAddress?: string;
      userAgent?: string;
      result: 'SUCCESS' | 'FAILURE' | 'DENIED';
      metadata?: Record<string, any>;
    },
  ): void {
    this.logger.info(`Audit: ${action} on ${resource}`, {
      category: LOG_CATEGORIES.AUDIT,
      action,
      resource,
      resourceId,
      userId: context.userId,
      sessionId: context.sessionId,
      correlationId: context.correlationId,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
      metadata: {
        ...context.metadata,
        result: context.result,
        timestamp: new Date().toISOString(),
      },
    });
  }

  public securityEvent(
    event: string,
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
    context: {
      userId?: string;
      ipAddress?: string;
      correlationId?: string;
      metadata?: Record<string, any>;
    } = {},
  ): void {
    this.logger.warn(`Security Event: ${event}`, {
      category: LOG_CATEGORIES.SECURITY,
      action: 'SECURITY_EVENT',
      userId: context.userId,
      ipAddress: context.ipAddress,
      correlationId: context.correlationId,
      metadata: {
        ...context.metadata,
        severity,
        timestamp: new Date().toISOString(),
      },
    });
  }

  public performanceLog(
    operation: string,
    duration: number,
    context: {
      correlationId?: string;
      statusCode?: number;
      metadata?: Record<string, any>;
    } = {},
  ): void {
    const level = duration > 5000 ? 'warn' : duration > 2000 ? 'info' : 'debug';
    
    this.logger.log(level, `Performance: ${operation}`, {
      category: LOG_CATEGORIES.PERFORMANCE,
      action: operation,
      duration,
      correlationId: context.correlationId,
      statusCode: context.statusCode,
      metadata: context.metadata,
    });
  }

  public httpLog(
    method: string,
    url: string,
    statusCode: number,
    duration: number,
    context: {
      userId?: string;
      correlationId?: string;
      ipAddress?: string;
      userAgent?: string;
      metadata?: Record<string, any>;
    } = {},
  ): void {
    const level = statusCode >= 400 ? 'warn' : 'info';
    
    this.logger.log(level, `${method} ${url} ${statusCode}`, {
      category: LOG_CATEGORIES.SYSTEM,
      action: 'HTTP_REQUEST',
      userId: context.userId,
      correlationId: context.correlationId,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
      statusCode,
      duration,
      metadata: {
        ...context.metadata,
        method,
        url,
      },
    });
  }
}

// Factory function for creating service-specific loggers
export function createHealthcareLogger(serviceName: string, options?: {
  level?: string;
  format?: 'json' | 'text';
  enableConsole?: boolean;
  enableFile?: boolean;
  logDirectory?: string;
}): HealthcareLogger {
  return new HealthcareLogger(serviceName, options);
}

// Express middleware for HTTP request logging
export function createHttpLoggingMiddleware(logger: HealthcareLogger) {
  return (req: any, res: any, next: any) => {
    const start = Date.now();
    const correlationId = req.headers['x-correlation-id'] || 
                         req.headers['x-request-id'] || 
                         `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Add correlation ID to request for downstream use
    req.correlationId = correlationId;
    
    // Override res.end to capture response
    const originalEnd = res.end;
    res.end = function(chunk: any, encoding: any) {
      const duration = Date.now() - start;
      
      logger.httpLog(
        req.method,
        req.originalUrl || req.url,
        res.statusCode,
        duration,
        {
          userId: req.user?.id || req.userId,
          correlationId,
          ipAddress: req.ip || req.connection.remoteAddress,
          userAgent: req.get('User-Agent'),
          metadata: {
            contentLength: res.get('Content-Length'),
            contentType: res.get('Content-Type'),
          },
        },
      );
      
      originalEnd.call(res, chunk, encoding);
    };
    
    next();
  };
}

// Next.js middleware for API route logging
export function withLogging<T extends (...args: any[]) => Promise<any>>(
  handler: T,
  logger: HealthcareLogger,
  operation: string,
): T {
  return (async (...args: any[]) => {
    const start = Date.now();
    const correlationId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    try {
      logger.info(`Starting ${operation}`, {
        correlationId,
        action: operation,
        metadata: { args: args.length },
      });
      
      const result = await handler(...args);
      const duration = Date.now() - start;
      
      logger.performanceLog(operation, duration, { correlationId });
      
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      
      logger.error(
        `Failed ${operation}`,
        error as Error,
        {
          correlationId,
          action: operation,
          metadata: { duration },
        },
      );
      
      throw error;
    }
  }) as T;
}

// Export types and constants
export type { HealthcareLogEntry };
export { LOG_LEVELS, LOG_CATEGORIES };