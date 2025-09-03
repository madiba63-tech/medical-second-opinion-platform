'use client';

import { useState, useEffect } from 'react';
import AIDataReview from './AIDataReview';
import CertificateUpload from './CertificateUpload';

interface ResearchStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ResearchStep({ data, onUpdate, onNext, onPrev }: ResearchStepProps) {
  const [aiDataApproved, setAiDataApproved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [extractedResearchData, setExtractedResearchData] = useState({
    publications: 47,
    representativePublications: [
      'Novel immunotherapy combinations in metastatic breast cancer - New England Journal of Medicine (2023)',
      'Biomarker-driven treatment selection in lung cancer - Journal of Clinical Oncology (2022)'
    ],
    clinicalTrials: {
      involved: true,
      description: 'Principal Investigator on 8 phase II/III oncology trials focusing on immunotherapy'
    },
    conferencePresentations: {
      involved: true,
      details: 'Regular presenter at ASCO, ESMO, AACR with focus on immunotherapy research'
    },
    teachingRoles: {
      involved: true,
      details: 'Harvard Medical School faculty, supervising residents and fellows'
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const researchSchema = [
    {
      key: 'publications',
      label: 'Total Publications',
      type: 'number' as const,
      required: true,
      placeholder: 'e.g., 47'
    },
    {
      key: 'representativePublications',
      label: 'Representative Publications',
      type: 'array' as const,
      placeholder: 'Title - Journal Name (Year)'
    },
    {
      key: 'clinicalTrials.involved',
      label: 'Involved in Clinical Trials?',
      type: 'boolean' as const,
      required: true
    },
    {
      key: 'clinicalTrials.description',
      label: 'Clinical Trials Description',
      type: 'textarea' as const,
      placeholder: 'Describe your clinical trial experience'
    },
    {
      key: 'conferencePresentations.involved',
      label: 'Conference Presentations?',
      type: 'boolean' as const,
      required: true
    },
    {
      key: 'conferencePresentations.details',
      label: 'Presentation Details',
      type: 'textarea' as const,
      placeholder: 'Describe your conference presentations'
    },
    {
      key: 'teachingRoles.involved',
      label: 'Teaching/Academic Roles?',
      type: 'boolean' as const,
      required: true
    },
    {
      key: 'teachingRoles.details',
      label: 'Teaching Role Details',
      type: 'textarea' as const,
      placeholder: 'Describe your academic positions'
    }
  ];

  const handleResearchDataUpdate = (updatedData: any) => {
    setExtractedResearchData(updatedData);
    onUpdate({
      publications: updatedData.publications,
      representativePublications: updatedData.representativePublications,
      clinicalTrials: updatedData.clinicalTrials,
      conferencePresentations: updatedData.conferencePresentations,
      teachingRoles: updatedData.teachingRoles
    });
  };

  const handleResearchDataApproval = () => {
    setAiDataApproved(true);
  };

  const handleCertificateUpload = (certificateType: string, files: any[]) => {
    onUpdate({ [certificateType]: files });
  };

  const handleSubmit = () => {
    if (!aiDataApproved) {
      alert('Please review and approve the AI-extracted research data before proceeding.');
      return;
    }
    onNext();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Research & Academic</h2>
          <p className="text-gray-600">Reviewing your research background...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">AI is analyzing your research background...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Research & Academic</h2>
        <p className="text-gray-600">
          Review your AI-extracted research information and upload supporting documents.
        </p>
      </div>

      <AIDataReview
        title="🔬 AI-Extracted Research Data"
        extractedData={extractedResearchData}
        onUpdate={handleResearchDataUpdate}
        onApprove={handleResearchDataApproval}
        schema={researchSchema}
      />

      <div className="grid gap-6">
        <CertificateUpload
          title="Representative Publications"
          description="Upload PDFs of your most significant publications (up to 5)"
          acceptedTypes={['application/pdf']}
          uploadedFiles={data.representativePublications || []}
          onUpload={(files) => handleCertificateUpload('representativePublications', files)}
          maxFiles={5}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Step 5 Progress</h4>
            <p className="text-sm text-blue-700 mt-1">
              {aiDataApproved ? '✅ Research data approved' : '⏳ Please review research data'}
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
          Back to Experience
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Continue to Recognition
        </button>
      </div>
    </div>
  );
}
