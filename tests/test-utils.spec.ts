// Test Utilities and Helpers for POM Framework
import { Page, expect } from '@playwright/test';

export class TestUtils {
  /**
   * Utility method to wait for element visibility
   */
  static async waitForElementVisible(page: Page, selector: string, timeout: number = 5000): Promise<void> {
    await page.waitForSelector(selector, { timeout, state: 'visible' });
  }

  /**
   * Utility method to wait for element to disappear
   */
  static async waitForElementHidden(page: Page, selector: string, timeout: number = 5000): Promise<void> {
    await page.waitForSelector(selector, { timeout, state: 'hidden' });
  }

  /**
   * Utility method to verify element text
   */
  static async verifyElementText(page: Page, selector: string, expectedText: string): Promise<void> {
    const actualText = await page.textContent(selector);
    expect(actualText).toContain(expectedText);
  }

  /**
   * Utility method to clear and fill input field
   */
  static async clearAndFillInput(page: Page, selector: string, text: string): Promise<void> {
    const element = page.locator(selector);
    await element.clear();
    await element.fill(text);
  }

  /**
   * Utility method to verify page URL
   */
  static async verifyPageUrl(page: Page, expectedUrl: string): Promise<void> {
    expect(page.url()).toContain(expectedUrl);
  }

  /**
   * Utility method to take screenshot for debugging
   */
  static async takeScreenshot(page: Page, fileName: string): Promise<void> {
    await page.screenshot({ path: `./test-results/${fileName}.png` });
  }

  /**
   * Utility method to handle alert/dialog
   */
  static async handleAlert(page: Page, accept: boolean = true): Promise<string | null> {
    let alertText: string | null = null;

    page.once('dialog', async dialog => {
      alertText = dialog.message();
      if (accept) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });

    return alertText;
  }

  /**
   * Utility method to verify element is enabled
   */
  static async verifyElementEnabled(page: Page, selector: string): Promise<void> {
    const isEnabled = await page.isEnabled(selector);
    expect(isEnabled).toBe(true);
  }

  /**
   * Utility method to verify element is disabled
   */
  static async verifyElementDisabled(page: Page, selector: string): Promise<void> {
    const isEnabled = await page.isEnabled(selector);
    expect(isEnabled).toBe(false);
  }

  /**
   * Utility method to get all text from page
   */
  static async getAllPageText(page: Page): Promise<string> {
    return (await page.textContent('body')) || '';
  }

  /**
   * Utility method to verify element visibility status
   */
  static async verifyElementVisible(page: Page, selector: string): Promise<void> {
    const isVisible = await page.isVisible(selector);
    expect(isVisible).toBe(true);
  }

  /**
   * Utility method to verify element hidden status
   */
  static async verifyElementHidden(page: Page, selector: string): Promise<void> {
    const isVisible = await page.isVisible(selector);
    expect(isVisible).toBe(false);
  }

  /**
   * Utility method to execute JavaScript on page
   */
  static async executeScript(page: Page, script: string): Promise<any> {
    return await page.evaluate(script);
  }

  /**
   * Utility method to get all elements count
   */
  static async getElementsCount(page: Page, selector: string): Promise<number> {
    return await page.locator(selector).count();
  }

  /**
   * Utility method for keyboard navigation
   */
  static async pressKey(page: Page, key: string): Promise<void> {
    await page.keyboard.press(key);
  }

  /**
   * Utility method to wait for navigation
   */
  static async waitForNavigation(page: Page, action: () => Promise<void>, timeout: number = 5000): Promise<void> {
    const navigationPromise = page.waitForNavigation({ waitUntil: 'networkidle', timeout });
    await action();
    await navigationPromise;
  }

  /**
   * Utility method to fill form with multiple fields
   */
  static async fillMultipleFields(page: Page, fieldData: Record<string, string>): Promise<void> {
    for (const [selector, value] of Object.entries(fieldData)) {
      await page.fill(selector, value);
    }
  }

  /**
   * Utility method to get all text inputs value
   */
  static async getInputValue(page: Page, selector: string): Promise<string> {
    return (await page.inputValue(selector)) || '';
  }

  /**
   * Utility method to verify multiple elements visible
   */
  static async verifyMultipleElementsVisible(page: Page, selectors: string[]): Promise<void> {
    for (const selector of selectors) {
      const isVisible = await page.isVisible(selector);
      expect(isVisible).toBe(true);
    }
  }

