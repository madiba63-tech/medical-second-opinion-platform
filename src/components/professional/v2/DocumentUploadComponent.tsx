'use client';

import { useState } from 'react';

interface DocumentUploadProps {
  onNext: () => void;
  onPrev: () => void;
}

interface UploadedDocument {
  id: string;
  type: DocumentType;
  name: string;
  file: File;
  uploadDate: Date;
  status: 'uploaded' | 'processing' | 'verified';
}

type DocumentType = 
  | 'medical_degree'
  | 'residency_certificate' 
  | 'fellowship_certificate'
  | 'board_certification'
  | 'medical_license'
  | 'good_standing_certificate'
  | 'malpractice_insurance'
  | 'professional_references'
  | 'additional_certificates'
  | 'other';

const DOCUMENT_TYPES: { value: DocumentType; label: string; required: boolean; description: string }[] = [
  {
    value: 'medical_degree',
    label: 'Medical Degree Certificate',
    required: true,
    description: 'Your MD, MBBS, or equivalent medical degree certificate'
  },
  {
    value: 'residency_certificate',
    label: 'Residency Completion Certificate', 
    required: true,
    description: 'Certificate of completion from your residency program'
  },
  {
    value: 'fellowship_certificate',
    label: 'Fellowship Certificate',
    required: false,
    description: 'If applicable, certificate from fellowship training'
  },
  {
    value: 'board_certification',
    label: 'Board Certification',
    required: true,
    description: 'Specialty board certification in your field'
  },
  {
    value: 'medical_license',
    label: 'Current Medical License',
    required: true,
    description: 'Current active medical license from your jurisdiction'
  },
  {
    value: 'good_standing_certificate',
    label: 'Certificate of Good Standing',
    required: true,
    description: 'Recent certificate confirming you are in good standing'
  },
  {
    value: 'malpractice_insurance',
    label: 'Malpractice Insurance Certificate',
    required: true,
    description: 'Current professional liability insurance certificate'
  },
  {
    value: 'professional_references',
    label: 'Professional References',
    required: false,
    description: 'Letters of recommendation from colleagues or supervisors'
  },
  {
    value: 'additional_certificates',
    label: 'Additional Certificates',
    required: false,
    description: 'Any additional relevant certifications or qualifications'
  },
  {
    value: 'other',
    label: 'Other Documents',
    required: false,
    description: 'Any other supporting documentation'
  }
];

