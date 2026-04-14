import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { config } from '../config/config';

test.describe('Sauce Demo - Negative Scenarios', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test.describe('Login Negative Tests', () => {
    test('Should fail login with invalid username', async ({ page }) => {
      await test.step('Attempt login with invalid username', async () => {
        await loginPage.login(config.invalidUsername, config.validPassword);
      });
      
      await test.step('Verify error message displayed', async () => {
        const errorVisible = await loginPage.isErrorMessageVisible();
        expect(errorVisible).toBe(true);
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Username and password do not match');
      });
    });

    test('Should fail login with invalid password', async ({ page }) => {
      await test.step('Attempt login with invalid password', async () => {
        await loginPage.login(config.validUsername, config.invalidPassword);
      });
      
      await test.step('Verify error message displayed', async () => {
        const errorVisible = await loginPage.isErrorMessageVisible();
        expect(errorVisible).toBe(true);
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Username and password do not match');
      });
    });

    test('Should fail login with both credentials invalid', async ({ page }) => {
      await test.step('Attempt login with both invalid credentials', async () => {
        await loginPage.login(config.invalidUsername, config.invalidPassword);
      });
      
      await test.step('Verify error message displayed', async () => {
        const errorVisible = await loginPage.isErrorMessageVisible();
        expect(errorVisible).toBe(true);
      });
    });

    test('Should fail login with empty username', async ({ page }) => {
      await test.step('Attempt login with empty username', async () => {
        await loginPage.login('', config.validPassword);
      });
      
      await test.step('Verify error message displayed', async () => {
        const errorVisible = await loginPage.isErrorMessageVisible();
        expect(errorVisible).toBe(true);
      });
    });

    test('Should fail login with empty password', async ({ page }) => {
      await test.step('Attempt login with empty password', async () => {
        await loginPage.login(config.validUsername, '');
      });
      
      await test.step('Verify error message displayed', async () => {
        const errorVisible = await loginPage.isErrorMessageVisible();
        expect(errorVisible).toBe(true);
      });
    });

    test('Should fail login with empty credentials', async ({ page }) => {
      await test.step('Attempt login with empty credentials', async () => {
        await loginPage.login('', '');
      });
      
      await test.step('Verify error message displayed', async () => {
        const errorVisible = await loginPage.isErrorMessageVisible();
        expect(errorVisible).toBe(true);
      });
    });
  });

  test.describe('Checkout Negative Tests', () => {
    test.beforeEach(async ({ page }) => {
      // Login with valid credentials
      await loginPage.login(config.validUsername, config.validPassword);
      
      const productsPage = new ProductsPage(page);
      const cartPage = new CartPage(page);
      
      // Add a product and go to cart
      await productsPage.addProductToCart();
      await productsPage.goToCart();
      
      // Proceed to checkout
      await cartPage.proceedToCheckout();
    });

    test('Should show error when checkout without zip code', async ({ page }) => {
      const checkoutPage = new CheckoutPage(page);
      
      await test.step('Fill partial checkout info (missing zip code)', async () => {
        await checkoutPage.enterPartialCheckoutInfo('John', 'Doe');
      });
      
      await test.step('Attempt to continue checkout', async () => {
        await checkoutPage.continueCheckout();
      });
      
      await test.step('Verify error message for missing zip code', async () => {
        const errorVisible = await checkoutPage.isErrorMessageVisible();
        expect(errorVisible).toBe(true);
        
        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toContain('Postal Code is required');
      });
    });

    test('Should show error when checkout without first name', async ({ page }) => {
      const checkoutPage = new CheckoutPage(page);
      
      await test.step('Fill only last name and zip code', async () => {
        await checkoutPage.fill('input[data-test="lastName"]', 'Doe');
        await checkoutPage.fill('input[data-test="postalCode"]', '12345');
      });
      
      await test.step('Attempt to continue checkout', async () => {
        await checkoutPage.continueCheckout();
      });
      
      await test.step('Verify error message displayed', async () => {
        const errorVisible = await checkoutPage.isErrorMessageVisible();
        expect(errorVisible).toBe(true);
      });
    });

    test('Should show error when checkout without last name', async ({ page }) => {
      const checkoutPage = new CheckoutPage(page);
      
      await test.step('Fill only first name and zip code', async () => {
        await checkoutPage.fill('input[data-test="firstName"]', 'John');
        await checkoutPage.fill('input[data-test="postalCode"]', '12345');
      });
      
      await test.step('Attempt to continue checkout', async () => {
        await checkoutPage.continueCheckout();
      });
      
      await test.step('Verify error message displayed', async () => {
        const errorVisible = await checkoutPage.isErrorMessageVisible();
        expect(errorVisible).toBe(true);
      });
    });

    test('Should show error when checkout with empty form', async ({ page }) => {
      const checkoutPage = new CheckoutPage(page);
      
      await test.step('Attempt to continue without filling any information', async () => {
        await checkoutPage.continueCheckout();
      });
      
      await test.step('Verify error message displayed', async () => {
        const errorVisible = await checkoutPage.isErrorMessageVisible();
        expect(errorVisible).toBe(true);
      });
    });
  });

  test('Should handle product not found scenario', async ({ page }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.login(config.validUsername, config.validPassword);
    });
    
    const productsPage = new ProductsPage(page);
    let errorThrown = false;
    let errorMessage = '';
    
    await test.step('Try to add non-existent product', async () => {
      try {
        await productsPage.addProductToCartByName('Non-Existent Product Name');
      } catch (error: any) {
        errorThrown = true;
        errorMessage = error.message;
      }
    });
    
    await test.step('Verify error was thrown for non-existent product', async () => {
      expect(errorThrown).toBe(true);
      expect(errorMessage).toContain('not found');
    });
  });
});
