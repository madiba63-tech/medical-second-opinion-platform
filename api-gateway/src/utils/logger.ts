import winston from 'winston';
import { config } from '../config/index.js';

const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS',
  }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, service = 'api-gateway', ...meta }) => {
    return JSON.stringify({
      timestamp,
      level,
      service,
      message,
      ...meta,
    });
  })
);

const consoleFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  winston.format.colorize(),
  winston.format.printf(({ timestamp, level, message, service = 'api-gateway', ...meta }) => {
    const metaString = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp} [${service}] ${level}: ${message}${metaString}`;
  })
);

export const logger = winston.createLogger({
  level: config.logging.level,
  format: config.nodeEnv === 'production' ? logFormat : consoleFormat,
  defaultMeta: {
    service: 'api-gateway',
    version: process.env.npm_package_version || '1.0.0',
    nodeEnv: config.nodeEnv,
  },
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      handleRejections: true,
    }),
  ],
});

// Add file transport in production
if (config.nodeEnv === 'production') {
  logger.add(
    new winston.transports.File({
      filename: 'logs/api-gateway-error.log',
      level: 'error',
      handleExceptions: true,
      handleRejections: true,
    })
  );

  logger.add(
    new winston.transports.File({
      filename: 'logs/api-gateway-combined.log',
      handleExceptions: true,
      handleRejections: true,
    })
  );
}

export const requestLogger = (req: any, res: any, next: any) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.connection.remoteAddress,
      userId: req.user?.userId,
    };

    if (res.statusCode >= 400) {
      logger.error('HTTP Request Error', logData);
    } else {
      logger.info('HTTP Request', logData);
    }
  });

  next();
};