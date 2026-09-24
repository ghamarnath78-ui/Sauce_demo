import {productlocators} from '../Locators/productlocators';
import { Page } from "@playwright/test";

export class productpage
{
    readonly page : Page;
    constructor(privatepage: Page)
    {
        this.page = privatepage;
    }

    async logout()
    {
        await this.page.click(productlocators.settingsbutton);
        await this.page.click(productlocators.logoutlink);
    }
    async aboutpage()
    {
        await this.page.click(productlocators.settingsbutton);
        await this.page.click(productlocators.aboutlink);
    }
    async validateAllProductsDisplayed()
    {
        const names = await this.page.locator(productlocators.productnames).allTextContents();
        const descriptions = await this.page.locator(productlocators.productDescription).allTextContents();
        const prices = await this.page.locator(productlocators.productPrices).allTextContents();
        const addToCartButtons = await this.page.locator(productlocators.addToCartButton).count();

        if (names.length === 0) {
            throw new Error("No product names found on the page");
        }

        if (names.length !== descriptions.length || names.length !== prices.length || names.length !== addToCartButtons) {
            throw new Error("Inconsistent product information found on the page");
        }
    }

    async addFirstProductToCart()
    {
        await this.page.locator(productlocators.addToCartButton).first().click();
    }

    async addAllProductsToCart()
    {
        const buttons = await this.page.locator(productlocators.addToCartButton);
        const count = await buttons.count();
        for (let i = 0; i < count; i++) 
        {
            await buttons.nth(i).click();
            await this.page.waitForTimeout(500); // Optional: Add a small delay to ensure the click is registered
        }

    }

    async addSpecificProductsToCart(productName : string[])
    {
        const addProducts = this.page.locator(productlocators.productnames);
        const count = await addProducts.count();
        for (let i=0; i<count; i++)
        {
            const name = await addProducts.nth(i).textContent();
            if (name && productName.includes(name.trim()))
            {
                await this.page.locator(productlocators.addToCartButton).nth(i).click();
                await this.page.waitForTimeout(500); // Optional: Add a small delay to ensure the click is registered
            }
        }

    }

     async filterByNameAtoZ()
        {
            await this.page.selectOption(productlocators.filterDropdown, 'az');
        }
        async filterByNameZtoA()
        {
            await this.page.selectOption(productlocators.filterDropdown, 'za');
        }
        async filterByPriceLowtoHigh()
        {
            await this.page.selectOption(productlocators.filterDropdown, 'lohi');
        }
        async filterByPriceHightoLow()
        {
            await this.page.selectOption(productlocators.filterDropdown, 'hilo');
        }
    
        async getProductsNames()
        {
            return await this.page.locator(productlocators.productnames).allTextContents();
        }
    
    async getProductPrices()
    {
        const prices = await this.page.locator(productlocators.productPrices).allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }

    async clickCartLink()
    {
        await this.page.locator(productlocators.cartLink).click();
    }
    async getFirstProductDetails()
    {
        const name = await this.page.locator(productlocators.productnames).first().textContent();
        const description = await this.page.locator(productlocators.productDescription).first().textContent();
        const price = await this.page.locator(productlocators.productPrices).first().textContent();

        return {
            name: name?.trim(),
            description: description?.trim(),
            price: price?.trim()
        };
    }
    async getAllProductDetails()
    {
        const allNames = await this.page.locator(productlocators.productnames).allTextContents();
        const allDescription = await this.page.locator(productlocators.productDescription).allTextContents();
        const allPrice = await this.page.locator(productlocators.productPrices).allTextContents();

        const allProducts = allNames.map((_, i)=>//return allNames.map((_, i) => 
        ({
        name: allNames[i]?.trim() ?? '',
        description: allDescription[i]?.trim() ?? '',
        price: allPrice[i]?.trim() ?? '',
        //array of object [{name,description,prices}, {} , {}]

    }))

    return allProducts;
}



    async getSpecificproductDetails(productName : string[])
    {
        const allNames = await this.page.locator(productlocators.productnames).allTextContents();
        const allDescription = await this.page.locator(productlocators.productDescription).allTextContents();
        const allPrice = await this.page.locator(productlocators.productPrices).allTextContents();

        const allProducts = allNames.map((_, i)=>//return allNames.map((_, i) => 
        ({
        name: allNames[i]?.trim() ?? '',
        description: allDescription[i]?.trim() ?? '',
        price: allPrice[i]?.trim() ?? '',
        //array of object [{name,description,prices}, {} , {}]

    }))

    return allProducts.filter(p => productName.includes(p.name));

}
}
