'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface ProfessionalData {
  id: string;
  proNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  level: 'JUNIOR' | 'SENIOR' | 'EXPERT' | 'DISTINGUISHED';
}

export default function ProfessionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [professional, setProfessional] = useState<ProfessionalData | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip authentication check for demo purposes
    setLoading(false);
    
    // Set demo data
    const demoData = {
      id: 'demo-1',
      proNumber: 'PRO-2024-001',
      email: 'demo@example.com',
      firstName: 'Dr. John',
      lastName: 'Smith',
      level: 'EXPERT' as const
    };
    setProfessional(demoData);
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('professionalToken');
      localStorage.removeItem('professionalData');
    }
    router.push('/professional/login');
  };

  const navigation = [
    { name: 'My Workplace', href: '/professional/workplace', icon: '📂' },
    { name: 'My Dashboard', href: '/professional/dashboard', icon: '📊' },
    { name: 'My Account', href: '/professional/account', icon: '💳' },
    { name: 'My Profile', href: '/professional/profile', icon: '🧑' },
  ];

  // Show loading only briefly
  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f9fafb', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{
          width: '3rem',
          height: '3rem',
          border: '2px solid #e5e7eb',
          borderTop: '2px solid #2563eb',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!professional) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f9fafb', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '2rem'
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
          Professional Portal
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '2rem', textAlign: 'center' }}>
          Loading professional data...
        </p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', 
        borderBottom: '1px solid #e5e7eb' 
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            height: '4rem' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>
                👨‍⚕️ Professional Portal
              </h1>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827', margin: 0 }}>
                  {professional.firstName} {professional.lastName}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                  {professional.proNumber} • {professional.level}
                </p>
              </div>
              
              <button
                onClick={handleLogout}
                style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e5e7eb' 
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto' }}>
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{
                    padding: '1rem 0.25rem',
                    borderBottom: '2px solid',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    borderColor: isActive ? '#2563eb' : 'transparent',
                    color: isActive ? '#2563eb' : '#6b7280'
                  }}
                >
                  <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem 1rem' }}>
        {children}
      </main>
    </div>
  );
}
