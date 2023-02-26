import { expect } from 'chai';
import sinon from 'sinon';
import { When, Then } from '@cucumber/cucumber';

When(
	'a measure for the dimension {string} with the value {float} is created',
	async function (dimension, value) {
		this.fakeCreate = sinon.replace(
			this.mockStorageService,
			'create',
			sinon.fake.returns({
				value: value,
				dimension: dimension,
				timestamp: new Date().toISOString()
			})
		);
		this.fakeRelate = sinon.replace(
			this.mockStorageService,
			'relate',
			sinon.fake()
		);

		this.result = await this.createMeasure('testDimension', { value: value });
	}
);

Then('the measure should be stored', function () {
	sinon.assert.calledOnceWithMatch(this.fakeCreate, 'measure', Object);
	sinon.assert.calledOnceWithMatch(this.fakeRelate, Object, 'measures', Object);
});

Then("the measure's dimension should be {string}", function (dimension) {
	expect(this.result.dimension).to.equal(dimension);
});

Then("the measure's value should be {float}", function (value) {
	expect(this.result.value).to.equal(value);
});
