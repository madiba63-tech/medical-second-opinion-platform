'use client';

import { useState, useEffect, useCallback } from 'react';
import ProfessionalLayout from '@/components/professional/ProfessionalLayout';
import IdentityContactStep from '@/components/recruitment/IdentityContactStep';
import EducationTrainingStep from '@/components/recruitment/EducationTrainingStep';
import LicensingStep from '@/components/recruitment/LicensingStep';
import ProfessionalExperienceStep from '@/components/recruitment/ProfessionalExperienceStep';
import ResearchAcademicStep from '@/components/recruitment/ResearchAcademicStep';
import ProfessionalRecognitionStep from '@/components/recruitment/ProfessionalRecognitionStep';
import ComplianceStep from '@/components/recruitment/ComplianceStep';
import ReviewConfirmStep from '@/components/recruitment/ReviewConfirmStep';
import CompetencyAssessmentStep from '@/components/recruitment/CompetencyAssessmentStep';

interface ApplicationData {
  // Step 1: Identity & Contact Info
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  email: string;
  phone?: string;
  governmentId?: File | null;

  // Step 2: Education & Training
  medicalDegree?: File | null;
  residencyCompletion?: File | null;
  fellowshipTraining?: File | null;
  boardCertification?: File | null;
  boardCertificationNumber?: string;
  additionalDiplomas?: File[];

  // Step 3: Licensing
  medicalLicenseNumber: string;
  licenseCountry: string;
  licenseState?: string;
  licenseExpiry: string;
  licenseCertificate?: File | null;
  goodStandingCertificate?: File | null;

  // Step 4: Professional Experience
  yearsIndependentPractice: number;
  currentAffiliation: string;
  cv?: File | null;
  subspecialties: string[];
  annualPatientLoad?: number;
  secondOpinionsGiven?: number;

  // Step 5: Research & Academic Contributions
  peerReviewedPublications: number;
  publications?: File[];
  clinicalTrialInvolvement: boolean;
  clinicalTrialDetails?: string;
  conferencePresentations: boolean;
  conferenceDetails?: string;
  teachingRoles: boolean;
  teachingDetails?: string;

  // Step 6: Professional Recognition
  oncologySocieties: string[];
  awardsHonors?: string;
  leadershipRoles?: string;

  // Step 7: Good Standing & Compliance
  professionalReferences: Array<{
    name: string;
    email: string;
    phone: string;
    relationship: string;
  }>;
  malpracticeInsurance?: File | null;
  noActiveDisciplinary: boolean;
  dataProtectionAgreed: boolean;
}

