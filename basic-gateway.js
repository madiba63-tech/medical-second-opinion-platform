const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(cors({
  origin: ['http://localhost:3006', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'basic-api-gateway',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Service configurations
const services = {
  identity: 'http://localhost:3001',
  cases: 'http://localhost:3002', 
  ai: 'http://localhost:3003',
  professionals: 'http://localhost:3004',
  notifications: 'http://localhost:3005'
};

// Health check for all services
app.get('/health/services', async (req, res) => {
  const serviceStatus = {};
  
  for (const [name, url] of Object.entries(services)) {
    try {
      const response = await fetch(`${url}/health`);
      serviceStatus[name] = {
        status: response.ok ? 'healthy' : 'unhealthy',
        url: url
      };
    } catch (error) {
      serviceStatus[name] = {
        status: 'unreachable',
        url: url,
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
    service: 'Second Opinion Platform - Basic Gateway',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      services: '/health/services'
    },
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Basic API Gateway running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔍 Service status: http://localhost:${PORT}/health/services`);
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