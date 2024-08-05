import { defineConfig, devices } from '@playwright/test';

require('dotenv').config();

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',
  //timeout: 10000,

  // Run all tests in parallel.
  fullyParallel: true,
  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,
  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,
  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,
  // Reporter to use
  // reporter: [
  //   'html',
  //   ['allure-playwright',{
  //     outputFolder: 'allure-results'
  //   }]
  // ],
  reporter: [
    ['allure-playwright',{outputFolder: 'allure-results'}],
    ['html'],
  ],
  use: {
    trace: 'on',
    baseURL: 'http://127.0.0.1:3000',
    headless: true,
    video: 'on',//{mode: 'on', size: {width: 1920, height: 1080}}
    // extraHTTPHeaders: {
    //   'Accept': '',
    //   'Authorization': `token ${process.env.API_TOKEN}`,
    // },
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'dev',
    //   use: {
    //      ...devices['Desktop Chrome'],
    //     baseURL: 'http:wdwfknknw' },
    // },
    // {
    //   name: 'prod',
    //   use: {
    //      ...devices['Desktop Chrome'],
    //     baseURL: 'http:wdwfknknw' },
    // },
    // {
    //   name: 'Mobile dev',
    //   use: {
    //      ...devices['Pixel 5'],
    //       baseURL: 'https......'},
    // },
    
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 11 Pro']},
    // }
  ],
});