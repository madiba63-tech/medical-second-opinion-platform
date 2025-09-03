'use client';

import { useState, useEffect } from 'react';
import AIDataReview from './AIDataReview';
import CertificateUpload from './CertificateUpload';

interface RecognitionStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function RecognitionStep({ data, onUpdate, onNext, onPrev }: RecognitionStepProps) {
  const [aiDataApproved, setAiDataApproved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [extractedRecognitionData, setExtractedRecognitionData] = useState({
    societyMemberships: [
      'American Society of Clinical Oncology (ASCO)',
      'European Society for Medical Oncology (ESMO)',
      'American Association for Cancer Research (AACR)',
      'International Association for the Study of Lung Cancer (IASLC)'
    ],
    awards: [
      'ASCO Young Investigator Award (2019)',
      'Excellence in Teaching Award - Harvard Medical School (2022)',
      'Outstanding Clinical Research Award - Boston Medical Center (2021)'
    ],
    leadershipRoles: [
      'Department Head, Medical Oncology - Boston Medical Center (2020-present)',
      'Chair, Tumor Board Committee - Boston Medical Center (2019-present)',
      'Editorial Board Member - Clinical Cancer Research (2018-present)'
    ],
    honors: [
      'Fellow, American College of Physicians (2018)',
      'Best Doctor Award - Boston Magazine (2020, 2021, 2022)',
      'Top Cancer Doctor - US News & World Report (2021, 2022)'
    ],
    speakingEngagements: [
      'Keynote Speaker - International Breast Cancer Conference (2023)',
      'Invited Speaker - ASCO Annual Meeting (2022, 2021)',
      'Grand Rounds Speaker - Multiple Academic Medical Centers'
    ]
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const recognitionSchema = [
    {
      key: 'societyMemberships',
      label: 'Professional Society Memberships',
      type: 'array' as const,
      required: true,
      placeholder: 'e.g., American Society of Clinical Oncology'
    },
    {
      key: 'awards',
      label: 'Awards and Honors',
      type: 'array' as const,
      placeholder: 'e.g., ASCO Young Investigator Award (Year)'
    },
    {
      key: 'leadershipRoles',
      label: 'Leadership Positions',
      type: 'array' as const,
      placeholder: 'e.g., Department Head, Editorial Board Member'
    },
    {
      key: 'honors',
      label: 'Professional Honors',
      type: 'array' as const,
      placeholder: 'e.g., Fellow of Professional Society'
    },
    {
      key: 'speakingEngagements',
      label: 'Notable Speaking Engagements',
      type: 'array' as const,
      placeholder: 'e.g., Keynote Speaker - Conference Name'
    }
  ];

  const handleRecognitionDataUpdate = (updatedData: any) => {
    setExtractedRecognitionData(updatedData);
    onUpdate({
      societyMemberships: updatedData.societyMemberships,
      awards: updatedData.awards,
      leadershipRoles: updatedData.leadershipRoles,
      honors: updatedData.honors,
      speakingEngagements: updatedData.speakingEngagements
    });
  };

  const handleRecognitionDataApproval = () => {
    setAiDataApproved(true);
  };

  const handleCertificateUpload = (certificateType: string, files: any[]) => {
    onUpdate({ [certificateType]: files });
  };

  const handleSubmit = () => {
    if (!aiDataApproved) {
      alert('Please review and approve the AI-extracted recognition data before proceeding.');
      return;
    }
    onNext();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Recognition</h2>
          <p className="text-gray-600">Reviewing your professional recognition...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">AI is analyzing your professional recognition...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Recognition</h2>
        <p className="text-gray-600">
          Review your AI-extracted professional recognition and upload supporting documents.
        </p>
      </div>

      <AIDataReview
        title="🏆 AI-Extracted Recognition Data"
        extractedData={extractedRecognitionData}
        onUpdate={handleRecognitionDataUpdate}
        onApprove={handleRecognitionDataApproval}
        schema={recognitionSchema}
      />

      <div className="grid gap-6">
        <CertificateUpload
          title="Award Certificates"
          description="Upload certificates for awards and honors received"
          acceptedTypes={['application/pdf', 'image/jpeg', 'image/png']}
          uploadedFiles={data.awardCertificates || []}
          onUpload={(files) => handleCertificateUpload('awardCertificates', files)}
          maxFiles={8}
        />

        <CertificateUpload
          title="Society Membership Certificates"
          description="Upload membership certificates from professional societies"
          acceptedTypes={['application/pdf', 'image/jpeg', 'image/png']}
          uploadedFiles={data.membershipCertificates || []}
          onUpload={(files) => handleCertificateUpload('membershipCertificates', files)}
          maxFiles={10}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Step 6 Progress</h4>
            <p className="text-sm text-blue-700 mt-1">
              {aiDataApproved ? '✅ Recognition data approved' : '⏳ Please review recognition data'}
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
          Back to Research
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Continue to Compliance
        </button>
      </div>
    </div>
  );
}
