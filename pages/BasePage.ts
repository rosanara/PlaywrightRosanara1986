import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async goto(url: string) {
    await this.page.goto(url);
  }

  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async click(selector: string) {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async getText(selector: string) {
    return await this.page.textContent(selector);
  }

  async isVisible(selector: string) {
    return await this.page.isVisible(selector);
  }

  async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector);
  }
}
