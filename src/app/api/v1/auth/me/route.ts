import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/v1/auth/me called');
    
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    console.log('Token present:', !!token);
    
    if (!token) {
      console.log('No token provided');
      return NextResponse.json({
        success: false,
        error: 'No authorization token provided'
      }, { status: 401 });
    }

    // Verify JWT token
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-for-dev';
    
    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecret) as any;
      console.log('Token decoded successfully:', { userId: decoded.userId, email: decoded.email });
    } catch (jwtError) {
      console.log('Token verification failed:', jwtError);
      return NextResponse.json({
        success: false,
        error: 'Invalid or expired token'
      }, { status: 401 });
    }

    // Get user from database
    const customer = await prisma.customer.findUnique({
      where: { id: decoded.userId }
    });

    console.log('Customer found:', !!customer);

    if (!customer) {
      console.log('Customer not found for userId:', decoded.userId);
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 });
    }

    // Return user profile without sensitive data
    const userProfile = {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone || '',
      dateOfBirth: customer.dateOfBirth?.toISOString() || '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US'
      },
      emergencyContact: {
        name: '',
        phone: '',
        relationship: ''
      },
      medicalHistory: [],
      preferredLanguage: customer.preferredLanguage.toLowerCase(),
      communicationPreferences: {
        email: customer.emailNotifications ?? true,
        sms: customer.smsNotifications ?? false,
        push: customer.whatsappNotifications ?? false
      },
      memberSince: customer.createdAt.toISOString(),
      isActive: true
    };

    console.log('Returning user profile successfully');

    return NextResponse.json({
      success: true,
      data: userProfile
    });

  } catch (error) {
    console.error('GET /api/v1/auth/me error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}