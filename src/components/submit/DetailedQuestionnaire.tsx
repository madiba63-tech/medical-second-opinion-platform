'use client';

import { useState } from 'react';

interface DetailedQuestionnaireProps {
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
  'Stage I (Early stage)', 'Stage II (Local spread)', 'Stage III (Regional spread)', 
  'Stage IV (Advanced/Metastatic)', 'Unknown', "Don't know / Prefer not to tell"
];

const DIAGNOSTIC_TESTS = [
  'CT Scan', 'MRI', 'PET Scan', 'X-Ray', 'Ultrasound', 'Biopsy', 
  'Blood tests', 'Genetic testing', 'Bone scan', 'Endoscopy', 'Other', "Don't know / Prefer not to tell"
];

const TREATMENT_TYPES = [
  'Surgery', 'Radiation', 'Chemotherapy', 'Immunotherapy', 'Targeted therapy', 
  'Hormonal therapy', 'Stem cell transplant', 'Clinical trial', 'None', "Don't know / Prefer not to tell"
];

const TREATMENT_RESPONSE = [
  'Complete remission', 'Partial remission', 'Stable disease', 'Disease progression', 
  'Unknown', "Don't know / Prefer not to tell"
];

const CHRONIC_CONDITIONS = [
  'Diabetes', 'High blood pressure', 'Heart disease', 'Kidney disease', 'Liver disease',
  'Autoimmune disorders', 'Blood disorders', 'Lung disease', 'Mental health conditions', 
  'None', 'Other', "Don't know / Prefer not to tell"
];

const FAMILY_RELATIONS = [
  'Mother', 'Father', 'Sister', 'Brother', 'Grandmother', 'Grandfather',
  'Aunt', 'Uncle', 'Cousin', 'Child', 'None', "Don't know / Prefer not to tell"
];

const LIFESTYLE_OPTIONS = [
  'Never smoked', 'Former smoker', 'Current smoker', 'Never drink alcohol', 
  'Occasional drinker', 'Regular drinker', 'Very active', 'Moderately active', 
  'Sedentary lifestyle', "Don't know / Prefer not to tell"
];

const SECOND_OPINION_GOALS = [
  'Confirm diagnosis', 'Confirm stage', 'Explore alternative treatments', 
  'Clinical trial options', 'Clarify prognosis', 'Understand side effects', 
  'Get treatment recommendations', 'Other', "Don't know / Prefer not to tell"
];

