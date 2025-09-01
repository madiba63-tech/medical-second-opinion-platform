// Centralized logging system for medical second opinion platform
const winston = require('winston');
const path = require('path');

// Log levels for healthcare applications
const logLevels = {
  error: 0,
  security: 1,
  audit: 2,
  warn: 3,
  info: 4,
  http: 5,
  debug: 6,
};

const logColors = {
  error: 'red',
  security: 'magenta',
  audit: 'blue',
  warn: 'yellow',
  info: 'green',
  http: 'cyan',
  debug: 'white',
};

winston.addColors(logColors);

// Custom format for structured logging
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ level, message, timestamp, service, requestId, userId, action, ...meta }) => {
    let logEntry = `${timestamp} [${level.toUpperCase()}]`;
    
    if (service) logEntry += ` [${service}]`;
    if (requestId) logEntry += ` [${requestId}]`;
    if (userId) logEntry += ` [User:${userId}]`;
    if (action) logEntry += ` [${action}]`;
    
    logEntry += `: ${message}`;
    
    // Add metadata
    if (Object.keys(meta).length > 0) {
      logEntry += ` | ${JSON.stringify(meta)}`;
    }
    
    return logEntry;
  })
);

// GDPR/HIPAA compliant format (no PII)
const complianceLogFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: false }), // No stack traces in compliance logs
  winston.format.printf(({ level, message, timestamp, service, requestId, sessionType, action, ...sanitizedMeta }) => {
    let logEntry = `${timestamp} [${level.toUpperCase()}]`;
    
    if (service) logEntry += ` [${service}]`;
    if (requestId) logEntry += ` [${requestId}]`;
    if (sessionType) logEntry += ` [${sessionType}]`; // 'professional' or 'customer'
    if (action) logEntry += ` [${action}]`;
    
    logEntry += `: ${message}`;
    
    // Only include non-PII metadata
    const allowedFields = ['statusCode', 'duration', 'fileSize', 'documentType', 'competencyLevel'];
    const filteredMeta = Object.keys(sanitizedMeta)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = sanitizedMeta[key];
        return obj;
      }, {});
    
    if (Object.keys(filteredMeta).length > 0) {
      logEntry += ` | ${JSON.stringify(filteredMeta)}`;
    }
    
    return logEntry;
  })
);

