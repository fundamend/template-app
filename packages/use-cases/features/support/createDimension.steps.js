import { expect } from 'chai';
import sinon from 'sinon';
import { When, Then } from '@cucumber/cucumber';

When('a dimension with the name {string} is created', async function (name) {
	this.fakeCreate = sinon.replace(
		this.mockStorageService,
		'create',
		sinon.fake.returns({ name: name })
	);

	this.result = await this.createDimension(name);
});

Then('the dimension should be stored', function () {
	sinon.assert.calledOnceWithMatch(this.fakeCreate, 'dimension');
});

Then("the dimension's name should be {string}", function (name) {
	expect(this.result.name).to.equal(name);
});
