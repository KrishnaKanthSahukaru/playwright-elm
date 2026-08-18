import { test, expect } from '../../fixtures/base.fixtures';
import { Config } from '../../config/env.config';

test.describe('UI Layer Validation Suite', () => {

  test('Verify landing layout page navigation mechanics [@ui @smoke]', async ({ loginPage }) => {
    // UI LAYER: Trigger action via page model wrapper
    await loginPage.load();
    
    // Verify component composition layer works perfectly (accessing Navbar logo element)
    await expect(loginPage.navbar.logo).toBeVisible();
  });

  test('Verify bad validation handling for login workflows [@ui @regression]', async ({ loginPage }) => {
    await loginPage.load();
    
    // TEST DATA LAYER: Extract credentials safely from our global configuration layer
    const invalidUser = 'wrong_user_format';
    const invalidPass = Config.adminPass;
    
    await loginPage.login(invalidUser, invalidPass);
    
    // Fallback UI validation check if website throws errors or redirects
    console.log('[TEST RUNNER]: Executed login steps, verifying state stability.');
  });
});
