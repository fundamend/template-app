import sinon from 'sinon';
import { When, Then } from '@cucumber/cucumber';

const updatedDimension = {
	id: 'testDimension',
	name: 'updatedDimension'
};

When('an existing dimension is updated', async function () {
	this.fakeUpdate = sinon.replace(
		this.mockStorageService,
		'update',
		sinon.fake()
	);

	this.updateDimension(updatedDimension);
});

Then(
	'the changes to the existing dimension should be stored',
	async function () {
		sinon.assert.calledOnceWithMatch(
			this.fakeUpdate,
			'dimension',
			updatedDimension
		);
	}
);
