class LoginPage {

    constructor(page) {
        this.page=page;
        this.userName = page.locator('#userEmail');
        this.passWord = page.locator('#userPassword');
        this.signInbutton = page.locator("//input[@id='login']");
    }

    async navigateUrl(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
      

    
    }

    async ValidLogin(username, password) {
        await this.userName.type(username);
        await this.passWord.type(password);
        await this.signInbutton.click();
         await this.page.waitForLoadState('networkidle')

    }
}

module.exports ={LoginPage};