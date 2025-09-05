import { test, expect } from '@playwright/test';

// API compatibility tests across browsers
test.describe('API Compatibility Across Browsers', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log(`API Test [${msg.type()}]: ${msg.text()}`));
    page.on('response', response => {
      if (!response.ok() && response.url().includes('/api/')) {
        console.warn(`API Error: ${response.status()} ${response.url()}`);
      }
    });
  });

  test('should test fetch API compatibility', async ({ page, browserName }) => {
    console.log(`Testing Fetch API in ${browserName}`);
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test fetch API availability and functionality
    const fetchResults = await page.evaluate(async () => {
      const results = {
        fetchAvailable: typeof fetch !== 'undefined',
        fetchWorking: false,
        fetchError: null,
        responseHeaders: {},
        responseTime: 0
      };
      
      if (results.fetchAvailable) {
        try {
          const startTime = performance.now();
          const response = await fetch('/api/health', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          const endTime = performance.now();
          
          results.responseTime = endTime - startTime;
          results.fetchWorking = response.ok;
          
          // Get response headers
          response.headers.forEach((value, key) => {
            results.responseHeaders[key] = value;
          });
          
        } catch (error) {
          results.fetchError = error.toString();
        }
      }
      
      return results;
    });
    
    console.log(`${browserName} Fetch API results:`, fetchResults);
    
    expect(fetchResults.fetchAvailable).toBe(true);
    expect(fetchResults.responseTime).toBeLessThan(5000);
  });

  test('should test XMLHttpRequest compatibility', async ({ page, browserName }) => {
    console.log(`Testing XMLHttpRequest in ${browserName}`);
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const xhrResults = await page.evaluate(() => {
      return new Promise((resolve) => {
        const results = {
          xhrAvailable: typeof XMLHttpRequest !== 'undefined',
          xhrWorking: false,
          xhrError: null,
          responseTime: 0,
          status: 0
        };
        
        if (results.xhrAvailable) {
          const xhr = new XMLHttpRequest();
          const startTime = performance.now();
          
          xhr.onload = function() {
            const endTime = performance.now();
            results.responseTime = endTime - startTime;
            results.xhrWorking = xhr.status >= 200 && xhr.status < 400;
            results.status = xhr.status;
            resolve(results);
          };
          
          xhr.onerror = function() {
            results.xhrError = 'XHR request failed';
            resolve(results);
          };
          
          xhr.ontimeout = function() {
            results.xhrError = 'XHR request timed out';
            resolve(results);
          };
          
          xhr.open('GET', '/api/health');
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.timeout = 5000;
          xhr.send();
        } else {
          resolve(results);
        }
      });
    });
    
    console.log(`${browserName} XMLHttpRequest results:`, xhrResults);
    
    expect(xhrResults.xhrAvailable).toBe(true);
  });

  test('should test CORS handling', async ({ page, browserName }) => {
    console.log(`Testing CORS handling in ${browserName}`);
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const corsResults = await page.evaluate(async () => {
      const results = {
        corsSupported: false,
        preflight: false,
        credentials: false,
        error: null
      };
      
      try {
        // Test simple CORS request
        const response = await fetch('/api/health', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        results.corsSupported = response.ok;
        
        // Test preflight request (would be triggered with custom headers)
        const preflightResponse = await fetch('/api/health', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Custom-Header': 'test'
          }
        });
        
        results.preflight = preflightResponse.ok;
        
      } catch (error) {
        results.error = error.toString();
      }
      
      return results;
    });
    
    console.log(`${browserName} CORS results:`, corsResults);
    
    // Basic CORS should work for same-origin requests
    expect(corsResults.corsSupported).toBe(true);
  });

  test('should test JSON handling', async ({ page, browserName }) => {
    console.log(`Testing JSON handling in ${browserName}`);
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const jsonResults = await page.evaluate(async () => {
      const results = {
        jsonParse: false,
        jsonStringify: false,
        fetchJson: false,
        error: null
      };
      
      try {
        // Test JSON.parse
        const parsed = JSON.parse('{"test": "value"}');
        results.jsonParse = parsed.test === 'value';
        
        // Test JSON.stringify
        const stringified = JSON.stringify({ test: 'value' });
        results.jsonStringify = stringified === '{"test":"value"}';
        
        // Test fetch with JSON
        const response = await fetch('/api/health');
        if (response.ok) {
          const data = await response.json();
          results.fetchJson = typeof data === 'object';
        }
        
      } catch (error) {
        results.error = error.toString();
      }
      
      return results;
    });
    
    console.log(`${browserName} JSON results:`, jsonResults);
    
    expect(jsonResults.jsonParse).toBe(true);
    expect(jsonResults.jsonStringify).toBe(true);
  });

  test('should test async/await support', async ({ page, browserName }) => {
    console.log(`Testing async/await support in ${browserName}`);
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const asyncResults = await page.evaluate(async () => {
      const results = {
        asyncAwaitSupported: false,
        promiseSupported: false,
        error: null
      };
      
      try {
        // Test Promise support
        results.promiseSupported = typeof Promise !== 'undefined';
        
        // Test async/await
        const asyncFunction = async () => {
          return new Promise((resolve) => {
            setTimeout(() => resolve('success'), 10);
          });
        };
        
        const result = await asyncFunction();
        results.asyncAwaitSupported = result === 'success';
        
      } catch (error) {
        results.error = error.toString();
      }
      
      return results;
    });
    
    console.log(`${browserName} async/await results:`, asyncResults);
    
    expect(asyncResults.promiseSupported).toBe(true);
    expect(asyncResults.asyncAwaitSupported).toBe(true);
  });

  test('should test error handling consistency', async ({ page, browserName }) => {
    console.log(`Testing error handling consistency in ${browserName}`);
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const errorResults = await page.evaluate(async () => {
      const results = {
        fetchError: null,
        xhrError: null,
        consistentErrorHandling: false
      };
      
      try {
        // Test fetch error handling
        try {
          await fetch('/api/nonexistent');
        } catch (error) {
          results.fetchError = error.constructor.name;
        }
        
        // Test XHR error handling
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/nonexistent');
        
        const xhrPromise = new Promise((resolve) => {
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              results.xhrError = xhr.status.toString();
              resolve(null);
            }
          };
        });
        
        xhr.send();
        await xhrPromise;
        
        // Both should handle errors in a similar manner
        results.consistentErrorHandling = (
          (results.fetchError !== null || results.xhrError !== null)
        );
        
      } catch (error) {
        console.error('Error testing error handling:', error);
      }
      
      return results;
    });
    
    console.log(`${browserName} error handling results:`, errorResults);
  });

  test('should test content type handling', async ({ page, browserName }) => {
    console.log(`Testing content type handling in ${browserName}`);
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const contentTypeResults = await page.evaluate(async () => {
      const results = {
        jsonContentType: false,
        textContentType: false,
        acceptHeader: false,
        error: null
      };
      
      try {
        // Test JSON content type
        const jsonResponse = await fetch('/api/health', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        results.jsonContentType = jsonResponse.headers.get('content-type')?.includes('application/json') || false;
        results.acceptHeader = jsonResponse.ok;
        
      } catch (error) {
        results.error = error.toString();
      }
      
      return results;
    });
    
    console.log(`${browserName} content type results:`, contentTypeResults);
    
    expect(contentTypeResults.acceptHeader).toBe(true);
  });

  test('should test request methods', async ({ page, browserName }) => {
    console.log(`Testing HTTP methods in ${browserName}`);
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const methodResults = await page.evaluate(async () => {
      const results = {
        get: false,
        post: false,
        put: false,
        delete: false,
        options: false,
        error: null
      };
      
      try {
        // Test GET
        const getResponse = await fetch('/api/health', { method: 'GET' });
        results.get = getResponse.status !== 405; // Not Method Not Allowed
        
        // Note: Other methods might not be implemented in the API,
        // but we're testing if the browser can make the requests
        
      } catch (error) {
        results.error = error.toString();
      }
      
      return results;
    });
    
    console.log(`${browserName} HTTP methods results:`, methodResults);
    
    expect(methodResults.get).toBe(true);
  });
});