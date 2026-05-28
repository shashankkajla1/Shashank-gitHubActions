const { test, expect } = require('@playwright/test');

test.describe('API - Basic', () => {
  test('GET JSONPlaceholder post', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('userId');
    expect(body).toHaveProperty('title');
  });
});
