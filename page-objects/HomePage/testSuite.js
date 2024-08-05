const { chromium } = require('playwright');
const dotenv = require('dotenv');
import { HomePage } from './homePage.js';

dotenv.config();

export class TestSuite {
  constructor() {
    this.browser = null;
    this.page = null;
    this.homepage = null;
  }

  async initialize() {
    this.browser = await chromium.launch();
    this.page = await this.browser.newPage();
    this.homepage = new HomePage(this.page);
  }

  async navigateTo(envVariable) {
    const url = process.env[envVariable];
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.page.screenshot({screenshot: 'screenshot1.png'});
    console.log('Page Title:', await this.page.title());
    await this.page.pause();
  }

  async logearse(role) {
    await this.homepage.logIn(role);
    // await this.homepage.typeLogin();
    // await this.homepage.selectOpt()
    // await this.homepage.clickLogin();
    // await this.homepage.expectVisible()
  }

  async fillContrato(){

  }

  async confirmationBanner(){
    await this.homepage.expectVisible(this.homepage.emailes5);
  }

  async close() {
    await Promise.all([
      this.page.close(),
      this.browser.close(),
    ]);
  }
}