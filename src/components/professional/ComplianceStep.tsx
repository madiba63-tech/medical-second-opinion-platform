'use client';

import { useState } from 'react';
import CertificateUpload from './CertificateUpload';

interface ComplianceStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ComplianceStep({ data, onUpdate, onNext, onPrev }: ComplianceStepProps) {
  const [references, setReferences] = useState(
    data.references || [
      { name: '', email: '', phone: '', relationship: '', institution: '' },
      { name: '', email: '', phone: '', relationship: '', institution: '' }
    ]
  );

  const handleReferenceChange = (index: number, field: string, value: string) => {
    const updatedReferences = [...references];
    updatedReferences[index] = { ...updatedReferences[index], [field]: value };
    setReferences(updatedReferences);
    onUpdate({ references: updatedReferences });
  };

  const addReference = () => {
    const newReferences = [...references, { name: '', email: '', phone: '', relationship: '', institution: '' }];
    setReferences(newReferences);
    onUpdate({ references: newReferences });
  };

  const removeReference = (index: number) => {
    const updatedReferences = references.filter((_, i) => i !== index);
    setReferences(updatedReferences);
    onUpdate({ references: updatedReferences });
  };

  const handleCheckboxChange = (field: string, value: boolean) => {
    onUpdate({ [field]: value });
  };

  const handleCertificateUpload = (certificateType: string, files: any[]) => {
    onUpdate({ [certificateType]: files });
  };

  const handleSubmit = () => {
    // Validate required fields
    const validReferences = references.filter(ref => ref.name && ref.email);
    if (validReferences.length < 2) {
      alert('Please provide at least 2 professional references with name and email.');
      return;
    }

    if (!data.noDisciplinaryProceedings) {
      alert('Please confirm that you have no disciplinary proceedings.');
      return;
    }

    if (!data.dataProtectionAgreement) {
      alert('Please accept the data protection agreement.');
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Good Standing & Compliance</h2>
        <p className="text-gray-600">
          Provide professional references and confirm compliance requirements.
        </p>
      </div>

      {/* Professional References */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional References</h3>
        <p className="text-sm text-gray-600 mb-4">
          Provide at least 2 professional references who can attest to your clinical competence and professional standing.
        </p>
        
        <div className="space-y-6">
          {references.map((reference, index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-900">Reference {index + 1}</h4>
                {references.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeReference(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={reference.name}
                    onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Dr. John Smith"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={reference.email}
                    onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john.smith@hospital.edu"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={reference.phone}
                    onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1-555-123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Professional Relationship <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={reference.relationship}
                    onChange={(e) => handleReferenceChange(index, 'relationship', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select relationship</option>
                    <option value="Department Head">Department Head</option>
                    <option value="Colleague">Medical Colleague</option>
                    <option value="Former Supervisor">Former Supervisor</option>
                    <option value="Research Collaborator">Research Collaborator</option>
                    <option value="Clinical Director">Clinical Director</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institution/Organization
                  </label>
                  <input
                    type="text"
                    value={reference.institution}
                    onChange={(e) => handleReferenceChange(index, 'institution', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Hospital or Institution Name"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button
          type="button"
          onClick={addReference}
          className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
        >
          + Add Another Reference
        </button>
      </div>

      {/* Document Uploads */}
      <div className="grid gap-6">
        <CertificateUpload
          title="Malpractice Insurance Certificate"
          description="Upload your current malpractice/professional liability insurance certificate"
          acceptedTypes={['application/pdf', 'image/jpeg', 'image/png']}
          uploadedFiles={data.malpracticeInsurance || []}
          onUpload={(files) => handleCertificateUpload('malpracticeInsurance', files)}
          required={true}
          maxFiles={2}
        />
        
        <CertificateUpload
          title="Background Check Documentation"
          description="Upload background check or criminal history clearance (if required in your jurisdiction)"
          acceptedTypes={['application/pdf', 'image/jpeg', 'image/png']}
          uploadedFiles={data.backgroundCheck || []}
          onUpload={(files) => handleCertificateUpload('backgroundCheck', files)}
          maxFiles={2}
        />
      </div>

      {/* Compliance Declarations */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Declarations</h3>
        
        <div className="space-y-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={data.noDisciplinaryProceedings || false}
              onChange={(e) => handleCheckboxChange('noDisciplinaryProceedings', e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              <strong>No Disciplinary Proceedings:</strong> I certify that I have not been subject to any disciplinary proceedings by any medical board, licensing authority, or professional organization, and I am in good standing with all relevant authorities.
            </span>
          </label>
          
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={data.dataProtectionAgreement || false}
              onChange={(e) => handleCheckboxChange('dataProtectionAgreement', e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              <strong>Data Protection Agreement:</strong> I agree to comply with all applicable data protection regulations (GDPR, HIPAA, etc.) when handling patient information and providing medical second opinions through this platform.
            </span>
          </label>
          
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={data.ethicsAgreement || false}
              onChange={(e) => handleCheckboxChange('ethicsAgreement', e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              <strong>Medical Ethics Agreement:</strong> I agree to uphold the highest standards of medical ethics and provide opinions based solely on medical evidence and best practices, without bias or conflicts of interest.
            </span>
          </label>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Step 7 Progress</h4>
            <p className="text-sm text-blue-700 mt-1">
              Complete professional references and compliance declarations to proceed to the competency assessment.
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
          Back to Recognition
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Continue to Assessment
        </button>
      </div>
    </div>
  );
}
