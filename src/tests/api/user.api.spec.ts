import { test, expect } from '../../fixtures/api.fixtures';
import { globalData } from '../../data/uat/global.data';

test.describe('User API contract suite', () => {
  
  test('creates a user through the API [@api @smoke]', async ({ userClient }) => {
    const payload = globalData.newUser;
    const response = await userClient.createUserAccount(payload);

    expect(response.id).toBeTruthy();
    expect(response.name).toBe(payload.name);
    expect(response.job).toBe(payload.job);
    expect(Date.parse(response.createdAt)).not.toBeNaN();
  });

  test('returns a paginated user list [@api @regression]', async ({ userClient }) => {
    const response = await userClient.getUsersList(2);

    expect(response.page).toBe(2);
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.total_pages).toBeGreaterThanOrEqual(response.page);
  });
});
