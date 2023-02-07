import { expect, describe, test } from 'vitest';
import AbstractStorageService from '@fundamend/service-storage-abstract';
import { makeCreateDimension } from '@template-app/use-cases';

class MockStorageService extends AbstractStorageService {
	constructor() {
		super();
	}

	async create(entity) {
		entity.id = 'test';
		return entity;
	}
}

const createDimension = makeCreateDimension({
	StorageService: new MockStorageService()
});

describe('createDimension', () => {
	test('single object', async () => {
		const addedDimension = await createDimension('name');
		expect(addedDimension.name).to.equal('name');
		expect(addedDimension.id).to.equal('test');
	});
});
