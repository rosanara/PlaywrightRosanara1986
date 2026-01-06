const {test, expect} = require ('@playwright/test');
const { promises } = require('dns');

test('first playwright test',async ({browser}) => {

    //playwright code
    //step 1 =open browser
    //step 2= enter u/p 2 seconds
    //step 3= click

    const context = await browser.newContext();
    const page= await context.newPage();

    

   const username= page.locator('#username')
   const password=  page.locator("[type='password']")
   const cardTitle=page.locator('.card-body a')

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await username.type('Rosanara')
    await password.type('rosa')
    await page.locator('#signInBtn').click();

    console.log(await page.locator("[style*='block']").textContent())
    //assersation 

    await expect(page.locator("[style*='block']")).toContainText('Incorrect')

    //enter username and password

   await username.fill('');
  await username.fill('rahulshettyacademy')
  await password.fill('learning')
   await page.locator('#signInBtn').click();  

   console.log(await cardTitle.first().textContent());
    console.log(await cardTitle.nth(1).textContent());
    //get all th text content

   const allTitles=  await cardTitle.allTextContents();
   console.log(allTitles)


})

test('select dropdown', async({page})=>{

await page.goto('http://www.rahulshettyacademy.com/client/#/auth/login');

//login with usernamr and password , click on login button
//rosanara12years@gmail.com Aswin786@1
 await page.locator('#userEmail').fill('rosanara12years@gmail.com')
 await page.locator('#userPassword').fill('Aswin786@1')
 await page.getByRole('button').click();
  // xpath for the three list //div[@class='row']  page.locator('b:has-text("ZARA COAT 3")')
 //---await page.waitForLoadState('networkidle')
 await page.locator('.card-body b').first().waitFor();
  console.log(await page.locator('.card-body b').allTextContents())
 console.log(await page.getByText('ZARA COAT 3', { exact: true}).innerText())

})

test('registration page', async({page})=>{

await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

//login with usernamr and password , click on login button
//rosanara12years@gmail.com Aswin786@1
await page.locator('#username').fill('rahulshettyacademy ')
await page.locator('#password').fill('learning')
 const dropdownSelect= await page.locator('select.form-control')
 await dropdownSelect.selectOption('consult');
 await page.getByLabel('User',{exact:true}).click();
 await page.locator('#okayBtn').click();
 console.log(await page.getByLabel('User',{exact:true}).isChecked())
 await expect(page.getByLabel('User',{exact:true})).toBeChecked();
 
 await page.locator('#terms').click();
 await expect(page.locator('#terms')).toBeChecked();
  await page.locator('#terms').uncheck();
 console.log(await page.locator('#terms').isChecked());
  expect(await page.locator('#terms').isChecked()).toBeFalsy();


})

test.only('child window handles', async({browser})=>{
   
    const context = await browser.newContext();
    const page= await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentlink= page.locator("[href*='documents-request']");
//handle child window 
   const [childTab] = await Promise.all ([

            context.waitForEvent('page'),
            await documentlink.click()
        ])

    const text= await childTab.locator(".red").textContent();
    const arrayText=text.split("@")
    const domain = arrayText[1].split(" ")[0]
   console.log(domain)


   await page.locator('#username').fill(domain)

    



})