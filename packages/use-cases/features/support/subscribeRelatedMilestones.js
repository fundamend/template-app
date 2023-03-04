import sinon from 'sinon';
import { When, Then } from '@cucumber/cucumber';
import { Milestone } from '@template-app/entities';

const testMilestones = [
	{
		id: 'tesMilestone1',
		value: 1
	},
	{
		id: 'testMilestone2',
		value: 2
	}
];

When('subscribed to existing related milestones', async function () {
	this.callback = sinon.fake();
	this.fakeSubscribeRelated = sinon.replace(
		this.mockStorageService,
		'subscribeRelated',
		sinon.fake.yields(testMilestones, this.callback)
	);

	this.subscribeRelatedMilestones(
		{ id: 'testDimension', type: 'dimension' },
		[],
		this.callback
	);
});

Then('existing related milestones should be returned', async function () {
	sinon.assert.calledOnceWithMatch(
		this.fakeSubscribeRelated,
		'dimension',
		'testDimension',
		'milestones',
		sinon.match.any
	);
	sinon.assert.calledOnceWithMatch(this.callback, [
		sinon.match.instanceOf(Milestone),
		sinon.match.instanceOf(Milestone)
	]);
});

Then('new related milestones should be returned', async function () {
	// TODO: can this be tested correctly?
	this.callback(testMilestones.concat([{ id: 'testMilestone3', value: 3 }]));
	sinon.assert.calledTwice(this.callback);
});
