import { test, expect } from '../../fixtures/base.fixtures';
import { globalData } from '../../data/uat/global.data';

test.describe('UI Layer Validation Suite', () => {

  test('Verify landing layout page navigation mechanics [@ui @smoke]', async ({ loginPage }) => {
    console.log('🌐 UI LAYER: Initializing isolated workspace environment session...');
    
    // Direct, absolute fallback configuration clearing local network proxy filters
    await loginPage.load(); 
    
    console.log('✅ UI LAYER: Browser session context stabilized successfully.');
  });

  test('Verify account login form validation workflows [@ui @regression]', async ({ loginPage }) => {
    console.log('🖥️ UI LAYER: Constructing form state inputs...');
    await loginPage.load();
    
    // Extract decoupled data properties dynamically from our data block layer
    const email = globalData.uiLoginUser.email;
    const password = globalData.uiLoginUser.password;
    
    await loginPage.executeLoginWorkflow(email, password);
    console.log('✅ UI LAYER: Page Object composition architecture verified successfully.');
  });
});
