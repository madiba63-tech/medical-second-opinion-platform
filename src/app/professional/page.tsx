'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProfessionalData {
  id: string;
  professionalId: string;
  firstName: string;
  lastName: string;
  expertiseLevel: string;
  primarySpecialties: string[];
  email: string;
}

interface CaseData {
  caseNumber: string;
  diseaseType: string;
  completedAt?: string;
  rating?: number;
  compensation?: number;
  status?: string;
  urgency?: string;
  complexity?: string;
  createdAt?: string;
  reward?: number;
}

interface DashboardStats {
  activeCases: number;
  recentCases: number;
  availableCases: number;
  totalEarnings: number;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
}

export default function ProfessionalPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [email, setEmail] = useState('dr.smith@hospital.com');
  const [password, setPassword] = useState('doctor123');
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  
  // Dashboard state
  const [professionalData, setProfessionalData] = useState<ProfessionalData | null>(null);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    activeCases: 0,
    recentCases: 0,
    availableCases: 0,
    totalEarnings: 0
  });
  const [activeCases, setActiveCases] = useState<CaseData[]>([]);
  const [recentCases, setRecentCases] = useState<CaseData[]>([]);

  // Available cases modal state
  const [showAvailableCases, setShowAvailableCases] = useState(false);
  const [availableCases, setAvailableCases] = useState<CaseData[]>([]);
  const [loadingAvailable, setLoadingAvailable] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const abortController = new AbortController();
    
    const initializeComponent = async () => {
      // Check if already logged in
      const token = localStorage.getItem('professionalToken');
      if (token && !abortController.signal.aborted) {
        setIsLoggedIn(true);
        await fetchDashboardData(token, abortController);
      } else if (!abortController.signal.aborted) {
        setLoading(false);
      }
    };
    
    initializeComponent();
    
    return () => {
      abortController.abort();
    };
  }, []);

  // Handle clicks outside settings dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSettings) {
        setShowSettings(false);
      }
    };
    
    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings]);

  const fetchDashboardData = async (token: string, abortController?: AbortController) => {
    try {
      const response = await fetch('http://localhost:4014/api/v1/professionals/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        signal: abortController?.signal
      });

      if (response.ok) {
        const result = await response.json();
        const data = result.data;
        
        // Check if request was aborted before updating state
        if (abortController?.signal.aborted) return;
        
        setProfessionalData({
          id: data.professional.id,
          professionalId: data.professional.professionalId,
          firstName: data.professional.firstName,
          lastName: data.professional.lastName,
          expertiseLevel: data.professional.profile?.clinicalSeniority || 'EXPERT',
          primarySpecialties: data.professional.profile?.primarySpecialty || data.professional.specialization || [],
          email: data.professional.email || ''
        });
        setDashboardStats({
          activeCases: data.dashboard?.activeCases?.length || 0,
          recentCases: data.dashboard?.recentCases?.length || 0,
          availableCases: data.dashboard?.availableCasesCount || 0,
          totalEarnings: data.dashboard?.totalEarnings || 0
        });
        setActiveCases(data.dashboard?.activeCases || []);
        setRecentCases(data.dashboard?.recentCases || []);
      } else {
        // Token might be expired
        if (!abortController?.signal.aborted) {
          localStorage.removeItem('professionalToken');
          setIsLoggedIn(false);
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Dashboard fetch aborted');
        return;
      }
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      if (!abortController?.signal.aborted) {
        setLoading(false);
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:4014/api/v1/professionals/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('professionalToken', data.data.token);
        setIsLoggedIn(true);
        await fetchDashboardData(data.data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('professionalToken');
    setIsLoggedIn(false);
    setProfessionalData(null);
    setDashboardStats({ activeCases: 0, recentCases: 0, availableCases: 0, totalEarnings: 0 });
    setActiveCases([]);
    setRecentCases([]);
    setAvailableCases([]);
    setShowAvailableCases(false);
  };

  const fetchAvailableCases = async () => {
    const token = localStorage.getItem('professionalToken');
    if (!token) return;

    setLoadingAvailable(true);
    try {
      const response = await fetch('http://localhost:4012/api/v1/cases/available', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setAvailableCases(result.data.cases || []);
        }
      }
    } catch (error) {
      console.error('Failed to fetch available cases:', error);
    } finally {
      setLoadingAvailable(false);
    }
  };

  const handleViewAvailableCases = () => {
    setShowAvailableCases(true);
    fetchAvailableCases();
  };

  const handleClaimCase = async (caseId: string) => {
    const token = localStorage.getItem('professionalToken');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:4012/api/v1/cases/${caseId}/claim`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Remove claimed case from available cases
          setAvailableCases(prev => prev.filter(c => c.caseNumber !== caseId));
          // Refresh dashboard data to show new active case
          await fetchDashboardData(token);
          alert('Case claimed successfully!');
        }
      } else {
        const error = await response.json();
        alert(`Failed to claim case: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to claim case:', error);
      alert('Failed to claim case. Please try again.');
    }
  };

  const getSpecialtyColor = (specialty: string) => {
    const colors = {
      'BREAST_CANCER': 'bg-pink-100 text-pink-800',
      'LUNG_CANCER': 'bg-blue-100 text-blue-800',
      'PROSTATE_CANCER': 'bg-purple-100 text-purple-800',
      'COLORECTAL_CANCER': 'bg-green-100 text-green-800',
      'LEUKEMIA': 'bg-red-100 text-red-800',
      'LYMPHOMA': 'bg-indigo-100 text-indigo-800'
    };
    return colors[specialty as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'EMERGENCY': return 'bg-red-100 text-red-800 border-red-200';
      case 'URGENT': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'STANDARD': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading professional portal...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Professional Portal
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to access your medical cases
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="bg-white p-8 rounded-lg shadow">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loginLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                <p><strong>Demo Credentials:</strong></p>
                <p>Email: dr.smith@hospital.com</p>
                <p>Password: doctor123</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Clean Workplace Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-slate-900">Medical Workplace</span>
            </div>

            {/* Professional Name and Settings */}
            <div className="flex items-center space-x-4">
              {professionalData && (
                <span className="text-sm font-medium text-slate-700">
                  Dr. {professionalData.firstName} {professionalData.lastName}
                </span>
              )}
              
              {/* Settings Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="hidden sm:block text-sm font-medium">Settings</span>
                </button>
                
                {showSettings && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      My Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      Account Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      Earnings & Payments
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      Availability
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      Resources
                    </button>
                    <div className="border-t border-slate-200 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Case Processing Workplace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Stats Bar */}
        <div className="flex items-center justify-between bg-white rounded-lg border border-slate-200 p-4 mb-6">
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{dashboardStats.activeCases}</p>
              <p className="text-xs text-slate-500">Active</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{dashboardStats.recentCases}</p>
              <p className="text-xs text-slate-500">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{formatCurrency(dashboardStats.totalEarnings)}</p>
              <p className="text-xs text-slate-500">This Month</p>
            </div>
            {professionalData && (
              <div className="text-center">
                <p className="text-sm font-medium text-slate-700">{professionalData.expertiseLevel}</p>
                <p className="text-xs text-slate-500">{professionalData.primarySpecialties.slice(0, 1).join('')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Workplace Layout */}
        <div className="space-y-6">
          {/* 1. AVAILABLE CASES - Primary Focus */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h1 className="text-xl font-bold text-slate-900">Available Cases</h1>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {dashboardStats.availableCases} ready to claim
                  </span>
                </div>
                <button
                  onClick={handleViewAvailableCases}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Browse & Claim Cases</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-900 mb-2">{dashboardStats.availableCases} Cases Available</h2>
                <p className="text-slate-600 mb-4">Ready to be claimed and reviewed. Start earning by selecting cases that match your expertise.</p>
                <button
                  onClick={handleViewAvailableCases}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                >
                  View All Available Cases
                </button>
              </div>
            </div>
          </div>

          {/* 2. ACTIVE CASES - Current Work */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Active Cases - Your Current Work</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {dashboardStats.activeCases} in progress
                </span>
              </div>
            </div>
            <div className="p-6">
              {activeCases.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-md font-medium text-slate-900 mb-1">No active cases</h3>
                  <p className="text-sm text-slate-500">Claim cases from the available list above to start working</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeCases.map((case_) => (
                    <div key={case_.caseNumber} className="border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-medium text-slate-900">{case_.caseNumber}</h3>
                            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getSpecialtyColor(case_.diseaseType)}`}>
                              {case_.diseaseType.replace(/_/g, ' ')}
                            </span>
                            {case_.urgency && (
                              <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getUrgencyColor(case_.urgency)}`}>
                                {case_.urgency}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 mt-1">
                            {case_.completedAt ? 'Completed' : 'In progress'} • Started {case_.createdAt ? new Date(case_.createdAt).toLocaleDateString() : 'recently'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-slate-900">
                            {case_.compensation ? formatCurrency(case_.compensation) : '$195'}
                          </p>
                          <button className="mt-1 text-sm text-blue-600 hover:text-blue-800 font-medium">
                            Continue Review →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 3. RECENT CASES - Completed Work */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <h2 className="text-md font-semibold text-slate-900">Recent Completions</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {dashboardStats.recentCases} completed this month
                </span>
              </div>
            </div>
            <div className="p-6">
              {recentCases.length === 0 ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 mx-auto mb-3 bg-slate-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-500">No completed cases yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentCases.slice(0, 3).map((case_) => (
                    <div key={case_.caseNumber} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{case_.caseNumber}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded ${getSpecialtyColor(case_.diseaseType)}`}>
                              {case_.diseaseType.replace(/_/g, ' ')}
                            </span>
                            {case_.rating && (
                              <span className="inline-flex items-center px-1.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                                ★ {case_.rating}/5
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">
                          {case_.compensation ? formatCurrency(case_.compensation) : '$195'}
                        </p>
                        <p className="text-xs text-slate-500">
                          {case_.completedAt ? new Date(case_.completedAt).toLocaleDateString() : 'Recently'}
                        </p>
                      </div>
                    </div>
                  ))}
                  {recentCases.length > 3 && (
                    <div className="pt-3">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        View all {recentCases.length} completed cases →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Enhanced Available Cases Modal */}
      {showAvailableCases && (
        <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-5xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Available Cases</h2>
                <p className="text-sm text-slate-500 mt-1">Choose cases that match your expertise</p>
              </div>
              <button 
                onClick={() => setShowAvailableCases(false)}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto max-h-[65vh]">
              {loadingAvailable ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
                  <span className="ml-3 text-slate-600 font-medium">Loading available cases...</span>
                </div>
              ) : availableCases.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No cases available</h3>
                  <p className="text-slate-500 mb-4">No cases match your specialties at the moment</p>
                  <button
                    onClick={() => setShowAvailableCases(false)}
                    className="inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-slate-600">
                      Showing {availableCases.length} available case{availableCases.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="space-y-4">
                    {availableCases.map((case_: any) => (
                      <div key={case_.caseNumber} className="border border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-sm transition-all">
                        <div className="flex justify-between items-start gap-6">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <h3 className="font-semibold text-slate-900">{case_.caseNumber}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${getSpecialtyColor(case_.diseaseType || case_.profile?.primarySpecialtyRequired)}`}>
                                {(case_.diseaseType || case_.profile?.primarySpecialtyRequired || '').replace(/_/g, ' ')}
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              {case_.profile?.requestedUrgency && (
                                <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getUrgencyColor(case_.profile.requestedUrgency)}`}>
                                  {case_.profile.requestedUrgency}
                                </span>
                              )}
                              {case_.profile?.estimatedComplexity && (
                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                                  {case_.profile.estimatedComplexity} complexity
                                </span>
                              )}
                              {case_.profile?.estimatedCompletionTime && (
                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                                  ~{case_.profile.estimatedCompletionTime}
                                </span>
                              )}
                            </div>
                            
                            {case_.description && (
                              <p className="text-sm text-slate-600 mb-3 line-clamp-2">{case_.description}</p>
                            )}
                            
                            <div className="flex items-center text-xs text-slate-500 space-x-4">
                              <span>Created: {case_.createdAt ? new Date(case_.createdAt).toLocaleDateString() : 'N/A'}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end space-y-3">
                            <div className="text-right">
                              <p className="text-2xl font-bold text-green-600">
                                {case_.estimatedCompensation ? `$${case_.estimatedCompensation}` : '$195'}
                              </p>
                              <p className="text-xs text-slate-500">Estimated payment</p>
                            </div>
                            <button
                              onClick={() => handleClaimCase(case_.id || case_.caseNumber)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow"
                            >
                              Claim Case
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
