class DashboardPage {
    constructor(page) {

        this.page = page;
        this.product = page.locator(".card-body");
        this.productText = page.locator(".card-body b")
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchproduct(productName) {

        await this.productText.first().waitFor({ state: "visible" });
        const title = await this.productText.allTextContents();
        console.log(title)

        //await this.page.waitForSelector(".card-body b")
        const count = await this.product.count();

        console.log(count)


        for (let i = 0; i < count; ++i) {

            if (await this.product.nth(i).locator("b").textContent() === productName) {
                await this.product.nth(i).locator("text= Add To Cart").click()
                break;


            }
        }

    }

    async navigateTocart(){
         await this.cart.waitFor({ state: "visible" });
         await this.cart.click();
    }
}

module.exports={DashboardPage};