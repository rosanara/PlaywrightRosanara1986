// Page Object Model for Appointment Confirmation Page
import { BasePage } from './BasePage';

export class ConfirmationPage extends BasePage {
  private readonly confirmationHeading = 'h2';
  private readonly facilityValue = '#facility';
  private readonly readmissionValue = '#hospital_readmission';
  private readonly healthcareValue = '#program';
  private readonly visitDateValue = '#visit_date';
  private readonly commentValue = '#comment';
  private readonly goToHomepageLink = 'a:text("Go to Homepage")';

  async isConfirmationPageDisplayed(): Promise<boolean> {
    const title = await this.getPageTitle();
    return title.includes('CURA Healthcare Service');
  }

  async getConfirmationHeading(): Promise<string> {
    return await this.getText(this.confirmationHeading);
  }

  async getFacilityText(): Promise<string> {
    // Get facility value from the confirmation page
    const allText = await this.page.textContent('body');
    const facilityMatch = allText?.match(/Tokyo CURA Healthcare Center|Hongkong CURA Healthcare Center|Seoul CURA Healthcare Center/);
    return facilityMatch ? facilityMatch[0] : '';
  }

  async getHealthcareProgramText(): Promise<string> {
    // Get healthcare program from confirmation page
    const allText = await this.page.textContent('body');
    const programMatch = allText?.match(/Medicare|Medicaid|None/);
    return programMatch ? programMatch[0] : '';
  }

  async getReadmissionText(): Promise<string> {
    // Get readmission status from confirmation page
    const allText = await this.page.textContent('body');
    if (allText?.includes('Yes')) {
      return 'Yes';
    }
    return 'No';
  }

  async getVisitDateText(): Promise<string> {
    const allText = await this.page.textContent('body');
    const dateMatch = allText?.match(/\d{2}\/\d{2}\/\d{4}/);
    return dateMatch ? dateMatch[0] : '';
  }

  async getCommentText(): Promise<string> {
    const allText = await this.page.textContent('body');
    const lines = allText?.split('\n') || [];
    
    // Find comment section
    let commentIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i]?.trim() === 'Comment') {
        commentIndex = i + 1;
        break;
      }
    }
    return commentIndex >= 0 ? lines[commentIndex]?.trim() || '' : '';
  }

  async clickGoToHomepage(): Promise<void> {
    await this.page.click('a:has-text("Go to Homepage")');
  }

  async verifyConfirmationDetails(facility: string, program: string, visitDate: string, comment: string, readmission: string = 'No'): Promise<boolean> {
    const heading = await this.getConfirmationHeading();
    const facilityText = await this.getFacilityText();
    const programText = await this.getHealthcareProgramText();
    const dateText = await this.getVisitDateText();
    const readmissionText = await this.getReadmissionText();

    return heading.includes('Confirmation') &&
           facilityText.includes(facility) &&
           programText === program &&
           dateText === visitDate &&
           readmissionText === readmission;
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }
}
