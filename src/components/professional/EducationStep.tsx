'use client';

import { useState, useEffect } from 'react';
import AIDataReview from './AIDataReview';
import CertificateUpload from './CertificateUpload';

interface EducationStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function EducationStep({ data, onUpdate, onNext, onPrev }: EducationStepProps) {
  const [aiDataApproved, setAiDataApproved] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock AI extracted education data - in production this would come from the CV analysis
  const [extractedEducationData, setExtractedEducationData] = useState({
    medicalDegree: {
      institution: 'Harvard Medical School',
      year: '2010',
      degree: 'MD'
    },
    residency: {
      institution: 'Massachusetts General Hospital',
      specialty: 'Internal Medicine',
      startYear: '2010',
      endYear: '2013'
    },
    fellowship: {
      institution: 'Dana-Farber Cancer Institute',
      specialty: 'Medical Oncology',
      startYear: '2013',
      endYear: '2016'
    },
    boardCertification: {
      board: 'American Board of Internal Medicine',
      specialty: 'Medical Oncology',
      number: 'ABIM-123456',
      year: '2016'
    },
    additionalTraining: [
      'Clinical Research Fellowship - Harvard T.H. Chan School of Public Health (2015)',
      'Advanced Molecular Diagnostics Course - Memorial Sloan Kettering (2017)'
    ]
  });

  useEffect(() => {
    // Simulate loading AI extracted data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const educationSchema = [
    {
      key: 'medicalDegree.institution',
      label: 'Medical School',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Harvard Medical School'
    },
    {
      key: 'medicalDegree.degree',
      label: 'Degree Type',
      type: 'select' as const,
      required: true,
      options: ['MD', 'MBBS', 'DO', 'Other']
    },
    {
      key: 'medicalDegree.year',
      label: 'Graduation Year',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., 2010'
    },
    {
      key: 'residency.institution',
      label: 'Residency Institution',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Massachusetts General Hospital'
    },
    {
      key: 'residency.specialty',
      label: 'Residency Specialty',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Internal Medicine'
    },
    {
      key: 'residency.startYear',
      label: 'Residency Start Year',
      type: 'text' as const,
      required: true
    },
    {
      key: 'residency.endYear',
      label: 'Residency End Year',
      type: 'text' as const,
      required: true
    },
    {
      key: 'fellowship.institution',
      label: 'Fellowship Institution',
      type: 'text' as const,
      placeholder: 'e.g., Dana-Farber Cancer Institute'
    },
    {
      key: 'fellowship.specialty',
      label: 'Fellowship Specialty',
      type: 'text' as const,
      placeholder: 'e.g., Medical Oncology'
    },
    {
      key: 'fellowship.startYear',
      label: 'Fellowship Start Year',
      type: 'text' as const
    },
    {
      key: 'fellowship.endYear',
      label: 'Fellowship End Year',
      type: 'text' as const
    },
    {
      key: 'boardCertification.board',
      label: 'Certifying Board',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., American Board of Internal Medicine'
    },
    {
      key: 'boardCertification.specialty',
      label: 'Board Certification Specialty',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Medical Oncology'
    },
    {
      key: 'boardCertification.number',
      label: 'Board Certification Number',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., ABIM-123456'
    },
    {
      key: 'boardCertification.year',
      label: 'Board Certification Year',
      type: 'text' as const,
      required: true
    },
    {
      key: 'additionalTraining',
      label: 'Additional Training & Certifications',
      type: 'array' as const,
      placeholder: 'e.g., Clinical Research Fellowship, Advanced Course'
    }
  ];

  const handleEducationDataUpdate = (updatedData: any) => {
    setExtractedEducationData(updatedData);
    onUpdate({
      medicalDegree: updatedData.medicalDegree,
      residency: updatedData.residency,
      fellowship: updatedData.fellowship,
      boardCertification: updatedData.boardCertification,
      additionalTraining: updatedData.additionalTraining
    });
  };

  const handleEducationDataApproval = () => {
    setAiDataApproved(true);
  };

  const handleCertificateUpload = (certificateType: string, files: any[]) => {
    onUpdate({ [certificateType]: files });
  };

  const handleSubmit = () => {
    if (!aiDataApproved) {
      alert('Please review and approve the AI-extracted education data before proceeding.');
      return;
    }
    
    onNext();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Education & Training</h2>
          <p className="text-gray-600">
            Reviewing your medical education and training information from uploaded documents.
          </p>
        </div>

        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">AI is analyzing your education documents...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Education & Training</h2>
        <p className="text-gray-600">
          Review the AI-extracted education information and upload supporting certificates.
        </p>
      </div>

      {/* AI Data Review Section */}
      <AIDataReview
        title="🎓 AI-Extracted Education Data"
        extractedData={extractedEducationData}
        onUpdate={handleEducationDataUpdate}
        onApprove={handleEducationDataApproval}
        schema={educationSchema}
      />

      {/* Certificate Upload Sections */}
      <div className="grid gap-6">
        <CertificateUpload
          title="Medical Degree Certificate"
          description="Upload your medical degree diploma or certificate"
          acceptedTypes={['application/pdf', 'image/jpeg', 'image/png']}
          uploadedFiles={data.medicalDegree || []}
          onUpload={(files) => handleCertificateUpload('medicalDegree', files)}
          required={true}
          maxFiles={2}
        />

        <CertificateUpload
          title="Residency Certificate"
          description="Upload your residency completion certificate"
          acceptedTypes={['application/pdf', 'image/jpeg', 'image/png']}
          uploadedFiles={data.residencyCertificate || []}
          onUpload={(files) => handleCertificateUpload('residencyCertificate', files)}
          required={true}
          maxFiles={2}
        />

        <CertificateUpload
          title="Fellowship Certificate"
          description="Upload your fellowship completion certificate (if applicable)"
          acceptedTypes={['application/pdf', 'image/jpeg', 'image/png']}
          uploadedFiles={data.fellowshipCertificate || []}
          onUpload={(files) => handleCertificateUpload('fellowshipCertificate', files)}
          maxFiles={2}
        />

        <CertificateUpload
          title="Board Certification"
          description="Upload your current board certification certificate"
          acceptedTypes={['application/pdf', 'image/jpeg', 'image/png']}
          uploadedFiles={data.boardCertification?.certificate || []}
          onUpload={(files) => handleCertificateUpload('boardCertification', { certificate: files, number: data.boardCertification?.number || '' })}
          required={true}
          maxFiles={2}
        />

        <CertificateUpload
          title="Additional Certificates"
          description="Upload any additional training certificates, CME certificates, or other relevant qualifications"
          acceptedTypes={['application/pdf', 'image/jpeg', 'image/png']}
          uploadedFiles={data.additionalCertificates || []}
          onUpload={(files) => handleCertificateUpload('additionalCertificates', files)}
          maxFiles={10}
        />
      </div>

      {/* Progress Indicator */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Step 2 Progress</h4>
            <p className="text-sm text-blue-700 mt-1">
              {aiDataApproved ? '✅ Education data approved' : '⏳ Please review and approve education data'} • 
              Upload required certificates to proceed
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Back to Identity
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Continue to Licensing
        </button>
      </div>
    </div>
  );
}
