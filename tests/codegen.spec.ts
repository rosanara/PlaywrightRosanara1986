import { test, expect } from '@playwright/test'

test.describe("Validation codegen login functionality", () => {
    test.beforeEach(`added hooks `, async ({ page }) => {


        // Launch URL and assert Title 
        await page.goto('https://katalon-demo-cura.herokuapp.com/');

        // click make An appointment 
        await page.getByRole('link', { name: 'Make Appointment' }).click();
        await expect(page.getByText('Please login to make')).toBeVisible();
    })

    test(`should login sucessfully`, async ({ page }) => {

        //sucessfull login
        await page.getByLabel('Username').click();
        await page.getByLabel('Username').fill('John Doe');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('ThisIsNotAPassword')
       
        // assert a text
        await expect(page.locator('h2')).toContainText('Login');

    })

    test(`should prevent login with incorrect cred`, async ({ page }) => {


        // unsecessful login
        await page.getByText('Please login to make').click();
        await page.getByLabel('Username').click();
        await page.getByLabel('Username').fill('john Doe');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: 'Login' }).click();
        //asert text error
        await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');

    })
})