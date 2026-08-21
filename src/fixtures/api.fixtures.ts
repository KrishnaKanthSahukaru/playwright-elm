import { test as baseTest } from '@playwright/test';
import { UserClient } from '../api/clients/UserClient';
import { Config } from '../config/env.config';

export type ApiFixtures = {
  userClient: UserClient;
};

export const apiTest = baseTest.extend<ApiFixtures>({
  userClient: async ({ playwright }, use) => {
    const request = await playwright.request.newContext({
      baseURL: Config.apiUrl,
      extraHTTPHeaders: Config.apiKey ? { 'x-api-key': Config.apiKey } : undefined,
    });
    const client = new UserClient(request);
    await use(client);
    await request.dispose();
  },
});

export { expect } from '@playwright/test';
export const test = apiTest;
