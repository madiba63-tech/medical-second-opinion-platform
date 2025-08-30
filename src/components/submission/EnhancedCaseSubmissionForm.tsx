'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCaseSubmission } from '@/hooks/useCaseSubmission';
import { useSubmissionValidation } from '@/hooks/useSubmissionValidation';
import { usePersonaSafe } from '@/hooks/usePersona';
import { PersonaAdaptiveUI } from './PersonaAdaptiveUI';
import { SubmissionProgress } from './SubmissionProgress';
import { DocumentUpload } from './DocumentUpload';
import { ValidationFeedback } from './ValidationFeedback';
import type { CaseSubmissionRequest } from '@/lib/validations/caseSubmission';
import type { CustomerPersona, LifecycleStage } from '@/types/persona';

interface FormStep {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  validation: (data: any) => boolean;
  personaSpecific?: Partial<Record<CustomerPersona, { title?: string; description?: string }>>;
}

interface SubmissionFormData extends Omit<CaseSubmissionRequest, 'customerId' | 'dateOfBirth'> {
  customerId?: string;
  dateOfBirth?: string;
  currentStep: number;
  isReturningCustomer: boolean;
  tempCaseId?: string;
}

const INITIAL_FORM_DATA: SubmissionFormData = {
  firstName: '',
  lastName: '',
  middleName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  diseaseType: '',
  ethnicity: undefined,
  gender: undefined,
  isFirstOccurrence: undefined,
  geneticFamilyHistory: '',
  consentAccepted: false,
  uploadedFiles: [],
  submissionSource: 'web',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  currentStep: 1,
  isReturningCustomer: false,
};

// Enhanced form steps with persona adaptations
const FORM_STEPS: FormStep[] = [
  {
    id: 'upload',
    title: 'Upload Medical Documents',
    component: DocumentUploadStep,
    validation: (data) => data.uploadedFiles && data.uploadedFiles.length > 0,
    personaSpecific: {
      cautious_researcher: {
        title: 'Share Your Medical Records',
        description: 'Upload your documents safely - we use bank-level security'
      },
      tech_savvy_optimizer: {
        title: 'Upload Documents',
        description: 'Drag & drop files or click to upload. AI will analyze format compatibility'
      },
      informed_advocator: {
        title: 'Medical Document Upload',
        description: 'Upload medical records, lab results, and imaging for comprehensive analysis'
      }
    }
  },
  {
    id: 'context',
    title: 'Medical Context',
    component: MedicalContextStep,
    validation: (data) => data.diseaseType && data.diseaseType.length > 0,
    personaSpecific: {
      cautious_researcher: {
        title: 'Tell Us About Your Condition',
        description: 'Help us understand your medical situation'
      },
      tech_savvy_optimizer: {
        title: 'Medical Context & Analytics',
        description: 'Structured data entry for optimal AI processing'
      },
      informed_advocator: {
        title: 'Clinical Context Information',
        description: 'Provide detailed medical history for expert analysis'
      }
    }
  },
  {
    id: 'personal',
    title: 'Personal Information',
    component: PersonalInfoStep,
    validation: (data) => data.firstName && data.lastName && data.email && data.dateOfBirth,
    personaSpecific: {
      cautious_researcher: {
        title: 'Your Information',
        description: 'We need basic information to create your secure case'
      },
      tech_savvy_optimizer: {
        title: 'User Profile',
        description: 'Account data for case tracking and notifications'
      },
      informed_advocator: {
        title: 'Patient Demographics',
        description: 'Personal information for medical record accuracy'
      }
    }
  },
  {
    id: 'consent',
    title: 'Consent & Terms',
    component: ConsentStep,
    validation: (data) => data.consentAccepted,
    personaSpecific: {
      cautious_researcher: {
        title: 'Privacy & Consent',
        description: 'Review our privacy practices and provide consent'
      },
      tech_savvy_optimizer: {
        title: 'Terms & Permissions',
        description: 'Digital consent and data processing agreement'
      },
      informed_advocator: {
        title: 'Medical Consent & Authorization',
        description: 'HIPAA-compliant consent for medical record review'
      }
    }
  },
  {
    id: 'review',
    title: 'Review & Submit',
    component: ReviewStep,
    validation: (data) => true, // Final validation happens during submission
    personaSpecific: {
      cautious_researcher: {
        title: 'Review Your Case',
        description: 'Check all information before submitting'
      },
      tech_savvy_optimizer: {
        title: 'Final Validation',
        description: 'AI pre-check and submission confirmation'
      },
      informed_advocator: {
        title: 'Case Review & Submission',
        description: 'Comprehensive review before expert assignment'
      }
    }
  }
];

export function EnhancedCaseSubmissionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<SubmissionFormData>(INITIAL_FORM_DATA);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Custom hooks
  const {
    customerData,
    persona,
    lifecycleStage,
    loading: personaLoading,
    error: personaError,
    updatePersonaData
  } = usePersonaSafe(formData.customerId);

  const {
    submitCase,
    isSubmitting,
    submissionProgress,
    error: submissionError,
    success: submissionSuccess,
    caseNumber,
    analytics: submissionAnalytics
  } = useCaseSubmission();

  const {
    validateField,
    validateStep,
    validationErrors,
    validationWarnings,
    isValidating,
    clearValidation
  } = useSubmissionValidation();

  // Initialize form from URL parameters and user data
  useEffect(() => {
    const initializeForm = async () => {
      const isReturning = searchParams?.get('returning') === 'true';
      const tempCaseId = searchParams?.get('tempCaseId') || undefined;
      const savedStep = searchParams?.get('step') ? parseInt(searchParams.get('step')!) : 1;

      setFormData(prev => ({
        ...prev,
        isReturningCustomer: isReturning,
        tempCaseId,
        currentStep: Math.max(1, Math.min(savedStep, FORM_STEPS.length)),
        customerId: customerData?.customerId,
        // Pre-fill with existing customer data
        firstName: customerData?.firstName || prev.firstName,
        lastName: customerData?.lastName || prev.lastName,
        email: customerData?.email || prev.email,
        phone: customerData?.phone || prev.phone,
      }));

      setCurrentStepIndex(Math.max(0, Math.min(savedStep - 1, FORM_STEPS.length - 1)));
      setIsInitialized(true);
    };

    initializeForm();
  }, [searchParams, customerData]);

  // Auto-save form data to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('caseSubmissionForm', JSON.stringify(formData));
    }
  }, [formData, isInitialized]);

  // Load saved form data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('caseSubmissionForm');
    if (savedData && !isInitialized) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.warn('Failed to load saved form data:', error);
      }
    }
  }, [isInitialized]);

  const currentStep = FORM_STEPS[currentStepIndex];

  const updateFormData = useCallback((updates: Partial<SubmissionFormData>) => {
    setFormData(prev => {
      const newData = { ...prev, ...updates };
      
      // Trigger validation for changed fields
      Object.keys(updates).forEach(field => {
        if (field !== 'currentStep') {
          validateField(field, updates[field as keyof typeof updates]);
        }
      });

      return newData;
    });
  }, [validateField]);

  const nextStep = useCallback(async () => {
    const isStepValid = await validateStep(currentStep.id, formData);
    
    if (!isStepValid) {
      return;
    }

    if (currentStepIndex < FORM_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      updateFormData({ currentStep: nextIndex + 1 });
      
      // Update URL without triggering navigation
      const newUrl = new URLSearchParams(window.location.search);
      newUrl.set('step', String(nextIndex + 1));
      window.history.replaceState({}, '', `${window.location.pathname}?${newUrl}`);
    }
  }, [currentStepIndex, currentStep, formData, validateStep, updateFormData]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      updateFormData({ currentStep: prevIndex + 1 });
      
      // Update URL
      const newUrl = new URLSearchParams(window.location.search);
      newUrl.set('step', String(prevIndex + 1));
      window.history.replaceState({}, '', `${window.location.pathname}?${newUrl}`);
    }
  }, [currentStepIndex, updateFormData]);

  const handleSubmit = useCallback(async () => {
    try {
      // Final validation
      const isFormValid = await validateStep('all', formData);
      if (!isFormValid) {
        return;
      }

      // Prepare submission data
      const submissionData: CaseSubmissionRequest = {
        ...formData,
        customerId: formData.customerId!,
        dateOfBirth: new Date(formData.dateOfBirth!).toISOString().split('T')[0],
      };

      // Submit the case
      const result = await submitCase(submissionData);
      
      if (result.success) {
        // Clear saved form data
        localStorage.removeItem('caseSubmissionForm');
        
        // Update persona data with submission
        if (persona) {
          await updatePersonaData({
            lifecycleStage: 'active_case' as LifecycleStage,
            engagementScore: Math.min(100, (customerData?.engagementScore || 0) + 15),
            nextRecommendedActions: ['track_case_progress', 'prepare_questions'],
          });
        }

        // Redirect to success page with case info
        router.push(`/portal/cases/${result.caseNumber}?submitted=true`);
      }
    } catch (error) {
      console.error('Submission failed:', error);
    }
  }, [formData, validateStep, submitCase, persona, updatePersonaData, customerData, router]);

  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < FORM_STEPS.length) {
      setCurrentStepIndex(stepIndex);
      updateFormData({ currentStep: stepIndex + 1 });
    }
  }, [updateFormData]);

  if (!isInitialized || personaLoading) {
    return (
      <PersonaAdaptiveUI persona={persona}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PersonaAdaptiveUI>
    );
  }

  return (
    <PersonaAdaptiveUI persona={persona}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {formData.isReturningCustomer ? 'Submit New Case' : 'Submit Your Medical Case'}
            </h1>
            <p className="text-xl text-gray-600">
              {currentStep.personaSpecific?.[persona || 'informed_advocator']?.description || 
               'Get a professional second opinion on your medical case'}
            </p>
          </div>

          {/* Progress Indicator */}
          <SubmissionProgress
            steps={FORM_STEPS}
            currentStep={currentStepIndex}
            persona={persona}
            onStepClick={goToStep}
            completedSteps={currentStepIndex}
            validationErrors={validationErrors}
          />

          {/* Validation Feedback */}
          <ValidationFeedback
            errors={validationErrors}
            warnings={validationWarnings}
            isValidating={isValidating}
            persona={persona}
            currentStep={currentStep.id}
          />

          {/* Form Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8 mb-8">
            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {currentStep.personaSpecific?.[persona || 'informed_advocator']?.title || currentStep.title}
                </h2>
                {currentStep.personaSpecific?.[persona || 'informed_advocator']?.description && (
                  <p className="text-gray-600">
                    {currentStep.personaSpecific[persona || 'informed_advocator']?.description}
                  </p>
                )}
              </div>

              {/* Dynamic Step Component */}
              <currentStep.component
                formData={formData}
                onUpdate={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submissionProgress={submissionProgress}
                validationErrors={validationErrors}
                persona={persona}
                isReturningCustomer={formData.isReturningCustomer}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Encrypted & Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>24-48 Hour Response</span>
              </div>
            </div>
            <p>Auto-saved progress • Secure cloud storage • Expert medical review</p>
          </div>
        </div>
      </div>
    </PersonaAdaptiveUI>
  );
}

