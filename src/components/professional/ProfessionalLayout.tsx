'use client';

interface ProfessionalLayoutProps {
  children: React.ReactNode;
}

export default function ProfessionalLayout({ children }: ProfessionalLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Professional-specific header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                🩺 Medical Professional Recruitment
              </h1>
              <p className="text-sm text-gray-600">
                Join our network of distinguished medical experts
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 bg-indigo-50 px-3 py-1 rounded-full">
                Professional Application Portal
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Professional content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        {children}
      </main>

      {/* Professional-specific footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="text-center text-sm text-gray-500 space-y-2">
            <p>
              🔒 Professional data is encrypted and stored separately from patient systems
            </p>
            <p>
              For technical support: <a href="mailto:recruitment-support@secondopinion.com" className="text-indigo-600 hover:text-indigo-800">recruitment-support@secondopinion.com</a>
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                ✓ HIPAA Compliant
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                ✓ GDPR Compliant
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-purple-100 text-purple-800">
                ✓ Segregated System
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}