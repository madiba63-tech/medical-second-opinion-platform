import { Page, expect } from '@playwright/test';

/**
 * Browser testing utilities for cross-browser compatibility tests
 */

export interface BrowserInfo {
  name: string;
  version: string;
  userAgent: string;
  mobile: boolean;
}

/**
 * Get browser information from the page
 */
export async function getBrowserInfo(page: Page): Promise<BrowserInfo> {
  return await page.evaluate(() => {
    const userAgent = navigator.userAgent;
    let name = 'Unknown';
    let version = 'Unknown';
    let mobile = false;
    
    if (/chrome/i.test(userAgent) && !/edge/i.test(userAgent)) {
      name = 'Chrome';
      version = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
    } else if (/firefox/i.test(userAgent)) {
      name = 'Firefox';
      version = userAgent.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
    } else if (/^((?!chrome|android).)*safari/i.test(userAgent)) {
      name = 'Safari';
      version = userAgent.match(/Version\/(\d+)/)?.[1] || 'Unknown';
    } else if (/edge/i.test(userAgent)) {
      name = 'Edge';
      version = userAgent.match(/Edge\/(\d+)/)?.[1] || 'Unknown';
    }
    
    mobile = /Mobile|Android|iPhone|iPad/i.test(userAgent);
    
    return { name, version, userAgent, mobile };
  });
}

/**
 * Test JavaScript feature support
 */
export async function testJavaScriptFeatures(page: Page) {
  return await page.evaluate(() => {
    const features = {
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
      promises: typeof Promise !== 'undefined',
      localStorage: typeof localStorage !== 'undefined',
      sessionStorage: typeof sessionStorage !== 'undefined',
    };
    
    return features;
  });
}

/**
 * Test CSS feature support
 */
export async function testCSSFeatures(page: Page) {
  return await page.evaluate(() => {
    const features = {
      flexbox: CSS.supports('display', 'flex'),
      grid: CSS.supports('display', 'grid'),
      customProperties: CSS.supports('--custom-property', 'value'),
      containerQueries: CSS.supports('container-type', 'inline-size'),
      aspectRatio: CSS.supports('aspect-ratio', '16/9'),
      backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)'),
    };
    
    return features;
  });
}

/**
 * Test API endpoints across browsers
 */
export async function testAPIEndpoint(
  page: Page, 
  endpoint: string, 
  options?: RequestInit
): Promise<{
  success: boolean;
  status: number;
  responseTime: number;
  error?: string;
}> {
  return await page.evaluate(async ({ endpoint, options }) => {
    const startTime = performance.now();
    
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        ...options,
      });
      
      const endTime = performance.now();
      
      return {
        success: response.ok,
        status: response.status,
        responseTime: Math.round(endTime - startTime),
      };
    } catch (error) {
      const endTime = performance.now();
      
      return {
        success: false,
        status: 0,
        responseTime: Math.round(endTime - startTime),
        error: error.toString(),
      };
    }
  }, { endpoint, options });
}

/**
 * Wait for page to be fully loaded and stable
 */
export async function waitForPageReady(page: Page, timeout = 10000) {
  await page.waitForLoadState('networkidle', { timeout });
  
  // Wait for any potential JavaScript to finish executing
  await page.waitForFunction(() => {
    return document.readyState === 'complete';
  }, { timeout });
  
  // Small additional delay to ensure stability
  await page.waitForTimeout(500);
}

/**
 * Take a screenshot with consistent settings
 */
export async function takeConsistentScreenshot(
  page: Page, 
  path: string, 
  options?: { fullPage?: boolean }
) {
  // Disable animations for consistent screenshots
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `
  });
  
  await page.waitForTimeout(100);
  
  return await page.screenshot({
    path,
    fullPage: options?.fullPage ?? true,
    animations: 'disabled',
  });
}

/**
 * Test form functionality across browsers
 */
export async function testFormInteraction(page: Page, formSelector: string) {
  const form = page.locator(formSelector);
  await expect(form).toBeVisible();
  
  // Test text input
  const textInput = form.locator('input[type="text"]').first();
  if (await textInput.count() > 0) {
    await textInput.fill('Test input');
    await expect(textInput).toHaveValue('Test input');
  }
  
  // Test email input
  const emailInput = form.locator('input[type="email"]').first();
  if (await emailInput.count() > 0) {
    await emailInput.fill('test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');
  }
  
  // Test textarea
  const textarea = form.locator('textarea').first();
  if (await textarea.count() > 0) {
    await textarea.fill('Test textarea content');
    await expect(textarea).toHaveValue('Test textarea content');
  }
  
  return true;
}

/**
 * Check for JavaScript errors on the page
 */
export async function checkForJavaScriptErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  
  page.on('pageerror', (error) => {
    errors.push(error.toString());
  });
  
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  return errors;
}

/**
 * Test touch events (for mobile)
 */
export async function testTouchEvents(page: Page) {
  if (!/Mobile|Android|iPhone|iPad/i.test(await page.evaluate(() => navigator.userAgent))) {
    return { touchSupported: false };
  }
  
  return await page.evaluate(() => {
    return {
      touchSupported: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      maxTouchPoints: navigator.maxTouchPoints,
      touchEvents: {
        touchstart: 'ontouchstart' in window,
        touchmove: 'ontouchmove' in window,
        touchend: 'ontouchend' in window,
      }
    };
  });
}

/**
 * Get performance metrics
 */
export async function getPerformanceMetrics(page: Page) {
  return await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    const metrics: any = {};
    
    if (navigation) {
      metrics.navigationTiming = {
        domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart),
        loadComplete: Math.round(navigation.loadEventEnd - navigation.navigationStart),
        firstByte: Math.round(navigation.responseStart - navigation.navigationStart),
        domProcessing: Math.round(navigation.domComplete - navigation.domLoading),
      };
    }
    
    paint.forEach((entry) => {
      if (entry.name === 'first-contentful-paint') {
        metrics.firstContentfulPaint = Math.round(entry.startTime);
      } else if (entry.name === 'first-paint') {
        metrics.firstPaint = Math.round(entry.startTime);
      }
    });
    
    // Memory info (Chrome only)
    if ((performance as any).memory) {
      const memory = (performance as any).memory;
      metrics.memory = {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024 * 100) / 100,
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024 * 100) / 100,
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024 * 100) / 100,
      };
    }
    
    return metrics;
  });
}

/**
 * Test accessibility features
 */
export async function testAccessibility(page: Page) {
  return await page.evaluate(() => {
    const results = {
      headings: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length,
      ariaLabels: document.querySelectorAll('[aria-label]').length,
      altTexts: document.querySelectorAll('img[alt]').length,
      focusableElements: document.querySelectorAll(
        'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
      ).length,
      skipLinks: document.querySelectorAll('a[href^="#"]').length,
    };
    
    return results;
  });
}