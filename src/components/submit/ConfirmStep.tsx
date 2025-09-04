'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ConfirmStepProps {
  caseId: string;
  setCaseId: (id: string) => void;
  tempId: string;
  personalInfo?: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phone?: string;
  };
}

export default function ConfirmStep({ caseId, setCaseId, tempId, personalInfo }: ConfirmStepProps) {
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    // Simulate case creation and notification sending
    const createCase = async () => {
      try {
        // Mock case creation
        const mockCaseId = `CASE-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        setCaseId(mockCaseId);
        
        // Use actual customer name from personal info
        const fullName = personalInfo ? 
          `${personalInfo.firstName}${personalInfo.middleName ? ` ${personalInfo.middleName}` : ''} ${personalInfo.lastName}`.trim() : 
          'Unknown Customer';
        setCustomerName(fullName);
        
        // Simulate sending notifications with actual customer data
        await fetch('/api/acknowledgement', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: personalInfo?.firstName || '',
            lastName: personalInfo?.lastName || '',
            caseId: mockCaseId,
            email: personalInfo?.email || '',
          }),
        });

        await fetch('/api/payment-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: personalInfo?.email || '',
            paymentId: `txn_${Date.now()}`,
            caseId: mockCaseId,
            amount: '423.00',
          }),
        });

        setLoading(false);
      } catch (error) {
        console.error('Case creation error:', error);
        setLoading(false);
      }
    };

    createCase();
  }, [setCaseId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Your Case</h2>
          <p className="text-gray-600">
            Creating your case and sending confirmation notifications...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Case Submitted Successfully!</h2>
        <p className="text-gray-600">
          Thank you for submitting your case. We've sent confirmation emails to your registered address.
        </p>
      </div>

      {/* Case Details */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Case Information</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-blue-700">Customer Name:</span>
            <span className="font-medium text-blue-900">{customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">Case Number:</span>
            <span className="font-medium text-blue-900">{caseId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">Status:</span>
            <span className="font-medium text-blue-900">Submitted for Review</span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What Happens Next?</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
              1
            </div>
            <div>
              <h4 className="font-medium text-gray-900">AI Analysis</h4>
              <p className="text-sm text-gray-600">Your documents will be analyzed by our AI system for preliminary insights.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
              2
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Professional Assignment</h4>
              <p className="text-sm text-gray-600">A qualified medical professional will be assigned to review your case.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
              3
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Second Opinion Report</h4>
              <p className="text-sm text-gray-600">You'll receive a comprehensive second opinion report within 5-7 business days.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Access Your Portal */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Access Your Customer Portal</h3>
        <p className="text-gray-600 mb-6">
          Your customer portal gives you complete access to manage your medical consultations and account information.
        </p>

        {/* Portal Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start p-3 bg-blue-50 rounded-lg">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div>
              <h4 className="font-medium text-gray-900">MyCases</h4>
              <p className="text-sm text-gray-600">Track progress and download reports</p>
            </div>
          </div>
          
          <div className="flex items-start p-3 bg-green-50 rounded-lg">
            <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <div>
              <h4 className="font-medium text-gray-900">MyProfile</h4>
              <p className="text-sm text-gray-600">Update personal and contact information</p>
            </div>
          </div>
          
          <div className="flex items-start p-3 bg-purple-50 rounded-lg">
            <svg className="w-5 h-5 text-purple-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <div>
              <h4 className="font-medium text-gray-900">MyInvoices</h4>
              <p className="text-sm text-gray-600">View payment history and receipts</p>
            </div>
          </div>
          
          <div className="flex items-start p-3 bg-orange-50 rounded-lg">
            <svg className="w-5 h-5 text-orange-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <div>
              <h4 className="font-medium text-gray-900">Communications</h4>
              <p className="text-sm text-gray-600">Messages and notifications</p>
            </div>
          </div>
        </div>

        {/* Portal Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/portal"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 7 5 5 5-5" />
            </svg>
            Go to Customer Portal
          </Link>
          <Link
            href="/portal/cases"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View This Case
          </Link>
          <Link
            href="/submit"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Submit Another Case
          </Link>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
        <p className="text-gray-600 mb-4">
          If you have any questions about your case or need assistance, please don't hesitate to contact us.
        </p>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Email:</span> support@medicalsecondopinion.com</p>
          <p><span className="font-medium">Phone:</span> +1 (555) 123-4567</p>
          <p><span className="font-medium">Hours:</span> Monday - Friday, 9 AM - 6 PM EST</p>
        </div>
      </div>
    </div>
  );
}
