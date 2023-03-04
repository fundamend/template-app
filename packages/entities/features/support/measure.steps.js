import { expect } from 'chai';
import { useFakeTimers } from 'sinon';
import { When, Then, After } from '@cucumber/cucumber';
import { Measure } from '@template-app/entities';

// When

When('a measure created at {string}', function (timestamp) {
	const date = new Date(timestamp);
	this.clock = useFakeTimers(date);
	this.measure = new Measure();
});

When("the measure's id is set to {string}", function (id) {
	this.measure.id = id;
});

When("the measure's value is set to {int}", function (value) {
	this.measure.value = value;
});

When("the measure's dimension is set to {string}", function (dimension) {
	this.measure.dimension = dimension;
});

When("the measure's timestamp is set to {string}", function (timestamp) {
	this.measure.timestamp = timestamp;
});

// Then

Then("the measure's id should be {string}", function (id) {
	expect(this.measure.id).to.equal(id);
});

Then("the measure's id should be undefined", function () {
	expect(this.measure.id).to.be.undefined;
});

Then("the measure's value should be {int}", function (value) {
	expect(this.measure.value).to.equal(value);
});

Then("the measure's value should be undefined", function () {
	expect(this.measure.value).to.be.undefined;
});

Then("the measure's dimension should be {string}", function (dimension) {
	expect(this.measure.dimension).to.equal(dimension);
});

Then("the measure's dimension should be undefined", function () {
	expect(this.measure.dimension).to.be.undefined;
});

Then("the measure's timestamp should be {string}", function (timestamp) {
	expect(this.measure.timestamp).to.equal(timestamp);
});

// After

After(function () {
	if (this.clock) {
		this.clock.restore();
	}
});
