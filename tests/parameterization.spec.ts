import {test,expect} from '@playwright/test';

test.describe('HerokoApp application make appointment ',()=>{
    test('Make an appoinemnt',async({page})=>{
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
       
        // assert a text
        await expect(page.locator('h2')).toContainText('Login');
        
    })
})