import sinon from 'sinon';
import { When, Then } from '@cucumber/cucumber';

When('an existing measure is deleted', async function () {
	this.fakeDelete = sinon.replace(
		this.mockStorageService,
		'delete',
		sinon.fake()
	);

	await this.deleteMeasure('testMeasure');
});

Then('the measure should be removed from storage', function () {
	sinon.assert.calledOnceWithMatch(this.fakeDelete, 'measure', 'testMeasure');
});
