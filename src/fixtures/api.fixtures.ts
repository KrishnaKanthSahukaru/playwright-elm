import { test as baseTest } from '@playwright/test';
import { UserClient } from '../api/clients/UserClient';

export type ApiFixtures = {
  userClient: UserClient;
};

export const apiTest = baseTest.extend<ApiFixtures>({
  userClient: async ({ page }, use) => {
    // Injecting the page-context request engine automatically handles corporate proxies
    const client = new UserClient(page.request);
    
    // Pass the client cleanly to the test architecture blocks
    await use(client);
  },
});
