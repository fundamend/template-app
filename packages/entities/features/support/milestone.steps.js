import { expect } from 'chai';
import { When, Then } from '@cucumber/cucumber';
import { Milestone } from '@template-app/entities';

// When

When('a milestone is created', function () {
	this.milestone = new Milestone();
});

When("the milestone's id is set to {string}", function (id) {
	this.milestone.id = id;
});

When("the milestone's dimension is set to {string}", function (dimension) {
	this.milestone.dimension = dimension;
});

When("the milestone's threshold is set to {int}", function (threshold) {
	this.milestone.threshold = threshold;
});

When("the milestone's type is set to {string}", function (type) {
	this.milestone.type = type;
});

When('the milestone is set to be reached', function () {
	this.milestone.reached = true;
});

// Then

Then("the milestone's id should be {string}", function (id) {
	expect(this.milestone.id).to.equal(id);
});

Then("the milestone's id should be undefined", function () {
	expect(this.milestone.id).to.be.undefined;
});

Then("the milestone's dimension should be {string}", function (dimension) {
	expect(this.milestone.dimension).to.equal(dimension);
});

Then("the milestone's dimension should be undefined", function () {
	expect(this.milestone.dimension).to.be.undefined;
});

Then("the milestone's threshold should be {int}", function (threshold) {
	expect(this.milestone.threshold).to.equal(threshold);
});

Then("the milestone's threshold should be undefined", function () {
	expect(this.milestone.threshold).to.be.undefined;
});

Then("the milestone's type should be {string}", function (type) {
	expect(this.milestone.type).to.equal(type);
});

Then("the milestone's type should be undefined", function () {
	expect(this.milestone.type).to.be.undefined;
});

Then('the milestone should be reached', function () {
	expect(this.milestone.reached).to.be.true;
});

Then('the milestone should not be reached', function () {
	expect(this.milestone.reached).to.be.false;
});
