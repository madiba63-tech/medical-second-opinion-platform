'use client';

interface LicensingStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const COUNTRIES_WITH_STATES = [
  'United States', 'Canada', 'Australia', 'Germany', 'India', 'Brazil'
];

const COUNTRY_OPTIONS = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
  'France', 'Italy', 'Spain', 'Netherlands', 'Switzerland', 'Austria',
  'Belgium', 'Denmark', 'Sweden', 'Norway', 'Finland', 'India', 'China',
  'Japan', 'South Korea', 'Singapore', 'New Zealand', 'Ireland', 'Portugal',
  'Greece', 'Poland', 'Czech Republic', 'Hungary', 'Other'
];

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const CANADIAN_PROVINCES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
  'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island',
  'Quebec', 'Saskatchewan', 'Yukon'
];

const GERMAN_STATES = [
  'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg',
  'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen',
  'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen'
];

const AUSTRALIAN_STATES = [
  'Australian Capital Territory', 'New South Wales', 'Northern Territory', 'Queensland',
  'South Australia', 'Tasmania', 'Victoria', 'Western Australia'
];

export default function LicensingStep({ data, onUpdate, onNext, onPrev }: LicensingStepProps) {
  const handleInputChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  const handleFileUpload = (field: string, file: File | null) => {
    onUpdate({ [field]: file });
  };

  const getStateOptions = () => {
    switch (data.licenseCountry) {
      case 'United States':
        return US_STATES;
      case 'Canada':
        return CANADIAN_PROVINCES;
      case 'Germany':
        return GERMAN_STATES;
      case 'Australia':
        return AUSTRALIAN_STATES;
      default:
        return [];
    }
  };

  const showStateField = COUNTRIES_WITH_STATES.includes(data.licenseCountry);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!data.medicalLicenseNumber || !data.licenseCountry || !data.licenseExpiry || 
        !data.licenseCertificate || !data.goodStandingCertificate) {
      alert('Please fill in all required fields and upload required documents.');
      return;
    }

    if (showStateField && !data.licenseState) {
      alert('Please select your state/province.');
      return;
    }

    // Validate expiry date is in the future
    const expiryDate = new Date(data.licenseExpiry);
    const today = new Date();
    if (expiryDate <= today) {
      alert('License expiry date must be in the future.');
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Medical Licensing</h2>
        <p className="text-gray-600">
          Provide your current medical license information and upload required certificates.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Medical License Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Medical License Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.medicalLicenseNumber || ''}
            onChange={(e) => handleInputChange('medicalLicenseNumber', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your medical license number"
            required
          />
        </div>

        {/* Country and State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country/Region of License <span className="text-red-500">*</span>
            </label>
            <select
              value={data.licenseCountry || ''}
              onChange={(e) => handleInputChange('licenseCountry', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select country/region...</option>
              {COUNTRY_OPTIONS.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {showStateField && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State/Province <span className="text-red-500">*</span>
              </label>
              <select
                value={data.licenseState || ''}
                onChange={(e) => handleInputChange('licenseState', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select state/province...</option>
                {getStateOptions().map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* License Expiry Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            License Expiration Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={data.licenseExpiry || ''}
            onChange={(e) => handleInputChange('licenseExpiry', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        {/* License Certificate Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload License Certificate <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Upload a clear copy of your current medical license certificate
          </p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('licenseCertificate', e.target.files?.[0] || null)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
          {data.licenseCertificate && (
            <p className="text-sm text-green-600 mt-2">
              ✓ Uploaded: {data.licenseCertificate.name}
            </p>
          )}
        </div>

        {/* Certificate of Good Standing */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Certificate of Good Standing <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Upload a recent certificate of good standing from your licensing board (issued within the last 6 months)
          </p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('goodStandingCertificate', e.target.files?.[0] || null)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
          {data.goodStandingCertificate && (
            <p className="text-sm text-green-600 mt-2">
              ✓ Uploaded: {data.goodStandingCertificate.name}
            </p>
          )}
        </div>

        {/* License Verification Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-900">License Verification</h4>
              <p className="text-sm text-blue-700 mt-1">
                We will verify your license with the issuing board to ensure current status and good standing. 
                Any discrepancies may delay or disqualify your application.
              </p>
            </div>
          </div>
        </div>

        {/* International License Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-amber-900">International Licenses</h4>
              <p className="text-sm text-amber-700 mt-1">
                For non-US licenses, additional verification through international medical credential services may be required. 
                This may extend the review process by 2-4 weeks.
              </p>
            </div>
          </div>
        </div>

        {/* Renewal Reminder */}
        {data.licenseExpiry && (
          (() => {
            const expiryDate = new Date(data.licenseExpiry);
            const today = new Date();
            const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            
            if (daysUntilExpiry <= 90 && daysUntilExpiry > 0) {
              return (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium text-yellow-900">License Renewal Notice</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Your license expires in {daysUntilExpiry} days. Please ensure it's renewed before the expiration date to maintain your eligibility.
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })()
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onPrev}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Back to Education
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue to Experience
          </button>
        </div>
      </form>
    </div>
  );
}