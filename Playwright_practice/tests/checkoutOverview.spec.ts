import { test, expect } from '@playwright/test';
import { loginpage } from '../Pages/loginpage';
import { productpage } from '../Pages/productpage';
import { BaseUrl, username, password } from '../utils/envConfig';
import { cartPage } from '../Pages/cartPage';
import { CheckoutPage } from "../Pages/checkoutPage";
import { checkoutData } from "../test-data/checkoutData";
import { checkoutOverview } from '../Pages/checkoutOverviewPage';

test.describe('Checkout Overivew validation', () => {
    let loginPage: loginpage;
    let productPage: productpage;
    let cartPageObject: cartPage;
    let checkoutPage : CheckoutPage;
    let checkoutOverviewPage : checkoutOverview;

    test.beforeEach(async ({ page }) => {
        loginPage = new loginpage(page);
        productPage = new productpage(page);
        cartPageObject = new cartPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutOverviewPage = new checkoutOverview(page);
        await page.goto(BaseUrl);
        await loginPage.login(username, password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await productPage.addFirstProductToCart();
        await productPage.clickCartLink();
        await cartPageObject.clickCheckoutButton();
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
        await checkoutPage.clickOnContinue();
    })

    test("Validate checkout overview Page and UI element",async({page}) =>
    {
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
        const elements = await checkoutOverviewPage.getcheckoutOverviewElements();
        await expect(elements.PageInfo).toBeVisible();
        await expect(elements.cancelButton).toBeVisible();
        await expect(elements.finishButton).toBeVisible();
    }) 

    test("Validate cancel button functionality",async({page}) =>
    {
        await checkoutOverviewPage.clickCancel();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
       
    }) 

    test("Validate item total calculation",async({page}) =>
    {
        const overviewProducts = await checkoutOverviewPage.getOverviewProducts();
        const calculatedTotal = overviewProducts.reduce((sum, {price}) => sum + parseFloat(price.replace("$", "")), 0)
        const uiItemTotal = await checkoutOverviewPage.getItemTotal();
        expect(calculatedTotal).toBe(uiItemTotal);
       
    }) 

    test("Validate final Total (Itemtotal + Tax)",async({page}) =>
    {
        const itemtotal = await checkoutOverviewPage.getItemTotal();
        const tax = await checkoutOverviewPage.getTax();
        const finalTotal = await checkoutOverviewPage.getTotal();
        const expcetedFinalTotal = itemtotal + tax;
        expect(finalTotal).toBe(expcetedFinalTotal);
       
    }) 

});