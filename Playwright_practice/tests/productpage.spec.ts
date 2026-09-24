import { test, expect } from '@playwright/test';
import { loginpage } from '../Pages/loginpage';
import { productpage } from '../Pages/productpage';
import { BaseUrl, username, password } from '../utils/envConfig';
import { productlocators } from '../Locators/productlocators';
import { cartPageLocators } from '../Locators/cartPageLocators';
import { loginlocators } from '../Locators/loginlocators';
import { productsToCart } from '../test-data/products';

test.describe('Product Page Tests', () => {
    let loginPage: loginpage;
    let productPage: productpage;

    test.beforeEach(async ({ page }) => {
        loginPage = new loginpage(page);
        productPage = new productpage(page);
        await page.goto(BaseUrl);
        await loginPage.login(username, password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Verify logout functionality', async ({ page }) => {
        await productPage.logout();
        await expect(page.locator(loginlocators.loginbutton)).toBeVisible();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('Verify about page and navigation back', async ({ page }) => {
        await productPage.aboutpage();
        await expect(page.getByRole('link', { name: 'Book a Demo' }).nth(1)).toBeVisible();
        await expect(page.getByRole('link', { name: 'Start Free' }).first()).toBeVisible();
        await page.goBack();
        await expect(page.locator(productlocators.settingsbutton)).toBeVisible();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        
    });

    test('validate product page', async ({ page }) =>
    {
        await productPage.validateAllProductsDisplayed();
        await productPage.addFirstProductToCart();
        await productPage.addAllProductsToCart();

    })

    test('Validate Adding specific products to cart', async ({ page }) => 
    {
        await productPage.addSpecificProductsToCart(productsToCart);
    })

     test('Verify filter functionality A to Z', async ({ page }) => {
        await productPage.filterByNameAtoZ();
        const names = await productPage.getProductsNames();
        const sorted = [...names].sort();
        expect(names).toEqual(sorted);
    })

    test('Verify filter functionality Z to A', async ({ page }) => {
        await productPage.filterByNameZtoA();
        const names = await productPage.getProductsNames();
        const sorted = [...names].sort().reverse();
        expect(names).toEqual(sorted);
    })
    test('Verify filter functionality Low to High', async ({ page }) => {
        await productPage.filterByPriceLowtoHigh();
        const prices = await productPage.getProductPrices();
        const sortedPrices = [...prices].sort((a,b) => a-b);
        expect(prices).toEqual(sortedPrices);
    })
    test('Verify filter functionality High to Low', async ({ page }) => {
        await productPage.filterByPriceHightoLow();
        const prices = await productPage.getProductPrices();
        const sortedprices = [...prices].sort((a,b) => b-a);
        expect(prices).toEqual(sortedprices);
    })
});