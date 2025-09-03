'use client';

import { useState, useEffect } from 'react';
import AIDataReview from './AIDataReview';
import CertificateUpload from './CertificateUpload';

interface LicensingStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function LicensingStep({ data, onUpdate, onNext, onPrev }: LicensingStepProps) {
  const [aiDataApproved, setAiDataApproved] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock AI extracted licensing data
  const [extractedLicensingData, setExtractedLicensingData] = useState({
    primaryLicense: {
      licenseNumber: 'MA-987654321',
      licenseCountry: 'United States',
      licenseState: 'Massachusetts',
      issuingAuthority: 'Massachusetts Board of Registration in Medicine',
      issueDate: '2016-07-15',
      expiryDate: '2025-07-15',
      status: 'Active'
    },
    additionalLicenses: [
      {
        licenseNumber: 'NY-123456789',
        licenseCountry: 'United States',
        licenseState: 'New York',
        issuingAuthority: 'New York State Education Department',
        issueDate: '2018-03-20',
        expiryDate: '2025-03-20',
        status: 'Active'
      }
    ],
    deaRegistration: {
      deaNumber: 'BW1234567',
      expiryDate: '2025-08-31',
      scheduleAuthorized: 'II-V'
    },
    npiNumber: '1234567890',
    disciplinaryHistory: {
      hasDisciplinaryActions: false,
      description: 'No disciplinary actions on record'
    }
  });

