'use client';

import { useState, useCallback } from 'react';
import { 
  ApplicationPathType, 
  ApplicationFormData, 
  AIExtractedCVData,
  SelfAssessmentData,
  StartApplicationResponse
} from '@/types/dual-path-recruitment';

import ApplicationPathSelector from './ApplicationPathSelector';
import AIDataReviewComponent from './AIDataReviewComponent';
import ComplianceAgreementComponent from './ComplianceAgreementComponent';
import SelfAssessmentQuestionnaire from './SelfAssessmentQuestionnaire';
import FinalReviewComponent from './FinalReviewComponent';
import DocumentUploadComponent from './DocumentUploadComponent';
import InternationalManualEntryComponent from './InternationalManualEntryComponent';

// Application flow steps
type ApplicationStep = 
  | 'path_selection'
  | 'ai_data_review' 
  | 'manual_entry'
  | 'document_upload'
  | 'compliance'
  | 'self_assessment'
  | 'final_review'
  | 'submission_complete';

interface ApplicationState {
  applicationNumber?: string;
  candidateId?: string;
  pathType?: ApplicationPathType;
  aiExtractedData?: AIExtractedCVData;
  formData: ApplicationFormData;
  selfAssessmentData?: SelfAssessmentData;
  currentStep: ApplicationStep;
}

const INITIAL_FORM_DATA: ApplicationFormData = {
  personalInfo: {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    dateOfBirth: undefined,
    governmentIdType: undefined,
    governmentIdNumber: undefined
  },
  professionalInfo: {
    currentAffiliation: '',
    currentPosition: '',
    subspecialties: [],
    yearsPractice: 0,
    publications: 0,
    clinicalTrials: false,
    teachingRoles: false,
    primarySpecialty: '',
    workPhone: '',
    workEmail: ''
  },
  medicalEducation: {
    medicalSchool: '',
    graduationYear: '',
    degree: '',
    residencyProgram: '',
    residencySpecialty: '',
    residencyStartYear: '',
    residencyEndYear: '',
    fellowshipProgram: '',
    fellowshipSpecialty: '',
    fellowshipYear: ''
  },
  licensingInfo: {
    licenseNumber: '',
    licenseCountry: '',
    licenseExpirationDate: undefined,
    boardCertifications: [],
    malpracticeInsurance: undefined
  },
  documents: {
    cv: undefined,
    medicalLicense: undefined,
    boardCertifications: [],
    malpracticeInsurance: undefined,
    governmentId: undefined,
    additionalDocuments: []
  },
  compliance: {
    backgroundCheckConsent: false,
    dataProcessingConsent: false,
    communicationConsent: false,
    qualityAssuranceConsent: false,
    intellectualPropertyConsent: false
  }
};

