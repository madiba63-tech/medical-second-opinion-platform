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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Link
              href={`/portal/cases/${originalCaseNumber}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Original Case
            </Link>
            <span className="text-gray-400">|</span>
            <h1 className="text-4xl font-bold text-gray-900">Resubmit Case</h1>
          </div>
          <p className="text-xl text-gray-600">
            Create a new case based on {originalCaseNumber} with updated information
          </p>
        </div>

        {/* Original Case Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Original Case Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-900">Original Case:</span>
              <span className="ml-2 text-blue-700">{originalCase.caseNumber}</span>
            </div>
            <div>
              <span className="font-medium text-blue-900">Disease Type:</span>
              <span className="ml-2 text-blue-700">{originalCase.diseaseType}</span>
            </div>
            <div>
              <span className="font-medium text-blue-900">Files Uploaded:</span>
              <span className="ml-2 text-blue-700">{originalCase.files.length} documents</span>
            </div>
            <div>
              <span className="font-medium text-blue-900">Submitted:</span>
              <span className="ml-2 text-blue-700">January 15, 2024</span>
            </div>
          </div>
          <p className="text-sm text-blue-700 mt-4">
            💡 <strong>Tip:</strong> You can update any information below. The new case will be independent of the original.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[
              { step: 1, title: 'Upload Documents' },
              { step: 2, title: 'Medical Context' },
              { step: 3, title: 'Your Information' },
              { step: 4, title: 'Payment' },
              { step: 5, title: 'Confirmation' }
            ].map((item, index) => (
              <div key={item.step} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep >= item.step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {item.step}
                </div>
                <span className={`mt-2 text-xs text-center font-medium ${
                  currentStep >= item.step ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {item.title}
                </span>
                {index < 4 && (
                  <div className={`hidden sm:block absolute top-5 w-full h-0.5 -z-10 ${
                    currentStep > item.step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} style={{ left: '50%', width: 'calc(100% - 2.5rem)' }}></div>
                )}
              </div>
            ))}
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
