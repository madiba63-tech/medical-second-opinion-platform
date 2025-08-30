'use client';

import { useState } from 'react';
import DocumentUpload from '@/components/customer/DocumentUpload';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadProgress: number;
  uploadKey?: string;
  uploadUrl?: string;
  status: 'uploading' | 'completed' | 'error';
  errorMessage?: string;
  category?: 'medical-record' | 'lab-result' | 'imaging' | 'other';
}

interface UploadStepProps {
  files: UploadedFile[];
  onUpdate: (files: UploadedFile[]) => void;
  onNext: () => void;
}

export default function UploadStep({ files, onUpdate, onNext }: UploadStepProps) {
  const handleUploadComplete = (uploadedFiles: UploadedFile[]) => {
    onUpdate(uploadedFiles);
  };

  const completedFiles = files.filter(f => f.status === 'completed');
  const canProceed = completedFiles.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Medical Documents</h2>
        <p className="text-gray-600 mb-6">
          Upload your medical records, lab reports, and imaging files for expert review. 
          Only secure, non-editable formats are accepted to ensure document integrity.
        </p>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-amber-800 mb-1">
                Document Security Requirements
              </h4>
              <ul className="text-xs text-amber-700 space-y-1">
                <li>• Only PDF, DICOM, TIFF, PNG, and JPEG formats accepted</li>
                <li>• Files are validated for format integrity and security</li>
                <li>• All documents automatically categorized for efficient review</li>
                <li>• Maximum file size: 50MB per document</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <DocumentUpload
        onUploadComplete={handleUploadComplete}
        maxFiles={10}
        className="mb-6"
      />

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <div className="text-sm text-gray-500">
          {completedFiles.length > 0 && (
            <p>
              <span className="font-medium text-green-600">{completedFiles.length}</span> 
              {' '}document{completedFiles.length !== 1 ? 's' : ''} uploaded successfully
            </p>
          )}
        </div>
        
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            canProceed
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Medical Context
          {canProceed && (
            <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
