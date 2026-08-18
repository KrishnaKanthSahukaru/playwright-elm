import { test, expect } from '../../fixtures/base.fixtures';
import { globalData } from '../../data/uat/global.data';

test.describe('API Layer Architecture Suite', () => {
  
  test('Verify user creation through backend endpoint [@api @smoke]', async ({ userClient }) => {
    // Pull input payload structure straight out of the Test Data Layer
    const payload = globalData.newUser;

    // Trigger transaction via the clean architectural API Layer client block
    const response = await userClient.createUserAccount(payload);
    
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    
    console.log(`🚀 [TEST RUNNER]: Profile creation verified. Account ID: ${responseBody.id}`);
    expect(responseBody.name).toBe(payload.name);
    expect(responseBody.job).toBe(payload.job);
  });

  test('Verify user list pagination retrieval [@api @regression]', async ({ userClient }) => {
    const response = await userClient.getUsersList(2);
    
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.page).toBe(2);
    expect(responseBody.data.length).toBeGreaterThan(0);
  });
});
