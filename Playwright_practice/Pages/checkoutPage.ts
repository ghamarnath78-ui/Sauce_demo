import { checkoutPageLOcators } from "../Locators/checkoutPageLocators";
import { Page } from "@playwright/test";

export class CheckoutPage 
{
    constructor (private page : Page)
    {

    }

    async getcheckoutElements()
    {
        return{
            pageInfo : this.page.locator(checkoutPageLOcators.pageInfo),
            cancel : this.page.locator(checkoutPageLOcators.cancelButton),
            continue : this.page.locator(checkoutPageLOcators.continueButton)
        }
    }
    async fillCheckoutDetails(firstName : string, lastName : string, postalcode : string)
    {
        await this.page.fill(checkoutPageLOcators.firstName,firstName);
        await this.page.fill(checkoutPageLOcators.lastName,lastName);
        await this.page.fill(checkoutPageLOcators.postalCode,postalcode);
    }
    async clickCancel()
    {
        await this.page.click(checkoutPageLOcators.cancelButton);

    }
    async clickOnContinue()
    {
        await this.page.click(checkoutPageLOcators.continueButton);
    }

    async getErrorMesaage()
    {
        return await this.page.locator(checkoutPageLOcators.errormsg).textContent();
    }
}