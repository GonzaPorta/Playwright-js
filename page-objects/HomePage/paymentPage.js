const { expect } = require('@playwright/test');
export class PaymentPage {
    constructor(page) {
        this.page = page

        this.discountCode = page.getByRole('button', {name: 'nameButton'});
        this.discountInput = page.getByPlaceholder('Discount code');
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]')
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()//Save the text

        await this.discountInput.waitFor()
        await this.discountInput.fill(code)//Complete with text
        await expect(this.discountInput).toHaveValue(code)
        // await this.discountInput.focus()
        // await this.page.keyboard.type(code, {delay: 1000})
        // expect(await this.discountInput.inputValue()).toBe(code)

        expect(await this.discountedValue.isVisible()).toBe(false)
        expect(await this.discountActiveMessage.isVisible()).toBe(false)
        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()
        await this.discountActiveMessage.waitFor()
        await this.discountedValue.waitFor()

        const discountValueText = await this.discountedValue.innerText() // "345$"
        const discountValueOnlyStringNumber = discountValueText.replace("$", "")
        const discountValueNumber = parseInt(discountValueOnlyStringNumber, 10)

        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText() // "345$"
        const totalValueOnlyStringNumber = totalValueText.replace("$", "")
        const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10)
        expect(discountValueNumber).toBeLessThan(totalValueNumber)
    }

    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, { timeout: 3000 })
    }
}