'use client';

import React, { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import '@/components/submission/submission-styles.css';

// Dynamically import the enhanced submission form to avoid SSR issues
const EnhancedCaseSubmissionForm = dynamic(
  () => import('@/components/submission/EnhancedCaseSubmissionForm').then(mod => mod.default || mod.EnhancedCaseSubmissionForm),
  {
    loading: () => <LoadingState />,
    ssr: false
  }
);

// Loading component
function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-700">Loading submission form...</h2>
        <p className="text-gray-500 mt-2">Personalizing your experience</p>
      </div>
    </div>
  );
}

// Main page component
export default function EnhancedSubmissionPage() {
  const [mounted, setMounted] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
    
    // Get customer ID from search params or session storage
    const urlCustomerId = searchParams.get('customerId');
    const sessionCustomerId = typeof window !== 'undefined' ? sessionStorage.getItem('customerId') : null;
    
    setCustomerId(urlCustomerId || sessionCustomerId || null);
  }, [searchParams]);

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Submit Your Medical Case
            </h1>
            <p className="text-lg text-gray-600">
              Get a comprehensive second opinion from world-class medical professionals
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <div className="max-w-4xl mx-auto">
            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Enhanced Submission Experience
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>This form adapts to your preferences and provides real-time validation to ensure accurate submission.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submission Form */}
            <div className="bg-white rounded-lg shadow-lg">
              <Suspense fallback={<LoadingState />}>
                <EnhancedCaseSubmissionForm />
              </Suspense>
            </div>

            {/* Help Section */}
            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Our support team is here to assist you with your submission
              </p>
              <div className="flex justify-center gap-4">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Support
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Us
                </button>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center text-sm text-gray-500">
                <svg className="h-5 w-5 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Your information is protected with bank-level encryption
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}