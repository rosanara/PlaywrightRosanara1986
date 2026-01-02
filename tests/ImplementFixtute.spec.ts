import {test,Page,expect} from '@playwright/test';
//import {test} from "../fixtures/custom-fixture"
import testdata from "../fixtures/testdata.json"


test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('img').nth(4).click();
  await page.pause();

  await page.getByText('Practice Form').click();
  await page.waitForLoadState('networkidle')
   // await expect(page).toHaveURL('/automation-practice-form/')
    await expect(page).toHaveURL('/automation-practice-form/');
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill(testdata.firsname);
  await page.getByRole('textbox', { name: 'Last Name' }).click();
})


