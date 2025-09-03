'use client';

import { useState } from 'react';
import { 
  ApplicationFormData, 
  SelfAssessmentData,
  ApplicationPathType 
} from '@/types/dual-path-recruitment';

interface FinalReviewComponentProps {
  candidateId: string;
  applicationNumber: string;
  pathType: ApplicationPathType;
  formData: ApplicationFormData;
  selfAssessmentData: SelfAssessmentData;
  onComplete: () => void;
  onPrev: () => void;
}

interface SubmissionResult {
  success: boolean;
  professionalId?: string;
  workflowId?: string;
  message: string;
  nextSteps?: string[];
}

export default function FinalReviewComponent({
  candidateId,
  applicationNumber,
  pathType,
  formData,
  selfAssessmentData,
  onComplete,
  onPrev
}: FinalReviewComponentProps) {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Generate CV content from form data
   */
  const generateCVContent = (): string => {
    const { personalInfo, professionalInfo, medicalEducation, licensingInfo } = formData;
    
    let cvContent = `PROFESSIONAL CURRICULUM VITAE\n\n`;
    
    // Personal Information
    cvContent += `PERSONAL INFORMATION\n`;
    cvContent += `Name: ${personalInfo.firstName} ${personalInfo.middleName ? personalInfo.middleName + ' ' : ''}${personalInfo.lastName}\n`;
    cvContent += `Email: ${personalInfo.email}\n`;
    if (personalInfo.phone) cvContent += `Phone: ${personalInfo.phone}\n`;
    if (personalInfo.nationality) cvContent += `Nationality: ${personalInfo.nationality}\n`;
    cvContent += `\n`;
    
    // Medical Education
    cvContent += `MEDICAL EDUCATION\n`;
    if (medicalEducation.medicalSchool) {
      cvContent += `Medical School: ${medicalEducation.medicalSchool}`;
      if (medicalEducation.graduationYear) cvContent += ` (${medicalEducation.graduationYear})`;
      cvContent += `\n`;
    }
    if (medicalEducation.degree) cvContent += `Degree: ${medicalEducation.degree}\n`;
    
    if (medicalEducation.residencyProgram) {
      cvContent += `Residency: ${medicalEducation.residencyProgram}`;
      if (medicalEducation.residencySpecialty) cvContent += ` - ${medicalEducation.residencySpecialty}`;
      if (medicalEducation.residencyStartYear && medicalEducation.residencyEndYear) {
        cvContent += ` (${medicalEducation.residencyStartYear}-${medicalEducation.residencyEndYear})`;
      }
      cvContent += `\n`;
    }
    
    if (medicalEducation.fellowshipProgram) {
      cvContent += `Fellowship: ${medicalEducation.fellowshipProgram}`;
      if (medicalEducation.fellowshipSpecialty) cvContent += ` - ${medicalEducation.fellowshipSpecialty}`;
      if (medicalEducation.fellowshipYear) cvContent += ` (${medicalEducation.fellowshipYear})`;
      cvContent += `\n`;
    }
    cvContent += `\n`;
    
    // Professional Experience
    cvContent += `PROFESSIONAL EXPERIENCE\n`;
    if (professionalInfo.currentAffiliation) cvContent += `Current Position: ${professionalInfo.currentAffiliation}\n`;
    if (professionalInfo.currentPosition) cvContent += `Title: ${professionalInfo.currentPosition}\n`;
    if (professionalInfo.yearsPractice) cvContent += `Years of Practice: ${professionalInfo.yearsPractice}\n`;
    if (professionalInfo.primarySpecialty) cvContent += `Primary Specialty: ${professionalInfo.primarySpecialty}\n`;
    if (professionalInfo.subspecialties.length > 0) cvContent += `Subspecialties: ${professionalInfo.subspecialties.join(', ')}\n`;
    cvContent += `\n`;
    
    // Publications and Research
    if (professionalInfo.publications || professionalInfo.clinicalTrials || professionalInfo.teachingRoles) {
      cvContent += `RESEARCH AND ACADEMIC ACTIVITIES\n`;
      if (professionalInfo.publications) cvContent += `Publications: ${professionalInfo.publications} peer-reviewed articles\n`;
      if (professionalInfo.clinicalTrials) cvContent += `Clinical Trials: Active participation in clinical research\n`;
      if (professionalInfo.teachingRoles) cvContent += `Academic Roles: Teaching and mentoring responsibilities\n`;
      cvContent += `\n`;
    }
    
    // Licensing
    if (licensingInfo.licenseNumber || licensingInfo.boardCertifications.length > 0) {
      cvContent += `LICENSING AND CERTIFICATIONS\n`;
      if (licensingInfo.licenseNumber) {
        cvContent += `Medical License: ${licensingInfo.licenseNumber}`;
        if (licensingInfo.licenseCountry) cvContent += ` (${licensingInfo.licenseCountry})`;
        cvContent += `\n`;
      }
      if (licensingInfo.boardCertifications.length > 0) {
        cvContent += `Board Certifications: ${licensingInfo.boardCertifications.join(', ')}\n`;
      }
    }
    
    return cvContent;
  };

  /**
   * Submit application to microservices
   */
  const handleFinalSubmission = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log(`🚀 Starting final submission for application ${applicationNumber}`);

      // Step 1: Submit to Professional Recruitment Service
      console.log('📝 Submitting to Professional Recruitment Service...');
      const recruitmentPayload = {
        candidateId,
        applicationNumber,
        pathType,
        personalInfo: formData.personalInfo,
        professionalInfo: formData.professionalInfo,
        medicalEducation: formData.medicalEducation,
        licensingInfo: formData.licensingInfo,
        compliance: formData.compliance,
        selfAssessment: selfAssessmentData,
        generatedCV: generateCVContent(),
        submittedAt: new Date().toISOString()
      };

      const recruitmentResponse = await fetch('/api/v2/professional/submit-dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recruitmentPayload)
      });

      if (!recruitmentResponse.ok) {
        const errorData = await recruitmentResponse.json();
        throw new Error(errorData.message || 'Failed to submit to recruitment service');
      }

      const recruitmentResult = await recruitmentResponse.json();
      console.log('✅ Recruitment service submission successful:', recruitmentResult);

      console.log('✅ Application submission completed successfully!');

      // Success! Set the result
      const submissionSuccess: SubmissionResult = {
        success: true,
        professionalId: recruitmentResult.professionalId,
        message: `Your professional application has been submitted successfully! Application number: ${applicationNumber}`,
        nextSteps: [
          'Application submitted to admin review queue',
          'You will receive email updates on application status',
          pathType === 'AI_ASSISTED' 
            ? 'AI-assisted applications typically reviewed within 3-5 business days'
            : 'Manual applications typically reviewed within 2-4 business days',
          'Credential verification will be conducted during review',
          'You will be contacted for any additional information needed',
          'Upon approval, you will receive platform training materials'
        ]
      };

      setSubmissionResult(submissionSuccess);
      
      // Call completion callback after a short delay to show success message
      setTimeout(() => {
        onComplete();
      }, 3000);

    } catch (err) {
      console.error('❌ Final submission failed:', err);
      setError(err instanceof Error ? err.message : 'Application submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Render application summary section
   */
  const renderSummarySection = (title: string, children: React.ReactNode) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  /**
   * Render key-value pair
   */
  const renderKeyValue = (label: string, value: string | number | undefined | null, fallback = 'Not provided') => (
    <div className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
      <span className="font-medium text-gray-700">{label}:</span>
      <span className="text-gray-900">{value || fallback}</span>
    </div>
  );

  // If submission is complete, show success
  if (submissionResult?.success) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="bg-green-100 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">Application Submitted Successfully!</h2>
          <p className="text-green-700 text-lg">{submissionResult.message}</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4">What Happens Next?</h3>
          <ul className="space-y-2">
            {submissionResult.nextSteps?.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-green-800">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Important Information</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• <strong>Professional ID:</strong> {submissionResult.professionalId}</p>
            <p>• <strong>Workflow ID:</strong> {submissionResult.workflowId}</p>
            <p>• <strong>Support Email:</strong> support@medical-second-opinion.com</p>
            <p>• <strong>Status Check:</strong> You can check your application status in the professional portal</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Final Review & Submission</h2>
        <p className="text-gray-600">
          Please review your application details below. Once submitted, your application will be 
          forwarded to our admin team for review and credential verification.
        </p>
      </div>

      {/* Application Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900">Application Summary</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p>Application Number: <span className="font-mono">{applicationNumber}</span></p>
              <p>Application Path: <span className="font-semibold">{pathType === 'AI_ASSISTED' ? 'AI-Assisted' : 'Manual Entry'}</span></p>
              <p>Candidate ID: <span className="font-mono">{candidateId}</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      {renderSummarySection('Personal Information', (
        <div>
          {renderKeyValue('Full Name', `${formData.personalInfo.firstName} ${formData.personalInfo.middleName ? formData.personalInfo.middleName + ' ' : ''}${formData.personalInfo.lastName}`)}
          {renderKeyValue('Email Address', formData.personalInfo.email)}
          {renderKeyValue('Phone Number', formData.personalInfo.phone)}
          {renderKeyValue('Nationality', formData.personalInfo.nationality)}
        </div>
      ))}

      {/* Medical Education */}
      {renderSummarySection('Medical Education', (
        <div>
          {renderKeyValue('Medical School', formData.medicalEducation.medicalSchool)}
          {renderKeyValue('Graduation Year', formData.medicalEducation.graduationYear)}
          {renderKeyValue('Degree', formData.medicalEducation.degree)}
          {renderKeyValue('Residency Program', formData.medicalEducation.residencyProgram)}
          {renderKeyValue('Residency Specialty', formData.medicalEducation.residencySpecialty)}
          {formData.medicalEducation.residencyStartYear && formData.medicalEducation.residencyEndYear && 
           renderKeyValue('Residency Years', `${formData.medicalEducation.residencyStartYear} - ${formData.medicalEducation.residencyEndYear}`)}
          {formData.medicalEducation.fellowshipProgram && 
           renderKeyValue('Fellowship Program', formData.medicalEducation.fellowshipProgram)}
          {formData.medicalEducation.fellowshipSpecialty && 
           renderKeyValue('Fellowship Specialty', formData.medicalEducation.fellowshipSpecialty)}
          {formData.medicalEducation.fellowshipYear && 
           renderKeyValue('Fellowship Year', formData.medicalEducation.fellowshipYear)}
        </div>
      ))}

      {/* Professional Information */}
      {renderSummarySection('Professional Experience', (
        <div>
          {renderKeyValue('Current Affiliation', formData.professionalInfo.currentAffiliation)}
          {renderKeyValue('Current Position', formData.professionalInfo.currentPosition)}
          {renderKeyValue('Primary Specialty', formData.professionalInfo.primarySpecialty)}
          {formData.professionalInfo.subspecialties.length > 0 && 
           renderKeyValue('Subspecialties', formData.professionalInfo.subspecialties.join(', '))}
          {renderKeyValue('Years in Practice', formData.professionalInfo.yearsPractice?.toString())}
          {renderKeyValue('Publications', formData.professionalInfo.publications?.toString())}
          {renderKeyValue('Clinical Trials', formData.professionalInfo.clinicalTrials ? 'Yes' : 'No')}
          {renderKeyValue('Teaching Roles', formData.professionalInfo.teachingRoles ? 'Yes' : 'No')}
        </div>
      ))}

      {/* Licensing Information */}
      {renderSummarySection('Licensing & Certifications', (
        <div>
          {renderKeyValue('License Number', formData.licensingInfo.licenseNumber)}
          {renderKeyValue('License Country', formData.licensingInfo.licenseCountry)}
          {formData.licensingInfo.boardCertifications.length > 0 && 
           renderKeyValue('Board Certifications', formData.licensingInfo.boardCertifications.join(', '))}
        </div>
      ))}

      {/* Self-Assessment Summary */}
      {renderSummarySection('Self-Assessment Summary', (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Expertise Level:</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              {selfAssessmentData.selfDeclaredLevel}
            </span>
          </div>
          
          {selfAssessmentData.expertiseCancerTypes && (
            <div>
              <span className="font-medium text-gray-700 block mb-2">Cancer Expertise Areas:</span>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg text-sm">
                {selfAssessmentData.expertiseCancerTypes}
              </p>
            </div>
          )}
          
          {selfAssessmentData.frequentImagingTech && (
            <div>
              <span className="font-medium text-gray-700 block mb-2">Frequent Imaging Technologies:</span>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg text-sm">
                {selfAssessmentData.frequentImagingTech}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded-lg">
              <span className="font-medium text-blue-900 block">Disease Competencies</span>
              <span className="text-blue-700">
                {Object.keys(selfAssessmentData.diseaseCompetencies).length} areas assessed
              </span>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <span className="font-medium text-green-900 block">Imaging Technologies</span>
              <span className="text-green-700">
                {Object.keys(selfAssessmentData.imagingTechnologies).length} technologies assessed
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Compliance Status */}
      {renderSummarySection('Compliance Agreements', (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'backgroundCheckConsent', label: 'Background Check' },
            { key: 'dataProcessingConsent', label: 'Data Processing' },
            { key: 'communicationConsent', label: 'Communication' },
            { key: 'qualityAssuranceConsent', label: 'Quality Assurance' },
            { key: 'intellectualPropertyConsent', label: 'Intellectual Property' }
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {formData.compliance[key as keyof typeof formData.compliance] ? (
                  <div className="bg-green-100 p-1 rounded-full">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="bg-red-100 p-1 rounded-full">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
              </div>
              <span className="text-gray-900">{label}</span>
            </div>
          ))}
        </div>
      ))}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h4 className="font-semibold text-red-900 mb-2">Submission Error</h4>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Final Submission Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold text-yellow-900 mb-2">Final Submission</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Your application will be submitted to our professional recruitment service</li>
              <li>• An admin review workflow will be automatically initiated</li>
              <li>• You will receive email confirmation and status updates</li>
              <li>• A generated CV will be created from your provided information</li>
              <li>• All compliance agreements will be recorded for regulatory purposes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onPrev}
          disabled={isSubmitting}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back to Self-Assessment
        </button>
        
        <button
          type="button"
          onClick={handleFinalSubmission}
          disabled={isSubmitting}
          className={`px-8 py-3 rounded-lg font-medium transition-colors ${
            isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-3">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting Application...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Submit Application
            </span>
          )}
        </button>
      </div>
    </div>
  );
}