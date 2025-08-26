import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { CustomerProfile } from '@/types/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // In a real app, you'd get the user ID from the session/JWT
    // For now, we'll use a mock approach
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    
    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        dateOfBirth: true,
        email: true,
        phone: true,
        preferredChannel: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      profile: {
        ...customer,
        dob: customer.dateOfBirth.toISOString().split('T')[0], // Format as YYYY-MM-DD
      },
    });

  } catch (error) {
    console.error('Get customer profile error:', error);
    return NextResponse.json(
      { error: 'Failed to get customer profile' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    
    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedProfile = CustomerProfile.parse(body);

    const customer = await prisma.customer.update({
      where: { id: customerId },
      data: {
        firstName: validatedProfile.firstName,
        middleName: validatedProfile.middleName,
        lastName: validatedProfile.lastName,
        dateOfBirth: new Date(validatedProfile.dob),
        email: validatedProfile.email,
        phone: validatedProfile.phone,
        preferredChannel: validatedProfile.preferredChannel,
      },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        dateOfBirth: true,
        email: true,
        phone: true,
        preferredChannel: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      profile: {
        ...customer,
        dob: customer.dateOfBirth.toISOString().split('T')[0],
      },
      message: 'Profile updated successfully',
    });

  } catch (error) {
    console.error('Update customer profile error:', error);
    
    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json(
        { error: 'Invalid profile data' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