export default function DocumentUploadComponent({ onNext, onPrev }: DocumentUploadProps) {
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingDocuments, setUploadingDocuments] = useState<Set<DocumentType>>(new Set());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isNavigating, setIsNavigating] = useState(false);

  const handleFileUpload = async (documentType: DocumentType, files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setErrors(prev => ({ ...prev, [documentType]: 'File size must be less than 10MB' }));
      return;
    }

    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
      setErrors(prev => ({ ...prev, [documentType]: 'Please upload PDF, JPG, or PNG files only' }));
      return;
    }

    // Set individual document as uploading
    setUploadingDocuments(prev => new Set([...prev, documentType]));
    setIsUploading(true);
    
    try {
      // Simulate upload processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newDocument: UploadedDocument = {
        id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        type: documentType,
        name: file.name,
        file: file,
        uploadDate: new Date(),
        status: 'uploaded'
      };

      setUploadedDocuments(prev => [
        ...prev.filter(doc => doc.type !== documentType), // Remove previous upload of same type
        newDocument
      ]);

      // Clear any previous error for this document type
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[documentType];
        return newErrors;
      });
      
      // Clear the file input
      const fileInput = document.getElementById(`upload-${documentType}`) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      
    } catch (error) {
      console.error('Upload error:', error);
      setErrors(prev => ({ ...prev, [documentType]: 'Upload failed. Please try again.' }));
    } finally {
      setUploadingDocuments(prev => {
        const newSet = new Set(prev);
        newSet.delete(documentType);
        return newSet;
      });
      setIsUploading(false);
    }
  };

  const removeDocument = (documentId: string, documentName: string) => {
    if (window.confirm(`Are you sure you want to remove "${documentName}"?`)) {
      setUploadedDocuments(prev => prev.filter(doc => doc.id !== documentId));
    }
  };

  const getUploadedDocument = (documentType: DocumentType) => {
    return uploadedDocuments.find(doc => doc.type === documentType);
  };

  const getRequiredDocuments = () => {
    return DOCUMENT_TYPES.filter(docType => docType.required);
  };

  const getUploadedRequiredDocuments = () => {
    const requiredTypes = getRequiredDocuments().map(doc => doc.value);
    return uploadedDocuments.filter(doc => requiredTypes.includes(doc.type));
  };

  const canProceed = () => {
    const requiredDocuments = getRequiredDocuments();
    const uploadedRequiredDocuments = getUploadedRequiredDocuments();
    return uploadedRequiredDocuments.length >= requiredDocuments.length;
  };

  const handleNext = async () => {
    if (!canProceed()) {
      setErrors(prev => ({ ...prev, general: 'Please upload all required documents before proceeding.' }));
      return;
    }
    
    setIsNavigating(true);
    try {
      // Clear general error
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.general;
        return newErrors;
      });
      
      // Small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      onNext();
    } catch (error) {
      console.error('Navigation error:', error);
      setErrors(prev => ({ ...prev, general: 'Failed to proceed. Please try again.' }));
    } finally {
      setIsNavigating(false);
    }
  };
  
  const handlePrevious = async () => {
    setIsNavigating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      onPrev();
    } finally {
      setIsNavigating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Supporting Documents
        </h2>
        <p className="text-lg text-gray-600">
          Please upload the required documents to support your application. All documents should be clear, recent, and in English (or with certified translations).
        </p>
      </div>

      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{errors.general}</p>
        </div>
      )}

      <div className="mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Progress</h3>
          <p className="text-blue-700">
            {getUploadedRequiredDocuments().length} of {getRequiredDocuments().length} required documents uploaded
            {uploadedDocuments.filter(doc => !getRequiredDocuments().find(req => req.value === doc.type)).length > 0 && 
              ` (plus ${uploadedDocuments.filter(doc => !getRequiredDocuments().find(req => req.value === doc.type)).length} optional documents)`
            }
            {canProceed() && (
              <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✓ Ready to continue
              </span>
            )}
          </p>
          <div className="mt-2 bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min(100, (getUploadedRequiredDocuments().length / getRequiredDocuments().length) * 100)}%` 
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {DOCUMENT_TYPES.map(documentType => {
          const uploadedDoc = getUploadedDocument(documentType.value);
          const hasError = errors[documentType.value];

          return (
            <div key={documentType.value} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {documentType.label}
                    </h3>
                    {documentType.required && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Required
                      </span>
                    )}
                    {uploadedDoc && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✓ Uploaded
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{documentType.description}</p>
                </div>
              </div>

              {uploadedDoc ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-green-900">{uploadedDoc.name}</p>
                        <p className="text-sm text-green-700">
                          Uploaded {uploadedDoc.uploadDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeDocument(uploadedDoc.id, uploadedDoc.name)}
                      className="text-red-600 hover:text-red-800 p-2 transition-colors"
                      title={`Remove ${uploadedDoc.name}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  hasError ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <input
                    type="file"
                    id={`upload-${documentType.value}`}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(documentType.value, e.target.files)}
                    disabled={uploadingDocuments.has(documentType.value) || isUploading}
                  />
                  <label
                    htmlFor={`upload-${documentType.value}`}
                    className={`${uploadingDocuments.has(documentType.value) || isUploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-50'} block transition-colors rounded-lg`}
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-gray-900 font-medium mb-1">
                      {uploadingDocuments.has(documentType.value) ? 'Uploading...' : 'Click to upload'}
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF, JPG, or PNG (max 10MB)
                    </p>
                  </label>
                </div>
              )}

              {hasError && (
                <p className="mt-2 text-sm text-red-600">{hasError}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={isUploading || isNavigating}
          className={`px-6 py-3 border border-gray-300 rounded-lg font-medium transition-colors ${
            isUploading || isNavigating
              ? 'text-gray-400 cursor-not-allowed bg-gray-50'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          {isNavigating ? '...' : '← Previous Step'}
        </button>

        <button
          onClick={handleNext}
          disabled={!canProceed() || isUploading || isNavigating}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            canProceed() && !isUploading && !isNavigating
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isNavigating ? 'Loading...' : 'Continue to Compliance →'}
        </button>
      </div>
    </div>
  );
}