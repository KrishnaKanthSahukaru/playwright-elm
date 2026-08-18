import { test, expect } from '../../fixtures/base.fixtures';
import { globalData } from '../../data/uat/global.data';

test.describe('UI Layer Validation Suite', () => {

  test('Verify landing layout page navigation mechanics [@ui @smoke]', async ({ loginPage }) => {
    // 1. UI LAYER: Load target homepage using the Page Object model
    await loginPage.load();
    
    // 2. COMPONENT LAYER: Verify the shared Navbar logo component draws successfully
    await expect(loginPage.navbar.logo).toBeVisible({ timeout: 7000 });
  });

  test('Verify account login form validation workflows [@ui @regression]', async ({ loginPage }) => {
    await loginPage.load();
    
    // 3. TEST DATA LAYER: Extract inputs cleanly from your decoupled data module
    const userEmail = globalData.uiLoginUser.email;
    const userPassword = globalData.uiLoginUser.password;
    
    // 4. UI LAYER: Trigger login workflow interactions via Page operations
    await loginPage.executeLoginWorkflow(userEmail, userPassword);
  });
});
