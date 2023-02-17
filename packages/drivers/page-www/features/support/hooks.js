import {
	After,
	AfterAll,
	Before,
	BeforeAll,
	setWorldConstructor
} from '@cucumber/cucumber';
import World from './world.js';
import { chromium } from 'playwright';

setWorldConstructor(World);

BeforeAll(async function () {
	global.browser = await chromium.launch({
		headless: false
		//slowMo: 1000
	});
});

Before(async function () {
	this.context = await global.browser.newContext();
	this.page = await this.context.newPage();
});

After(async function () {
	this.page.close();
	this.context.close();
});

AfterAll(async function () {
	await global.browser.close();
});
