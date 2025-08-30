'use client';

import { useState, Suspense } from 'react';
import PersonalizedDashboard from '@/components/portal/PersonalizedDashboard';
import ErrorBoundary from '@/components/ErrorBoundary';
import Link from 'next/link';

// Loading spinner component
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your personalized portal...</p>
      </div>
    </div>
  );
}

export default function EnhancedCustomerPortal() {
  const [activeView, setActiveView] = useState<'personalized' | 'standard'>('personalized');
  
  // Mock customer ID - in production, this would come from authentication
  const mockCustomerId = 'customer-123';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">Medical Second Opinion Platform</h1>
              </Link>
              <nav className="ml-10 flex space-x-8">
                <Link href="/portal/cases" className="text-gray-500 hover:text-gray-900">
                  My Cases
                </Link>
                <Link href="/portal/billing" className="text-gray-500 hover:text-gray-900">
                  Billing
                </Link>
                <Link href="/portal/profile" className="text-gray-500 hover:text-gray-900">
                  Profile
                </Link>
              </nav>
            </div>

            {/* Experience Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Experience:</span>
                <select
                  value={activeView}
                  onChange={(e) => setActiveView(e.target.value as 'personalized' | 'standard')}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="personalized">Personalized</option>
                  <option value="standard">Standard</option>
                </select>
              </div>
              
              <Link
                href="/admin"
                className="text-blue-600 hover:text-blue-900 text-sm"
              >
                Admin Panel →
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            {activeView === 'personalized' ? (
              <PersonalizedDashboard customerId={mockCustomerId} />
            ) : (
              <StandardPortalView />
            )}
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/support" className="text-gray-600 hover:text-gray-900">Help Center</Link></li>
                <li><Link href="/support/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link></li>
                <li><Link href="/support/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/resources" className="text-gray-600 hover:text-gray-900">Health Education</Link></li>
                <li><Link href="/resources/testimonials" className="text-gray-600 hover:text-gray-900">Patient Stories</Link></li>
                <li><Link href="/resources/professionals" className="text-gray-600 hover:text-gray-900">Our Professionals</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
                <li><Link href="/security" className="text-gray-600 hover:text-gray-900">Security</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Standard portal view for comparison
function StandardPortalView() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Customer Portal</h2>
        <p className="text-gray-600 mb-6">
          This is the standard portal view. Switch to "Personalized" to see the enhanced customer lifecycle experience.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">My Cases</h3>
            <p className="text-sm text-gray-600 mb-3">View and manage your medical cases</p>
            <Link href="/portal/cases" className="text-blue-600 hover:text-blue-900 text-sm">
              View Cases →
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Profile Settings</h3>
            <p className="text-sm text-gray-600 mb-3">Update your account information</p>
            <Link href="/portal/profile" className="text-blue-600 hover:text-blue-900 text-sm">
              Edit Profile →
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
            <p className="text-sm text-gray-600 mb-3">Get help when you need it</p>
            <Link href="/support" className="text-blue-600 hover:text-blue-900 text-sm">
              Contact Support →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}