'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import AIDocumentUpload from './AIDocumentUpload';
import { ExtractedData } from '@/utils/aiAgent';

interface IdentityStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

const NATIONALITIES = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Canada', 'Australia',
  'Netherlands', 'Switzerland', 'Sweden', 'Norway', 'Denmark', 'Finland',
  'Italy', 'Spain', 'Portugal', 'Belgium', 'Austria', 'Ireland',
  'New Zealand', 'Japan', 'South Korea', 'Singapore', 'Israel', 'Other'
];

export default function IdentityStep({ data, onUpdate, onNext }: IdentityStepProps) {
  const [uploading, setUploading] = useState(false);
  const [showAIDocumentUpload, setShowAIDocumentUpload] = useState(false);

  const { getRootProps: getGovernmentIdProps, getInputProps: getGovernmentIdInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setUploading(true);
        try {
          const file = acceptedFiles[0];
          const formData = new FormData();
          formData.append('file', file);

          // Get presigned URL
          const presignResponse = await fetch('/api/presign-upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([{
              filename: file.name,
              mimetype: file.type
            }])
          });

          if (!presignResponse.ok) {
            throw new Error('Failed to get upload URL');
          }

          const [{ url, key }] = await presignResponse.json();

          // Upload file
          const uploadResponse = await fetch(url, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type }
          });

          if (!uploadResponse.ok) {
            throw new Error('Failed to upload file');
          }

          onUpdate({
            governmentId: {
              name: file.name,
              size: file.size,
              type: file.type,
              s3Key: key
            }
          });
        } catch (error) {
          console.error('Upload error:', error);
          alert('Failed to upload file. Please try again.');
        } finally {
          setUploading(false);
        }
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!data.firstName || !data.lastName || !data.dob || !data.nationality || !data.email || !data.governmentId) {
      alert('Please fill in all required fields and upload your government ID.');
      return;
    }

    onNext();
  };

  const handleAIDataExtracted = (extractedData: ExtractedData) => {
    // Apply extracted data to form fields
    const updates: any = {};
    
    if (extractedData.firstName) updates.firstName = extractedData.firstName;
    if (extractedData.middleName) updates.middleName = extractedData.middleName;
    if (extractedData.lastName) updates.lastName = extractedData.lastName;
    if (extractedData.email) updates.email = extractedData.email;
    if (extractedData.phone) updates.phone = extractedData.phone;
    
    onUpdate(updates);
  };

  const handleAIDocumentUpload = (file: any) => {
    // Store the uploaded document for later use
    onUpdate({ credentialsDocument: file });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Identity & Contact Information</h2>
        <p className="text-gray-600">
          Please provide your personal information and upload a government-issued ID for verification.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* AI Document Upload Option */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-purple-900 mb-2">🤖 AI-Powered Application Assistant</h3>
              <p className="text-sm text-purple-700">
                Upload your CV or credentials document and let our AI automatically populate your application fields.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAIDocumentUpload(!showAIDocumentUpload)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {showAIDocumentUpload ? 'Hide AI Assistant' : 'Use AI Assistant'}
            </button>
          </div>
          
          {showAIDocumentUpload && (
            <AIDocumentUpload
              onDataExtracted={handleAIDataExtracted}
              onUploadComplete={handleAIDocumentUpload}
            />
          )}
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => onUpdate({ firstName: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Middle Name
            </label>
            <input
              type="text"
              value={data.middleName}
              onChange={(e) => onUpdate({ middleName: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.lastName}
              onChange={(e) => onUpdate({ lastName: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={data.dob}
              onChange={(e) => onUpdate({ dob: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nationality <span className="text-red-500">*</span>
            </label>
            <select
              value={data.nationality}
              onChange={(e) => onUpdate({ nationality: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Nationality</option>
              {NATIONALITIES.map((nationality) => (
                <option key={nationality} value={nationality}>
                  {nationality}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onUpdate({ phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Government ID Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Government-Issued ID <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-500 mb-4">
            Upload your passport, national ID, or driver's license (PDF, JPG, or PNG, max 10MB)
          </p>
          
          {data.governmentId ? (
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium text-green-900">{data.governmentId.name}</p>
                  <p className="text-sm text-green-700">
                    {(data.governmentId.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdate({ governmentId: null })}
                  className="ml-auto text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div
              {...getGovernmentIdProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                uploading
                  ? 'border-blue-300 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
              }`}
            >
              <input {...getGovernmentIdInputProps()} />
              {uploading ? (
                <div>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-blue-600">Uploading...</p>
                </div>
              ) : (
                <div>
                  <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-600">
                    <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, or PNG (max 10MB)</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-900">Secure Document Upload</h4>
              <p className="text-sm text-blue-700 mt-1">
                Your government ID is encrypted and stored securely. It will only be used for identity verification and will not be shared with third parties.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Continue to Education & Training
          </button>
        </div>
      </form>
    </div>
  );
}
