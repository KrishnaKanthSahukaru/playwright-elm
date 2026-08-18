import { Page, Locator } from '@playwright/test';

export class Navbar {
  private readonly page: Page;
  public readonly logo: Locator;
  public readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Strict Mode Fix: Target the unique branding logo link element container specifically
    this.logo = this.page.locator('header a[href="/"], .logo-container img').first();
    this.logoutButton = this.page.locator('text=Log Out, text=Sign Out').first();
  }

  async performLogout(): Promise<void> {
    console.log('🧱 COMPONENT LAYER: Interacting with Navbar component');
    await this.logoutButton.waitFor({ state: 'visible' });
    await this.logoutButton.click();
  }
}
