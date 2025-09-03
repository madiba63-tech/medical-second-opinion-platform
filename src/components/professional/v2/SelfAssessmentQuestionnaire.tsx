'use client';

import { useState } from 'react';
import { 
  SelfAssessmentData,
  SelfDeclaredLevel,
  DISEASE_DIAGNOSIS_QUESTIONS,
  IMAGING_TECHNOLOGY_QUESTIONS,
  OVERALL_ASSESSMENT_QUESTIONS,
  COMPETENCY_RATING_SCALE,
  EXPERTISE_LEVEL_DESCRIPTIONS
} from '@/types/dual-path-recruitment';

interface SelfAssessmentQuestionnaireProps {
  candidateId: string;
  onComplete: (assessmentData: SelfAssessmentData) => void;
  onPrev: () => void;
  initialData?: Partial<SelfAssessmentData>;
}

export default function SelfAssessmentQuestionnaire({
  candidateId,
  onComplete,
  onPrev,
  initialData
}: SelfAssessmentQuestionnaireProps) {
  
  // State for disease competencies (0-5 ratings)
  const [diseaseCompetencies, setDiseaseCompetencies] = useState<Record<string, number>>(
    initialData?.diseaseCompetencies || {}
  );

  // State for imaging technology competencies (0-5 ratings)
  const [imagingTechnologies, setImagingTechnologies] = useState<Record<string, number>>(
    initialData?.imagingTechnologies || {}
  );

  // State for free-text responses
  const [expertiseCancerTypes, setExpertiseCancerTypes] = useState(
    initialData?.expertiseCancerTypes || ''
  );
  const [frequentImagingTech, setFrequentImagingTech] = useState(
    initialData?.frequentImagingTech || ''
  );

  // State for self-declared expertise level
  const [selfDeclaredLevel, setSelfDeclaredLevel] = useState<SelfDeclaredLevel | ''>( 
    initialData?.selfDeclaredLevel || ''
  );

  const [additionalNotes, setAdditionalNotes] = useState(
    initialData?.additionalNotes || ''
  );

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Handle rating change for disease or imaging competencies
   */
  const handleRatingChange = (section: 'disease' | 'imaging', key: string, value: number) => {
    if (section === 'disease') {
      setDiseaseCompetencies(prev => ({ ...prev, [key]: value }));
    } else {
      setImagingTechnologies(prev => ({ ...prev, [key]: value }));
    }
    
    // Clear any existing error for this field
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  /**
   * Validate the form
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Check that all disease competency questions are answered
    DISEASE_DIAGNOSIS_QUESTIONS.forEach(question => {
      if (question.required && !(question.key in diseaseCompetencies)) {
        newErrors[question.key] = 'Please rate your competency for this disease area';
      }
    });

    // Check that all imaging technology questions are answered
    IMAGING_TECHNOLOGY_QUESTIONS.forEach(question => {
      if (question.required && !(question.key in imagingTechnologies)) {
        newErrors[question.key] = 'Please rate your familiarity with this technology';
      }
    });

    // Check that expertise level is selected
    if (!selfDeclaredLevel) {
      newErrors.selfDeclaredLevel = 'Please select your expertise level';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = () => {
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.error-field');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const assessmentData: SelfAssessmentData = {
      diseaseCompetencies,
      imagingTechnologies,
      expertiseCancerTypes: expertiseCancerTypes.trim() || undefined,
      frequentImagingTech: frequentImagingTech.trim() || undefined,
      selfDeclaredLevel: selfDeclaredLevel as SelfDeclaredLevel,
      additionalNotes: additionalNotes.trim() || undefined
    };

    onComplete(assessmentData);
  };

  /**
   * Render rating buttons for a question
   */
  const renderRatingButtons = (
    questionKey: string, 
    currentValue: number | undefined, 
    section: 'disease' | 'imaging'
  ) => {
    return (
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4, 5].map(rating => (
          <button
            key={rating}
            type="button"
            onClick={() => handleRatingChange(section, questionKey, rating)}
            className={`
              w-10 h-10 rounded-lg border-2 font-semibold text-sm transition-all
              ${currentValue === rating
                ? 'border-blue-500 bg-blue-500 text-white shadow-lg'
                : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
              }
            `}
            title={`${rating} - ${COMPETENCY_RATING_SCALE[rating as keyof typeof COMPETENCY_RATING_SCALE]}`}
          >
            {rating}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Self-Assessment</h2>
        <p className="text-gray-600">
          Please provide an honest assessment of your competencies across different oncology areas.
          This information will be used for quality assurance and case matching.
        </p>
      </div>

      {/* Rating Scale Reference */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-3">Rating Scale Reference:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          {Object.entries(COMPETENCY_RATING_SCALE).map(([score, description]) => (
            <div key={score} className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-blue-600 text-white text-xs flex items-center justify-center font-semibold">
                {score}
              </span>
              <span className="text-blue-800">{description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section A: Disease-Specific Diagnostic Competence */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Section A — Disease-Specific Diagnostic Competence
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Please rate your ability to diagnose the following oncological diseases:
        </p>
        
        <div className="space-y-4">
          {DISEASE_DIAGNOSIS_QUESTIONS.map(question => (
            <div 
              key={question.key}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border ${
                errors[question.key] ? 'border-red-300 bg-red-50 error-field' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex-1">
                <label className="block font-medium text-gray-900">
                  {question.text}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {errors[question.key] && (
                  <p className="text-red-600 text-sm mt-1">{errors[question.key]}</p>
                )}
              </div>
              
              <div className="flex-shrink-0">
                {renderRatingButtons(question.key, diseaseCompetencies[question.key], 'disease')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section B: Imaging & Diagnostic Technology Familiarity */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Section B — Imaging & Diagnostic Technology Familiarity
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Please rate your familiarity with the following diagnostic and imaging technologies:
        </p>
        
        <div className="space-y-4">
          {IMAGING_TECHNOLOGY_QUESTIONS.map(question => (
            <div 
              key={question.key}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border ${
                errors[question.key] ? 'border-red-300 bg-red-50 error-field' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex-1">
                <label className="block font-medium text-gray-900">
                  {question.text}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {errors[question.key] && (
                  <p className="text-red-600 text-sm mt-1">{errors[question.key]}</p>
                )}
              </div>
              
              <div className="flex-shrink-0">
                {renderRatingButtons(question.key, imagingTechnologies[question.key], 'imaging')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section C: Overall Self-Assessment */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Section C — Overall Self-Assessment
        </h3>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="expertiseCancerTypes" className="block font-medium text-gray-900 mb-2">
              Which cancer types do you consider yourself an expert in?
            </label>
            <textarea
              id="expertiseCancerTypes"
              value={expertiseCancerTypes}
              onChange={(e) => setExpertiseCancerTypes(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Breast cancer, Lung cancer, Hematologic malignancies..."
            />
          </div>

          <div>
            <label htmlFor="frequentImagingTech" className="block font-medium text-gray-900 mb-2">
              Which imaging technologies do you use most frequently in your practice?
            </label>
            <textarea
              id="frequentImagingTech"
              value={frequentImagingTech}
              onChange={(e) => setFrequentImagingTech(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., CT scans, MRI, PET-CT, Digital pathology..."
            />
          </div>
        </div>
      </div>

      {/* Expertise Level Selection */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Professional Expertise Level
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Please select the expertise level that best describes your current professional standing:
        </p>

        <div className={`space-y-4 ${errors.selfDeclaredLevel ? 'error-field' : ''}`}>
          {Object.entries(EXPERTISE_LEVEL_DESCRIPTIONS).map(([level, info]) => (
            <label
              key={level}
              className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selfDeclaredLevel === level
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="selfDeclaredLevel"
                  value={level}
                  checked={selfDeclaredLevel === level}
                  onChange={(e) => setSelfDeclaredLevel(e.target.value as SelfDeclaredLevel)}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                  <p className="text-sm text-gray-600">{info.description}</p>
                </div>
              </div>
            </label>
          ))}
        </div>

        {errors.selfDeclaredLevel && (
          <p className="text-red-600 text-sm mt-2">{errors.selfDeclaredLevel}</p>
        )}
      </div>

      {/* Additional Notes */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Additional Notes (Optional)
        </h3>
        <textarea
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Any additional information about your expertise, special interests, or qualifications..."
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Back to Compliance
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Continue to Review
        </button>
      </div>
    </div>
  );
}