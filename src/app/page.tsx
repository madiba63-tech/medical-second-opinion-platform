'use client';

import { useState } from 'react';
import PatientInfoForm from '@/components/PatientInfoForm';
import MedicalUploadForm from '@/components/MedicalUploadForm';
import MedicalContextForm from '@/components/MedicalContextForm';
import ReviewSubmission from '@/components/ReviewSubmission';
import PaymentSection from '@/components/PaymentSection';
import TermsConsent from '@/components/TermsConsent';
import ConfirmationScreen from '@/components/ConfirmationScreen';
import { FormData, StepFormProps } from '@/types/form';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [caseId, setCaseId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      phone: ''
    },
    medicalFiles: [],
    contextInfo: {
      ethnicity: '',
      gender: '',
      diseaseType: '',
      isFirstOccurrence: null,
      geneticFamilyHistory: []
    },
    paymentId: '',
    consentAccepted: false
  });

  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const renderStepIndicator = () => {
    const steps = [
      'Personal Info',
      'Upload Documents', 
      'Medical Context',
      'Review',
      'Payment',
      'Consent',
      'Confirmation'
    ];

    return (
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            const isAccessible = stepNumber <= currentStep;

            return (
              <div key={stepNumber} className="flex flex-col items-center flex-1">
                <button
                  onClick={() => isAccessible && goToStep(stepNumber)}
                  disabled={!isAccessible}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : isCompleted
                      ? 'bg-green-500 text-white cursor-pointer hover:bg-green-600'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isCompleted ? '✓' : stepNumber}
                </button>
                <span className={`mt-2 text-xs text-center ${
                  isActive ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}>
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block absolute top-5 w-full h-0.5 -z-10 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`} style={{ left: '50%', width: 'calc(100% - 2.5rem)' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const stepFormProps: StepFormProps = {
    formData,
    updateFormData,
    nextStep,
    prevStep,
    setCaseId,
    goToStep
  };

  if (currentStep === 7 && caseId) {
    const customerName = `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`.trim();
    return <ConfirmationScreen caseId={caseId} customerName={customerName} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Medical Second Opinion Portal
          </h1>
          <p className="text-xl text-gray-600">
            Submit your medical records for expert review by our qualified medical professionals
          </p>
        </div>

        {/* Step Indicator */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {renderStepIndicator()}
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {currentStep === 1 && (
            <PatientInfoForm 
              formData={formData}
              updateFormData={updateFormData}
              nextStep={nextStep}
              prevStep={prevStep}
              setCaseId={setCaseId}
            />
          )}
          {currentStep === 2 && <MedicalUploadForm {...stepFormProps} />}
          {currentStep === 3 && <MedicalContextForm {...stepFormProps} />}
          {currentStep === 4 && <ReviewSubmission {...stepFormProps} />}
          {currentStep === 5 && <PaymentSection {...stepFormProps} />}
          {currentStep === 6 && <TermsConsent {...stepFormProps} />}
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>🔒 Your data is encrypted and securely stored. We comply with HIPAA regulations.</p>
        </div>
      </div>
    </div>
  );
}