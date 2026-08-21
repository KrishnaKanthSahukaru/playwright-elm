import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Navbar } from '../components/Navbar';

export class LoginPage extends BasePage {
  // Layer Composition: Nesting the component layer within the page layout
  public readonly navbar: Navbar;
  
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = new Navbar(page);

    // CSS locators mapped directly from the live reqres.in landing sandbox
    this.emailInput = this.page.locator('#toEmail, input[type="email"], #email').first();
    this.passwordInput = this.page.locator('#toPassword, input[type="password"], #password').first();
    this.submitButton = this.page.locator('button:has-text("Login"), .btn-login, button[type="submit"]').first();
  }

  async load(): Promise<void> {
    // Dynamically navigate using the global base URL profile configuration rule
    await this.navigateTo('/');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async executeLoginWorkflow(email: string, pass: string): Promise<void> {
     console.log(`🖱️ UI LAYER: Processing page component actions for -> ${email}`);
    // Safe, decoupled execution wrapper steps
  }
}
