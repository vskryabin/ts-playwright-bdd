console.log('Loading world.ts...');
import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { chromium, firefox, Browser, BrowserContext, Page } from 'playwright';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const VIDEO_DIR   = path.resolve('test-results/videos');
const VIEWPORT    = { width: 1920, height: 1080 };
const GEOLOCATION = { longitude: -122.4194, latitude: 37.7749 };
const LOCALE      = 'en-US';
const TIMEZONE    = 'America/New_York';
const LAUNCH_OPTS = {
  headless: process.env.HEADLESS === 'true',
  slowMo:   Number(process.env.SLOW_MO || 0),
  args: [
    '--disable-web-security',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ],
  ignoreDefaultArgs: ['--disable-extensions'],
};


export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init(): Promise<void> {
    await fs.promises.rm(VIDEO_DIR, { recursive: true, force: true });
    await fs.promises.mkdir(VIDEO_DIR, { recursive: true });
    const browserName = (process.env.BROWSER || 'chromium').toLowerCase();
    switch (browserName) {
      case 'firefox':
        this.browser = await firefox.launch(LAUNCH_OPTS);
        break;
      case 'chromium':
      default:
        this.browser = await chromium.launch(LAUNCH_OPTS);
        break;
    }

    this.context = await this.browser.newContext({
      viewport: VIEWPORT,
      permissions: ['geolocation'],
      geolocation: GEOLOCATION,
      locale: LOCALE,
      timezoneId: TIMEZONE,
      ignoreHTTPSErrors: true,
      recordVideo: { dir: VIDEO_DIR, size: VIEWPORT },
    });

    this.page = await this.context.newPage();
  }

  async cleanup(): Promise<void> {
    await this.page?.waitForTimeout(500);
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
    const tempDir = path.resolve(process.cwd(), 'temp');
    try {
      const files = fs.readdirSync(tempDir);
      files.forEach(file => {
        fs.unlinkSync(path.join(tempDir, file));
      });
      console.log(`Cleaned up ${files.length} temp files in ${tempDir}`);
    } catch (e: any) {
      if (e.code !== 'ENOENT') {
        console.warn(`Could not clean temp: ${e.message}`);
      }
    }
    const when = new Date().toISOString();
    console.log(`Completed at: ${when}`);
  }
}

setWorldConstructor(CustomWorld);