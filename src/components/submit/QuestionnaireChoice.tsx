'use client';

import { useState } from 'react';

interface QuestionnaireChoiceProps {
  onChoice: (type: 'short' | 'detailed') => void;
}

export default function QuestionnaireChoice({ onChoice }: QuestionnaireChoiceProps) {
  const [selectedType, setSelectedType] = useState<'short' | 'detailed' | null>(null);

  const handleChoice = (type: 'short' | 'detailed') => {
    setSelectedType(type);
    onChoice(type);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Medical Questionnaire</h2>
        <p className="text-gray-600">
          Choose the questionnaire that best fits your needs and time availability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Short Questionnaire Option */}
        <div 
          className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg ${
            selectedType === 'short' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-200'
          }`}
          onClick={() => handleChoice('short')}
        >
          <div className="flex items-start space-x-4">
            <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedType === 'short' 
                ? 'border-blue-500 bg-blue-500' 
                : 'border-gray-300'
            }`}>
              {selectedType === 'short' && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Short Questionnaire
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Quick and focused questions about your cancer diagnosis and treatment goals.
              </p>
              
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>5-7 minutes to complete</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>5 focused questions</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Ideal for initial consultation</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Covers:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Cancer type and stage</li>
                  <li>• Current treatments</li>
                  <li>• Second opinion goals</li>
                  <li>• Basic health conditions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Questionnaire Option */}
        <div 
          className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg ${
            selectedType === 'detailed' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-200'
          }`}
          onClick={() => handleChoice('detailed')}
        >
          <div className="flex items-start space-x-4">
            <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedType === 'detailed' 
                ? 'border-blue-500 bg-blue-500' 
                : 'border-gray-300'
            }`}>
              {selectedType === 'detailed' && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Detailed Questionnaire
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Comprehensive medical history for thorough analysis and expert review.
              </p>
              
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>15-20 minutes to complete</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>20+ comprehensive questions</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Most comprehensive analysis</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Covers:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Complete diagnosis history</li>
                  <li>• Detailed treatment timeline</li>
                  <li>• Family & genetic history</li>
                  <li>• Lifestyle factors</li>
                  <li>• Clinical trial preferences</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg className="flex-shrink-0 w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-800">How to Choose</h4>
            <p className="text-sm text-blue-700 mt-1">
              <strong>Short questionnaire</strong> is perfect for quick second opinions and initial consultations. 
              <strong> Detailed questionnaire</strong> provides comprehensive data for complex cases and enables more thorough expert analysis.
            </p>
          </div>
        </div>
      </div>

      {selectedType && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-green-800">
              <strong>{selectedType === 'short' ? 'Short' : 'Detailed'} questionnaire selected.</strong> 
              You can always provide additional information during the review step.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}