const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:3006', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(express.json({ limit: '10mb' }));

// Service configurations with proper routing
const services = {
  identity: { 
    target: 'http://localhost:3001',
    pathPattern: '/api/v1/auth',
    description: 'Authentication and user management'
  },
  cases: { 
    target: 'http://localhost:3002',
    pathPattern: '/api/v1/cases',
    description: 'Case management and processing'
  },
  ai: { 
    target: 'http://localhost:3003',
    pathPattern: '/api/v1/analysis',
    description: 'AI-powered medical analysis'
  },
  professionals: { 
    target: 'http://localhost:3004',
    pathPattern: '/api/v1/professionals',
    description: 'Healthcare professional services'
  },
  notifications: { 
    target: 'http://localhost:3005',
    pathPattern: '/api/v1/notifications',
    description: 'Communication and notifications'
  }
};

// Create proxy middleware for each service
Object.entries(services).forEach(([name, config]) => {
  const proxyOptions = {
    target: config.target,
    changeOrigin: true,
    timeout: 30000,
    proxyTimeout: 30000,
    pathRewrite: (path, req) => {
      // Remove the service prefix and keep the rest
      return path;
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`[GATEWAY] ${req.method} ${req.url} -> ${name} service`);
      
      // Forward authentication headers
      if (req.headers.authorization) {
        proxyReq.setHeader('Authorization', req.headers.authorization);
      }
      
      // Add service routing header
      proxyReq.setHeader('X-Forwarded-Service', name);
      proxyReq.setHeader('X-Forwarded-Host', req.get('Host'));
    },
    onProxyRes: (proxyRes, req, res) => {
      // Add CORS headers to proxied responses
      proxyRes.headers['Access-Control-Allow-Origin'] = req.headers.origin || '*';
      proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
      
      console.log(`[GATEWAY] ${name} -> ${proxyRes.statusCode} ${req.method} ${req.url}`);
    },
    onError: (err, req, res) => {
      console.error(`[GATEWAY] Proxy error for ${name}:`, err.message);
      
      if (!res.headersSent) {
        res.status(502).json({
          success: false,
          error: 'Service unavailable',
          message: `${name} service is not responding`,
          service: name,
          timestamp: new Date().toISOString(),
          code: 'SERVICE_UNAVAILABLE'
        });
      }
    }
  };

  // Mount the proxy middleware
  app.use(config.pathPattern, createProxyMiddleware(proxyOptions));
  console.log(`[GATEWAY] Registered proxy: ${config.pathPattern} -> ${config.target}`);
});

// Gateway health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'enhanced-api-gateway',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    features: ['service-routing', 'authentication-proxy', 'health-aggregation']
  });
});

// Service health aggregation
app.get('/health/services', async (req, res) => {
  const serviceStatus = {};
  
  for (const [name, config] of Object.entries(services)) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`${config.target}/health`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'API-Gateway-Health-Check'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const healthData = await response.json();
        serviceStatus[name] = {
          status: 'healthy',
          url: config.target,
          description: config.description,
          version: healthData.version || 'unknown',
          uptime: healthData.uptime || 0,
          features: healthData.features || []
        };
      } else {
        serviceStatus[name] = {
          status: 'unhealthy',
          url: config.target,
          description: config.description,
          error: `HTTP ${response.status}`
        };
      }
    } catch (error) {
      serviceStatus[name] = {
        status: 'unreachable',
        url: config.target,
        description: config.description,
        error: error.name === 'AbortError' ? 'Timeout' : error.message
      };
    }
  }
  
  const healthyCount = Object.values(serviceStatus).filter(s => s.status === 'healthy').length;
  const totalServices = Object.keys(services).length;
  
  res.json({
    gateway: {
      status: 'healthy',
      version: '2.0.0',
      uptime: process.uptime()
    },
    services: serviceStatus,
    summary: {
      total: totalServices,
      healthy: healthyCount,
      unhealthy: totalServices - healthyCount,
      healthPercentage: Math.round((healthyCount / totalServices) * 100)
    },
    timestamp: new Date().toISOString()
  });
});

// API documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    service: 'Second Opinion Platform API Gateway',
    version: '2.0.0',
    description: 'Central API gateway for microservices routing',
    services: Object.entries(services).map(([name, config]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      endpoint: config.pathPattern,
      target: config.target,
      description: config.description
    })),
    endpoints: {
      health: {
        path: '/health',
        method: 'GET',
        description: 'Gateway health check'
      },
      serviceHealth: {
        path: '/health/services',
        method: 'GET', 
        description: 'Aggregated service health status'
      },
      authentication: {
        login: 'POST /api/v1/auth/login',
        register: 'POST /api/v1/auth/register',
        profile: 'GET /api/v1/auth/me',
        refresh: 'POST /api/v1/auth/refresh'
      }
    },
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Second Opinion Platform - Enhanced API Gateway',
    version: '2.0.0',
    description: 'Microservices API Gateway with authentication routing',
    endpoints: {
      health: '/health',
      services: '/health/services',
      documentation: '/api/docs',
      authentication: '/api/v1/auth/*',
      cases: '/api/v1/cases/*',
      analysis: '/api/v1/analysis/*',
      professionals: '/api/v1/professionals/*',
      notifications: '/api/v1/notifications/*'
    },
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log(`[GATEWAY] 404: ${req.method} ${req.originalUrl}`);
  
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `The requested route ${req.method} ${req.originalUrl} was not found.`,
    code: 'ROUTE_NOT_FOUND',
    availableEndpoints: Object.values(services).map(s => s.pathPattern),
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('[GATEWAY] Unhandled error:', error);
  
  res.status(500).json({
    success: false,
    error: 'Internal gateway error',
    message: 'An unexpected error occurred in the API gateway.',
    code: 'GATEWAY_ERROR',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Enhanced API Gateway v2.0 running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔍 Service status: http://localhost:${PORT}/health/services`);
  console.log(`📖 API docs: http://localhost:${PORT}/api/docs`);
  console.log(`🔐 Authentication: http://localhost:${PORT}/api/v1/auth/*`);
  console.log('');
  console.log('🎯 Available Service Routes:');
  Object.entries(services).forEach(([name, config]) => {
    console.log(`  • ${name.toUpperCase()}: ${config.pathPattern} -> ${config.target}`);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Enhanced API Gateway shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Enhanced API Gateway shutting down gracefully');
  process.exit(0);
});