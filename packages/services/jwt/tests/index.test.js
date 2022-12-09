/* globals globalThis */

import { webcrypto } from 'node:crypto';
Object.defineProperty(globalThis, 'crypto', {
	value: { subtle: webcrypto.subtle }
});

import { expect, describe, test } from 'vitest';
import JWTService from '@template-app/service-jwt';

describe('When', () => {
	test('Then', async () => {
		const jwtService = new JWTService();
		const token = await jwtService.encode({ test: 123 }, 'secret');
		const valid = await jwtService.verify(token, 'secret');
		expect(valid).toBeTruthy();
		const decoded = await jwtService.decode(token, 'secret');
		expect(decoded.payload.test).toEqual(123);
	});
});
