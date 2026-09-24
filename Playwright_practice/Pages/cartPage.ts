import { Page } from "@playwright/test";
import { cartPageLocators } from "../Locators/cartPageLocators";

export class cartPage
{
    constructor(private page : Page)
    {

    }
    async clickOnContinueShopping()
    {
        await this.page.locator(cartPageLocators.continueshopping).click();

    }

    async getCartPageElement()
    {
        return {
            cartTitle: this.page.locator(cartPageLocators.cartTitle),
            shoppingCart: this.page.locator(cartPageLocators.continueshopping),
            checkOut: this.page.locator(cartPageLocators.checkoutbutton)
        };
    }

    async getCartProducts()
            {
                const allNames = await this.page.locator(cartPageLocators.productnames).allTextContents();
                const allDescription = await this.page.locator(cartPageLocators.productDescription).allTextContents();
                const allPrice = await this.page.locator(cartPageLocators.productPrices).allTextContents();
        
                const allCartProducts = allNames.map((_, i)=>//return allNames.map((_, i) => 
                ({
                name: allNames[i]?.trim() ?? '',
                description: allDescription[i]?.trim() ?? '',
                price: allPrice[i]?.trim() ?? '',
                //array of object [{name,description,prices}, {} , {}]
        
            }))
        
            return allCartProducts;
        }

        async removeFirstProduct()
        {
            await this.page.locator(cartPageLocators.removeButton).first().click();
        }

        async clickCheckoutButton()
        {
            await this.page.locator(cartPageLocators.checkoutbutton).click();
        }
}