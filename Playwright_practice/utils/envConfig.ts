//export const BaseUrl = "https://www.saucedemo.com/";

const ENV_URL = 
{
    dev : "https://www.saucedemo.com/",
    qa : "https://www.saucedemo.com/",
    stage :"https://www.saucedemo.com/",
    prod : "https://www.saucedemo.com/"

};

const ENV = process.env.ENV || "prod"
export const BaseUrl = (ENV_URL as any)[ENV]
export const username = "standard_user";
export const password = "secret_sauce";
