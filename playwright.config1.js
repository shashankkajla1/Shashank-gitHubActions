// @ts-check
const { devices } = require("@playwright/test");
const { trace } = require("console");
const { permission } = require("process");

const config = {
  testDir: "./tests",
  /* Maximum time one test can run for */
  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },
  reporter: "html",
  /* shared settings for all tests and project below */
  use: {
    headless: false,
    ignoreHttpErrors: true, // to ignore https errors on webkit browser
    permissions: ['geolocation'] // to give permissions for geolocation in webkit browser
  },
  // Here, project will run on both chromium and webkit browsers, for all test if won't give any project
  projects: [
    {
      name: "chromium Execution",
      use: {
        browserName: "chromium",
        //headless: false, - pick from shared settings
        screenshot: "on", 
        trace: "retain-on-failure",
        visualViewport: { width: 720, height: 720 },
      },
    },
    {
      name: "webkit Execution",
      use: {
        browserName: "webkit",
        //headless: false, - pick from shared settings
        screenshot: "on",
        trace: "on",
        ...devices['iPhone 13 Pro'],
        video: 'retain-on-failure' // to record video on test failure
      },
    },
  ],
};

module.exports = config;
