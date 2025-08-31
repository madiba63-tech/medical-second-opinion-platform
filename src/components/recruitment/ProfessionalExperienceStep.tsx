'use client';

interface ProfessionalExperienceStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SUBSPECIALTY_OPTIONS = [
  'Breast Oncology',
  'Lung Oncology', 
  'Gastrointestinal Oncology',
  'Genitourinary Oncology',
  'Gynecologic Oncology',
  'Head and Neck Oncology',
  'Hematologic Malignancies',
  'Pediatric Oncology',
  'Radiation Oncology',
  'Surgical Oncology',
  'Medical Oncology',
  'Bone and Soft Tissue Sarcoma',
  'Neuro-Oncology',
  'Thoracic Oncology',
  'Dermatologic Oncology',
  'Endocrine Oncology',
  'Immunotherapy',
  'Precision Medicine',
  'Clinical Trials',
  'Palliative Care',
  'Other'
];

export default function ProfessionalExperienceStep({ 
  data, 
  onUpdate, 
  onNext, 
  onPrev 
}: ProfessionalExperienceStepProps) {
  const handleInputChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  const handleFileUpload = (field: string, file: File | null) => {
    onUpdate({ [field]: file });
  };

  const handleSubspecialtyChange = (subspecialty: string) => {
    const currentSubspecialties = data.subspecialties || [];
    const updatedSubspecialties = currentSubspecialties.includes(subspecialty)
      ? currentSubspecialties.filter((s: string) => s !== subspecialty)
      : [...currentSubspecialties, subspecialty];
    
    handleInputChange('subspecialties', updatedSubspecialties);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!data.yearsIndependentPractice || data.yearsIndependentPractice < 0 || 
        !data.currentAffiliation || !data.cv || 
        !data.subspecialties || data.subspecialties.length === 0) {
      alert('Please fill in all required fields, select at least one subspecialty, and upload your CV.');
      return;
    }

    if (data.yearsIndependentPractice > 50) {
      alert('Please enter a realistic number of years of practice.');
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Experience</h2>
        <p className="text-gray-600">
          Tell us about your oncology practice experience and current professional status.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Years of Independent Practice */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Years of Independent Oncology Practice <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="0"
            max="50"
            value={data.yearsIndependentPractice || ''}
            onChange={(e) => handleInputChange('yearsIndependentPractice', parseInt(e.target.value) || 0)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter years of independent practice"
            required
          />
          <p className="text-sm text-gray-600 mt-1">
            Count only years as an attending physician/consultant, not including residency or fellowship
          </p>
        </div>

        {/* Current Affiliation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Affiliation / Employer <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.currentAffiliation || ''}
            onChange={(e) => handleInputChange('currentAffiliation', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Mayo Clinic, Memorial Sloan Kettering, Private Practice"
            required
          />
        </div>

        {/* CV Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CV Upload <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Upload your current Curriculum Vitae (CV) in PDF format
          </p>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileUpload('cv', e.target.files?.[0] || null)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
          {data.cv && (
            <p className="text-sm text-green-600 mt-2">
              ✓ Uploaded: {data.cv.name}
            </p>
          )}
        </div>

        {/* Subspecialties */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subspecialties <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Select all subspecialties in which you have expertise (select at least one)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SUBSPECIALTY_OPTIONS.map(subspecialty => (
              <label key={subspecialty} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(data.subspecialties || []).includes(subspecialty)}
                  onChange={() => handleSubspecialtyChange(subspecialty)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-gray-700">{subspecialty}</span>
              </label>
            ))}
          </div>
          {data.subspecialties && data.subspecialties.length > 0 && (
            <p className="text-sm text-green-600 mt-2">
              ✓ Selected: {data.subspecialties.join(', ')}
            </p>
          )}
        </div>

        {/* Annual Patient Load */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Annual Oncology Patient Load
          </label>
          <input
            type="number"
            min="0"
            value={data.annualPatientLoad || ''}
            onChange={(e) => handleInputChange('annualPatientLoad', parseInt(e.target.value) || null)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of oncology patients seen annually"
          />
          <p className="text-sm text-gray-600 mt-1">
            Optional: Approximate number of new and follow-up oncology patients per year
          </p>
        </div>

        {/* Second Opinions Given */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Second Opinions Previously Given
          </label>
          <input
            type="number"
            min="0"
            value={data.secondOpinionsGiven || ''}
            onChange={(e) => handleInputChange('secondOpinionsGiven', parseInt(e.target.value) || null)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of second opinions provided"
          />
          <p className="text-sm text-gray-600 mt-1">
            Optional: Total number of formal second opinions provided in your career
          </p>
        </div>

        {/* Experience Level Indicator */}
        {data.yearsIndependentPractice && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Experience Level Indicator</h4>
            <div className="space-y-2">
              {(() => {
                const years = data.yearsIndependentPractice;
                let level = '';
                let color = '';
                
                if (years < 5) {
                  level = 'Early Career (0-4 years)';
                  color = 'text-blue-600';
                } else if (years < 10) {
                  level = 'Mid-Level (5-9 years)';
                  color = 'text-green-600';
                } else if (years < 20) {
                  level = 'Senior (10-19 years)';
                  color = 'text-orange-600';
                } else {
                  level = 'Distinguished (20+ years)';
                  color = 'text-purple-600';
                }
                
                return (
                  <p className={`text-sm font-medium ${color}`}>
                    {level}
                  </p>
                );
              })()}
              <p className="text-sm text-gray-600">
                Experience level affects initial competency scoring and case assignment priority.
              </p>
            </div>
          </div>
        )}

        {/* CV Requirements Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-900">CV Requirements</h4>
              <p className="text-sm text-blue-700 mt-1">
                Your CV should include: current position, education, board certifications, publications, 
                research experience, clinical trial involvement, professional memberships, and recent speaking engagements.
              </p>
            </div>
          </div>
        </div>

        {/* Subspecialty Selection Guide */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-amber-900">Subspecialty Selection</h4>
              <p className="text-sm text-amber-700 mt-1">
                Select subspecialties based on your board certifications, fellowship training, and active practice areas. 
                This determines which types of cases you'll be assigned for second opinions.
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
            Back to Licensing
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue to Research
          </button>
        </div>
      </form>
    </div>
  );
}