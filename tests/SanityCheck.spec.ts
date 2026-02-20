import { test, expect } from '@playwright/test';

//centralized baseurl in playwright.config.ts

test('homepage test', async ({ page }) => {
  await page.goto('/'); // get the baseurl from config 
  await expect(page).toHaveTitle(/Google/);
});