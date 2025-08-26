import { NextRequest, NextResponse } from 'next/server';
import { hasCustomerLifecyclePermission, AdminUser } from '@/types/admin';

// Mock admin user for development (in production, this would come from JWT/session)
const MOCK_ADMIN_USER: AdminUser = {
  id: 'admin-1',
  email: 'admin@secondopinion.com',
  role: {
    id: 'admin',
    name: 'Administrator',
    permissions: [
      {
        id: 'customer-lifecycle-view',
        name: 'View Customer Lifecycle',
        resource: 'customer-lifecycle',
        action: 'read',
        description: 'View customer lifecycle dashboard and statistics'
      },
      {
        id: 'customer-lifecycle-manage',
        name: 'Manage Customer Lifecycle',
        resource: 'customer-lifecycle',
        action: 'write',
        description: 'Update customer lifecycle stages and trigger re-engagement'
      },
      {
        id: 'customer-lifecycle-delete',
        name: 'Delete Customer Lifecycle',
        resource: 'customer-lifecycle',
        action: 'delete',
        description: 'Delete customers and their lifecycle data'
      },
      {
        id: 'customer-lifecycle-analytics',
        name: 'Customer Lifecycle Analytics',
        resource: 'customer-lifecycle',
        action: 'analytics',
        description: 'Access to customer lifecycle analytics and reports'
      }
    ],
    description: 'Full access to all system features including customer lifecycle management'
  },
  permissions: [
    {
      id: 'customer-lifecycle-view',
      name: 'View Customer Lifecycle',
      resource: 'customer-lifecycle',
      action: 'read',
      description: 'View customer lifecycle dashboard and statistics'
    },
    {
      id: 'customer-lifecycle-manage',
      name: 'Manage Customer Lifecycle',
      resource: 'customer-lifecycle',
      action: 'write',
      description: 'Update customer lifecycle stages and trigger re-engagement'
    },
    {
      id: 'customer-lifecycle-delete',
      name: 'Delete Customer Lifecycle',
      resource: 'customer-lifecycle',
      action: 'delete',
      description: 'Delete customers and their lifecycle data'
    },
    {
      id: 'customer-lifecycle-analytics',
      name: 'Customer Lifecycle Analytics',
      resource: 'customer-lifecycle',
      action: 'analytics',
      description: 'Access to customer lifecycle analytics and reports'
    }
  ],
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

export function getAdminUser(req: NextRequest): AdminUser | null {
  // In production, this would extract admin user from JWT token or session
  // For now, we'll use a mock admin user
  return MOCK_ADMIN_USER;
}

export function requireAdminAuth(req: NextRequest): NextResponse | null {
  const adminUser = getAdminUser(req);
  
  if (!adminUser) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  if (!adminUser.isActive) {
    return NextResponse.json(
      { error: 'Account is inactive' },
      { status: 403 }
    );
  }

  return null; // Continue with request
}

export function requireCustomerLifecyclePermission(req: NextRequest, action: string): NextResponse | null {
  const adminUser = getAdminUser(req);
  
  if (!adminUser) {
    return NextResponse.json(
      { error: 'Authentication required' },
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
export function isAdminUser(user: any): boolean {
  return user && user.role && user.role.id === 'admin';
}
