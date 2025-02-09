import { type  PlaywrightTestConfig, devices} from '@playwright/test';
import dotenv from 'dotenv';

// Read from default ".env" file.
dotenv.config();

const config: PlaywrightTestConfig = {
  //workers: process.env.CI ? 2 : undefined,
  workers: 1,
  timeout: 30000,
  retries: 2,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  reporter: [
    ['list'],
    ['html', {  outputFile: 'test-results.html', open: 'never'}]
  ],
  use: { 
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
};
export default config;