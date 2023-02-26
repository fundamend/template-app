import sinon from 'sinon';
import { When, Then } from '@cucumber/cucumber';

When('an existing dimension is deleted', async function () {
	this.fakeDelete = sinon.replace(
		this.mockStorageService,
		'delete',
		sinon.fake()
	);

	await this.deleteDimension('testDimension');
});

Then('the dimension should be removed from storage', function () {
	sinon.assert.calledOnceWithMatch(
		this.fakeDelete,
		'dimension',
		'testDimension'
	);
});
