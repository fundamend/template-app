import { expect } from 'chai';
import { When, Then } from '@cucumber/cucumber';
import { Dimension } from '@template-app/entities';

// When

When('a dimension is created', function () {
	this.dimension = new Dimension();
});

When("the dimension's id is set to {string}", function (id) {
	this.dimension.id = id;
});

When("the dimension's name is set to {string}", function (name) {
	this.dimension.name = name;
});

// Then

Then("the dimension's id should be {string}", function (id) {
	expect(this.dimension.id).to.equal(id);
});

Then("the dimension's id should be undefined", function () {
	expect(this.dimension.id).to.be.undefined;
});

Then("the dimension's name should be {string}", function (name) {
	expect(this.dimension.name).to.equal(name);
});

Then("the dimension's name should be undefined", function () {
	expect(this.dimension.name).to.be.undefined;
});
