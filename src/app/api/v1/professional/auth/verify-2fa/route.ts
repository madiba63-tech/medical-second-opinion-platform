import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { TwoFactorPayload } from '@/types/auth';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, sessionId } = TwoFactorPayload.parse(body);

    // Find session
    const session = await prisma.professionalSession.findUnique({
      where: { id: sessionId },
      include: { professional: true },
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

    // Check if session is expired
    if (session.expiresAt < new Date()) {
      await prisma.professionalSession.delete({
        where: { id: sessionId },
      });
      return NextResponse.json(
        { error: 'Session expired. Please login again.' },
        { status: 401 }
      );
    }

    // Check if 2FA is already verified
    if (session.twoFactorVerified) {
      return NextResponse.json(
        { error: '2FA already verified for this session' },
        { status: 400 }
      );
    }

    // In production, you would verify against the stored 2FA code
    // For demo purposes, we'll accept any 6-digit code
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { error: 'Invalid 2FA code' },
        { status: 400 }
      );
    }

    // Mark 2FA as verified
    await prisma.professionalSession.update({
      where: { id: sessionId },
      data: { twoFactorVerified: true },
    });

    // Generate JWT token for authenticated session
    const token = crypto.randomBytes(32).toString('hex');

    return NextResponse.json({
      success: true,
      token,
      professional: {
        id: session.professional.id,
        proNumber: session.professional.proNumber,
        email: session.professional.email,
        firstName: session.professional.firstName,
        lastName: session.professional.lastName,
        level: session.professional.level,
      },
      message: '2FA verification successful',
    });

  } catch (error) {
    console.error('2FA verification error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('validation')) {
        return NextResponse.json(
          { error: 'Invalid 2FA data' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: '2FA verification failed. Please try again.' },
      { status: 500 }
    );
  }
}
