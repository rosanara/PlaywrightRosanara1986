// Page Object Model for Profile Page
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  private readonly profileHeading = 'h2';
  private readonly logoutLink = 'a:text("Logout")';
  private readonly underConstructionText = 'p';

  async navigateToProfile(): Promise<void> {
    await this.navigateTo('https://katalon-demo-cura.herokuapp.com/profile.php');
  }

  async isProfilePageDisplayed(): Promise<boolean> {
    try {
      const heading = await this.getText(this.profileHeading);
      return heading.includes('Profile');
    } catch {
      return false;
    }
  }

  async getProfileHeading(): Promise<string> {
    return await this.getText(this.profileHeading);
  }

  async isUnderConstructionMessageDisplayed(): Promise<boolean> {
    try {
      const text = await this.getText(this.underConstructionText);
      return text.includes('Under construction');
    } catch {
      return false;
    }
  }

  async getUnderConstructionMessage(): Promise<string> {
    return await this.getText(this.underConstructionText);
  }

  async clickLogoutLink(): Promise<void> {
    await this.page.click('a:has-text("Logout")');
  }

  async isLogoutLinkVisible(): Promise<boolean> {
    return await this.isElementVisible(this.logoutLink);
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
