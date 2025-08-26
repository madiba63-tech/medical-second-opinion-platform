'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfessionalLoginPage() {
  const [step, setStep] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // For demo purposes, accept any login
      setStep('2fa');
    } catch (error) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleTwoFactor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // For demo purposes, accept any 6-digit code
      if (twoFactorCode.length === 6) {
        const demoData = {
          id: 'demo-1',
          proNumber: 'PRO-2024-001',
          email: email,
          firstName: 'Dr. John',
          lastName: 'Smith',
          level: 'EXPERT'
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem('professionalToken', 'demo-token');
          localStorage.setItem('professionalData', JSON.stringify(demoData));
        }

        router.push('/professional/dashboard');
      } else {
        setError('Please enter a 6-digit code');
      }
    } catch (error) {
      setError('2FA verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setTwoFactorCode(value);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      padding: '3rem 1rem' 
    }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            👨‍⚕️ Professional Portal
          </h2>
          <p style={{ color: '#6b7280' }}>
            Sign in to access your medical cases and workspace
          </p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '2rem 1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
          {step === 'login' ? (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div>
                <label htmlFor="password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              {error && (
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.375rem', padding: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: '#dc2626' }}>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'white',
                  backgroundColor: loading ? '#9ca3af' : '#2563eb',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>

              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Don't have an account?{' '}
                  <Link href="/professional/apply" style={{ fontWeight: '500', color: '#2563eb' }}>
                    Apply to join
                  </Link>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleTwoFactor} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '0.5rem' }}>
                  Two-Factor Authentication
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Enter any 6-digit code for demo
                </p>
              </div>

              <div>
                <label htmlFor="code" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                  Verification Code
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  maxLength={6}
                  required
                  value={twoFactorCode}
                  onChange={handleCodeChange}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1.125rem',
                    textAlign: 'center',
                    letterSpacing: '0.1em'
                  }}
                  placeholder="000000"
                />
              </div>

              <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fde68a', borderRadius: '0.375rem', padding: '1rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#92400e' }}>
                  <strong>Demo Mode:</strong> Enter any 6-digit code to proceed
                </p>
              </div>

              {error && (
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.375rem', padding: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: '#dc2626' }}>{error}</p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setStep('login')}
                  style={{
                    flex: 1,
                    padding: '0.5rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || twoFactorCode.length !== 6}
                  style={{
                    flex: 1,
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'white',
                    backgroundColor: (loading || twoFactorCode.length !== 6) ? '#9ca3af' : '#2563eb',
                    cursor: (loading || twoFactorCode.length !== 6) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </button>
              </div>
            </form>
          )}
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <div style={{ backgroundColor: '#dbeafe', border: '1px solid #93c5fd', borderRadius: '0.5rem', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ marginRight: '0.5rem' }}>🔒</div>
              <p style={{ fontSize: '0.875rem', color: '#1e40af' }}>
                Secure login with mandatory two-factor authentication
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
