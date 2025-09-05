'use client';

import { useState } from 'react';
import { 
  CancerSubspecialty, 
  DiagnosticExpertise, 
  RegionalLicensing, 
  LanguageCapability, 
  AvailabilityTier,
  ProfessionalProfile
} from '@/types/professional';

interface ProfessionalProfilingData {
  // Cancer Subspecialties
  primarySpecialties: string[];
  secondarySpecialties: string[];
  
  // Diagnostic Expertise
  diagnosticCapabilities: string[];
  
  // Regional Licensing
  licensingJurisdictions: string[];
  regulatoryCompliance: {
    gdprCompliant: boolean;
    hipaaCompliant: boolean;
    localRegulationsAware: string[];
  };
  
  // Languages
  languages: Array<{
    language: string;
    proficiencyLevel: string;
    medicalTerminology: boolean;
  }>;
  
  // Availability
  availabilityProfile: {
    tier: string;
    maxConcurrentCases: number;
    workingHours: {
      timezone: string;
      weekdays: {
        start: string;
        end: string;
      };
      weekends: boolean;
      urgentCasesAfterHours: boolean;
    };
  };
  
  // Preferences
  preferences: {
    preferredCaseTypes: string[];
    mentorshipAvailable: boolean;
    researchInterests: string[];
  };
}

interface Props {
  data: ProfessionalProfilingData;
  onUpdate: (data: ProfessionalProfilingData) => void;
  onNext: () => void;
  onBack: () => void;
}

const CANCER_SPECIALTIES = [
  { value: 'BREAST_CANCER', label: 'Breast Cancer' },
  { value: 'PROSTATE_CANCER', label: 'Prostate Cancer' },
  { value: 'LUNG_CANCER', label: 'Lung Cancer' },
  { value: 'COLORECTAL_CANCER', label: 'Colorectal Cancer' },
  { value: 'GYNECOLOGIC_CANCER', label: 'Gynecologic Cancer' },
  { value: 'HEAD_AND_NECK_CANCER', label: 'Head and Neck Cancer' },
  { value: 'SKIN_CANCER', label: 'Skin Cancer' },
  { value: 'LIVER_CANCER', label: 'Liver Cancer' },
  { value: 'PANCREATIC_CANCER', label: 'Pancreatic Cancer' },
  { value: 'LEUKEMIA', label: 'Leukemia' },
  { value: 'LYMPHOMA', label: 'Lymphoma' },
  { value: 'MYELOMA', label: 'Myeloma' },
  { value: 'SARCOMA', label: 'Sarcoma' },
  { value: 'BRAIN_TUMOR', label: 'Brain Tumor' },
  { value: 'MOLECULAR_ONCOLOGY', label: 'Molecular Oncology' },
  { value: 'PRECISION_MEDICINE', label: 'Precision Medicine' }
];

const DIAGNOSTIC_EXPERTISE = [
  { value: 'RADIOLOGY_FOCUSED', label: 'Radiology-Focused (MRI, CT, PET/CT)' },
  { value: 'PATHOLOGY_FOCUSED', label: 'Pathology-Focused (Histopathology, IHC)' },
  { value: 'GENOMICS_SPECIALIST', label: 'Genomics Specialist (NGS, Liquid Biopsy)' },
  { value: 'MULTIMODAL_REVIEWER', label: 'Multimodal Reviewer (Integrated Analysis)' }
];

const LANGUAGES = [
  { value: 'ENGLISH', label: 'English' },
  { value: 'GERMAN', label: 'German' },
  { value: 'FRENCH', label: 'French' },
  { value: 'SPANISH', label: 'Spanish' },
  { value: 'MANDARIN', label: 'Mandarin Chinese' },
  { value: 'HINDI', label: 'Hindi' },
  { value: 'ARABIC', label: 'Arabic' },
  { value: 'PORTUGUESE', label: 'Portuguese' },
  { value: 'ITALIAN', label: 'Italian' },
  { value: 'JAPANESE', label: 'Japanese' }
];

const TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern US (New York)' },
  { value: 'America/Chicago', label: 'Central US (Chicago)' },
  { value: 'America/Denver', label: 'Mountain US (Denver)' },
  { value: 'America/Los_Angeles', label: 'Pacific US (Los Angeles)' },
  { value: 'Europe/London', label: 'UK (London)' },
  { value: 'Europe/Paris', label: 'Central Europe (Paris)' },
  { value: 'Europe/Berlin', label: 'Germany (Berlin)' },
  { value: 'Asia/Tokyo', label: 'Japan (Tokyo)' },
  { value: 'Asia/Shanghai', label: 'China (Shanghai)' },
  { value: 'Asia/Kolkata', label: 'India (Mumbai)' },
  { value: 'Australia/Sydney', label: 'Australia (Sydney)' }
];

export default function ProfessionalProfilingStep({ data, onUpdate, onNext, onBack }: Props) {
  const [activeSection, setActiveSection] = useState<string>('specialties');

  const handleLanguageAdd = () => {
    const newLanguages = [...data.languages, {
      language: 'ENGLISH',
      proficiencyLevel: 'ADVANCED',
      medicalTerminology: true
    }];
    onUpdate({ ...data, languages: newLanguages });
  };

  const handleLanguageUpdate = (index: number, field: string, value: any) => {
    const updatedLanguages = data.languages.map((lang, i) => 
      i === index ? { ...lang, [field]: value } : lang
    );
    onUpdate({ ...data, languages: updatedLanguages });
  };

  const handleLanguageRemove = (index: number) => {
    const filteredLanguages = data.languages.filter((_, i) => i !== index);
    onUpdate({ ...data, languages: filteredLanguages });
  };

  const isComplete = () => {
    return (
      data.primarySpecialties.length > 0 &&
      data.diagnosticCapabilities.length > 0 &&
      data.licensingJurisdictions.length > 0 &&
      data.languages.length > 0 &&
      data.availabilityProfile.tier &&
      data.availabilityProfile.maxConcurrentCases > 0
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Profiling</h2>
        <p className="text-gray-600">
          Help us create your professional profile to match you with the most suitable cases.
        </p>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b">
        {[
          { id: 'specialties', label: 'Specialties' },
          { id: 'diagnostics', label: 'Diagnostic Expertise' },
          { id: 'licensing', label: 'Licensing' },
          { id: 'languages', label: 'Languages' },
          { id: 'availability', label: 'Availability' },
          { id: 'preferences', label: 'Preferences' }
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeSection === section.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Cancer Specialties Section */}
        {activeSection === 'specialties' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Cancer Specialties</h3>
            
            {/* Primary Specialties */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Specialties (Select 1-3) *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CANCER_SPECIALTIES.map((specialty) => (
                  <label key={specialty.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={data.primarySpecialties.includes(specialty.value)}
                      onChange={(e) => {
                        if (e.target.checked && data.primarySpecialties.length < 3) {
                          onUpdate({
                            ...data,
                            primarySpecialties: [...data.primarySpecialties, specialty.value]
                          });
                        } else if (!e.target.checked) {
                          onUpdate({
                            ...data,
                            primarySpecialties: data.primarySpecialties.filter(s => s !== specialty.value)
                          });
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{specialty.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Selected: {data.primarySpecialties.length}/3
              </p>
            </div>

            {/* Secondary Specialties */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Specialties (Optional - Select up to 5)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CANCER_SPECIALTIES.filter(s => !data.primarySpecialties.includes(s.value)).map((specialty) => (
                  <label key={specialty.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={data.secondarySpecialties.includes(specialty.value)}
                      onChange={(e) => {
                        if (e.target.checked && data.secondarySpecialties.length < 5) {
                          onUpdate({
                            ...data,
                            secondarySpecialties: [...data.secondarySpecialties, specialty.value]
                          });
                        } else if (!e.target.checked) {
                          onUpdate({
                            ...data,
                            secondarySpecialties: data.secondarySpecialties.filter(s => s !== specialty.value)
                          });
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{specialty.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Selected: {data.secondarySpecialties.length}/5
              </p>
            </div>
          </div>
        )}

        {/* Diagnostic Expertise Section */}
        {activeSection === 'diagnostics' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Diagnostic Expertise</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Areas of Diagnostic Expertise (Select all that apply) *
              </label>
              <div className="space-y-3">
                {DIAGNOSTIC_EXPERTISE.map((expertise) => (
                  <label key={expertise.value} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={data.diagnosticCapabilities.includes(expertise.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onUpdate({
                            ...data,
                            diagnosticCapabilities: [...data.diagnosticCapabilities, expertise.value]
                          });
                        } else {
                          onUpdate({
                            ...data,
                            diagnosticCapabilities: data.diagnosticCapabilities.filter(d => d !== expertise.value)
                          });
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{expertise.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Licensing Section */}
        {activeSection === 'licensing' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Regional Licensing & Compliance</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Licensing Jurisdictions *
              </label>
              <div className="space-y-3">
                {[
                  { value: 'EU_LICENSED', label: 'EU Licensed (EMA standards, GDPR compliant)' },
                  { value: 'US_LICENSED', label: 'US Licensed (FDA standards, HIPAA compliant)' },
                  { value: 'APAC_LICENSED', label: 'APAC Licensed (Asia-Pacific region)' },
                  { value: 'CROSS_LICENSED', label: 'Cross-Licensed (Multiple jurisdictions)' }
                ].map((jurisdiction) => (
                  <label key={jurisdiction.value} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={data.licensingJurisdictions.includes(jurisdiction.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onUpdate({
                            ...data,
                            licensingJurisdictions: [...data.licensingJurisdictions, jurisdiction.value]
                          });
                        } else {
                          onUpdate({
                            ...data,
                            licensingJurisdictions: data.licensingJurisdictions.filter(j => j !== jurisdiction.value)
                          });
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{jurisdiction.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Regulatory Compliance</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={data.regulatoryCompliance.gdprCompliant}
                    onChange={(e) => onUpdate({
                      ...data,
                      regulatoryCompliance: {
                        ...data.regulatoryCompliance,
                        gdprCompliant: e.target.checked
                      }
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">GDPR Compliant</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={data.regulatoryCompliance.hipaaCompliant}
                    onChange={(e) => onUpdate({
                      ...data,
                      regulatoryCompliance: {
                        ...data.regulatoryCompliance,
                        hipaaCompliant: e.target.checked
                      }
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">HIPAA Compliant</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Languages Section */}
        {activeSection === 'languages' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Language Capabilities</h3>
            
            <div className="space-y-4">
              {data.languages.map((language, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Language
                      </label>
                      <select
                        value={language.language}
                        onChange={(e) => handleLanguageUpdate(index, 'language', e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        {LANGUAGES.map((lang) => (
                          <option key={lang.value} value={lang.value}>
                            {lang.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Proficiency
                      </label>
                      <select
                        value={language.proficiencyLevel}
                        onChange={(e) => handleLanguageUpdate(index, 'proficiencyLevel', e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="BASIC">Basic</option>
                        <option value="INTERMEDIATE">Intermediate</option>
                        <option value="ADVANCED">Advanced</option>
                        <option value="NATIVE">Native</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={language.medicalTerminology}
                          onChange={(e) => handleLanguageUpdate(index, 'medicalTerminology', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Medical Terms</span>
                      </label>
                    </div>
                    
                    <div>
                      <button
                        onClick={() => handleLanguageRemove(index)}
                        className="px-3 py-2 text-sm text-red-600 hover:text-red-800 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                onClick={handleLanguageAdd}
                className="w-full px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                + Add Language
              </button>
            </div>
          </div>
        )}

        {/* Availability Section */}
        {activeSection === 'availability' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Availability & Workload</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability Tier *
                </label>
                <select
                  value={data.availabilityProfile.tier}
                  onChange={(e) => onUpdate({
                    ...data,
                    availabilityProfile: { ...data.availabilityProfile, tier: e.target.value }
                  })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select tier...</option>
                  <option value="RAPID_RESPONSE">Rapid Response (24-48h)</option>
                  <option value="STANDARD">Standard (3-7 days)</option>
                  <option value="COMPLEX_CASE">Complex Cases (Detailed reviews)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Concurrent Cases *
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={data.availabilityProfile.maxConcurrentCases}
                  onChange={(e) => onUpdate({
                    ...data,
                    availabilityProfile: { 
                      ...data.availabilityProfile, 
                      maxConcurrentCases: parseInt(e.target.value) || 1 
                    }
                  })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Working Hours</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timezone
                  </label>
                  <select
                    value={data.availabilityProfile.workingHours.timezone}
                    onChange={(e) => onUpdate({
                      ...data,
                      availabilityProfile: {
                        ...data.availabilityProfile,
                        workingHours: {
                          ...data.availabilityProfile.workingHours,
                          timezone: e.target.value
                        }
                      }
                    })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={data.availabilityProfile.workingHours.weekdays.start}
                    onChange={(e) => onUpdate({
                      ...data,
                      availabilityProfile: {
                        ...data.availabilityProfile,
                        workingHours: {
                          ...data.availabilityProfile.workingHours,
                          weekdays: {
                            ...data.availabilityProfile.workingHours.weekdays,
                            start: e.target.value
                          }
                        }
                      }
                    })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={data.availabilityProfile.workingHours.weekdays.end}
                    onChange={(e) => onUpdate({
                      ...data,
                      availabilityProfile: {
                        ...data.availabilityProfile,
                        workingHours: {
                          ...data.availabilityProfile.workingHours,
                          weekdays: {
                            ...data.availabilityProfile.workingHours.weekdays,
                            end: e.target.value
                          }
                        }
                      }
                    })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={data.availabilityProfile.workingHours.weekends}
                    onChange={(e) => onUpdate({
                      ...data,
                      availabilityProfile: {
                        ...data.availabilityProfile,
                        workingHours: {
                          ...data.availabilityProfile.workingHours,
                          weekends: e.target.checked
                        }
                      }
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Available on weekends</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={data.availabilityProfile.workingHours.urgentCasesAfterHours}
                    onChange={(e) => onUpdate({
                      ...data,
                      availabilityProfile: {
                        ...data.availabilityProfile,
                        workingHours: {
                          ...data.availabilityProfile.workingHours,
                          urgentCasesAfterHours: e.target.checked
                        }
                      }
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Available for urgent cases after hours</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Section */}
        {activeSection === 'preferences' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Professional Preferences</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Case Types (Select all that apply)
              </label>
              <div className="space-y-3">
                {[
                  { value: 'DIAGNOSTIC_REVIEW', label: 'Diagnostic Review' },
                  { value: 'TREATMENT_PLANNING', label: 'Treatment Planning' },
                  { value: 'SECOND_OPINION', label: 'Second Opinion' },
                  { value: 'COMPLEX_CONSULTATION', label: 'Complex Consultation' },
                  { value: 'MULTIDISCIPLINARY_REVIEW', label: 'Multidisciplinary Review' },
                  { value: 'GENOMIC_INTERPRETATION', label: 'Genomic Interpretation' }
                ].map((caseType) => (
                  <label key={caseType.value} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={data.preferences.preferredCaseTypes.includes(caseType.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onUpdate({
                            ...data,
                            preferences: {
                              ...data.preferences,
                              preferredCaseTypes: [...data.preferences.preferredCaseTypes, caseType.value]
                            }
                          });
                        } else {
                          onUpdate({
                            ...data,
                            preferences: {
                              ...data.preferences,
                              preferredCaseTypes: data.preferences.preferredCaseTypes.filter(t => t !== caseType.value)
                            }
                          });
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{caseType.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={data.preferences.mentorshipAvailable}
                  onChange={(e) => onUpdate({
                    ...data,
                    preferences: {
                      ...data.preferences,
                      mentorshipAvailable: e.target.checked
                    }
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Available to mentor junior professionals
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Research Interests (Optional)
              </label>
              <textarea
                value={data.preferences.researchInterests.join('\n')}
                onChange={(e) => onUpdate({
                  ...data,
                  preferences: {
                    ...data.preferences,
                    researchInterests: e.target.value.split('\n').filter(r => r.trim())
                  }
                })}
                placeholder="Enter each research interest on a new line..."
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        
        <button
          onClick={onNext}
          disabled={!isComplete()}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            isComplete()
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>

      {!isComplete() && (
        <p className="text-sm text-red-600 mt-2 text-center">
          Please complete all required fields before continuing
        </p>
      )}
    </div>
  );
}