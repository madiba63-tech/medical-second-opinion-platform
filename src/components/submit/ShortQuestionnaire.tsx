'use client';

import { useState } from 'react';

interface ShortQuestionnaireProps {
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  initialData?: any;
}

const CANCER_TYPES = [
  'Lung Cancer', 'Breast Cancer', 'Prostate Cancer', 'Colorectal Cancer',
  'Melanoma', 'Leukemia', 'Lymphoma', 'Brain Cancer', 'Ovarian Cancer', 
  'Pancreatic Cancer', 'Kidney Cancer', 'Liver Cancer', 'Bladder Cancer',
  'Thyroid Cancer', 'Other', "Don't know / Prefer not to tell"
];

const CANCER_STAGES = [
  'Stage I (Early stage)', 
  'Stage II (Local spread)', 
  'Stage III (Regional spread)', 
  'Stage IV (Advanced/Metastatic)', 
  'Unknown',
  "Don't know / Prefer not to tell"
];

const TREATMENT_TYPES = [
  'Surgery', 
  'Chemotherapy', 
  'Radiation', 
  'Targeted therapy', 
  'Immunotherapy', 
  'Hormonal therapy',
  'None so far',
  "Don't know / Prefer not to tell"
];

const SECOND_OPINION_GOALS = [
  'Confirm my diagnosis', 
  'Explore other treatment options', 
  'Clarify my prognosis', 
  'Get a different perspective',
  'Explore clinical trial options',
  'Confirm treatment plan',
  'Other',
  "Don't know / Prefer not to tell"
];

export default function ShortQuestionnaire({ onUpdate, onNext, onPrev, initialData }: ShortQuestionnaireProps) {
  const [formData, setFormData] = useState({
    cancerType: initialData?.cancerType || '',
    cancerStage: initialData?.cancerStage || '',
    treatmentsReceived: initialData?.treatmentsReceived || [],
    secondOpinionGoal: initialData?.secondOpinionGoal || '',
    otherHealthConditions: initialData?.otherHealthConditions || '',
    hasOtherConditions: initialData?.hasOtherConditions || null,
    ...initialData
  });

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleTreatmentChange = (treatment: string) => {
    const treatments = formData.treatmentsReceived || [];
    
    // Handle "None so far" and "Don't know" as exclusive options
    if (treatment === 'None so far' || treatment === "Don't know / Prefer not to tell") {
      const newTreatments = treatments.includes(treatment) ? [] : [treatment];
      handleChange('treatmentsReceived', newTreatments);
    } else {
      // Remove "None so far" and "Don't know" if selecting actual treatments
      const filteredTreatments = treatments.filter(t => 
        t !== 'None so far' && t !== "Don't know / Prefer not to tell"
      );
      
      const newTreatments = filteredTreatments.includes(treatment)
        ? filteredTreatments.filter(t => t !== treatment)
        : [...filteredTreatments, treatment];
        
      handleChange('treatmentsReceived', newTreatments);
    }
  };

  const canProceed = formData.cancerType && formData.cancerStage && 
                    formData.secondOpinionGoal && formData.hasOtherConditions !== null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Short Medical Questionnaire</h2>
        <p className="text-gray-600">
          Please answer these focused questions about your cancer diagnosis and treatment goals.
        </p>
      </div>

      <div className="space-y-8">
        {/* Question 1: Cancer Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            1. What type of cancer were you diagnosed with? <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.cancerType}
            onChange={(e) => handleChange('cancerType', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select cancer type</option>
            {CANCER_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Question 2: Cancer Stage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            2. What stage were you told your cancer is? <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.cancerStage}
            onChange={(e) => handleChange('cancerStage', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select cancer stage</option>
            {CANCER_STAGES.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
        </div>

        {/* Question 3: Treatments Received */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            3. What treatments have you received so far? (Select all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TREATMENT_TYPES.map(treatment => (
              <label key={treatment} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.treatmentsReceived?.includes(treatment) || false}
                  onChange={() => handleTreatmentChange(treatment)}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{treatment}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 4: Second Opinion Goals */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            4. What is your main goal in seeking a second opinion? <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.secondOpinionGoal}
            onChange={(e) => handleChange('secondOpinionGoal', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select your main goal</option>
            {SECOND_OPINION_GOALS.map(goal => (
              <option key={goal} value={goal}>{goal}</option>
            ))}
          </select>
        </div>

        {/* Question 5: Other Health Conditions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            5. Do you have any other health conditions or are you taking any medications? <span className="text-red-500">*</span>
          </label>
          
          <div className="space-y-3 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="hasOtherConditions"
                value="yes"
                checked={formData.hasOtherConditions === true}
                onChange={() => handleChange('hasOtherConditions', true)}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="hasOtherConditions"
                value="no"
                checked={formData.hasOtherConditions === false}
                onChange={() => {
                  handleChange('hasOtherConditions', false);
                  handleChange('otherHealthConditions', '');
                }}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="hasOtherConditions"
                value="prefer-not-to-tell"
                checked={formData.hasOtherConditions === 'prefer-not-to-tell'}
                onChange={() => {
                  handleChange('hasOtherConditions', 'prefer-not-to-tell');
                  handleChange('otherHealthConditions', '');
                }}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Don't know / Prefer not to tell</span>
            </label>
          </div>

          {formData.hasOtherConditions === true && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Please briefly describe your other health conditions or medications:
              </label>
              <textarea
                value={formData.otherHealthConditions}
                onChange={(e) => handleChange('otherHealthConditions', e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., High blood pressure, diabetes, taking blood thinners..."
              />
            </div>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-green-800">Quick & Focused</h4>
            <p className="text-sm text-green-700">
              You're providing essential information for an effective second opinion. 
              Our experts will have the key details needed to review your case.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          onClick={onPrev}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Back to Upload
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            canProceed
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Your Information
        </button>
      </div>
    </div>
  );
}