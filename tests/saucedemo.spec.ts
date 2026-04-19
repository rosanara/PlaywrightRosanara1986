import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Interface for login test data
interface LoginTestData {
  username: string;
  password: string;
  isValid: boolean;
  expectedItemCount?: number;
  expectedErrorMessage?: string;
}

// Reusable method to handle both valid and invalid login scenarios
async function performLoginTest(page, loginData: LoginTestData) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  
  // Perform login
  await loginPage.login(loginData.username, loginData.password);
  
  if (loginData.isValid) {
    // For valid login, wait for inventory to load and verify items count
    await loginPage.waitForInventory();
    const itemsCount = await loginPage.getInventoryItemsCount();
    return {
      success: true,
      itemsCount: itemsCount,
      expectedItemsCount: loginData.expectedItemCount,
    };
  } else {
    // For invalid login, wait for error message and verify it
    await loginPage.waitForError();
    const errorMessage = await loginPage.getErrorMessage();
    return {
      success: false,
      errorMessage: errorMessage,
      expectedError: loginData.expectedErrorMessage,
    };
  }
}

test.describe('SauceDemo Login Tests', () => {
  
  test('Valid Login - Standard User', async ({ page }) => {
    const testData: LoginTestData = {
      username: 'standard_user',
      password: 'secret_sauce',
      isValid: true,
      expectedItemCount: 6, // Sauce Demo has 6 products
    };

    const result = await performLoginTest(page, testData);

    expect(result.success).toBe(true);
    expect(result.itemsCount).toBe(result.expectedItemsCount);
    console.log(`✓ Successfully logged in. Found ${result.itemsCount} items in inventory`);
  });

  test('Valid Login - Verify Inventory Items After Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    // Login with valid credentials
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.waitForInventory();

    // Verify inventory is loaded
    const isInventoryLoaded = await loginPage.isInventoryLoaded();
    expect(isInventoryLoaded).toBe(true);

    // Verify the total number of items
    const itemsCount = await loginPage.getInventoryItemsCount();
    expect(itemsCount).toBe(6);

    // Verify each item has required elements
    const inventoryItems = page.locator('.inventory_item');
    for (let i = 0; i < itemsCount; i++) {
      const item = inventoryItems.nth(i);
      const itemName = item.locator('.inventory_item_name');
      const itemPrice = item.locator('.inventory_item_price');
      
      expect(await itemName.isVisible()).toBe(true);
      expect(await itemPrice.isVisible()).toBe(true);
    }

    console.log(`✓ Verified ${itemsCount} inventory items are present with complete details`);
  });

  test('Invalid Login - Incorrect Password', async ({ page }) => {
    const testData: LoginTestData = {
      username: 'standard_user',
      password: 'wrong_password',
      isValid: false,
      expectedErrorMessage: 'Username and password do not match any user in this service',
    };

    const result = await performLoginTest(page, testData);

    expect(result.success).toBe(false);
    expect(result.errorMessage).toContain('Username and password do not match');
    console.log(`✓ Correctly displayed error message: ${result.errorMessage}`);
  });

  test('Invalid Login - Incorrect Username', async ({ page }) => {
    const testData: LoginTestData = {
      username: 'invalid_user',
      password: 'secret_sauce',
      isValid: false,
    };

    const result = await performLoginTest(page, testData);

    expect(result.success).toBe(false);
    expect(result.errorMessage).toContain('Username and password do not match');
    console.log(`✓ Correctly displayed error message for invalid username`);
  });

  test('Invalid Login - Empty Username and Password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Click login without entering credentials
    await loginPage.loginButton.click();
    await loginPage.waitForError();

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username is required');
    console.log(`✓ Error message for empty fields: ${errorMessage}`);
  });

  test('Invalid Login - Empty Password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Enter username but not password
    await loginPage.usernameInput.fill('standard_user');
    await loginPage.loginButton.click();
    await loginPage.waitForError();

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Password is required');
    console.log(`✓ Error message for empty password: ${errorMessage}`);
  });

  test('Valid Login - Verify Page Title After Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.waitForInventory();

    // Verify the page title/header
    const pageTitle = page.locator('[data-test="title"]');
    expect(await pageTitle.isVisible()).toBe(true);
    expect(await pageTitle.textContent()).toContain('Products');

    console.log('✓ Successfully verified page title after login');
  });
});
