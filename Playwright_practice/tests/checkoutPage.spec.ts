import { test, expect } from '@playwright/test';
import { loginpage } from '../Pages/loginpage';
import { productpage } from '../Pages/productpage';
import { BaseUrl, username, password } from '../utils/envConfig';
import { cartPage } from '../Pages/cartPage';
import { CheckoutPage } from "../Pages/checkoutPage";
import { checkoutData } from "../test-data/checkoutData";


test.describe('Cart Page validation', () => {
    let loginPage: loginpage;
    let productPage: productpage;
    let cartPageObject: cartPage;
    let checkoutPage : CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new loginpage(page);
        productPage = new productpage(page);
        cartPageObject = new cartPage(page);
        checkoutPage = new CheckoutPage(page);
        await page.goto(BaseUrl);
        await loginPage.login(username, password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await productPage.addFirstProductToCart();
        await productPage.clickCartLink();
    })
    
    test("Validate checkout Page and UI element",async({page}) =>
    {
        await cartPageObject.clickCheckoutButton();
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
        const elements = await checkoutPage.getcheckoutElements();
        await expect(elements.cancel).toBeVisible();
        await expect(elements.pageInfo).toBeVisible();
        await expect(elements.continue).toBeVisible();
    })  

    test("Validate cancel button functionality",async({page}) =>
    {
        await cartPageObject.clickCheckoutButton();
        await checkoutPage.clickCancel();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

    }) 

    test("Validate continue button ",async({page}) =>
    {
        await cartPageObject.clickCheckoutButton();
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
        await checkoutPage.clickOnContinue();
    
    }) 

    test("Validate error msg",async({page}) =>
    {
        await cartPageObject.clickCheckoutButton();
        await checkoutPage.clickOnContinue();
        const error = await checkoutPage.getErrorMesaage()
        expect(error?.trim()).toBe("Error: First Name is required");
    
    }) 

});