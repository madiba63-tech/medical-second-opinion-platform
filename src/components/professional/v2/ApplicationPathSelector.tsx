'use client';

import { useState } from 'react';
import { ApplicationPathType } from '@/types/dual-path-recruitment';

interface ApplicationPathSelectorProps {
  onPathSelected: (pathType: ApplicationPathType, email: string, cvFile?: File) => void;
}

export default function ApplicationPathSelector({ onPathSelected }: ApplicationPathSelectorProps) {
  const [selectedPath, setSelectedPath] = useState<ApplicationPathType | null>(null);
  const [email, setEmail] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Handle file upload for AI path
   */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      setCvFile(null);
      return;
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      setErrors({ cvFile: 'Please upload a PDF file only' });
      setCvFile(null);
      return;
    }

    // Validate file size (max 10MB)
    const maxSizeInMB = 10;
    if (file.size > maxSizeInMB * 1024 * 1024) {
      setErrors({ cvFile: `File size must be less than ${maxSizeInMB}MB` });
      setCvFile(null);
      return;
    }

    setErrors({});
    setCvFile(file);
  };

  /**
   * Validate form data
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!selectedPath) {
      newErrors.path = 'Please select an application path';
    }

    if (selectedPath === 'AI_ASSISTED' && !cvFile) {
      newErrors.cvFile = 'CV file is required for AI-assisted application';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsUploading(true);
    try {
      await onPathSelected(selectedPath!, email.trim(), cvFile || undefined);
    } catch (error) {
      console.error('Path selection error:', error);
      setErrors({ submit: 'Failed to start application. Please try again.' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Professional Application
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Welcome to the Medical Second Opinion Platform professional recruitment system.
          Choose your preferred application method below.
        </p>
      </div>

      {/* Email Input */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div>
          <label htmlFor="email" className="block font-medium text-gray-900 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full max-w-md border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="your.email@hospital.org"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Path Selection */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Method</h3>
        {errors.path && (
          <p className="text-red-600 text-sm mb-4">{errors.path}</p>
        )}
        
        <div className="space-y-4">
          {/* AI-Assisted Path */}
          <label
            className={`block p-6 rounded-lg border-2 cursor-pointer transition-all ${
              selectedPath === 'AI_ASSISTED'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div className="flex items-start gap-4">
              <input
                type="radio"
                name="pathType"
                value="AI_ASSISTED"
                checked={selectedPath === 'AI_ASSISTED'}
                onChange={(e) => setSelectedPath(e.target.value as ApplicationPathType)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-gray-900">AI-Assisted Application</h4>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                    Recommended
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Upload your CV and let our advanced AI system automatically extract and populate 
                  your professional information. You'll have the opportunity to review and edit 
                  all extracted data before submission.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Faster completion time
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Reduced data entry errors
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    No government ID required
                  </div>
                </div>

                {/* CV Upload for AI Path */}
                {selectedPath === 'AI_ASSISTED' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <label className="block font-medium text-gray-900 mb-2">
                      Upload Your CV <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <p className="text-xs text-gray-500">
                        PDF files only, maximum 10MB
                      </p>
                      {errors.cvFile && (
                        <p className="text-red-600 text-sm">{errors.cvFile}</p>
                      )}
                      {cvFile && (
                        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {cvFile.name} ({Math.round(cvFile.size / 1024)} KB)
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </label>

          {/* Manual Path */}
          <label
            className={`block p-6 rounded-lg border-2 cursor-pointer transition-all ${
              selectedPath === 'MANUAL'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div className="flex items-start gap-4">
              <input
                type="radio"
                name="pathType"
                value="MANUAL"
                checked={selectedPath === 'MANUAL'}
                onChange={(e) => setSelectedPath(e.target.value as ApplicationPathType)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">Manual Application</h4>
                <p className="text-gray-600 mb-4">
                  Complete your application by manually entering your information step by step.
                  You can upload supporting documents for each category as you progress.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Full control over data entry
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    International document flexibility
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Step-by-step guidance
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold text-yellow-900 mb-2">Important Notes</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Both application paths require the same information and documentation</li>
              <li>• International applicants can mark certain documents as "not applicable" where relevant</li>
              <li>• You will need to complete a self-assessment questionnaire regardless of chosen path</li>
              <li>• All applications are subject to admin review before approval</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        {errors.submit && (
          <p className="text-red-600 text-sm mb-4">{errors.submit}</p>
        )}
        
        <button
          onClick={handleSubmit}
          disabled={isUploading}
          className={`px-8 py-3 rounded-lg font-medium transition-colors ${
            isUploading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isUploading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Starting Application...
            </span>
          ) : (
            'Start Application'
          )}
        </button>
      </div>
    </div>
  );
}