import { SignUp } from "./signUp.js";
import { users as role } from "../../tests/testData/users.js";
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
import { ProviderOfQuery } from "../../src/db/helpers-query/proveedor-querys.js";
import { datos } from "../../src/jsondata/"

export class TestSuiteSU {
  constructor() {
    this.browser = null;
    this.page = null;
    this.signup = null;
    this.providerQuery = new ProviderOfQuery();
  }

  async initialize() {
    this.browser = await chromium.launch();
    this.page = await this.browser.newPage();
    this.signup = new SignUp(this.page);
  }

  visit = async () => {
    await this.page.goto("https://playwright.dev/docs/api/class-playwright")
  }

  fillDetails = async (userDetails) => {
    await this.signup.userInput.waitFor()
    await this.signup.userInput.fill(role[userDetails].user)
    await this.signup.passwordInput.waitFor()
    await this.signup.passwordInput.fill(role[userDetails].password)

    const query = await this.providerQuery.obtenerNumeroDeTracking()
    await this.signup.passwordInput.fill(query)
    await this.signup.countryDropdown.waitForSelector()
    await this.signup.countryDropdown.selectOption(userDetails.country)
  }

  async clickInButton() {
    await this.signup.clickButton()

    const currentURL = this.page.url()
    expect(currentURL).toContain('#properties')
  }

  async close() {
    await Promise.all([
      this.page.close(),
      this.browser.close(),
    ]);
  }

  // UNA OPCION
  // async obtenerQuery() {
  //   const query = await this.providerQuery.obtenerNumeroDeTracking()
  // }

}