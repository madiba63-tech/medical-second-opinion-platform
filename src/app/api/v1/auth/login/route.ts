import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

const loginSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email too long')
    .transform(email => email.toLowerCase().trim()),
  password: z.string()
    .min(1, 'Password is required')
    .max(200, 'Password too long'), // Prevent DoS attacks with huge passwords
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Sanitize email for logging (remove sensitive info)
    const sanitizedEmail = body.email ? body.email.replace(/(?<=.{2}).(?=.*@)/g, '*') : 'unknown';
    console.log('Login attempt for:', sanitizedEmail);
    
    // Validate request body
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      console.log('Validation failed for:', sanitizedEmail);
      return NextResponse.json({
        success: false,
        error: 'Invalid input data',
        details: validationResult.error.errors
      }, { status: 400 });
    }

    const { email, password } = validationResult.data;

    // Find user by email
    const customer = await prisma.customer.findUnique({
      where: { email: email.toLowerCase() }
    });

    // Timing attack prevention - always hash password even if user not found
    const dummyHash = '$2a$12$dummyhashtopreventtimingattacks';
    const targetHash = customer?.hashedPassword || dummyHash;
    const isPasswordValid = await bcrypt.compare(password, targetHash);
    
    if (!customer || !isPasswordValid) {
      // Log failed attempt without exposing which part failed
      console.log('Authentication failed for:', sanitizedEmail);
      
      // Consistent delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
      
      return NextResponse.json({
        success: false,
        error: 'Invalid email or password'
      }, { status: 401 });
    }

    // Check if email is verified
    if (!customer.emailVerified) {
      console.log('Email not verified for:', sanitizedEmail);
      return NextResponse.json({
        success: false,
        error: 'Please verify your email address before logging in.'
      }, { status: 401 });
    }

    console.log('Login successful for:', sanitizedEmail);

    // Generate JWT token with secure secret
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('CRITICAL: JWT_SECRET not set in environment variables');
      return NextResponse.json({
        success: false,
        error: 'Authentication service temporarily unavailable'
      }, { status: 503 });
    }
    
    const token = jwt.sign(
      {
        userId: customer.id,
        customerId: customer.id, // For consistency with microservices
        email: customer.email,
        type: 'customer',
        emailVerified: customer.emailVerified,
        iat: Math.floor(Date.now() / 1000)
      },
      jwtSecret,
      { 
        expiresIn: '24h', // Shorter expiry for security
        issuer: 'medical-second-opinion',
        audience: 'customer-portal'
      }
    );

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

    return NextResponse.json({
      success: true,
      data: {
        user: userProfile,
        token,
        expiresIn: '24h'
      },
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Login error:', error.message);
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
      'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}