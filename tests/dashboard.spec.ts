// tests/dashboard.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Dashboard Component Validations', () => {

    test('Should verify catalog items are visible post-login', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // Reuse our existing Page Object Model
        await loginPage.loginToApplication('standard_user', 'secret_sauce');

        // Validate the product inventory container exists
        const inventoryContainer = page.locator('.inventory_container');
        await expect(inventoryContainer).toBeVisible();
    });
});
