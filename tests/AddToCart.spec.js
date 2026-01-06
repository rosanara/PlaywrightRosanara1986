const { test, expect } = require('@playwright/test')

test('Add to cart the product and verify added the items', async ({ page }) => {

    //product 

    const product_name = 'ZARA COAT 3';
    const email = "rosanara12years@gmail.com";

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');


    //enter username and password

    await page.locator('#userEmail').type('rosanara12years@gmail.com');
    await page.locator('#userPassword').type('Aswin786@1');
    await page.locator("//input[@id='login']").click();
    //await page.getByRole('button', { name: 'Login' })
    await page.waitForLoadState('networkidle')
    await page.locator(".card-body b").first().waitFor();
    const title = await page.locator(".card-body b").allTextContents();
    console.log(title)

    await page.waitForSelector(".card-body b")


    // select the product based on specific product 
    const product = page.locator(".card-body")
    const count = await product.count();

    console.log(count)


    for (let i = 0; i < count; ++i) {

        if (await product.nth(i).locator("b").textContent() === product_name) {
            await product.nth(i).locator("text= Add To Cart").click()
            break;


        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor()
    const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible()
    await expect(bool).toBeTruthy();

    //continue to do check out and fill the remaining details 
    await page.locator("text=Checkout").click();
    await page.locator('[placeholder*=Country]').pressSequentially("ind", { delay: 100 })
    const dropdown = page.locator('.ta-results')
    console.log("dropdown is" + dropdown)
    await dropdown.waitFor();
    const optionCount = await dropdown.locator('button').count();
    for (let i = 0; i < optionCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === ' India') {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }

    expect(await page.locator(".user__name [type='text']").first()).toHaveText(email)
    await page.locator('.action__submit').click();
    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");
    //get the order id 

    const orderid = await page.locator('.em-spacer-1 .ng-star-inserted').textContent()
    console.log(`printorderId ${orderid}`)

    // click on order link and check the orders what i placed 

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('tbody').waitFor();
    const rows = page.locator('tbody tr')

    for (let i = 0; i < await rows.count(); ++i) {
        const AllorderId = await rows.nth(i).locator('th').textContent();
           console.log(`printorderId ${AllorderId}`)

           await page.pause();

        if (orderid.includes(AllorderId)) {

            await rows.nth(i).locator('button').first().click();
            break;

        }

        const VieworderId = await page.locator('.col-text').textContent()
        expect(orderid.includes(VieworderId)).toBeTruthy();

    

    }


})