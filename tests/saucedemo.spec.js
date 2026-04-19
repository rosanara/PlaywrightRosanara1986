const { test, expect } = require('@playwright/test');

/**
 * SauceDemo Login Test Suite
 * Tests for both valid and invalid login scenarios
 */

// Test credentials
const VALID_CREDENTIALS = {
  username: 'standard_user',
  password: 'secret_sauce',
};

const INVALID_CREDENTIALS = {
  username: 'invalid_user',
  password: 'invalid_password',
};

/**
 * Helper method to perform login with provided credentials
 * @param {Page} page - Playwright page object
 * @param {string} username - Username to login with
 * @param {string} password - Password to login with
 * @param {boolean} expectSuccess - Whether login should succeed or fail
 */
async function performLogin(page, username, password, expectSuccess = true) {
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');
  
  // Wait for the login form to be visible
  await page.waitForSelector('[data-test="username"]', { timeout: 5000 });
  
  // Fill in credentials
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', password);
  
  // Click the login button
  await page.click('[data-test="login-button"]');
  
  if (expectSuccess) {
    // Wait for inventory page to load after successful login
    await page.waitForSelector('[data-test="inventory-container"]', { timeout: 5000 });
  } else {
    // Wait for error message to appear on failed login
    await page.waitForSelector('[data-test="error"]', { timeout: 5000 });
  }
}

test.describe('SauceDemo Login Tests', () => {
  
  test('Valid Login - Should login successfully with correct credentials', async ({ page }) => {
    // Perform valid login
    await performLogin(page, VALID_CREDENTIALS.username, VALID_CREDENTIALS.password, true);
    
    // Verify user is on the inventory page
    const inventoryContainer = await page.locator('[data-test="inventory-container"]');
    await expect(inventoryContainer).toBeVisible();
    
    // Verify the title
    const pageTitle = page.locator('.title');
    await expect(pageTitle).toContainText('Products');
  });

  test('Valid Login - Verify inventory items count', async ({ page }) => {
    // Perform valid login
    await performLogin(page, VALID_CREDENTIALS.username, VALID_CREDENTIALS.password, true);
    
    // Get all inventory items
    const inventoryItems = page.locator('[data-test="inventory-item"]');
    const itemCount = await inventoryItems.count();
    
    console.log(`Total inventory items after login: ${itemCount}`);
    
    // Verify items are displayed (SauceDemo typically has 6 items)
    expect(itemCount).toBeGreaterThan(0);
    expect(itemCount).toBe(6); // SauceDemo has 6 products by default
    
    // Verify each item has name and price
    for (let i = 0; i < itemCount; i++) {
      const itemName = page.locator('[data-test="inventory-item-name"]').nth(i);
      const itemPrice = page.locator('[data-test="inventory-item-price"]').nth(i);
      
      await expect(itemName).toBeVisible();
      await expect(itemPrice).toBeVisible();
    }
  });

  test('Invalid Login - Should display error message with incorrect credentials', async ({ page }) => {
    // Perform invalid login
    await performLogin(page, INVALID_CREDENTIALS.username, INVALID_CREDENTIALS.password, false);
    
    // Get the error message
    const errorMessage = page.locator('[data-test="error"]');
    
    // Verify error message is visible
    await expect(errorMessage).toBeVisible();
    
    // Verify error message contains expected text
    const errorText = await errorMessage.textContent();
    console.log(`Error message: ${errorText}`);
    
    expect(errorText).toContain('Username and password do not match any user');
    
    // Verify user is still on login page (not redirected to inventory)
    const loginForm = page.locator('[data-test="login-button"]');
    await expect(loginForm).toBeVisible();
  });

  test('Invalid Login - Empty username field', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Wait for the login form
    await page.waitForSelector('[data-test="username"]', { timeout: 5000 });
    
    // Only fill password, leave username empty
    await page.fill('[data-test="password"]', 'some_password');
    
    // Click login button
    await page.click('[data-test="login-button"]');
    
    // Wait for error message
    await page.waitForSelector('[data-test="error"]', { timeout: 5000 });
    
    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    
    const errorText = await errorMessage.textContent();
    expect(errorText).toContain('Username is required');
  });

  test('Invalid Login - Empty password field', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Wait for the login form
    await page.waitForSelector('[data-test="username"]', { timeout: 5000 });
    
    // Only fill username, leave password empty
    await page.fill('[data-test="username"]', VALID_CREDENTIALS.username);
    
    // Click login button
    await page.click('[data-test="login-button"]');
    
    // Wait for error message
    await page.waitForSelector('[data-test="error"]', { timeout: 5000 });
    
    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    
    const errorText = await errorMessage.textContent();
    expect(errorText).toContain('Password is required');
  });

  test('Test cleared username/password fields', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Wait for the login form
    await page.waitForSelector('[data-test="username"]', { timeout: 5000 });
    
    // Verify form fields are empty initially
    const usernameField = page.locator('[data-test="username"]');
    const passwordField = page.locator('[data-test="password"]');
    
    await expect(usernameField).toHaveValue('');
    await expect(passwordField).toHaveValue('');
  });
});
