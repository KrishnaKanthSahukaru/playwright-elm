import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../ui/pages/LoginPage';

// Define types for our UI fixtures
export type UiFixtures = {
  loginPage: LoginPage;
};

// Create an isolated sub-fixture definition for Pages and Components
export const uiTest = baseTest.extend<UiFixtures>({
  loginPage: async ({ page }, use) => {
    // Instantiate the page object model and link it to the current browser page
    const loginPage = new LoginPage(page);
    // Inject the page object into the test
    await use(loginPage);
  },
});
