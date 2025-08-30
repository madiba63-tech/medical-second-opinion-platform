// Readiness probe endpoint for Kubernetes
// Following v2.0 Architecture requirements for container readiness probes

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Quick database connection check
    await prisma.$queryRaw`SELECT 1 as ready_check`;
    
    return NextResponse.json({
      status: 'ready',
      timestamp: new Date().toISOString(),
      service: 'second-opinion-app',
      version: process.env.APP_VERSION || '2.0.0'
    });
  } catch (error) {
    console.error('Readiness check failed:', error);
    
    return NextResponse.json({
      status: 'not_ready',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Service not ready'
    }, { status: 503 });
  }
}

// Support HEAD requests for lightweight checks
export async function HEAD(request: NextRequest) {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 503 });
  }
}