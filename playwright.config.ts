console.log('Loading playwright.config.ts...');
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const browserEnv = process.env.BROWSER?.toLowerCase();
const projects = [];
switch (browserEnv) {
  case 'chromium':
    projects.push({
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    });
    break;
  case 'firefox':
    projects.push({
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    });
    break;
  case 'webkit':
    projects.push({
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    });
    break;
  default:
    projects.push(
      { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
      { name: 'firefox',  use: { ...devices['Desktop Firefox'] } }
    );
}

export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.spec.ts'],
  timeout: 10_000,
  globalTeardown: './playwright.teardown.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: [
    ['html', { outputFolder: 'test-results', open: 'never' }],
    ['json', { outputFile: 'test-results/index.json' }]
  ],
  use: {
    baseURL: process.env.QUOTE_BASE_URL,
    actionTimeout: 0,
    trace: 'retain-on-failure',
    headless: process.env.HEADLESS === 'true',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    launchOptions: {
      slowMo: Number(process.env.SLOW_MO),
      args: ['--disable-web-security', '--disable-gpu', '--no-sandbox', '--disable-setuid-sandbox'],
      ignoreDefaultArgs: ['--disable-extensions']
    },
    contextOptions: {
      viewport: { width: 1920, height: 1080 },
      permissions: ['geolocation'],
      geolocation: { longitude: -122.4194, latitude: 37.7749 },
      locale: 'en-US',
      timezoneId: 'America/New_York',
      recordVideo: { dir: 'videos/', size: { width: 1920, height: 1080 } }
    }
  },
  projects
});