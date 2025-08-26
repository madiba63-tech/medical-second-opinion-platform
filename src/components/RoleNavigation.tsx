'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Role {
  name: string;
  path: string;
  description: string;
  icon: string;
}

const roles: Role[] = [
  {
    name: "Submit New Case",
    path: "/submit",
    description: "First-time customer submission funnel",
    icon: "📝"
  },
  {
    name: "Customer Portal",
    path: "/portal",
    description: "Manage cases, view reports & profile",
    icon: "👤"
  },
  {
    name: "Professional Portal",
    path: "/professional",
    description: "Review cases and create medical opinions",
    icon: "👨‍⚕️"
  },
  {
    name: "Professional Recruitment",
    path: "/professional/apply",
    description: "8-step recruitment & vetting process",
    icon: "🎯"
  },
  {
    name: "AI Document Demo",
    path: "/ai-demo",
    description: "Test AI-powered document processing",
    icon: "🤖"
  },
  {
    name: "Admin Portal",
    path: "/admin",
    description: "Manage professionals, cases & system settings",
    icon: "⚙️"
  }
];

export default function RoleNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure client-side rendering to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Render a placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="relative" suppressHydrationWarning>
        {/* Placeholder button that matches the final structure */}
        <button
          style={{ 
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 50,
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '0.75rem',
            borderRadius: '50%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            border: '2px solid white',
            cursor: 'pointer',
            WebkitTransition: 'background-color 0.2s ease-in-out',
            MozTransition: 'background-color 0.2s ease-in-out',
            msTransition: 'background-color 0.2s ease-in-out',
            transition: 'background-color 0.2s ease-in-out',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="relative" suppressHydrationWarning>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 50,
          backgroundColor: '#dc2626',
          color: 'white',
          padding: '0.75rem',
          borderRadius: '50%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          border: '2px solid white',
          cursor: 'pointer',
          WebkitTransition: 'background-color 0.2s ease-in-out',
          MozTransition: 'background-color 0.2s ease-in-out',
          msTransition: 'background-color 0.2s ease-in-out',
          transition: 'background-color 0.2s ease-in-out',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#b91c1c';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#dc2626';
        }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          WebkitTransform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          MozTransform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          msTransform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Role Navigation</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 p-1"
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4 text-xs">
            Switch between different user interfaces to explore the complete medical second opinion platform.
          </p>

          {/* Role Cards */}
          <div className="space-y-2">
            {roles.map((role) => (
              <Link
                key={role.path}
                href={role.path}
                onClick={() => setIsOpen(false)}
                className="block bg-gray-50 hover:bg-gray-100 rounded-md p-3 transition-colors border border-gray-200 hover:border-blue-300"
                style={{
                  WebkitTransition: 'all 0.2s ease-in-out',
                  MozTransition: 'all 0.2s ease-in-out',
                  msTransition: 'all 0.2s ease-in-out',
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <div className="flex items-start">
                  <span className="text-lg mr-2 flex-shrink-0">{role.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm leading-tight">{role.name}</h3>
                    <p className="text-xs text-gray-600 leading-tight">{role.description}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              This is a demonstration platform showcasing different user roles and workflows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
