import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Record video on failure */
    video: 'retain-on-failure',

    /* Take screenshot on failure */
    screenshot: 'only-on-failure',

    /* Global timeout for each test */
    actionTimeout: 15000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*\.browser\.spec\.ts$/,
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: /.*\.browser\.spec\.ts$/,
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testMatch: /.*\.browser\.spec\.ts$/,
    },

    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      testMatch: /.*\.mobile\.spec\.ts$/,
    },

    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
      testMatch: /.*\.mobile\.spec\.ts$/,
    },

    /* Visual regression testing */
    {
      name: 'visual-chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*\.visual\.spec\.ts$/,
    },

    {
      name: 'visual-firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: /.*\.visual\.spec\.ts$/,
    },

    {
      name: 'visual-webkit',
      use: { ...devices['Desktop Safari'] },
      testMatch: /.*\.visual\.spec\.ts$/,
    },

    /* API testing across browsers */
    {
      name: 'api-chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*\.api\.spec\.ts$/,
    },

    {
      name: 'api-firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: /.*\.api\.spec\.ts$/,
    },

    {
      name: 'api-webkit',
      use: { ...devices['Desktop Safari'] },
      testMatch: /.*\.api\.spec\.ts$/,
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    port: 4000,
    reuseExistingServer: !process.env.CI,
    env: {
      PORT: '4000',
    },
  },

  /* Expect configuration */
  expect: {
    /* Threshold for visual comparisons */
    threshold: 0.2,
    /* Maximum allowed pixel difference for visual comparisons */
    toHaveScreenshot: {
      threshold: 0.2,
      maxDiffPixels: 1000,
    },
    /* Maximum time to wait for an assertion to pass */
    timeout: 10000,
  },

  /* Global test timeout */
  timeout: 30000,

  /* Directory for test artifacts */
  outputDir: 'test-results/',
});