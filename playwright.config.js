// @ts-check
const { devices } = require("@playwright/test");
const { trace } = require("console");

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
    browserName: "chromium",
    headless: true,
    screenshot : 'on', // will take ss for every step
    // trace : 'on' // detailed report of every automation steps, will generate on both pass and fail
    trace : 'retain-on-failure' // now it will generate only on test failure
  },
};

module.exports = config;
