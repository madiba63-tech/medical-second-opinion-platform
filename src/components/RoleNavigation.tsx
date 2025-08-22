'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Role {
  name: string;
  path: string;
  description: string;
  icon: string;
}

const roles: Role[] = [
  {
    name: "Patient Portal",
    path: "/",
    description: "Submit medical cases for second opinion",
    icon: "🏥"
  },
  {
    name: "Customer Portal",
    path: "/customer",
    description: "View your cases and medical opinions",
    icon: "👤"
  },
  {
    name: "Professional Portal",
    path: "/professional",
    description: "Review cases and create medical opinions",
    icon: "👨‍⚕️"
  },
  {
    name: "Admin Dashboard",
    path: "/admin",
    description: "Manage professionals and case assignments",
    icon: "⚙️"
  }
];

export default function RoleNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors border-2 border-white"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
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
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Role Navigation</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6 text-sm">
            Switch between different user interfaces to explore the complete medical second opinion platform.
          </p>

          {/* Role Cards */}
          <div className="space-y-3">
            {roles.map((role) => (
              <Link
                key={role.path}
                href={role.path}
                onClick={() => setIsOpen(false)}
                className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-colors border border-gray-200 hover:border-blue-300"
              >
                <div className="flex items-start">
                  <span className="text-2xl mr-3">{role.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{role.name}</h3>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              This is a demonstration platform showcasing different user roles and workflows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
