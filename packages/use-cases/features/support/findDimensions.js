import { expect } from 'chai';
import sinon from 'sinon';
import { When, Then } from '@cucumber/cucumber';
import { Dimension } from '@template-app/entities';

const testDimension = {
	id: 'testDimension',
	name: 'testDimension'
};

When('an existing dimension is searched', async function () {
	this.fakeFind = sinon.replace(
		this.mockStorageService,
		'find',
		sinon.fake.returns([testDimension])
	);

	this.result = await this.findDimension('testDimension');
});

Then('the dimension should be found', function () {
	sinon.assert.calledOnceWithMatch(this.fakeFind, Object);
	expect(this.result[0]).to.be.instanceOf(Dimension);
});
