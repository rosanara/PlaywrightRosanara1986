import { test, expect } from '@playwright/test'
import Testdata from '../data/parameterization.ts'
import { json } from 'stream/consumers';

const testData = Testdata.makeAppoinmentTestData();
for (const data of testData) {

    test.describe("make Appointement", () => {
        test.beforeEach(`Login with valid credential`, async ({ page }) => {


            // Launch URL and assert Title 
            await page.goto('https://katalon-demo-cura.herokuapp.com/');

            // click make An appointment 
            await page.getByRole('link', { name: 'Make Appointment' }).click();
            await expect(page.getByText('Please login to make')).toBeVisible();
            //sucessfull login
            await page.getByLabel('Username').click();
            await page.getByLabel('Username').fill('John Doe');
            await page.getByLabel('Password').click();
            await page.getByLabel('Password').fill('ThisIsNotAPassword')
            await page.getByRole('button', { name: 'Login' }).click();

            // assert a text
            await expect(page.locator('h2')).toContainText('Make Appointment');
        })

        test(`Should make an appointment with non default values: ${data.testID} `, async ({ page }, testinfo) => {
            // console.log(`>> Current config \n: ${JSON.stringify(testinfo.config)}`);
            await page.getByLabel('Facility').selectOption(data.facility);
            await page.getByLabel('Apply for hospital readmission').check();
            //await page.getByLabel('Healthcare Program').check(data.hcp);
            await page.getByText(data.hcp).click();
            await page.getByRole('textbox', { name: "Visit Date (Required)" }).click();
            await page.getByRole('textbox', { name: "Visit Date (Required)" }).fill(data.visitDate);
            await page.getByRole('textbox', { name: "Visit Date (Required)" }).press('Enter');
            await page.getByLabel('Comment').click();
            await page.getByLabel('Comment').fill(data.comment);
            await page.getByRole('button', { name: 'Book Appointment' }).click();
            //assertion 
            await expect(page.locator('h2')).toContainText('Appointment Confirmation');
        })






    })
}