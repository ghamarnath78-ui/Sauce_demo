// Playwright_practice/Pages/cartPage.ts
import { Page } from "@playwright/test";
import { cartPageLocators } from "../Locators/cartPageLocators";

const normalizeText = (value: string | null | undefined) => {
    return value?.replace(/\s+/g, ' ').trim() ?? '';
};

export class cartPage {
    constructor(private page: Page) { }

    async clickOnContinueShopping() {
        await this.page.locator(cartPageLocators.continueshopping).click();
    }

    async getCartPageElement() {
        return {
            cartTitle: this.page.locator(cartPageLocators.cartTitle),
            shoppingCart: this.page.locator(cartPageLocators.continueshopping),
            checkOut: this.page.locator(cartPageLocators.checkoutbutton)
        };
    }

    async getCartProducts() {
        const allNames = await this.page.locator(cartPageLocators.productnames).allTextContents();
        const allDescription = await this.page.locator(cartPageLocators.productDescription).allTextContents();
        const allPrice = await this.page.locator(cartPageLocators.productPrices).allTextContents();

        return allNames
            .map((_, i) => ({
                name: normalizeText(allNames[i]),
                description: normalizeText(allDescription[i]),
                price: normalizeText(allPrice[i])
            }))
            .filter(product => product.name !== '');
    }

    async removeFirstProduct() {
        await this.page.locator(cartPageLocators.removeButton).first().click();
    }

    async clickCheckoutButton() {
        await this.page.locator(cartPageLocators.checkoutbutton).click();
    }
}