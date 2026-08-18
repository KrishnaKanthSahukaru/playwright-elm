import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Navbar } from '../components/Navbar';

export class LoginPage extends BasePage {
  // Layer Composition: Nesting the component layer within the page layout
  public readonly navbar: Navbar;
  
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly statusMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = new Navbar(page);

    // CSS locators mapped directly from the live reqres.in landing sandbox
    this.emailInput = this.page.locator('#toEmail, input[type="email"], #email').first();
    this.passwordInput = this.page.locator('#toPassword, input[type="password"], #password').first();
    this.submitButton = this.page.locator('button:has-text("Login"), .btn-login, button[type="submit"]').first();
    this.statusMessage = this.page.locator('.response-code, .status-text').first();
  }

  async load(): Promise<void> {
    // Dynamically navigate using the global base URL profile configuration rule
    await this.navigateTo('/');
  }

  async executeLoginWorkflow(email: string, pass: string): Promise<void> {
    // Leverages our enterprise BasePage wrappers for robust wait states
    await this.fillField(this.emailInput, email, 'Email Address Input Form');
    await this.fillField(this.passwordInput, pass, 'Password Entry Input Form');
    await this.clickElement(this.submitButton, 'Login Submission Action Trigger');
  }
}