  /**
   * Utility method to scroll to element
   */
  static async scrollToElement(page: Page, selector: string): Promise<void> {
    await page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Utility method for double click action
   */
  static async doubleClick(page: Page, selector: string): Promise<void> {
    await page.locator(selector).dblclick();
  }

  /**
   * Utility method for right click action
   */
  static async rightClick(page: Page, selector: string): Promise<void> {
    await page.locator(selector).click({ button: 'right' });
  }

  /**
   * Utility method to hover over element
   */
  static async hoverElement(page: Page, selector: string): Promise<void> {
    await page.locator(selector).hover();
  }

  /**
   * Utility method to check element attribute
   */
  static async getElementAttribute(page: Page, selector: string, attributeName: string): Promise<string | null> {
    return await page.locator(selector).getAttribute(attributeName);
  }

  /**
   * Utility method to set input value using JavaScript (bypass validation)
   */
  static async setInputValueJS(page: Page, selector: string, value: string): Promise<void> {
    await page.evaluate(
      ({ sel, val }) => {
        const element = document.querySelector(sel) as HTMLInputElement;
        if (element) {
          element.value = val;
          element.dispatchEvent(new Event('change', { bubbles: true }));
        }
      },
      { sel: selector, val: value }
    );
  }

  /**
   * Utility method to verify page title
   */
  static async verifyPageTitle(page: Page, expectedTitle: string): Promise<void> {
    const title = await page.title();
    expect(title).toContain(expectedTitle);
  }

  /**
   * Utility method to get current page URL
   */
  static async getCurrentUrl(page: Page): Promise<string> {
    return page.url();
  }

  /**
   * Utility method to go back in browser history
   */
  static async goBack(page: Page): Promise<void> {
    await page.goBack();
  }

  /**
   * Utility method to go forward in browser history
   */
  static async goForward(page: Page): Promise<void> {
    await page.goForward();
  }

  /**
   * Utility method for drag and drop
   */
  static async dragAndDrop(page: Page, sourceSelector: string, targetSelector: string): Promise<void> {
    await page.locator(sourceSelector).dragTo(page.locator(targetSelector));
  }
}

/**
 * Test Data Constants
 */
export const testData = {
  validUser: {
    username: 'John Doe',
    password: 'ThisIsNotAPassword',
  },
  facilities: {
    tokyo: 'Tokyo CURA Healthcare Center',
    hongkong: 'Hongkong CURA Healthcare Center',
    seoul: 'Seoul CURA Healthcare Center',
  },
  programs: {
    medicare: 'Medicare',
    medicaid: 'Medicaid',
    none: 'None',
  },
  dates: {
    today: '20/02/2026',
    past: '10/02/2026',
    future: '28/02/2026',
    farFuture: '20/02/2027',
  },
  comments: {
    short: 'Regular checkup',
    medium: 'Follow-up appointment for post-operative care',
    long: 'A'.repeat(500),
    veryLong: 'B'.repeat(10000),
    special: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  },
};

/**
 * Selectors Constants
 */
export const selectors = {
  login: {
    username: 'input[name="username"]',
    password: 'input[name="password"]',
    loginButton: 'button[id="btn-login"]',
  },
  appointment: {
    facility: 'select[id="combo_facility"]',
    readmission: 'input[id="chk_hospotal_readmission"]',
    medicare: 'input[value="Medicare"]',
    medicaid: 'input[value="Medicaid"]',
    none: 'input[value="None"]',
    visitDate: 'input[id="txt_visit_date"]',
    comment: 'textarea[id="txt_comment"]',
    bookButton: 'button[id="btn-book-appointment"]',
  },
  navigation: {
    homeLink: 'a:has-text("Home")',
    makeAppointmentLink: 'a:has-text("Make Appointment")',
    profileLink: 'a:has-text("Profile")',
    historyLink: 'a:has-text("History")',
    logoutLink: 'a:has-text("Logout")',
  },
};

/**
 * URLs Constants
 */
export const urls = {
  home: 'https://katalon-demo-cura.herokuapp.com/',
  login: 'https://katalon-demo-cura.herokuapp.com/profile.php',
  appointment: 'https://katalon-demo-cura.herokuapp.com/index.php#appointment',
  history: 'https://katalon-demo-cura.herokuapp.com/history.php',
  profile: 'https://katalon-demo-cura.herokuapp.com/profile.php',
};
