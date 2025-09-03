import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only handle API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // This middleware will run before Next.js routing
    // If the route doesn't exist, we'll let Next.js handle it normally
    // but we'll add a header to indicate this is an API request
    const response = NextResponse.next();
    response.headers.set('X-API-Route', 'true');
    return response;
  }
}

export const config = {
  matcher: '/api/:path*',
};