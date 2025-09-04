'use client';

import { useState, useEffect } from 'react';
import { ApplicationFormData } from '@/types/dual-path-recruitment';

interface InternationalManualEntryProps {
  candidateId: string;
  applicationNumber: string;
  onComplete: (formData: ApplicationFormData) => void;
  onPrev: () => void;
  initialData?: Partial<ApplicationFormData>;
}

// All constants outside component - never changes
const GEOGRAPHIC_REGIONS = {
  US: 'United States',
  CANADA: 'Canada',
  UK: 'United Kingdom',
  EU: 'European Union',
  AUSTRALIA: 'Australia',
  INDIA: 'India',
  REST_OF_WORLD: 'Rest of World'
};

const ALL_COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 
  'Spain', 'Italy', 'Netherlands', 'Australia', 'New Zealand', 
  'India', 'Brazil', 'Mexico', 'Other'
];

const MEDICAL_DEGREES = [
  'MD (Doctor of Medicine)',
  'DO (Doctor of Osteopathic Medicine)', 
  'MBBS (Bachelor of Medicine, Bachelor of Surgery)',
  'MBChB',
  'BM BCh',
  'Dr. med.',
  'MDCM (Doctor of Medicine and Master of Surgery)',
  'MS (Master of Surgery)',
  'Other Medical Degree'
];

const SPECIALTIES = [
  'Internal Medicine', 'Family Medicine', 'Pediatrics', 'Surgery',
  'Obstetrics & Gynecology', 'Psychiatry', 'Radiology', 'Anesthesiology',
  'Emergency Medicine', 'Pathology', 'Dermatology', 'Ophthalmology',
  'Orthopedic Surgery', 'Neurology', 'Cardiology', 'Oncology',
  'Gastroenterology', 'Endocrinology', 'Pulmonology', 'Nephrology',
  'Rheumatology', 'Infectious Disease', 'Other'
];

type GeographicRegion = keyof typeof GEOGRAPHIC_REGIONS;
type FormSection = 'region' | 'personal' | 'education' | 'professional' | 'licensing' | 'documents' | 'compliance';

