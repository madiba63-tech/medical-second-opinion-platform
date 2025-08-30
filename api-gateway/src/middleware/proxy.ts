import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { Request, Response } from 'express';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';
import { ServiceUnavailableError } from '../types/errors.js';

interface ProxyRoute {
  path: string;
  target: string;
  pathRewrite?: Record<string, string>;
  changeOrigin?: boolean;
  timeout?: number;
  retries?: number;
  healthCheck?: boolean;
}

const proxyRoutes: ProxyRoute[] = [
  {
    path: '/api/v1/auth',
    target: config.services.identity,
    pathRewrite: { '^/api/v1/auth': '/api/v1/auth' },
    changeOrigin: true,
    timeout: config.proxy.timeout,
    healthCheck: true,
  },
  {
    path: '/api/v1/profile',
    target: config.services.identity,
    pathRewrite: { '^/api/v1/profile': '/api/v1/profile' },
    changeOrigin: true,
    timeout: config.proxy.timeout,
    healthCheck: true,
  },
  {
    path: '/api/v1/cases',
    target: config.services.cases,
    pathRewrite: { '^/api/v1/cases': '/api/v1/cases' },
    changeOrigin: true,
    timeout: config.proxy.timeout,
    healthCheck: true,
  },
  {
    path: '/api/v1/documents',
    target: config.services.cases,
    pathRewrite: { '^/api/v1/documents': '/api/v1/documents' },
    changeOrigin: true,
    timeout: config.proxy.timeout,
    healthCheck: true,
  },
  {
    path: '/api/v1/assignments',
    target: config.services.cases,
    pathRewrite: { '^/api/v1/assignments': '/api/v1/assignments' },
    changeOrigin: true,
    timeout: config.proxy.timeout,
    healthCheck: true,
  },
  {
    path: '/api/v1/analysis',
    target: config.services.ai,
    pathRewrite: { '^/api/v1/analysis': '/api/v1/analysis' },
    changeOrigin: true,
    timeout: config.proxy.timeout,
    healthCheck: true,
  },
  {
    path: '/api/v1/insights',
    target: config.services.ai,
    pathRewrite: { '^/api/v1/insights': '/api/v1/insights' },
    changeOrigin: true,
    timeout: config.proxy.timeout,
    healthCheck: true,
  },
  {
    path: '/api/v1/models',
    target: config.services.ai,
    pathRewrite: { '^/api/v1/models': '/api/v1/models' },
    changeOrigin: true,
    timeout: config.proxy.timeout,
    healthCheck: true,
  },
  {
    path: '/api/v1/professionals',
    target: config.services.professional,
    pathRewrite: { '^/api/v1/professionals': '/api/v1/professionals' },
    changeOrigin: true,
    timeout: config.proxy.timeout,
    healthCheck: true,
  },
  {
    path: '/api/v1/availability',
    target: config.services.professional,
    pathRewrite: { '^/api/v1/availability': '/api/v1/availability' },
    changeOrigin: true,
    timeout: config.proxy.timeout,
    healthCheck: true,
  },
  {
    path: '/api/v1/reviews',
    target: config.services.professional,
    pathRewrite: { '^/api/v1/reviews': '/api/v1/reviews' },
    changeOrigin: true,
    timeout: config.proxy.timeout,
    healthCheck: true,
  },
  {
    path: '/api/v1/notifications',
    target: config.services.notification,
    pathRewrite: { '^/api/v1/notifications': '/api/v1/notifications' },
    changeOrigin: true,
    timeout: config.proxy.timeout,
    healthCheck: true,
  },
  {
    path: '/api/v1/preferences',
    target: config.services.notification,
    pathRewrite: { '^/api/v1/preferences': '/api/v1/preferences' },
    changeOrigin: true,
    timeout: config.proxy.timeout,
    healthCheck: true,
  },
  {
    path: '/api/v1/templates',
    target: config.services.notification,
    pathRewrite: { '^/api/v1/templates': '/api/v1/templates' },
    changeOrigin: true,
    timeout: config.proxy.timeout,
    healthCheck: true,
  },
  {
    path: '/api/v1/campaigns',
    target: config.services.notification,
    pathRewrite: { '^/api/v1/campaigns': '/api/v1/campaigns' },
    changeOrigin: true,
    timeout: config.proxy.timeout,
    healthCheck: true,
  },
];

