// @ts-check
import { test, chromium, expect } from '@playwright/test';
import { exec } from 'child_process';

test('Read Credit Card', async ({ }) => {
  let browser = await chromium.launch({headless: false});
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://demo.guru99.com/payment-gateway/index.php');
  await page.waitForTimeout(2000);
  const cardLink = await page.locator("//nav/a[text()='Generate Card Number']");
  expect(cardLink).toBeVisible();
  await cardLink.click();
  const newPage = await context.waitForEvent('page');
  const cardNumber = await newPage.locator("//h4[contains(text(),'Card')]");
  await newPage.waitForTimeout(2000);
  expect(cardNumber).toBeVisible();  
  const cardNumberRaw = await cardNumber.textContent();
  console.log(cardNumberRaw);
});