export default function RecruitmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    email: '',
    medicalLicenseNumber: '',
    licenseCountry: '',
    licenseExpiry: '',
    yearsIndependentPractice: 0,
    currentAffiliation: '',
    subspecialties: [],
    peerReviewedPublications: 0,
    clinicalTrialInvolvement: false,
    conferencePresentations: false,
    teachingRoles: false,
    oncologySocieties: [],
    professionalReferences: [
      { name: '', email: '', phone: '', relationship: '' },
      { name: '', email: '', phone: '', relationship: '' }
    ],
    noActiveDisciplinary: false,
    dataProtectionAgreed: false
  });
  const [competencyResult, setCompetencyResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiPrepopulated, setAiPrepopulated] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<any>({});

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 9));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const goToStep = (step: number) => setCurrentStep(step);

  const updateApplicationData = useCallback((data: Partial<ApplicationData>) => {
    setApplicationData(prev => ({ ...prev, ...data }));
  }, []);

  // Track uploaded documents for the review step
  const trackUploadedDocument = useCallback((fieldName: string, file: File) => {
    setUploadedDocuments(prev => ({ ...prev, [fieldName]: file }));
  }, []);

  // AI Document Pre-population
  const handleAiPrepopulation = async (files: File[], email: string) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      
      files.forEach((file, index) => {
        // Determine field name based on file name or type
        let fieldName = 'cv'; // default
        const fileName = file.name.toLowerCase();
        
        if (fileName.includes('cv') || fileName.includes('resume')) fieldName = 'cv';
        else if (fileName.includes('license')) fieldName = 'license_certificate';
        else if (fileName.includes('degree')) fieldName = 'medical_degree';
        else if (fileName.includes('board')) fieldName = 'board_certification';
        else if (fileName.includes('residency')) fieldName = 'residency_certificate';
        else if (fileName.includes('fellowship')) fieldName = 'fellowship_certificate';
        
        formData.append(fieldName, file);
        trackUploadedDocument(fieldName, file);
      });

      const response = await fetch('http://localhost:4004/api/v1/candidates/ai-prepopulate', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Merge AI-extracted data with current application data
          updateApplicationData({
            ...result.data.prepopulatedApplication,
            email: email // Ensure email is preserved
          });
          setAiPrepopulated(true);
          setAiAnalysis(result.data.aiAnalysis);
          return result.data.aiAnalysis;
        }
      }
      throw new Error('AI prepopulation failed');
    } catch (error) {
      console.error('AI prepopulation error:', error);
      throw error;
    }
  };

  // Submit complete application
  const submitApplication = async () => {
    try {
      setIsSubmitting(true);

      // Convert application data to the format expected by the recruitment service
      const submissionData = {
        // Step 1: Identity & Contact Info
        firstName: applicationData.firstName,
        middleName: applicationData.middleName,
        lastName: applicationData.lastName,
        dateOfBirth: applicationData.dateOfBirth,
        nationality: applicationData.nationality,
        email: applicationData.email,
        phone: applicationData.phone,

        // Step 3: Licensing
        medicalLicenseNumber: applicationData.medicalLicenseNumber,
        licenseCountry: applicationData.licenseCountry,
        licenseState: applicationData.licenseState,
        licenseExpiry: applicationData.licenseExpiry,

        // Step 4: Professional Experience
        yearsIndependentPractice: applicationData.yearsIndependentPractice,
        currentAffiliation: applicationData.currentAffiliation,
        subspecialties: applicationData.subspecialties,
        annualPatientLoad: applicationData.annualPatientLoad,
        secondOpinionsGiven: applicationData.secondOpinionsGiven,

        // Step 5: Research & Academic
        peerReviewedPublications: applicationData.peerReviewedPublications,
        clinicalTrialInvolvement: applicationData.clinicalTrialInvolvement,
        clinicalTrialDetails: applicationData.clinicalTrialDetails,
        conferencepresentations: applicationData.conferencePresentations,
        conferenceDetails: applicationData.conferenceDetails,
        teachingRoles: applicationData.teachingRoles,
        teachingDetails: applicationData.teachingDetails,

        // Step 6: Professional Recognition
        oncologySocieties: applicationData.oncologySocieties,
        awardsHonors: applicationData.awardsHonors,
        leadershipRoles: applicationData.leadershipRoles,

        // Step 7: Compliance
        professionalReferences: applicationData.professionalReferences,
        noActiveDisciplinary: applicationData.noActiveDisciplinary,
        dataProtectionAgreed: applicationData.dataProtectionAgreed,

        // Step 2: Education & Training
        boardCertificationNumber: applicationData.boardCertificationNumber
      };

      const response = await fetch('http://localhost:3004/api/v1/candidates/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setCompetencyResult(result.data.competencyAssessment);
          
          // Upload documents if any
          await uploadDocuments(result.data.candidateId);
          
          nextStep(); // Go to competency assessment step
        } else {
          throw new Error(result.error || 'Application submission failed');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Application submission failed');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      alert(`Application submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Upload documents for the candidate
  const uploadDocuments = async (candidateId: string) => {
    const formData = new FormData();
    const documentMappings = [
      { field: 'governmentId', name: 'government_id' },
      { field: 'medicalDegree', name: 'medical_degree' },
      { field: 'residencyCompletion', name: 'residency_certificate' },
      { field: 'fellowshipTraining', name: 'fellowship_certificate' },
      { field: 'boardCertification', name: 'board_certification' },
      { field: 'licenseCertificate', name: 'license_certificate' },
      { field: 'goodStandingCertificate', name: 'good_standing' },
      { field: 'cv', name: 'cv' },
      { field: 'malpracticeInsurance', name: 'malpractice_insurance' }
    ];

    let hasFiles = false;

    documentMappings.forEach(mapping => {
      const file = applicationData[mapping.field as keyof ApplicationData] as File;
      if (file instanceof File) {
        formData.append(mapping.name, file);
        hasFiles = true;
      }
    });

    // Handle additional diplomas
    if (applicationData.additionalDiplomas) {
      applicationData.additionalDiplomas.forEach((file, index) => {
        formData.append(`additional_diploma_${index}`, file);
        hasFiles = true;
      });
    }

    // Handle publications
    if (applicationData.publications) {
      applicationData.publications.forEach((file, index) => {
        formData.append(`publication_${index + 1}`, file);
        hasFiles = true;
      });
    }

    if (hasFiles) {
      try {
        const response = await fetch(`http://localhost:3004/api/v1/candidates/${candidateId}/documents`, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          console.error('Document upload failed:', response.statusText);
        }
      } catch (error) {
        console.error('Document upload error:', error);
      }
    }
  };

  return (
    <ProfessionalLayout>
      <div>
        {/* Progress Bar */}

        {/* Progress Bar */}
        <div className="mb-6 lg:mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Application Progress</h3>
              <span className="text-sm text-gray-500">
                Step {currentStep} of 9
              </span>
            </div>
            
            {/* Mobile Progress Bar */}
            <div className="block sm:hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  {(() => {
                    const steps = [
                      'Identity & Contact',
                      'Education & Training', 
                      'Licensing',
                      'Professional Experience',
                      'Research & Academic',
                      'Professional Recognition',
                      'Compliance',
                      'Review & Confirm',
                      'Competency Assessment'
                    ];
                    return steps[currentStep - 1];
                  })()}
                </span>
                <span className="text-xs text-gray-500">
                  {Math.round((currentStep / 9) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / 9) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Desktop Progress Steps */}
            <div className="hidden sm:block">
              <div className="relative flex justify-between items-center">
                {[
                  { step: 1, title: 'Identity & Contact' },
                  { step: 2, title: 'Education & Training' },
                  { step: 3, title: 'Licensing' },
                  { step: 4, title: 'Experience' },
                  { step: 5, title: 'Research' },
                  { step: 6, title: 'Recognition' },
                  { step: 7, title: 'Compliance' },
                  { step: 8, title: 'Review & Confirm' },
                  { step: 9, title: 'Assessment' }
                ].map((item, index, array) => (
                  <div key={item.step} className="flex flex-col items-center flex-1 relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      currentStep >= item.step 
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg' 
                        : currentStep === item.step - 1
                        ? 'bg-blue-100 text-blue-600 border-2 border-blue-200'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {currentStep >= item.step ? '✓' : item.step}
                    </div>
                    <span className={`mt-2 text-xs text-center font-medium px-1 ${
                      currentStep >= item.step ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {item.title}
                    </span>
                    {index < array.length - 1 && (
                      <div className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 transition-colors duration-300 ${
                        currentStep > item.step ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {aiPrepopulated && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center text-sm text-green-800">
                  <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">AI Pre-population Active:</span>
                  <span className="ml-1">Your documents have been analyzed and relevant fields have been pre-filled. Please review and confirm all information.</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="max-w-2xl mx-auto">
            {currentStep === 1 && (
              <IdentityContactStep
                data={applicationData}
                onUpdate={updateApplicationData}
                onNext={nextStep}
                onAiPrepopulate={handleAiPrepopulation}
              />
            )}
            
            {currentStep === 2 && (
              <EducationTrainingStep
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
              <ProfessionalExperienceStep
                data={applicationData}
                onUpdate={updateApplicationData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            
            {currentStep === 5 && (
              <ResearchAcademicStep
                data={applicationData}
                onUpdate={updateApplicationData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            
            {currentStep === 6 && (
              <ProfessionalRecognitionStep
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
                onSubmit={nextStep}
                onPrev={prevStep}
                isSubmitting={false}
              />
            )}
            
            {currentStep === 8 && (
              <ReviewConfirmStep
                applicationData={applicationData}
                aiAnalysis={aiAnalysis}
                uploadedDocuments={uploadedDocuments}
                onNext={submitApplication}
                onPrev={prevStep}
                onEdit={goToStep}
              />
            )}
            
            {currentStep === 9 && (
              <CompetencyAssessmentStep
                competencyResult={competencyResult}
                applicationData={applicationData}
              />
            )}
          </div>
        </div>

      </div>
    </ProfessionalLayout>
  );
}