const {test, expect } = require('@playwright/test');
import { TestSuite } from '../../page-objects/HomePage/testSuite.js';
import { TestSuiteSU } from '../../page-objects/SignUp/testSuiteSU.js';
import { users as userDetails } from '../../tests/testData/users.js'
import { PageManager } from '../../page-objects/pageManager.js';

test('has title @fast', async ({ page }) => {
  await page.goto(process.env.URL1);// podriamos colocar / y hace referencia a la baseURL de arhcivo playwright.config.js
  await expect(page).toHaveTitle(/Playwright/);
});

test('has titlees @tag1', async ({ page }) => {
  await page.goto(process.env.URL1);// podriamos colocar / y hace referencia a la baseURL de arhcivo playwright.config.js
  await expect(page).toHaveTitle(/Playwright/);
});

test('has title @interfaz', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
  console.log('PASS')
});

test('get started link @critical', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test.describe('navigation @servicioMX', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('https://playwright.dev/');
    await page.screenshot({path: './captures/' + new Date().toISOString().split('T')[0] + '-screenshot1.png'});
    // await page.screenshot({path: "./captures/" + new Date().toISOString().split('T')[0] + "-screenshot.jpg"});
    await expect(page).toHaveScreenshot();
  });

  test('se prueba enviando vacio', async ({ page }) => {
    tag: ['@faster', '@login'],
    // annotation: {NEW
    //   type: 'issue',
    //   description: 'https://github.com/microsoft/playwright/issues/23180',
    // },
    await expect(page).toHaveURL('https://playwright.dev/');
  });

  test('se prueba sin enviar @bueno', async ({ page }) => {
    await expect(page).toHaveURL('https://playwright.dev/');
  });

  test('se prueba sin enviar 1 @bueno', async ({ page }) => {
    await expect(page).toHaveURL('https://playwright.dev/');
  });
});

test.skip('Login', async () => {
  const pm = new PageManager();
  const testSuite = new TestSuite();

  try {
    await pm.testSuites().initialize();
    await testSuite.initialize();
    await testSuite.navigateTo('URL1');
    await testSuite.logearse(userDetails.teacher);
  } catch (error) {
    console.error('Error during test execution:', error);
    throw error;
  } finally {
    await testSuite.close();
  }
});

test.skip('Sign Up', async () => {
  const testSuiteSU = new TestSuiteSU();

  try {
    await testSuiteSU.initialize();
    await testSuiteSU.visit();
    await testSuiteSU.fillDetails(userDetails);
    await testSuiteSU.clickInButton();
  } catch (error) {
    console.error('Algo fallo', error);
    throw error;
  } finally {
    await testSuiteSU.close();
  }
});

test.describe('navigation',{tag: "@sanitys"}, () => {

  test('se prueba enviando vacio', async ({ page }) => {
    tag: ['@faster', '@login'],
    // annotation: {NEW
    //   type: 'issue',
    //   description: 'https://github.com/microsoft/playwright/issues/23180',
    // },
    await expect(page).toHaveURL('https://playwright.dev/');
  });
});