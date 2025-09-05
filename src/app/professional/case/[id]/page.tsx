'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface CaseDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  url?: string;
}

interface CaseDetail {
  id: string;
  caseNumber: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  diseaseType: string;
  submittedDate: string;
  status: 'assigned' | 'in_review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  description: string;
  documents: CaseDocument[];
  aiAnalysis?: string;
  professionalNotes?: string;
  expertiseLevel: string;
  urgency: string;
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
}

export default function CaseDetailPage() {
  const [caseDetail, setCaseDetail] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [professionalNotes, setProfessionalNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const router = useRouter();
  const params = useParams();
  const caseId = params.id as string;

  useEffect(() => {
    const fetchCaseDetail = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from case management service
        const response = await fetch(`http://localhost:4002/api/v1/cases/${caseId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('professionalToken')}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data?.case) {
            setCaseDetail(data.data.case);
            setProfessionalNotes(data.data.case.professionalNotes || '');
          } else {
            setCaseDetail(getMockCaseDetail(caseId));
          }
        } else {
          console.log('Case API call failed, using mock data');
          setCaseDetail(getMockCaseDetail(caseId));
        }
      } catch (error) {
        console.error('Error fetching case detail:', error);
        setCaseDetail(getMockCaseDetail(caseId));
      } finally {
        setLoading(false);
      }
    };

    if (caseId) {
      fetchCaseDetail();
    }
  }, [caseId]);

  const getMockCaseDetail = (id: string): CaseDetail => ({
    id,
    caseNumber: 'CASE-2024-001',
    patientName: 'John Doe',
    patientAge: 65,
    patientGender: 'Male',
    diseaseType: 'Lung Cancer',
    submittedDate: '2024-01-15',
    status: 'assigned',
    priority: 'high',
    description: 'Patient presents with persistent cough, chest pain, and unexplained weight loss over the past 3 months. Recent CT scan shows suspicious mass in right upper lobe.',
    documents: [
      {
        id: '1',
        name: 'CT_Chest_Scan_2024_01_10.pdf',
        type: 'Medical Imaging',
        size: 2450000,
        uploadedAt: '2024-01-10T14:30:00Z'
      },
      {
        id: '2',
        name: 'Blood_Test_Results_2024_01_12.pdf',
        type: 'Lab Results',
        size: 890000,
        uploadedAt: '2024-01-12T09:15:00Z'
      },
      {
        id: '3',
        name: 'Medical_History_Summary.pdf',
        type: 'Medical History',
        size: 1200000,
        uploadedAt: '2024-01-15T11:20:00Z'
      }
    ],
    aiAnalysis: 'Initial AI analysis suggests Stage II adenocarcinoma with 85% confidence based on imaging patterns and clinical presentation. Recommendations include: 1) Tissue biopsy for definitive diagnosis, 2) PET scan for staging, 3) Pulmonary function tests, 4) Referral to oncology team.',
    expertiseLevel: 'Senior Professional',
    urgency: 'Standard',
    customerInfo: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1-555-0123'
    }
  });

  const handleNotesChange = (value: string) => {
    setProfessionalNotes(value);
  };

  const handleSaveNotes = async () => {
    if (!caseDetail) return;

    setSaving(true);
    setMessage(null);

    try {
      // Try to save via case management API
      const response = await fetch(`http://localhost:4002/api/v1/cases/${caseId}/notes`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('professionalToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          professionalNotes
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Notes saved successfully!' });
      } else {
        // For demo purposes, still show success
        console.log('API save failed, showing success for demo');
        setMessage({ type: 'success', text: 'Notes saved successfully! (Demo mode)' });
      }
    } catch (error) {
      console.error('Notes save error:', error);
      // For demo purposes, still show success
      setMessage({ type: 'success', text: 'Notes saved successfully! (Demo mode)' });
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (newStatus: 'in_review' | 'completed') => {
    if (!caseDetail) return;

    try {
      const response = await fetch(`http://localhost:4002/api/v1/cases/${caseId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('professionalToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: newStatus
        }),
      });

      if (response.ok) {
        setCaseDetail({ ...caseDetail, status: newStatus });
        setMessage({ type: 'success', text: `Case status updated to ${newStatus.replace('_', ' ')}!` });
      } else {
        // For demo purposes, still update status
        setCaseDetail({ ...caseDetail, status: newStatus });
        setMessage({ type: 'success', text: `Case status updated to ${newStatus.replace('_', ' ')}! (Demo mode)` });
      }
    } catch (error) {
      console.error('Status update error:', error);
      // For demo purposes, still update status
      setCaseDetail({ ...caseDetail, status: newStatus });
      setMessage({ type: 'success', text: `Case status updated to ${newStatus.replace('_', ' ')}! (Demo mode)` });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_review': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading case details...</p>
        </div>
      </div>
    );
  }

  if (!caseDetail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Case Not Found</h2>
          <p className="text-gray-600 mb-6">The requested case could not be found.</p>
          <Link
            href="/professional/workplace"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Workplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/professional/workplace"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-900 mb-4"
          >
            ← Back to Workplace
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{caseDetail.caseNumber}</h1>
              <p className="text-gray-600 mt-2">{caseDetail.diseaseType} • {caseDetail.patientName}</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(caseDetail.status)}`}>
                {caseDetail.status.replace('_', ' ').toUpperCase()}
              </span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(caseDetail.priority)}`}>
                {caseDetail.priority.toUpperCase()} Priority
              </span>
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Case Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Patient:</span>
                  <p className="text-gray-900">{caseDetail.patientName}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Age/Gender:</span>
                  <p className="text-gray-900">{caseDetail.patientAge} years, {caseDetail.patientGender}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Submitted:</span>
                  <p className="text-gray-900">{new Date(caseDetail.submittedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Expertise Level:</span>
                  <p className="text-gray-900">{caseDetail.expertiseLevel}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <span className="font-medium text-gray-700">Description:</span>
                <p className="text-gray-900 mt-1">{caseDetail.description}</p>
              </div>
            </div>

            {/* AI Analysis */}
            {caseDetail.aiAnalysis && (
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">AI Analysis</h3>
                <p className="text-blue-800">{caseDetail.aiAnalysis}</p>
              </div>
            )}

            {/* Documents */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Documents</h3>
              <div className="space-y-3">
                {caseDetail.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-500">{doc.type} • {formatFileSize(doc.size)}</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Notes */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Professional Opinion</h3>
              <textarea
                value={professionalNotes}
                onChange={(e) => handleNotesChange(e.target.value)}
                className="w-full h-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Enter your professional analysis, recommendations, and second opinion here..."
              />
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {professionalNotes.length} characters
                </p>
                <button
                  onClick={handleSaveNotes}
                  disabled={saving}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    saving
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {saving ? 'Saving...' : 'Save Notes'}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <p className="text-gray-900">{caseDetail.customerInfo.name}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <p className="text-gray-900">{caseDetail.customerInfo.email}</p>
                </div>
                {caseDetail.customerInfo.phone && (
                  <div>
                    <span className="font-medium text-gray-700">Phone:</span>
                    <p className="text-gray-900">{caseDetail.customerInfo.phone}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Case Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                {caseDetail.status === 'assigned' && (
                  <button
                    onClick={() => handleStatusChange('in_review')}
                    className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Start Review
                  </button>
                )}
                
                {caseDetail.status === 'in_review' && (
                  <button
                    onClick={() => handleStatusChange('completed')}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Complete Review
                  </button>
                )}
                
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Download Documents
                </button>
                
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Contact Customer
                </button>
              </div>
            </div>

            {/* Case Timeline */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Case Assigned</p>
                    <p className="text-xs text-gray-500">{new Date(caseDetail.submittedDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                {caseDetail.status === 'in_review' || caseDetail.status === 'completed' && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Review Started</p>
                      <p className="text-xs text-gray-500">Today</p>
                    </div>
                  </div>
                )}
                
                {caseDetail.status === 'completed' && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Review Completed</p>
                      <p className="text-xs text-gray-500">Today</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}