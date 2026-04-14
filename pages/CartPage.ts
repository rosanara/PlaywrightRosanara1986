import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private productName: string;
  private checkoutButton: string;

  constructor(page: Page) {
    super(page);
    this.productName = 'text=Sauce Labs Backpack';
    this.checkoutButton = 'button[data-test="checkout"]';
  }

  async isProductInCart() {
    return await this.isVisible(this.productName);
  }

  async proceedToCheckout() {
    await this.click(this.checkoutButton);
  }
}
