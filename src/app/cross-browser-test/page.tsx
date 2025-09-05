'use client';

import { useState, useEffect } from 'react';

interface BrowserInfo {
  name: string;
  version: string;
  userAgent: string;
  isChrome: boolean;
  isFirefox: boolean;
  isSafari: boolean;
  isEdge: boolean;
  supportsFeatures: {
    fetch: boolean;
    asyncAwait: boolean;
    optionalChaining: boolean;
    nullishCoalescing: boolean;
    cssGrid: boolean;
    flexbox: boolean;
    webp: boolean;
    webgl: boolean;
  };
}

interface APITest {
  endpoint: string;
  success: boolean;
  status: number;
  responseTime: number;
  error?: string;
  data?: any;
}

export default function CrossBrowserTestPage() {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
  const [apiTests, setApiTests] = useState<APITest[]>([]);
  const [cssTests, setCssTests] = useState<any>({});
  const [jsTests, setJsTests] = useState<any>({});
  const [performanceTests, setPerformanceTests] = useState<any>({});
  const [realTimeTests, setRealTimeTests] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    detectBrowser();
    runAPITests();
    runCSSTests();
    runJSTests();
    runPerformanceTests();
    runRealTimeTests();
    setLoading(false);
  }, []);

  const detectBrowser = () => {
    const userAgent = navigator.userAgent;
    const isChrome = /chrome/i.test(userAgent) && !/edge/i.test(userAgent);
    const isFirefox = /firefox/i.test(userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
    const isEdge = /edge/i.test(userAgent);

    let name = 'Unknown';
    let version = 'Unknown';

    if (isChrome) {
      name = 'Chrome';
      version = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
    } else if (isFirefox) {
      name = 'Firefox';
      version = userAgent.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
    } else if (isSafari) {
      name = 'Safari';
      version = userAgent.match(/Version\/(\d+)/)?.[1] || 'Unknown';
    } else if (isEdge) {
      name = 'Edge';
      version = userAgent.match(/Edge\/(\d+)/)?.[1] || 'Unknown';
    }

    const supportsFeatures = {
      fetch: typeof fetch !== 'undefined',
      asyncAwait: (() => {
        try {
          new Function('async () => {}');
          return true;
        } catch {
          return false;
        }
      })(),
      optionalChaining: (() => {
        try {
          new Function('const obj = {}; return obj?.prop');
          return true;
        } catch {
          return false;
        }
      })(),
      nullishCoalescing: (() => {
        try {
          new Function('const a = null ?? "default"');
          return true;
        } catch {
          return false;
        }
      })(),
      cssGrid: CSS.supports('display', 'grid'),
      flexbox: CSS.supports('display', 'flex'),
      webp: (() => {
        const canvas = document.createElement('canvas');
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      })(),
      webgl: (() => {
        try {
          const canvas = document.createElement('canvas');
          return !!(window.WebGLRenderingContext && 
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch {
          return false;
        }
      })(),
    };

    setBrowserInfo({
      name,
      version,
      userAgent,
      isChrome,
      isFirefox,
      isSafari,
      isEdge,
      supportsFeatures,
    });
  };

  const runAPITests = async () => {
    const endpoints = [
      '/api/admin/statistics',
      '/api/admin/cases',
      '/api/admin/customers',
    ];

    const tests: APITest[] = [];

    for (const endpoint of endpoints) {
      const startTime = performance.now();
      try {
        const response = await fetch(endpoint, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const endTime = performance.now();
        const responseTime = Math.round(endTime - startTime);

        if (response.ok) {
          const data = await response.json();
          tests.push({
            endpoint,
            success: true,
            status: response.status,
            responseTime,
            data,
          });
        } else {
          tests.push({
            endpoint,
            success: false,
            status: response.status,
            responseTime,
            error: `${response.status} ${response.statusText}`,
          });
        }
      } catch (error: any) {
        const endTime = performance.now();
        const responseTime = Math.round(endTime - startTime);
        tests.push({
          endpoint,
          success: false,
          status: 0,
          responseTime,
          error: error.message,
        });
      }
    }

    setApiTests(tests);
  };

  const runCSSTests = () => {
    const tests = {
      flexbox: CSS.supports('display', 'flex'),
      grid: CSS.supports('display', 'grid'),
      customProperties: CSS.supports('--custom-property', 'value'),
      backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)'),
      aspectRatio: CSS.supports('aspect-ratio', '16/9'),
      containerQueries: CSS.supports('container-type', 'inline-size'),
    };

    setCssTests(tests);
  };

  const runJSTests = () => {
    const tests = {
      arrowFunctions: (() => {
        try {
          new Function('const fn = () => {}');
          return true;
        } catch {
          return false;
        }
      })(),
      templateLiterals: (() => {
        try {
          new Function('const str = `Hello ${"World"}`');
          return true;
        } catch {
          return false;
        }
      })(),
      destructuring: (() => {
        try {
          new Function('const { a, b } = { a: 1, b: 2 }');
          return true;
        } catch {
          return false;
        }
      })(),
      spreadOperator: (() => {
        try {
          new Function('const arr = [...[1, 2, 3]]');
          return true;
        } catch {
          return false;
        }
      })(),
      classes: (() => {
        try {
          new Function('class Test {}');
          return true;
        } catch {
          return false;
        }
      })(),
      modules: (() => {
        try {
          new Function('import("module")');
          return true;
        } catch {
          return false;
        }
      })(),
    };

    setJsTests(tests);
  };

  const runPerformanceTests = () => {
    const tests = {
      navigationTiming: (() => {
        try {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigation) {
            return {
              domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart),
              loadComplete: Math.round(navigation.loadEventEnd - navigation.navigationStart),
              firstPaint: Math.round(navigation.loadEventEnd - navigation.navigationStart),
            };
          }
          return null;
        } catch {
          return null;
        }
      })(),
      memoryInfo: (() => {
        try {
          const memory = (performance as any).memory;
          if (memory) {
            return {
              usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1024 / 1024 * 100) / 100,
              totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1024 / 1024 * 100) / 100,
              jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024 * 100) / 100,
            };
          }
          return null;
        } catch {
          return null;
        }
      })(),
      connectionInfo: (() => {
        try {
          const connection = (navigator as any).connection;
          if (connection) {
            return {
              effectiveType: connection.effectiveType,
              downlink: connection.downlink,
              rtt: connection.rtt,
            };
          }
          return null;
        } catch {
          return null;
        }
      })(),
    };

    setPerformanceTests(tests);
  };

  const runRealTimeTests = () => {
    const tests = {
      localStorage: (() => {
        try {
          localStorage.setItem('test', 'value');
          const result = localStorage.getItem('test') === 'value';
          localStorage.removeItem('test');
          return result;
        } catch {
          return false;
        }
      })(),
      sessionStorage: (() => {
        try {
          sessionStorage.setItem('test', 'value');
          const result = sessionStorage.getItem('test') === 'value';
          sessionStorage.removeItem('test');
          return result;
        } catch {
          return false;
        }
      })(),
      cookies: (() => {
        try {
          document.cookie = 'test=value';
          const result = document.cookie.includes('test=value');
          document.cookie = 'test=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          return result;
        } catch {
          return false;
        }
      })(),
      geolocation: 'geolocation' in navigator,
      notifications: 'Notification' in window,
      serviceWorker: 'serviceWorker' in navigator,
      pushManager: 'PushManager' in window,
      websockets: 'WebSocket' in window,
      webRTC: !!(window as any).RTCPeerConnection,
      fullscreen: !!(document as any).fullscreenEnabled || !!(document as any).webkitFullscreenEnabled,
      deviceOrientation: 'DeviceOrientationEvent' in window,
      touchEvents: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    };

    setRealTimeTests(tests);
  };

  const getBrowserIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'chrome': return '🟢';
      case 'firefox': return '🟠';
      case 'safari': return '🔵';
      case 'edge': return '🟣';
      default: return '❓';
    }
  };

  const getFeatureStatus = (supported: boolean) => {
    return supported ? '✅' : '❌';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Running cross-browser tests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cross-Browser Compatibility Test</h1>
        
        {/* Browser Detection */}
        {browserInfo && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              {getBrowserIcon(browserInfo.name)} {browserInfo.name} {browserInfo.version}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Browser Information</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>User Agent:</strong> {browserInfo.userAgent}</p>
                  <p><strong>Chrome:</strong> {browserInfo.isChrome ? '✅' : '❌'}</p>
                  <p><strong>Firefox:</strong> {browserInfo.isFirefox ? '✅' : '❌'}</p>
                  <p><strong>Safari:</strong> {browserInfo.isSafari ? '✅' : '❌'}</p>
                  <p><strong>Edge:</strong> {browserInfo.isEdge ? '✅' : '❌'}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Feature Support</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Fetch API:</strong> {getFeatureStatus(browserInfo.supportsFeatures.fetch)}</p>
                  <p><strong>Async/Await:</strong> {getFeatureStatus(browserInfo.supportsFeatures.asyncAwait)}</p>
                  <p><strong>Optional Chaining:</strong> {getFeatureStatus(browserInfo.supportsFeatures.optionalChaining)}</p>
                  <p><strong>Nullish Coalescing:</strong> {getFeatureStatus(browserInfo.supportsFeatures.nullishCoalescing)}</p>
                  <p><strong>CSS Grid:</strong> {getFeatureStatus(browserInfo.supportsFeatures.cssGrid)}</p>
                  <p><strong>Flexbox:</strong> {getFeatureStatus(browserInfo.supportsFeatures.flexbox)}</p>
                  <p><strong>WebP:</strong> {getFeatureStatus(browserInfo.supportsFeatures.webp)}</p>
                  <p><strong>WebGL:</strong> {getFeatureStatus(browserInfo.supportsFeatures.webgl)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Tests */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">API Endpoint Tests</h2>
          <div className="space-y-4">
            {apiTests.map((test, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                test.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{test.endpoint}</h3>
                    <p className="text-sm text-gray-600">
                      Status: {test.status} • Time: {test.responseTime}ms
                    </p>
                  </div>
                  <span className={`text-lg ${test.success ? 'text-green-600' : 'text-red-600'}`}>
                    {test.success ? '✅' : '❌'}
                  </span>
                </div>
                {test.error && (
                  <p className="text-sm text-red-600 mt-2">{test.error}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CSS Tests */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">CSS Feature Support</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(cssTests).map(([feature, supported]) => (
              <div key={feature} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium capitalize">{feature}</span>
                <span className={supported ? 'text-green-600' : 'text-red-600'}>
                  {getFeatureStatus(supported)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* JavaScript Tests */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">JavaScript Feature Support</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(jsTests).map(([feature, supported]) => (
              <div key={feature} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium capitalize">{feature.replace(/([A-Z])/g, ' $1')}</span>
                <span className={supported ? 'text-green-600' : 'text-red-600'}>
                  {getFeatureStatus(supported)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Tests */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Navigation Timing */}
            <div>
              <h3 className="text-lg font-medium mb-2">Navigation Timing</h3>
              {performanceTests.navigationTiming ? (
                <div className="space-y-1 text-sm">
                  <p><strong>DOM Content Loaded:</strong> {performanceTests.navigationTiming.domContentLoaded}ms</p>
                  <p><strong>Load Complete:</strong> {performanceTests.navigationTiming.loadComplete}ms</p>
                  <p><strong>First Paint:</strong> {performanceTests.navigationTiming.firstPaint}ms</p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Navigation timing not available</p>
              )}
            </div>

            {/* Memory Info */}
            <div>
              <h3 className="text-lg font-medium mb-2">Memory Usage</h3>
              {performanceTests.memoryInfo ? (
                <div className="space-y-1 text-sm">
                  <p><strong>Used:</strong> {performanceTests.memoryInfo.usedJSHeapSize}MB</p>
                  <p><strong>Total:</strong> {performanceTests.memoryInfo.totalJSHeapSize}MB</p>
                  <p><strong>Limit:</strong> {performanceTests.memoryInfo.jsHeapSizeLimit}MB</p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Memory info not available</p>
              )}
            </div>

            {/* Connection Info */}
            <div>
              <h3 className="text-lg font-medium mb-2">Connection</h3>
              {performanceTests.connectionInfo ? (
                <div className="space-y-1 text-sm">
                  <p><strong>Type:</strong> {performanceTests.connectionInfo.effectiveType}</p>
                  <p><strong>Downlink:</strong> {performanceTests.connectionInfo.downlink} Mbps</p>
                  <p><strong>RTT:</strong> {performanceTests.connectionInfo.rtt}ms</p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Connection info not available</p>
              )}
            </div>
          </div>
        </div>

        {/* Real-time Feature Tests */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Real-time Features & APIs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(realTimeTests).map(([feature, supported]) => (
              <div key={feature} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium capitalize text-sm">{feature.replace(/([A-Z])/g, ' $1')}</span>
                <span className={supported ? 'text-green-600' : 'text-red-600'}>
                  {getFeatureStatus(supported)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">Cross-Browser Development Recommendations</h2>
          <div className="space-y-3 text-blue-800">
            <p><strong>1. Use Feature Detection:</strong> Always check for feature support before using modern APIs.</p>
            <p><strong>2. Progressive Enhancement:</strong> Build for older browsers first, then enhance for modern ones.</p>
            <p><strong>3. CSS Prefixes:</strong> Use tools like Autoprefixer for automatic vendor prefixing.</p>
            <p><strong>4. Polyfills:</strong> Include polyfills for missing features in older browsers.</p>
            <p><strong>5. Testing Strategy:</strong> Test in all major browsers before deployment.</p>
            <p><strong>6. Fallbacks:</strong> Always provide fallback solutions for unsupported features.</p>
          </div>
        </div>

        {/* Live Testing Tools */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Live Testing Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => window.location.reload()} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                >
                  Reload Tests
                </button>
                <button 
                  onClick={() => navigator.clipboard?.writeText(window.location.href)} 
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                >
                  Copy Test URL
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Test Coverage</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Browser Support:</strong> Chrome, Firefox, Safari, Edge</p>
                <p><strong>Mobile Support:</strong> iOS Safari, Chrome Mobile</p>
                <p><strong>Features Tested:</strong> {Object.keys(realTimeTests).length + Object.keys(cssTests).length + Object.keys(jsTests).length}</p>
                <p><strong>API Endpoints:</strong> {apiTests.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
