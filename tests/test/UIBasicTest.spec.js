const {test, expect } = require('@playwright/test');
const exp = require('constants');

test.describe('First Playwright test', () => { //Grupo de test de una funcionalidad
    test('one', async ({ page }) => {
        test.info().annotations.push({
            type: "Issue",
            description:
                "COMANDO Ctrl + Shift + P  Install Playwright  Browsers" +
                "npx playwright codegen --> For generator code in Js"
        });
        const province = 'Misiones';
        const element = await page.locator('div.col-sm-offset-1.col-sm-10.title.form-group:has-text("Elegí cuánto querés pagar por tu seguro de vida")');
        // Verificar si el elemento está visible en la página
        await expect(element).toBeVisible();
        // Verificar si el elemento contiene cierto texto
        await expect(element).toContainText('Elegí cuánto querés pagar por tu seguro de vida');
        // Verificar si el elemento tiene un texto específico
        await expect(element).toHaveText('Elegí cuánto querés pagar por tu seguro de vida');
        // Verificar si el elemento contiene cierta cadena
        const elementText = await element.innerText();
        await expect(elementText).toContain('Elegí cuánto querés pagar por tu seguro de vida');
        //expect(locator).toValue('11');
        await expect(page).toHaveURL('https://purchase-testing.klimber.com/ar/GroupLife/Index');
        await expect(page).toHaveTitle('Cotizá - Klimber - Seguro de Vida Online');

        await page.selectOption('#province', province);
        await page.waitForSelector('#chkIllness');
        await page.check('#chkIllness');
        await expect(page.locator('div[class="col-xs-12 col-sm-4 col-sm-offset-4 login-box"]')).toHaveScreenshot();
        await page.uncheck('#chkIllness');
        await page.click('#chkAccident');
        await page.waitForSelector('#BirthdayStep1');
        await page.fill('#BirthdayStep1', '17/12/1999');// Una manera de encontrar y completar

        const cumplelement = page.locator('#BirthdayStep1');
        const cumple = await cumplelement.inputValue();
        await expect(cumple).toBe('17/12/1999'); // Methodo para verificar

        await page.press('#BirthdayStep1','Tab');
        await page.fill('#txtPhoneCode', '11');
        await page.fill('#txtPhoneNumber', '56231943');
        await page.press('#txtPhoneNumber','Enter');

        const sumaAsegurada = await page.evaluate(() => {
            const sumaElement = document.getElementById('suma_aseguradatotal');
            if (sumaElement) {
              return sumaElement.textContent.trim();
            }
            return null; // Manejo del caso si el elemento no se encuentra
          });
          console.log('La suma asegurada es:', sumaAsegurada);

        await page.getByRole('button', {name: 'Contratar por $47 por mes'}).click();
    });

    test('two', async ({ page }) => {
        test.info().annotations.push({
            type: "Issue",
            description:
            "Para liberar el puerto 9323 en Windows:\n\n" +
            "1. Ejecuta 'netstat -ano | findstr :9323' para identificar el PID del proceso.\n" +
            "2. Usa 'taskkill /PID PID_DEL_PROCESO /F' para finalizar el proceso asociado al puerto 9323."
    });
        const happy = await page.locator('input[name="Birthday"]').fill('17/12/1999');// Otra manera de encontrar y completar
        await expect(happy).inputValue().resolves.toBe('17/12/1999');
    });
});

// test.describe('Second Playwright Test', () => {
//     test(async ({ page }) => {
//         test.info().annotations.push({
//             type: "Issue",
//             description: [
//                 "Comands lines :",
//                 "npx playwright test UIBasicTest.spec.js --headed ---> observar execution",
//                 "npx playwright test UIBasicTest.spec.js --project=firefox --> Open only one browser",
//                 "npx playwright show-report --> Show report test",
//                 "npx playwright test UIBasicTest.spec.js --debug --> Open depure code",
//                 "LINK DE INCIDENCIA <some-issue>"
//             ].join("\n")
//         });
//         const birthday = page.locator('#BirthdayStep1');
//         const fieldBirthday = await birthday.inputValue();
//         await expect(birthday).toBeEmpty(); // Otro para verificar
//         expect(fieldBirthday).toBe(''); // Methodo para verificar

//         await birthday.fill('12/12/1999');// Otra manera de completar
//         await birthday.press('Tab');
        
//         const newBirthday = await birthday.inputValue();
//         expect(newBirthday).toBe('12/12/1999'); 
//         await page.getByPlaceholder('11').fill('11');
//         homePage.nuevoLocator.click();
//         await page.waitForLoadState('domcontentloaded'); // También puedes usar 'load' o 'networkidle' para espera 'domcontentloaded' cague completamente
//         await expect.soft(page.locator('')).toHaveText('Sumá tranquilidad hasta en tiempos de incertidumbre');
//     });
// });