import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Login attempt for:', body.email);
    
    // Validate request body
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      console.log('Validation failed:', validationResult.error.errors);
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

    console.log('Customer found:', !!customer);
    if (customer) {
      console.log('Email verified:', customer.emailVerified);
    }

    if (!customer) {
      console.log('No customer found with email:', email);
      return NextResponse.json({
        success: false,
        error: 'Invalid email or password'
      }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, customer.hashedPassword);
    console.log('Password valid:', isPasswordValid);
    if (!isPasswordValid) {
      console.log('Password verification failed');
      return NextResponse.json({
        success: false,
        error: 'Invalid email or password'
      }, { status: 401 });
    }

    // Check if email is verified
    if (!customer.emailVerified) {
      console.log('Email not verified');
      return NextResponse.json({
        success: false,
        error: 'Please verify your email address before logging in.'
      }, { status: 401 });
    }

    console.log('Login successful for:', email);

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-for-dev';
    const token = jwt.sign(
      {
        userId: customer.id,
        email: customer.email,
        type: 'customer'
      },
      jwtSecret,
      { expiresIn: '7d' }
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
        expiresIn: '7d'
      },
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Login error:', error);
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}