import { expect } from 'chai';
import sinon from 'sinon';
import { When, Then } from '@cucumber/cucumber';
import { Milestone } from '@template-app/entities';

const testMilestone = {
	id: 'testMilestone',
	dimension: 'testDimension',
	threshold: 1.23,
	type: 'gt',
	reached: false
};

When('an existing milestone is searched', async function () {
	this.fakeFind = sinon.replace(
		this.mockStorageService,
		'find',
		sinon.fake.returns([testMilestone])
	);

	this.result = await this.findMilestones('testMilestone');
});

Then('the milestone should be found', function () {
	sinon.assert.calledOnceWithMatch(this.fakeFind, Object);
	expect(this.result[0]).to.be.instanceOf(Milestone);
});
