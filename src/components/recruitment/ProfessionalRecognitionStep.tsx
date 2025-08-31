'use client';

interface ProfessionalRecognitionStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ONCOLOGY_SOCIETIES = [
  'ASCO (American Society of Clinical Oncology)',
  'ESMO (European Society for Medical Oncology)', 
  'DGHO (German Society of Hematology and Medical Oncology)',
  'RCP (Royal College of Physicians)',
  'RCPath (Royal College of Pathologists)',
  'AACR (American Association for Cancer Research)',
  'NCCN (National Comprehensive Cancer Network)',
  'ONS (Oncology Nursing Society)',
  'CAP (College of American Pathologists)',
  'ASCP (American Society for Clinical Pathology)',
  'ASTRO (American Society for Radiation Oncology)',
  'SSO (Society of Surgical Oncology)',
  'EORTC (European Organisation for Research and Treatment of Cancer)',
  'IASLC (International Association for the Study of Lung Cancer)',
  'ASH (American Society of Hematology)',
  'ASCO GI (ASCO Gastrointestinal Cancers Symposium)',
  'San Antonio Breast Cancer Symposium',
  'Other Professional Society'
];

export default function ProfessionalRecognitionStep({ 
  data, 
  onUpdate, 
  onNext, 
  onPrev 
}: ProfessionalRecognitionStepProps) {
  const handleInputChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  const handleSocietyChange = (society: string) => {
    const currentSocieties = data.oncologySocieties || [];
    const updatedSocieties = currentSocieties.includes(society)
      ? currentSocieties.filter((s: string) => s !== society)
      : [...currentSocieties, society];
    
    handleInputChange('oncologySocieties', updatedSocieties);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // No required fields in this step, but encourage participation
    if (!data.oncologySocieties || data.oncologySocieties.length === 0) {
      const proceed = confirm(
        'Professional society membership is highly valued for credentialing. Are you sure you want to continue without selecting any memberships?'
      );
      if (!proceed) return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Recognition</h2>
        <p className="text-gray-600">
          Tell us about your professional memberships, awards, and leadership positions in the medical community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Oncology Society Memberships */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Membership in Oncology Societies
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Select all professional societies where you hold active membership
          </p>
          <div className="space-y-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
            {ONCOLOGY_SOCIETIES.map(society => (
              <label key={society} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(data.oncologySocieties || []).includes(society)}
                  onChange={() => handleSocietyChange(society)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-gray-700">{society}</span>
              </label>
            ))}
          </div>
          {data.oncologySocieties && data.oncologySocieties.length > 0 && (
            <div className="mt-3">
              <p className="text-sm text-green-600 font-medium mb-1">Selected memberships:</p>
              <div className="text-sm text-green-700">
                {data.oncologySocieties.map((society: string, index: number) => (
                  <span key={society}>
                    {society}{index < data.oncologySocieties.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Awards and Honors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Awards/Honors
          </label>
          <p className="text-sm text-gray-600 mb-3">
            List any professional awards, honors, or recognition you have received
          </p>
          <textarea
            value={data.awardsHonors || ''}
            onChange={(e) => handleInputChange('awardsHonors', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="e.g., Distinguished Service Award (ASCO 2023), Top Doctor recognition, Excellence in Patient Care Award, etc."
          />
        </div>

        {/* Leadership Roles */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Leadership Roles
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Describe leadership positions you have held or currently hold
          </p>
          <textarea
            value={data.leadershipRoles || ''}
            onChange={(e) => handleInputChange('leadershipRoles', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="e.g., Department Chair, Medical Director, Society Board Member, Committee Chair, Guideline Development Committee, Editorial Board Member, etc."
          />
        </div>

        {/* Recognition Level Indicator */}
        {(data.oncologySocieties?.length > 0 || data.awardsHonors || data.leadershipRoles) && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Professional Recognition Level</h4>
            <div className="space-y-2">
              {(() => {
                let score = 0;
                let recognitions = [];
                
                if (data.oncologySocieties?.length > 0) {
                  score += data.oncologySocieties.length;
                  recognitions.push(`${data.oncologySocieties.length} society memberships`);
                }
                
                if (data.awardsHonors?.trim()) {
                  score += 2;
                  recognitions.push('awards/honors listed');
                }
                
                if (data.leadershipRoles?.trim()) {
                  score += 3;
                  recognitions.push('leadership roles documented');
                }
                
                let level = '';
                let color = '';
                
                if (score < 2) {
                  level = 'Developing Professional Profile';
                  color = 'text-blue-600';
                } else if (score < 5) {
                  level = 'Recognized Professional';
                  color = 'text-green-600';
                } else if (score < 8) {
                  level = 'Distinguished Professional';
                  color = 'text-orange-600';
                } else {
                  level = 'Highly Distinguished Leader';
                  color = 'text-purple-600';
                }
                
                return (
                  <>
                    <p className={`text-sm font-medium ${color}`}>
                      {level}
                    </p>
                    <p className="text-sm text-gray-600">
                      Based on: {recognitions.join(', ')}
                    </p>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* Professional Standing Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-900">Professional Standing</h4>
              <p className="text-sm text-blue-700 mt-1">
                Professional society memberships and leadership roles demonstrate your commitment to the field and 
                peer recognition. This information significantly impacts your competency scoring and case assignment priorities.
              </p>
            </div>
          </div>
        </div>

        {/* Membership Benefits */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-green-900">Membership Benefits</h4>
              <p className="text-sm text-green-700 mt-1">
                Active participation in professional societies indicates commitment to continuing education, 
                evidence-based practice, and professional development - all highly valued in our network.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership Impact */}
        {data.leadershipRoles?.trim() && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-purple-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-purple-900">Leadership Recognition</h4>
                <p className="text-sm text-purple-700 mt-1">
                  Leadership roles in medical organizations, guideline committees, and editorial boards demonstrate 
                  exceptional expertise and peer recognition at the highest levels.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onPrev}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Back to Research
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue to Compliance
          </button>
        </div>
      </form>
    </div>
  );
}