export default function DetailedQuestionnaire({ onUpdate, onNext, onPrev, initialData }: DetailedQuestionnaireProps) {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState({
    // Current Diagnosis & History
    cancerType: initialData?.cancerType || '',
    cancerStage: initialData?.cancerStage || '',
    diagnosisDate: initialData?.diagnosisDate || '',
    hospitalClinic: initialData?.hospitalClinic || '',
    initialSymptoms: initialData?.initialSymptoms || '',
    currentSymptoms: initialData?.currentSymptoms || '',
    diagnosticTests: initialData?.diagnosticTests || [],
    
    // Treatment History
    treatmentsReceived: initialData?.treatmentsReceived || [],
    sideEffectsExperienced: initialData?.sideEffectsExperienced || '',
    treatmentResponse: initialData?.treatmentResponse || '',
    
    // Medical & Family History
    chronicConditions: initialData?.chronicConditions || [],
    currentMedications: initialData?.currentMedications || '',
    allergies: initialData?.allergies || '',
    familyHistory: initialData?.familyHistory || [],
    familyCancerDetails: initialData?.familyCancerDetails || '',
    lifestyleFactors: initialData?.lifestyleFactors || [],
    
    // Second Opinion Goals
    secondOpinionGoals: initialData?.secondOpinionGoals || [],
    specificTreatmentInterest: initialData?.specificTreatmentInterest || '',
    
    ...initialData
  });

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleMultiSelect = (field: string, option: string) => {
    const currentValues = formData[field] || [];
    
    // Handle exclusive options
    const exclusiveOptions = ['None', "Don't know / Prefer not to tell"];
    
    if (exclusiveOptions.includes(option)) {
      const newValues = currentValues.includes(option) ? [] : [option];
      handleChange(field, newValues);
    } else {
      // Remove exclusive options if selecting regular options
      const filteredValues = currentValues.filter(val => !exclusiveOptions.includes(val));
      const newValues = filteredValues.includes(option)
        ? filteredValues.filter(val => val !== option)
        : [...filteredValues, option];
      handleChange(field, newValues);
    }
  };

  const sections = [
    { id: 1, title: 'Diagnosis & History', fields: ['cancerType', 'cancerStage'] },
    { id: 2, title: 'Treatment History', fields: ['treatmentsReceived', 'treatmentResponse'] },
    { id: 3, title: 'Medical & Family History', fields: ['familyHistory'] },
    { id: 4, title: 'Second Opinion Goals', fields: ['secondOpinionGoals'] }
  ];

  const canProceed = () => {
    // Basic validation for required fields
    return formData.cancerType && formData.cancerStage && 
           formData.secondOpinionGoals?.length > 0;
  };

  const renderCurrentDiagnosisSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Current Diagnosis & History</h3>
      
      {/* Cancer Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type of cancer <span className="text-red-500">*</span>
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

      {/* Cancer Stage */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stage <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.cancerStage}
          onChange={(e) => handleChange('cancerStage', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select stage</option>
          {CANCER_STAGES.map(stage => (
            <option key={stage} value={stage}>{stage}</option>
          ))}
        </select>
      </div>

      {/* Date of Diagnosis */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date of diagnosis
        </label>
        <input
          type="month"
          value={formData.diagnosisDate}
          onChange={(e) => handleChange('diagnosisDate', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Hospital/Clinic */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hospital/Clinic name
        </label>
        <input
          type="text"
          value={formData.hospitalClinic}
          onChange={(e) => handleChange('hospitalClinic', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name of the medical facility"
        />
      </div>

      {/* Initial Symptoms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Initial symptoms that led to diagnosis
        </label>
        <textarea
          value={formData.initialSymptoms}
          onChange={(e) => handleChange('initialSymptoms', e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the symptoms you first experienced..."
        />
      </div>

      {/* Current Symptoms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current symptoms
        </label>
        <textarea
          value={formData.currentSymptoms}
          onChange={(e) => handleChange('currentSymptoms', e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe any symptoms you're currently experiencing..."
        />
      </div>

      {/* Diagnostic Tests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Diagnostic tests performed (select all that apply)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {DIAGNOSTIC_TESTS.map(test => (
            <label key={test} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.diagnosticTests?.includes(test) || false}
                onChange={() => handleMultiSelect('diagnosticTests', test)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{test}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTreatmentHistorySection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Treatment History</h3>
      
      {/* Treatments Received */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Treatments received (select all that apply)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {TREATMENT_TYPES.map(treatment => (
            <label key={treatment} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.treatmentsReceived?.includes(treatment) || false}
                onChange={() => handleMultiSelect('treatmentsReceived', treatment)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{treatment}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Side Effects */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Side effects experienced
        </label>
        <textarea
          value={formData.sideEffectsExperienced}
          onChange={(e) => handleChange('sideEffectsExperienced', e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe any side effects from treatments..."
        />
      </div>

      {/* Treatment Response */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Physician's assessment of treatment response
        </label>
        <select
          value={formData.treatmentResponse}
          onChange={(e) => handleChange('treatmentResponse', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select treatment response</option>
          {TREATMENT_RESPONSE.map(response => (
            <option key={response} value={response}>{response}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderMedicalFamilyHistorySection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">3. Medical & Family History</h3>
      
      {/* Chronic Conditions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Other chronic conditions (select all that apply)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CHRONIC_CONDITIONS.map(condition => (
            <label key={condition} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.chronicConditions?.includes(condition) || false}
                onChange={() => handleMultiSelect('chronicConditions', condition)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{condition}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Current Medications */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current medications
        </label>
        <textarea
          value={formData.currentMedications}
          onChange={(e) => handleChange('currentMedications', e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="List your current medications with dosages..."
        />
      </div>

      {/* Allergies */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Allergies
        </label>
        <textarea
          value={formData.allergies}
          onChange={(e) => handleChange('allergies', e.target.value)}
          rows={2}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="List any known allergies..."
        />
      </div>

      {/* Family History */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Family history of cancer (select all that apply)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {FAMILY_RELATIONS.map(relation => (
            <label key={relation} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.familyHistory?.includes(relation) || false}
                onChange={() => handleMultiSelect('familyHistory', relation)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{relation}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Family Cancer Details */}
      {formData.familyHistory?.some(rel => rel !== 'None' && rel !== "Don't know / Prefer not to tell") && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Details about family cancer history
          </label>
          <textarea
            value={formData.familyCancerDetails}
            onChange={(e) => handleChange('familyCancerDetails', e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Provide details about cancer types and relationships..."
          />
        </div>
      )}

      {/* Lifestyle Factors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Lifestyle factors (select all that apply)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {LIFESTYLE_OPTIONS.map(lifestyle => (
            <label key={lifestyle} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.lifestyleFactors?.includes(lifestyle) || false}
                onChange={() => handleMultiSelect('lifestyleFactors', lifestyle)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{lifestyle}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecondOpinionGoalsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">4. Second Opinion Goals</h3>
      
      {/* Main Goals */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Main goals for seeking a second opinion (select all that apply) <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SECOND_OPINION_GOALS.map(goal => (
            <label key={goal} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.secondOpinionGoals?.includes(goal) || false}
                onChange={() => handleMultiSelect('secondOpinionGoals', goal)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{goal}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Specific Treatment Interest */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Any specific treatment or clinical trial you're already considering?
        </label>
        <textarea
          value={formData.specificTreatmentInterest}
          onChange={(e) => handleChange('specificTreatmentInterest', e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe any treatments or clinical trials you're interested in exploring..."
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Detailed Medical Questionnaire</h2>
        <p className="text-gray-600">
          Please provide comprehensive information about your medical history for thorough analysis.
        </p>
      </div>

      {/* Section Navigation */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h4 className="text-sm font-medium text-gray-700">Progress: Section {currentSection} of 4</h4>
          <div className="text-xs text-gray-500">
            {Math.round((currentSection / 4) * 100)}% complete
          </div>
        </div>
        <div className="flex space-x-1">
          {sections.map(section => (
            <div
              key={section.id}
              className={`flex-1 h-2 rounded ${
                section.id <= currentSection ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          {sections.map(section => (
            <span key={section.id} className={section.id === currentSection ? 'font-medium' : ''}>
              {section.title}
            </span>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div className="bg-white">
        {currentSection === 1 && renderCurrentDiagnosisSection()}
        {currentSection === 2 && renderTreatmentHistorySection()}
        {currentSection === 3 && renderMedicalFamilyHistorySection()}
        {currentSection === 4 && renderSecondOpinionGoalsSection()}
      </div>

      {/* Section Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <div className="flex space-x-3">
          <button
            onClick={onPrev}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Back to Upload
          </button>
          {currentSection > 1 && (
            <button
              onClick={() => setCurrentSection(currentSection - 1)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Previous Section
            </button>
          )}
        </div>
        
        <div>
          {currentSection < 4 ? (
            <button
              onClick={() => setCurrentSection(currentSection + 1)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Next Section
            </button>
          ) : (
            <button
              onClick={onNext}
              disabled={!canProceed()}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                canProceed()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Your Information
            </button>
          )}
        </div>
      </div>
    </div>
  );
}