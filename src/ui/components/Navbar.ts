import { Page, Locator } from '@playwright/test';

export class Navbar {
  private readonly page: Page;
  public readonly logo: Locator;
  public readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Highly resilient selectors targeting the corporate branding layout structures
    this.logo = this.page.locator('.logo, .brand, img[src*="logo"], svg, #header');
    this.logoutButton = this.page.locator('text=Cancel, text=Log Out, #cancelBtn');
  }

  async performLogout(): Promise<void> {
    console.log('COMPONENT LAYER: Interacting with Navbar component');
    await this.logoutButton.first().waitFor({ state: 'visible' });
    await this.logoutButton.first().click();
  }
}
