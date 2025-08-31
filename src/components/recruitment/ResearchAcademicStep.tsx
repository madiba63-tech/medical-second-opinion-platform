'use client';

import { useState } from 'react';

interface ResearchAcademicStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ResearchAcademicStep({ 
  data, 
  onUpdate, 
  onNext, 
  onPrev 
}: ResearchAcademicStepProps) {
  const [publications, setPublications] = useState<File[]>(data.publications || []);

  const handleInputChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    onUpdate({ [field]: checked });
  };

  const handlePublicationsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxFiles = 3;
    
    if (publications.length + files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} publications.`);
      return;
    }
    
    const updatedPublications = [...publications, ...files];
    setPublications(updatedPublications);
    onUpdate({ publications: updatedPublications });
  };

  const removePublication = (index: number) => {
    const updatedPublications = publications.filter((_, i) => i !== index);
    setPublications(updatedPublications);
    onUpdate({ publications: updatedPublications });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (data.peerReviewedPublications === undefined || data.peerReviewedPublications < 0) {
      alert('Please enter the number of peer-reviewed publications (enter 0 if none).');
      return;
    }

    if (data.peerReviewedPublications > 1000) {
      alert('Please enter a realistic number of publications.');
      return;
    }

    // Validate clinical trial details if involvement is checked
    if (data.clinicalTrialInvolvement && !data.clinicalTrialDetails?.trim()) {
      alert('Please provide details about your clinical trial involvement.');
      return;
    }

    // Validate conference details if presentations is checked
    if (data.conferencePresentations && !data.conferenceDetails?.trim()) {
      alert('Please provide details about your conference presentations.');
      return;
    }

    // Validate teaching details if roles is checked
    if (data.teachingRoles && !data.teachingDetails?.trim()) {
      alert('Please provide details about your teaching roles.');
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Research & Academic Contributions</h2>
        <p className="text-gray-600">
          Tell us about your research activities, publications, and academic involvement.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Publications Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Peer-Reviewed Publications <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="0"
            max="1000"
            value={data.peerReviewedPublications || ''}
            onChange={(e) => handleInputChange('peerReviewedPublications', parseInt(e.target.value) || 0)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of peer-reviewed publications"
            required
          />
          <p className="text-sm text-gray-600 mt-1">
            Include only peer-reviewed journal articles, reviews, and editorials
          </p>
        </div>

        {/* Upload Publications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload up to 3 Representative Publications
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Optional: Upload PDF copies of your most significant recent publications
          </p>
          <input
            type="file"
            accept=".pdf"
            multiple
            onChange={handlePublicationsUpload}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={publications.length >= 3}
          />
          
          {publications.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-sm font-medium text-gray-700">Uploaded publications:</p>
              {publications.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removePublication(index)}
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

          {publications.length >= 3 && (
            <p className="text-sm text-amber-600 mt-2">
              Maximum of 3 publications reached. Remove a file to upload a different one.
            </p>
          )}
        </div>

        {/* Clinical Trial Involvement */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={data.clinicalTrialInvolvement || false}
              onChange={(e) => handleCheckboxChange('clinicalTrialInvolvement', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label className="text-sm font-medium text-gray-700">
              Clinical Trial Involvement
            </label>
          </div>

          {data.clinicalTrialInvolvement && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinical Trial Details <span className="text-red-500">*</span>
              </label>
              <textarea
                value={data.clinicalTrialDetails || ''}
                onChange={(e) => handleInputChange('clinicalTrialDetails', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Describe your role (PI, Co-I, Sub-I), trial phases, therapeutic areas, number of trials, etc."
                required={data.clinicalTrialInvolvement}
              />
            </div>
          )}
        </div>

        {/* Conference Presentations */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={data.conferencePresentations || false}
              onChange={(e) => handleCheckboxChange('conferencePresentations', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label className="text-sm font-medium text-gray-700">
              Conference Presentations
            </label>
          </div>

          {data.conferencePresentations && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conference Presentation Details <span className="text-red-500">*</span>
              </label>
              <textarea
                value={data.conferenceDetails || ''}
                onChange={(e) => handleInputChange('conferenceDetails', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="List major conferences (ASCO, ESMO, etc.), types of presentations (keynote, oral, poster), approximate number, recent highlights, etc."
                required={data.conferencePresentations}
              />
            </div>
          )}
        </div>

        {/* Teaching/Faculty Roles */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={data.teachingRoles || false}
              onChange={(e) => handleCheckboxChange('teachingRoles', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label className="text-sm font-medium text-gray-700">
              Teaching/Faculty Roles
            </label>
          </div>

          {data.teachingRoles && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teaching and Faculty Role Details <span className="text-red-500">*</span>
              </label>
              <textarea
                value={data.teachingDetails || ''}
                onChange={(e) => handleInputChange('teachingDetails', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Describe your academic appointments, teaching responsibilities, mentorship activities, course leadership, etc."
                required={data.teachingRoles}
              />
            </div>
          )}
        </div>

        {/* Research Impact Indicator */}
        {data.peerReviewedPublications > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Research Impact Level</h4>
            <div className="space-y-2">
              {(() => {
                const pubs = data.peerReviewedPublications;
                let level = '';
                let color = '';
                
                if (pubs < 5) {
                  level = 'Emerging Researcher (1-4 publications)';
                  color = 'text-blue-600';
                } else if (pubs < 15) {
                  level = 'Active Researcher (5-14 publications)';
                  color = 'text-green-600';
                } else if (pubs < 50) {
                  level = 'Established Researcher (15-49 publications)';
                  color = 'text-orange-600';
                } else {
                  level = 'Distinguished Researcher (50+ publications)';
                  color = 'text-purple-600';
                }
                
                return (
                  <p className={`text-sm font-medium ${color}`}>
                    {level}
                  </p>
                );
              })()}
              <p className="text-sm text-gray-600">
                Research productivity is a key factor in competency scoring and case complexity assignments.
              </p>
            </div>
          </div>
        )}

        {/* Research Excellence Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-900">Research & Academic Excellence</h4>
              <p className="text-sm text-blue-700 mt-1">
                Research activity and academic involvement demonstrate thought leadership and staying current with evolving oncology practices. 
                This information helps us assess your expertise and assign appropriate complex cases.
              </p>
            </div>
          </div>
        </div>

        {/* Publication Guidelines */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-amber-900">Publication Guidelines</h4>
              <p className="text-sm text-amber-700 mt-1">
                When uploading publications, choose your most impactful recent work (last 5 years preferred). 
                Include first/senior author papers, high-impact journals, and work relevant to your subspecialties.
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
            Back to Experience
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue to Recognition
          </button>
        </div>
      </form>
    </div>
  );
}