'use client';

import { useState, useEffect } from 'react';
import { 
  AIExtractedCVData, 
  ApplicationFormData,
  AIExtractedCVDataSchema 
} from '@/types/dual-path-recruitment';

interface AIDataReviewComponentProps {
  candidateId: string;
  applicationNumber: string;
  extractedData: AIExtractedCVData;
  onComplete: (reviewedData: ApplicationFormData) => void;
  onPrev: () => void;
}

interface EditTracking {
  fieldPath: string;
  originalValue: any;
  editedValue: any;
  timestamp: Date;
}

export default function AIDataReviewComponent({
  candidateId,
  applicationNumber,
  extractedData,
  onComplete,
  onPrev
}: AIDataReviewComponentProps) {
  // State for editable form data
  const [formData, setFormData] = useState<ApplicationFormData>(() => 
    convertAIDataToFormData(extractedData)
  );
  
  // Track user edits for analytics
  const [edits, setEdits] = useState<EditTracking[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Convert AI extracted data to form data structure
   */
  function convertAIDataToFormData(aiData: AIExtractedCVData): ApplicationFormData {
    return {
      // Personal Information
      personalInfo: {
        firstName: aiData.personalInfo?.firstName || '',
        middleName: aiData.personalInfo?.middleName || '',
        lastName: aiData.personalInfo?.lastName || '',
        email: aiData.personalInfo?.email || '',
        phone: aiData.personalInfo?.phone || '',
        nationality: aiData.personalInfo?.nationality || '',
        dateOfBirth: undefined, // Not extracted by AI
        governmentIdType: undefined, // Not required for AI path
        governmentIdNumber: undefined // Not required for AI path
      },
      
      // Professional Information
      professionalInfo: {
        currentAffiliation: aiData.professional?.currentAffiliation || '',
        currentPosition: '', // May need manual entry
        subspecialties: aiData.professional?.subspecialties || [],
        yearsPractice: aiData.professional?.yearsPractice || 0,
        publications: aiData.professional?.publications || 0,
        clinicalTrials: aiData.professional?.clinicalTrials || false,
        teachingRoles: aiData.professional?.teachingRoles || false,
        primarySpecialty: '', // May need manual entry
        workPhone: '', // May need manual entry
        workEmail: aiData.personalInfo?.email || '' // Use personal email as fallback
      },

      // Medical Education
      medicalEducation: {
        medicalSchool: aiData.education?.medicalDegree?.institution || '',
        graduationYear: aiData.education?.medicalDegree?.year || '',
        degree: aiData.education?.medicalDegree?.degree || '',
        residencyProgram: aiData.education?.residency?.institution || '',
        residencySpecialty: aiData.education?.residency?.specialty || '',
        residencyStartYear: aiData.education?.residency?.startYear || '',
        residencyEndYear: aiData.education?.residency?.endYear || '',
        fellowshipProgram: aiData.education?.fellowship?.institution || '',
        fellowshipSpecialty: aiData.education?.fellowship?.specialty || '',
        fellowshipYear: aiData.education?.fellowship?.year || ''
      },

      // Licensing Information
      licensingInfo: {
        licenseNumber: aiData.licensing?.licenseNumber || '',
        licenseCountry: aiData.licensing?.licenseCountry || '',
        licenseExpirationDate: undefined, // Needs manual entry
        boardCertifications: aiData.licensing?.boardCertifications || [],
        malpracticeInsurance: undefined // Needs manual entry
      },

      // Documents - will be empty for AI path initially
      documents: {
        cv: undefined,
        medicalLicense: undefined,
        boardCertifications: [],
        malpracticeInsurance: undefined,
        governmentId: undefined,
        additionalDocuments: []
      },

      // Compliance - needs manual entry
      compliance: {
        backgroundCheckConsent: false,
        dataProcessingConsent: false,
        communicationConsent: false,
        qualityAssuranceConsent: false,
        intellectualPropertyConsent: false
      }
    };
  }

  /**
   * Handle field value changes and track edits
   */
  const handleFieldChange = (fieldPath: string, newValue: any, originalValue: any) => {
    // Update form data
    setFormData(prev => {
      const newData = { ...prev };
      const pathParts = fieldPath.split('.');
      let current: any = newData;
      
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) {
          current[pathParts[i]] = {};
        }
        current = current[pathParts[i]];
      }
      
      current[pathParts[pathParts.length - 1]] = newValue;
      return newData;
    });

    // Track edit if value changed from original
    if (newValue !== originalValue && originalValue !== undefined && originalValue !== '') {
      const newEdit: EditTracking = {
        fieldPath,
        originalValue,
        editedValue: newValue,
        timestamp: new Date()
      };
      
      setEdits(prev => {
        const filtered = prev.filter(edit => edit.fieldPath !== fieldPath);
        return [...filtered, newEdit];
      });
    }

    // Clear any validation errors for this field
    if (errors[fieldPath]) {
      setErrors(prev => ({ ...prev, [fieldPath]: '' }));
    }
  };

  /**
   * Render confidence indicator
   */
  const renderConfidenceIndicator = (confidence: number) => {
    const getConfidenceColor = (conf: number) => {
      if (conf >= 0.9) return 'bg-green-500';
      if (conf >= 0.7) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    const getConfidenceText = (conf: number) => {
      if (conf >= 0.9) return 'High Confidence';
      if (conf >= 0.7) return 'Medium Confidence';
      return 'Low Confidence';
    };

    return (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${getConfidenceColor(confidence)}`} />
        <span className="text-xs text-gray-600">
          {getConfidenceText(confidence)} ({Math.round(confidence * 100)}%)
        </span>
      </div>
    );
  };

  /**
   * Render input field with confidence indicator
   */
  const renderInputField = (
    label: string,
    fieldPath: string,
    value: string,
    originalValue: string | undefined,
    confidence: number,
    type: 'text' | 'email' | 'tel' | 'number' = 'text',
    required: boolean = false
  ) => {
    const hasBeenEdited = edits.some(edit => edit.fieldPath === fieldPath);
    
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor={fieldPath} className="block font-medium text-gray-900">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {originalValue && renderConfidenceIndicator(confidence)}
        </div>
        
        <input
          type={type}
          id={fieldPath}
          value={value || ''}
          onChange={(e) => handleFieldChange(fieldPath, e.target.value, originalValue)}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            hasBeenEdited ? 'border-blue-300 bg-blue-50' : 
            originalValue ? 'border-green-300 bg-green-50' : 'border-gray-300'
          } ${errors[fieldPath] ? 'border-red-300 bg-red-50' : ''}`}
          placeholder={originalValue ? `AI suggested: ${originalValue}` : `Enter ${label.toLowerCase()}`}
        />
        
        {hasBeenEdited && (
          <p className="text-xs text-blue-600 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edited by you
          </p>
        )}
        
        {errors[fieldPath] && (
          <p className="text-red-600 text-sm">{errors[fieldPath]}</p>
        )}
      </div>
    );
  };

  /**
   * Validate form data before submission
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.personalInfo.firstName?.trim()) {
      newErrors['personalInfo.firstName'] = 'First name is required';
    }
    if (!formData.personalInfo.lastName?.trim()) {
      newErrors['personalInfo.lastName'] = 'Last name is required';
    }
    if (!formData.personalInfo.email?.trim()) {
      newErrors['personalInfo.email'] = 'Email is required';
    }
    if (!formData.medicalEducation.medicalSchool?.trim()) {
      newErrors['medicalEducation.medicalSchool'] = 'Medical school is required';
    }
    if (!formData.professionalInfo.currentAffiliation?.trim()) {
      newErrors['professionalInfo.currentAffiliation'] = 'Current affiliation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.border-red-300');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Log analytics about user edits
      if (edits.length > 0) {
        console.log(`User made ${edits.length} edits to AI-extracted data:`, edits);
      }

      await onComplete(formData);
    } catch (error) {
      console.error('Error submitting reviewed data:', error);
      setErrors({ submit: 'Failed to save your changes. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review AI-Extracted Information</h2>
        <p className="text-gray-600 mb-4">
          Our AI has extracted the following information from your CV. Please review and edit any 
          information that needs correction. Fields with high confidence are highlighted in green.
        </p>
        
        {/* Summary Stats */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Overall Confidence: {Math.round(extractedData.confidence.overall * 100)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edits Made: {edits.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInputField(
            'First Name',
            'personalInfo.firstName',
            formData.personalInfo.firstName,
            extractedData.personalInfo?.firstName,
            extractedData.confidence.personal,
            'text',
            true
          )}
          
          {renderInputField(
            'Middle Name',
            'personalInfo.middleName',
            formData.personalInfo.middleName || '',
            extractedData.personalInfo?.middleName,
            extractedData.confidence.personal
          )}
          
          {renderInputField(
            'Last Name',
            'personalInfo.lastName',
            formData.personalInfo.lastName,
            extractedData.personalInfo?.lastName,
            extractedData.confidence.personal,
            'text',
            true
          )}
          
          {renderInputField(
            'Email Address',
            'personalInfo.email',
            formData.personalInfo.email,
            extractedData.personalInfo?.email,
            extractedData.confidence.personal,
            'email',
            true
          )}
          
          {renderInputField(
            'Phone Number',
            'personalInfo.phone',
            formData.personalInfo.phone || '',
            extractedData.personalInfo?.phone,
            extractedData.confidence.personal,
            'tel'
          )}
          
          {renderInputField(
            'Nationality',
            'personalInfo.nationality',
            formData.personalInfo.nationality || '',
            extractedData.personalInfo?.nationality,
            extractedData.confidence.personal
          )}
        </div>
      </div>

      {/* Medical Education */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Medical Education</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInputField(
              'Medical School',
              'medicalEducation.medicalSchool',
              formData.medicalEducation.medicalSchool,
              extractedData.education?.medicalDegree?.institution,
              extractedData.confidence.education,
              'text',
              true
            )}
            
            {renderInputField(
              'Graduation Year',
              'medicalEducation.graduationYear',
              formData.medicalEducation.graduationYear || '',
              extractedData.education?.medicalDegree?.year,
              extractedData.confidence.education
            )}
            
            {renderInputField(
              'Degree Type',
              'medicalEducation.degree',
              formData.medicalEducation.degree || '',
              extractedData.education?.medicalDegree?.degree,
              extractedData.confidence.education
            )}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Residency Training</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderInputField(
                'Residency Program',
                'medicalEducation.residencyProgram',
                formData.medicalEducation.residencyProgram || '',
                extractedData.education?.residency?.institution,
                extractedData.confidence.education
              )}
              
              {renderInputField(
                'Residency Specialty',
                'medicalEducation.residencySpecialty',
                formData.medicalEducation.residencySpecialty || '',
                extractedData.education?.residency?.specialty,
                extractedData.confidence.education
              )}
              
              {renderInputField(
                'Start Year',
                'medicalEducation.residencyStartYear',
                formData.medicalEducation.residencyStartYear || '',
                extractedData.education?.residency?.startYear,
                extractedData.confidence.education
              )}
              
              {renderInputField(
                'End Year',
                'medicalEducation.residencyEndYear',
                formData.medicalEducation.residencyEndYear || '',
                extractedData.education?.residency?.endYear,
                extractedData.confidence.education
              )}
            </div>
          </div>

          {(extractedData.education?.fellowship?.institution || 
            extractedData.education?.fellowship?.specialty || 
            extractedData.education?.fellowship?.year) && (
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Fellowship Training</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderInputField(
                  'Fellowship Program',
                  'medicalEducation.fellowshipProgram',
                  formData.medicalEducation.fellowshipProgram || '',
                  extractedData.education?.fellowship?.institution,
                  extractedData.confidence.education
                )}
                
                {renderInputField(
                  'Fellowship Specialty',
                  'medicalEducation.fellowshipSpecialty',
                  formData.medicalEducation.fellowshipSpecialty || '',
                  extractedData.education?.fellowship?.specialty,
                  extractedData.confidence.education
                )}
                
                {renderInputField(
                  'Fellowship Year',
                  'medicalEducation.fellowshipYear',
                  formData.medicalEducation.fellowshipYear || '',
                  extractedData.education?.fellowship?.year,
                  extractedData.confidence.education
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Professional Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Professional Experience</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInputField(
            'Current Affiliation',
            'professionalInfo.currentAffiliation',
            formData.professionalInfo.currentAffiliation,
            extractedData.professional?.currentAffiliation,
            extractedData.confidence.professional,
            'text',
            true
          )}
          
          {renderInputField(
            'Years in Practice',
            'professionalInfo.yearsPractice',
            formData.professionalInfo.yearsPractice?.toString() || '',
            extractedData.professional?.yearsPractice?.toString(),
            extractedData.confidence.professional,
            'number'
          )}
          
          {renderInputField(
            'Number of Publications',
            'professionalInfo.publications',
            formData.professionalInfo.publications?.toString() || '',
            extractedData.professional?.publications?.toString(),
            extractedData.confidence.professional,
            'number'
          )}
        </div>

        {/* Subspecialties */}
        {extractedData.professional?.subspecialties && 
         extractedData.professional.subspecialties.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">Subspecialties (From CV)</h4>
            <div className="flex flex-wrap gap-2">
              {extractedData.professional.subspecialties.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Boolean fields */}
        <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="clinicalTrials"
              checked={formData.professionalInfo.clinicalTrials || false}
              onChange={(e) => handleFieldChange(
                'professionalInfo.clinicalTrials',
                e.target.checked,
                extractedData.professional?.clinicalTrials
              )}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="clinicalTrials" className="text-gray-900">
              Involved in clinical trials
            </label>
            {extractedData.professional?.clinicalTrials !== undefined && 
             renderConfidenceIndicator(extractedData.confidence.professional)}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="teachingRoles"
              checked={formData.professionalInfo.teachingRoles || false}
              onChange={(e) => handleFieldChange(
                'professionalInfo.teachingRoles',
                e.target.checked,
                extractedData.professional?.teachingRoles
              )}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="teachingRoles" className="text-gray-900">
              Has academic/teaching roles
            </label>
            {extractedData.professional?.teachingRoles !== undefined && 
             renderConfidenceIndicator(extractedData.confidence.professional)}
          </div>
        </div>
      </div>

      {/* Licensing Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Licensing & Certifications</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInputField(
            'License Number',
            'licensingInfo.licenseNumber',
            formData.licensingInfo.licenseNumber || '',
            extractedData.licensing?.licenseNumber,
            extractedData.confidence.licensing
          )}
          
          {renderInputField(
            'License Country',
            'licensingInfo.licenseCountry',
            formData.licensingInfo.licenseCountry || '',
            extractedData.licensing?.licenseCountry,
            extractedData.confidence.licensing
          )}
        </div>

        {/* Board Certifications */}
        {extractedData.licensing?.boardCertifications && 
         extractedData.licensing.boardCertifications.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">Board Certifications (From CV)</h4>
            <div className="space-y-2">
              {extractedData.licensing.boardCertifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between"
                >
                  <span className="text-green-800">{cert}</span>
                  {renderConfidenceIndicator(extractedData.confidence.licensing)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Important Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold text-yellow-900 mb-2">Important Notes</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Fields highlighted in <span className="bg-green-100 px-1 rounded">green</span> were extracted with high confidence</li>
              <li>• Fields highlighted in <span className="bg-blue-100 px-1 rounded">blue</span> have been edited by you</li>
              <li>• You'll complete compliance agreements and self-assessment in the next steps</li>
              <li>• Your original CV will be attached to your application automatically</li>
            </ul>
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
          Back to Path Selection
        </button>
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving Changes...
            </span>
          ) : (
            'Continue to Compliance'
          )}
        </button>
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="text-center">
          <p className="text-red-600 text-sm">{errors.submit}</p>
        </div>
      )}
    </div>
  );
}