// Create logger factory
function createLogger(serviceName) {
  const isProduction = process.env.NODE_ENV === 'production';
  const logDir = path.join(process.cwd(), 'logs');
  
  // Ensure logs directory exists
  const fs = require('fs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  const transports = [];
  
  // Console transport for development
  if (!isProduction) {
    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          logFormat
        ),
        level: 'debug'
      })
    );
  }
  
  // File transports
  transports.push(
    // General application logs
    new winston.transports.File({
      filename: path.join(logDir, `${serviceName}.log`),
      format: logFormat,
      level: 'info',
      maxsize: 10485760, // 10MB
      maxFiles: 5,
      tailable: true
    }),
    
    // Error logs
    new winston.transports.File({
      filename: path.join(logDir, `${serviceName}-error.log`),
      format: logFormat,
      level: 'error',
      maxsize: 10485760, // 10MB
      maxFiles: 10,
      tailable: true
    }),
    
    // Security logs (GDPR/HIPAA compliant)
    new winston.transports.File({
      filename: path.join(logDir, `${serviceName}-security.log`),
      format: complianceLogFormat,
      level: 'security',
      maxsize: 10485760, // 10MB
      maxFiles: 50, // Keep security logs longer
      tailable: true
    }),
    
    // Audit logs (GDPR/HIPAA compliant)
    new winston.transports.File({
      filename: path.join(logDir, `${serviceName}-audit.log`),
      format: complianceLogFormat,
      level: 'audit',
      maxsize: 10485760, // 10MB
      maxFiles: 100, // Keep audit logs much longer for compliance
      tailable: true
    })
  );
  
  // Add external logging service in production
  if (isProduction && process.env.EXTERNAL_LOG_ENDPOINT) {
    const { HttpTransport } = require('winston-transport-http');
    transports.push(
      new HttpTransport({
        host: process.env.EXTERNAL_LOG_HOST,
        path: process.env.EXTERNAL_LOG_PATH,
        port: process.env.EXTERNAL_LOG_PORT,
        headers: {
          'Authorization': `Bearer ${process.env.EXTERNAL_LOG_TOKEN}`,
          'Content-Type': 'application/json'
        },
        level: 'error'
      })
    );
  }
  
  const logger = winston.createLogger({
    levels: logLevels,
    format: logFormat,
    defaultMeta: { service: serviceName },
    transports,
    exitOnError: false
  });
  
  // Add custom methods
  logger.security = (message, meta = {}) => {
    logger.log('security', message, { ...meta, timestamp: new Date().toISOString() });
  };
  
  logger.audit = (message, meta = {}) => {
    logger.log('audit', message, { ...meta, timestamp: new Date().toISOString() });
  };
  
  logger.http = (req, res, duration) => {
    const { method, url, headers } = req;
    const { statusCode } = res;
    
    logger.log('http', `${method} ${url} ${statusCode}`, {
      method,
      url,
      statusCode,
      duration: `${duration}ms`,
      userAgent: headers['user-agent'],
      ip: headers['x-forwarded-for'] || req.connection?.remoteAddress,
      requestId: req.requestId
    });
  };
  
  // Professional recruitment specific logging
  logger.professional = {
    applicationSubmitted: (professionalId, competencyLevel, meta = {}) => {
      logger.audit('Professional application submitted', {
        action: 'PROFESSIONAL_APPLICATION_SUBMIT',
        professionalId,
        competencyLevel,
        sessionType: 'professional',
        ...meta
      });
    },
    
    documentAnalyzed: (professionalId, documentType, confidence, meta = {}) => {
      logger.audit('Document analyzed by AI', {
        action: 'DOCUMENT_AI_ANALYSIS',
        professionalId,
        documentType,
        confidence,
        sessionType: 'professional',
        ...meta
      });
    },
    
    competencyScored: (professionalId, score, level, meta = {}) => {
      logger.audit('Professional competency scored', {
        action: 'COMPETENCY_SCORING',
        professionalId,
        competencyScore: score,
        competencyLevel: level,
        sessionType: 'professional',
        ...meta
      });
    }
  };
  
  // Customer interaction logging
  logger.customer = {
    caseCreated: (customerId, caseId, meta = {}) => {
      logger.audit('Customer case created', {
        action: 'CASE_CREATE',
        customerId,
        caseId,
        sessionType: 'customer',
        ...meta
      });
    },
    
    paymentProcessed: (customerId, amount, currency, meta = {}) => {
      logger.audit('Payment processed', {
        action: 'PAYMENT_PROCESS',
        customerId,
        amount,
        currency,
        sessionType: 'customer',
        ...meta
      });
    }
  };
  
  // Error logging with context
  logger.errorWithContext = (error, context = {}) => {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      code: error.code,
      statusCode: error.statusCode,
      ...context
    };
    
    logger.error('Application error occurred', errorInfo);
    
    // Also log to security if it's a security-related error
    if (error.code && ['UNAUTHORIZED', 'INVALID_TOKEN', 'INSUFFICIENT_PERMISSIONS'].includes(error.code)) {
      logger.security('Security error detected', {
        errorCode: error.code,
        statusCode: error.statusCode,
        action: context.action,
        ip: context.ip,
        userAgent: context.userAgent,
        requestId: context.requestId
      });
    }
  };
  
  return logger;
}

// Express middleware for request logging
function createRequestLogger(serviceName) {
  const logger = createLogger(serviceName);
  
  return (req, res, next) => {
    const startTime = Date.now();
    
    // Generate request ID for tracing
    req.requestId = `${serviceName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Log request start
    logger.info('Request started', {
      method: req.method,
      url: req.url,
      requestId: req.requestId,
      ip: req.headers['x-forwarded-for'] || req.connection?.remoteAddress,
      userAgent: req.headers['user-agent']
    });
    
    // Override res.end to log response
    const originalEnd = res.end;
    res.end = function(...args) {
      const duration = Date.now() - startTime;
      
      logger.http(req, res, duration);
      
      // Log slow requests
      if (duration > 2000) {
        logger.warn('Slow request detected', {
          method: req.method,
          url: req.url,
          duration: `${duration}ms`,
          requestId: req.requestId
        });
      }
      
      originalEnd.apply(this, args);
    };
    
    next();
  };
}

// Health check logger
function logHealthCheck(serviceName, checks) {
  const logger = createLogger(serviceName);
  const healthStatus = checks.every(check => check.status === 'healthy') ? 'healthy' : 'unhealthy';
  
  logger.info(`Health check: ${healthStatus}`, {
    action: 'HEALTH_CHECK',
    status: healthStatus,
    checks: checks.map(check => ({
      name: check.name,
      status: check.status,
      responseTime: check.responseTime
    }))
  });
  
  // Alert on unhealthy services
  if (healthStatus === 'unhealthy') {
    logger.error('Service health check failed', {
      action: 'HEALTH_CHECK_FAILURE',
      failedChecks: checks.filter(check => check.status !== 'healthy')
    });
  }
}

// Export factory and utilities
module.exports = {
  createLogger,
  createRequestLogger,
  logHealthCheck,
  logLevels
};

// Example usage:
// const { createLogger, createRequestLogger } = require('./shared/logger');
// const logger = createLogger('professional-recruitment');
// app.use(createRequestLogger('professional-recruitment'));
// logger.professional.applicationSubmitted(professionalId, competencyLevel);