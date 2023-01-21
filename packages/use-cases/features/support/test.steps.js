import { expect } from 'chai';
import { When, Then, Before } from '@cucumber/cucumber';
import { makeCreateMeasure } from '@template-app/use-cases';

Before(function () {
	this.createMeasure = makeCreateMeasure({ VERSION: 'test' });
});

When('a measure is created', function () {
	this.result = this.createMeasure('test');
});

Then('its name should be {string}', function (string) {
	expect(this.result).to.equal(string);
});
