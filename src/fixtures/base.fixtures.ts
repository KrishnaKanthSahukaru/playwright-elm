import { mergeTests } from '@playwright/test';
import { apiTest } from './api.fixtures';
import { uiTest } from './ui.fixtures';

// Merge both UI and API capabilities together into a single master runner
export const test = mergeTests(apiTest, uiTest);

// Re-export the standard 'expect' engine from Playwright for ease of access
export { expect } from '@playwright/test';
