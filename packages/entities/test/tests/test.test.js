import { expect, describe, test } from 'vitest';
import Test from '../src/index.js';

describe('When', () => {
	test('Then', () => {
		const test = new Test();
		expect(test.name).toEqual('undefined');
	});
});
