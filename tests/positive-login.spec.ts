// Positive Test Cases - Login Functionality
import { test, expect } from '@playwright/test';
import { LoginPage } from './pom/LoginPage';
import { AppointmentPage } from './pom/AppointmentPage';
import { HomePage } from './pom/HomePage';
import { ProfilePage } from './pom/ProfilePage';

test.describe('Login - Positive Test Cases', () => {
  
  test('TC001: Valid Login with Correct Credentials', async ({ page }) => {
    // Setup
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);

    // Test Steps
    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLogin();
      const isDisplayed = await loginPage.isLoginPageDisplayed();
      expect(isDisplayed).toBe(true);
    });

    await test.step('Enter valid username', async () => {
      await loginPage.enterUsername('John Doe');
      const username = await loginPage.getUsernameValue();
      expect(username).toBe('John Doe');
    });

    await test.step('Enter valid password', async () => {
      await loginPage.enterPassword('ThisIsNotAPassword');
      const password = await loginPage.getPasswordValue();
      expect(password).toBe('ThisIsNotAPassword');
    });

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
      const isAppointmentPageDisplayed = await appointmentPage.isAppointmentPageDisplayed();
      expect(isAppointmentPageDisplayed).toBe(true);
    });

    await test.step('Verify user is logged in', async () => {
      const url = await appointmentPage.getPageUrl();
      expect(url).toContain('index.php');
    });
  });

  test('TC002: Login Page Elements Visibility', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLogin();
    });

    await test.step('Verify login page displays all required elements', async () => {
      const isLoginPageDisplayed = await loginPage.isLoginPageDisplayed();
      expect(isLoginPageDisplayed).toBe(true);

      const pageTitle = await loginPage.getPageTitle();
      expect(pageTitle).toContain('CURA Healthcare Service');

      const heading = await loginPage.getLoginHeadingText();
      expect(heading).toContain('Login');
    });
  });

  test('TC003: Verify Demo Account Information Display', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLogin();
    });

    await test.step('Verify demo account section is visible', async () => {
      const isDisplayed = await loginPage.isLoginPageDisplayed();
      expect(isDisplayed).toBe(true);

      const pageUrl = await page.url();
      expect(pageUrl).toContain('profile.php');
    });
  });
});
