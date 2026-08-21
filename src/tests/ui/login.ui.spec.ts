import { test, expect } from '../../fixtures/ui.fixtures';

test.describe('UI smoke suite', () => {

  test('loads the application landing page [@ui @smoke]', async ({ loginPage }) => {
    await loginPage.load();
    await expect(await loginPage.getTitle()).toMatch(/ReqRes/);
  });
});
