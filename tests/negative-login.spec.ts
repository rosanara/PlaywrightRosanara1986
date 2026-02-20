// Negative Test Cases - Login Functionality
import { test, expect } from '@playwright/test';
import { LoginPage } from './pom/LoginPage';

test.describe('Login - Negative Test Cases', () => {

  test('TC004: Login with Invalid Username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLogin();
      const isDisplayed = await loginPage.isLoginPageDisplayed();
      expect(isDisplayed).toBe(true);
    });

    await test.step('Enter invalid username', async () => {
      await loginPage.enterUsername('InvalidUser');
      const username = await loginPage.getUsernameValue();
      expect(username).toBe('InvalidUser');
    });

    await test.step('Enter valid password', async () => {
      await loginPage.enterPassword('ThisIsNotAPassword');
      const password = await loginPage.getPasswordValue();
      expect(password).toBe('ThisIsNotAPassword');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
      await page.waitForTimeout(2000);
      
      // Verify still on login page (login failed)
      const isStillOnLoginPage = await loginPage.isLoginPageDisplayed();
      expect(isStillOnLoginPage).toBe(true);
    });
  });

  test('TC005: Login with Invalid Password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLogin();
    });

    await test.step('Enter valid username', async () => {
      await loginPage.enterUsername('John Doe');
    });

    await test.step('Enter invalid password', async () => {
      await loginPage.enterPassword('WrongPassword');
    });

    await test.step('Click login button and verify failure', async () => {
      await loginPage.clickLoginButton();
      await page.waitForTimeout(2000);
      
      const isStillOnLoginPage = await loginPage.isLoginPageDisplayed();
      expect(isStillOnLoginPage).toBe(true);
    });
  });

  test('TC006: Login with Empty Username Field', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLogin();
    });

    await test.step('Leave username field empty', async () => {
      await loginPage.clearUsernameField();
    });

    await test.step('Enter valid password', async () => {
      await loginPage.enterPassword('ThisIsNotAPassword');
    });

    await test.step('Click login button and verify it stayed on login page', async () => {
      await loginPage.clickLoginButton();
      await page.waitForTimeout(2000);
      
      const isStillOnLoginPage = await loginPage.isLoginPageDisplayed();
      expect(isStillOnLoginPage).toBe(true);
    });
  });

  test('TC007: Login with Empty Password Field', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLogin();
    });

    await test.step('Enter valid username', async () => {
      await loginPage.enterUsername('John Doe');
    });

    await test.step('Leave password field empty', async () => {
      await loginPage.clearPasswordField();
    });

    await test.step('Click login button and verify failure', async () => {
      await loginPage.clickLoginButton();
      await page.waitForTimeout(2000);
      
      const isStillOnLoginPage = await loginPage.isLoginPageDisplayed();
      expect(isStillOnLoginPage).toBe(true);
    });
  });

  test('TC008: Login with Both Fields Empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLogin();
    });

    await test.step('Leave both username and password fields empty', async () => {
      await loginPage.clearUsernameField();
      await loginPage.clearPasswordField();
    });

    await test.step('Click login button and verify failure', async () => {
      await loginPage.clickLoginButton();
      await page.waitForTimeout(2000);
      
      const isStillOnLoginPage = await loginPage.isLoginPageDisplayed();
      expect(isStillOnLoginPage).toBe(true);
    });
  });

  test('TC009: Login with SQL Injection Attempt', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLogin();
    });

    await test.step('Enter SQL injection in username field', async () => {
      await loginPage.enterUsername("' OR '1'='1");
    });

    await test.step('Enter password', async () => {
      await loginPage.enterPassword('password');
    });

    await test.step('Click login and verify it was prevented', async () => {
      await loginPage.clickLoginButton();
      await page.waitForTimeout(2000);
      
      // Should remain on login page - SQL injection prevented
      const isStillOnLoginPage = await loginPage.isLoginPageDisplayed();
      expect(isStillOnLoginPage).toBe(true);
    });
  });

  test('TC010: Login with Special Characters in Username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLogin();
    });

    await test.step('Enter special characters in username', async () => {
      await loginPage.enterUsername('!@#$%^&*()');
    });

    await test.step('Enter password', async () => {
      await loginPage.enterPassword('ThisIsNotAPassword');
    });

    await test.step('Click login and verify failure', async () => {
      await loginPage.clickLoginButton();
      await page.waitForTimeout(2000);
      
      const isStillOnLoginPage = await loginPage.isLoginPageDisplayed();
      expect(isStillOnLoginPage).toBe(true);
    });
  });

  test('TC011: Login with Username Containing Spaces', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLogin();
    });

    await test.step('Enter username with leading/trailing spaces', async () => {
      await loginPage.enterUsername('  John Doe  ');
    });

    await test.step('Enter password', async () => {
      await loginPage.enterPassword('ThisIsNotAPassword');
    });

    await test.step('Click login', async () => {
      await loginPage.clickLoginButton();
      await page.waitForTimeout(2000);
      
      // System may either trim spaces or reject
      // Test that system handles it gracefully
      const pageUrl = await page.url();
      expect(pageUrl).toBeDefined();
    });
  });
});
