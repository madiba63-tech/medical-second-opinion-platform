'use client';

import { useState, useEffect } from 'react';
import AIDataReview from './AIDataReview';
import CertificateUpload from './CertificateUpload';

interface ExperienceStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ExperienceStep({ data, onUpdate, onNext, onPrev }: ExperienceStepProps) {
  const [aiDataApproved, setAiDataApproved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [extractedExperienceData, setExtractedExperienceData] = useState({
    yearsPractice: 8,
    currentAffiliation: 'Boston Medical Center, Department of Oncology',
    currentPosition: 'Senior Attending Physician',
    subspecialties: ['Breast Cancer', 'Lung Cancer', 'Gastrointestinal Oncology'],
    annualPatientLoad: 450,
    previousSecondOpinions: 125,
    practiceSettings: ['Academic Medical Center', 'Hospital-based Practice'],
    specialProcedures: [
      'Chemotherapy administration and monitoring',
      'Immunotherapy protocols',
      'Clinical trial management',
      'Multidisciplinary tumor board participation'
    ],
    workExperience: [
      {
        institution: 'Boston Medical Center',
        position: 'Senior Attending Physician',
        startDate: '2018-07',
        endDate: 'Present',
        responsibilities: 'Leading oncology patient care, clinical research, teaching'
      },
      {
        institution: 'Dana-Farber Cancer Institute',
        position: 'Clinical Fellow',
        startDate: '2016-07',
        endDate: '2018-07',
        responsibilities: 'Subspecialty training in medical oncology'
      }
    ]
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const experienceSchema = [
    {
      key: 'yearsPractice',
      label: 'Years of Independent Practice',
      type: 'number' as const,
      required: true,
      placeholder: 'e.g., 8'
    },
    {
      key: 'currentAffiliation',
      label: 'Current Primary Affiliation',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Boston Medical Center, Department of Oncology'
    },
    {
      key: 'currentPosition',
      label: 'Current Position/Title',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Senior Attending Physician'
    },
    {
      key: 'subspecialties',
      label: 'Oncology Subspecialties',
      type: 'array' as const,
      required: true,
      placeholder: 'e.g., Breast Cancer, Lung Cancer'
    },
    {
      key: 'annualPatientLoad',
      label: 'Annual Patient Volume',
      type: 'number' as const,
      required: true,
      placeholder: 'e.g., 450'
    },
    {
      key: 'previousSecondOpinions',
      label: 'Previous Second Opinions Provided',
      type: 'number' as const,
      placeholder: 'e.g., 125'
    },
    {
      key: 'practiceSettings',
      label: 'Practice Settings',
      type: 'array' as const,
      placeholder: 'e.g., Academic Medical Center, Private Practice'
    },
    {
      key: 'specialProcedures',
      label: 'Special Procedures & Skills',
      type: 'array' as const,
      placeholder: 'e.g., Chemotherapy administration, Clinical trials'
    }
  ];

  const handleExperienceDataUpdate = (updatedData: any) => {
    setExtractedExperienceData(updatedData);
    onUpdate({
      yearsPractice: updatedData.yearsPractice,
      currentAffiliation: updatedData.currentAffiliation,
      subspecialties: updatedData.subspecialties,
      annualPatientLoad: updatedData.annualPatientLoad,
      previousSecondOpinions: updatedData.previousSecondOpinions,
      workExperience: updatedData.workExperience
    });
  };

  const handleExperienceDataApproval = () => {
    setAiDataApproved(true);
  };

  const handleCertificateUpload = (certificateType: string, files: any[]) => {
    onUpdate({ [certificateType]: files });
  };

  const handleSubmit = () => {
    if (!aiDataApproved) {
      alert('Please review and approve the AI-extracted experience data before proceeding.');
      return;
    }
    onNext();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Experience</h2>
          <p className="text-gray-600">
            Reviewing your professional experience from uploaded documents.
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">AI is analyzing your experience...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Experience</h2>
        <p className="text-gray-600">
          Review your AI-extracted professional experience and upload supporting documents.
        </p>
      </div>

      <AIDataReview
        title="💼 AI-Extracted Experience Data"
        extractedData={extractedExperienceData}
        onUpdate={handleExperienceDataUpdate}
        onApprove={handleExperienceDataApproval}
        schema={experienceSchema}
      />

      <div className="grid gap-6">
        <CertificateUpload
          title="Curriculum Vitae (CV)"
          description="Upload your most current CV or resume"
          acceptedTypes={['application/pdf']}
          uploadedFiles={data.cv || []}
          onUpload={(files) => handleCertificateUpload('cv', files)}
          required={true}
          maxFiles={1}
        />

        <CertificateUpload
          title="Hospital Privileges Documentation"
          description="Upload documentation of current hospital privileges"
          acceptedTypes={['application/pdf', 'image/jpeg', 'image/png']}
          uploadedFiles={data.hospitalPrivileges || []}
          onUpload={(files) => handleCertificateUpload('hospitalPrivileges', files)}
          maxFiles={3}
        />

        <CertificateUpload
          title="Employment Verification"
          description="Upload letter of employment or appointment from current institution"
          acceptedTypes={['application/pdf', 'image/jpeg', 'image/png']}
          uploadedFiles={data.employmentVerification || []}
          onUpload={(files) => handleCertificateUpload('employmentVerification', files)}
          maxFiles={2}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Step 4 Progress</h4>
            <p className="text-sm text-blue-700 mt-1">
              {aiDataApproved ? '✅ Experience data approved' : '⏳ Please review and approve experience data'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Back to Licensing
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Continue to Research
        </button>
      </div>
    </div>
  );
}
