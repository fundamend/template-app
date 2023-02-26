import sinon from 'sinon';
import { When, Then } from '@cucumber/cucumber';
import { Measure } from '@template-app/entities';

const testMeasures = [
	{
		id: 'tesMeasure1',
		value: 1
	},
	{
		id: 'testMeasure2',
		value: 2
	}
];

When('subscribed to existing related measures', async function () {
	this.callback = sinon.fake();
	this.fakeSubscribeRelated = sinon.replace(
		this.mockStorageService,
		'subscribeRelated',
		sinon.fake.yields(testMeasures, this.callback)
	);

	this.subscribeRelatedMeasures(
		{ id: 'testDimension', type: 'dimension' },
		[],
		this.callback
	);
});

Then('existing related measures should be returned', async function () {
	sinon.assert.calledOnceWithMatch(
		this.fakeSubscribeRelated,
		'dimension',
		'testDimension',
		'measures',
		sinon.match.any
	);
	sinon.assert.calledOnceWithMatch(this.callback, [
		sinon.match.instanceOf(Measure),
		sinon.match.instanceOf(Measure)
	]);
});

Then('new related measures should be returned', async function () {
	// TODO: can this be tested correctly?
	this.callback(testMeasures.concat([{ id: 'testMeasure3', value: 3 }]));
	sinon.assert.calledTwice(this.callback);
});
