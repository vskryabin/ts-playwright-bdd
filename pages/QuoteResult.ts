console.log('Loading QuoteResult.ts...');
import { Locator, Page } from '@playwright/test';

export default class QuoteResult {
  private resultContainer: Locator;
  private usernameField: Locator;
  private emailField: Locator;
  private passwordField: Locator;
  private nameField: Locator;
  private firstNameField: Locator;
  private lastNameField: Locator;
  private privacyPolicyField: Locator;

  constructor(private page: Page) {
    this.resultContainer = page.locator('#quotePageResult');
    this.usernameField = page.locator('b[name="username"]');
    this.emailField = page.locator('b[name="email"]');
    this.passwordField = page.locator('b[name="password"]');
    this.nameField = page.locator('b[name="name"]');
    this.firstNameField = page.locator('b[name="firstName"]');
    this.lastNameField = page.locator('b[name="lastName"]');
    this.privacyPolicyField = page.locator('b[name="agreedToPrivacyPolicy"]');
  }
  
  async isVisible(): Promise<boolean> {
    return await this.resultContainer.isVisible();
  }
  async getResultContainerText(): Promise<string> {
    return await this.resultContainer.innerText();
  }
  async getUsernameText(): Promise<string> {
    return await this.usernameField.innerText();
  }
  async getEmailText(): Promise<string> {
    return await this.emailField.innerText();
  }
  async getPasswordText(): Promise<string> {
    return await this.passwordField.innerText();
  }
  async getNameText(): Promise<string> {
    return await this.nameField.innerText();
  }
  async getFirstNameText(): Promise<string> {
    return await this.firstNameField.innerText();
  }
  async getLastNameText(): Promise<string> {
    return await this.lastNameField.innerText();
  }
  async isPrivacyPolicyAccepted(): Promise<boolean> {
    const text = await this.privacyPolicyField.innerText();
    return text.toLowerCase() === 'true';
  }
}