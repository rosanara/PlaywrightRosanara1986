const { test, expect } = require('@playwright/test')

test('playwright locator', async ({ page }) => {
    // await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

    // backward 

    // await page.goBack();
    // await page.goForward();

    //forward to backward butotn from the browser

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    //automate 

    page.on('dialog',dialog =>dialog.accept());
    await page.locator('#confirmbtn').click()





    //enter username and password


})