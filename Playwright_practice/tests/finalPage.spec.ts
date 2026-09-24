import { test, expect } from '@playwright/test';
import { loginpage } from '../Pages/loginpage';
import { productpage } from '../Pages/productpage';
import { BaseUrl, username, password } from '../utils/envConfig';
import { cartPage } from '../Pages/cartPage';
import { CheckoutPage } from "../Pages/checkoutPage";
import { checkoutData } from "../test-data/checkoutData";
import { checkoutOverview } from '../Pages/checkoutOverviewPage';
import { finalPage } from '../Pages/finalPage';

test.describe('Final Page validation', () => {
    let loginPage: loginpage;
    let productPage: productpage;
    let cartPageObject: cartPage;
    let checkoutPage : CheckoutPage;
    let checkoutOverviewPage : checkoutOverview;
    let finalPageObject: finalPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new loginpage(page);
        productPage = new productpage(page);
        cartPageObject = new cartPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutOverviewPage = new checkoutOverview(page);
        finalPageObject = new finalPage(page);
        await page.goto(BaseUrl);
        await loginPage.login(username, password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await productPage.addFirstProductToCart();
        await productPage.clickCartLink();
        await cartPageObject.clickCheckoutButton();
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
        await checkoutPage.clickOnContinue();
        await checkoutOverviewPage.clickFinish();
    })

    test("Validate continue button ",async({page}) =>
    {
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
        const elements = await finalPageObject.getFinalPageElements(); 
        await expect(elements.backHomeButton).toBeVisible();
        await expect(elements.pageInfo).toBeVisible();
        await expect(elements.successMsg).toBeVisible();
    
    })

    test("Validate Success Message",async({page}) =>
    {
        const message = await finalPageObject.getSuccessMsgText();
        expect(message).toBe("Thank you for your order!")
    
    })

     test("Validate Back Home Button",async({page}) =>
    {
        await finalPageObject.clickBackHomeButton();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    
    })
 });