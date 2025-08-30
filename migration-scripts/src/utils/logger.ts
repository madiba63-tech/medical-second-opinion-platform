import winston from 'winston';
import path from 'path';
import { config } from '../config/index.js';

const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS',
  }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, service = 'migration', ...meta }) => {
    const metaString = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp} [${service}] ${level.toUpperCase()}: ${message}${metaString}`;
  })
);

const jsonFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS',
  }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, service = 'migration', ...meta }) => {
    return JSON.stringify({
      timestamp,
      level,
      service,
      message,
      ...meta,
    });
  })
);

const transports: winston.transport[] = [];

// Console transport
if (config.logging.console) {
  transports.push(
    new winston.transports.Console({
      format: logFormat,
      handleExceptions: true,
      handleRejections: true,
    })
  );
}

// File transport
if (config.logging.file) {
  const logDir = path.dirname(config.logging.file);
  
  transports.push(
    new winston.transports.File({
      filename: config.logging.file,
      format: jsonFormat,
      handleExceptions: true,
      handleRejections: true,
    })
  );

  // Separate error log file
  transports.push(
    new winston.transports.File({
      filename: path.join(logDir, 'migration-error.log'),
      level: 'error',
      format: jsonFormat,
      handleExceptions: true,
      handleRejections: true,
    })
  );
}

export const logger = winston.createLogger({
  level: config.logging.level,
  format: jsonFormat,
  defaultMeta: {
    service: 'migration',
    version: '1.0.0',
  },
  transports,
});

// Migration-specific logging functions
export const migrationLogger = {
  startMigration: (migrationName: string, totalRecords: number) => {
    logger.info('Migration started', {
      migration: migrationName,
      totalRecords,
      batchSize: config.migration.batchSize,
      dryRun: config.migration.dryRun,
    });
  },

  batchProgress: (migrationName: string, processed: number, total: number, batchTime: number) => {
    const percentage = Math.round((processed / total) * 100);
    logger.info('Migration progress', {
      migration: migrationName,
      processed,
      total,
      percentage: `${percentage}%`,
      batchTime: `${batchTime}ms`,
      recordsPerSecond: Math.round(config.migration.batchSize / (batchTime / 1000)),
    });
  },

  migrationComplete: (migrationName: string, totalRecords: number, totalTime: number, errors: number) => {
    logger.info('Migration completed', {
      migration: migrationName,
      totalRecords,
      totalTime: `${totalTime}ms`,
      recordsPerSecond: Math.round(totalRecords / (totalTime / 1000)),
      errors,
      success: errors === 0,
    });
  },

  migrationError: (migrationName: string, error: Error, recordId?: string | number) => {
    logger.error('Migration error', {
      migration: migrationName,
      error: error.message,
      stack: error.stack,
      recordId,
    });
  },

  validationError: (migrationName: string, field: string, expected: any, actual: any, recordId?: string | number) => {
    logger.warn('Validation error', {
      migration: migrationName,
      field,
      expected,
      actual,
      recordId,
    });
  },

  dataTransformation: (migrationName: string, transformationType: string, recordId: string | number, details: any) => {
    logger.debug('Data transformation', {
      migration: migrationName,
      transformation: transformationType,
      recordId,
      details,
    });
  },

  skippedRecord: (migrationName: string, reason: string, recordId: string | number) => {
    logger.warn('Record skipped', {
      migration: migrationName,
      reason,
      recordId,
    });
  },
};

// Performance monitoring
export class PerformanceTimer {
  private startTime: number;
  private label: string;

  constructor(label: string) {
    this.label = label;
    this.startTime = Date.now();
    logger.debug('Performance timer started', { label });
  }

  end(): number {
    const duration = Date.now() - this.startTime;
    logger.debug('Performance timer ended', {
      label: this.label,
      duration: `${duration}ms`,
    });
    return duration;
  }

  checkpoint(checkpointName: string): number {
    const duration = Date.now() - this.startTime;
    logger.debug('Performance checkpoint', {
      label: this.label,
      checkpoint: checkpointName,
      duration: `${duration}ms`,
    });
    return duration;
  }
}

// Memory usage monitoring
export const logMemoryUsage = (context: string) => {
  const memUsage = process.memoryUsage();
  logger.debug('Memory usage', {
    context,
    heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
    heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`,
    external: `${Math.round(memUsage.external / 1024 / 1024)}MB`,
    rss: `${Math.round(memUsage.rss / 1024 / 1024)}MB`,
  });
};