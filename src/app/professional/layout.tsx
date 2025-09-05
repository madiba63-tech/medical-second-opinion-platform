'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

  useEffect(() => {
    const fetchProfessionalData = async () => {
      try {
        // Check if we have a professional token
        const token = localStorage.getItem('professionalToken');
        if (!token) {
          // For demo purposes, create a demo token
          const demoToken = 'demo-professional-token-2024';
          localStorage.setItem('professionalToken', demoToken);
        }
        
        setLoading(true);

        // Try to fetch from professional service
        const response = await fetch('http://localhost:4004/api/v1/professionals/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('professionalToken')}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data?.professional) {
            const prof = data.data.professional;
            setProfessional({
              id: prof.id,
              proNumber: prof.licenseNumber || 'PRO-2024-001',
              email: prof.email,
              firstName: prof.firstName,
              lastName: prof.lastName,
              level: (prof.specialization?.[0] || 'EXPERT') as any
            });
          } else {
            // Fall back to demo data
            setProfessional(getDemoData());
          }
        } else {
          console.log('Professional API failed, using demo data');
          setProfessional(getDemoData());
        }
      } catch (error) {
        console.error('Error fetching professional data:', error);
        setProfessional(getDemoData());
      } finally {
        setLoading(false);
      }
    };

    const getDemoData = () => ({
      id: 'demo-1',
      proNumber: 'PRO-2024-001',
      email: 'demo@example.com',
      firstName: 'Dr. John',
      lastName: 'Smith',
      level: 'EXPERT' as const
    });

    fetchProfessionalData();
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('professionalToken');
      localStorage.removeItem('professionalData');
    }
    router.push('/professional/login');
  };


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


      {/* Main Content */}
      <main style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem 1rem' }}>
        {children}
      </main>
    </div>
  );
}
