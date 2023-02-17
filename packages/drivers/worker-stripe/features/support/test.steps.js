import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('I check if the worker is running', async function () {
	this.response = await fetch('http://localhost:8787', { method: 'HEAD' });
});

When('I call the worker', async function () {
	this.response = await fetch('http://localhost:8787', { method: 'GET' });
});

Then('it is running', async function () {
	await expect(this.response.status).toEqual(200);
});

Then('it returns an error', async function () {
	await expect(this.response.status).toEqual(500);
});
