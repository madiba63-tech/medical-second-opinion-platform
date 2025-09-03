import { NextRequest, NextResponse } from 'next/server';

/**
 * Catch-all route handler for unmatched API routes
 * This ensures that any unmatched API route returns a proper JSON error
 * instead of falling back to the HTML 404 page
 */

function createApiErrorResponse(path: string, method: string) {
  return NextResponse.json(
    {
      success: false,
      error: 'API endpoint not found',
      message: `The API route '${path}' does not exist or does not support the ${method} method`,
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path,
      method,
    },
    { 
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-API-Error': 'route-not-found'
      }
    }
  );
}

export async function GET(request: NextRequest, context: { params: Promise<{ notfound: string[] }> }) {
  const params = await context.params;
  const path = `/api/${params.notfound.join('/')}`;
  console.log(`[API 404] GET request to non-existent route: ${path}`);
  return createApiErrorResponse(path, 'GET');
}

export async function POST(request: NextRequest, context: { params: Promise<{ notfound: string[] }> }) {
  const params = await context.params;
  const path = `/api/${params.notfound.join('/')}`;
  console.log(`[API 404] POST request to non-existent route: ${path}`);
  return createApiErrorResponse(path, 'POST');
}

export async function PUT(request: NextRequest, context: { params: Promise<{ notfound: string[] }> }) {
  const params = await context.params;
  const path = `/api/${params.notfound.join('/')}`;
  console.log(`[API 404] PUT request to non-existent route: ${path}`);
  return createApiErrorResponse(path, 'PUT');
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ notfound: string[] }> }) {
  const params = await context.params;
  const path = `/api/${params.notfound.join('/')}`;
  console.log(`[API 404] DELETE request to non-existent route: ${path}`);
  return createApiErrorResponse(path, 'DELETE');
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ notfound: string[] }> }) {
  const params = await context.params;
  const path = `/api/${params.notfound.join('/')}`;
  console.log(`[API 404] PATCH request to non-existent route: ${path}`);
  return createApiErrorResponse(path, 'PATCH');
}