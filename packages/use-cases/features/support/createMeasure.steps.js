import { expect } from 'chai';
import { When, Then, Before } from '@cucumber/cucumber';
import AbstractStorageService from '@fundamend/service-storage-abstract';
import { makeCreateMeasure } from '@template-app/use-cases';

class MockStorageService extends AbstractStorageService {
	constructor() {
		super();
	}

	async create(type, entity) {
		entity.id = 'test';
		return entity;
	}

	async relate() {
		// no-op
	}
}

Before(function () {
	this.createMeasure = makeCreateMeasure({ StorageService: new MockStorageService() });
});

When('a measure is created', async function () {
	this.result = await this.createMeasure('dimension', { value: 123 });
});

Then('the measure\'s value should be {float}', function (float) {
	expect(this.result.value).to.equal(float);
});
