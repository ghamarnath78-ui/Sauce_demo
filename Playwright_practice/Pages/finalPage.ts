import { Page } from "@playwright/test"
import { finalPageLocators } from "../Locators/finalPageLocators"

export class finalPage 
{
    constructor (private page : Page){}

    async getFinalPageElements()
    {
        return{
            pageInfo : this.page.locator(finalPageLocators.pageInfo),
            successMsg : this.page.locator(finalPageLocators.successMsg),
            backHomeButton : this.page.locator(finalPageLocators.backHomeButton)

        }
    }
    async getSuccessMsgText()
    {
        const text = await this.page.locator(finalPageLocators.successMsg).innerText();
        return (await text).trim();
    
    }
    async clickBackHomeButton()
    {
        await this.page.locator(finalPageLocators.backHomeButton).click();
    }
}