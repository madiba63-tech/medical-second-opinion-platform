#!/usr/bin/env node

/**
 * Health check script for Docker container
 * Following v2.0 Architecture requirements for container health monitoring
 */

const http = require('http');
const { URL } = require('url');

const HEALTH_CHECK_URL = process.env.HEALTH_CHECK_URL || 'http://localhost:3000/api/health';
const TIMEOUT = parseInt(process.env.HEALTH_CHECK_TIMEOUT) || 5000;

function healthCheck() {
  return new Promise((resolve, reject) => {
    const url = new URL(HEALTH_CHECK_URL);
    
    const options = {
      hostname: url.hostname,
      port: url.port || 3000,
      path: url.pathname,
      method: 'GET',
      timeout: TIMEOUT
    };

    const req = http.request(options, (res) => {
      if (res.statusCode === 200) {
        console.log(`Health check passed: ${res.statusCode}`);
        resolve(true);
      } else {
        console.error(`Health check failed: ${res.statusCode}`);
        reject(new Error(`Health check failed with status ${res.statusCode}`));
      }
    });

    req.on('error', (error) => {
      console.error(`Health check error: ${error.message}`);
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      console.error(`Health check timeout after ${TIMEOUT}ms`);
      reject(new Error('Health check timeout'));
    });

    req.end();
  });
}

// Execute health check
healthCheck()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Health check failed:', error.message);
    process.exit(1);
  });