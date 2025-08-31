'use client';

import { useState } from 'react';

interface IdentityContactStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onAiPrepopulate: (files: File[], email: string) => Promise<any>;
}

const NATIONALITY_OPTIONS = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
  'France', 'Italy', 'Spain', 'Netherlands', 'Switzerland', 'Austria',
  'Belgium', 'Denmark', 'Sweden', 'Norway', 'Finland', 'India', 'China',
  'Japan', 'South Korea', 'Singapore', 'New Zealand', 'Ireland', 'Portugal',
  'Greece', 'Poland', 'Czech Republic', 'Hungary', 'Other'
];

export default function IdentityContactStep({ 
  data, 
  onUpdate, 
  onNext, 
  onAiPrepopulate 
}: IdentityContactStepProps) {
  const [dragActive, setDragActive] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const handleInputChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  const handleFileUpload = (field: string, file: File | null) => {
    onUpdate({ [field]: file });
  };

  const handleAiDragDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (!data.email) {
      alert('Please enter your email address first for AI document analysis.');
      return;
    }

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await processAiDocuments(files);
    }
  };

  const handleAiFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!data.email) {
      alert('Please enter your email address first for AI document analysis.');
      return;
    }

    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      await processAiDocuments(files);
    }
  };

  const processAiDocuments = async (files: File[]) => {
    setAiProcessing(true);
    try {
      const result = await onAiPrepopulate(files, data.email);
      setAiResult(result);
    } catch (error) {
      alert(`AI document analysis failed: ${error.message}`);
    } finally {
      setAiProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!data.firstName || !data.lastName || !data.dateOfBirth || 
        !data.nationality || !data.email) {
      alert('Please fill in all required fields.');
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Identity & Contact Information</h2>
        <p className="text-gray-600">
          Provide your basic contact information and upload your government-issued ID.
        </p>
      </div>

      {/* AI Document Analysis Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          🤖 AI-Powered Application Pre-filling
        </h3>
        <p className="text-sm text-blue-700 mb-4">
          Upload your CV, license, or other documents to automatically populate application fields using AI analysis.
        </p>
        
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-blue-400 bg-blue-100' 
              : 'border-blue-300 hover:border-blue-400 hover:bg-blue-50'
          }`}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={handleAiDragDrop}
        >
          {aiProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-blue-700">Analyzing documents with AI...</span>
            </div>
          ) : (
            <>
              <svg className="w-12 h-12 text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-blue-700 font-medium mb-2">
                Drop documents here for AI analysis
              </p>
              <p className="text-blue-600 text-sm mb-4">
                Drag & drop CV, licenses, degrees, or certificates
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleAiFileInput}
                className="hidden"
                id="ai-upload"
              />
              <label
                htmlFor="ai-upload"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Choose Files
              </label>
            </>
          )}
        </div>

        {aiResult && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">✅ AI Analysis Complete</h4>
            <div className="text-sm text-green-700 space-y-1">
              <p>Documents processed: {aiResult.documentsProcessed}</p>
              <p>Confidence level: {aiResult.overallConfidence}%</p>
              <p>Fields extracted: {aiResult.successfulExtractions}</p>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
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
              value={data.middleName || ''}
              onChange={(e) => handleInputChange('middleName', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={data.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nationality <span className="text-red-500">*</span>
          </label>
          <select
            value={data.nationality || ''}
            onChange={(e) => handleInputChange('nationality', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select nationality...</option>
            {NATIONALITY_OPTIONS.map(nationality => (
              <option key={nationality} value={nationality}>{nationality}</option>
            ))}
          </select>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={data.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
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
              value={data.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Government ID Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Government-issued ID Upload <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Upload a clear photo or scan of your passport or national ID (PDF or JPG format)
          </p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('governmentId', e.target.files?.[0] || null)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {data.governmentId && (
            <p className="text-sm text-green-600 mt-2">
              ✓ Uploaded: {data.governmentId.name}
            </p>
          )}
        </div>

        {/* Data Protection Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-amber-900">Data Protection</h4>
              <p className="text-sm text-amber-700 mt-1">
                Your personal information is encrypted and stored securely. We comply with GDPR and medical data protection regulations. ID documents are used solely for identity verification and professional credentialing.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue to Education & Training
          </button>
        </div>
      </form>
    </div>
  );
}