// Page Object Model for CURA Healthcare Service
// Base Page Class

import { Page } from '@playwright/test';

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  async isElementVisible(selector: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  async fillText(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  async getInputValue(selector: string): Promise<string> {
    return (await this.page.inputValue(selector)) || '';
  }

  async isCheckboxChecked(selector: string): Promise<boolean> {
    return await this.page.isChecked(selector);
  }

  async selectOption(selector: string, value: string): Promise<void> {
    await this.page.selectOption(selector, value);
  }

  async waitForTimeout(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  async pressKey(key: string): Promise<void> {
    await this.page.press('body', key);
  }
}
