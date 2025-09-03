'use client';

import { useState, useEffect } from 'react';

interface ManualEntryProps {
  onNext: (formData: ManualFormData) => void;
  onPrev: () => void;
  initialData?: Partial<ManualFormData>;
}

interface ManualFormData {
  personalInfo: PersonalInfo;
  medicalEducation: MedicalEducation;
  professionalInfo: ProfessionalInfo;
  licensingInfo: LicensingInfo;
  qualityScore: QualityScore;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  currentCountry: string;
  preferredLanguage: string;
  timeZone: string;
}

interface MedicalEducation {
  medicalDegree: {
    degree: string;
    institution: string;
    country: string;
    graduationYear: string;
    gpa?: string;
    honors?: string;
  };
  residency: {
    specialty: string;
    institution: string;
    country: string;
    startYear: string;
    endYear: string;
    chiefResident?: boolean;
  };
  fellowship?: {
    subspecialty: string;
    institution: string;
    country: string;
    startYear: string;
    endYear: string;
  };
  additionalTraining: Array<{
    type: string;
    institution: string;
    year: string;
    description: string;
  }>;
}

interface ProfessionalInfo {
  currentPosition: string;
  currentInstitution: string;
  currentCountry: string;
  startDate: string;
  yearsPractice: number;
  subspecialties: string[];
  clinicalAreas: string[];
  publications: {
    totalCount: number;
    peerReviewed: number;
    firstAuthor: number;
    recentPublication?: string;
  };
  research: {
    clinicalTrials: boolean;
    trialCount?: number;
    researchGrants: boolean;
    grantAmount?: string;
  };
  teaching: {
    teachingRole: boolean;
    institution?: string;
    position?: string;
    yearsTeaching?: number;
  };
  leadership: {
    leadershipRoles: boolean;
    roles?: Array<{
      position: string;
      organization: string;
      years: string;
    }>;
  };
}

interface LicensingInfo {
  medicalLicense: {
    licenseNumber: string;
    issuingCountry: string;
    issuingState?: string;
    issueDate: string;
    expirationDate: string;
    status: 'active' | 'inactive' | 'suspended';
  };
  boardCertifications: Array<{
    specialty: string;
    boardName: string;
    certificationNumber: string;
    issueDate: string;
    expirationDate: string;
    status: 'active' | 'expired' | 'suspended';
  }>;
  additionalCertifications: Array<{
    name: string;
    issuingOrganization: string;
    issueDate: string;
    expirationDate?: string;
  }>;
  malpracticeInsurance: {
    hasInsurance: boolean;
    carrier?: string;
    coverageAmount?: string;
    expirationDate?: string;
  };
}

interface QualityScore {
  completeness: number;
  consistency: number;
  validation: number;
  overall: number;
  sectionsCompleted: string[];
  missingRequiredFields: string[];
}

type FormSection = 'personal' | 'education' | 'professional' | 'licensing';

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'India', 'China', 'Japan', 'Brazil',
  'South Africa', 'Nigeria', 'Egypt', 'Mexico', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Switzerland', 'Other'
];

const SPECIALTIES = [
  'Internal Medicine', 'Family Medicine', 'Pediatrics', 'Surgery', 'Obstetrics & Gynecology', 'Psychiatry',
  'Radiology', 'Anesthesiology', 'Emergency Medicine', 'Pathology', 'Dermatology', 'Ophthalmology',
  'Orthopedic Surgery', 'Neurology', 'Cardiology', 'Oncology', 'Gastroenterology', 'Endocrinology',
  'Pulmonology', 'Nephrology', 'Rheumatology', 'Infectious Disease', 'Other'
];

