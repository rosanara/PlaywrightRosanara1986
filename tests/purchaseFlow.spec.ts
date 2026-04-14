import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { config } from '../config/config';

test.describe('Sauce Demo - Purchase Flow', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Navigate and login
    await loginPage.navigate();
    await loginPage.login(config.validUsername, config.validPassword);
  });

  test('Should complete purchase flow with single product', async ({ page }) => {
    await test.step('Add single product to cart', async () => {
      await productsPage.addProductToCart();
      const cartCount = await productsPage.getCartItemCount();
      expect(cartCount).toBe(1);
    });

    await test.step('Navigate to cart', async () => {
      await productsPage.goToCart();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Proceed to checkout', async () => {
      await cartPage.proceedToCheckout();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Fill checkout information (with sequential fills + delays)', async () => {
      await checkoutPage.enterCheckoutInfo('John', 'Doe', '12345');
    });

    await test.step('Continue checkout', async () => {
      await checkoutPage.continueCheckout();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify no errors before finishing', async () => {
      const errorVisible = await checkoutPage.isErrorMessageVisible().catch(() => false);
      if (errorVisible) {
        const errorMsg = await checkoutPage.getErrorMessage().catch(() => '');
        throw new Error(`Checkout error: ${errorMsg}`);
      }
    });

    await test.step('Finish purchase', async () => {
      await checkoutPage.finishCheckout();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify success message (Promise.race with timeout)', async () => {
      const isVisible = await checkoutPage.isSuccessMessageVisible();
      expect(isVisible).toBe(true);

      const message = await checkoutPage.getSuccessMessage();
      expect(message).toContain('Thank you');
      console.log('Single product purchase completed');
    });
  });

  test('Should complete purchase flow with multiple products', async ({ page }) => {
    const productsToAdd = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt'
    ];

    await test.step('Add multiple products to cart', async () => {
      await productsPage.addMultipleProductsToCart(productsToAdd);
      const cartCount = await productsPage.getCartItemCount();
      expect(cartCount).toBe(3);
    });

    await test.step('Navigate to cart', async () => {
      await productsPage.goToCart();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Proceed to checkout', async () => {
      await cartPage.proceedToCheckout();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Fill checkout information (with sequential fills + delays)', async () => {
      await checkoutPage.enterCheckoutInfo('Jane', 'Smith', '54321');
    });

    await test.step('Continue checkout', async () => {
      await checkoutPage.continueCheckout();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify no errors', async () => {
      const errorVisible = await checkoutPage.isErrorMessageVisible().catch(() => false);
      if (errorVisible) {
        const errorMsg = await checkoutPage.getErrorMessage().catch(() => '');
        throw new Error(`Checkout error: ${errorMsg}`);
      }
    });

    await test.step('Finish purchase', async () => {
      await checkoutPage.finishCheckout();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify success message (Promise.race)', async () => {
      const isVisible = await checkoutPage.isSuccessMessageVisible();
      expect(isVisible).toBe(true);

      const message = await checkoutPage.getSuccessMessage();
      expect(message).toContain('Thank you');
      console.log('Multiple products purchase completed');
    });
  });

  test('Should complete purchase with concurrent checkout info fill', async ({ page }) => {
    await test.step('Add product to cart', async () => {
      await productsPage.addFirstProductToCart();
    });

    await test.step('Navigate to cart and checkout', async () => {
      await productsPage.goToCart();
      await page.waitForLoadState('networkidle');
      await cartPage.proceedToCheckout();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Fill checkout info with sequential fills', async () => {
      await checkoutPage.enterCheckoutInfo('Test', 'User', '99999');
    });

    await test.step('Continue checkout', async () => {
      await checkoutPage.continueCheckout();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Complete purchase', async () => {
      await checkoutPage.finishCheckout();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify purchase success (Promise.race)', async () => {
      const isVisible = await checkoutPage.isSuccessMessageVisible();
      expect(isVisible).toBe(true);

      const successMessage = await checkoutPage.getSuccessMessage();
      expect(successMessage).toBeTruthy();
      console.log('Order placed successfully');
    });
  });
});
