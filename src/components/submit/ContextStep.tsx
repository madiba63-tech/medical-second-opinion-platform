'use client';

import { useState } from 'react';

interface ContextStepProps {
  context: any;
  onUpdate: (context: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ETHNICITIES = [
  'White', 'Black or African American', 'Hispanic or Latino', 
  'Asian', 'Native American', 'Pacific Islander', 'Other'
];

const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'];

const DISEASE_TYPES = [
  'Lung Cancer', 'Breast Cancer', 'Prostate Cancer', 'Colorectal Cancer',
  'Melanoma', 'Leukemia', 'Lymphoma', 'Brain Cancer', 'Ovarian Cancer', 'Other'
];

const FAMILY_HISTORY_OPTIONS = [
  'Parents', 'Siblings', 'Children', 'Grandparents', 'Aunts/Uncles', 'None'
];

export default function ContextStep({ context, onUpdate, onNext, onPrev }: ContextStepProps) {
  const [formData, setFormData] = useState({
    ethnicity: context.ethnicity || '',
    gender: context.gender || '',
    diseaseType: context.diseaseType || '',
    isFirstOccurrence: context.isFirstOccurrence ?? null,
    geneticFamilyHistory: context.geneticFamilyHistory || [],
  });

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleFamilyHistoryChange = (option: string) => {
    const newHistory = formData.geneticFamilyHistory.includes(option)
      ? formData.geneticFamilyHistory.filter(item => item !== option)
      : [...formData.geneticFamilyHistory, option];
    
    handleChange('geneticFamilyHistory', newHistory);
  };

  const canProceed = formData.diseaseType && formData.isFirstOccurrence !== null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Medical Context</h2>
        <p className="text-gray-600">
          Help us understand your medical background for better analysis.
        </p>
      </div>

      <div className="space-y-6">
        {/* Ethnicity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ethnicity
          </label>
          <select
            value={formData.ethnicity}
            onChange={(e) => handleChange('ethnicity', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select ethnicity</option>
            {ETHNICITIES.map(ethnicity => (
              <option key={ethnicity} value={ethnicity}>{ethnicity}</option>
            ))}
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select gender</option>
            {GENDERS.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>

        {/* Disease Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Disease Type <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.diseaseType}
            onChange={(e) => handleChange('diseaseType', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select disease type</option>
            {DISEASE_TYPES.map(disease => (
              <option key={disease} value={disease}>{disease}</option>
            ))}
          </select>
        </div>

        {/* First Occurrence */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Is this your first occurrence? <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="isFirstOccurrence"
                value="true"
                checked={formData.isFirstOccurrence === true}
                onChange={() => handleChange('isFirstOccurrence', true)}
                className="mr-3"
              />
              <span>Yes, this is my first occurrence</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="isFirstOccurrence"
                value="false"
                checked={formData.isFirstOccurrence === false}
                onChange={() => handleChange('isFirstOccurrence', false)}
                className="mr-3"
              />
              <span>No, I have had this before</span>
            </label>
          </div>
        </div>

        {/* Genetic Family History */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genetic Family History
          </label>
          <p className="text-sm text-gray-500 mb-3">
            Select all family members who have had similar conditions:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {FAMILY_HISTORY_OPTIONS.map(option => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.geneticFamilyHistory.includes(option)}
                  onChange={() => handleFamilyHistoryChange(option)}
                  className="mr-3"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
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
