const { test, expect } = require('@playwright/test')
const { POManager } = require('../pageObjects/POManager')
const dataSet =JSON.parse (JSON.stringify(require("../Utils/TestData.json")));

test('Add to cart the product and verify added the items', async ({ page }) => {

    //product 
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    await loginPage.navigateUrl();
    await loginPage.ValidLogin(dataSet.username, dataSet.password)

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchproduct(dataSet.productName)
    await dashboardPage.navigateTocart();

    const cartPage= poManager.getCartPage();
     await cartPage.VerifyProductIsDisplayed(dataSet.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   //await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();



});