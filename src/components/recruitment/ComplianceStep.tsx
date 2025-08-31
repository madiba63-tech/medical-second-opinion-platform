'use client';

import { useState } from 'react';

interface ProfessionalReference {
  name: string;
  email: string;
  phone: string;
  relationship: string;
}

interface ComplianceStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onSubmit: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
}

const RELATIONSHIP_OPTIONS = [
  'Medical School Faculty/Dean',
  'Residency Program Director',
  'Fellowship Director',
  'Department Chair',
  'Division Chief',
  'Medical Director', 
  'Hospital Administrator',
  'Professional Colleague',
  'Research Collaborator',
  'Society Leader',
  'Other'
];

export default function ComplianceStep({ 
  data, 
  onUpdate, 
  onSubmit, 
  onPrev,
  isSubmitting 
}: ComplianceStepProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  const handleReferenceChange = (index: number, field: keyof ProfessionalReference, value: string) => {
    const updatedReferences = [...(data.professionalReferences || [])];
    updatedReferences[index] = {
      ...updatedReferences[index],
      [field]: value
    };
    handleInputChange('professionalReferences', updatedReferences);
  };

  const addReference = () => {
    const currentReferences = data.professionalReferences || [];
    if (currentReferences.length < 5) {
      const newReference: ProfessionalReference = { name: '', email: '', phone: '', relationship: '' };
      handleInputChange('professionalReferences', [...currentReferences, newReference]);
    }
  };

  const removeReference = (index: number) => {
    const updatedReferences = (data.professionalReferences || []).filter((_: any, i: number) => i !== index);
    handleInputChange('professionalReferences', updatedReferences);
  };

  const handleFileUpload = (field: string, file: File | null) => {
    onUpdate({ [field]: file });
  };

  const validateReferences = () => {
    const references = data.professionalReferences || [];
    if (references.length < 2) return false;
    
    return references.slice(0, 2).every((ref: ProfessionalReference) => 
      ref.name?.trim() && ref.email?.trim() && ref.phone?.trim() && ref.relationship?.trim()
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateReferences()) {
      alert('Please provide complete information for at least 2 professional references.');
      return;
    }

    if (!data.noActiveDisciplinary) {
      alert('You must declare that you have no active disciplinary proceedings to continue.');
      return;
    }

    if (!data.dataProtectionAgreed) {
      alert('You must agree to data protection terms to continue.');
      return;
    }

    if (!agreedToTerms) {
      alert('You must agree to the Terms and Conditions to submit your application.');
      return;
    }

    // Validate required malpractice insurance in certain jurisdictions
    const requiresInsurance = ['United States', 'Canada', 'United Kingdom', 'Australia'].includes(data.nationality);
    if (requiresInsurance && !data.malpracticeInsurance) {
      const proceed = confirm(
        'Malpractice/Indemnity insurance is typically required in your jurisdiction. Are you sure you want to proceed without uploading proof of insurance?'
      );
      if (!proceed) return;
    }

    onSubmit();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Good Standing & Compliance</h2>
        <p className="text-gray-600">
          Provide professional references and confirm your compliance with medical practice standards.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Professional References */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional References <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-600 mb-4">
            Provide at least 2 professional references who can attest to your clinical competence and professional character
          </p>
          
          {(data.professionalReferences || []).map((reference: ProfessionalReference, index: number) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium text-gray-900">Reference {index + 1}</h4>
                {index >= 2 && (
                  <button
                    type="button"
                    onClick={() => removeReference(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name {index < 2 && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    value={reference.name || ''}
                    onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Dr. John Smith"
                    required={index < 2}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email {index < 2 && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="email"
                    value={reference.email || ''}
                    onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john.smith@hospital.edu"
                    required={index < 2}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone {index < 2 && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="tel"
                    value={reference.phone || ''}
                    onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (555) 123-4567"
                    required={index < 2}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relationship {index < 2 && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    value={reference.relationship || ''}
                    onChange={(e) => handleReferenceChange(index, 'relationship', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={index < 2}
                  >
                    <option value="">Select relationship...</option>
                    {RELATIONSHIP_OPTIONS.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
          
          {(!data.professionalReferences || data.professionalReferences.length < 5) && (
            <button
              type="button"
              onClick={addReference}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Another Reference</span>
            </button>
          )}
        </div>

        {/* Malpractice/Indemnity Insurance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Malpractice/Indemnity Insurance Upload
            {['United States', 'Canada', 'United Kingdom', 'Australia'].includes(data.nationality) && 
              <span className="text-red-500"> *</span>
            }
          </label>
          <p className="text-sm text-gray-600 mb-3">
            {['United States', 'Canada', 'United Kingdom', 'Australia'].includes(data.nationality)
              ? 'Required in your jurisdiction - Upload current proof of malpractice/indemnity insurance'
              : 'If applicable in your jurisdiction - Upload current proof of malpractice/indemnity insurance'
            }
          </p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('malpracticeInsurance', e.target.files?.[0] || null)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {data.malpracticeInsurance && (
            <p className="text-sm text-green-600 mt-2">
              ✓ Uploaded: {data.malpracticeInsurance.name}
            </p>
          )}
        </div>

        {/* Disciplinary Declaration */}
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-amber-900 mb-2">Professional Standing Declaration</h4>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={data.noActiveDisciplinary || false}
                onChange={(e) => handleInputChange('noActiveDisciplinary', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                required
              />
              <div className="text-sm">
                <p className="text-amber-900 font-medium">
                  I declare that I have no active disciplinary proceedings <span className="text-red-500">*</span>
                </p>
                <p className="text-amber-700 mt-1">
                  I confirm that I am not currently under investigation by any medical board, licensing authority, 
                  or professional organization, and have no pending or active disciplinary actions, sanctions, or restrictions 
                  on my medical practice.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Protection Agreement */}
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Data Protection Agreement</h4>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={data.dataProtectionAgreed || false}
                onChange={(e) => handleInputChange('dataProtectionAgreed', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                required
              />
              <div className="text-sm">
                <p className="text-blue-900 font-medium">
                  I agree to data processing terms <span className="text-red-500">*</span>
                </p>
                <p className="text-blue-700 mt-1">
                  I consent to the processing of my personal and professional data for the purpose of professional 
                  credentialing, case assignment, and platform participation. I understand my data will be stored securely 
                  and processed in compliance with GDPR and applicable data protection regulations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Terms and Conditions</h4>
            <div className="text-sm text-gray-700 space-y-2 max-h-48 overflow-y-auto">
              <p><strong>Professional Conduct:</strong> I agree to maintain the highest standards of professional conduct and provide second opinions in accordance with evidence-based medicine and professional ethics.</p>
              
              <p><strong>Confidentiality:</strong> I will maintain strict confidentiality of all patient information and comply with HIPAA and applicable privacy regulations.</p>
              
              <p><strong>Quality Standards:</strong> I commit to providing timely, comprehensive, and well-reasoned second opinions based on current medical literature and guidelines.</p>
              
              <p><strong>Continuing Education:</strong> I will maintain current knowledge in my specialty areas and participate in continuing medical education as required.</p>
              
              <p><strong>Platform Compliance:</strong> I will comply with all platform policies, procedures, and quality assurance requirements.</p>
              
              <p><strong>Liability:</strong> I understand that I maintain professional liability for my clinical opinions and recommendations provided through this platform.</p>
            </div>
            
            <div className="flex items-start space-x-3 mt-4">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                required
              />
              <label className="text-sm text-gray-900 font-medium">
                I have read and agree to the Terms and Conditions <span className="text-red-500">*</span>
              </label>
            </div>
          </div>
        </div>

        {/* Reference Verification Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-green-900">Reference Verification</h4>
              <p className="text-sm text-green-700 mt-1">
                We will contact your references to verify your professional competence and character. 
                Please ensure they are aware they may be contacted and can speak to your clinical expertise.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onPrev}
            disabled={isSubmitting}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Back to Recognition
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !validateReferences() || !data.noActiveDisciplinary || !data.dataProtectionAgreed || !agreedToTerms}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isSubmitting || !validateReferences() || !data.noActiveDisciplinary || !data.dataProtectionAgreed || !agreedToTerms
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
}