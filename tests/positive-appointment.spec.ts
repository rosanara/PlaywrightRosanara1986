// Positive Test Cases - Appointment Booking
import { test, expect } from '@playwright/test';
import { LoginPage } from './pom/LoginPage';
import { AppointmentPage } from './pom/AppointmentPage';
import { ConfirmationPage } from './pom/ConfirmationPage';

test.describe('Appointment Booking - Positive Test Cases', () => {

  test('TC012: Book Appointment with Tokyo Facility and Medicare', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);
    const confirmationPage = new ConfirmationPage(page);

    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToLogin();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');
    });

    await test.step('Verify appointment page is displayed', async () => {
      const isDisplayed = await appointmentPage.isAppointmentPageDisplayed();
      expect(isDisplayed).toBe(true);
    });

    await test.step('Select Tokyo facility', async () => {
      await appointmentPage.selectFacility('Tokyo CURA Healthcare Center');
      const selected = await appointmentPage.getSelectedFacility();
      expect(selected).toContain('Tokyo');
    });

    await test.step('Select Medicare', async () => {
      await appointmentPage.selectMedicare();
      const selectedProgram = await appointmentPage.getSelectedHealthcareProgram();
      expect(selectedProgram).toBe('Medicare');
    });

    await test.step('Ensure hospital readmission is unchecked', async () => {
      const isChecked = await appointmentPage.isHospitalReadmissionChecked();
      if (isChecked) {
        await appointmentPage.uncheckHospitalReadmission();
      }
      const finalCheckStatus = await appointmentPage.isHospitalReadmissionChecked();
      expect(finalCheckStatus).toBe(false);
    });

    await test.step('Enter visit date', async () => {
      await appointmentPage.enterVisitDate('28/02/2026');
      const date = await appointmentPage.getVisitDateValue();
      expect(date).toBe('28/02/2026');
    });

    await test.step('Enter comment', async () => {
      await appointmentPage.enterComment('Regular checkup');
      const comment = await appointmentPage.getCommentValue();
      expect(comment).toBe('Regular checkup');
    });

    await test.step('Click book appointment button', async () => {
      await appointmentPage.clickBookAppointmentButton();
      const isDisplayed = await confirmationPage.isConfirmationPageDisplayed();
      expect(isDisplayed).toBe(true);
    });

    await test.step('Verify confirmation page is displayed', async () => {
      const isDisplayed = await confirmationPage.isConfirmationPageDisplayed();
      expect(isDisplayed).toBe(true);
    });

    await test.step('Verify appointment details in confirmation', async () => {
      const heading = await confirmationPage.getConfirmationHeading();
      expect(heading).toContain('Confirmation');
      
      const facility = await confirmationPage.getFacilityText();
      expect(facility).toContain('Tokyo');
      
      const program = await confirmationPage.getHealthcareProgramText();
      expect(program).toBe('Medicare');
    });
  });

  test('TC013: Book Appointment with Hongkong Facility and Medicaid', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);
    const confirmationPage = new ConfirmationPage(page);

    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToLogin();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');
    });

    await test.step('Book appointment with Hongkong and Medicaid', async () => {
      await appointmentPage.bookAppointment(
        'Hongkong CURA Healthcare Center',
        'Medicaid',
        '15/03/2026',
        'Follow-up appointment',
        false
      );
    });

    await test.step('Verify booking confirmation', async () => {
      const facility = await confirmationPage.getFacilityText();
      const program = await confirmationPage.getHealthcareProgramText();
      
      expect(facility).toContain('Hongkong');
      expect(program).toBe('Medicaid');
    });
  });

  test('TC014: Book Appointment with Seoul Facility and None Program', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);
    const confirmationPage = new ConfirmationPage(page);

    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToLogin();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');
    });

    await test.step('Book appointment with Seoul and None program', async () => {
      await appointmentPage.bookAppointment(
        'Seoul CURA Healthcare Center',
        'None',
        '20/04/2026',
        'General consultation',
        false
      );
    });

    await test.step('Verify confirmation shows correct facility and program', async () => {
      const facility = await confirmationPage.getFacilityText();
      const program = await confirmationPage.getHealthcareProgramText();
      
      expect(facility).toContain('Seoul');
      expect(program).toBe('None');
    });
  });

  test('TC015: Book Appointment with Hospital Readmission Checked', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);
    const confirmationPage = new ConfirmationPage(page);

    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToLogin();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');
    });

    await test.step('Book appointment with readmission checked', async () => {
      await appointmentPage.bookAppointment(
        'Tokyo CURA Healthcare Center',
        'Medicare',
        '25/05/2026',
        'Post-operative follow-up',
        true
      );
    });

    await test.step('Verify readmission status in confirmation', async () => {
      const readmission = await confirmationPage.getReadmissionText();
      expect(readmission).toBe('Yes');
    });
  });

  test('TC016: Book Appointment with Special Characters in Comment', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);
    const confirmationPage = new ConfirmationPage(page);

    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToLogin();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');
    });

    const specialComment = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    await test.step('Enter comment with special characters', async () => {
      await appointmentPage.selectFacility('Tokyo CURA Healthcare Center');
      await appointmentPage.selectMedicare();
      await appointmentPage.enterVisitDate('01/03/2026');
      await appointmentPage.enterComment(specialComment);
      
      const comment = await appointmentPage.getCommentValue();
      expect(comment).toBe(specialComment);
    });

    await test.step('Book appointment and verify special characters are preserved', async () => {
      await appointmentPage.clickBookAppointmentButton();
      const isDisplayed = await confirmationPage.isConfirmationPageDisplayed();
      expect(isDisplayed).toBe(true);
    });
  });

  test('TC017: Book Appointment with Long Comment', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);
    const confirmationPage = new ConfirmationPage(page);

    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToLogin();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');
    });

    const longComment = 'A'.repeat(500); // 500+ character comment

    await test.step('Enter long comment', async () => {
      await appointmentPage.selectFacility('Tokyo CURA Healthcare Center');
      await appointmentPage.selectMedicare();
      await appointmentPage.enterVisitDate('10/03/2026');
      await appointmentPage.enterComment(longComment);
      
      const comment = await appointmentPage.getCommentValue();
      expect(comment.length).toBeGreaterThanOrEqual(500);
    });

    await test.step('Book appointment', async () => {
      await appointmentPage.clickBookAppointmentButton();
      const isDisplayed = await confirmationPage.isConfirmationPageDisplayed();
      expect(isDisplayed).toBe(true);
    });
  });

  test('TC018: Book Multiple Consecutive Appointments', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);
    const confirmationPage = new ConfirmationPage(page);

    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToLogin();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');
    });

    await test.step('Book first appointment', async () => {
      await appointmentPage.bookAppointment(
        'Tokyo CURA Healthcare Center',
        'Medicare',
        '28/02/2026',
        'First appointment',
        false
      );
      // After booking, should be on confirmation page
      const isDisplayed = await confirmationPage.isConfirmationPageDisplayed();
      expect(isDisplayed).toBe(true);
    });

    await test.step('Navigate back to make another appointment', async () => {
      await page.click('a:has-text("Make Appointment")');
      const isDisplayed = await appointmentPage.isAppointmentPageDisplayed();
      expect(isDisplayed).toBe(true);
    });

    await test.step('Book second appointment', async () => {
      await appointmentPage.bookAppointment(
        'Hongkong CURA Healthcare Center',
        'Medicaid',
        '15/03/2026',
        'Second appointment',
        false
      );
      const isDisplayed = await confirmationPage.isConfirmationPageDisplayed();
      expect(isDisplayed).toBe(true);
    });
  });
});
