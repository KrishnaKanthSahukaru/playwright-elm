import { Page, Locator } from '@playwright/test';

export class BasePage {
  // Granting child page classes access to the Playwright page engine
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Wrapper for navigating to URLs safely
  protected async navigateTo(path: string): Promise<void> {
    console.log(`UI LAYER: Navigating to destination path -> [${path}]`);
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  //wrapper for clicking elements with automatic wait states
  protected async clickElement(locator: Locator, elementName: string): Promise<void> {
    console.log(`UI LAYER: Clicking element -> [${elementName}]`);
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  //wrapper for entering text safely into form fields
  protected async fillField(locator: Locator, value: string, fieldName: string): Promise<void> {
    console.log(`UI LAYER: Typing values into -> [${fieldName}]`);
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(value);
  }
}
