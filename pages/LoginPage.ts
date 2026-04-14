import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { config } from '../config/config';

export class LoginPage extends BasePage {
  private usernameInput: string;
  private passwordInput: string;
  private loginButton: string;
  private errorMessage: string;

  constructor(page: Page) {
    super(page);
    this.usernameInput = 'input[data-test="username"]';
    this.passwordInput = 'input[data-test="password"]';
    this.loginButton = 'input[data-test="login-button"]';
    this.errorMessage = '[data-test="error"]';
  }

  async navigate() {
    await this.goto(config.url);
  }

  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  async isErrorMessageVisible() {
    return await this.isVisible(this.errorMessage);
  }
}
