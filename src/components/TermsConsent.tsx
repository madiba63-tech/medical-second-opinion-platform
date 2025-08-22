"use client";

import { useState } from "react";
import { FormData } from "@/types/form";

interface Props {
  formData: FormData;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  setCaseId: (caseId: string) => void;
}

export default function TermsConsent({ formData, updateFormData, nextStep, prevStep, setCaseId }: Props) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleSubmit = async () => {
    if (!termsAccepted) {
      alert("Please accept the Terms & Conditions to continue.");
      return;
    }

    setSubmitting(true);

    try {
      // Submit the complete form data
      const payload = {
        personalInfo: formData.personalInfo,
        medicalFiles: formData.medicalFiles,
        contextInfo: formData.contextInfo,
        consentAccepted: true,
        paymentId: formData.paymentId,
      };

      const response = await fetch("/api/upload-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit request");
      }

      const result = await response.json();
      setCaseId(result.caseId);
      nextStep();
    } catch (error: any) {
      alert(error.message || "Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Terms & Conditions</h2>
      <p className="text-gray-600 mb-6">
        Please review and accept our Terms & Conditions to complete your second opinion request.
      </p>

      {/* Terms Preview */}
      <div className="border rounded-lg p-6 bg-gray-50 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Medical Second Opinion Terms & Conditions</h3>
          <button
            onClick={() => setShowTerms(!showTerms)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {showTerms ? "Hide" : "View Full Terms"}
          </button>
        </div>

        {showTerms ? (
          <div className="text-sm text-gray-700 space-y-4 max-h-64 overflow-y-auto">
            <h4 className="font-semibold">1. Service Description</h4>
            <p>
              Our medical second opinion service provides expert physician review of your medical case. 
              This service is for educational and informational purposes only and does not constitute 
              medical diagnosis or treatment.
            </p>

            <h4 className="font-semibold">2. Privacy & Confidentiality</h4>
            <p>
              Your medical information will be kept strictly confidential and used only for the purpose 
              of providing the second opinion service. All data is encrypted and stored securely in 
              compliance with HIPAA regulations.
            </p>

            <h4 className="font-semibold">3. No Doctor-Patient Relationship</h4>
            <p>
              The second opinion service does not create a doctor-patient relationship. The reviewing 
              physician will not have direct contact with you and will not provide ongoing medical care.
            </p>

            <h4 className="font-semibold">4. Limitations</h4>
            <p>
              The second opinion is based solely on the medical documents you provide. The accuracy 
              and completeness of the opinion depends on the quality and completeness of your submitted 
              medical records.
            </p>

            <h4 className="font-semibold">5. Payment & Refunds</h4>
            <p>
              Payment is required before processing your request. Refunds may be provided at our 
              discretion in cases where we cannot provide the requested service.
            </p>

            <h4 className="font-semibold">6. Timeline</h4>
            <p>
              We aim to provide your second opinion within 3-5 business days. Complex cases may 
              require additional time.
            </p>

            <h4 className="font-semibold">7. Contact Information</h4>
            <p>
              For questions about these terms or our service, please contact us at support@example.com.
            </p>
          </div>
        ) : (
          <div className="text-sm text-gray-600">
            <p>
              By accepting these terms, you acknowledge that you understand the limitations of our 
              second opinion service and agree to our privacy practices. 
              <button 
                onClick={() => setShowTerms(true)}
                className="text-blue-600 hover:text-blue-800 ml-1"
              >
                Click to read full terms.
              </button>
            </p>
          </div>
        )}
      </div>

      {/* Consent Checkbox */}
      <div className="border rounded-lg p-6 mb-6">
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 mr-3 text-blue-600"
            disabled={submitting}
          />
          <span className="text-sm">
            I have read and agree to the Terms & Conditions. I understand that this service 
            provides a medical second opinion for educational purposes only and does not 
            constitute medical diagnosis or treatment. I confirm that I have the legal 
            authority to share the submitted medical records.
          </span>
        </label>
      </div>

      {/* Data Processing Summary */}
      <div className="border-l-4 border-blue-500 bg-blue-50 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Your data will be processed securely
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Personal information stored in Customer Lifecycle Module</li>
                <li>Medical files and context stored in Repository Module</li>
                <li>Payment information processed by Invoicing Module</li>
                <li>All data encrypted in transit and at rest</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={submitting}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={handleSubmit}
          disabled={!termsAccepted || submitting}
          className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 disabled:opacity-50 font-medium"
        >
          {submitting ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting Request...
            </div>
          ) : (
            "Submit Request"
          )}
        </button>
      </div>
    </div>
  );
}

