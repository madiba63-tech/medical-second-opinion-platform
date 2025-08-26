import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { ProfessionalLoginPayload } from '@/types/auth';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = ProfessionalLoginPayload.parse(body);

    // Find professional by email
    const professional = await prisma.medicalProfessional.findUnique({
      where: { email },
    });

    if (!professional) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if professional is vetted
    if (!professional.vetted) {
      return NextResponse.json(
        { error: 'Your application is still under review. Please wait for approval.' },
        { status: 403 }
      );
    }

    // Verify password
    if (!professional.hashedPassword) {
      return NextResponse.json(
        { error: 'Account not properly set up. Please contact support.' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, professional.hashedPassword);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate session token
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create session
    const session = await prisma.professionalSession.create({
      data: {
        professionalId: professional.id,
        sessionToken,
        expiresAt,
        twoFactorVerified: false, // Will be verified in 2FA step
      },
    });

    // Generate 2FA code
    const twoFactorCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // In production, you would:
    // 1. Store the code securely (encrypted, with expiration)
    // 2. Send via email/SMS based on professional.twoFactorMethod
    // 3. Use a proper 2FA service like Twilio, SendGrid, etc.
    
    console.log(`2FA Code for ${professional.email}: ${twoFactorCode}`);

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      requiresTwoFactor: true,
      twoFactorMethod: professional.twoFactorMethod,
      message: `2FA code sent to your ${professional.twoFactorMethod.toLowerCase()}`,
      // In production, don't return the code
      demoCode: twoFactorCode, // Remove this in production
    });

  } catch (error) {
    console.error('Professional login error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('validation')) {
        return NextResponse.json(
          { error: 'Invalid login data' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}