export default function InternationalManualEntryComponent({
  candidateId,
  applicationNumber,
  onComplete,
  onPrev,
  initialData
}: InternationalManualEntryProps) {
  
  // Simple state - no complex initialization
  const [mounted, setMounted] = useState(false);
  const [currentSection, setCurrentSection] = useState<FormSection>('region');
  const [selectedRegion, setSelectedRegion] = useState<GeographicRegion | null>(null);
  
  // Simple form state
  const [personalInfo, setPersonalInfo] = useState({
    firstName: initialData?.personalInfo?.firstName || '',
    lastName: initialData?.personalInfo?.lastName || '',
    email: initialData?.personalInfo?.email || '',
    nationality: initialData?.personalInfo?.nationality || ''
  });

  const [educationInfo, setEducationInfo] = useState({
    medicalSchool: initialData?.medicalEducation?.medicalSchool || '',
    graduationYear: initialData?.medicalEducation?.graduationYear || '',
    degree: initialData?.medicalEducation?.degree || ''
  });

  const [professionalInfo, setProfessionalInfo] = useState({
    currentAffiliation: initialData?.professionalInfo?.currentAffiliation || '',
    primarySpecialty: initialData?.professionalInfo?.primarySpecialty || '',
    yearsPractice: initialData?.professionalInfo?.yearsPractice || 0
  });

  const [licensingInfo, setLicensingInfo] = useState({
    licenseNumber: initialData?.licensingInfo?.licenseNumber || '',
    licenseCountry: initialData?.licensingInfo?.licenseCountry || ''
  });

  const [compliance, setCompliance] = useState({
    dataProcessingConsent: initialData?.compliance?.dataProcessingConsent || false
  });

  // Simple mount effect - no dependencies
  useEffect(() => {
    setMounted(true);
  }, []);

  // Simple validation function
  function isCurrentSectionValid(): boolean {
    switch (currentSection) {
      case 'region':
        return selectedRegion !== null;
      case 'personal':
        return personalInfo.firstName && personalInfo.lastName && personalInfo.email && personalInfo.nationality;
      case 'education':
        return educationInfo.medicalSchool && educationInfo.graduationYear && educationInfo.degree;
      case 'professional':
        return professionalInfo.currentAffiliation && professionalInfo.primarySpecialty;
      case 'licensing':
        return licensingInfo.licenseNumber && licensingInfo.licenseCountry;
      case 'documents':
        return true;
      case 'compliance':
        return compliance.dataProcessingConsent;
      default:
        return false;
    }
  }

  // Simple navigation functions
  function handleNext() {
    if (!isCurrentSectionValid()) return;
    
    const sections: FormSection[] = ['region', 'personal', 'education', 'professional', 'licensing', 'documents', 'compliance'];
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
    } else {
      // Create complete form data for submission
      const completeFormData: ApplicationFormData = {
        personalInfo: {
          firstName: personalInfo.firstName,
          middleName: '',
          lastName: personalInfo.lastName,
          email: personalInfo.email,
          phone: '',
          nationality: personalInfo.nationality,
          dateOfBirth: undefined,
          governmentIdType: '',
          governmentIdNumber: ''
        },
        professionalInfo: {
          currentAffiliation: professionalInfo.currentAffiliation,
          currentPosition: '',
          subspecialties: [],
          yearsPractice: professionalInfo.yearsPractice,
          publications: 0,
          clinicalTrials: false,
          teachingRoles: false,
          primarySpecialty: professionalInfo.primarySpecialty,
          workPhone: '',
          workEmail: ''
        },
        medicalEducation: {
          medicalSchool: educationInfo.medicalSchool,
          graduationYear: educationInfo.graduationYear,
          degree: educationInfo.degree,
          residencyProgram: '',
          residencySpecialty: '',
          residencyStartYear: '',
          residencyEndYear: '',
          fellowshipProgram: '',
          fellowshipSpecialty: '',
          fellowshipYear: ''
        },
        licensingInfo: {
          licenseNumber: licensingInfo.licenseNumber,
          licenseCountry: licensingInfo.licenseCountry,
          licenseExpirationDate: undefined,
          boardCertifications: [],
          malpracticeInsurance: false
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
          dataProcessingConsent: compliance.dataProcessingConsent,
          communicationConsent: false,
          qualityAssuranceConsent: false,
          intellectualPropertyConsent: false
        }
      };
      onComplete(completeFormData);
    }
  }

  function handlePrev() {
    const sections: FormSection[] = ['region', 'personal', 'education', 'professional', 'licensing', 'documents', 'compliance'];
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1]);
    } else {
      onPrev();
    }
  }

  // Simple region selection handler
  function handleRegionSelect(region: GeographicRegion) {
    setSelectedRegion(region);
  }

  // Loading guard
  if (!mounted) {
    return <div className="max-w-4xl mx-auto p-6">Loading...</div>;
  }

  // Render current section
  function renderCurrentSection() {
    switch (currentSection) {
      case 'region':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Primary Geographic Region</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(GEOGRAPHIC_REGIONS).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => handleRegionSelect(key as GeographicRegion)}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      selectedRegion === key
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    <div className="font-medium">{label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'personal':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nationality <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={personalInfo.nationality}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, nationality: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select nationality</option>
                    {ALL_COUNTRIES.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Education</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medical School <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={educationInfo.medicalSchool}
                    onChange={(e) => setEducationInfo(prev => ({ ...prev, medicalSchool: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Name of your medical school"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Graduation Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={educationInfo.graduationYear}
                    onChange={(e) => setEducationInfo(prev => ({ ...prev, graduationYear: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 2015"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medical Degree <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={educationInfo.degree}
                    onChange={(e) => setEducationInfo(prev => ({ ...prev, degree: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select your degree</option>
                    {MEDICAL_DEGREES.map(degree => (
                      <option key={degree} value={degree}>{degree}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'professional':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Affiliation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={professionalInfo.currentAffiliation}
                    onChange={(e) => setProfessionalInfo(prev => ({ ...prev, currentAffiliation: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Current hospital/clinic/institution"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Specialty <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={professionalInfo.primarySpecialty}
                    onChange={(e) => setProfessionalInfo(prev => ({ ...prev, primarySpecialty: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select primary specialty</option>
                    {SPECIALTIES.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Practice
                  </label>
                  <input
                    type="number"
                    value={professionalInfo.yearsPractice}
                    onChange={(e) => setProfessionalInfo(prev => ({ ...prev, yearsPractice: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Number of years in practice"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'licensing':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Licensing Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    License Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={licensingInfo.licenseNumber}
                    onChange={(e) => setLicensingInfo(prev => ({ ...prev, licenseNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Medical license number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    License Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={licensingInfo.licenseCountry}
                    onChange={(e) => setLicensingInfo(prev => ({ ...prev, licenseCountry: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select license country</option>
                    {ALL_COUNTRIES.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800">Document Upload Information</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Please prepare the following documents for upload. All documents must be in PDF format.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900">✓ Curriculum Vitae (CV)</h4>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900">✓ Medical License</h4>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900">✓ Board Certifications</h4>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900">✓ Government ID</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'compliance':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance & Consent</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={compliance.dataProcessingConsent}
                      onChange={(e) => setCompliance(prev => ({ ...prev, dataProcessingConsent: e.target.checked }))}
                      className="mt-0.5 rounded border-gray-300 text-blue-600 shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="text-sm">
                      <span className="text-gray-700">
                        <span className="text-red-500">*</span> I consent to the processing of my personal and professional data 
                        for the purpose of professional verification and participation in medical second opinion services.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  const isValid = isCurrentSectionValid();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          International Professional Application
        </h2>
        <p className="text-lg text-gray-600">
          Please provide your professional information for international medical professionals.
        </p>
        {selectedRegion && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Form customized for: <strong>{GEOGRAPHIC_REGIONS[selectedRegion]}</strong>
            </p>
          </div>
        )}
      </div>

      {renderCurrentSection()}

      <div className="mt-8 flex justify-between">
        <button
          onClick={handlePrev}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
        >
          ← Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!isValid}
          className={`px-6 py-3 rounded-lg font-medium ${
            isValid
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {currentSection === 'compliance' ? 'Complete Application' : 'Next →'}
        </button>
      </div>
    </div>
  );
}