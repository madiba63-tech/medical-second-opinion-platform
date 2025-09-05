import { test, expect } from '@playwright/test';

// Mobile browser compatibility tests
test.describe('Mobile Browser Compatibility', () => {
  test.beforeEach(async ({ page }) => {
    // Enable mobile emulation and touch events
    await page.setViewportSize({ width: 375, height: 667 });
    
    page.on('console', msg => console.log(`Mobile [${msg.type()}]: ${msg.text()}`));
    page.on('pageerror', exception => console.error(`Mobile exception: ${exception}`));
  });

  test('should work on mobile Chrome', async ({ page, browserName }) => {
    if (browserName !== 'Mobile Chrome') return;
    
    console.log('Testing mobile Chrome compatibility');
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if mobile layout is applied
    const mainElement = page.locator('main');
    await expect(mainElement).toBeVisible();
    
    // Test touch interactions
    const firstButton = page.locator('button').first();
    if (await firstButton.isVisible()) {
      await firstButton.tap();
    }
    
    // Take mobile screenshot
    await page.screenshot({
      path: `test-results/mobile-chrome-homepage.png`,
      fullPage: true
    });
  });

  test('should work on mobile Safari', async ({ page, browserName }) => {
    if (browserName !== 'Mobile Safari') return;
    
    console.log('Testing mobile Safari compatibility');
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if mobile layout is applied
    const mainElement = page.locator('main');
    await expect(mainElement).toBeVisible();
    
    // Test touch interactions
    const firstButton = page.locator('button').first();
    if (await firstButton.isVisible()) {
      await firstButton.tap();
    }
    
    // Take mobile screenshot
    await page.screenshot({
      path: `test-results/mobile-safari-homepage.png`,
      fullPage: true
    });
  });

  test('should handle mobile viewport correctly', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check viewport meta tag
    const viewportMeta = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewportMeta).toContain('width=device-width');
    
    // Test different mobile orientations
    // Portrait
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    const portraitWidth = await page.evaluate(() => window.innerWidth);
    expect(portraitWidth).toBe(375);
    
    // Landscape
    await page.setViewportSize({ width: 667, height: 375 });
    await page.waitForTimeout(500);
    
    const landscapeWidth = await page.evaluate(() => window.innerWidth);
    expect(landscapeWidth).toBe(667);
  });

  test('should test touch events and gestures', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test touch event availability
    const touchSupported = await page.evaluate(() => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    });
    
    console.log(`${browserName} touch support:`, touchSupported);
    
    // Test tap events on buttons
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      const firstButton = buttons.first();
      
      // Test tap
      await firstButton.tap();
      
      // Test double tap (if supported)
      await firstButton.dblclick();
    }
  });

  test('should test mobile form interactions', async ({ page, browserName }) => {
    await page.goto('/patient');
    await page.waitForLoadState('networkidle');
    
    // Test mobile keyboard interactions
    const textInputs = page.locator('input[type="text"], input[type="email"], textarea');
    const inputCount = await textInputs.count();
    
    if (inputCount > 0) {
      const firstInput = textInputs.first();
      
      // Focus and type
      await firstInput.tap();
      await firstInput.fill('Test mobile input');
      
      // Check if mobile keyboard behavior is correct
      const inputValue = await firstInput.inputValue();
      expect(inputValue).toBe('Test mobile input');
      
      // Test blur
      await page.locator('body').tap();
    }
    
    // Take screenshot of form on mobile
    await page.screenshot({
      path: `test-results/mobile-form-${browserName.replace(' ', '-').toLowerCase()}.png`,
      fullPage: true
    });
  });

  test('should test mobile navigation and menus', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Look for mobile menu button (hamburger menu)
    const menuButton = page.locator('[aria-label*="menu"], [data-testid*="menu"], button:has-text("☰")').first();
    
    if (await menuButton.isVisible()) {
      // Test menu toggle
      await menuButton.tap();
      await page.waitForTimeout(500);
      
      // Take screenshot with menu open
      await page.screenshot({
        path: `test-results/mobile-menu-${browserName.replace(' ', '-').toLowerCase()}.png`,
        fullPage: true
      });
    }
  });

  test('should test mobile scroll behavior', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Get initial scroll position
    const initialScrollTop = await page.evaluate(() => window.scrollY);
    
    // Test scroll down
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(500);
    
    const scrolledPosition = await page.evaluate(() => window.scrollY);
    expect(scrolledPosition).toBeGreaterThan(initialScrollTop);
    
    // Test scroll to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    
    const backToTopPosition = await page.evaluate(() => window.scrollY);
    expect(backToTopPosition).toBeLessThanOrEqual(10); // Allow small tolerance
  });

  test('should test mobile performance', async ({ page, browserName }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    console.log(`${browserName} mobile load time: ${loadTime}ms`);
    
    // Mobile should load within reasonable time (6 seconds for slower devices)
    expect(loadTime).toBeLessThan(6000);
    
    // Test mobile-specific performance metrics
    const mobileMetrics = await page.evaluate(() => {
      return {
        devicePixelRatio: window.devicePixelRatio,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        connection: (navigator as any).connection ? {
          effectiveType: (navigator as any).connection.effectiveType,
          downlink: (navigator as any).connection.downlink
        } : null
      };
    });
    
    console.log(`${browserName} mobile metrics:`, mobileMetrics);
  });

  test('should test mobile-specific CSS features', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test mobile-specific CSS support
    const mobileFeatures = await page.evaluate(() => {
      return {
        touchAction: CSS.supports('touch-action', 'manipulation'),
        scrollSnapType: CSS.supports('scroll-snap-type', 'x mandatory'),
        safeAreaInsets: CSS.supports('padding-top', 'env(safe-area-inset-top)'),
        viewportUnits: CSS.supports('height', '100vh'),
        orientation: CSS.supports('@media', '(orientation: portrait)'),
        hover: CSS.supports('@media', '(hover: none)')
      };
    });
    
    console.log(`${browserName} mobile CSS features:`, mobileFeatures);
    
    // Basic mobile features should be supported
    expect(mobileFeatures.viewportUnits).toBe(true);
  });

  test('should test mobile accessibility features', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test focus management on mobile
    const focusableElements = page.locator('button, input, select, textarea, a[href]');
    const focusableCount = await focusableElements.count();
    
    if (focusableCount > 0) {
      const firstFocusable = focusableElements.first();
      
      // Test programmatic focus
      await firstFocusable.focus();
      
      const isFocused = await firstFocusable.evaluate(el => document.activeElement === el);
      expect(isFocused).toBe(true);
    }
    
    // Test mobile screen reader compatibility
    const ariaLabels = await page.locator('[aria-label]').count();
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').count();
    
    console.log(`${browserName} accessibility elements:`, {
      ariaLabels,
      headings,
      focusableElements: focusableCount
    });
  });

  test('should test mobile zoom and pinch behavior', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if viewport prevents zoom (user-scalable=no)
    const viewportContent = await page.locator('meta[name="viewport"]').getAttribute('content');
    const preventsZoom = viewportContent?.includes('user-scalable=no') || false;
    
    console.log(`${browserName} zoom prevention:`, preventsZoom);
    
    // Test programmatic zoom (if not prevented)
    if (!preventsZoom) {
      // Simulate zoom level changes
      await page.evaluate(() => {
        // Try to change zoom level
        (document.body.style as any).zoom = '1.2';
      });
      
      await page.waitForTimeout(500);
      
      // Reset zoom
      await page.evaluate(() => {
        (document.body.style as any).zoom = '1';
      });
    }
  });

  test('should test mobile orientation changes', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Portrait orientation
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    const portraitLayout = await page.screenshot({ fullPage: false });
    
    // Landscape orientation
    await page.setViewportSize({ width: 667, height: 375 });
    await page.waitForTimeout(500);
    
    const landscapeLayout = await page.screenshot({ fullPage: false });
    
    // Verify layout adapts to orientation
    expect(portraitLayout).not.toEqual(landscapeLayout);
    
    // Test orientation media queries
    const orientationSupport = await page.evaluate(() => {
      return {
        portrait: matchMedia('(orientation: portrait)').matches,
        landscape: matchMedia('(orientation: landscape)').matches
      };
    });
    
    console.log(`${browserName} orientation detection:`, orientationSupport);
    expect(orientationSupport.landscape).toBe(true);
  });
});