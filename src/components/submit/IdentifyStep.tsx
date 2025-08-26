'use client';

import { useState } from 'react';

interface IdentifyStepProps {
  personalInfo: any;
  onUpdate: (personalInfo: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function IdentifyStep({ personalInfo, onUpdate, onNext, onPrev }: IdentifyStepProps) {
  const [formData, setFormData] = useState({
    firstName: personalInfo?.firstName || '',
    middleName: personalInfo?.middleName || '',
    lastName: personalInfo?.lastName || '',
    dob: personalInfo?.dob || '',
    email: personalInfo?.email || '',
    phone: personalInfo?.phone || '',
    preferredChannel: personalInfo?.preferredChannel || 'EMAIL',
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const canProceed = formData.firstName && formData.lastName && formData.dob && formData.email;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Information</h2>
        <p className="text-gray-600">
          Please provide your personal details for case management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Middle Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Middle Name
          </label>
          <input
            type="text"
            value={formData.middleName}
            onChange={(e) => handleChange('middleName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => handleChange('dob', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Preferred Communication Channel */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Communication Channel
        </label>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="preferredChannel"
              value="EMAIL"
              checked={formData.preferredChannel === 'EMAIL'}
              onChange={(e) => handleChange('preferredChannel', e.target.value)}
              className="mr-3"
            />
            <span>Email</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="preferredChannel"
              value="SMS"
              checked={formData.preferredChannel === 'SMS'}
              onChange={(e) => handleChange('preferredChannel', e.target.value)}
              className="mr-3"
            />
            <span>SMS (requires phone number)</span>
          </label>
        </div>
        {formData.preferredChannel === 'SMS' && !formData.phone && (
          <p className="text-sm text-red-600 mt-2">
            Phone number is required for SMS notifications
          </p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          onClick={onPrev}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Back to Medical Context
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed || (formData.preferredChannel === 'SMS' && !formData.phone)}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            canProceed && !(formData.preferredChannel === 'SMS' && !formData.phone)
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Create Account
        </button>
      </div>
    </div>
  );
}
