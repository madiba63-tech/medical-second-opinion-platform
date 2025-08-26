'use client';

import { useState } from 'react';
import IdentityStep from '@/components/professional/IdentityStep';
import EducationStep from '@/components/professional/EducationStep';
import LicensingStep from '@/components/professional/LicensingStep';
import ExperienceStep from '@/components/professional/ExperienceStep';
import ResearchStep from '@/components/professional/ResearchStep';
import RecognitionStep from '@/components/professional/RecognitionStep';
import ComplianceStep from '@/components/professional/ComplianceStep';
import AssessmentStep from '@/components/professional/AssessmentStep';

interface ApplicationData {
  // Step 1: Identity & Contact
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  nationality: string;
  email: string;
  phone: string;
  governmentId: any;

  // Step 2: Education & Training
  medicalDegree: any;
  residencyCertificate: any;
  fellowshipCertificate: any;
  boardCertification: {
    number: string;
    certificate: any;
  };
  additionalCertificates: any[];

  // Step 3: Licensing
  licenseNumber: string;
  licenseCountry: string;
  licenseExpiry: string;
  licenseCertificate: any;
  goodStandingCertificate: any;

  // Step 4: Professional Experience
  yearsPractice: number;
  currentAffiliation: string;
  cv: any;
  subspecialties: string[];
  annualPatientLoad: number;
  previousSecondOpinions: number;

  // Step 5: Research & Academic
  publications: number;
  representativePublications: any[];
  clinicalTrials: {
    involved: boolean;
    description: string;
  };
  conferencePresentations: {
    involved: boolean;
    details: string;
  };
  teachingRoles: {
    involved: boolean;
    details: string;
  };

  // Step 6: Professional Recognition
  societyMemberships: string[];
  awards: string;
  leadershipRoles: string;

  // Step 7: Good Standing & Compliance
  references: Array<{
    name: string;
    email: string;
    phone: string;
    relationship: string;
  }>;
  malpracticeInsurance: any;
  noDisciplinaryProceedings: boolean;
  dataProtectionAgreement: boolean;
}

export default function ProfessionalApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    // Initialize with empty values
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    nationality: '',
    email: '',
    phone: '',
    governmentId: null,
    medicalDegree: null,
    residencyCertificate: null,
    fellowshipCertificate: null,
    boardCertification: { number: '', certificate: null },
    additionalCertificates: [],
    licenseNumber: '',
    licenseCountry: '',
    licenseExpiry: '',
    licenseCertificate: null,
    goodStandingCertificate: null,
    yearsPractice: 0,
    currentAffiliation: '',
    cv: null,
    subspecialties: [],
    annualPatientLoad: 0,
    previousSecondOpinions: 0,
    publications: 0,
    representativePublications: [],
    clinicalTrials: { involved: false, description: '' },
    conferencePresentations: { involved: false, details: '' },
    teachingRoles: { involved: false, details: '' },
    societyMemberships: [],
    awards: '',
    leadershipRoles: '',
    references: [
      { name: '', email: '', phone: '', relationship: '' },
      { name: '', email: '', phone: '', relationship: '' }
    ],
    malpracticeInsurance: null,
    noDisciplinaryProceedings: false,
    dataProtectionAgreement: false,
  });

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const updateApplicationData = (data: Partial<ApplicationData>) => {
    setApplicationData(prev => ({ ...prev, ...data }));
  };

  const steps = [
    { step: 1, title: 'Identity & Contact' },
    { step: 2, title: 'Education & Training' },
    { step: 3, title: 'Licensing' },
    { step: 4, title: 'Professional Experience' },
    { step: 5, title: 'Research & Academic' },
    { step: 6, title: 'Professional Recognition' },
    { step: 7, title: 'Good Standing & Compliance' },
    { step: 8, title: 'Competency Assessment' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Onboarding</h1>
          <p className="text-xl text-gray-600">
            Join our network of medical professionals providing second opinions
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((item, index) => (
              <div key={item.step} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep >= item.step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {item.step}
                </div>
                <span className={`mt-2 text-xs text-center font-medium ${
                  currentStep >= item.step ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {item.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block absolute top-5 w-full h-0.5 -z-10 ${
                    currentStep > item.step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} style={{ left: '50%', width: 'calc(100% - 2.5rem)' }}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="max-w-2xl mx-auto">
            {currentStep === 1 && (
              <IdentityStep
                data={applicationData}
                onUpdate={updateApplicationData}
                onNext={nextStep}
              />
            )}

            {currentStep === 2 && (
              <EducationStep
                data={applicationData}
                onUpdate={updateApplicationData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {currentStep === 3 && (
              <LicensingStep
                data={applicationData}
                onUpdate={updateApplicationData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {currentStep === 4 && (
              <ExperienceStep
                data={applicationData}
                onUpdate={updateApplicationData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {currentStep === 5 && (
              <ResearchStep
                data={applicationData}
                onUpdate={updateApplicationData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {currentStep === 6 && (
              <RecognitionStep
                data={applicationData}
                onUpdate={updateApplicationData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {currentStep === 7 && (
              <ComplianceStep
                data={applicationData}
                onUpdate={updateApplicationData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {currentStep === 8 && (
              <AssessmentStep
                data={applicationData}
                onPrev={prevStep}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>🔒 Your application data is encrypted and securely stored. We comply with medical data protection regulations.</p>
        </div>
      </div>
    </div>
  );
}
