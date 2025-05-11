console.log('Loading QuoteForm.ts...');
import { Locator, Page } from '@playwright/test';

export default class QuoteForm {
  private usernameInput: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private confirmPasswordInput: Locator;
  private nameInput: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private saveButton: Locator;
  private privacyPolicyCheckbox: Locator;
  private submitButton: Locator;

  constructor(private page: Page) {
    this.usernameInput = page.locator('input[name="username"]');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('#password');
    this.confirmPasswordInput = page.locator('#confirmPassword');
    this.nameInput = page.locator('input[name="name"]');
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.saveButton = page.locator('text=Save');
    this.privacyPolicyCheckbox = page.locator('input[name="agreedToPrivacyPolicy"]');
    this.submitButton = page.locator('#formSubmit');
  }

  async navigate(): Promise<void> {
    await this.page.goto(process.env.QUOTE_BASE_URL!);
  }

  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    await this.passwordInput.press('Tab');
    await this.confirmPasswordInput.fill(password);
  }

  async fillName(firstName: string, lastName: string): Promise<void> {
    await this.nameInput.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
  }

  async checkPrivacyPolicy(): Promise<void> {
    await this.privacyPolicyCheckbox.check();
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}