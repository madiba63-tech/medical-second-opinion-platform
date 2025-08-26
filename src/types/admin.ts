export interface AdminRole {
  id: string;
  name: string;
  permissions: AdminPermission[];
  description: string;
}

export interface AdminPermission {
  id: string;
  name: string;
  resource: string;
  action: string;
  description: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  permissions: AdminPermission[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Predefined admin permissions for customer lifecycle management
export const CUSTOMER_LIFECYCLE_PERMISSIONS: AdminPermission[] = [
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
];

// Admin role with full customer lifecycle permissions
export const ADMIN_ROLE: AdminRole = {
  id: 'admin',
  name: 'Administrator',
  permissions: CUSTOMER_LIFECYCLE_PERMISSIONS,
  description: 'Full access to all system features including customer lifecycle management'
};

// Check if admin has specific permission
export function hasPermission(admin: AdminUser, resource: string, action: string): boolean {
  return admin.permissions.some(permission => 
    permission.resource === resource && permission.action === action
  );
}

// Check if admin has customer lifecycle permissions
export function hasCustomerLifecyclePermission(admin: AdminUser, action: string): boolean {
  return hasPermission(admin, 'customer-lifecycle', action);
}
