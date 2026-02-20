// Page Object Model for Appointment Booking Page
import { BasePage } from './BasePage';

export class AppointmentPage extends BasePage {
  private readonly facilitySelect = 'select[id="combo_facility"]';
  private readonly hospitalReadmissionCheckbox = 'input[id="chk_hospotal_readmission"]';
  private readonly medicareRadio = 'input[value="Medicare"]';
  private readonly medicaidRadio = 'input[value="Medicaid"]';
  private readonly noneRadio = 'input[value="None"]';
  private readonly visitDateInput = 'input[id="txt_visit_date"]';
  private readonly commentTextarea = 'textarea[id="txt_comment"]';
  private readonly bookAppointmentButton = 'button[id="btn-book-appointment"]';
  private readonly makeAppointmentHeading = 'h2';

  async navigateToAppointment(): Promise<void> {
    await this.navigateTo('https://katalon-demo-cura.herokuapp.com/index.php#appointment');
  }

  async selectFacility(facilityName: string): Promise<void> {
    await this.selectOption(this.facilitySelect, facilityName);
  }

  async getSelectedFacility(): Promise<string> {
    const selectedOption = await this.page.inputValue(this.facilitySelect);
    return selectedOption || '';
  }

  async checkHospitalReadmission(): Promise<void> {
    const isChecked = await this.isCheckboxChecked(this.hospitalReadmissionCheckbox);
    if (!isChecked) {
      await this.click(this.hospitalReadmissionCheckbox);
    }
  }

  async uncheckHospitalReadmission(): Promise<void> {
    const isChecked = await this.isCheckboxChecked(this.hospitalReadmissionCheckbox);
    if (isChecked) {
      await this.click(this.hospitalReadmissionCheckbox);
    }
  }

  async isHospitalReadmissionChecked(): Promise<boolean> {
    return await this.isCheckboxChecked(this.hospitalReadmissionCheckbox);
  }

  async selectMedicare(): Promise<void> {
    await this.click(this.medicareRadio);
  }

  async selectMedicaid(): Promise<void> {
    await this.click(this.medicaidRadio);
  }

  async selectNone(): Promise<void> {
    await this.click(this.noneRadio);
  }

  async getSelectedHealthcareProgram(): Promise<string> {
    const medicareChecked = await this.page.isChecked(this.medicareRadio);
    if (medicareChecked) return 'Medicare';

    const medicaidChecked = await this.page.isChecked(this.medicaidRadio);
    if (medicaidChecked) return 'Medicaid';

    const noneChecked = await this.page.isChecked(this.noneRadio);
    if (noneChecked) return 'None';

    return '';
  }

  async enterVisitDate(date: string): Promise<void> {
    await this.fillText(this.visitDateInput, date);
  }

  async getVisitDateValue(): Promise<string> {
    return await this.getInputValue(this.visitDateInput);
  }

  async enterComment(comment: string): Promise<void> {
    await this.fillText(this.commentTextarea, comment);
  }

  async getCommentValue(): Promise<string> {
    const comment = await this.page.inputValue(this.commentTextarea);
    return comment || '';
  }

  async clickBookAppointmentButton(): Promise<void> {
    await this.click(this.bookAppointmentButton);
  }

  async bookAppointment(facility: string, program: string, visitDate: string, comment: string, readmission: boolean = false): Promise<void> {
    await this.selectFacility(facility);
    
    if (program === 'Medicare') {
      await this.selectMedicare();
    } else if (program === 'Medicaid') {
      await this.selectMedicaid();
    } else if (program === 'None') {
      await this.selectNone();
    }

    if (readmission) {
      await this.checkHospitalReadmission();
    } else {
      await this.uncheckHospitalReadmission();
    }

    await this.enterVisitDate(visitDate);
    await this.enterComment(comment);
    await this.clickBookAppointmentButton();
  }

  async isAppointmentPageDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.bookAppointmentButton);
  }

  async getMakeAppointmentHeading(): Promise<string> {
    return await this.getText(this.makeAppointmentHeading);
  }
}
