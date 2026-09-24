import { Page } from "@playwright/test";
import { checkoutOverviewLocators } from "../Locators/checkoutOverviewLocators";

export class checkoutOverview
{
    constructor(private page : Page)
    {

    }
    async getcheckoutOverviewElements()
    {
        return{
            PageInfo : this.page.locator(checkoutOverviewLocators.pageInfo),
            cancelButton : this.page.locator(checkoutOverviewLocators.cancelButton),
            finishButton : this.page.locator(checkoutOverviewLocators.finishButton),
        }
    }
    async getOverviewProducts()
    {
        const allNames = await this.page.locator(checkoutOverviewLocators.productnames).allTextContents();
                        const allDescription = await this.page.locator(checkoutOverviewLocators.productDescription).allTextContents();
                        const allPrice = await this.page.locator(checkoutOverviewLocators.productPrices).allTextContents();
                
                        const allCartProducts = allNames.map((_, i)=>//return allNames.map((_, i) => 
                        ({
                        name: allNames[i]?.trim() ?? '',
                        description: allDescription[i]?.trim() ?? '',
                        price: allPrice[i]?.trim() ?? '',
                        //array of object [{name,description,prices}, {} , {}]
                
                    }))
                
                    return allCartProducts;
    }

    async getItemTotal()
    {
        const text=await this.page.locator(checkoutOverviewLocators.itemTotal).textContent();
        return parseFloat(text!.replace("Item total: $", "").trim());
    }
    async getTax()
    {
        const text=await this.page.locator(checkoutOverviewLocators.tax).textContent();
        return parseFloat(text!.replace("Tax: $", "").trim());
    }
    async getTotal()
    {
        const text=await this.page.locator(checkoutOverviewLocators.total).textContent();
        return parseFloat(text!.replace("Total: $", "").trim());
    }
    async clickCancel()
    {
        await this.page.locator(checkoutOverviewLocators.cancelButton).click();

    }
    async clickFinish()
    {
        await this.page.locator(checkoutOverviewLocators.finishButton).click();
        
    }
}
