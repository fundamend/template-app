import { expect } from 'chai';
import sinon from 'sinon';
import { When, Then } from '@cucumber/cucumber';
import { Dimension } from '@template-app/entities';

const testDimension = {
	id: 'testDimension',
	name: 'testDimension'
};

When('an existing dimension is read', async function () {
	this.fakeRead = sinon.replace(
		this.mockStorageService,
		'read',
		sinon.fake.returns(testDimension)
	);

	this.result = await this.readDimension('testDimension');
});

Then('the dimension should be read', function () {
	sinon.assert.calledOnceWithMatch(this.fakeRead, 'dimension', 'testDimension');
	expect(this.result).to.be.instanceOf(Dimension);
});
