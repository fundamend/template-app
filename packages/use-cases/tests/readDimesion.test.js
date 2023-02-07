import { expect, describe, test } from 'vitest';
import AbstractStorageService from '@fundamend/service-storage-abstract';
import { makeReadDimension } from '@template-app/use-cases';

class MockStorageService extends AbstractStorageService {
	constructor() {
		super();
	}

	async read(id) {
		return {
			id: id,
			name: 'name'
		};
	}
}

const readDimension = makeReadDimension({
	StorageService: new MockStorageService()
});

describe('readDimension', () => {
	test('single object', async () => {
		const dimension = await readDimension('id');
		expect(dimension.id).to.equal('id');
		expect(dimension.name).to.equal('name');
	});
});