export default function ManualEntryComponent({ onNext, onPrev, initialData }: ManualEntryProps) {
  const [currentSection, setCurrentSection] = useState<FormSection>('personal');
  const [formData, setFormData] = useState<ManualFormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      nationality: '',
      currentCountry: '',
      preferredLanguage: 'English',
      timeZone: ''
    },
    medicalEducation: {
      medicalDegree: {
        degree: '',
        institution: '',
        country: '',
        graduationYear: '',
        gpa: '',
        honors: ''
      },
      residency: {
        specialty: '',
        institution: '',
        country: '',
        startYear: '',
        endYear: '',
        chiefResident: false
      },
      additionalTraining: []
    },
    professionalInfo: {
      currentPosition: '',
      currentInstitution: '',
      currentCountry: '',
      startDate: '',
      yearsPractice: 0,
      subspecialties: [],
      clinicalAreas: [],
      publications: {
        totalCount: 0,
        peerReviewed: 0,
        firstAuthor: 0
      },
      research: {
        clinicalTrials: false,
        researchGrants: false
      },
      teaching: {
        teachingRole: false
      },
      leadership: {
        leadershipRoles: false
      }
    },
    licensingInfo: {
      medicalLicense: {
        licenseNumber: '',
        issuingCountry: '',
        issueDate: '',
        expirationDate: '',
        status: 'active'
      },
      boardCertifications: [],
      additionalCertifications: [],
      malpracticeInsurance: {
        hasInsurance: false
      }
    },
    qualityScore: {
      completeness: 0,
      consistency: 0,
      validation: 0,
      overall: 0,
      sectionsCompleted: [],
      missingRequiredFields: []
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValidating, setIsValidating] = useState(false);

  // Calculate quality score
  useEffect(() => {
    const score = calculateQualityScore();
    setFormData(prev => ({ ...prev, qualityScore: score }));
  }, [formData.personalInfo, formData.medicalEducation, formData.professionalInfo, formData.licensingInfo]);

  const calculateQualityScore = (): QualityScore => {
    const requiredFields = {
      personal: ['firstName', 'lastName', 'email', 'phone', 'nationality'],
      education: ['medicalDegree.degree', 'medicalDegree.institution', 'medicalDegree.country', 'medicalDegree.graduationYear'],
      professional: ['currentPosition', 'currentInstitution', 'yearsPractice'],
      licensing: ['medicalLicense.licenseNumber', 'medicalLicense.issuingCountry']
    };

    let completedFields = 0;
    let totalFields = 0;
    const sectionsCompleted: string[] = [];
    const missingRequiredFields: string[] = [];

    // Count completed fields and identify missing ones
    Object.entries(requiredFields).forEach(([section, fields]) => {
      let sectionCompleted = true;
      fields.forEach(field => {
        totalFields++;
        const value = getNestedValue(formData, field);
        if (value && value.toString().trim()) {
          completedFields++;
        } else {
          sectionCompleted = false;
          missingRequiredFields.push(field);
        }
      });
      if (sectionCompleted) {
        sectionsCompleted.push(section);
      }
    });

    const completeness = (completedFields / totalFields) * 100;
    const consistency = validateConsistency();
    const validation = validateData();
    const overall = (completeness * 0.5) + (consistency * 0.3) + (validation * 0.2);

    return {
      completeness,
      consistency,
      validation,
      overall,
      sectionsCompleted,
      missingRequiredFields
    };
  };

  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const validateConsistency = (): number => {
    let score = 100;
    const education = formData.medicalEducation;
    const professional = formData.professionalInfo;
    
    // Check date consistency
    if (education.residency.endYear && professional.startDate) {
      const residencyEnd = parseInt(education.residency.endYear);
      const careerStart = new Date(professional.startDate).getFullYear();
      if (careerStart < residencyEnd - 1) score -= 20;
    }

    // Check experience consistency
    if (professional.yearsPractice > 50) score -= 30;
    if (professional.publications.totalCount < professional.publications.peerReviewed) score -= 20;

    return Math.max(0, score);
  };

  const validateData = (): number => {
    let score = 100;
    const errors: string[] = [];

    // Email validation
    if (formData.personalInfo.email && !/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
      errors.push('Invalid email format');
      score -= 20;
    }

    // Phone validation
    if (formData.personalInfo.phone && !/^\+?[\d\s\-()]{10,}$/.test(formData.personalInfo.phone)) {
      errors.push('Invalid phone format');
      score -= 10;
    }

    // Year validation
    const currentYear = new Date().getFullYear();
    if (formData.medicalEducation.medicalDegree.graduationYear) {
      const gradYear = parseInt(formData.medicalEducation.medicalDegree.graduationYear);
      if (gradYear < 1950 || gradYear > currentYear) {
        errors.push('Invalid graduation year');
        score -= 15;
      }
    }

    return Math.max(0, score);
  };

  const updateFormData = (section: keyof ManualFormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const renderSectionProgress = () => {
    const sections = [
      { key: 'personal', label: 'Personal Info', completed: formData.qualityScore.sectionsCompleted.includes('personal') },
      { key: 'education', label: 'Education', completed: formData.qualityScore.sectionsCompleted.includes('education') },
      { key: 'professional', label: 'Professional', completed: formData.qualityScore.sectionsCompleted.includes('professional') },
      { key: 'licensing', label: 'Licensing', completed: formData.qualityScore.sectionsCompleted.includes('licensing') }
    ];

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {sections.map((section, index) => (
            <div key={section.key} className="flex items-center">
              <button
                onClick={() => setCurrentSection(section.key as FormSection)}
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-semibold text-sm transition-colors ${
                  section.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : currentSection === section.key
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}
              >
                {section.completed ? '✓' : index + 1}
              </button>
              <span className={`ml-2 text-sm font-medium ${
                currentSection === section.key ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {section.label}
              </span>
              {index < sections.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  section.completed ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        {/* Quality Score Indicator */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-blue-900">Application Quality Score</h3>
            <span className={`text-2xl font-bold ${
              formData.qualityScore.overall >= 80 ? 'text-green-600' :
              formData.qualityScore.overall >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {Math.round(formData.qualityScore.overall)}%
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                formData.qualityScore.overall >= 80 ? 'bg-green-500' :
                formData.qualityScore.overall >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(100, formData.qualityScore.overall)}%` }}
            />
          </div>
          <p className="text-xs text-blue-700 mt-2">
            {formData.qualityScore.sectionsCompleted.length}/4 sections completed
          </p>
        </div>
      </div>
    );
  };

  const renderPersonalInfoSection = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              value={formData.personalInfo.firstName}
              onChange={(e) => updateFormData('personalInfo', { firstName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your first name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              value={formData.personalInfo.lastName}
              onChange={(e) => updateFormData('personalInfo', { lastName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your last name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.personalInfo.email}
              onChange={(e) => updateFormData('personalInfo', { email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.personalInfo.phone}
              onChange={(e) => updateFormData('personalInfo', { phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nationality *
            </label>
            <select
              value={formData.personalInfo.nationality}
              onChange={(e) => updateFormData('personalInfo', { nationality: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select nationality</option>
              {COUNTRIES.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Country of Residence
            </label>
            <select
              value={formData.personalInfo.currentCountry}
              onChange={(e) => updateFormData('personalInfo', { currentCountry: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select current country</option>
              {COUNTRIES.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEducationSection = () => (
    <div className="space-y-6">
      {/* Medical Degree */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Degree</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Degree Type *
            </label>
            <select
              value={formData.medicalEducation.medicalDegree.degree}
              onChange={(e) => updateFormData('medicalEducation', { 
                medicalDegree: { ...formData.medicalEducation.medicalDegree, degree: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select degree type</option>
              <option value="MD">MD (Doctor of Medicine)</option>
              <option value="MBBS">MBBS (Bachelor of Medicine, Bachelor of Surgery)</option>
              <option value="DO">DO (Doctor of Osteopathic Medicine)</option>
              <option value="MBChB">MBChB (Bachelor of Medicine, Bachelor of Surgery)</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institution *
            </label>
            <input
              type="text"
              value={formData.medicalEducation.medicalDegree.institution}
              onChange={(e) => updateFormData('medicalEducation', { 
                medicalDegree: { ...formData.medicalEducation.medicalDegree, institution: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Harvard Medical School"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <select
              value={formData.medicalEducation.medicalDegree.country}
              onChange={(e) => updateFormData('medicalEducation', { 
                medicalDegree: { ...formData.medicalEducation.medicalDegree, country: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select country</option>
              {COUNTRIES.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Graduation Year *
            </label>
            <input
              type="number"
              min="1950"
              max={new Date().getFullYear()}
              value={formData.medicalEducation.medicalDegree.graduationYear}
              onChange={(e) => updateFormData('medicalEducation', { 
                medicalDegree: { ...formData.medicalEducation.medicalDegree, graduationYear: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="2020"
            />
          </div>
        </div>
      </div>

      {/* Residency Training */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Residency Training</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialty
            </label>
            <select
              value={formData.medicalEducation.residency.specialty}
              onChange={(e) => updateFormData('medicalEducation', { 
                residency: { ...formData.medicalEducation.residency, specialty: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select specialty</option>
              {SPECIALTIES.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institution
            </label>
            <input
              type="text"
              value={formData.medicalEducation.residency.institution}
              onChange={(e) => updateFormData('medicalEducation', { 
                residency: { ...formData.medicalEducation.residency, institution: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Johns Hopkins Hospital"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Year
            </label>
            <input
              type="number"
              min="1950"
              max={new Date().getFullYear()}
              value={formData.medicalEducation.residency.startYear}
              onChange={(e) => updateFormData('medicalEducation', { 
                residency: { ...formData.medicalEducation.residency, startYear: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="2020"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Year
            </label>
            <input
              type="number"
              min="1950"
              max={new Date().getFullYear() + 10}
              value={formData.medicalEducation.residency.endYear}
              onChange={(e) => updateFormData('medicalEducation', { 
                residency: { ...formData.medicalEducation.residency, endYear: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="2024"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfessionalSection = () => (
    <div className="space-y-6">
      {/* Current Position */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Professional Position</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Position *
            </label>
            <input
              type="text"
              value={formData.professionalInfo.currentPosition}
              onChange={(e) => updateFormData('professionalInfo', { currentPosition: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Senior Physician, Attending Physician, etc."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institution *
            </label>
            <input
              type="text"
              value={formData.professionalInfo.currentInstitution}
              onChange={(e) => updateFormData('professionalInfo', { currentInstitution: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Mayo Clinic, NHS Trust, etc."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Years of Practice *
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={formData.professionalInfo.yearsPractice}
              onChange={(e) => updateFormData('professionalInfo', { yearsPractice: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="10"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date (Current Position)
            </label>
            <input
              type="date"
              value={formData.professionalInfo.startDate}
              onChange={(e) => updateFormData('professionalInfo', { startDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Publications & Research */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Publications & Research</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Publications
            </label>
            <input
              type="number"
              min="0"
              value={formData.professionalInfo.publications.totalCount}
              onChange={(e) => updateFormData('professionalInfo', { 
                publications: { ...formData.professionalInfo.publications, totalCount: parseInt(e.target.value) || 0 }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="25"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Peer-Reviewed Publications
            </label>
            <input
              type="number"
              min="0"
              value={formData.professionalInfo.publications.peerReviewed}
              onChange={(e) => updateFormData('professionalInfo', { 
                publications: { ...formData.professionalInfo.publications, peerReviewed: parseInt(e.target.value) || 0 }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="20"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.professionalInfo.research.clinicalTrials}
              onChange={(e) => updateFormData('professionalInfo', { 
                research: { ...formData.professionalInfo.research, clinicalTrials: e.target.checked }
              })}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">I have participated in clinical trials</span>
          </label>
        </div>

        <div className="mt-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.professionalInfo.teaching.teachingRole}
              onChange={(e) => updateFormData('professionalInfo', { 
                teaching: { ...formData.professionalInfo.teaching, teachingRole: e.target.checked }
              })}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">I have teaching responsibilities</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderLicensingSection = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical License</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              License Number *
            </label>
            <input
              type="text"
              value={formData.licensingInfo.medicalLicense.licenseNumber}
              onChange={(e) => updateFormData('licensingInfo', { 
                medicalLicense: { ...formData.licensingInfo.medicalLicense, licenseNumber: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="License number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issuing Country *
            </label>
            <select
              value={formData.licensingInfo.medicalLicense.issuingCountry}
              onChange={(e) => updateFormData('licensingInfo', { 
                medicalLicense: { ...formData.licensingInfo.medicalLicense, issuingCountry: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select country</option>
              {COUNTRIES.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issue Date
            </label>
            <input
              type="date"
              value={formData.licensingInfo.medicalLicense.issueDate}
              onChange={(e) => updateFormData('licensingInfo', { 
                medicalLicense: { ...formData.licensingInfo.medicalLicense, issueDate: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiration Date
            </label>
            <input
              type="date"
              value={formData.licensingInfo.medicalLicense.expirationDate}
              onChange={(e) => updateFormData('licensingInfo', { 
                medicalLicense: { ...formData.licensingInfo.medicalLicense, expirationDate: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.licensingInfo.malpracticeInsurance.hasInsurance}
              onChange={(e) => updateFormData('licensingInfo', { 
                malpracticeInsurance: { ...formData.licensingInfo.malpracticeInsurance, hasInsurance: e.target.checked }
              })}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">I have current malpractice insurance</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'personal':
        return renderPersonalInfoSection();
      case 'education':
        return renderEducationSection();
      case 'professional':
        return renderProfessionalSection();
      case 'licensing':
        return renderLicensingSection();
      default:
        return null;
    }
  };

  const canProceed = () => {
    return formData.qualityScore.overall >= 60 && formData.qualityScore.sectionsCompleted.length >= 3;
  };

  const handleNext = () => {
    if (!canProceed()) {
      alert('Please complete at least 3 sections with a minimum 60% quality score to proceed.');
      return;
    }
    onNext(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Manual Application Entry
        </h2>
        <p className="text-lg text-gray-600">
          Please provide detailed information about your medical background, education, and professional experience.
        </p>
      </div>

      {renderSectionProgress()}
      {renderCurrentSection()}

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={onPrev}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
        >
          ← Previous Step
        </button>

        <div className="flex gap-4">
          {currentSection !== 'licensing' && (
            <button
              onClick={() => {
                const sections: FormSection[] = ['personal', 'education', 'professional', 'licensing'];
                const currentIndex = sections.indexOf(currentSection);
                if (currentIndex < sections.length - 1) {
                  setCurrentSection(sections[currentIndex + 1]);
                }
              }}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
            >
              Next Section →
            </button>
          )}
          
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              canProceed()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue to Documents →
          </button>
        </div>
      </div>
    </div>
  );
}