'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { TrustBadge } from '@/components/ui/TrustBadge';

interface CaseItem {
  id: string;
  caseNumber: string;
  diseaseType: string;
  status: 'submitted' | 'processing' | 'ai_analysis' | 'assigned' | 'under_review' | 'peer_review' | 'completed' | 'delivered';
  submittedDate: string;
  estimatedCompletion?: string;
  completedDate?: string;
  assignedTo?: {
    id: string;
    name: string;
    level: 'JUNIOR' | 'SENIOR' | 'EXPERT' | 'DISTINGUISHED';
    specialties: string[];
    avatar?: string;
  };
  finalOpinionUrl?: string;
  lastUpdated: string;
  urgency: 'low' | 'medium' | 'high';
  aiConfidenceScore?: number;
  customerRating?: number;
  customerFeedback?: string;
  canReopen: boolean;
  reopenedFromCase?: string;
  linkedCases?: string[];
  totalCost: number;
  currency: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
}

interface CaseReopenModal {
  isOpen: boolean;
  case: CaseItem | null;
}

interface CustomerSatisfactionModal {
  isOpen: boolean;
  case: CaseItem | null;
}

export default function CaseManagement() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'urgency'>('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [reopenModal, setReopenModal] = useState<CaseReopenModal>({ isOpen: false, case: null });
  const [satisfactionModal, setSatisfactionModal] = useState<CustomerSatisfactionModal>({ isOpen: false, case: null });
  const router = useRouter();

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      // Mock data - replace with actual API call
      const mockCases: CaseItem[] = [
        {
          id: '1',
          caseNumber: 'CASE-2024-001',
          diseaseType: 'Lung Cancer',
          status: 'delivered',
          submittedDate: '2024-01-15',
          estimatedCompletion: '2024-01-20',
          completedDate: '2024-01-19',
          assignedTo: {
            id: 'prof_1',
            name: 'Dr. Sarah Wilson, MD, PhD',
            level: 'EXPERT',
            specialties: ['Oncology', 'Pulmonology']
          },
          finalOpinionUrl: '/api/download/opinion/case-2024-001',
          lastUpdated: '2024-01-20T10:30:00Z',
          urgency: 'high',
          aiConfidenceScore: 94,
          canReopen: true,
          totalCost: 650.00,
          currency: 'EUR',
          paymentStatus: 'paid'
        },
        {
          id: '2',
          caseNumber: 'CASE-2024-002',
          diseaseType: 'Breast Cancer',
          status: 'under_review',
          submittedDate: '2024-01-20',
          estimatedCompletion: '2024-01-25',
          assignedTo: {
            id: 'prof_2',
            name: 'Dr. Emily Rodriguez, MD, MS',
            level: 'DISTINGUISHED',
            specialties: ['Medical Oncology', 'Breast Cancer']
          },
          lastUpdated: '2024-01-23T14:15:00Z',
          urgency: 'medium',
          aiConfidenceScore: 89,
          canReopen: false,
          totalCost: 850.00,
          currency: 'EUR',
          paymentStatus: 'paid'
        },
        {
          id: '3',
          caseNumber: 'CASE-2024-003',
          diseaseType: 'Prostate Cancer',
          status: 'ai_analysis',
          submittedDate: '2024-01-22',
          estimatedCompletion: '2024-01-27',
          lastUpdated: '2024-01-23T09:45:00Z',
          urgency: 'low',
          aiConfidenceScore: 91,
          canReopen: false,
          totalCost: 400.00,
          currency: 'EUR',
          paymentStatus: 'paid'
        }
      ];

      setCases(mockCases);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load cases:', error);
      setLoading(false);
    }
  };

  const handleReopenCase = async (caseItem: CaseItem, additionalInfo: string, preferSameProfessional: boolean) => {
    try {
      // API call to reopen case
      const response = await fetch(`/api/v1/customer/cases/${caseItem.caseNumber}/reopen`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('customerToken')}`
        },
        body: JSON.stringify({
          additionalContext: additionalInfo,
          preferSameProfessional,
          originalProfessionalId: caseItem.assignedTo?.id
        })
      });

      if (response.ok) {
        const result = await response.json();
        // Refresh cases
        await loadCases();
        setReopenModal({ isOpen: false, case: null });
        
        // Redirect to new case
        router.push(`/portal/cases/${result.newCaseNumber}`);
      } else {
        throw new Error('Failed to reopen case');
      }
    } catch (error) {
      console.error('Error reopening case:', error);
      alert('Failed to reopen case. Please try again.');
    }
  };

  const handleSatisfactionSubmit = async (caseItem: CaseItem, rating: number, feedback: string) => {
    try {
      const response = await fetch(`/api/v1/customer/cases/${caseItem.caseNumber}/satisfaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('customerToken')}`
        },
        body: JSON.stringify({
          rating,
          feedback,
          professionalId: caseItem.assignedTo?.id
        })
      });

      if (response.ok) {
        // Update case with satisfaction rating
        setCases(prev => prev.map(c => 
          c.id === caseItem.id 
            ? { ...c, customerRating: rating, customerFeedback: feedback }
            : c
        ));
        setSatisfactionModal({ isOpen: false, case: null });
      }
    } catch (error) {
      console.error('Error submitting satisfaction:', error);
      alert('Failed to submit satisfaction rating. Please try again.');
    }
  };

  const filteredCases = cases.filter(caseItem => {
    // Filter by status
    if (filter === 'active' && ['delivered', 'completed'].includes(caseItem.status)) return false;
    if (filter === 'completed' && !['delivered', 'completed'].includes(caseItem.status)) return false;
    
    // Search filter
    if (searchTerm && !caseItem.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !caseItem.diseaseType.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
      case 'urgency':
        const urgencyOrder = { high: 3, medium: 2, low: 1 };
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
        <p className="text-gray-600">Loading your cases...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">My Cases</h1>
          <p className="text-gray-600">Manage and track your medical second opinion cases</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Link
            href="/submit"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Submit New Case
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filter */}
          <div className="flex space-x-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'completed')}
            >
              <option value="all">All Cases</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'status' | 'urgency')}
            >
              <option value="date">Sort by Date</option>
              <option value="status">Sort by Status</option>
              <option value="urgency">Sort by Urgency</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="space-y-4">
        {filteredCases.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No cases found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms.' : 'Submit your first case to get started.'}
            </p>
            {!searchTerm && (
              <Link
                href="/submit"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Submit Your First Case</span>
              </Link>
            )}
          </div>
        ) : (
          filteredCases.map((caseItem) => (
            <div key={caseItem.id} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                {/* Case Info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{caseItem.caseNumber}</h3>
                      <p className="text-lg text-gray-700 font-medium">{caseItem.diseaseType}</p>
                    </div>
                    <StatusIndicator 
                      status={caseItem.status} 
                      urgency={caseItem.urgency}
                      showProgress={true}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Submitted</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(caseItem.submittedDate).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {caseItem.estimatedCompletion && (
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                          {caseItem.completedDate ? 'Completed' : 'Est. Completion'}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(caseItem.completedDate || caseItem.estimatedCompletion).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Cost</p>
                      <p className="text-sm font-medium text-gray-900">
                        {caseItem.totalCost.toFixed(2)} {caseItem.currency}
                      </p>
                    </div>
                  </div>
                  
                  {caseItem.assignedTo && (
                    <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {caseItem.assignedTo.name.split(' ')[1]?.[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{caseItem.assignedTo.name}</p>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            caseItem.assignedTo.level === 'DISTINGUISHED' ? 'bg-purple-100 text-purple-800' :
                            caseItem.assignedTo.level === 'EXPERT' ? 'bg-blue-100 text-blue-800' :
                            caseItem.assignedTo.level === 'SENIOR' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {caseItem.assignedTo.level}
                          </span>
                          <span className="text-xs text-gray-500">
                            {caseItem.assignedTo.specialties.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {caseItem.aiConfidenceScore && (
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-sm text-gray-500">AI Analysis Confidence:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${caseItem.aiConfidenceScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-green-600">{caseItem.aiConfidenceScore}%</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex flex-col space-y-3 lg:ml-6 lg:min-w-[200px]">
                  <Link
                    href={`/portal/cases/${caseItem.caseNumber}`}
                    className="inline-flex items-center justify-center px-4 py-2 bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 rounded-lg font-medium transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Details
                  </Link>
                  
                  {caseItem.finalOpinionUrl && (
                    <a
                      href={caseItem.finalOpinionUrl}
                      className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Report
                    </a>
                  )}
                  
                  {caseItem.canReopen && (
                    <button
                      onClick={() => setReopenModal({ isOpen: true, case: caseItem })}
                      className="inline-flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-all duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reopen Case
                    </button>
                  )}
                  
                  {caseItem.status === 'delivered' && !caseItem.customerRating && (
                    <button
                      onClick={() => setSatisfactionModal({ isOpen: true, case: caseItem })}
                      className="inline-flex items-center justify-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-all duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Rate & Review
                    </button>
                  )}
                  
                  {caseItem.customerRating && (
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <span>Your rating:</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < caseItem.customerRating! ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Case Reopen Modal */}
      {reopenModal.isOpen && reopenModal.case && (
        <ReopenCaseModal
          case={reopenModal.case}
          onClose={() => setReopenModal({ isOpen: false, case: null })}
          onSubmit={handleReopenCase}
        />
      )}

      {/* Customer Satisfaction Modal */}
      {satisfactionModal.isOpen && satisfactionModal.case && (
        <SatisfactionModal
          case={satisfactionModal.case}
          onClose={() => setSatisfactionModal({ isOpen: false, case: null })}
          onSubmit={handleSatisfactionSubmit}
        />
      )}
    </div>
  );
}

// Reopen Case Modal Component
function ReopenCaseModal({ case: caseItem, onClose, onSubmit }: {
  case: CaseItem;
  onClose: () => void;
  onSubmit: (caseItem: CaseItem, additionalInfo: string, preferSameProfessional: boolean) => void;
}) {
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [preferSameProfessional, setPreferSameProfessional] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!additionalInfo.trim()) return;
    
    setSubmitting(true);
    try {
      await onSubmit(caseItem, additionalInfo, preferSameProfessional);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Reopen Case: {caseItem.caseNumber}</h3>
          <p className="text-sm text-gray-600 mt-1">
            Add additional context or information to continue your medical review
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Information or Context
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Please provide any new information, test results, or specific questions you'd like addressed..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              required
            />
          </div>
          
          {caseItem.assignedTo && (
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={preferSameProfessional}
                  onChange={(e) => setPreferSameProfessional(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-700">
                  Prefer the same professional ({caseItem.assignedTo.name}) if available
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                If unavailable within 48 hours, your case will be assigned to another qualified specialist
              </p>
            </div>
          )}
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Important Note
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Reopening this case will create a new case with a new payment requirement. 
                    The professional will have access to all original documents and reports.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !additionalInfo.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-md text-sm font-medium"
            >
              {submitting ? 'Reopening...' : 'Reopen Case'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Customer Satisfaction Modal Component
function SatisfactionModal({ case: caseItem, onClose, onSubmit }: {
  case: CaseItem;
  onClose: () => void;
  onSubmit: (caseItem: CaseItem, rating: number, feedback: string) => void;
}) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    setSubmitting(true);
    try {
      await onSubmit(caseItem, rating, feedback);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Rate Your Experience</h3>
          <p className="text-sm text-gray-600 mt-1">
            Case: {caseItem.caseNumber} - {caseItem.diseaseType}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Overall Satisfaction Rating
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`w-8 h-8 ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  } hover:text-yellow-400 transition-colors`}
                >
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {rating === 0 ? 'Click to rate' : `${rating} star${rating !== 1 ? 's' : ''}`}
              </span>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feedback (Optional)
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Please share your feedback about the second opinion process, quality of care, or any suggestions for improvement..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || rating === 0}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-md text-sm font-medium"
            >
              {submitting ? 'Submitting...' : 'Submit Rating'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}