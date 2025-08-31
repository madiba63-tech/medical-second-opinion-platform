'use client';

interface ReviewConfirmStepProps {
  applicationData: any;
  aiAnalysis: any;
  uploadedDocuments: any;
  onNext: () => void;
  onPrev: () => void;
  onEdit: (step: number) => void;
}

const stepNames = [
  'Identity & Contact',
  'Education & Training',
  'Licensing',
  'Professional Experience',
  'Research & Academic',
  'Professional Recognition',
  'Good Standing & Compliance'
];

export default function ReviewConfirmStep({
  applicationData,
  aiAnalysis,
  uploadedDocuments,
  onNext,
  onPrev,
  onEdit
}: ReviewConfirmStepProps) {

  const formatFieldValue = (value: any) => {
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(', ') : 'Not specified';
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (value === '' || value === null || value === undefined) {
      return 'Not specified';
    }
    if (typeof value === 'object' && value.name) {
      return value.name; // For File objects
    }
    return value.toString();
  };

  const getDocumentIcon = (filename: string) => {
    const ext = filename.toLowerCase().split('.').pop();
    switch (ext) {
      case 'pdf':
        return '📄';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return '🖼️';
      case 'doc':
      case 'docx':
        return '📝';
      default:
        return '📋';
    }
  };

  const applicationSections = [
    {
      step: 1,
      title: 'Identity & Contact Information',
      fields: [
        { label: 'Full Name', value: `${applicationData.firstName} ${applicationData.middleName} ${applicationData.lastName}`.trim() },
        { label: 'Email', value: applicationData.email },
        { label: 'Phone', value: applicationData.phone },
        { label: 'Date of Birth', value: applicationData.dateOfBirth },
        { label: 'Nationality', value: applicationData.nationality },
        { label: 'Government ID', value: applicationData.governmentId?.name || 'Not uploaded' }
      ]
    },
    {
      step: 2,
      title: 'Education & Training',
      fields: [
        { label: 'Medical Degree', value: applicationData.medicalDegree?.name || 'Not uploaded' },
        { label: 'Residency Certificate', value: applicationData.residencyCompletion?.name || 'Not uploaded' },
        { label: 'Fellowship Training', value: applicationData.fellowshipTraining?.name || 'Not uploaded' },
        { label: 'Board Certification', value: applicationData.boardCertification?.name || 'Not uploaded' },
        { label: 'Board Certification Number', value: applicationData.boardCertificationNumber }
      ]
    },
    {
      step: 3,
      title: 'Medical Licensing',
      fields: [
        { label: 'License Number', value: applicationData.medicalLicenseNumber },
        { label: 'License Country', value: applicationData.licenseCountry },
        { label: 'License State/Province', value: applicationData.licenseState },
        { label: 'License Expiry', value: applicationData.licenseExpiry },
        { label: 'License Certificate', value: applicationData.licenseCertificate?.name || 'Not uploaded' },
        { label: 'Good Standing Certificate', value: applicationData.goodStandingCertificate?.name || 'Not uploaded' }
      ]
    },
    {
      step: 4,
      title: 'Professional Experience',
      fields: [
        { label: 'Years of Independent Practice', value: applicationData.yearsIndependentPractice },
        { label: 'Current Affiliation', value: applicationData.currentAffiliation },
        { label: 'Subspecialties', value: applicationData.subspecialties },
        { label: 'CV/Resume', value: applicationData.cv?.name || 'Not uploaded' }
      ]
    },
    {
      step: 5,
      title: 'Research & Academic Contributions',
      fields: [
        { label: 'Peer-Reviewed Publications', value: applicationData.peerReviewedPublications },
        { label: 'Clinical Trial Involvement', value: applicationData.clinicalTrialInvolvement },
        { label: 'Clinical Trial Details', value: applicationData.clinicalTrialDetails },
        { label: 'Conference Presentations', value: applicationData.conferencePresentations },
        { label: 'Conference Details', value: applicationData.conferenceDetails },
        { label: 'Teaching Roles', value: applicationData.teachingRoles },
        { label: 'Teaching Details', value: applicationData.teachingDetails }
      ]
    },
    {
      step: 6,
      title: 'Professional Recognition',
      fields: [
        { label: 'Society Memberships', value: applicationData.oncologySocieties },
        { label: 'Awards & Honors', value: applicationData.awardsHonors },
        { label: 'Leadership Roles', value: applicationData.leadershipRoles }
      ]
    },
    {
      step: 7,
      title: 'Good Standing & Compliance',
      fields: [
        { label: 'Professional References', value: `${(applicationData.professionalReferences || []).length} references provided` },
        { label: 'Malpractice Insurance', value: applicationData.malpracticeInsurance?.name || 'Not uploaded' },
        { label: 'No Active Disciplinary Actions', value: applicationData.noActiveDisciplinary },
        { label: 'Data Protection Agreement', value: applicationData.dataProtectionAgreed }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Confirm Application</h2>
        <p className="text-gray-600">
          Please review your application details and AI-extracted insights before final submission.
        </p>
      </div>

      {/* AI Analysis Summary */}
      {aiAnalysis && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              🤖
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">AI Document Analysis Results</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <p className="text-sm text-gray-600">Documents Processed</p>
                  <p className="text-2xl font-bold text-blue-600">{aiAnalysis.documentsProcessed || 0}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <p className="text-sm text-gray-600">Extraction Confidence</p>
                  <p className="text-2xl font-bold text-green-600">{aiAnalysis.overallConfidence || 0}%</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <p className="text-sm text-gray-600">Fields Auto-Populated</p>
                  <p className="text-2xl font-bold text-purple-600">{aiAnalysis.successfulExtractions || 0}</p>
                </div>
              </div>

              {aiAnalysis.extractionResults && aiAnalysis.extractionResults.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-blue-900">Key Insights Extracted:</h4>
                  {aiAnalysis.extractionResults.map((result: any, index: number) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-blue-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          {getDocumentIcon(result.fileName)} {result.fileName}
                        </span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {Math.round(result.confidence * 100)}% confidence
                        </span>
                      </div>
                      {result.extractedFields && (
                        <div className="text-sm space-y-1">
                          {Object.entries(result.extractedFields).map(([key, value]: [string, any]) => (
                            <div key={key} className="flex">
                              <span className="w-32 text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                              <span className="text-gray-900 font-medium">{formatFieldValue(value)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Application Review Sections */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Application Summary</h3>
        
        {applicationSections.map((section) => (
          <div key={section.step} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-medium text-gray-900">
                Step {section.step}: {section.title}
              </h4>
              <button
                onClick={() => onEdit(section.step)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className="flex flex-col">
                  <span className="text-sm font-medium text-gray-600">{field.label}</span>
                  <span className="text-sm text-gray-900 mt-1">
                    {formatFieldValue(field.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Uploaded Documents Summary */}
      {uploadedDocuments && Object.keys(uploadedDocuments).length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h4 className="text-base font-medium text-gray-900 mb-4">Uploaded Documents</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(uploadedDocuments).map(([key, file]: [string, any]) => (
              <div key={key} className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                <span className="text-2xl mr-3">{getDocumentIcon(file.name)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-green-900">Ready for Submission</h4>
            <p className="text-sm text-green-700 mt-1">
              Please review all information above. Once you proceed, your application will be submitted for 
              competency assessment and credentialing review. You can edit any section by clicking the "Edit" button.
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
          Back to Compliance
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Submit for Assessment
        </button>
      </div>
    </div>
  );
}