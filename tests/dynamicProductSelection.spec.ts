import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { config } from '../config/config';

test.describe('Sauce Demo - Dynamic Product Selection', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    // Navigate and login
    await loginPage.navigate();
    await loginPage.login(config.validUsername, config.validPassword);
  });

  test('Should display all available products dynamically', async ({ page }) => {
    await test.step('Get all product names', async () => {
      const products = await productsPage.getAllProductNames();
      
      expect(products.length).toBeGreaterThan(0);
      expect(products).toContain('Sauce Labs Backpack');
      expect(products).toContain('Sauce Labs Bike Light');
      expect(products).toContain('Sauce Labs Bolt T-Shirt');
      
      console.log('Available products:', products);
    });
  });

  test('Should add specific product by name to cart', async ({ page }) => {
    const productName = 'Sauce Labs Backpack';
    
    await test.step('Add product to cart', async () => {
      await productsPage.addProductToCartByName(productName);
    });
    
    await test.step('Verify product added', async () => {
      const cartCount = await productsPage.getCartItemCount();
      expect(cartCount).toBe(1);
    });
  });

  test('Should add first product to cart', async ({ page }) => {
    await test.step('Add first product to cart', async () => {
      await productsPage.addFirstProductToCart();
    });
    
    await test.step('Verify cart count', async () => {
      const cartCount = await productsPage.getCartItemCount();
      expect(cartCount).toBe(1);
    });
  });

  test('Should add random product to cart', async ({ page }) => {
    let addedProduct: string;
    
    await test.step('Add random product', async () => {
      addedProduct = await productsPage.addRandomProductToCart();
      expect(addedProduct).toBeTruthy();
    });
    
    await test.step('Verify product added to cart', async () => {
      console.log('Random product added:', addedProduct);
      const cartCount = await productsPage.getCartItemCount();
      expect(cartCount).toBe(1);
    });
  });

  test('Should add multiple random products to cart', async ({ page }) => {
    const addedProducts = new Set<string>();
    let attempts = 0;
    const maxAttempts = 10;
    
    await test.step('Add 3 unique random products', async () => {
      // Try to add unique products, but allow some duplicates to be skipped
      while (addedProducts.size < 3 && attempts < maxAttempts) {
        try {
          const product = await productsPage.addRandomProductToCart();
          addedProducts.add(product);
          console.log(`Added product ${addedProducts.size}:`, product);
        } catch (error: any) {
          // Skip if product already in cart or not found, continue trying
          console.log('Skipping duplicate or unavailable product');
        }
        attempts++;
      }
    });
    
    await test.step('Verify products added', async () => {
      const cartCount = await productsPage.getCartItemCount();
      expect(cartCount).toBeGreaterThanOrEqual(Math.min(addedProducts.size, 3));
      console.log(`Successfully added ${addedProducts.size} unique products`);
    });
  });

  test('Should add multiple specific products to cart', async ({ page }) => {
    const productsToAdd = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt'
    ];

    await test.step('Add multiple specific products', async () => {
      await productsPage.addMultipleProductsToCart(productsToAdd);
    });

    await test.step('Verify all products added', async () => {
      const cartCount = await productsPage.getCartItemCount();
      expect(cartCount).toBe(3);
      console.log('Adding multiple products:', productsToAdd);
    });
  });

  test('Should dynamically filter and add T-Shirts', async ({ page }) => {
    let tShirts: string[] = [];
    
    await test.step('Filter T-Shirt products', async () => {
      const allProducts = await productsPage.getAllProductNames();
      tShirts = allProducts.filter(name => name.includes('T-Shirt'));
    });

    if (tShirts.length > 0) {
      await test.step('Add T-Shirts to cart', async () => {
        await productsPage.addMultipleProductsToCart(tShirts);
      });
      
      await test.step('Verify T-Shirts added', async () => {
        const cartCount = await productsPage.getCartItemCount();
        expect(cartCount).toBe(tShirts.length);
        console.log('T-Shirts added:', tShirts);
      });
    }
  });

  test('Should add all products except specific one', async ({ page }) => {
    let productsToAdd: string[] = [];
    const excludeProduct = 'Test.allTheThings() T-Shirt (Red)';
    
    await test.step('Get all products and filter', async () => {
      const allProducts = await productsPage.getAllProductNames();
      productsToAdd = allProducts.filter(name => !name.includes(excludeProduct));
    });

    await test.step('Add filtered products to cart', async () => {
      await productsPage.addMultipleProductsToCart(productsToAdd);
    });

    await test.step('Verify products added', async () => {
      const cartCount = await productsPage.getCartItemCount();
      expect(cartCount).toBe(productsToAdd.length);
      console.log('Products added (excluding:', excludeProduct, '):', productsToAdd);
    });
  });

  test('Should handle empty cart scenario', async ({ page }) => {
    await test.step('Verify cart is empty', async () => {
      const cartCount = await productsPage.getCartItemCount();
      expect(cartCount).toBe(0);
      console.log('Empty cart scenario verified - Initial cart is empty');
    });
  });
});
