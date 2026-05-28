const { test, expect } = require('@playwright/test');

test.describe('API - Advanced chaining', () => {
  test('Create -> Update -> Delete user (ReqRes)', async ({ request }) => {
    const create = await request.post('https://reqres.in/api/users', {
      data: { name: 'morpheus', job: 'leader' },
    });
    expect(create.status()).toBe(201);
    const created = await create.json();
    expect(created).toHaveProperty('id');
    const id = created.id;

    const update = await request.put(`https://reqres.in/api/users/${id}`, {
      data: { name: 'neo', job: 'the one' },
    });
    expect(update.ok()).toBeTruthy();

    const del = await request.delete(`https://reqres.in/api/users/${id}`);
    expect([200, 204]).toContain(del.status());
  });
});
