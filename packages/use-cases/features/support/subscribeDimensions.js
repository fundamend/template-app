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

When('subscribed to existing dimensions', async function () {
	this.callback = sinon.fake();
	this.fakeSubscribe = sinon.replace(
		this.mockStorageService,
		'subscribe',
		sinon.fake.yields(testDimensions, this.callback)
	);

	this.subscribeDimensions(this.callback);
});

Then('existing dimensions should be returned', async function () {
	sinon.assert.calledOnceWithMatch(
		this.fakeSubscribe,
		'dimension',
		sinon.match.any
	);
	sinon.assert.calledOnceWithMatch(this.callback, [
		sinon.match.instanceOf(Dimension),
		sinon.match.instanceOf(Dimension)
	]);
});

Then('new dimensions should be returned', async function () {
	// TODO: can this be tested correctly?
	this.callback(
		testDimensions.concat([{ id: 'testDimensions3', name: 'testDimension3' }])
	);
	sinon.assert.calledTwice(this.callback);
});
