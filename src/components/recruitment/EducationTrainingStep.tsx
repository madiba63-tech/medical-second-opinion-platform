'use client';

import { useState } from 'react';

interface EducationTrainingStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function EducationTrainingStep({ data, onUpdate, onNext, onPrev }: EducationTrainingStepProps) {
  const [additionalDiplomas, setAdditionalDiplomas] = useState<File[]>(data.additionalDiplomas || []);

  const handleInputChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  const handleFileUpload = (field: string, file: File | null) => {
    onUpdate({ [field]: file });
  };

  const handleAdditionalDiplomasUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const updatedDiplomas = [...additionalDiplomas, ...files];
    setAdditionalDiplomas(updatedDiplomas);
    onUpdate({ additionalDiplomas: updatedDiplomas });
  };

  const removeAdditionalDiploma = (index: number) => {
    const updatedDiplomas = additionalDiplomas.filter((_, i) => i !== index);
    setAdditionalDiplomas(updatedDiplomas);
    onUpdate({ additionalDiplomas: updatedDiplomas });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!data.medicalDegree || !data.residencyCompletion || !data.fellowshipTraining || 
        !data.boardCertification || !data.boardCertificationNumber) {
      alert('Please upload all required documents and provide your board certification number.');
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Education & Training</h2>
        <p className="text-gray-600">
          Upload your medical education credentials and training certificates.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Medical Degree Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Medical Degree Upload <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Upload your medical degree certificate (MD, MBBS, DO, etc.)
          </p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('medicalDegree', e.target.files?.[0] || null)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
          {data.medicalDegree && (
            <p className="text-sm text-green-600 mt-2">
              ✓ Uploaded: {data.medicalDegree.name}
            </p>
          )}
        </div>

        {/* Residency Completion Certificate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Residency Completion Certificate <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Upload your residency completion certificate or diploma
          </p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('residencyCompletion', e.target.files?.[0] || null)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
          {data.residencyCompletion && (
            <p className="text-sm text-green-600 mt-2">
              ✓ Uploaded: {data.residencyCompletion.name}
            </p>
          )}
        </div>

        {/* Fellowship/Oncology Training */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fellowship/Oncology Training Certificate <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Required for oncology subspecialty - Upload your fellowship completion certificate
          </p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('fellowshipTraining', e.target.files?.[0] || null)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
          {data.fellowshipTraining && (
            <p className="text-sm text-green-600 mt-2">
              ✓ Uploaded: {data.fellowshipTraining.name}
            </p>
          )}
        </div>

        {/* Board Certification */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Board Certification in Oncology <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Upload your board certification certificate
            </p>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload('boardCertification', e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            {data.boardCertification && (
              <p className="text-sm text-green-600 mt-2">
                ✓ Uploaded: {data.boardCertification.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Board Certification Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.boardCertificationNumber || ''}
              onChange={(e) => handleInputChange('boardCertificationNumber', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your board certification number"
              required
            />
          </div>
        </div>

        {/* Additional Diplomas/Certificates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Diplomas/Certificates
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Upload any additional relevant diplomas, certificates, or training credentials (optional)
          </p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            onChange={handleAdditionalDiplomasUpload}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          
          {additionalDiplomas.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-sm font-medium text-gray-700">Uploaded files:</p>
              {additionalDiplomas.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeAdditionalDiploma(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Education Requirements Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-900">Education Requirements</h4>
              <p className="text-sm text-blue-700 mt-1">
                All professionals must have completed medical degree, residency training, and oncology fellowship. 
                Board certification in oncology or related subspecialty is mandatory for participation in our network.
              </p>
            </div>
          </div>
        </div>

        {/* Document Verification Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.5 2.5l-.5-.5M7.5 3L4.6 6H1.4a.7.7 0 000 1.4h3.2l2.9-2.9L10.9 8 18 .9z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-amber-900">Document Verification</h4>
              <p className="text-sm text-amber-700 mt-1">
                All uploaded documents will be verified against official databases and issuing institutions. 
                Please ensure all documents are current, clear, and authentic.
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
            Back to Identity
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue to Licensing
          </button>
        </div>
      </form>
    </div>
  );
}