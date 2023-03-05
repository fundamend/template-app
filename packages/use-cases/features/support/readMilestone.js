import { expect } from 'chai';
import sinon from 'sinon';
import { When, Then } from '@cucumber/cucumber';
import { Milestone } from '@template-app/entities';

const testMilestone = {
	id: 'testMilestone',
	name: 'testMilestone'
};

When('an existing milestone is read', async function () {
	this.fakeRead = sinon.replace(
		this.mockStorageService,
		'read',
		sinon.fake.returns(testMilestone)
	);

	this.result = await this.readMilestone('testMilestone');
});

Then('the milestone should be read', function () {
	sinon.assert.calledOnceWithMatch(this.fakeRead, 'milestone', 'testMilestone');
	expect(this.result).to.be.instanceOf(Milestone);
});
