import sinon from 'sinon';
import { When, Then } from '@cucumber/cucumber';

const updatedMeasure = {
	id: 'testMeasure',
	name: 'updatedMeasure'
};

When('an existing measure is updated', async function () {
	this.fakeUpdate = sinon.replace(
		this.mockStorageService,
		'update',
		sinon.fake()
	);

	this.updateMeasure(updatedMeasure);
});

Then('the changes to the existing measure should be stored', async function () {
	sinon.assert.calledOnceWithMatch(this.fakeUpdate, 'measure', updatedMeasure);
});