// Service health tracking
const serviceHealth: Record<string, boolean> = {};

export const createProxyRoutes = () => {
  return proxyRoutes.map((route) => {
    const proxyOptions: Options = {
      target: route.target,
      changeOrigin: route.changeOrigin ?? true,
      timeout: route.timeout || config.proxy.timeout,
      pathRewrite: route.pathRewrite,
      
      onProxyReq: (proxyReq, req: Request) => {
        logger.debug('Proxy request', {
          path: req.path,
          target: route.target,
          method: req.method,
          userId: req.user?.userId,
        });

        // Add correlation ID
        const correlationId = req.headers['x-correlation-id'] || 
                             req.headers['x-request-id'] || 
                             generateCorrelationId();
        
        proxyReq.setHeader('x-correlation-id', correlationId);
        proxyReq.setHeader('x-forwarded-for', req.ip || '');
        proxyReq.setHeader('x-forwarded-proto', req.protocol);
        proxyReq.setHeader('x-forwarded-host', req.get('host') || '');
        
        // Add user context headers if authenticated
        if (req.user) {
          proxyReq.setHeader('x-user-id', req.user.userId);
          proxyReq.setHeader('x-customer-id', req.user.customerId || '');
          proxyReq.setHeader('x-user-role', req.user.role);
          proxyReq.setHeader('x-service-token', 'internal-service-token');
        }
      },

      onProxyRes: (proxyRes, req: Request, res: Response) => {
        logger.debug('Proxy response', {
          path: req.path,
          target: route.target,
          statusCode: proxyRes.statusCode,
          userId: req.user?.userId,
        });

        // Update service health status
        const serviceName = getServiceName(route.target);
        serviceHealth[serviceName] = proxyRes.statusCode !== undefined && proxyRes.statusCode < 500;

        // Add response headers
        proxyRes.headers['x-gateway-version'] = '1.0.0';
        proxyRes.headers['x-response-time'] = Date.now().toString();
      },

      onError: (err, req: Request, res: Response) => {
        logger.error('Proxy error', {
          path: req.path,
          target: route.target,
          error: err.message,
          userId: req.user?.userId,
          stack: err.stack,
        });

        // Update service health status
        const serviceName = getServiceName(route.target);
        serviceHealth[serviceName] = false;

        // Handle different types of errors
        if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
          res.status(503).json({
            success: false,
            error: 'Service temporarily unavailable',
            message: 'The requested service is currently unavailable. Please try again later.',
            code: 'SERVICE_UNAVAILABLE',
            timestamp: new Date().toISOString(),
          });
        } else if (err.code === 'ETIMEDOUT') {
          res.status(504).json({
            success: false,
            error: 'Gateway timeout',
            message: 'The service took too long to respond. Please try again.',
            code: 'GATEWAY_TIMEOUT',
            timestamp: new Date().toISOString(),
          });
        } else {
          res.status(502).json({
            success: false,
            error: 'Bad gateway',
            message: 'An error occurred while processing your request.',
            code: 'BAD_GATEWAY',
            timestamp: new Date().toISOString(),
          });
        }
      },
    };

    return {
      path: route.path,
      proxy: createProxyMiddleware(proxyOptions),
    };
  });
};

export const getServiceHealth = (): Record<string, boolean> => {
  return { ...serviceHealth };
};

export const checkServiceHealth = async (serviceName: string, url: string): Promise<boolean> => {
  try {
    const axios = (await import('axios')).default;
    const response = await axios.get(`${url}/health`, {
      timeout: config.healthCheck.timeout,
    });
    
    const isHealthy = response.status === 200 && response.data?.status === 'healthy';
    serviceHealth[serviceName] = isHealthy;
    
    return isHealthy;
  } catch (error) {
    logger.warn('Health check failed', {
      service: serviceName,
      url,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    
    serviceHealth[serviceName] = false;
    return false;
  }
};

const getServiceName = (target: string): string => {
  if (target.includes('3001')) return 'identity';
  if (target.includes('3002')) return 'cases';
  if (target.includes('3003')) return 'ai';
  if (target.includes('3004')) return 'professional';
  if (target.includes('3005')) return 'notification';
  return 'unknown';
};

const generateCorrelationId = (): string => {
  return `gw-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};