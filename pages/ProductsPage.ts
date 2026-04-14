import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  private productNames: string;
  private addToCartButtons: string;
  private removeButtons: string;
  private cartBadge: string;
  private cartLink: string;

  constructor(page: Page) {
    super(page);
    this.productNames = '[data-test="inventory-item-name"]';
    this.addToCartButtons = 'button[data-test^="add-to-cart"]';
    this.removeButtons = 'button[data-test^="remove"]';
    this.cartBadge = '[data-test="shopping-cart-badge"]';
    this.cartLink = '[data-test="shopping-cart-link"]';
  }

  /**
   * Get all available product names from the UI dynamically
   */
  async getAllProductNames(): Promise<string[]> {
    const products = await this.page.locator(this.productNames).allTextContents();
    return products;
  }

  /**
   * Add a specific product to cart by product name (dynamic)
   * @param productName - The name of the product to add
   * @example await productsPage.addProductToCartByName('Sauce Labs Backpack');
   */
  async addProductToCartByName(productName: string) {
    // Find the product container that contains the product name
    const productLocator = this.page.locator('[data-test="inventory-item"]').filter({
      hasText: productName,
    });

    // Check if product exists with timeout
    const productCount = await productLocator.count().catch(() => 0);
    if (productCount === 0) {
      throw new Error(`Product '${productName}' not found on the page`);
    }

    try {
      // Click the "Add to Cart" button within that product container
      await productLocator.locator('button[data-test^="add-to-cart"]').click({ timeout: 5000 });
    } catch (error) {
      // If add-to-cart button doesn't exist, the product might already be in cart
      const isRemoveBtnVisible = await productLocator.locator('button[data-test^="remove"]').isVisible().catch(() => false);
      if (isRemoveBtnVisible) {
        throw new Error(`Product '${productName}' is already in the cart`);
      }
      throw error;
    }
  }

  /**
   * Add the first product from the list to cart
   * @example await productsPage.addFirstProductToCart();
   */
  async addFirstProductToCart() {
    const firstAddToCartButton = this.page.locator(this.addToCartButtons).first();
    await firstAddToCartButton.click();
  }

  /**
   * Add a random product from the list to cart
   * @returns The name of the product added
   * @example const productName = await productsPage.addRandomProductToCart();
   */
  async addRandomProductToCart(): Promise<string> {
    const allProducts = await this.getAllProductNames();
    
    if (allProducts.length === 0) {
      throw new Error('No products found on the page');
    }

    // Pick a random product
    const randomIndex = Math.floor(Math.random() * allProducts.length);
    const randomProductName = allProducts[randomIndex];

    // Add the random product to cart
    await this.addProductToCartByName(randomProductName);

    return randomProductName;
  }

  /**
   * Add multiple products to cart by their names
   * @param productNames - Array of product names to add
   * @example await productsPage.addMultipleProductsToCart(['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt']);
   */
  async addMultipleProductsToCart(productNames: string[]) {
    for (const productName of productNames) {
      await this.addProductToCartByName(productName);
    }
  }

  /**
   * Get product count in cart (from badge)
   */
  async getCartItemCount(): Promise<number> {
    try {
      // Try to get badge text with a short timeout
      const badgeText = await this.page.locator(this.cartBadge).textContent({ timeout: 2000 }).catch(() => null);
      return badgeText ? parseInt(badgeText, 10) : 0;
    } catch (error) {
      // If badge doesn't exist, cart is empty
      return 0;
    }
  }

  /**
   * Legacy method - Add hardcoded product (for backward compatibility)
   */
  async addProductToCart() {
    await this.addProductToCartByName('Sauce Labs Backpack');
  }

  async goToCart() {
    await this.click(this.cartLink);
  }

  async isCartBadgeVisible() {
    return await this.isVisible(this.cartBadge);
  }
}
