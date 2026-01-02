import {Page,Locator,expect} from '@playwright/test'
export default class LoginPage {
      readonly page:Page;
      readonly userName:Locator;
      readonly passWord:Locator     
      readonly signInbutton:Locator;

    constructor(page: Page ) {
        this.page=page;
        this.userName = page.locator('#userEmail');
        this.passWord = page.locator('#userPassword');
        this.signInbutton = page.locator("//input[@id='login']");
    }

 async enterFirstName(Firstname: string){
    await this.page.locator("#input-firstname")
    .type(Firstname);
 }

  async enterlastName(Lastname: string){
    await this.page.locator("#inputname='lastname']")
    .type(Lastname);
 }

  async enterEmail(email: string){
    await this.page.locator("#input[name='email']")
    .type(email);
 }
 async enterPhone(phone: string){
    await this.page.locator("#input[name='telephone']")
    .type(phone);
 }




    async navigateUrl(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
      

    
    }
    
}
   


