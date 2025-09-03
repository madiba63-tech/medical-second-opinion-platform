'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { mockExtractTextFromPDF } from '@/utils/pdfProcessor';
import { mockAIExtractData, ExtractedData } from '@/utils/aiAgent';

interface AIDocumentUploadProps {
  onDataExtracted: (data: ExtractedData) => void;
  onUploadComplete: (file: any) => void;
}

export default function AIDocumentUpload({ onDataExtracted, onUploadComplete }: AIDocumentUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [uploadedFile, setUploadedFile] = useState<any>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        await handleFileUpload(acceptedFiles[0]);
      }
    }
  });

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      // Get presigned URL for upload
      const presignResponse = await fetch('/api/professional/presign-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          files: [{
            filename: file.name,
            mimetype: file.type,
            fileSize: file.size
          }],
          email: 'ai-upload@professional.com' // Placeholder for AI upload
        })
      });

      if (!presignResponse.ok) {
        throw new Error('Failed to get upload URL');
      }

      const presignData = await presignResponse.json();
      const { url, key } = presignData.uploadUrls[0];

      // Upload file
      const fileUploadResponse = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type }
      });

      if (!fileUploadResponse.ok) {
        throw new Error('Failed to upload file');
      }

      const uploadedFileData = {
        name: file.name,
        size: file.size,
        type: file.type,
        s3Key: key
      };

      setUploadedFile(uploadedFileData);
      onUploadComplete(uploadedFileData);

      // Start AI processing (non-blocking)
      setProcessing(true);
      try {
        await processDocumentWithAI(file);
      } catch (aiError) {
        console.warn('AI processing failed, but file upload succeeded:', aiError);
        // Don't fail the entire upload if AI processing fails
        setProcessing(false);
      }

    } catch (error) {
      console.error('Upload error:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to upload file. Please try again.';
      if (error instanceof Error) {
        if (error.message.includes('Failed to get upload URL')) {
          errorMessage = 'Failed to get upload permission. Please check your connection and try again.';
        } else if (error.message.includes('Failed to upload file')) {
          errorMessage = 'File upload failed. Please check your internet connection and try again.';
        } else {
          errorMessage = `Upload failed: ${error.message}`;
        }
      }
      
      alert(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const processDocumentWithAI = async (file: File) => {
    try {
      // Step 1: Extract text from PDF
      const extractedText = await mockExtractTextFromPDF(file);
      
      // Step 2: Use AI to extract structured data
      const data = await mockAIExtractData(extractedText);
      
      setExtractedData(data);
      onDataExtracted(data);

    } catch (error) {
      console.error('AI processing error:', error);
      
      // Don't show AI errors to user - upload already succeeded
      console.warn('AI processing failed but file was uploaded successfully. Continuing without AI data.');
      // You could show a less intrusive notification here instead of alert
    } finally {
      setProcessing(false);
    }
  };

  const applyExtractedData = () => {
    if (extractedData) {
      onDataExtracted(extractedData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Credentials Document <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-500 mb-4">
          Upload your CV, resume, or credentials document. Our AI will automatically extract and populate your application fields.
        </p>
        
        {uploadedFile ? (
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium text-green-900">{uploadedFile.name}</p>
                <p className="text-sm text-green-700">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUploadedFile(null);
                  setExtractedData(null);
                }}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-purple-400 bg-purple-50'
                : uploading || processing
                ? 'border-blue-300 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
          >
            <input {...getInputProps()} />
            {uploading ? (
              <div>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-blue-600">Uploading document...</p>
              </div>
            ) : processing ? (
              <div>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                <p className="text-purple-600">AI is analyzing your document...</p>
                <p className="text-sm text-purple-500 mt-1">This may take a few moments</p>
              </div>
            ) : (
              <div>
                <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-gray-600">
                  <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">PDF only (max 10MB)</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* AI Processing Results */}
      {extractedData && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-lg font-semibold text-blue-900">AI Analysis Complete</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-blue-800">
              Our AI has analyzed your document and extracted the following information:
            </p>
            
            {/* Extracted Data Preview */}
            <div className="bg-white rounded-lg p-4 space-y-3">
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
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={applyExtractedData}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Apply to Form
              </button>
              <button
                type="button"
                onClick={() => setExtractedData(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Processing Notice */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-purple-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-purple-900">AI-Powered Document Analysis</h4>
            <p className="text-sm text-purple-700 mt-1">
              Our AI analyzes your uploaded document to automatically extract and populate application fields. 
              You can review and edit the extracted information before submitting your application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
