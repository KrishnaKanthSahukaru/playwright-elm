import { test, expect } from '@playwright/test';
import { Config } from '../config/env.config';

test('Verify Configuration Guard and Target Environment resolution', async ({ page }) => {
  console.log(`Target URL verified as: ${Config.baseUrl}`);
  console.log(`Admin Username resolved as: ${Config.adminUser}`);
  
  await page.goto('/');
  await expect(page).toHaveURL(new RegExp(Config.baseUrl));
});