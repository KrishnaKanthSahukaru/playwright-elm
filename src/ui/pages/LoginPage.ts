import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Navbar } from '../components/Navbar';

export class LoginPage extends BasePage {
  // Composition: Injecting the component into the page layout
  public readonly navbar: Navbar;
  
  // Define locators for page inputs
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    // Pass the browser page engine up to the parent BasePage
    super(page);
    this.navbar = new Navbar(page);

    // Identify targets using clean, standard locators
    this.usernameInput = this.page.locator('#username, #userId, input[name="username"]');
    this.passwordInput = this.page.locator('#password, input[name="password"]');
    this.submitButton = this.page.locator('button[type="submit"], #loginBtn');
    this.errorMessage = this.page.locator('.error-message, .alert-danger');
  }

  // Page specific user workflows
  async load(): Promise<void> {
    await this.navigateTo('/');
  }

  async login(user: string, pass: string): Promise<void> {
    await this.fillField(this.usernameInput, user, 'Username Field');
    await this.fillField(this.passwordInput, pass, 'Password Field');
    await this.clickElement(this.submitButton, 'Submit Login Button');
  }

  async getErrorMessageText(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return this.errorMessage.innerText();
  }
}