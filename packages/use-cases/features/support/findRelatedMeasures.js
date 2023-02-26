import { expect } from 'chai';
import sinon from 'sinon';
import { When, Then } from '@cucumber/cucumber';
import { Measure } from '@template-app/entities';

const testMeasure = {
	id: 'testMeasure',
	value: 123
};

When('existing related measures are searched', async function () {
	this.fakeFindRelated = sinon.replace(
		this.mockStorageService,
		'findRelated',
		sinon.fake.returns([testMeasure])
	);

	this.result = await this.findRelatedMeasures(
		{ type: 'dimension', id: 'testDimension' },
		[]
	);
});

Then('related measures should be found', function () {
	sinon.assert.calledOnceWithMatch(
		this.fakeFindRelated,
		'dimension',
		'testDimension',
		'measures',
		Array
	);
	expect(this.result[0]).to.be.instanceOf(Measure);
});
