import { test, expect } from '@playwright/test';

test.describe('API Architecture Isolation Check', () => {
  
  test('Verify backend user creation payload execution', async ({ request }) => {
    // Explicit, un-cached absolute routing path string targeting the API sandbox
    const response = await request.post('https://reqres.in', {
      data: {
        name: "John Doe",
        job: "Automation Architect Engineer"
      }
    });
    
    expect(response.status()).toBe(201);
    const body = await response.json();
    console.log(`SUCCESS: Created profile ID -> ${body.id}`);
    expect(body.name).toBe("John Doe");
  });
});
