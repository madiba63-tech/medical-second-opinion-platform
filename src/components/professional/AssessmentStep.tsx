'use client';

import { useState, useEffect } from 'react';
import { calculateCompetencyScore, getLevelDescription, getScoreBreakdown } from '@/utils/competencyScoring';

interface AssessmentStepProps {
  data: any;
  onPrev: () => void;
}

export default function AssessmentStep({ data, onPrev }: AssessmentStepProps) {
  const [submitting, setSubmitting] = useState(false);
  const [competencyScore, setCompetencyScore] = useState<any>(null);

  useEffect(() => {
    // Calculate competency score when component mounts
    try {
      const score = calculateCompetencyScore(data);
      setCompetencyScore(score);
    } catch (error) {
      console.error('Error calculating competency score:', error);
    }
  }, [data]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/v1/recruit/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Application submission failed');
      }

      const result = await response.json();
      alert(`Application submitted successfully! Your professional number is: ${result.proNumber}`);
      // Redirect to success page or dashboard
    } catch (error) {
      console.error('Submission error:', error);
      alert(error instanceof Error ? error.message : 'Application submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (!competencyScore) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Calculating your competency score...</p>
      </div>
    );
  }

  const scoreBreakdown = getScoreBreakdown(competencyScore);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Competency Assessment</h2>
        <p className="text-gray-600">
          Based on your application, here's your competency assessment and professional level.
        </p>
      </div>

      {/* Competency Level */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Professional Level</h3>
          <div className={`inline-block px-4 py-2 rounded-full text-white font-semibold text-lg mb-3 ${
            competencyScore.level === 'DISTINGUISHED' ? 'bg-purple-600' :
            competencyScore.level === 'EXPERT' ? 'bg-blue-600' :
            competencyScore.level === 'SENIOR' ? 'bg-green-600' :
            'bg-gray-600'
          }`}>
            {competencyScore.level}
          </div>
          <p className="text-gray-700">{getLevelDescription(competencyScore.level)}</p>
        </div>
      </div>

      {/* Total Score */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Competency Score</h3>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-blue-600 mb-2">{competencyScore.totalScore}/100</div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(competencyScore.totalScore / 100) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="space-y-3">
          {scoreBreakdown.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{item.category}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">{item.score}/{item.max}</span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(item.score / item.max) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Name:</span>
            <span className="ml-2 text-gray-900">
              {data.firstName} {data.middleName} {data.lastName}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Email:</span>
            <span className="ml-2 text-gray-900">{data.email}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Years of Practice:</span>
            <span className="ml-2 text-gray-900">{data.yearsPractice} years</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Publications:</span>
            <span className="ml-2 text-gray-900">{data.publications}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Subspecialties:</span>
            <span className="ml-2 text-gray-900">{data.subspecialties?.join(', ') || 'None specified'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Society Memberships:</span>
            <span className="ml-2 text-gray-900">{data.societyMemberships?.length || 0} societies</span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">What Happens Next?</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>1. Your application will be reviewed by our medical credentialing team</p>
          <p>2. We'll verify your documents and credentials</p>
          <p>3. You'll receive an email notification once your application is approved</p>
          <p>4. Once vetted, you'll be eligible to receive case assignments</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Back to Compliance
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            submitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </div>
  );
}
