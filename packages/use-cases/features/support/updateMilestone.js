import sinon from 'sinon';
import { When, Then } from '@cucumber/cucumber';

const updatedMilestone = {
	id: 'testMilestone',
	name: 'updatedMilestone'
};

When('an existing milestone is updated', async function () {
	this.fakeUpdate = sinon.replace(
		this.mockStorageService,
		'update',
		sinon.fake()
	);

	this.updateMilestone(updatedMilestone);
});

Then(
	'the changes to the existing milestone should be stored',
	async function () {
		sinon.assert.calledOnceWithMatch(
			this.fakeUpdate,
			'milestone',
			updatedMilestone
		);
	}
);
