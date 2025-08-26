'use client';

import { useState } from 'react';
import AIDocumentUpload from '@/components/professional/AIDocumentUpload';
import { ExtractedData } from '@/utils/aiAgent';

export default function AIDemoPage() {
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);

  const handleDataExtracted = (data: ExtractedData) => {
    setExtractedData(data);
  };

  const handleUploadComplete = (file: any) => {
    console.log('File uploaded:', file);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🤖 AI Document Processing Demo</h1>
          <p className="text-xl text-gray-600">
            Test our AI-powered document analysis and field extraction
          </p>
        </div>

        {/* Demo Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">How to Test:</h2>
          <div className="space-y-2 text-sm text-blue-800">
            <p>1. <strong>Upload a PDF document</strong> (CV, resume, or credentials)</p>
            <p>2. <strong>Wait for AI processing</strong> (simulated 3-second delay)</p>
            <p>3. <strong>Review extracted data</strong> in the results section</p>
            <p>4. <strong>Apply data to form</strong> or ignore the results</p>
          </div>
          
          <div className="mt-4 p-4 bg-white rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Demo File Names (for different results):</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <code>cv.pdf</code> or <code>resume.pdf</code> - Full professional profile</li>
              <li>• <code>license.pdf</code> or <code>certificate.pdf</code> - License information</li>
              <li>• <code>degree.pdf</code> or <code>diploma.pdf</code> - Education credentials</li>
              <li>• Any other PDF - Generic extraction</li>
            </ul>
          </div>
        </div>

        {/* AI Document Upload */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <AIDocumentUpload
            onDataExtracted={handleDataExtracted}
            onUploadComplete={handleUploadComplete}
          />
        </div>

        {/* Extracted Data Display */}
        {extractedData && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Extracted Data Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
                <div className="space-y-2">
                  {extractedData.firstName && extractedData.lastName && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Name:</span>
                      <span className="text-sm text-gray-900">
                        {extractedData.firstName} {extractedData.lastName}
                      </span>
                    </div>
                  )}
                  {extractedData.email && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Email:</span>
                      <span className="text-sm text-gray-900">{extractedData.email}</span>
                    </div>
                  )}
                  {extractedData.phone && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Phone:</span>
                      <span className="text-sm text-gray-900">{extractedData.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Professional Information</h3>
                <div className="space-y-2">
                  {extractedData.yearsPractice && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Years of Practice:</span>
                      <span className="text-sm text-gray-900">{extractedData.yearsPractice} years</span>
                    </div>
                  )}
                  {extractedData.currentAffiliation && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Current Affiliation:</span>
                      <span className="text-sm text-gray-900">{extractedData.currentAffiliation}</span>
                    </div>
                  )}
                  {extractedData.publications && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Publications:</span>
                      <span className="text-sm text-gray-900">{extractedData.publications}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Education & Licensing */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Education & Licensing</h3>
                <div className="space-y-2">
                  {extractedData.medicalDegree && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Medical Degree:</span>
                      <span className="text-sm text-gray-900">
                        {extractedData.medicalDegree.degree} from {extractedData.medicalDegree.institution} ({extractedData.medicalDegree.year})
                      </span>
                    </div>
                  )}
                  {extractedData.licenseNumber && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">License Number:</span>
                      <span className="text-sm text-gray-900">{extractedData.licenseNumber}</span>
                    </div>
                  )}
                  {extractedData.licenseExpiry && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">License Expiry:</span>
                      <span className="text-sm text-gray-900">{extractedData.licenseExpiry}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Specialties & Memberships */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Specialties & Memberships</h3>
                <div className="space-y-2">
                  {extractedData.subspecialties && extractedData.subspecialties.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Subspecialties:</span>
                      <span className="text-sm text-gray-900">{extractedData.subspecialties.join(', ')}</span>
                    </div>
                  )}
                  {extractedData.societyMemberships && extractedData.societyMemberships.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Society Memberships:</span>
                      <span className="text-sm text-gray-900">{extractedData.societyMemberships.join(', ')}</span>
                    </div>
                  )}
                  {extractedData.leadershipRoles && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Leadership Roles:</span>
                      <span className="text-sm text-gray-900">{extractedData.leadershipRoles}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Raw Data */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Raw Extracted Data (JSON):</h3>
              <pre className="text-xs text-gray-600 overflow-auto">
                {JSON.stringify(extractedData, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Technical Details */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Technical Implementation</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p><strong>PDF Processing:</strong> Uses pdf-lib for metadata extraction and text parsing</p>
            <p><strong>AI Analysis:</strong> Rule-based extraction with regex patterns and keyword matching</p>
            <p><strong>Data Structure:</strong> Structured extraction into typed interfaces</p>
            <p><strong>Production Ready:</strong> Can be easily integrated with OpenAI GPT-4, Claude, or custom models</p>
          </div>
        </div>
      </div>
    </div>
  );
}
