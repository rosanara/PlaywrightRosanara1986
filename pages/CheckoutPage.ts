import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  private firstNameInput: string;
  private lastNameInput: string;
  private zipCodeInput: string;
  private continueButton: string;
  private finishButton: string;
  private successMessage: string;
  private errorMessage: string;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = 'input[data-test="firstName"]';
    this.lastNameInput = 'input[data-test="lastName"]';
    this.zipCodeInput = 'input[data-test="postalCode"]';
    this.continueButton = 'input[data-test="continue"]';
    this.finishButton = 'button[data-test="finish"]';
    this.successMessage = 'text=Thank you for your order!';
    this.errorMessage = '[data-test="error"]';
  }

  async enterCheckoutInfo(firstName: string, lastName: string, zipCode: string) {
    // Use sequential fills with delays to ensure proper form population
    await this.fill(this.firstNameInput, firstName);
    await new Promise(resolve => setTimeout(resolve, 100));
    
    await this.fill(this.lastNameInput, lastName);
    await new Promise(resolve => setTimeout(resolve, 100));
    
    await this.fill(this.zipCodeInput, zipCode);
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  async continueCheckout() {
    await this.click(this.continueButton);
  }

  async finishCheckout() {
    await this.click(this.finishButton);
  }

  async isSuccessMessageVisible() {
    const timeoutPromise = new Promise<boolean>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout: Success message visibility check exceeded 10000ms')), 10000)
    );
    
    try {
      return await Promise.race([
        this.isVisible(this.successMessage),
        timeoutPromise
      ]);
    } catch (error: any) {
      if (error.message.includes('Timeout')) {
        console.warn(error.message);
        return false;
      }
      throw error;
    }
  }

  async getSuccessMessage() {
    const timeoutPromise = new Promise<string>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout: Getting success message exceeded 10000ms')), 10000)
    );
    
    try {
      return await Promise.race([
        this.getText(this.successMessage),
        timeoutPromise
      ]);
    } catch (error: any) {
      if (error.message.includes('Timeout')) {
        throw new Error(`Success message retrieval timed out: ${error.message}`);
      }
      throw error;
    }
  }

  async isErrorMessageVisible() {
    return await this.isVisible(this.errorMessage);
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  async enterPartialCheckoutInfo(firstName: string, lastName: string) {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    // Note: Zip code is intentionally not filled for negative test
  }
}
