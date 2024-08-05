// AQUI LLAMAR TODOS LOS METODOS  de homePage y pasarle al test este archivo unicamente
// ESTE ARCHIVO SIRVE SI TENEMOS UN TEST LO BASTANTE GRANDE QUE ABARQUE MUCHAS PAGES
import { HomePage } from './HomePage/homePage.js';
import { TestSuite } from './HomePage/testSuite.js';

export class PageManager { 
    constructor(page) {
      this.page = page
      this.homePage = new HomePage(this.page)
      this.testSuite = new TestSuite()
    }

    homePages(){
        return this.homePage;
    }

    testSuites(){
        return this.testSuite;
    }
}