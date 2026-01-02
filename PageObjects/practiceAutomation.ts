import {Page, expect, Locator } from "@playwright/test";

export class PracticeAutomation {
    readonly page:Page;
    readonly searchInput:Locator;
    readonly searchButton:Locator;

    constructor(page:Page){ 
        this.page=page;
        this.searchInput = page.getByRole('textbox', { name: 'Search' });
        this.searchButton = page.locator('button[name="submit_search"]');

    }   

    async navigateToHomePage(){
        await this.page.goto('http://www.automationpractice.pl/index.php');
    }
    async searchTShirt(query:string){   
        await this.searchInput.fill(query);
        await this.searchButton.click(); 
        await this.page.screenshot({ path: 'search-results.png', fullPage: true });       
    }

};


export class SearchResultsPage {
    readonly page:Page; 
    readonly productLink:Locator;
    constructor(page:Page){
        this.page=page;
        this.productLink = page.locator('a.product-name').last(); 

    }
async verifySearchResults(productName:string){
      //    await expect(this.page.getByRole('link', { name: 'Faded Short Sleeve T-shirts' })).toBeVisible();
       await  this.productLink.waitFor();    
       
        await expect(this.productLink.filter({hasText: productName})).toBeVisible();
}
       
    
};  
