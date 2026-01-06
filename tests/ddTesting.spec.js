const { test, expect } = require('@playwright/test');

[
    { username: "12", errorMessage: "username is too short (minimum is 3 characters)", isErrorDisplayed: true },
    { username: "123", errorMessage: "username", isErrorDisplayed: false },
    { username: "1", errorMessage: "password is too short (minimum is 8 characters)", isErrorDisplayed: true },
    { username: "122345678909876543dfdgdfhgfh", errorMessage: "password is too long (maximum is 20 characters)", isErrorDisplayed: true }
].forEach(({ username, errorMessage, isErrorDisplayed }) => {


    test(`Automate the DD Testing using the ${username}`, async ({ page }) => {

        await page.goto("https://conduit.bondaracademy.com/");
        await page.getByRole('link', { name: 'Sign up' }).click();
        await page.getByRole('textbox', { name: 'Username' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill(username); //get the multiple set of user name for each loop
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('sdsfs');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('sdsfsf');
        await page.getByRole('textbox', { name: 'Password' }).fill(username); //fill password filed same as user name 
        await page.getByRole('button', { name: 'Sign up' }).click();
        //implement error message validation code 

        if (isErrorDisplayed) {
          
            await expect(page.locator('.error-messages')).toContainText(errorMessage)
        } else {
            await expect(page.locator('.error-messages')).not.toContainText(errorMessage)
        }

    })
});
