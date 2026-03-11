// Page Object Model for Home Page
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private readonly homePageHeading = 'h1';
  private readonly makeAppointmentButton = 'a:text("Make Appointment")';
  private readonly loginLink = 'a:text("Login")';
  private readonly homeLink = 'a:text("Home")';
  private readonly curaLogoLink = '.navbar-brand';

  async navigateToHome(): Promise<void> {
    await this.navigateTo('https://katalon-demo-cura.herokuapp.com/');
  }

  async isHomePageDisplayed(): Promise<boolean> {
    try {
      const heading = await this.getText(this.homePageHeading);
      return heading.includes('CURA Healthcare Service');
    } catch {
      return false;
    }
  }

  async getHomePageHeading(): Promise<string> {
    return await this.getText(this.homePageHeading);
  }

  async clickMakeAppointmentButton(): Promise<void> {
    await this.page.click('a:has-text("Make Appointment")');
  }

  async clickLoginLink(): Promise<void> {
    await this.page.click('a:has-text("Login")');
  }

  async clickHomeLink(): Promise<void> {
   await this.page.getByRole('link', { name: '' }).click(); // open menu
    await this.page.click('a:has-text("Home")');
  }

  async clickCuraLogo(): Promise<void> {
    //await this.click(this.curaLogoLink);
     await this.page.getByRole('link', { name: '' }).click(); // open menu
    await this.page.getByRole('link', { name: 'CURA Healthcare' }).click();
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
