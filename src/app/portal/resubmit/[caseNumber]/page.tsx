'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import UploadStep from '@/components/submit/UploadStep';
import ContextStep from '@/components/submit/ContextStep';
import IdentifyStep from '@/components/submit/IdentifyStep';
import PaymentStep from '@/components/submit/PaymentStep';
import ConfirmStep from '@/components/submit/ConfirmStep';

interface OriginalCase {
  id: string;
  caseNumber: string;
  diseaseType: string;
  files: any[];
  contextInfo: any;
  personalInfo: any;
}

export default function ResubmitPage() {
  const params = useParams();
  const router = useRouter();
  const originalCaseNumber = params.caseNumber as string;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [originalCase, setOriginalCase] = useState<OriginalCase | null>(null);
  const [loading, setLoading] = useState(true);
  const [resubmissionData, setResubmissionData] = useState({
    medicalFiles: [],
    contextInfo: {},
    personalInfo: {},
  });
  const [caseId, setCaseId] = useState<string>('');

  useEffect(() => {
    // Mock data for demonstration
    const mockOriginalCase: OriginalCase = {
      id: '1',
      caseNumber: originalCaseNumber,
      diseaseType: 'Lung Cancer',
      files: [
        {
          id: '1',
          filename: 'CT_Scan_Results.pdf',
          category: 'Image',
          size: 2048576,
        },
        {
          id: '2',
          filename: 'Blood_Test_Report.pdf',
          category: 'Lab Report',
          size: 512000,
        }
      ],
      contextInfo: {
        ethnicity: 'White',
        gender: 'Male',
        diseaseType: 'Lung Cancer',
        isFirstOccurrence: true,
        geneticFamilyHistory: ['Parents']
      },
      personalInfo: {
        firstName: 'John',
        middleName: '',
        lastName: 'Doe',
        dob: '1980-05-15',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        preferredChannel: 'EMAIL'
      }
    };

    setTimeout(() => {
      setOriginalCase(mockOriginalCase);
      setResubmissionData({
        medicalFiles: [],
        contextInfo: mockOriginalCase.contextInfo,
        personalInfo: mockOriginalCase.personalInfo,
      });
      setLoading(false);
    }, 1000);
  }, [originalCaseNumber]);

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const updateResubmissionData = (data: any) => {
    setResubmissionData(prev => ({ ...prev, ...data }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading original case data...</p>
        </div>
      </div>
    );
  }

  if (!originalCase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Case Not Found</h2>
          <p className="text-gray-600 mb-6">The original case you're trying to resubmit doesn't exist.</p>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        {/* Mobile-First Header */}
        <div className="text-center mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
            <Link
              href={`/portal/cases/${originalCaseNumber}`}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
            >
              ← Back to Original Case
            </Link>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Resubmit Case</h1>
          </div>
          <p className="text-base lg:text-xl text-gray-600 px-4">
            Create a new case based on {originalCaseNumber} with updated information
          </p>
        </div>

        {/* Enhanced Case Info with Mobile Optimization */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 lg:p-6 mb-6 lg:mb-8 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-blue-900">Original Case Information</h2>
              <p className="text-sm text-blue-700">Your previous submission details</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center bg-white/50 rounded-lg p-3">
              <span className="font-medium text-blue-900 mb-1 sm:mb-0">Original Case:</span>
              <span className="sm:ml-2 text-blue-800 font-semibold">{originalCase.caseNumber}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center bg-white/50 rounded-lg p-3">
              <span className="font-medium text-blue-900 mb-1 sm:mb-0">Disease Type:</span>
              <span className="sm:ml-2 text-blue-800 font-semibold">{originalCase.diseaseType}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center bg-white/50 rounded-lg p-3">
              <span className="font-medium text-blue-900 mb-1 sm:mb-0">Files Uploaded:</span>
              <span className="sm:ml-2 text-blue-800 font-semibold">{originalCase.files.length} documents</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center bg-white/50 rounded-lg p-3">
              <span className="font-medium text-blue-900 mb-1 sm:mb-0">Submitted:</span>
              <span className="sm:ml-2 text-blue-800 font-semibold">January 15, 2024</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-100 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 text-sm">Why Resubmit?</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Common reasons include new test results, symptom changes, treatment response updates, or additional medical documentation. This creates a completely new case for a fresh expert review.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile-First Progress Bar */}
        <div className="mb-6 lg:mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Resubmission Progress</h3>
              <span className="text-sm text-gray-500">Step {currentStep} of 5</span>
            </div>
            
            {/* Mobile Progress Bar */}
            <div className="block sm:hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  {[
                    'Upload Documents',
                    'Medical Context', 
                    'Your Information',
                    'Payment',
                    'Confirmation'
                  ][currentStep - 1]}
                </span>
                <span className="text-xs text-gray-500">{Math.round((currentStep / 5) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Desktop Progress Steps */}
            <div className="hidden sm:block">
              <div className="relative flex justify-between items-center">
                {[
                  { step: 1, title: 'Upload Documents', icon: '📄' },
                  { step: 2, title: 'Medical Context', icon: '🏥' },
                  { step: 3, title: 'Your Information', icon: '👤' },
                  { step: 4, title: 'Payment', icon: '💳' },
                  { step: 5, title: 'Confirmation', icon: '✅' }
                ].map((item, index) => (
                  <div key={item.step} className="flex flex-col items-center flex-1 relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      currentStep >= item.step 
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg scale-110' 
                        : currentStep === item.step - 1
                        ? 'bg-blue-100 text-blue-600 border-2 border-blue-200'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {currentStep >= item.step ? '✓' : item.step}
                    </div>
                    <span className={`mt-2 text-xs text-center font-medium px-2 ${
                      currentStep >= item.step ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {item.title}
                    </span>
                    {index < 4 && (
                      <div className={`absolute top-6 left-1/2 w-full h-0.5 -z-10 transition-colors duration-300 ${
                        currentStep > item.step ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Step Description */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                {currentStep === 1 && "Add new or updated medical documents to supplement your original case."}
                {currentStep === 2 && "Update your medical context with any changes since your last submission."}
                {currentStep === 3 && "Verify and update your personal information if needed."}
                {currentStep === 4 && "Complete payment for your new second opinion review."}
                {currentStep === 5 && "Review and confirm your resubmitted case details."}
              </p>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="max-w-2xl mx-auto">
            {currentStep === 1 && (
              <UploadStep
                files={resubmissionData.medicalFiles}
                onUpdate={(files) => updateResubmissionData({ medicalFiles: files })}
                onNext={nextStep}
              />
            )}
            
            {currentStep === 2 && (
              <ContextStep
                context={resubmissionData.contextInfo}
                onUpdate={(context) => updateResubmissionData({ contextInfo: context })}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            
            {currentStep === 3 && (
              <IdentifyStep
                personalInfo={resubmissionData.personalInfo}
                onUpdate={(personalInfo) => updateResubmissionData({ personalInfo })}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            
            {currentStep === 4 && (
              <PaymentStep
                tempId=""
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            
            {currentStep === 5 && (
              <ConfirmStep
                caseId={caseId}
                setCaseId={setCaseId}
                tempId=""
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>🔒 Your data is encrypted and securely stored. This will create a new case independent of {originalCaseNumber}.</p>
        </div>
      </div>
    </div>
  );
}
