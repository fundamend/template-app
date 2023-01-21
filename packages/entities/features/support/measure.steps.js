import { expect } from 'chai';
import { useFakeTimers } from 'sinon';
import { When, Then, After } from '@cucumber/cucumber';
import { Measure } from '@template-app/entities';

// When

When('a measure with id {string} is created', function (id) {
	this.measure = new Measure(id);
});

When('a measure is created without id', function () {
	this.measure = new Measure();
});

When('a measure created at {string}', function (timestamp) {
	const date = new Date(timestamp);
	this.clock = useFakeTimers(date);
	this.measure = new Measure();
});

When('its value is set to {int}', function (value) {
	this.measure.value = value;
});

When('its dimension is set to {string}', function (dimension) {
	this.measure.dimension = dimension;
});

When('its timestamp is set to {string}', function (timestamp) {
	this.measure.timestamp = timestamp;
});

// Then

Then('its id should be {string}', function (id) {
	expect(this.measure.id).to.equal(id);
});

Then('its id should be undefined', function () {
	expect(this.measure.id).to.be.undefined;
});

Then('its value should be undefined', function () {
	expect(this.measure.value).to.be.undefined;
});

Then('its dimension should be undefined', function () {
	expect(this.measure.dimension).to.be.undefined;
});

Then('its value should be {int}', function (value) {
	expect(this.measure.value).to.equal(value);
});

Then('its dimension should be {string}', function (dimension) {
	expect(this.measure.dimension).to.equal(dimension);
});

Then('its timestamp should be {string}', function (timestamp) {
	expect(this.measure.timestamp).to.equal(timestamp);
});

// After

After(function () {
	if (this.clock) {
		this.clock.restore();
	}
});
