This folder contains progressive API tests using Playwright's `request` fixture.

Progression:
- `01-basic-api.spec.js`: simple `GET` request to JSONPlaceholder (learning requests and assertions).
- `02-auth-and-chaining.spec.js`: `POST` login to ReqRes followed by a `GET` (auth flow and chaining).
- `03-advanced-chaining.spec.js`: create, update, delete flow on ReqRes (multi-step scenarios).

Run commands (from `PlaywrightProj`):

```bash
npm run api
# or headed
npm run api:headed
```

Notes:
- Tests use public demo APIs (no credentials required) and are safe for learning.
- To expand: add negative tests, schema validation, parametrized data, and use fixtures for shared auth tokens.
