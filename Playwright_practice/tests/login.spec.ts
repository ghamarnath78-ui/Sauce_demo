import { test, expect } from '@playwright/test';
import { loginpage } from '../Pages/loginpage';
import { BaseUrl, username, password } from '../utils/envConfig';

test('Login to SauceDemo application with valid credentials', async ({ page }) => 
{
const loginPage = new loginpage(page);
await page.goto(BaseUrl);
await loginPage.login(username, password);
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
})


