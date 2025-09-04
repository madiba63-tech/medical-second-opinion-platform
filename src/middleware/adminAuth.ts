import { NextRequest, NextResponse } from 'next/server';
import { hasCustomerLifecyclePermission, AdminUser } from '@/types/admin';
import { authService, AuthenticatedUser, JWTPayload } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * Get admin user from JWT authentication
 */
export async function getAdminUser(req: NextRequest): Promise<AdminUser | null> {
  try {
    // Extract JWT token from authorization header
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const userPayload = await authService.verifyAccessToken(token);
    
    // Verify user has admin role
    if (userPayload.role !== 'ADMIN') {
      return null;
    }

    // Fetch full admin user data with permissions from database
    const adminUser = await prisma.user.findUnique({
      where: { id: userPayload.sub },
      include: {
        role: {
          include: {
            permissions: true
          }
        },
        permissions: true
      }
    });

    if (!adminUser || adminUser.role?.name !== 'Administrator') {
      return null;
    }

    return {
      id: adminUser.id,
      email: adminUser.email,
      role: adminUser.role,
      permissions: adminUser.permissions || [],
      isActive: true, // Assume active if found in database
      createdAt: adminUser.createdAt,
      updatedAt: adminUser.updatedAt
    } as AdminUser;
    
  } catch (error) {
    console.warn('Admin authentication failed');
    return null;
  }
}

export async function requireAdminAuth(req: NextRequest): Promise<NextResponse | null> {
  const adminUser = await getAdminUser(req);
  
  if (!adminUser) {
    return NextResponse.json(
      { error: 'Admin authentication required' },
      { status: 401 }
    );
  }

  if (!adminUser.isActive) {
    return NextResponse.json(
      { error: 'Admin account is inactive' },
      { status: 403 }
    );
  }

  return null; // Continue with request
}

export async function requireCustomerLifecyclePermission(req: NextRequest, action: string): Promise<NextResponse | null> {
  const adminUser = await getAdminUser(req);
  
  if (!adminUser) {
    return NextResponse.json(
      { error: 'Admin authentication required' },
      { status: 401 }
    );
  }

  if (!hasCustomerLifecyclePermission(adminUser, action)) {
    return NextResponse.json(
      { error: 'Insufficient permissions for customer lifecycle management' },
      { status: 403 }
    );
  }

  return null; // Continue with request
}

// Helper function to check if user has admin role
export function isAdminUser(user: AuthenticatedUser | AdminUser | null): boolean {
  return user !== null && user.role === 'admin';
}
