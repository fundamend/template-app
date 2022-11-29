import { expect, describe, test } from 'vitest';
import Test from '@template-app/entity-test';

describe('When', () => {
	test('Then', () => {
		const test = new Test();
		expect(test.name).toEqual('undefined');
	});
});
