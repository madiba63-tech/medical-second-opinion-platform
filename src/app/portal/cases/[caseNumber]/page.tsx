'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface CaseDetail {
  id: string;
  caseNumber: string;
  diseaseType: string;
  status: string;
  submittedDate: string;
  assignedTo?: string;
  files: CaseFile[];
  timeline: TimelineEvent[];
  finalOpinion?: {
    id: string;
    content: string;
    createdAt: string;
    downloadUrl: string;
  };
}

interface CaseFile {
  id: string;
  filename: string;
  category: string;
  size: number;
  createdAt: string;
  downloadUrl: string;
}

interface TimelineEvent {
  id: string;
  type: 'submitted' | 'processing' | 'ai_analysis' | 'assigned' | 'under_review' | 'peer_review' | 'completed' | 'delivered';
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

export default function CaseDetailPage() {
  const params = useParams();
  const caseNumber = params.caseNumber as string;
  
  const [caseDetail, setCaseDetail] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'files' | 'timeline' | 'opinion'>('overview');

  useEffect(() => {
    // Mock data for demonstration
    const mockCaseDetail: CaseDetail = {
      id: '1',
      caseNumber: caseNumber,
      diseaseType: 'Lung Cancer',
      status: 'under_review',
      submittedDate: '2024-01-15T10:30:00Z',
      assignedTo: 'Dr. Sarah Wilson',
      files: [
        {
          id: '1',
          filename: 'CT_Scan_Results.pdf',
          category: 'Image',
          size: 2048576,
          createdAt: '2024-01-15T10:30:00Z',
          downloadUrl: '/api/download/file/1'
        },
        {
          id: '2',
          filename: 'Blood_Test_Report.pdf',
          category: 'Lab Report',
          size: 512000,
          createdAt: '2024-01-15T10:30:00Z',
          downloadUrl: '/api/download/file/2'
        },
        {
          id: '3',
          filename: 'Doctor_Consultation.pdf',
          category: 'Doctor\'s Letter',
          size: 1024000,
          createdAt: '2024-01-15T10:30:00Z',
          downloadUrl: '/api/download/file/3'
        }
      ],
      timeline: [
        {
          id: '1',
          type: 'submitted',
          title: 'Case Submitted',
          description: 'Your case has been submitted and is being processed',
          date: '2024-01-15T10:30:00Z',
          completed: true
        },
        {
          id: '2',
          type: 'processing',
          title: 'Processing Documents',
          description: 'Your medical documents are being processed and analyzed',
          date: '2024-01-15T11:00:00Z',
          completed: true
        },
        {
          id: '3',
          type: 'ai_analysis',
          title: 'AI Analysis Complete',
          description: 'AI analysis of your documents has been completed',
          date: '2024-01-16T09:00:00Z',
          completed: true
        },
        {
          id: '4',
          type: 'assigned',
          title: 'Assigned to Professional',
          description: 'Your case has been assigned to Dr. Sarah Wilson',
          date: '2024-01-16T14:00:00Z',
          completed: true
        },
        {
          id: '5',
          type: 'under_review',
          title: 'Under Professional Review',
          description: 'Dr. Sarah Wilson is currently reviewing your case',
          date: '2024-01-17T10:00:00Z',
          completed: false
        },
        {
          id: '6',
          type: 'peer_review',
          title: 'Peer Review',
          description: 'Your case will undergo peer review for quality assurance',
          date: null,
          completed: false
        },
        {
          id: '7',
          type: 'completed',
          title: 'Review Complete',
          description: 'Professional review has been completed',
          date: null,
          completed: false
        },
        {
          id: '8',
          type: 'delivered',
          title: 'Report Delivered',
          description: 'Your second opinion report is ready for download',
          date: null,
          completed: false
        }
      ],
      finalOpinion: undefined // Will be populated when status is 'delivered'
    };

    setTimeout(() => {
      setCaseDetail(mockCaseDetail);
      setLoading(false);
    }, 1000);
  }, [caseNumber]);

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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
          <p className="text-gray-600 mb-6">The case you're looking for doesn't exist or you don't have access to it.</p>
          <Link
            href="/portal"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Dashboard
          </Link>
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
              <div className="flex items-center space-x-4 mb-2">
                <Link
                  href="/portal"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ← Back to Dashboard
                </Link>
                <span className="text-gray-400">|</span>
                <h1 className="text-3xl font-bold text-gray-900">{caseDetail.caseNumber}</h1>
              </div>
              <p className="text-gray-600">{caseDetail.diseaseType}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(caseDetail.status)}`}>
                {getStatusText(caseDetail.status)}
              </span>
              <Link
                href={`/portal/resubmit/${caseDetail.caseNumber}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Resubmit Case
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'files', label: 'Files' },
                { id: 'timeline', label: 'Timeline' },
                { id: 'opinion', label: 'Second Opinion' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Case Number:</span>
                        <span className="font-medium">{caseDetail.caseNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Disease Type:</span>
                        <span className="font-medium">{caseDetail.diseaseType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Submitted:</span>
                        <span className="font-medium">
                          {new Date(caseDetail.submittedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(caseDetail.status)}`}>
                          {getStatusText(caseDetail.status)}
                        </span>
                      </div>
                      {caseDetail.assignedTo && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Assigned to:</span>
                          <span className="font-medium">{caseDetail.assignedTo}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Link
                        href={`/portal/cases/${caseDetail.caseNumber}?tab=files`}
                        onClick={() => setActiveTab('files')}
                        className="block w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div>
                            <div className="font-medium text-gray-900">View Files</div>
                            <div className="text-sm text-gray-500">{caseDetail.files.length} documents uploaded</div>
                          </div>
                        </div>
                      </Link>

                      <Link
                        href={`/portal/cases/${caseDetail.caseNumber}?tab=timeline`}
                        onClick={() => setActiveTab('timeline')}
                        className="block w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <div className="font-medium text-gray-900">View Timeline</div>
                            <div className="text-sm text-gray-500">Track case progress</div>
                          </div>
                        </div>
                      </Link>

                      {caseDetail.finalOpinion && (
                        <Link
                          href={`/portal/cases/${caseDetail.caseNumber}?tab=opinion`}
                          onClick={() => setActiveTab('opinion')}
                          className="block w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <div>
                              <div className="font-medium text-gray-900">Download Report</div>
                              <div className="text-sm text-gray-500">Second opinion available</div>
                            </div>
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Files Tab */}
            {activeTab === 'files' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Uploaded Files</h3>
                  <span className="text-sm text-gray-500">{caseDetail.files.length} files</span>
                </div>

                <div className="space-y-4">
                  {caseDetail.files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{file.filename}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{file.category}</span>
                            <span>•</span>
                            <span>{formatFileSize(file.size)}</span>
                            <span>•</span>
                            <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <a
                        href={file.downloadUrl}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Case Timeline</h3>
                
                <div className="space-y-4">
                  {caseDetail.timeline.map((event, index) => (
                    <div key={event.id} className="flex items-start space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        event.completed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {event.completed ? '✓' : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          {event.date && (
                            <span className="text-sm text-gray-500">
                              {new Date(event.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Opinion Tab - Enhanced Interactive Experience */}
            {activeTab === 'opinion' && (
              <div className="space-y-6">
                {caseDetail.finalOpinion ? (
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Second Opinion Report</h3>
                        <p className="text-sm text-gray-600 mt-1">Expert review completed by {caseDetail.assignedTo}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                        <a
                          href={caseDetail.finalOpinion.downloadUrl}
                          className="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Report
                        </a>
                        <button className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          Discuss Report
                        </button>
                      </div>
                    </div>
                    
                    {/* Report Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <h4 className="font-semibold text-green-800">Diagnosis Confirmed</h4>
                        </div>
                        <p className="text-sm text-green-700">The expert agrees with the initial diagnosis and treatment approach.</p>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          <h4 className="font-semibold text-blue-800">AI Analysis</h4>
                        </div>
                        <p className="text-sm text-blue-700">94% confidence score with comprehensive data analysis performed.</p>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <h4 className="font-semibold text-purple-800">Next Steps</h4>
                        </div>
                        <p className="text-sm text-purple-700">Clear recommendations for follow-up care and monitoring.</p>
                      </div>
                    </div>
                    
                    {/* Interactive Report Viewer */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">Expert Opinion Summary</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-4 0a7 7 0 00-7 7v3a1 1 0 001 1h12a1 1 0 001-1v-3a7 7 0 00-7-7z" />
                            </svg>
                            <span>Confidential Medical Report</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 space-y-6">
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Report Generated:</span>
                            <span className="font-medium">
                              {new Date(caseDetail.finalOpinion.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Review Duration:</span>
                            <span className="font-medium">3 days, 14 hours</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Professional:</span>
                            <span className="font-medium">{caseDetail.assignedTo}</span>
                          </div>
                        </div>
                        
                        <div className="prose max-w-none">
                          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                            <h5 className="font-semibold text-blue-800 mb-2">Executive Summary</h5>
                            <p className="text-blue-700 text-sm">
                              After thorough review of your medical records, imaging studies, and laboratory results, I concur with the initial diagnosis. The treatment plan proposed is appropriate and follows current medical guidelines. I recommend proceeding with the suggested treatment while monitoring for the outlined progression markers.
                            </p>
                          </div>
                          
                          <div className="space-y-4">
                            <h5 className="font-semibold text-gray-900">Detailed Analysis</h5>
                            <p className="text-gray-700">
                              {caseDetail.finalOpinion.content}
                            </p>
                            
                            <h5 className="font-semibold text-gray-900">Key Recommendations</h5>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                              <li>Continue with the initially proposed treatment protocol</li>
                              <li>Schedule follow-up imaging in 3 months to assess treatment response</li>
                              <li>Monitor for specific biomarkers as outlined in the detailed report</li>
                              <li>Consider consultation with a specialized oncology team if progression occurs</li>
                            </ul>
                            
                            <h5 className="font-semibold text-gray-900">Questions for Your Doctor</h5>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                              <p className="text-sm text-yellow-800 mb-2 font-medium">Suggested questions to discuss with your primary care physician:</p>
                              <ul className="list-disc list-inside text-yellow-700 text-sm space-y-1">
                                <li>What are the expected timelines for treatment response?</li>
                                <li>What side effects should I monitor for?</li>
                                <li>Are there lifestyle modifications that could support treatment?</li>
                                <li>When should I schedule the next follow-up appointment?</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Items */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">What's Next?</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs font-bold">1</span>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">Share with Your Doctor</h5>
                            <p className="text-sm text-gray-600">Bring this report to your next appointment to discuss the recommendations.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs font-bold">2</span>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">Schedule Follow-up</h5>
                            <p className="text-sm text-gray-600">Book follow-up care based on the timeline recommendations.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs font-bold">3</span>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">Ask Questions</h5>
                            <p className="text-sm text-gray-600">Use our suggested questions to guide your discussion with your doctor.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs font-bold">4</span>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">Stay Connected</h5>
                            <p className="text-sm text-gray-600">We're here if you need additional opinions or have questions.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="relative">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-800 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Expert Review in Progress</h3>
                    <p className="text-gray-600 mb-6">
                      {caseDetail.assignedTo} is currently reviewing your case. You'll be notified immediately when the report is ready.
                    </p>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-700 font-medium">Estimated completion:</span>
                        <span className="text-blue-800 font-semibold">24-48 hours</span>
                      </div>
                      <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
