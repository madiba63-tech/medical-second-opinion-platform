'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Case {
  id: string;
  caseNumber: string;
  diseaseType: string;
  status: 'submitted' | 'processing' | 'ai_analysis' | 'assigned' | 'under_review' | 'peer_review' | 'completed' | 'delivered';
  submittedDate: string;
  assignedTo?: string;
  finalOpinionUrl?: string;
}

interface CustomerProfile {
  firstName: string;
  lastName: string;
  email: string;
  preferredChannel: 'EMAIL' | 'SMS';
}

export default function CustomerPortal() {
  const [cases, setCases] = useState<Case[]>([]);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demonstration
    const mockCases: Case[] = [
      {
        id: '1',
        caseNumber: 'CASE-2024-001',
        diseaseType: 'Lung Cancer',
        status: 'delivered',
        submittedDate: '2024-01-15',
        assignedTo: 'Dr. Sarah Wilson',
        finalOpinionUrl: '/api/download/opinion/case-2024-001'
      },
      {
        id: '2',
        caseNumber: 'CASE-2024-002',
        diseaseType: 'Breast Cancer',
        status: 'under_review',
        submittedDate: '2024-01-20',
        assignedTo: 'Dr. Emily Rodriguez'
      },
      {
        id: '3',
        caseNumber: 'CASE-2024-003',
        diseaseType: 'Prostate Cancer',
        status: 'processing',
        submittedDate: '2024-01-22'
      }
    ];

    const mockProfile: CustomerProfile = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      preferredChannel: 'EMAIL'
    };

    setTimeout(() => {
      setCases(mockCases);
      setProfile(mockProfile);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'peer_review': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'ai_analysis': return 'bg-purple-100 text-purple-800';
      case 'submitted': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'completed': return 'Completed';
      case 'under_review': return 'Under Review';
      case 'peer_review': return 'Peer Review';
      case 'assigned': return 'Assigned';
      case 'processing': return 'Processing';
      case 'ai_analysis': return 'AI Analysis';
      case 'submitted': return 'Submitted';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile?.firstName}!</h1>
              <p className="text-gray-600 mt-2">Manage your medical cases and view your second opinions</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/portal/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Start New Case
              </Link>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {profile?.firstName?.[0]}{profile?.lastName?.[0]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Cases</p>
                <p className="text-2xl font-semibold text-gray-900">{cases.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {cases.filter(c => c.status === 'delivered' || c.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {cases.filter(c => c.status !== 'delivered' && c.status !== 'completed').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Reports Ready</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {cases.filter(c => c.finalOpinionUrl).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/portal/cases" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">My Cases</h3>
                <p className="text-sm text-gray-600">View all your cases</p>
              </div>
            </div>
          </Link>

          <Link href="/portal/profile" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
                <p className="text-sm text-gray-600">Update your information</p>
              </div>
            </div>
          </Link>

          <Link href="/portal/billing" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Billing</h3>
                <p className="text-sm text-gray-600">View invoices & receipts</p>
              </div>
            </div>
          </Link>

          <Link href="/portal/new" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">New Case</h3>
                <p className="text-sm text-gray-600">Submit a new case</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Cases */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Cases</h2>
          </div>
          <div className="p-6">
            {cases.length === 0 ? (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500">No cases yet. Start your first case to get a second opinion.</p>
                <Link
                  href="/portal/new"
                  className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Start Your First Case
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cases.slice(0, 5).map((caseItem) => (
                  <div key={caseItem.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{caseItem.caseNumber}</h3>
                          <p className="text-sm text-gray-600">{caseItem.diseaseType}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(caseItem.status)}`}>
                          {getStatusText(caseItem.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Submitted: {new Date(caseItem.submittedDate).toLocaleDateString()}
                        {caseItem.assignedTo && ` • Assigned to: ${caseItem.assignedTo}`}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/portal/cases/${caseItem.caseNumber}`}
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                      >
                        View Details
                      </Link>
                      {caseItem.finalOpinionUrl && (
                        <a
                          href={caseItem.finalOpinionUrl}
                          className="text-green-600 hover:text-green-900 text-sm font-medium"
                        >
                          Download Report
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
