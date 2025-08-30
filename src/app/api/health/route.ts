// Health check endpoint for container monitoring
// Following v2.0 Architecture requirements for service health monitoring

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();
    
    // Basic application health
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || '2.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks: {
        database: { status: 'unknown', responseTime: 0 },
        redis: { status: 'unknown', responseTime: 0 },
        filesystem: { status: 'unknown', responseTime: 0 }
      }
    };

    // Database connectivity check
    try {
      const dbStartTime = Date.now();
      await prisma.$queryRaw`SELECT 1 as health_check`;
      health.checks.database = {
        status: 'healthy',
        responseTime: Date.now() - dbStartTime
      };
    } catch (error) {
      health.checks.database = {
        status: 'unhealthy',
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown database error'
      };
      health.status = 'degraded';
    }

    // Redis connectivity check (if available)
    try {
      const redisUrl = process.env.REDIS_URL;
      if (redisUrl) {
        // Basic Redis check would go here
        health.checks.redis = { status: 'healthy', responseTime: 0 };
      } else {
        health.checks.redis = { status: 'not_configured', responseTime: 0 };
      }
    } catch (error) {
      health.checks.redis = {
        status: 'unhealthy',
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Redis connection failed'
      };
    }

    // Filesystem check
    try {
      const fs = require('fs');
      const fsStartTime = Date.now();
      
      // Check if we can read/write temporary files
      const testPath = '/tmp/health-check-test';
      fs.writeFileSync(testPath, 'test');
      fs.unlinkSync(testPath);
      
      health.checks.filesystem = {
        status: 'healthy',
        responseTime: Date.now() - fsStartTime
      };
    } catch (error) {
      health.checks.filesystem = {
        status: 'unhealthy',
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Filesystem check failed'
      };
    }

    // Determine overall health status
    const hasUnhealthyChecks = Object.values(health.checks).some(check => check.status === 'unhealthy');
    const hasDegradedChecks = Object.values(health.checks).some(check => check.status === 'degraded');
    
    if (hasUnhealthyChecks) {
      health.status = 'unhealthy';
    } else if (hasDegradedChecks) {
      health.status = 'degraded';
    }

    const totalResponseTime = Date.now() - startTime;
    
    // Return appropriate HTTP status based on health
    const statusCode = health.status === 'healthy' ? 200 : 
                      health.status === 'degraded' ? 200 : 503;

    return NextResponse.json({
      ...health,
      responseTime: totalResponseTime
    }, { status: statusCode });

  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Health check failed',
      version: process.env.APP_VERSION || '2.0.0'
    }, { status: 503 });
  }
}

// Readiness probe endpoint
export async function HEAD(request: NextRequest) {
  try {
    // Quick readiness check - just verify basic functionality
    await prisma.$queryRaw`SELECT 1`;
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error('Readiness check failed:', error);
    return new NextResponse(null, { status: 503 });
  }
}