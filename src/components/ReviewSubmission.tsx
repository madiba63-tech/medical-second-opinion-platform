"use client";

import { FormData } from "@/types/form";

interface Props {
  formData: FormData;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  setCaseId: (caseId: string) => void;
  goToStep?: (step: number) => void;
}

export default function ReviewSubmission({ formData, updateFormData, nextStep, prevStep, setCaseId, goToStep }: Props) {
  const { personalInfo, medicalFiles, contextInfo } = formData;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Review Your Submission</h2>
      <p className="text-gray-600 mb-6">
        Please review all the information below. You can go back to edit any section if needed.
      </p>

      <div className="space-y-8">
        {/* Personal Information */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <button
              onClick={() => goToStep?.(1)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Name:</span>{" "}
              {personalInfo.firstName} {personalInfo.middleName} {personalInfo.lastName}
            </div>
            <div>
              <span className="font-medium">Date of Birth:</span> {personalInfo.dob}
            </div>
            <div>
              <span className="font-medium">Email:</span> {personalInfo.email}
            </div>
            <div>
              <span className="font-medium">Phone:</span> {personalInfo.phone || "Not provided"}
            </div>
          </div>
        </div>

        {/* Medical Files */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Medical Documents ({medicalFiles.length})</h3>
            <button
              onClick={() => goToStep?.(2)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Edit
            </button>
          </div>
          <div className="space-y-3">
            {medicalFiles.map((file, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-gray-500">
                    {file.category} • {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Context */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Medical Context</h3>
            <button
              onClick={() => goToStep?.(3)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Ethnicity:</span>{" "}
              {contextInfo.ethnicity || "Not provided"}
            </div>
            <div>
              <span className="font-medium">Gender:</span>{" "}
              {contextInfo.gender || "Not provided"}
            </div>
            <div>
              <span className="font-medium">Disease Type:</span>{" "}
              {contextInfo.diseaseType || "Not provided"}
            </div>
            <div>
              <span className="font-medium">First Occurrence:</span>{" "}
              {contextInfo.isFirstOccurrence !== undefined 
                ? (contextInfo.isFirstOccurrence ? "Yes" : "No")
                : "Not provided"}
            </div>
            <div className="col-span-2">
              <span className="font-medium">Family History:</span>{" "}
              {contextInfo.geneticFamilyHistory?.length 
                ? contextInfo.geneticFamilyHistory.join(", ")
                : "Not provided"}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Ready to proceed
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  You have uploaded {medicalFiles.length} medical document(s) and provided your information. 
                  The next step is to process payment for the second opinion consultation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <button
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Previous
        </button>

        <button
          onClick={nextStep}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

