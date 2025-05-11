console.log('Loading quote.spec.ts...');
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import QuoteForm from '../pages/QuoteForm';
import QuoteResult from '../pages/QuoteResult';

dotenv.config();

test.describe('Quote Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(process.env.QUOTE_BASE_URL!);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
      const screenshotPath = testInfo.outputPath(
        'screenshots',
        `${testInfo.title.replace(/\s+/g, '_')}.png`
      );
      await fs.promises.mkdir(path.dirname(screenshotPath), { recursive: true });
      await page.screenshot({ path: screenshotPath });
      await testInfo.attach('screenshot', {
        path: screenshotPath,
        contentType: 'image/png',
      });
    }
  });

  test('should fill out and verify required fields', async ({ page }) => {
    await page.goto('https://skryabin.com/market/quote.html');
    await page.locator('input[name="username"]').click();
    await page.locator('input[name="username"]').fill(process.env.TEST_USERNAME!);
    await page.locator('input[name="email"]').fill(process.env.TEST_EMAIL!);
    await page.locator('#password').fill(process.env.TEST_PASSWORD!);
    await page.locator('#password').press('Tab');
    await page.locator('#confirmPassword').fill(process.env.TEST_PASSWORD!);
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="firstName"]').fill(process.env.TEST_FIRST_NAME!);
    await page.locator('input[name="lastName"]').fill(process.env.TEST_LAST_NAME!);
    await page.locator('text=Save').click();
    await page.locator('input[name="agreedToPrivacyPolicy"]').check();
    await page.locator('#formSubmit').click();
    // await page.waitForTimeout(2000);
    const resultContainer = await page.locator('#quotePageResult');
    await expect(resultContainer).toBeVisible();
    await expect(resultContainer.locator('b[name="username"]')).toHaveText(process.env.TEST_USERNAME!);
    await expect(resultContainer.locator('b[name="email"]')).toHaveText(process.env.TEST_EMAIL!);
    await expect(resultContainer.locator('b[name="password"]')).toHaveText('[entered]');
    await expect(resultContainer.locator('b[name="firstName"]')).toHaveText(process.env.TEST_FIRST_NAME!);
    await expect(resultContainer.locator('b[name="lastName"]')).toHaveText(process.env.TEST_LAST_NAME!);
    await expect(resultContainer.locator('b[name="name"]')).toHaveText(`${process.env.TEST_FIRST_NAME!} ${process.env.TEST_LAST_NAME!}`);
    await expect(resultContainer.locator('b[name="agreedToPrivacyPolicy"]')).toHaveText('true');
  });

  test('should fill out and verify required fields with page object', async ({ page }) => {
    const formPage = new QuoteForm(page);
    const resultPage = new QuoteResult(page);
    await formPage.navigate();
    await formPage.fillUsername(process.env.TEST_USERNAME!);
    await formPage.fillEmail(process.env.TEST_EMAIL!);
    await formPage.fillPassword(process.env.TEST_PASSWORD!);
    await formPage.fillName(process.env.TEST_FIRST_NAME!, process.env.TEST_LAST_NAME!);
    await formPage.checkPrivacyPolicy();
    await formPage.submit();
    await page.waitForTimeout(2000);
    expect(await resultPage.isVisible(), 'Result panel is not visible').toBeTruthy();
    expect(await resultPage.getUsernameText()).toEqual(process.env.TEST_USERNAME!);
    expect(await resultPage.getEmailText()).toEqual(process.env.TEST_EMAIL!);
    expect(await resultPage.getPasswordText()).toEqual('[entered]');
    expect(await resultPage.getFirstNameText()).toEqual(process.env.TEST_FIRST_NAME!);
    expect(await resultPage.getLastNameText()).toEqual(process.env.TEST_LAST_NAME!);
    expect(await resultPage.getNameText()).toEqual(`${process.env.TEST_FIRST_NAME!} ${process.env.TEST_LAST_NAME!}`);
    expect(await resultPage.isPrivacyPolicyAccepted(), 'Privacy Policy is not accepted').toBeTruthy();
  });
});
