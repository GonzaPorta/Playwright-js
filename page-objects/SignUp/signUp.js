export class SignUp {
  // properties = null;
  // userInput = null;
  constructor(page) {
    this.page = page

    this.properties = page.getByRole('link', { name: 'Properties', exact: true })
    this.countryDropdown = page.getByRole('textbox', {name: 'Countries'})
    this.formEmail = {
      email : page.getByRole('textbox', {name: 'Iniciar sesión'}),
      password : page.getByRole('textbox', {name: 'Contraseña'})
    }
  }

  async llenarFormulario(email, password) {
    await this.page.fill(this.formEmail.email, email);
    await this.page.fill(this.formEmail.password, password);
  }

  clickButton = async () => {
    await Promise.all([
      this.properties.waitForSelector(),
      this.properties.click(),
      this.page.waitForLoadState('networkidle'),
      //this.page.waitForResponse('http://ejfnefn.com.ar'), RECOMMENDED
    ]);
  }

  async typeLogin(usuario, contraseña) {
    await this.llenarFormulario(usuario, contraseña);
  }
}