import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Google Search Functionality', async () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.google.com');
    });

  test('should display results for a valid search query', async ({ page }) => {
        const searchBox = page.locator('.APjFqb');
        await page.getByRole('combobox', { name: 'Search' }).type('Playwright Testing');
             
        await page.getByRole('combobox', { name: 'Search' }).press('Enter');
        await page.waitForSelector('#search');

        const title =await page.title();
        await expect(title).toBe('Playwright Testing - Google Search');
        await page.screenshot({ path: 'google-search-results.png', fullPage: true });
    });

    test.afterEach(async ({ page }) => {
        // Any necessary cleanup can be done here
       await page.close()

    });              



});   