// Step Components (simplified - will be expanded)
function DocumentUploadStep({ formData, onUpdate, onNext, persona }: any) {
  return (
    <DocumentUpload
      files={formData.uploadedFiles || []}
      onFilesChange={(files) => onUpdate({ uploadedFiles: files })}
      onNext={onNext}
      persona={persona}
      maxFiles={20}
      allowedTypes={['pdf', 'jpg', 'jpeg', 'png', 'dicom']}
    />
  );
}

function MedicalContextStep({ formData, onUpdate, onNext, onPrev, persona }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Medical Condition or Disease Type *
        </label>
        <input
          type="text"
          value={formData.diseaseType || ''}
          onChange={(e) => onUpdate({ diseaseType: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="e.g., Breast Cancer, Heart Disease, etc."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender (Optional)
          </label>
          <select
            value={formData.gender || ''}
            onChange={(e) => onUpdate({ gender: e.target.value as any })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non_binary">Non-binary</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ethnicity (Optional)
          </label>
          <select
            value={formData.ethnicity || ''}
            onChange={(e) => onUpdate({ ethnicity: e.target.value as any })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">Select ethnicity</option>
            <option value="hispanic_latino">Hispanic or Latino</option>
            <option value="white">White</option>
            <option value="black_african_american">Black or African American</option>
            <option value="native_american">Native American</option>
            <option value="asian">Asian</option>
            <option value="pacific_islander">Pacific Islander</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!formData.diseaseType}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

function PersonalInfoStep({ formData, onUpdate, onNext, onPrev, isReturningCustomer }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName || ''}
            onChange={(e) => onUpdate({ firstName: e.target.value })}
            disabled={isReturningCustomer}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName || ''}
            onChange={(e) => onUpdate({ lastName: e.target.value })}
            disabled={isReturningCustomer}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          value={formData.email || ''}
          onChange={(e) => onUpdate({ email: e.target.value })}
          disabled={isReturningCustomer}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date of Birth *
        </label>
        <input
          type="date"
          value={formData.dateOfBirth || ''}
          onChange={(e) => onUpdate({ dateOfBirth: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.dateOfBirth}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

function ConsentStep({ formData, onUpdate, onNext, onPrev }: any) {
  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Consent & Privacy</h3>
        <div className="space-y-4 text-sm text-gray-600">
          <p>By proceeding, you consent to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Review of your medical records by qualified healthcare professionals</li>
            <li>Secure storage and processing of your health information</li>
            <li>Communication regarding your case via your preferred method</li>
            <li>HIPAA-compliant handling of your medical data</li>
          </ul>
        </div>
        
        <label className="flex items-start space-x-3 mt-6">
          <input
            type="checkbox"
            checked={formData.consentAccepted || false}
            onChange={(e) => onUpdate({ consentAccepted: e.target.checked })}
            className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">
            I have read and agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>. I consent to the medical review process described above.
          </span>
        </label>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!formData.consentAccepted}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Review & Submit
        </button>
      </div>
    </div>
  );
}

function ReviewStep({ formData, onPrev, onSubmit, isSubmitting, submissionProgress }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Summary</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Patient Name</dt>
            <dd className="text-sm text-gray-900">{formData.firstName} {formData.lastName}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="text-sm text-gray-900">{formData.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Medical Condition</dt>
            <dd className="text-sm text-gray-900">{formData.diseaseType || 'Not specified'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Documents</dt>
            <dd className="text-sm text-gray-900">{formData.uploadedFiles?.length || 0} files uploaded</dd>
          </div>
        </dl>
      </div>

      {isSubmitting && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-900">Submitting Case...</span>
            <span className="text-sm text-blue-700">{submissionProgress}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${submissionProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onPrev}
          disabled={isSubmitting}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Case'}
        </button>
      </div>
    </div>
  );
}