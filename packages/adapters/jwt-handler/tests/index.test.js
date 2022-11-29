import { expect, describe, test } from 'vitest';
import CookieHandler from '@template-app/adapter-cookie-handler';

describe('When', () => {
	test('Then throw an error', () => {
		const cookieHandler = new CookieHandler();
		cookieHandler.parse('');
		expect(() => cookieHandler.getCookie('test')).toThrowError();
	});

	test('Then correctly parse the cookie', () => {
		const cookieHandler = new CookieHandler();
		cookieHandler.parse('cookieA=1; cookieB=2');
		expect(cookieHandler.getCookie('cookieB')).toEqual('2');
	});
});
