import { expect } from 'chai';
import { Given, Then } from '@cucumber/cucumber';
import Test from '@template-app/entity-test';

Given('a Test is initialized with nothing', function () {
	this.test = new Test();
});

Given('a Test is initialized with {string}', function (actual) {
	this.test = new Test(actual);
});

Then('its name is {string}', function (expected) {
	expect(this.test.name).equals(expected);
});
