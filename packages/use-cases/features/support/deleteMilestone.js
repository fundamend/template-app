import sinon from 'sinon';
import { When, Then } from '@cucumber/cucumber';

When('an existing milestone is deleted', async function () {
	this.fakeDelete = sinon.replace(
		this.mockStorageService,
		'delete',
		sinon.fake()
	);

	await this.deleteMilestone('testMilestone');
});

Then('the milestone should be removed from storage', function () {
	sinon.assert.calledOnceWithMatch(
		this.fakeDelete,
		'milestone',
		'testMilestone'
	);
});
