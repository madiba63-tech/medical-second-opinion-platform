import { test, expect } from '@playwright/test';

// Browser compatibility tests for Chrome, Firefox, Safari (WebKit)
test.describe('Cross-Browser Compatibility', () => {
  test.beforeEach(async ({ page }) => {
    // Set up browser debugging
    page.on('console', msg => console.log(`Browser Console [${msg.type()}]: ${msg.text()}`));
    page.on('pageerror', exception => console.error(`Uncaught exception: ${exception}`));
  });

  test('should load homepage successfully', async ({ page, browserName }) => {
    console.log(`Testing homepage in ${browserName}`);
    
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check if page title is correct
    await expect(page).toHaveTitle(/Second Opinion/);
    
    // Check if main elements are visible
    await expect(page.locator('main')).toBeVisible();
    
    // Take screenshot for comparison
    await page.screenshot({
      path: `test-results/homepage-${browserName}.png`,
      fullPage: true
    });
  });

  test('should navigate to cross-browser test page', async ({ page, browserName }) => {
    console.log(`Testing cross-browser test page in ${browserName}`);
    
    await page.goto('/cross-browser-test');
    await page.waitForLoadState('networkidle');
    
    // Check if browser detection works
    await expect(page.locator('h1')).toContainText('Cross-Browser Compatibility Test');
    
    // Wait for browser detection to complete
    await page.waitForTimeout(2000);
    
    // Check if browser info is displayed
    const browserInfoSection = page.locator('[class*="bg-white rounded-lg shadow p-6"]').first();
    await expect(browserInfoSection).toBeVisible();
    
    // Check if API tests are displayed
    const apiTestsSection = page.locator('h2:has-text("API Endpoint Tests")').locator('..');
    await expect(apiTestsSection).toBeVisible();
    
    // Take screenshot
    await page.screenshot({
      path: `test-results/cross-browser-test-${browserName}.png`,
      fullPage: true
    });
  });

  test('should handle API calls correctly', async ({ page, browserName }) => {
    console.log(`Testing API calls in ${browserName}`);
    
    await page.goto('/cross-browser-test');
    await page.waitForLoadState('networkidle');
    
    // Wait for API tests to complete
    await page.waitForTimeout(5000);
    
    // Check if API test results are displayed
    const apiResults = page.locator('h2:has-text("API Endpoint Tests") ~ div');
    await expect(apiResults).toBeVisible();
    
    // Check if at least one API test result is shown
    const testResult = apiResults.locator('[class*="p-4 rounded-lg border"]').first();
    await expect(testResult).toBeVisible();
    
    // Verify response times are shown
    await expect(testResult.locator('text=/Time: \\d+ms/')).toBeVisible();
  });

  test('should display CSS and JS feature support', async ({ page, browserName }) => {
    console.log(`Testing feature support detection in ${browserName}`);
    
    await page.goto('/cross-browser-test');
    await page.waitForLoadState('networkidle');
    
    // Wait for tests to complete
    await page.waitForTimeout(3000);
    
    // Check CSS feature support section
    const cssSection = page.locator('h2:has-text("CSS Feature Support")').locator('..');
    await expect(cssSection).toBeVisible();
    
    // Check JavaScript feature support section
    const jsSection = page.locator('h2:has-text("JavaScript Feature Support")').locator('..');
    await expect(jsSection).toBeVisible();
    
    // Check if flexbox support is detected (should be supported in all modern browsers)
    const flexboxSupport = cssSection.locator('text=Flexbox').locator('..').locator('text=✅');
    await expect(flexboxSupport).toBeVisible();
    
    // Check if arrow functions are supported (should be supported in all modern browsers)
    const arrowFunctionSupport = jsSection.locator('text=Arrow Functions').locator('..').locator('text=✅');
    await expect(arrowFunctionSupport).toBeVisible();
  });

  test('should handle form interactions', async ({ page, browserName }) => {
    console.log(`Testing form interactions in ${browserName}`);
    
    // Test patient portal form
    await page.goto('/patient');
    await page.waitForLoadState('networkidle');
    
    // Check if form is visible
    const form = page.locator('form').first();
    await expect(form).toBeVisible();
    
    // Take screenshot of form
    await page.screenshot({
      path: `test-results/patient-form-${browserName}.png`,
      fullPage: true
    });
  });

  test('should test responsive design', async ({ page, browserName }) => {
    console.log(`Testing responsive design in ${browserName}`);
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    // Take mobile screenshot
    await page.screenshot({
      path: `test-results/mobile-${browserName}.png`,
      fullPage: true
    });
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    
    // Take tablet screenshot
    await page.screenshot({
      path: `test-results/tablet-${browserName}.png`,
      fullPage: true
    });
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(1000);
    
    // Take desktop screenshot
    await page.screenshot({
      path: `test-results/desktop-${browserName}.png`,
      fullPage: true
    });
  });

  test('should measure performance metrics', async ({ page, browserName }) => {
    console.log(`Testing performance metrics in ${browserName}`);
    
    // Start performance monitoring
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Log performance metrics
    console.log(`${browserName} load time: ${loadTime}ms`);
    
    // Check Web Vitals using performance API
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const metrics: any = {};
          
          entries.forEach((entry) => {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming;
              metrics.domContentLoaded = navEntry.domContentLoadedEventEnd - navEntry.navigationStart;
              metrics.loadComplete = navEntry.loadEventEnd - navEntry.navigationStart;
            }
            if (entry.entryType === 'paint') {
              if (entry.name === 'first-contentful-paint') {
                metrics.firstContentfulPaint = entry.startTime;
              }
              if (entry.name === 'first-paint') {
                metrics.firstPaint = entry.startTime;
              }
            }
          });
          
          resolve(metrics);
        });
        
        observer.observe({ entryTypes: ['navigation', 'paint'] });
        
        // Fallback timeout
        setTimeout(() => resolve({}), 5000);
      });
    });
    
    console.log(`${browserName} performance metrics:`, metrics);
    
    // Assert reasonable performance (load time should be under 5 seconds)
    expect(loadTime).toBeLessThan(5000);
  });

  test('should handle JavaScript errors gracefully', async ({ page, browserName }) => {
    console.log(`Testing JavaScript error handling in ${browserName}`);
    
    const errors: string[] = [];
    
    page.on('pageerror', exception => {
      errors.push(exception.toString());
    });
    
    await page.goto('/cross-browser-test');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Log any JavaScript errors
    if (errors.length > 0) {
      console.warn(`${browserName} JavaScript errors:`, errors);
    }
    
    // The page should still be functional despite any minor errors
    await expect(page.locator('h1')).toContainText('Cross-Browser Compatibility Test');
  });

  test('should test local storage and session storage', async ({ page, browserName }) => {
    console.log(`Testing storage APIs in ${browserName}`);
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test localStorage
    const localStorageSupported = await page.evaluate(() => {
      try {
        localStorage.setItem('test', 'value');
        const value = localStorage.getItem('test');
        localStorage.removeItem('test');
        return value === 'value';
      } catch {
        return false;
      }
    });
    
    // Test sessionStorage
    const sessionStorageSupported = await page.evaluate(() => {
      try {
        sessionStorage.setItem('test', 'value');
        const value = sessionStorage.getItem('test');
        sessionStorage.removeItem('test');
        return value === 'value';
      } catch {
        return false;
      }
    });
    
    console.log(`${browserName} localStorage support:`, localStorageSupported);
    console.log(`${browserName} sessionStorage support:`, sessionStorageSupported);
    
    // Modern browsers should support both
    expect(localStorageSupported).toBe(true);
    expect(sessionStorageSupported).toBe(true);
  });
});