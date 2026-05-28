# 1. Creating Test in Playwright ::

- const { test } = require('@playwright/test');
use '@' it wil provide all suggestion available. 

test -> takes two args : 1.) test case name & 2.) other is function
This is completed as 1 Test case in test.

** As we know js is async it wont execute code by line to line, so explicitly telling js wait once first step completes than the second step would be executed, either flaky test there if you dont write await and async.

# 2. Fixers : are nothing but a global variables a set which is available globally to use fixer 
test('First Test' async ({Browser}){ // used curly braces as its recorgnize by test

// chrome - plugins/ cookies
    const context = await browser.newContext(); 
    Here, can pass cookies, ip address etc in options in newContext

    const page = await context.newPage();
    Here, pass the url in new page, fresh page opened without any cookies or proxies.

    await page.gotTo("Pass URl");
});

** The browser fixer holding all the capabilities by default which is coming from the playwright.conf.js.

# 3. Playwright says if you don't want to use any thing inside browser.newContext(); tahn you dont need to use above code use page its a fixer and opent the url directly.

- test('Demo', async ({browser, page})=>{ // here not injecting anything cookies or oroxy etc.
    //const context = await browser.newContext(); 
    //const page = await context.newPage();
    await page.gotTo("Pass URl");
});

** Playwright will implicitly write above two steps if you are working in default mode don't need to write it explicitly if you are not injecting anything inside ->  browser.newContext(); function.

# 4. Understanding basics of playwright.config.js

- To run Tests playwright.config.js will trigger all tests here we have "defineConfig" Object available, here its seems testDir: that where the tests are located.

- use: In use property whatever you declared here, your test case will read all property i.e. browser execute, ss, logs etc, finally exporting the defineConfing object.

    ** browserName : 'webkit' : To test in safari you can run safari test on windows.

- By Default playwright will run test in headless mode you have to tell playwright that can see tests explicitly.    

# 5. To run tests:

- npx is will automatically find the path in node_modules have package called playwright implicitly if you give npx
:: npx playwright test 
- npx playwright test --headed now you will see browser
- npx playwright show-report to show report
- npx playwright test tests/ClientApp.specs.js // To run only that test file, only run single file all tests.
- npx playwright test --headed --debug

(playwright will execte the test runner file i.e playwright.conf.js
and this file will execute the test what you asked to run in this config obj under this test 
directory path. ) it wll run sequentially.

** Test present i the same file will run sequentially, but if you have many test files than those 
test file will run parallely.

** No need to write anything to close browser once test done browser will closed automatically.

- lets say you want to run a single test from multiple test use ::
test.only('Demo', async ()=>{}); to run that onlt test this test will provide multiple attributes.
It will trigger only that test and will skip all the remaining.

# 6. Assertions ::

- Assertions come by default in playwright not in chai mocha wdio etc everything come in playwright.
- Check assertions in playwright document make it handy
- timeout: 30 * 1000, ** 30 sec is a global timeout
- expect: {
    timeout: 5000,
  }, ** is a chai assertion timeout till tahat if ele not avaialble it through exeception after 5 sec for all assertion














>>>> Default Config Changing ::

// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Maximum timeout */
  timeout: 30 * 1000,
  expect:{
  timeout: 5000
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    browserName : 'chromium'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});


## To Connect azure account : 

user id Object : d6e69367-913f-4d6f-93c2-c4fc6766ca6d
storage account : pwstrgskajlae696
resource group : SKajla

az role assignment create \
--assignee "d6e69367-913f-4d6f-93c2-c4fc6766ca6d" \
--role "Storage Blob Data Contributor" \
--scope "$(az storage account show --name pwstrgskajlae696 --resource-group SKajla --query id -o tsv)"



 










