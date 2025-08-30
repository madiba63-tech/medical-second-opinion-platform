'use client';

import CustomerLayout from '@/components/customer/CustomerLayout';
import { AuthProvider } from '@/contexts/AuthContext';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <CustomerLayout>
        {children}
      </CustomerLayout>
    </AuthProvider>
  );
}