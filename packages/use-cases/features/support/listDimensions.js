import { expect } from 'chai';
import sinon from 'sinon';
import { When, Then } from '@cucumber/cucumber';
import { Dimension } from '@template-app/entities';

const testDimensions = [
	{
		id: 'testDimension1',
		name: 'testDimension1'
	},
	{
		id: 'testDimension2',
		name: 'testDimension2'
	}
];

When('existing dimensions are listed', async function () {
	this.fakeReadAll = sinon.replace(
		this.mockStorageService,
		'readAll',
		sinon.fake.returns(testDimensions)
	);

	this.result = await this.listDimensions();
});

Then('all existing dimensions should be found', async function () {
	sinon.assert.calledOnceWithMatch(this.fakeReadAll, 'dimension');
	expect(this.result).to.have.lengthOf(testDimensions.length);
	expect(this.result[0]).to.be.instanceOf(Dimension);
});
