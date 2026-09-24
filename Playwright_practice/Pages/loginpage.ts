import {loginlocators} from "../Locators/loginlocators";
import { Page } from "@playwright/test";


export class loginpage
{
    readonly page : Page;
    readonly loginlocators = loginlocators;
    readonly username : string;
    readonly password : string;


    constructor(privatepage: Page)
    {
        this.page = privatepage;
        this.username = loginlocators.username;
        this.password = loginlocators.password;
    }

async login(username : string, password : string)

{
     await this.page.fill(this.username, username);
     await this.page.fill(this.password, password);
     await this.page.click(loginlocators.loginbutton);
}
}