// Page Object Model for Appointment History Page
import { BasePage } from './BasePage';

export class HistoryPage extends BasePage {
  private readonly historyHeading = 'h2';
  private readonly appointmentItems = '.appointment-item';

  async navigateToHistory(): Promise<void> {
    await this.navigateTo('https://katalon-demo-cura.herokuapp.com/history.php');
  }

  async isHistoryPageDisplayed(): Promise<boolean> {
    try {
      const heading = await this.getText(this.historyHeading);
      return heading.includes('History');
    } catch {
      return false;
    }
  }

  async getHistoryHeading(): Promise<string> {
    return await this.getText(this.historyHeading);
  }

  async getAllAppointmentDates(): Promise<string[]> {
    const dates: string[] = [];
    const bodyText = await this.page.textContent('body');
    
    if (bodyText) {
      const dateMatches = bodyText.match(/\d{2}\/\d{2}\/\d{4}/g);
      if (dateMatches) {
        return dateMatches;
      }
    }
    return dates;
  }

  async getAppointmentDetailsForDate(date: string): Promise<{
    facility: string;
    program: string;
    readmission: string;
    comment: string;
  }> {
    const bodyText = await this.page.textContent('body');
    let facility = '';
    let program = '';
    let readmission = '';
    let comment = '';

    if (bodyText) {
      const facilityMatch = bodyText.match(/Tokyo CURA Healthcare Center|Hongkong CURA Healthcare Center|Seoul CURA Healthcare Center/);
      if (facilityMatch) facility = facilityMatch[0];

      const programMatch = bodyText.match(/Medicare|Medicaid|None/);
      if (programMatch) program = programMatch[0];

      if (bodyText.includes('Yes')) readmission = 'Yes';
      else if (bodyText.includes('No')) readmission = 'No';
    }

    return { facility, program, readmission, comment };
  }

  async verifyAppointmentInHistory(date: string, facility: string, program: string): Promise<boolean> {
    const allDates = await this.getAllAppointmentDates();
    const appointmentDetails = await this.getAppointmentDetailsForDate(date);

    return allDates.includes(date) &&
           appointmentDetails.facility.includes(facility) &&
           appointmentDetails.program === program;
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  async getAppointmentCount(): Promise<number> {
    const allDates = await this.getAllAppointmentDates();
    return allDates.length;
  }
}
