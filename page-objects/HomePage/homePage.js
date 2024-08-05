 import { users as role } from '../../tests/testData/users.js'
 const { expect } = require('@playwright/test');

 export class HomePage { 
  constructor(page) {
    this.page = page

    this.userInput = page.getByRole('textbox', {name: 'Usuario o correo electronico'}); //ASI SIN EL AWAIT ??// para que caso se utiliza el nth ? ".nth(1)"seleccion de elementos o una lista ?
    this.loginButton = page.getByRole('button', {name: 'Iniciar sesión'});
    this.passwordInput = page.getByRole('textbox', {name: 'Contraseña'});
    this.passwordInput = page.getByRole('textbox', {name: 'Contraseña'});
    this.emailes0 = page.getByLabel('Email');
    this.emailes1 = page.getByPlaceholder('Email').first();
    //Parent elements in recommended order:
    this.emailes2 = page.locator('nb-card', {hasText: "UsingThe Grid"}).getByRole('textbox', {name: 'Email'});
    this.emailes2.getByRole('textbox', {name: 'Email'}).fill('gg@hotmail.com.ar');
    this.emailes2.getByRole('radio', {name: optionText}).check({force: true});
    this.emailes3 = page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: 'Email'});

    this.emailes4 = page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', {name: 'Email'});
    this.emailes5 = page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: 'Email'});
  }

  typeLogin = async (usuario) => {
    try {
      await expect(this.userInput).toHaveText('Usuario o correo electronico')
      await Promise.all([
        this.userInput.type(role[usuario].user),
        this.passwordInput.type(role[usuario].password),
      ]);
      await expect(this.userInput).toHaveText(role[usuario.user]);
    } catch (error) {
      console.error('Error during login:', error.message);
      throw error;
    }
  }

  // typeLogin = async (role) => {
  //   try {
  //     await Promise.all([
  //       this.userInput.type(role.director),
  //       this.passwordInput.type(role.country),
  //     ]);
  //   } catch (error) {
  //     console.error('Error during login:', error.message);
  //     throw error; // Vuelve a lanzar el error para que el test falle si es necesario
  //   }
  // }

  clickLogin = async () => {
    await Promise.all([
      this.loginButton.click(),
      this.page.waitForLoadState('networkidle'),
    ]);
  }

  //Futuramente eliminarlo o no podria llamarse en el testSuite a cada metodo de typeLogin and clickLogin
  logIn = async (usuario) => {
    await Promise.all([
      this.typeLogin(usuario),
      this.clickLogin(),
    ]);
    const resultadoAdicional = await Promise.resolve('Operaciones adicionales realizadas');
    console.log(resultadoAdicional);
  }

  async selectOpt() {
    try {
      await this.page.waitForSelector(this.emailes3);
      // Selecciona la opción con el valor especificado
      await this.emailes3.check();
      
      console.log(`Casilla de verificación marcada en '${this.emailes3}'`);
    } catch (error) {
      console.error(`Error al marcar la casilla de verificación en '${this.emailes3}': ${error}`);
    }
  }

  async expectVisible(selector) {
    const element = await this.page.waitForSelector(selector);
    await expect(element).toBeVisible();
  }

  async metodoParametrizable(email, password, optionText){
    const usingTheGridForm = await page.locator('nb-card', { hasText: "UsingThe Grid"});
    await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email)
    await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password)
    await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
    await usingTheGridForm.getByRole('button').click()
    if(rememberMe)
      await usingTheGridForm.getByRole('checkbox').check({force: true})
    await usingTheGridForm.getByRole('button').click()
  }
}