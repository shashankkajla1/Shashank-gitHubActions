const { test, expect } = require('@playwright/test');

test.describe('API - Auth and Chaining', () => {
  test('POST login (ReqRes) then GET users', async ({ request }) => {
    const login = await request.post('https://reqres.in/api/login', {
      data: { email: 'eve.holt@reqres.in', password: 'cityslicka' },
    });
    expect(login.ok()).toBeTruthy();
    const loginJson = await login.json();
    expect(loginJson.token).toBeTruthy();

    const users = await request.get('https://reqres.in/api/users?page=2');
    expect(users.ok()).toBeTruthy();
    const usersJson = await users.json();
    expect(Array.isArray(usersJson.data)).toBeTruthy();
  });
});
