const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const {OrdersHistoryPage} = require('./OrderHistoryPage')
const { CartPage } = require('./CartPage');
const {OrderReviewPage} =require('./OrderReviewPage');

class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardpage = new DashboardPage(this.page)
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrderReviewPage(this.page);
        this.cartPage = new CartPage(this.page);

    }

    getLoginPage() {
        return this.loginPage
    }

    getDashboardPage() {
        return this.dashboardpage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }

}
module.exports = { POManager }