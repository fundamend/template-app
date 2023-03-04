import { expect } from 'chai';
import sinon from 'sinon';
import { When, Then } from '@cucumber/cucumber';

When(
	'a milestone for the dimension {string} is created',
	async function (dimension) {
		this.fakeCreate = sinon.replace(
			this.mockStorageService,
			'create',
			sinon.fake.returns({
				dimension: dimension,
				threshold: 123.4,
				type: 'gt',
				reached: false
			})
		);
		this.fakeRelate = sinon.replace(
			this.mockStorageService,
			'relate',
			sinon.fake()
		);

		this.result = await this.createMilestone('testDimension', {});
	}
);

Then('the milestone should be stored', function () {
	sinon.assert.calledOnceWithMatch(this.fakeCreate, 'milestone', Object);
	sinon.assert.calledOnceWithMatch(
		this.fakeRelate,
		Object,
		'milestones',
		Object
	);
});

Then("the milestone's dimension should be {string}", function (dimension) {
	expect(this.result.dimension).to.equal(dimension);
});

Then("the milestone's threshold should be {float}", function (threshold) {
	expect(this.result.threshold).to.equal(threshold);
});

Then("the milestone's type should be {string}", function (type) {
	expect(this.result.type).to.equal(type);
});

Then('the milestone should not be reached', function () {
	expect(this.result.reached).to.be.false;
});
