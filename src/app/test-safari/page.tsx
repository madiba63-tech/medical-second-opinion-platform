'use client';

import { useState, useEffect } from 'react';

export default function SafariTestPage() {
  const [browserInfo, setBrowserInfo] = useState<any>({});
  const [apiTest, setApiTest] = useState<any>({});
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    // Detect browser and capabilities
    const detectBrowser = () => {
      const userAgent = navigator.userAgent;
      const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
      const isChrome = /chrome/i.test(userAgent);
      const isFirefox = /firefox/i.test(userAgent);
      
      setBrowserInfo({
        userAgent,
        isSafari,
        isChrome,
        isFirefox,
        supportsFetch: typeof fetch !== 'undefined',
        supportsAsyncAwait: (() => {
          try {
            new Function('async () => {}');
            return true;
          } catch {
            return false;
          }
        })(),
        supportsOptionalChaining: (() => {
          try {
            new Function('const obj = {}; return obj?.prop');
            return true;
          } catch {
            return false;
          }
        })(),
      });
    };

    // Test API endpoints
    const testAPIs = async () => {
      const results: any = {};
      
      try {
        console.log('Testing statistics API...');
        const statsResponse = await fetch('/api/admin/statistics', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          results.statistics = { success: true, data: statsData };
        } else {
          results.statistics = { 
            success: false, 
            error: `${statsResponse.status} ${statsResponse.statusText}` 
          };
        }
      } catch (error) {
        results.statistics = { success: false, error: error.message };
        setErrors(prev => [...prev, `Statistics API: ${error.message}`]);
      }

      try {
        console.log('Testing cases API...');
        const casesResponse = await fetch('/api/admin/cases', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        if (casesResponse.ok) {
          const casesData = await casesResponse.json();
          results.cases = { success: true, data: casesData };
        } else {
          results.cases = { 
            success: false, 
            error: `${casesResponse.status} ${casesResponse.statusText}` 
          };
        }
      } catch (error) {
        results.cases = { success: false, error: error.message };
        setErrors(prev => [...prev, `Cases API: ${error.message}`]);
      }

      setApiTest(results);
    };

    detectBrowser();
    testAPIs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Safari Compatibility Test</h1>
        
        {/* Browser Detection */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Browser Information</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(browserInfo, null, 2)}
          </pre>
        </div>

        {/* API Tests */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">API Tests</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(apiTest, null, 2)}
          </pre>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-red-800 mb-4">Errors Detected</h2>
            <ul className="space-y-2">
              {errors.map((error, index) => (
                <li key={index} className="text-red-700 bg-red-100 p-2 rounded">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Compatibility Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Compatibility Status</h2>
          <div className="space-y-2">
            <div className={`flex items-center ${browserInfo.supportsFetch ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-2">{browserInfo.supportsFetch ? '✅' : '❌'}</span>
              Fetch API Support
            </div>
            <div className={`flex items-center ${browserInfo.supportsAsyncAwait ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-2">{browserInfo.supportsAsyncAwait ? '✅' : '❌'}</span>
              Async/Await Support
            </div>
            <div className={`flex items-center ${browserInfo.supportsOptionalChaining ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-2">{browserInfo.supportsOptionalChaining ? '✅' : '❌'}</span>
              Optional Chaining Support
            </div>
            <div className={`flex items-center ${apiTest.statistics?.success ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-2">{apiTest.statistics?.success ? '✅' : '❌'}</span>
              Statistics API
            </div>
            <div className={`flex items-center ${apiTest.cases?.success ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-2">{apiTest.cases?.success ? '✅' : '❌'}</span>
              Cases API
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
