import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // ...
  /* Configure projects for major browsers */
  projects: [
    // all tests except send money
    {
      name: 'setup',
      testDir: './utils',
      testMatch: /auth.setup\.ts/,
    },
    {
      name: 'chromium1',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
      testDir: './tests/all-tests',
    },
    {
      name: 'firefox1',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],
      testDir: './tests/all-tests',
    },
    // send money tests
    {
      name: 'send-money-setup',
      testDir: './utils',
      testMatch: /send-money-auth.setup\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['send-money-setup'],
      testDir: './tests/send-money-tests',
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['send-money-setup'],
      testDir: './tests/send-money-tests',
    },
  ]
});