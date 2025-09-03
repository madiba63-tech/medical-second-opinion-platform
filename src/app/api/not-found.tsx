import { NextResponse } from 'next/server';

/**
 * Custom not-found page for API routes
 * This ensures API routes return JSON instead of HTML when not found
 */
export default function NotFound() {
  return NextResponse.json(
    {
      success: false,
      error: 'API endpoint not found',
      statusCode: 404,
      timestamp: new Date().toISOString(),
    },
    { 
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
}