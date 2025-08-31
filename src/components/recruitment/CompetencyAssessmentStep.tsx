'use client';

interface CompetencyAssessmentStepProps {
  competencyResult: any;
  applicationData: any;
}

const getScoreColor = (score: number) => {
  if (score < 40) return 'text-blue-600';
  if (score < 60) return 'text-green-600';  
  if (score < 80) return 'text-orange-600';
  return 'text-purple-600';
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'JUNIOR': return 'bg-blue-100 text-blue-800';
    case 'SENIOR': return 'bg-green-100 text-green-800';
    case 'EXPERT': return 'bg-orange-100 text-orange-800';
    case 'DISTINGUISHED': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getLevelDescription = (level: string) => {
  switch (level) {
    case 'JUNIOR':
      return 'Early career professional with foundational expertise. Eligible for routine case assignments with mentorship support.';
    case 'SENIOR':
      return 'Experienced professional with demonstrated competence. Qualified for standard complexity cases and specialty consultations.';
    case 'EXPERT':
      return 'Highly experienced professional with extensive expertise. Qualified for complex cases and may serve as a mentor to junior professionals.';
    case 'DISTINGUISHED':
      return 'Distinguished professional with exceptional qualifications. Eligible for the most complex cases and leadership roles within the network.';
    default:
      return 'Assessment pending additional review.';
  }
};

export default function CompetencyAssessmentStep({ 
  competencyResult, 
  applicationData 
}: CompetencyAssessmentStepProps) {
  if (!competencyResult) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your competency assessment...</p>
        </div>
      </div>
    );
  }

  const { totalScore, level, breakdown } = competencyResult;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Competency Assessment Complete</h2>
        <p className="text-gray-600">
          Your application has been submitted and your competency level has been determined.
        </p>
      </div>

      {/* Overall Score */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">Competency Score</p>
            <p className={`text-4xl font-bold ${getScoreColor(totalScore)}`}>
              {totalScore}/100
            </p>
          </div>
          
          <div>
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getLevelColor(level)}`}>
              {level} LEVEL
            </span>
          </div>
          
          <p className="text-gray-700 max-w-2xl mx-auto">
            {getLevelDescription(level)}
          </p>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Breakdown</h3>
        
        <div className="space-y-4">
          {Object.entries(breakdown).map(([category, score]: [string, any]) => {
            const categoryNames: { [key: string]: string } = {
              experience: 'Years of Practice',
              boardCertification: 'Board Certification',
              subspecialty: 'Subspecialty Focus',
              publications: 'Publications',
              clinicalTrials: 'Clinical Trials',
              conferenceTeaching: 'Conference & Teaching',
              societyMembership: 'Society Membership',
              leadership: 'Leadership Roles',
              peerReview: 'Peer Review Activities'
            };
            
            const maxScores: { [key: string]: number } = {
              experience: 20,
              boardCertification: 10,
              subspecialty: 5,
              publications: 15,
              clinicalTrials: 10,
              conferenceTeaching: 10,
              societyMembership: 5,
              leadership: 10,
              peerReview: 15
            };
            
            const categoryName = categoryNames[category] || category;
            const maxScore = maxScores[category] || 10;
            const percentage = Math.round((score / maxScore) * 100);
            
            return (
              <div key={category} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{categoryName}</span>
                    <span className="text-sm text-gray-600">{score}/{maxScore} points</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Application Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Professional Information</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Name:</span> {applicationData.firstName} {applicationData.lastName}</p>
              <p><span className="font-medium">Years of Practice:</span> {applicationData.yearsIndependentPractice} years</p>
              <p><span className="font-medium">Current Affiliation:</span> {applicationData.currentAffiliation}</p>
              <p><span className="font-medium">License Country:</span> {applicationData.licenseCountry}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Expertise Areas</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Subspecialties:</span></p>
              <div className="flex flex-wrap gap-1 mt-1">
                {(applicationData.subspecialties || []).map((sub: string, index: number) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {sub}
                  </span>
                ))}
              </div>
              <p className="mt-2"><span className="font-medium">Publications:</span> {applicationData.peerReviewedPublications}</p>
              <p><span className="font-medium">Society Memberships:</span> {(applicationData.oncologySocieties || []).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-green-900">Application Submitted Successfully</h4>
            <div className="text-sm text-green-700 mt-2 space-y-1">
              <p>Your application is now under review by our credentialing team.</p>
              <p><strong>What happens next:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Document verification (2-3 business days)</li>
                <li>Reference contact and verification (5-7 business days)</li>
                <li>Board certification and license verification (3-5 business days)</li>
                <li>Final credentialing committee review (1-2 business days)</li>
              </ul>
              <p className="mt-3"><strong>Expected timeline:</strong> 10-14 business days for complete review</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Questions or Concerns?</h4>
            <div className="text-sm text-blue-700 mt-1">
              <p>If you have questions about the application process or need to update any information:</p>
              <p className="mt-2">
                <strong>Email:</strong> recruitment@secondopinion.com<br/>
                <strong>Phone:</strong> +1 (555) 123-4567<br/>
                <strong>Hours:</strong> Monday-Friday, 9 AM - 5 PM EST
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Reference */}
      <div className="text-center bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          <strong>Application Reference:</strong> Please save this information for your records
        </p>
        <p className="text-lg font-mono font-bold text-gray-900 mt-2">
          APP-{new Date().getFullYear()}-{Math.random().toString(36).substr(2, 8).toUpperCase()}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Submitted on {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>

      {/* Print/Save Options */}
      <div className="flex justify-center space-x-4 pt-6">
        <button
          onClick={() => window.print()}
          className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>Print Assessment</span>
        </button>
        
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}