export default function DualPathApplicationFlow() {
  const [applicationState, setApplicationState] = useState<ApplicationState>({
    formData: INITIAL_FORM_DATA,
    currentStep: 'path_selection'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle path selection and application start with retry logic
   */
  const handlePathSelected = useCallback(async (
    pathType: ApplicationPathType, 
    email: string, 
    cvFile?: File,
    retryCount: number = 0
  ) => {
    const MAX_RETRIES = 2;
    
    setLoading(true);
    setError(null);

    try {
      console.log(`Starting application (attempt ${retryCount + 1}/${MAX_RETRIES + 1}):`, {
        pathType,
        email,
        hasFile: !!cvFile,
        fileName: cvFile?.name,
        fileSize: cvFile?.size
      });

      // Prepare form data for API call
      const formData = new FormData();
      formData.append('pathType', pathType);
      formData.append('applicantEmail', email);
      
      if (cvFile) {
        formData.append('cvFile', cvFile);
        console.log(`CV file details: ${cvFile.name}, ${cvFile.size} bytes, type: ${cvFile.type}`);
      }

      // Call the start application API with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      console.log('Making API request to:', '/api/v2/professional/apply/start-dev');
      const response = await fetch('/api/v2/professional/apply/start-dev', {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      // Enhanced JSON response handling with better error recovery
      const contentType = response.headers.get('content-type');
      console.log('Response details:', {
        status: response.status,
        statusText: response.statusText,
        contentType,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response received:', {
          contentType,
          status: response.status,
          statusText: response.statusText,
          responseText: textResponse.substring(0, 500) + (textResponse.length > 500 ? '...' : '')
        });
        throw new Error(`Server returned non-JSON response (${response.status}): ${contentType || 'unknown content type'}. Response: ${textResponse.substring(0, 100)}`);
      }

      // Safely parse JSON with additional error handling
      let result: StartApplicationResponse;
      try {
        const responseText = await response.text();
        console.log('Raw response text (first 200 chars):', responseText.substring(0, 200));
        
        if (!responseText.trim()) {
          throw new Error('Empty response body received from server');
        }
        
        result = JSON.parse(responseText);
        console.log('Successfully parsed JSON:', result);
      } catch (parseError) {
        console.error('JSON parse error details:', {
          error: parseError,
          response: {
            status: response.status,
            statusText: response.statusText,
            contentType: response.headers.get('content-type'),
            url: response.url
          }
        });
        
        // Try to get the raw response text for debugging
        try {
          const responseClone = response.clone();
          const debugText = await responseClone.text();
          console.error('Raw response that failed parsing:', debugText);
        } catch (cloneError) {
          console.error('Could not clone response for debugging:', cloneError);
        }
        
        throw new Error(`Failed to parse server response as JSON. Status: ${response.status}. Parse error: ${parseError.message}`);
      }

      if (!response.ok) {
        throw new Error(result.error || 'Failed to start application');
      }

      if (!result.success) {
        throw new Error(result.message || 'Application start failed');
      }

      // Update application state
      setApplicationState(prev => ({
        ...prev,
        applicationNumber: result.applicationNumber,
        candidateId: result.candidateId,
        pathType: result.pathType,
        aiExtractedData: result.aiExtractedData,
        formData: {
          ...prev.formData,
          personalInfo: {
            ...prev.formData.personalInfo,
            email: email
          }
        },
        currentStep: result.nextStep === 'ai_review' ? 'ai_data_review' : 'manual_entry'
      }));

      console.log(`Application ${result.applicationNumber} started successfully`);

    } catch (err) {
      console.error(`Path selection error (attempt ${retryCount + 1}):`, err);
      
      // Determine if we should retry
      const shouldRetry = (
        retryCount < MAX_RETRIES && 
        (
          (err instanceof Error && (
            err.message.includes('JSON.parse') ||
            err.message.includes('Failed to fetch') ||
            err.message.includes('NetworkError') ||
            err.message.includes('AbortError') ||
            err.message.includes('Empty response')
          )) ||
          err.name === 'AbortError'
        )
      );

      if (shouldRetry) {
        console.log(`Retrying request (${retryCount + 1}/${MAX_RETRIES})...`);
        setError(`Connection issue detected. Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
        
        // Recursive retry
        return handlePathSelected(pathType, email, cvFile, retryCount + 1);
      }

      // No retry needed or max retries reached
      const errorMessage = err instanceof Error ? err.message : 'Failed to start application';
      setError(`${errorMessage}${retryCount > 0 ? ` (after ${retryCount + 1} attempts)` : ''}`);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Handle AI data review completion
   */
  const handleAIDataReviewComplete = useCallback((reviewedData: ApplicationFormData) => {
    setApplicationState(prev => ({
      ...prev,
      formData: reviewedData,
      currentStep: 'document_upload'
    }));
  }, []);

  /**
   * Handle compliance agreement completion
   */
  const handleComplianceComplete = useCallback((complianceData: ApplicationFormData['compliance']) => {
    setApplicationState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        compliance: complianceData
      },
      currentStep: 'self_assessment'
    }));
  }, []);

  /**
   * Handle self-assessment completion
   */
  const handleSelfAssessmentComplete = useCallback((assessmentData: SelfAssessmentData) => {
    setApplicationState(prev => ({
      ...prev,
      selfAssessmentData: assessmentData,
      currentStep: 'final_review'
    }));
  }, []);

  /**
   * Handle final submission completion
   */
  const handleFinalSubmissionComplete = useCallback(() => {
    setApplicationState(prev => ({
      ...prev,
      currentStep: 'submission_complete'
    }));
  }, []);

  /**
   * Handle document upload completion
   */
  const handleDocumentUploadComplete = useCallback(() => {
    setApplicationState(prev => ({
      ...prev,
      currentStep: 'compliance'
    }));
  }, []);

  /**
   * Navigate to previous step
   */
  const handlePreviousStep = useCallback(() => {
    setApplicationState(prev => {
      switch (prev.currentStep) {
        case 'ai_data_review':
        case 'manual_entry':
          return { ...prev, currentStep: 'path_selection' };
        case 'document_upload':
          return { 
            ...prev, 
            currentStep: prev.pathType === 'AI_ASSISTED' ? 'ai_data_review' : 'manual_entry' 
          };
        case 'compliance':
          return { ...prev, currentStep: 'document_upload' };
        case 'self_assessment':
          return { ...prev, currentStep: 'compliance' };
        case 'final_review':
          return { ...prev, currentStep: 'self_assessment' };
        default:
          return prev;
      }
    });
  }, []);

  /**
   * Render progress indicator
   */
  const renderProgressIndicator = () => {
    const steps = [
      { key: 'path_selection', label: 'Path Selection', completed: applicationState.currentStep !== 'path_selection' },
      { 
        key: 'data_entry', 
        label: applicationState.pathType === 'AI_ASSISTED' ? 'AI Data Review' : 'Manual Entry', 
        completed: ['document_upload', 'compliance', 'self_assessment', 'final_review', 'submission_complete'].includes(applicationState.currentStep) 
      },
      { 
        key: 'document_upload', 
        label: 'Documents', 
        completed: ['compliance', 'self_assessment', 'final_review', 'submission_complete'].includes(applicationState.currentStep) 
      },
      { 
        key: 'compliance', 
        label: 'Compliance', 
        completed: ['self_assessment', 'final_review', 'submission_complete'].includes(applicationState.currentStep) 
      },
      { 
        key: 'self_assessment', 
        label: 'Self-Assessment', 
        completed: ['final_review', 'submission_complete'].includes(applicationState.currentStep) 
      },
      { 
        key: 'final_review', 
        label: 'Final Review', 
        completed: applicationState.currentStep === 'submission_complete' 
      }
    ];

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-semibold text-sm ${
                step.completed 
                  ? 'bg-green-500 border-green-500 text-white'
                  : applicationState.currentStep === step.key ||
                    (step.key === 'data_entry' && ['ai_data_review', 'manual_entry'].includes(applicationState.currentStep))
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-gray-100 border-gray-300 text-gray-500'
              }`}>
                {step.completed ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              
              <span className={`ml-2 text-sm font-medium ${
                step.completed || applicationState.currentStep === step.key ||
                (step.key === 'data_entry' && ['ai_data_review', 'manual_entry'].includes(applicationState.currentStep))
                  ? 'text-gray-900'
                  : 'text-gray-500'
              }`}>
                {step.label}
              </span>
              
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-4 ${
                  step.completed ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        {applicationState.applicationNumber && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Application Number: <span className="font-mono font-medium">{applicationState.applicationNumber}</span>
            </p>
          </div>
        )}
      </div>
    );
  };

  /**
   * Render current step component
   */
  const renderCurrentStep = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <svg className="animate-spin w-8 h-8 mx-auto mb-4 text-blue-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-600">Processing your application...</p>
        </div>
      );
    }

    if (error) {
      // Determine if this is a technical error that users can't resolve
      const isTechnicalError = (
        error.includes('JSON.parse') || 
        error.includes('Failed to fetch') || 
        error.includes('NetworkError') || 
        error.includes('non-JSON response') ||
        error.includes('Empty response')
      );
      
      const userFriendlyMessage = isTechnicalError 
        ? "We're experiencing technical difficulties with the application system. This appears to be a temporary issue with our server. Please try again in a few minutes, or contact support if the problem persists."
        : error;

      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                {isTechnicalError ? 'Technical Issue Detected' : 'Application Error'}
              </h3>
              <p className="text-red-700 mb-4">{userFriendlyMessage}</p>
              
              {isTechnicalError && (
                <details className="mb-4">
                  <summary className="text-sm text-red-600 cursor-pointer hover:text-red-800">
                    Technical Details (for debugging)
                  </summary>
                  <div className="mt-2 text-xs text-gray-600 bg-gray-100 p-3 rounded font-mono">
                    {error}
                  </div>
                </details>
              )}
              
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setError(null);
                    setApplicationState(prev => ({ ...prev, currentStep: 'path_selection' }));
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Try Again
                </button>
                
                {isTechnicalError && (
                  <button
                    onClick={() => {
                      const debugInfo = encodeURIComponent(`
Application Error Report:
- Error: ${error}
- User Agent: ${navigator.userAgent}
- Timestamp: ${new Date().toISOString()}
- URL: ${window.location.href}
                      `.trim());
                      window.open(`mailto:support@medical-second-opinion.com?subject=Application Technical Issue&body=${debugInfo}`, '_blank');
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Report Issue
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (applicationState.currentStep) {
      case 'path_selection':
        return (
          <ApplicationPathSelector 
            onPathSelected={handlePathSelected}
          />
        );

      case 'ai_data_review':
        if (!applicationState.aiExtractedData || !applicationState.candidateId || !applicationState.applicationNumber) {
          return (
            <div className="text-center py-8">
              <p className="text-red-600">Missing AI data or application information</p>
            </div>
          );
        }
        
        return (
          <AIDataReviewComponent
            candidateId={applicationState.candidateId}
            applicationNumber={applicationState.applicationNumber}
            extractedData={applicationState.aiExtractedData}
            onComplete={handleAIDataReviewComplete}
            onPrev={handlePreviousStep}
          />
        );

      case 'manual_entry':
        if (!applicationState.candidateId || !applicationState.applicationNumber) {
          return (
            <div className="text-center py-8">
              <p className="text-red-600">Missing application information</p>
            </div>
          );
        }
        
        return (
          <InternationalManualEntryComponent
            candidateId={applicationState.candidateId}
            applicationNumber={applicationState.applicationNumber}
            onComplete={handleAIDataReviewComplete}
            onPrev={handlePreviousStep}
            initialData={applicationState.formData}
          />
        );

      case 'document_upload':
        return (
          <DocumentUploadComponent
            onNext={handleDocumentUploadComplete}
            onPrev={handlePreviousStep}
          />
        );

      case 'compliance':
        if (!applicationState.candidateId || !applicationState.applicationNumber) {
          return (
            <div className="text-center py-8">
              <p className="text-red-600">Missing application information</p>
            </div>
          );
        }
        
        return (
          <ComplianceAgreementComponent
            candidateId={applicationState.candidateId}
            applicationNumber={applicationState.applicationNumber}
            formData={applicationState.formData}
            onComplete={handleComplianceComplete}
            onPrev={handlePreviousStep}
            initialData={applicationState.formData.compliance}
          />
        );

      case 'self_assessment':
        if (!applicationState.candidateId) {
          return (
            <div className="text-center py-8">
              <p className="text-red-600">Missing candidate information</p>
            </div>
          );
        }
        
        return (
          <SelfAssessmentQuestionnaire
            candidateId={applicationState.candidateId}
            onComplete={handleSelfAssessmentComplete}
            onPrev={handlePreviousStep}
            initialData={applicationState.selfAssessmentData}
          />
        );

      case 'final_review':
        if (!applicationState.candidateId || !applicationState.applicationNumber || 
            !applicationState.pathType || !applicationState.selfAssessmentData) {
          return (
            <div className="text-center py-8">
              <p className="text-red-600">Missing application or assessment data</p>
            </div>
          );
        }
        
        return (
          <FinalReviewComponent
            candidateId={applicationState.candidateId}
            applicationNumber={applicationState.applicationNumber}
            pathType={applicationState.pathType}
            formData={applicationState.formData}
            selfAssessmentData={applicationState.selfAssessmentData}
            onComplete={handleFinalSubmissionComplete}
            onPrev={handlePreviousStep}
          />
        );

      case 'submission_complete':
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <svg className="w-12 h-12 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-green-900 mb-2">Application Submitted Successfully!</h3>
            <p className="text-green-700 mb-4">
              Your professional application has been submitted and is now under admin review. 
              You will receive email updates on your application status.
            </p>
            <div className="bg-white border border-green-200 rounded-lg p-4 text-left max-w-md mx-auto">
              <h4 className="font-semibold text-gray-900 mb-2">What Happens Next:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Admin review of your application (2-5 business days)</li>
                <li>• Credential verification process</li>
                <li>• Background check completion</li>
                <li>• Platform orientation and training</li>
                <li>• First case assignment upon approval</li>
              </ul>
            </div>
            <div className="mt-6">
              <a 
                href="/"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
              >
                Return to Home
              </a>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-red-600">Unknown application step</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Professional Application Portal
          </h1>
          <p className="text-lg text-gray-600">
            Medical Second Opinion Platform - Professional Recruitment
          </p>
        </div>

        {/* Progress Indicator */}
        {applicationState.currentStep !== 'path_selection' && renderProgressIndicator()}

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 sm:p-8">
            {renderCurrentStep()}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Having issues? Contact support at{' '}
            <a href="mailto:support@medical-second-opinion.com" className="text-blue-600 hover:underline">
              support@medical-second-opinion.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}