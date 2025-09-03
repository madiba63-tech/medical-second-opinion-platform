'use client';

import { useState } from 'react';
import { ApplicationFormData } from '@/types/dual-path-recruitment';

interface ComplianceAgreementComponentProps {
  candidateId: string;
  applicationNumber: string;
  formData: ApplicationFormData;
  onComplete: (complianceData: ApplicationFormData['compliance']) => void;
  onPrev: () => void;
  initialData?: ApplicationFormData['compliance'];
}

export default function ComplianceAgreementComponent({
  candidateId,
  applicationNumber,
  formData,
  onComplete,
  onPrev,
  initialData
}: ComplianceAgreementComponentProps) {
  
  const [compliance, setCompliance] = useState<ApplicationFormData['compliance']>(
    initialData || {
      backgroundCheckConsent: false,
      dataProcessingConsent: false,
      communicationConsent: false,
      qualityAssuranceConsent: false,
      intellectualPropertyConsent: false
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Handle checkbox changes
   */
  const handleConsentChange = (field: keyof ApplicationFormData['compliance'], checked: boolean) => {
    setCompliance(prev => ({ ...prev, [field]: checked }));
    
    // Clear error when user checks the box
    if (checked && errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  /**
   * Validate all required consents
   */
  const validateCompliance = (): boolean => {
    const newErrors: Record<string, string> = {};

    // All consents are required
    if (!compliance.backgroundCheckConsent) {
      newErrors.backgroundCheckConsent = 'Background check consent is required to proceed';
    }
    if (!compliance.dataProcessingConsent) {
      newErrors.dataProcessingConsent = 'Data processing consent is required to proceed';
    }
    if (!compliance.communicationConsent) {
      newErrors.communicationConsent = 'Communication consent is required to proceed';
    }
    if (!compliance.qualityAssuranceConsent) {
      newErrors.qualityAssuranceConsent = 'Quality assurance consent is required to proceed';
    }
    if (!compliance.intellectualPropertyConsent) {
      newErrors.intellectualPropertyConsent = 'Intellectual property consent is required to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = () => {
    if (!validateCompliance()) {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.border-red-300');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    onComplete(compliance);
  };

  /**
   * Render consent checkbox with detailed description
   */
  const renderConsentCheckbox = (
    field: keyof ApplicationFormData['compliance'],
    title: string,
    description: string,
    details: string[]
  ) => {
    const hasError = !!errors[field];
    
    return (
      <div className={`border-2 rounded-lg p-6 transition-all ${
        compliance[field] 
          ? 'border-green-200 bg-green-50' 
          : hasError 
            ? 'border-red-300 bg-red-50' 
            : 'border-gray-200 bg-white hover:border-gray-300'
      }`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 pt-1">
            <input
              type="checkbox"
              id={field}
              checked={compliance[field]}
              onChange={(e) => handleConsentChange(field, e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
          </div>
          
          <div className="flex-1">
            <label htmlFor={field} className="block">
              <h4 className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer">
                {title} <span className="text-red-500">*</span>
              </h4>
              <p className="text-gray-700 mb-3 cursor-pointer">
                {description}
              </p>
              
              <ul className="text-sm text-gray-600 space-y-1 pl-4">
                {details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1.5">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </label>
          </div>
          
          {compliance[field] && (
            <div className="flex-shrink-0">
              <div className="bg-green-100 p-2 rounded-full">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          )}
        </div>
        
        {hasError && (
          <div className="mt-3 pl-9">
            <p className="text-red-600 text-sm font-medium">{errors[field]}</p>
          </div>
        )}
      </div>
    );
  };

  const allConsentsGiven = Object.values(compliance).every(consent => consent === true);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Compliance & Consent Agreements</h2>
        <p className="text-gray-600">
          To proceed with your professional application, please review and provide consent for 
          the following requirements. All agreements are mandatory for participation in the 
          Medical Second Opinion Platform.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${
              allConsentsGiven 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {Object.values(compliance).filter(consent => consent).length}/5
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900">Consent Progress</h3>
            <p className="text-sm text-blue-700">
              {Object.values(compliance).filter(consent => consent).length} of 5 required agreements completed
            </p>
          </div>
        </div>
      </div>

      {/* Consent Agreements */}
      <div className="space-y-6">
        
        {/* Background Check Consent */}
        {renderConsentCheckbox(
          'backgroundCheckConsent',
          'Background Check Authorization',
          'I authorize the Medical Second Opinion Platform to conduct necessary background verification to ensure the safety and integrity of our professional network.',
          [
            'Authorization to verify medical credentials and licensing status',
            'Professional reference checks with previous employers or colleagues',
            'Academic credential verification with educational institutions',
            'Disciplinary action checks with relevant medical boards',
            'All checks will be conducted in compliance with applicable privacy laws'
          ]
        )}

        {/* Data Processing Consent */}
        {renderConsentCheckbox(
          'dataProcessingConsent',
          'Data Processing & Privacy Agreement',
          'I consent to the collection, processing, and storage of my personal and professional information as outlined in our Privacy Policy.',
          [
            'Processing of application data for evaluation and matching purposes',
            'Secure storage of professional credentials and documentation',
            'Use of professional information for case assignment and quality assurance',
            'Communication regarding application status and platform updates',
            'Data retention in accordance with regulatory requirements and privacy policy'
          ]
        )}

        {/* Communication Consent */}
        {renderConsentCheckbox(
          'communicationConsent',
          'Communication & Notification Agreement',
          'I agree to receive communications from the platform regarding my application, case assignments, and important platform updates.',
          [
            'Application status updates and administrative communications',
            'Case assignment notifications and consultation requests',
            'Platform policy updates and regulatory communications',
            'Quality assurance surveys and feedback requests',
            'Ability to opt-out of non-essential communications while maintaining required notifications'
          ]
        )}

        {/* Quality Assurance Consent */}
        {renderConsentCheckbox(
          'qualityAssuranceConsent',
          'Quality Assurance & Review Agreement',
          'I agree to participate in quality assurance processes and peer review activities as part of maintaining platform standards.',
          [
            'Participation in case review and quality assurance processes',
            'Submission to peer review of consultation reports and recommendations',
            'Compliance with platform clinical guidelines and best practices',
            'Contribution to continuous improvement of consultation quality',
            'Participation in outcome tracking and quality metrics collection'
          ]
        )}

        {/* Intellectual Property Consent */}
        {renderConsentCheckbox(
          'intellectualPropertyConsent',
          'Intellectual Property & Professional Conduct Agreement',
          'I acknowledge and agree to the intellectual property terms and professional conduct standards of the platform.',
          [
            'Respect for patient confidentiality and HIPAA compliance requirements',
            'Acknowledgment that consultation reports may be used for quality improvement',
            'Agreement to maintain professional standards and ethical conduct',
            'Commitment to provide objective, evidence-based medical opinions',
            'Understanding of platform liability limitations and professional responsibility'
          ]
        )}
      </div>

      {/* Legal Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Legal Information</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                By providing these consents, you are entering into a professional agreement with 
                the Medical Second Opinion Platform. These agreements are legally binding and 
                necessary for your participation in our professional network.
              </p>
              <p>
                For detailed information about our data practices, please review our{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>{' '}
                and <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>.
              </p>
              <p>
                If you have questions about these agreements, please contact our compliance 
                team at <a href="mailto:compliance@medical-second-opinion.com" className="text-blue-600 hover:underline">
                  compliance@medical-second-opinion.com
                </a> before proceeding.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Back to Review
        </button>
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!allConsentsGiven}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            allConsentsGiven
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {allConsentsGiven ? 'Continue to Self-Assessment' : 'Complete All Agreements to Continue'}
        </button>
      </div>
    </div>
  );
}