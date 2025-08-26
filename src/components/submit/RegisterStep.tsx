'use client';

import { useState } from 'react';

interface RegisterStepProps {
  tempSubmission: any;
  tempId: string;
  setTempId: (id: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function RegisterStep({ tempSubmission, tempId, setTempId, onNext, onPrev }: RegisterStepProps) {
  const [formData, setFormData] = useState({
    email: tempSubmission.personalInfo?.email || '',
    password: '',
    confirmPassword: '',
  });
  const [registering, setRegistering] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    setRegistering(true);

    try {
      // First, create/update temp submission
      const tempResponse = await fetch('/api/v1/funnel/temp', {
        method: tempId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...tempSubmission,
          personalInfo: tempSubmission.personalInfo,
        }),
      });

      if (!tempResponse.ok) {
        throw new Error('Failed to save temporary submission');
      }

      const tempData = await tempResponse.json();
      const newTempId = tempData.tempId;
      setTempId(newTempId);

      // Then register the user
      const registerResponse = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          tempId: newTempId,
          firstName: tempSubmission.personalInfo?.firstName || '',
          middleName: tempSubmission.personalInfo?.middleName || '',
          lastName: tempSubmission.personalInfo?.lastName || '',
          dob: tempSubmission.personalInfo?.dob || '',
          phone: tempSubmission.personalInfo?.phone || '',
          preferredChannel: tempSubmission.personalInfo?.preferredChannel || 'EMAIL',
        }),
      });

      if (!registerResponse.ok) {
        const error = await registerResponse.json();
        throw new Error(error.error || 'Registration failed');
      }

      onNext();
    } catch (error) {
      console.error('Registration error:', error);
      alert(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
        <p className="text-gray-600">
          Create a secure account to access your case and receive updates.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            minLength={8}
          />
          <p className="text-sm text-gray-500 mt-1">Minimum 8 characters</p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-900">Secure Account</h4>
              <p className="text-sm text-blue-700 mt-1">
                Your account is protected with industry-standard encryption. You'll use this to access your case status and download your second opinion report.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onPrev}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Back to Your Information
          </button>
          <button
            type="submit"
            disabled={registering || !formData.email || !formData.password || !formData.confirmPassword}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              !registering && formData.email && formData.password && formData.confirmPassword
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {registering ? 'Creating Account...' : 'Continue to Payment'}
          </button>
        </div>
      </form>
    </div>
  );
}
