'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import UploadStep from '@/components/submit/UploadStep';
import ContextStep from '@/components/submit/ContextStep';
import IdentifyStep from '@/components/submit/IdentifyStep';
import RegisterStep from '@/components/submit/RegisterStep';
import PaymentStep from '@/components/submit/PaymentStep';
import ConfirmStep from '@/components/submit/ConfirmStep';

interface TempSubmission {
  medicalFiles: any[];
  contextInfo: any;
  personalInfo?: any;
}

interface ExistingCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredChannel: string;
  memberSince: string;
  completedCases: number;
}

export default function SubmitPage() {
  const searchParams = useSearchParams();
  const isReturningCustomer = searchParams?.get('returning') === 'true';
  
  const [currentStep, setCurrentStep] = useState(1);
  const [tempSubmission, setTempSubmission] = useState<TempSubmission>({
    medicalFiles: [],
    contextInfo: {},
  });
  const [tempId, setTempId] = useState<string>('');
  const [caseId, setCaseId] = useState<string>('');
  const [existingCustomer, setExistingCustomer] = useState<ExistingCustomer | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is authenticated and fetch their info
    if (isReturningCustomer) {
      setIsLoading(true);
      // Mock existing customer data
      const mockCustomer: ExistingCustomer = {
        id: 'cust_123',
        firstName: 'John',
        lastName: 'Doe', 
        email: 'john.doe@example.com',
        phone: '+1234567890',
        preferredChannel: 'EMAIL',
        memberSince: '2023-08-15',
        completedCases: 2
      };
      
      setTimeout(() => {
        setExistingCustomer(mockCustomer);
        setTempSubmission(prev => ({
          ...prev,
          personalInfo: {
            firstName: mockCustomer.firstName,
            lastName: mockCustomer.lastName,
            email: mockCustomer.email,
            phone: mockCustomer.phone,
            preferredChannel: mockCustomer.preferredChannel
          }
        }));
        setIsLoading(false);
      }, 500);
    }
  }, [isReturningCustomer]);

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const updateTempSubmission = (data: Partial<TempSubmission>) => {
    setTempSubmission(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        {/* Enhanced Header with Customer Recognition */}
        <div className="text-center mb-6 lg:mb-8">
          {existingCustomer ? (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                  {existingCustomer.firstName[0]}
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-bold text-gray-900">Welcome back, {existingCustomer.firstName}!</h2>
                  <p className="text-sm text-gray-600">Member since {new Date(existingCustomer.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">{existingCustomer.completedCases} cases completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-gray-700">Fast-track processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="text-gray-700">Preferred customer pricing</span>
                </div>
              </div>
            </div>
          ) : null}
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {existingCustomer ? 'Submit New Case' : 'Submit Your Case'}
          </h1>
          <p className="text-base lg:text-xl text-gray-600 px-4">
            {existingCustomer 
              ? 'Your information is pre-filled to speed up the process'
              : 'Get a professional second opinion on your medical case'
            }
          </p>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="mb-6 lg:mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Submission Progress</h3>
              <span className="text-sm text-gray-500">
                Step {currentStep} of {existingCustomer ? 5 : 6}
              </span>
            </div>
            
            {/* Mobile Progress Bar */}
            <div className="block sm:hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  {(() => {
                    const steps = existingCustomer 
                      ? ['Upload Documents', 'Medical Context', 'Your Information', 'Payment', 'Confirmation']
                      : ['Upload Documents', 'Medical Context', 'Your Information', 'Create Account', 'Payment', 'Confirmation'];
                    return steps[currentStep - 1];
                  })()}
                </span>
                <span className="text-xs text-gray-500">
                  {Math.round((currentStep / (existingCustomer ? 5 : 6)) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / (existingCustomer ? 5 : 6)) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Desktop Progress Steps */}
            <div className="hidden sm:block">
              <div className="relative flex justify-between items-center">
                {(existingCustomer ? [
                  { step: 1, title: 'Upload Documents' },
                  { step: 2, title: 'Medical Context' },
                  { step: 3, title: 'Your Information' },
                  { step: 4, title: 'Payment' },
                  { step: 5, title: 'Confirmation' }
                ] : [
                  { step: 1, title: 'Upload Documents' },
                  { step: 2, title: 'Medical Context' },
                  { step: 3, title: 'Your Information' },
                  { step: 4, title: 'Create Account' },
                  { step: 5, title: 'Payment' },
                  { step: 6, title: 'Confirmation' }
                ]).map((item, index, array) => (
                  <div key={item.step} className="flex flex-col items-center flex-1 relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      currentStep >= item.step 
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg' 
                        : currentStep === item.step - 1
                        ? 'bg-blue-100 text-blue-600 border-2 border-blue-200'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {currentStep >= item.step ? '✓' : item.step}
                    </div>
                    <span className={`mt-2 text-xs text-center font-medium px-1 ${
                      currentStep >= item.step ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {item.title}
                    </span>
                    {index < array.length - 1 && (
                      <div className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 transition-colors duration-300 ${
                        currentStep > item.step ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {existingCustomer && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center text-sm text-green-800">
                  <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-medium">Fast-track enabled:</span>
                  <span className="ml-1">Account creation step skipped for returning customers</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="max-w-2xl mx-auto">
            {currentStep === 1 && (
              <UploadStep
                files={tempSubmission.medicalFiles}
                onUpdate={(files) => updateTempSubmission({ medicalFiles: files })}
                onNext={nextStep}
              />
            )}
            
            {currentStep === 2 && (
              <ContextStep
                context={tempSubmission.contextInfo}
                onUpdate={(context) => updateTempSubmission({ contextInfo: context })}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            
            {currentStep === 3 && (
              <IdentifyStep
                personalInfo={tempSubmission.personalInfo}
                onUpdate={(personalInfo) => updateTempSubmission({ personalInfo })}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            
            {currentStep === 4 && !existingCustomer && (
              <RegisterStep
                tempSubmission={tempSubmission}
                tempId={tempId}
                setTempId={setTempId}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            
            {currentStep === 4 && existingCustomer && (
              <PaymentStep
                tempId={tempId}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            
            {currentStep === 5 && !existingCustomer && (
              <PaymentStep
                tempId={tempId}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            
            {currentStep === 5 && existingCustomer && (
              <ConfirmStep
                caseId={caseId}
                setCaseId={setCaseId}
                tempId={tempId}
                personalInfo={tempSubmission.personalInfo}
              />
            )}
            
            {currentStep === 6 && !existingCustomer && (
              <ConfirmStep
                caseId={caseId}
                setCaseId={setCaseId}
                tempId={tempId}
                personalInfo={tempSubmission.personalInfo}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>🔒 Your data is encrypted and securely stored. We comply with HIPAA regulations.</p>
        </div>
      </div>
    </div>
  );
}
