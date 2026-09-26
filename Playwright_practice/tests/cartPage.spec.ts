import { test, expect } from '@playwright/test';
import { loginpage } from '../Pages/loginpage';
import { productpage } from '../Pages/productpage';
import { BaseUrl, username, password } from '../utils/envConfig';
import { cartPage } from '../Pages/cartPage';
import { productsToCart } from '../test-data/products';



test.describe('Cart Page validation', () => {
    let loginPage: loginpage;
    let productPage: productpage;
    let cartPageObject: cartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new loginpage(page);
        productPage = new productpage(page);
        cartPageObject = new cartPage(page)
        await page.goto(BaseUrl);
        await loginPage.login(username, password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test("Validate cart page URL and UI element",async({page}) =>
    {
        await productPage.addFirstProductToCart();
        await productPage.clickCartLink();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
        await page.waitForTimeout(5000);
        const ui = cartPageObject.getCartPageElement();
        await expect((await ui).cartTitle).toBeVisible();
        await expect((await ui).checkOut).toBeVisible();
        

    })

    test("Validate Continue shopping Functionality",async({page}) =>
    {
        await productPage.addFirstProductToCart();
        await productPage.clickCartLink();
        await cartPageObject.clickOnContinueShopping();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');


    })
    test("Validate First Product in the Cart Page ",async({page}) =>
    {
        const firstProduct = await productPage.getFirstProductDetails();
        await productPage.addFirstProductToCart();
        await productPage.clickCartLink();
        const cartProducts = await cartPageObject.getCartProducts();
        expect(cartProducts[0]).toEqual(firstProduct);
    })
    
    
    test("Validate Every Products added to the cart page ",async({page}) =>
    {
        const allProductDetails = await productPage.getAllProductDetails();
        await productPage.addAllProductsToCart();
        await productPage.clickCartLink();
        const cartProducts = await cartPageObject.getCartProducts();
        expect(cartProducts).toEqual(allProductDetails);

    })

    // Playwright_practice/tests/cartPage.spec.ts

    test("Validate Specific products added to the cart page", async ({ page }) => 
    {
        const specificdetails = await productPage.getSpecificproductDetails(productsToCart);
        await productPage.addSpecificProductsToCart(productsToCart);
        await productPage.clickCartLink();
        const cartProducts = await cartPageObject.getCartProducts();
        expect(cartProducts).toEqual(specificdetails);
    })

    test("Validate Remove Product Functionality",async({page}) =>
    {
        await productPage.addAllProductsToCart();
        await productPage.clickCartLink();
        const initialProducts = await cartPageObject.getCartProducts();
        expect(initialProducts.length).toBeGreaterThan(0);
        await cartPageObject.removeFirstProduct();
        const updatedCartProducts = await cartPageObject.getCartProducts();
        expect(updatedCartProducts.length).toBe(initialProducts.length-1);
    })

})