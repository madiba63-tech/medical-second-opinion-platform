'use client';

import { useState } from 'react';

interface CertificateUploadProps {
  title: string;
  description: string;
  acceptedTypes: string[];
  uploadedFiles: any[];
  onUpload: (files: any[]) => void;
  required?: boolean;
  maxFiles?: number;
}

export default function CertificateUpload({
  title,
  description,
  acceptedTypes,
  uploadedFiles = [],
  onUpload,
  required = false,
  maxFiles = 5
}: CertificateUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = async (selectedFiles: FileList) => {
    if (selectedFiles.length === 0) return;

    const files = Array.from(selectedFiles);
    
    // Validate file types
    const validFiles = files.filter(file => {
      const isValidType = acceptedTypes.some(type => 
        type === 'application/pdf' ? file.type === 'application/pdf' :
        type.startsWith('image/') ? file.type.startsWith('image/') :
        file.type === type
      );
      
      if (!isValidType) {
        alert(`File ${file.name} is not an accepted type. Please upload: ${acceptedTypes.join(', ')}`);
        return false;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Please select files under 10MB.`);
        return false;
      }
      
      return true;
    });

    if (validFiles.length === 0) return;

    // Check max files limit
    if (uploadedFiles.length + validFiles.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files. Please remove some files first.`);
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = validFiles.map(async (file) => {
        // Get presigned URL
        const presignResponse = await fetch('/api/professional/presign-upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            files: [{
              filename: file.name,
              mimetype: file.type,
              fileSize: file.size
            }],
            email: `certificates-${Date.now()}@professional.com`
          })
        });

        if (!presignResponse.ok) {
          throw new Error(`Failed to get upload URL for ${file.name}`);
        }

        const presignData = await presignResponse.json();
        const { url, key } = presignData.uploadUrls[0];

        // Upload file
        const uploadResponse = await fetch(url, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type }
        });

        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        return {
          name: file.name,
          size: file.size,
          type: file.type,
          s3Key: key,
          uploadedAt: new Date().toISOString()
        };
      });

      const uploadResults = await Promise.all(uploadPromises);
      const updatedFiles = [...uploadedFiles, ...uploadResults];
      onUpload(updatedFiles);

    } catch (error) {
      console.error('Certificate upload error:', error);
      alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = maxFiles > 1;
    input.accept = acceptedTypes.join(',');
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        handleFileUpload(files);
      }
    };
    input.click();
  };

  const removeFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    onUpload(updatedFiles);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {title}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          uploading
            ? 'border-blue-300 bg-blue-50'
            : dragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {uploading ? (
          <div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-blue-600">Uploading certificates...</p>
          </div>
        ) : (
          <div>
            <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-600">
              <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {acceptedTypes.includes('application/pdf') && acceptedTypes.includes('image/jpeg') 
                ? 'PDF, JPG, or PNG files'
                : acceptedTypes.includes('application/pdf')
                ? 'PDF files only'
                : 'Image files only'
              } (max 10MB each, up to {maxFiles} files)
            </p>
          </div>
        )}
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Uploaded Certificates:</h4>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium text-green-900">{file.name}</p>
                  <p className="text-sm text-green-700">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • Uploaded {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-red-600 hover:text-red-800 p-1"
                title="Remove file"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Requirements */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Upload Requirements</h4>
            <p className="text-sm text-blue-700 mt-1">
              Please ensure all certificates are clear, legible, and current. 
              Accepted formats: {acceptedTypes.includes('application/pdf') && acceptedTypes.includes('image/jpeg') 
                ? 'PDF, JPG, PNG'
                : acceptedTypes.includes('application/pdf')
                ? 'PDF only'
                : 'Images only'
              }. Maximum file size: 10MB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}