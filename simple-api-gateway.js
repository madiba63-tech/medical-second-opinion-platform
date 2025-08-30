const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Security and CORS
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3006', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'simple-api-gateway',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Service proxy configurations
const services = {
  identity: { target: 'http://localhost:3001', path: '/api/v1/auth' },
  cases: { target: 'http://localhost:3002', path: '/api/v1/cases' },
  ai: { target: 'http://localhost:3003', path: '/api/v1/analysis' },
  professionals: { target: 'http://localhost:3004', path: '/api/v1/professionals' },
  notifications: { target: 'http://localhost:3005', path: '/api/v1/notifications' }
};

// Create proxy middlewares
Object.entries(services).forEach(([name, config]) => {
  const proxyMiddleware = createProxyMiddleware({
    target: config.target,
    changeOrigin: true,
    pathRewrite: {
      [`^${config.path}`]: ''
    },
    onError: (err, req, res) => {
      console.error(`Proxy error for ${name}:`, err.message);
      res.status(502).json({
        error: 'Service unavailable',
        message: `${name} service is not responding`,
        service: name
      });
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`Proxying ${req.method} ${req.path} to ${name} service`);
    }
  });

  app.use(config.path, proxyMiddleware);
});

// Test individual service health
app.get('/health/services', async (req, res) => {
  const serviceStatus = {};
  
  for (const [name, config] of Object.entries(services)) {
    try {
      const response = await fetch(`${config.target}/health`);
      serviceStatus[name] = {
        status: response.ok ? 'healthy' : 'unhealthy',
        url: config.target
      };
    } catch (error) {
      serviceStatus[name] = {
        status: 'unreachable',
        url: config.target,
        error: error.message
      };
    }
  }
  
  res.json({
    gateway: 'healthy',
    services: serviceStatus,
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Second Opinion Platform - Simple API Gateway',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      services: '/health/services',
      auth: '/api/v1/auth',
      cases: '/api/v1/cases',
      analysis: '/api/v1/analysis',
      professionals: '/api/v1/professionals',
      notifications: '/api/v1/notifications'
    },
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Gateway error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Route ${req.method} ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Simple API Gateway running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔍 Service status: http://localhost:${PORT}/health/services`);
  console.log(`📖 API root: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  process.exit(0);
});