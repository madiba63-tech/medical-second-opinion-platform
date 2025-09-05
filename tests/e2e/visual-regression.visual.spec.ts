import { test, expect } from '@playwright/test';

// Visual regression tests across browsers
test.describe('Visual Regression Testing', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure consistent font rendering
    await page.addStyleTag({
      content: `
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-smooth: always;
        }
      `
    });
  });

  test('should match homepage layout across browsers', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for any animations to complete
    await page.waitForTimeout(1000);
    
    // Hide dynamic elements that might cause test flakiness
    await page.addStyleTag({
      content: `
        .animate-spin { animation: none !important; }
        [data-testid="current-time"] { visibility: hidden; }
        .loading-spinner { display: none !important; }
      `
    });
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot(`homepage-${browserName}.png`, {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should match cross-browser test page layout', async ({ page, browserName }) => {
    await page.goto('/cross-browser-test');
    await page.waitForLoadState('networkidle');
    
    // Wait for API tests to complete
    await page.waitForTimeout(5000);
    
    // Hide dynamic content that might vary between runs
    await page.addStyleTag({
      content: `
        [class*="responseTime"] { visibility: hidden; }
        [class*="userAgent"] { visibility: hidden; }
        .animate-pulse { animation: none !important; }
      `
    });
    
    await expect(page).toHaveScreenshot(`cross-browser-test-${browserName}.png`, {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should match patient portal layout', async ({ page, browserName }) => {
    await page.goto('/patient');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot(`patient-portal-${browserName}.png`, {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should match professional portal layout', async ({ page, browserName }) => {
    await page.goto('/professional');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot(`professional-portal-${browserName}.png`, {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should match responsive layouts', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot(`responsive-mobile-${browserName}.png`, {
      fullPage: true,
      animations: 'disabled',
    });
    
    // Test tablet layout
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot(`responsive-tablet-${browserName}.png`, {
      fullPage: true,
      animations: 'disabled',
    });
    
    // Test desktop layout
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot(`responsive-desktop-${browserName}.png`, {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should test form elements consistency', async ({ page, browserName }) => {
    await page.goto('/patient');
    await page.waitForLoadState('networkidle');
    
    // Focus on form elements section
    const formSection = page.locator('form').first();
    if (await formSection.isVisible()) {
      await expect(formSection).toHaveScreenshot(`form-elements-${browserName}.png`, {
        animations: 'disabled',
      });
    }
  });

  test('should test button and input styling', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Create a test page with all UI components
    await page.evaluate(() => {
      const testDiv = document.createElement('div');
      testDiv.id = 'ui-components-test';
      testDiv.innerHTML = `
        <div style="padding: 20px; background: white; margin: 20px;">
          <h2>UI Components Test</h2>
          
          <!-- Buttons -->
          <div style="margin: 20px 0;">
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              Primary Button
            </button>
            <button class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2">
              Secondary Button
            </button>
            <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Success Button
            </button>
          </div>
          
          <!-- Inputs -->
          <div style="margin: 20px 0;">
            <input type="text" placeholder="Text input" class="border border-gray-300 rounded px-3 py-2 mr-2" />
            <input type="email" placeholder="Email input" class="border border-gray-300 rounded px-3 py-2 mr-2" />
            <input type="password" placeholder="Password input" class="border border-gray-300 rounded px-3 py-2" />
          </div>
          
          <!-- Select and Textarea -->
          <div style="margin: 20px 0;">
            <select class="border border-gray-300 rounded px-3 py-2 mr-2">
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
            <textarea placeholder="Textarea" class="border border-gray-300 rounded px-3 py-2" rows="3"></textarea>
          </div>
        </div>
      `;
      document.body.appendChild(testDiv);
    });
    
    const testSection = page.locator('#ui-components-test');
    await expect(testSection).toHaveScreenshot(`ui-components-${browserName}.png`, {
      animations: 'disabled',
    });
  });

  test('should test typography rendering', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Create typography test
    await page.evaluate(() => {
      const testDiv = document.createElement('div');
      testDiv.id = 'typography-test';
      testDiv.innerHTML = `
        <div style="padding: 20px; background: white; margin: 20px; max-width: 800px;">
          <h1>Heading 1 - Medical Second Opinion Platform</h1>
          <h2>Heading 2 - Expert Healthcare Consultations</h2>
          <h3>Heading 3 - Specialized Medical Reviews</h3>
          <h4>Heading 4 - Professional Medical Analysis</h4>
          
          <p style="margin: 16px 0;">
            This is a paragraph of body text that demonstrates how typography renders 
            across different browsers. It includes <strong>bold text</strong>, 
            <em>italic text</em>, and <a href="#">links</a>.
          </p>
          
          <ul style="margin: 16px 0; padding-left: 20px;">
            <li>List item one with medical terminology</li>
            <li>List item two with healthcare information</li>
            <li>List item three with diagnostic details</li>
          </ul>
          
          <blockquote style="border-left: 4px solid #e5e7eb; padding-left: 16px; margin: 16px 0; color: #6b7280;">
            "Providing accurate medical second opinions through advanced technology 
            and expert healthcare professionals."
          </blockquote>
        </div>
      `;
      document.body.appendChild(testDiv);
    });
    
    const typographySection = page.locator('#typography-test');
    await expect(typographySection).toHaveScreenshot(`typography-${browserName}.png`, {
      animations: 'disabled',
    });
  });

  test('should test color rendering and gradients', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Create color test
    await page.evaluate(() => {
      const testDiv = document.createElement('div');
      testDiv.id = 'color-test';
      testDiv.innerHTML = `
        <div style="padding: 20px; background: white; margin: 20px;">
          <h3>Color Rendering Test</h3>
          
          <!-- Solid colors -->
          <div style="display: flex; gap: 10px; margin: 20px 0;">
            <div style="width: 50px; height: 50px; background-color: #ef4444; border-radius: 8px;"></div>
            <div style="width: 50px; height: 50px; background-color: #10b981; border-radius: 8px;"></div>
            <div style="width: 50px; height: 50px; background-color: #3b82f6; border-radius: 8px;"></div>
            <div style="width: 50px; height: 50px; background-color: #f59e0b; border-radius: 8px;"></div>
            <div style="width: 50px; height: 50px; background-color: #8b5cf6; border-radius: 8px;"></div>
          </div>
          
          <!-- Gradients -->
          <div style="margin: 20px 0;">
            <div style="width: 300px; height: 60px; background: linear-gradient(to right, #3b82f6, #10b981); border-radius: 8px; margin-bottom: 10px;"></div>
            <div style="width: 300px; height: 60px; background: linear-gradient(45deg, #ef4444, #f59e0b); border-radius: 8px;"></div>
          </div>
          
          <!-- Shadows -->
          <div style="margin: 20px 0;">
            <div style="width: 200px; height: 100px; background: white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 8px; padding: 20px;">
              Box with shadow
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(testDiv);
    });
    
    const colorSection = page.locator('#color-test');
    await expect(colorSection).toHaveScreenshot(`color-rendering-${browserName}.png`, {
      animations: 'disabled',
    });
  });

  test('should test CSS grid and flexbox layouts', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Create layout test
    await page.evaluate(() => {
      const testDiv = document.createElement('div');
      testDiv.id = 'layout-test';
      testDiv.innerHTML = `
        <div style="padding: 20px; background: white; margin: 20px;">
          <h3>Layout Test</h3>
          
          <!-- Flexbox layout -->
          <div style="display: flex; gap: 10px; margin: 20px 0;">
            <div style="flex: 1; background: #e5e7eb; padding: 20px; border-radius: 8px;">Flex Item 1</div>
            <div style="flex: 2; background: #d1d5db; padding: 20px; border-radius: 8px;">Flex Item 2</div>
            <div style="flex: 1; background: #e5e7eb; padding: 20px; border-radius: 8px;">Flex Item 3</div>
          </div>
          
          <!-- Grid layout -->
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin: 20px 0;">
            <div style="background: #dbeafe; padding: 20px; border-radius: 8px;">Grid Item 1</div>
            <div style="background: #bfdbfe; padding: 20px; border-radius: 8px;">Grid Item 2</div>
            <div style="background: #93c5fd; padding: 20px; border-radius: 8px;">Grid Item 3</div>
            <div style="background: #60a5fa; padding: 20px; border-radius: 8px; grid-column: span 3;">Grid Item 4 (Spanning)</div>
          </div>
        </div>
      `;
      document.body.appendChild(testDiv);
    });
    
    const layoutSection = page.locator('#layout-test');
    await expect(layoutSection).toHaveScreenshot(`layout-rendering-${browserName}.png`, {
      animations: 'disabled',
    });
  });
});