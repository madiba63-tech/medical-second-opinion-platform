'use client';

import { useState } from 'react';
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

export default function SubmitPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [tempSubmission, setTempSubmission] = useState<TempSubmission>({
    medicalFiles: [],
    contextInfo: {},
  });
  const [tempId, setTempId] = useState<string>('');
  const [caseId, setCaseId] = useState<string>('');

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const updateTempSubmission = (data: Partial<TempSubmission>) => {
    setTempSubmission(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Submit Your Case</h1>
          <p className="text-xl text-gray-600">Get a professional second opinion on your medical case</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[
              { step: 1, title: 'Upload Documents' },
              { step: 2, title: 'Medical Context' },
              { step: 3, title: 'Your Information' },
              { step: 4, title: 'Create Account' },
              { step: 5, title: 'Payment' },
              { step: 6, title: 'Confirmation' }
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
                {index < 5 && (
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
            
            {currentStep === 4 && (
              <RegisterStep
                tempSubmission={tempSubmission}
                tempId={tempId}
                setTempId={setTempId}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            
            {currentStep === 5 && (
              <PaymentStep
                tempId={tempId}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            
            {currentStep === 6 && (
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