  useEffect(() => {
    // Simulate loading AI extracted data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const licensingSchema = [
    {
      key: 'primaryLicense.licenseNumber',
      label: 'Primary License Number',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., MA-987654321'
    },
    {
      key: 'primaryLicense.licenseCountry',
      label: 'Country of Primary License',
      type: 'select' as const,
      required: true,
      options: ['United States', 'Canada', 'United Kingdom', 'Germany', 'Australia', 'Other']
    },
    {
      key: 'primaryLicense.licenseState',
      label: 'State/Province of Primary License',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Massachusetts'
    },
    {
      key: 'primaryLicense.issuingAuthority',
      label: 'Issuing Authority',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Massachusetts Board of Registration in Medicine'
    },
    {
      key: 'primaryLicense.issueDate',
      label: 'License Issue Date',
      type: 'text' as const,
      required: true,
      placeholder: 'YYYY-MM-DD'
    },
    {
      key: 'primaryLicense.expiryDate',
      label: 'License Expiry Date',
      type: 'text' as const,
      required: true,
      placeholder: 'YYYY-MM-DD'
    },
    {
      key: 'primaryLicense.status',
      label: 'License Status',
      type: 'select' as const,
      required: true,
      options: ['Active', 'Inactive', 'Suspended', 'Revoked', 'Expired']
    },
    {
      key: 'deaRegistration.deaNumber',
      label: 'DEA Registration Number',
      type: 'text' as const,
      placeholder: 'e.g., BW1234567'
    },
    {
      key: 'deaRegistration.expiryDate',
      label: 'DEA Expiry Date',
      type: 'text' as const,
      placeholder: 'YYYY-MM-DD'
    },
    {
      key: 'deaRegistration.scheduleAuthorized',
      label: 'DEA Schedule Authorized',
      type: 'text' as const,
      placeholder: 'e.g., II-V'
    },
    {
      key: 'npiNumber',
      label: 'NPI Number',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., 1234567890'
    },
    {
      key: 'disciplinaryHistory.hasDisciplinaryActions',
      label: 'Any disciplinary actions or sanctions?',
      type: 'boolean' as const
    },
    {
      key: 'disciplinaryHistory.description',
      label: 'Disciplinary History Details',
      type: 'textarea' as const,
      placeholder: 'If yes, please provide details. If no, enter "No disciplinary actions on record"'
    }
  ];

  const handleLicensingDataUpdate = (updatedData: any) => {
    setExtractedLicensingData(updatedData);
    onUpdate({
      licenseNumber: updatedData.primaryLicense?.licenseNumber,
      licenseCountry: updatedData.primaryLicense?.licenseCountry,
      licenseExpiry: updatedData.primaryLicense?.expiryDate,
      additionalLicenses: updatedData.additionalLicenses,
      deaRegistration: updatedData.deaRegistration,
      npiNumber: updatedData.npiNumber,
      disciplinaryHistory: updatedData.disciplinaryHistory
    });
  };

  const handleLicensingDataApproval = () => {
    setAiDataApproved(true);
  };

  const handleCertificateUpload = (certificateType: string, files: any[]) => {
    onUpdate({ [certificateType]: files });
  };

  const handleSubmit = () => {
    if (!aiDataApproved) {
      alert('Please review and approve the AI-extracted licensing data before proceeding.');
      return;
    }

    // Validate required fields
    if (!data.licenseCertificate || data.licenseCertificate.length === 0) {
      alert('Please upload your primary medical license certificate.');
      return;
    }
    
    onNext();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Licensing</h2>
          <p className="text-gray-600">
            Reviewing your medical licensing information from uploaded documents.
          </p>
        </div>

        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">AI is analyzing your licensing documents...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Licensing</h2>
        <p className="text-gray-600">
          Review your AI-extracted licensing information and upload supporting documents.
        </p>
      </div>

      {/* AI Data Review Section */}
      <AIDataReview
        title="📋 AI-Extracted Licensing Data"
        extractedData={extractedLicensingData}
        onUpdate={handleLicensingDataUpdate}
        onApprove={handleLicensingDataApproval}
        schema={licensingSchema}
      />

      {/* Certificate Upload Sections */}
      <div className="grid gap-6">
        <CertificateUpload
          title="Primary Medical License"
          description="Upload your current primary medical license certificate"
          acceptedTypes={['application/pdf', 'image/jpeg', 'image/png']}
          uploadedFiles={data.licenseCertificate || []}
          onUpload={(files) => handleCertificateUpload('licenseCertificate', files)}
          required={true}
          maxFiles={2}
        />

        <CertificateUpload
          title="Good Standing Certificate"
          description="Upload certificate of good standing from your licensing authority"
          acceptedTypes={['application/pdf', 'image/jpeg', 'image/png']}
          uploadedFiles={data.goodStandingCertificate || []}
          onUpload={(files) => handleCertificateUpload('goodStandingCertificate', files)}
          required={true}
          maxFiles={2}
        />

        <CertificateUpload
          title="Additional State Licenses"
          description="Upload any additional state licenses you hold (if applicable)"
          acceptedTypes={['application/pdf', 'image/jpeg', 'image/png']}
          uploadedFiles={data.additionalStateLicenses || []}
          onUpload={(files) => handleCertificateUpload('additionalStateLicenses', files)}
          maxFiles={5}
        />

        <CertificateUpload
          title="DEA Registration Certificate"
          description="Upload your DEA registration certificate (if applicable)"
          acceptedTypes={['application/pdf', 'image/jpeg', 'image/png']}
          uploadedFiles={data.deaCertificate || []}
          onUpload={(files) => handleCertificateUpload('deaCertificate', files)}
          maxFiles={2}
        />

        <CertificateUpload
          title="International Licenses"
          description="Upload any international medical licenses or certifications (if applicable)"
          acceptedTypes={['application/pdf', 'image/jpeg', 'image/png']}
          uploadedFiles={data.internationalLicenses || []}
          onUpload={(files) => handleCertificateUpload('internationalLicenses', files)}
          maxFiles={5}
        />
      </div>

      {/* Licensing Compliance Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-yellow-900">Licensing Compliance</h4>
            <p className="text-sm text-yellow-700 mt-1">
              All licenses must be current and in good standing. We will verify license status with the relevant authorities. 
              Any disciplinary actions must be disclosed for review.
            </p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Step 3 Progress</h4>
            <p className="text-sm text-blue-700 mt-1">
              {aiDataApproved ? '✅ Licensing data approved' : '⏳ Please review and approve licensing data'} • 
              Upload required license documents to proceed
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
          Back to Education
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Continue to Experience
        </button>
      </div>
    </div>
  );
}
