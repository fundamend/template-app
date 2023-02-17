import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('the user opens the app', { timeout: 10 * 1000 }, async function () {
	await this.page.goto('localhost:1351');
	await this.page.waitForLoadState();
});

Then('he should see something', async function () {
	const header = this.page.locator('h1');
	await expect(header).toBeVisible();
});
