"use client";

import { useState } from "react";
import { MedicalContext, ETHNICITIES, GENDERS, DISEASE_TYPES, FAMILY_HISTORY_OPTIONS } from "@/types/form";

interface Props {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function MedicalContextForm({ formData, updateFormData, nextStep, prevStep }: Props) {
  const [context, setContext] = useState<MedicalContext>(formData.contextInfo || {});

  const handleInputChange = (field: keyof MedicalContext, value: any) => {
    setContext(prev => ({ ...prev, [field]: value }));
  };

  const handleFamilyHistoryChange = (option: string, checked: boolean) => {
    setContext(prev => ({
      ...prev,
      geneticFamilyHistory: checked
        ? [...(prev.geneticFamilyHistory || []), option]
        : (prev.geneticFamilyHistory || []).filter(item => item !== option)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData({ contextInfo: context });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Medical Context</h2>
      <p className="text-gray-600 mb-6">
        Please provide additional health background information to help our clinicians understand your case.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ethnicity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ethnicity
          </label>
          <select
            value={context.ethnicity || ""}
            onChange={(e) => handleInputChange("ethnicity", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select ethnicity</option>
            {ETHNICITIES.map(ethnicity => (
              <option key={ethnicity} value={ethnicity}>
                {ethnicity}
              </option>
            ))}
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Gender
          </label>
          <div className="space-y-2">
            {GENDERS.map(gender => (
              <label key={gender} className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={context.gender === gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="mr-2 text-blue-600"
                />
                {gender}
              </label>
            ))}
          </div>
        </div>

        {/* Disease Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Disease Type
          </label>
          <select
            value={context.diseaseType || ""}
            onChange={(e) => handleInputChange("diseaseType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select disease type</option>
            {DISEASE_TYPES.map(disease => (
              <option key={disease} value={disease}>
                {disease}
              </option>
            ))}
          </select>
        </div>

        {/* First Occurrence */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Is this the first occurrence?
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="firstOccurrence"
                value="true"
                checked={context.isFirstOccurrence === true}
                onChange={() => handleInputChange("isFirstOccurrence", true)}
                className="mr-2 text-blue-600"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="firstOccurrence"
                value="false"
                checked={context.isFirstOccurrence === false}
                onChange={() => handleInputChange("isFirstOccurrence", false)}
                className="mr-2 text-blue-600"
              />
              No
            </label>
          </div>
        </div>

        {/* Genetic Family History */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Genetic family history (select all that apply)
          </label>
          <div className="space-y-2">
            {FAMILY_HISTORY_OPTIONS.map(option => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(context.geneticFamilyHistory || []).includes(option)}
                  onChange={(e) => handleFamilyHistoryChange(option, e.target.checked)}
                  className="mr-2 text-blue-600"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Previous
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

