// Page Object Model for Login Page
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput = 'input[name="username"]';
  private readonly passwordInput = 'input[name="password"]';
  private readonly loginButton = 'button[id="btn-login"]';
  private readonly loginHeading = 'h2';
  private readonly demoAccountMessage = '.form-group:first-child';

  async navigateToLogin(): Promise<void> {
    await this.navigateTo('https://katalon-demo-cura.herokuapp.com/profile.php');
  }

  async enterUsername(username: string): Promise<void> {
    await this.fillText(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fillText(this.passwordInput, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.click(this.loginButton);
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async isLoginPageDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.loginButton);
  }

  async getUsernameValue(): Promise<string> {
    return await this.getInputValue(this.usernameInput);
  }

  async getPasswordValue(): Promise<string> {
    return await this.getInputValue(this.passwordInput);
  }

  async getLoginHeadingText(): Promise<string> {
    return await this.getText(this.loginHeading);
  }

  async clearUsernameField(): Promise<void> {
    await this.page.fill(this.usernameInput, '');
  }

  async clearPasswordField(): Promise<void> {
    await this.page.fill(this.passwordInput, '');
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
