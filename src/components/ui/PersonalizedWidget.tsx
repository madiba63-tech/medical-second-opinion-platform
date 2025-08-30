'use client';

import { useState, useEffect } from 'react';

interface PersonalizedWidgetProps {
  widgetType: 'support_access' | 'quick_actions' | 'resources' | 'progress';
  className?: string;
  customerId?: string;
}

export function PersonalizedWidget({ 
  widgetType, 
  className = '',
  customerId 
}: PersonalizedWidgetProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  const renderWidget = () => {
    switch (widgetType) {
      case 'support_access':
        return (
          <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className}`}>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Quick Support Access</h3>
                <p className="text-xs text-gray-500">Get help when you need it</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-xs font-medium transition-colors">
                Live Chat
              </button>
              <button className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 px-3 py-2 rounded-lg text-xs font-medium transition-colors">
                Call Support
              </button>
            </div>
          </div>
        );

      case 'quick_actions':
        return (
          <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className}`}>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">📋</span>
                  <span className="text-sm text-gray-700">View Cases</span>
                </div>
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">💬</span>
                  <span className="text-sm text-gray-700">Contact Support</span>
                </div>
              </button>
            </div>
          </div>
        );

      case 'resources':
        return (
          <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className}`}>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Helpful Resources</h3>
            <div className="space-y-2">
              <a href="#" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-xs font-medium text-gray-900">Second Opinion Guide</div>
                <div className="text-xs text-gray-500">Learn about the process</div>
              </a>
              <a href="#" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-xs font-medium text-gray-900">FAQ</div>
                <div className="text-xs text-gray-500">Common questions answered</div>
              </a>
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className}`}>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Your Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Case Review</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Estimated completion: 2-3 days
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className}`}>
            <div className="text-sm text-gray-500">Widget type not supported</div>
          </div>
        );
    }
  };

  return renderWidget();
}