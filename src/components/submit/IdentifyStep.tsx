'use client';

import { useState } from 'react';

interface IdentifyStepProps {
  personalInfo: any;
  onUpdate: (personalInfo: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const GENDER_OPTIONS = [
  'Male', 'Female', 'Non-binary', 'Other', "Don't know / Prefer not to tell"
];

const COUNTRY_OPTIONS = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Spain', 
  'Italy', 'Netherlands', 'Switzerland', 'Austria', 'Belgium', 'Sweden',
  'Norway', 'Denmark', 'Australia', 'New Zealand', 'Other', "Don't know / Prefer not to tell"
];

const ETHNICITY_OPTIONS = [
  'White', 'Black or African American', 'Hispanic or Latino', 'Asian', 
  'Native American', 'Pacific Islander', 'Mixed ethnicity', 'Other', "Don't know / Prefer not to tell"
];

const COMMUNICATION_CHANNELS = [
  'Email', 'SMS', 'WhatsApp', "Don't know / Prefer not to tell"
];

const LANGUAGE_OPTIONS = [
  'English', 'German', 'Spanish', 'French', 'Other', "Don't know / Prefer not to tell"
];

export default function IdentifyStep({ personalInfo, onUpdate, onNext, onPrev }: IdentifyStepProps) {
  const [formData, setFormData] = useState({
    firstName: personalInfo?.firstName || '',
    middleName: personalInfo?.middleName || '',
    lastName: personalInfo?.lastName || '',
    dob: personalInfo?.dob || '',
    gender: personalInfo?.gender || '',
    countryOfResidence: personalInfo?.countryOfResidence || '',
    ethnicity: personalInfo?.ethnicity || '',
    email: personalInfo?.email || '',
    phone: personalInfo?.phone || '',
    preferredChannel: personalInfo?.preferredChannel || 'Email',
    languagePreference: personalInfo?.languagePreference || 'English',
  });

  const handleChange = (field: string, value: string) => {
    let processedValue = value;
    
    // Handle date format conversion if needed
    if (field === 'dob' && value) {
      // If user enters MM/DD/YYYY, convert to YYYY-MM-DD
      const mmddyyyy = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (mmddyyyy) {
        processedValue = `${mmddyyyy[3]}-${mmddyyyy[1]}-${mmddyyyy[2]}`;
        console.log(`Date converted from ${value} to ${processedValue}`);
      }
    }
    
    const newData = { ...formData, [field]: processedValue };
    setFormData(newData);
    onUpdate(newData);
  };

  // Enhanced validation logic
  const isFirstNameValid = formData.firstName && formData.firstName.trim().length > 0;
  const isLastNameValid = formData.lastName && formData.lastName.trim().length > 0;
  const isDobValid = formData.dob && formData.dob.trim().length > 0;
  const isEmailValid = formData.email && formData.email.trim().length > 0;
  const isGenderValid = formData.gender && formData.gender.trim().length > 0;
  
  // Phone validation for SMS/WhatsApp
  const needsPhone = formData.preferredChannel === 'SMS' || formData.preferredChannel === 'WhatsApp';
  const isPhoneValid = !needsPhone || (formData.phone && formData.phone.trim().length > 0);
  
  const canProceed = isFirstNameValid && isLastNameValid && isDobValid && isEmailValid && isGenderValid && isPhoneValid;

  // Enhanced debug logging
  console.log('Form validation state:', {
    firstName: { value: formData.firstName, valid: isFirstNameValid },
    lastName: { value: formData.lastName, valid: isLastNameValid },
    dob: { value: formData.dob, valid: isDobValid },
    email: { value: formData.email, valid: isEmailValid },
    gender: { value: formData.gender, valid: isGenderValid },
    phone: { value: formData.phone, needed: needsPhone, valid: isPhoneValid },
    preferredChannel: formData.preferredChannel,
    canProceed,
    allFieldsStatus: {
      isFirstNameValid,
      isLastNameValid, 
      isDobValid,
      isEmailValid,
      isGenderValid,
      isPhoneValid
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Information</h2>
        <p className="text-gray-600">
          Please provide your personal details for case management.
        </p>
      </div>

      {/* Personal Information Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Full Name</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                formData.firstName ? (isFirstNameValid ? 'border-green-300 focus:ring-green-500' : 'border-red-300 focus:ring-red-500') : 'border-gray-300 focus:ring-blue-500'
              }`}
              required
            />
            {formData.firstName && !isFirstNameValid && (
              <p className="text-sm text-red-600 mt-1">First name is required</p>
            )}
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
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                formData.lastName ? (isLastNameValid ? 'border-green-300 focus:ring-green-500' : 'border-red-300 focus:ring-red-500') : 'border-gray-300 focus:ring-blue-500'
              }`}
              required
            />
            {formData.lastName && !isLastNameValid && (
              <p className="text-sm text-red-600 mt-1">Last name is required</p>
            )}
          </div>
        </div>
      </div>

      {/* Demographic Information Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Demographic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => handleChange('dob', e.target.value)}
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                formData.dob ? (isDobValid ? 'border-green-300 focus:ring-green-500' : 'border-red-300 focus:ring-red-500') : 'border-gray-300 focus:ring-blue-500'
              }`}
              required
            />
            {formData.dob && !isDobValid && (
              <p className="text-sm text-red-600 mt-1">Date of birth is required</p>
            )}
          </div>

          {/* Sex/Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sex/Gender <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                formData.gender ? (isGenderValid ? 'border-green-300 focus:ring-green-500' : 'border-red-300 focus:ring-red-500') : 'border-gray-300 focus:ring-blue-500'
              }`}
              required
            >
              <option value="">Select gender</option>
              {GENDER_OPTIONS.map(gender => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
            {formData.gender && !isGenderValid && (
              <p className="text-sm text-red-600 mt-1">Gender selection is required</p>
            )}
          </div>

          {/* Country of Residence */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country of Residence
            </label>
            <select
              value={formData.countryOfResidence}
              onChange={(e) => handleChange('countryOfResidence', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select country</option>
              {COUNTRY_OPTIONS.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {/* Ethnicity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ethnicity
            </label>
            <select
              value={formData.ethnicity}
              onChange={(e) => handleChange('ethnicity', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select ethnicity</option>
              {ETHNICITY_OPTIONS.map(ethnicity => (
                <option key={ethnicity} value={ethnicity}>{ethnicity}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                formData.email ? (isEmailValid ? 'border-green-300 focus:ring-green-500' : 'border-red-300 focus:ring-red-500') : 'border-gray-300 focus:ring-blue-500'
              }`}
              required
            />
            {formData.email && !isEmailValid && (
              <p className="text-sm text-red-600 mt-1">Email address is required</p>
            )}
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
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                needsPhone ? 
                  (isPhoneValid ? 'border-green-300 focus:ring-green-500' : 'border-red-300 focus:ring-red-500') : 
                  'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {needsPhone && !isPhoneValid && (
              <p className="text-sm text-red-600 mt-1">Phone number is required for {formData.preferredChannel} notifications</p>
            )}
          </div>
        </div>
      </div>

      {/* Communication Preferences Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Preferred Communication Channel */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Preferred Communication Channel
            </label>
            <select
              value={formData.preferredChannel}
              onChange={(e) => handleChange('preferredChannel', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {COMMUNICATION_CHANNELS.map(channel => (
                <option key={channel} value={channel}>{channel}</option>
              ))}
            </select>
          </div>

          {/* Language Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Language Preference
            </label>
            <select
              value={formData.languagePreference}
              onChange={(e) => handleChange('languagePreference', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {LANGUAGE_OPTIONS.map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          </div>
        </div>
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
          disabled={!canProceed}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            canProceed
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Review
        </button>
      </div>
    </div>
  );
}
