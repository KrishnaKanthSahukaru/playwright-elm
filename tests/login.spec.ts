// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentication Tests', () => {

    test('Should successfully login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // Execute action from POM
        await loginPage.loginToApplication('standard_user', 'secret_sauce');

        // Validate the assertion
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
});
