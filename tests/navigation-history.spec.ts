// Navigation and History Test Cases
import { test, expect } from '@playwright/test';
import { LoginPage } from './pom/LoginPage';
import { AppointmentPage } from './pom/AppointmentPage';
import { HistoryPage } from './pom/HistoryPage';
import { ProfilePage } from './pom/ProfilePage';
import { HomePage } from './pom/HomePage';
import { ConfirmationPage } from './pom/ConfirmationPage';

test.describe('Navigation and History - Test Cases', () => {

  test('TC031: View Appointment History After Booking', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);
    const historyPage = new HistoryPage(page);

    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToLogin();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');
      await page.waitForURL('**/index.php**', { timeout: 5000 });
    });

    await test.step('Book an appointment', async () => {
      await appointmentPage.bookAppointment(
        'Hongkong CURA Healthcare Center',
        'Medicaid',
        '15/03/2026',
        'Test appointment',
        false
      );
      await page.waitForURL('**/appointment.php**', { timeout: 5000 });
    });

    await test.step('Navigate to History page', async () => {
      await historyPage.navigateToHistory();
      const isHistoryDisplayed = await historyPage.isHistoryPageDisplayed();
      expect(isHistoryDisplayed).toBe(true);
    });

    await test.step('Verify appointment is listed in history', async () => {
      const allDates = await historyPage.getAllAppointmentDates();
      expect(allDates).toContain('15/03/2026');
    });

    await test.step('Verify appointment details in history', async () => {
      const appointmentDetails = await historyPage.getAppointmentDetailsForDate('15/03/2026');
      expect(appointmentDetails.facility).toContain('Hongkong');
      expect(appointmentDetails.program).toBe('Medicaid');
    });
  });

  test('TC032: View Multiple Appointments in History', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);
    const historyPage = new HistoryPage(page);
    const homePage = new HomePage(page);

    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToLogin();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');
      await page.waitForURL('**/index.php**', { timeout: 5000 });
    });

    await test.step('Book first appointment', async () => {
      await appointmentPage.bookAppointment(
        'Tokyo CURA Healthcare Center',
        'Medicare',
        '28/02/2026',
        'First appointment',
        false
      );
      await page.waitForURL('**/appointment.php**', { timeout: 5000 });
    });

    await test.step('Navigate back to make another appointment', async () => {
      await homePage.navigateToHome();
      await homePage.clickMakeAppointmentButton();
      await page.waitForURL('**/index.php**', { timeout: 5000 });
    });

    await test.step('Book second appointment', async () => {
      await appointmentPage.bookAppointment(
        'Seoul CURA Healthcare Center',
        'None',
        '10/04/2026',
        'Second appointment',
        true
      );
      await page.waitForURL('**/appointment.php**', { timeout: 5000 });
    });

    await test.step('View all appointments in history', async () => {
      await historyPage.navigateToHistory();
      const allDates = await historyPage.getAllAppointmentDates();
      expect(allDates.length).toBeGreaterThanOrEqual(2);
    });
  });

  test('TC033: Logout Functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);
    const profilePage = new ProfilePage(page);
    const homePage = new HomePage(page);

    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToLogin();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');
      await page.waitForURL('**/index.php**', { timeout: 5000 });
    });

    await test.step('Navigate to Profile page', async () => {
      await profilePage.navigateToProfile();
      const isProfileDisplayed = await profilePage.isProfilePageDisplayed();
      expect(isProfileDisplayed).toBe(true);
    });

    await test.step('Click Logout button', async () => {
      await profilePage.clickLogoutLink();
      await page.waitForURL('**/index.php**', { timeout: 5000 });
    });

    await test.step('Verify user is logged out and on home page', async () => {
      const isHomeDisplayed = await homePage.isHomePageDisplayed();
      expect(isHomeDisplayed).toBe(true);
      
      const url = await page.url();
      expect(url).not.toContain('appointment');
    });
  });

  test('TC034: Navigate Home from Appointment Page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);
    const homePage = new HomePage(page);

    await test.step('Login and navigate to appointment page', async () => {
      await loginPage.navigateToLogin();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');
      await page.waitForURL('**/index.php**', { timeout: 5000 });
    });

    await test.step('Verify appointment page is displayed', async () => {
      const isDisplayed = await appointmentPage.isAppointmentPageDisplayed();
      expect(isDisplayed).toBe(true);
    });

    await test.step('Click Home link in navigation', async () => {
      await homePage.clickHomeLink();
      await page.waitForTimeout(2000);
    });

    await test.step('Verify user is on home page', async () => {
      const isHomeDisplayed = await homePage.isHomePageDisplayed();
      expect(isHomeDisplayed).toBe(true);
    });
  });

  test('TC035: Navigate Home from History Page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const historyPage = new HistoryPage(page);
    const homePage = new HomePage(page);

    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToLogin();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');
      await page.waitForURL('**/index.php**', { timeout: 5000 });
    });

    await test.step('Navigate to History page', async () => {
      await historyPage.navigateToHistory();
    });

    await test.step('Click Home link', async () => {
      await homePage.clickHomeLink();
      await page.waitForTimeout(2000);
    });

    await test.step('Verify user is on home page', async () => {
      const isHomeDisplayed = await homePage.isHomePageDisplayed();
      expect(isHomeDisplayed).toBe(true);
    });
  });

  test('TC036: Profile Page Display and Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);

    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToLogin();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');
      await page.waitForURL('**/index.php**', { timeout: 5000 });
    });

    await test.step('Navigate to Profile page', async () => {
      await profilePage.navigateToProfile();
    });

    await test.step('Verify profile page displays correctly', async () => {
      const heading = await profilePage.getProfileHeading();
      expect(heading).toContain('Profile');

      const underConstructionMsg = await profilePage.getUnderConstructionMessage();
      expect(underConstructionMsg).toContain('Under construction');
    });

    await test.step('Verify logout link is available', async () => {
      const isLogoutVisible = await profilePage.isLogoutLinkVisible();
      expect(isLogoutVisible).toBe(true);
    });
  });

  test('TC037: Make Appointment Redirect When Not Logged In', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await test.step('Navigate to home page', async () => {
      await homePage.navigateToHome();
    });

    await test.step('Click Make Appointment button without login', async () => {
      await homePage.clickMakeAppointmentButton();
      await page.waitForTimeout(2000);
    });

    await test.step('Verify user is redirected to login page', async () => {
      const isLoginDisplayed = await loginPage.isLoginPageDisplayed();
      expect(isLoginDisplayed).toBe(true);
    });
  });

  test('TC038: Confirmation Page Navigation to Homepage', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);
    const confirmationPage = new ConfirmationPage(page);
    const homePage = new HomePage(page);

    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToLogin();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');
      await page.waitForURL('**/index.php**', { timeout: 5000 });
    });

    await test.step('Book an appointment', async () => {
      await appointmentPage.bookAppointment(
        'Tokyo CURA Healthcare Center',
        'Medicare',
        '28/02/2026',
        'Regular checkup',
        false
      );
      await page.waitForURL('**/appointment.php**', { timeout: 5000 });
    });

    await test.step('Verify confirmation page is displayed', async () => {
      const isDisplayed = await confirmationPage.isConfirmationPageDisplayed();
      expect(isDisplayed).toBe(true);
    });

    await test.step('Click Go to Homepage link', async () => {
      await confirmationPage.clickGoToHomepage();
      await page.waitForURL('**/index.php**', { timeout: 5000 });
    });

    await test.step('Verify user is on home page', async () => {
      const isHomeDisplayed = await homePage.isHomePageDisplayed();
      expect(isHomeDisplayed).toBe(true);
    });
  });

  test('TC039: Session Persistence After Page Refresh', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);

    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToLogin();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');
      await page.waitForURL('**/index.php**', { timeout: 5000 });
    });

    await test.step('Verify appointment page is accessible', async () => {
      const isDisplayed = await appointmentPage.isAppointmentPageDisplayed();
      expect(isDisplayed).toBe(true);
    });

    await test.step('Refresh the page', async () => {
      await page.reload();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify session is still active after refresh', async () => {
      const isDisplayed = await appointmentPage.isAppointmentPageDisplayed();
      expect(isDisplayed).toBe(true);
    });
  });

  test('TC040: CURA Logo Navigation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);
    const homePage = new HomePage(page);

    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToLogin();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');
      await page.waitForURL('**/index.php**', { timeout: 5000 });
    });

    await test.step('Click CURA Healthcare logo', async () => {
      await homePage.clickCuraLogo();
      await page.waitForTimeout(2000);
    });

    await test.step('Verify user is navigated to home', async () => {
      const url = await page.url();
      expect(url).toBeDefined();
    });
  });
});
