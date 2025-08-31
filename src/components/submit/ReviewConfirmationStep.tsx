'use client';

import { useState } from 'react';

interface ReviewConfirmationStepProps {
  tempSubmission: any;
  onNext: () => void;
  onPrev: () => void;
}

export default function ReviewConfirmationStep({ tempSubmission, onNext, onPrev }: ReviewConfirmationStepProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedDataProcessing, setAcceptedDataProcessing] = useState(false);

  const { medicalFiles = [], contextInfo = {}, personalInfo = {} } = tempSubmission;

  const canProceed = acceptedTerms && acceptedDataProcessing;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderQuestionnaire = () => {
    if (contextInfo.questionnaireType === 'short') {
      return (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Short Questionnaire Responses</h4>
          <div className="space-y-2 text-sm">
            {contextInfo.cancerType && (
              <div className="flex justify-between">
                <span className="text-gray-600">Cancer Type:</span>
                <span className="font-medium">{contextInfo.cancerType}</span>
              </div>
            )}
            {contextInfo.cancerStage && (
              <div className="flex justify-between">
                <span className="text-gray-600">Cancer Stage:</span>
                <span className="font-medium">{contextInfo.cancerStage}</span>
              </div>
            )}
            {contextInfo.treatmentsReceived?.length > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Treatments:</span>
                <span className="font-medium">{contextInfo.treatmentsReceived.join(', ')}</span>
              </div>
            )}
            {contextInfo.secondOpinionGoal && (
              <div className="flex justify-between">
                <span className="text-gray-600">Main Goal:</span>
                <span className="font-medium">{contextInfo.secondOpinionGoal}</span>
              </div>
            )}
            {contextInfo.hasOtherConditions && (
              <div className="flex justify-between">
                <span className="text-gray-600">Other Conditions:</span>
                <span className="font-medium">
                  {contextInfo.hasOtherConditions === true ? 'Yes' : 
                   contextInfo.hasOtherConditions === false ? 'No' : 
                   contextInfo.hasOtherConditions}
                </span>
              </div>
            )}
            {contextInfo.otherHealthConditions && (
              <div>
                <span className="text-gray-600">Details:</span>
                <p className="font-medium mt-1">{contextInfo.otherHealthConditions}</p>
              </div>
            )}
          </div>
        </div>
      );
    } else if (contextInfo.questionnaireType === 'detailed') {
      return (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Detailed Questionnaire Responses</h4>
          <div className="space-y-3 text-sm">
            {/* Diagnosis & History */}
            <div className="bg-gray-50 p-3 rounded">
              <h5 className="font-medium text-gray-800 mb-2">Diagnosis & History</h5>
              <div className="space-y-1">
                {contextInfo.cancerType && <p><span className="text-gray-600">Type:</span> {contextInfo.cancerType}</p>}
                {contextInfo.cancerStage && <p><span className="text-gray-600">Stage:</span> {contextInfo.cancerStage}</p>}
                {contextInfo.diagnosisDate && <p><span className="text-gray-600">Diagnosed:</span> {contextInfo.diagnosisDate}</p>}
                {contextInfo.hospitalClinic && <p><span className="text-gray-600">Hospital:</span> {contextInfo.hospitalClinic}</p>}
              </div>
            </div>

            {/* Treatment History */}
            {contextInfo.treatmentsReceived?.length > 0 && (
              <div className="bg-gray-50 p-3 rounded">
                <h5 className="font-medium text-gray-800 mb-2">Treatment History</h5>
                <p><span className="text-gray-600">Treatments:</span> {contextInfo.treatmentsReceived.join(', ')}</p>
                {contextInfo.treatmentResponse && (
                  <p><span className="text-gray-600">Response:</span> {contextInfo.treatmentResponse}</p>
                )}
              </div>
            )}

            {/* Family History */}
            {contextInfo.familyHistory?.length > 0 && (
              <div className="bg-gray-50 p-3 rounded">
                <h5 className="font-medium text-gray-800 mb-2">Family History</h5>
                <p><span className="text-gray-600">Family members:</span> {contextInfo.familyHistory.join(', ')}</p>
              </div>
            )}

            {/* Goals */}
            {contextInfo.secondOpinionGoals?.length > 0 && (
              <div className="bg-gray-50 p-3 rounded">
                <h5 className="font-medium text-gray-800 mb-2">Second Opinion Goals</h5>
                <p>{contextInfo.secondOpinionGoals.join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Confirmation</h2>
        <p className="text-gray-600">
          Please review all your information before submitting your case for expert analysis.
        </p>
      </div>

      {/* Document Review */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📄 Uploaded Documents</h3>
        {medicalFiles.length > 0 ? (
          <div className="space-y-3">
            {medicalFiles.map((file: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)} • {file.category || 'Medical Record'}</p>
                  </div>
                </div>
                <div className="flex items-center text-green-600">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Uploaded</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No documents uploaded</p>
        )}
      </div>

      {/* Medical Information Review */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🩺 Medical Information</h3>
        {renderQuestionnaire()}
      </div>

      {/* Personal Information Review */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">👤 Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
            <div className="space-y-2 text-sm">
              {personalInfo.firstName && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">
                    {[personalInfo.firstName, personalInfo.middleName, personalInfo.lastName]
                      .filter(Boolean).join(' ')}
                  </span>
                </div>
              )}
              {personalInfo.dob && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Date of Birth:</span>
                  <span className="font-medium">{new Date(personalInfo.dob).toLocaleDateString()}</span>
                </div>
              )}
              {personalInfo.gender && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-medium">{personalInfo.gender}</span>
                </div>
              )}
              {personalInfo.countryOfResidence && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Country:</span>
                  <span className="font-medium">{personalInfo.countryOfResidence}</span>
                </div>
              )}
              {personalInfo.ethnicity && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Ethnicity:</span>
                  <span className="font-medium">{personalInfo.ethnicity}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Contact & Preferences</h4>
            <div className="space-y-2 text-sm">
              {personalInfo.email && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.preferredChannel && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Communication:</span>
                  <span className="font-medium">{personalInfo.preferredChannel}</span>
                </div>
              )}
              {personalInfo.languagePreference && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Language:</span>
                  <span className="font-medium">{personalInfo.languagePreference}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Terms & Conditions</h3>
        
        <div className="space-y-4">
          {/* Terms of Service */}
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Terms of Service</h4>
            <div className="text-sm text-gray-600 space-y-2 max-h-32 overflow-y-auto">
              <p>
                By using our medical second opinion service, you agree to the following terms:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>This service provides medical second opinions for educational purposes</li>
                <li>Our recommendations do not replace your primary physician's care</li>
                <li>You maintain responsibility for all medical decisions</li>
                <li>All medical information will be reviewed by licensed healthcare professionals</li>
                <li>Response times may vary based on case complexity</li>
              </ul>
            </div>
            <label className="flex items-center mt-3">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                I agree to the Terms of Service <span className="text-red-500">*</span>
              </span>
            </label>
          </div>

          {/* Data Processing Agreement */}
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Data Processing & Privacy</h4>
            <div className="text-sm text-gray-600 space-y-2 max-h-32 overflow-y-auto">
              <p>
                We are committed to protecting your privacy and handling your data responsibly:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your medical data is encrypted and securely stored</li>
                <li>Information is shared only with assigned medical professionals</li>
                <li>We comply with HIPAA, GDPR, and applicable privacy regulations</li>
                <li>You have the right to access, modify, or delete your data</li>
                <li>Data retention follows medical record keeping standards</li>
                <li>Third-party integrations are HIPAA-compliant</li>
              </ul>
            </div>
            <label className="flex items-center mt-3">
              <input
                type="checkbox"
                checked={acceptedDataProcessing}
                onChange={(e) => setAcceptedDataProcessing(e.target.checked)}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                I consent to the data processing as described <span className="text-red-500">*</span>
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Final Confirmation */}
      {acceptedTerms && acceptedDataProcessing && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-green-800">Ready to Submit</h4>
              <p className="text-sm text-green-700">
                Your information package is ready to be sent to our medical experts. 
                You'll receive a confirmation email and case tracking number.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          onClick={onPrev}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Back to Your Information
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            canProceed
              ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {canProceed ? '🚀 Submit Case for Review' : 'Please accept terms to continue'}
        </button>
      </div>
    </div>
  );
}