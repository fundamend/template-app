import { expect } from 'chai';
import sinon from 'sinon';
import { When, Then } from '@cucumber/cucumber';
import { Measure } from '@template-app/entities';

const testMeasure = {
	id: 'testMeasure',
	dimension: 'testDimension',
	value: 'testMeasure'
};

When('an existing measure is read', async function () {
	this.fakeRead = sinon.replace(
		this.mockStorageService,
		'read',
		sinon.fake.returns(testMeasure)
	);

	this.result = await this.readMeasure('testMeasure');
});

Then('the measure should be read', function () {
	sinon.assert.calledOnceWithMatch(this.fakeRead, 'measure', 'testMeasure');
	expect(this.result).to.be.instanceOf(Measure);
});
