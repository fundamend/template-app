import { expect, describe, test } from 'vitest';
import CookieService from '@template-app/service-cookie';

describe('When', () => {
	test('Then throw an error', () => {
		const cookieService = new CookieService();
		cookieService.parse('');
		expect(() => cookieService.getCookie('test')).toThrowError();
	});

	test('Then correctly parse the cookie', () => {
		const cookieService = new CookieService();
		cookieService.parse('cookieA=1; cookieB=2');
		expect(cookieService.getCookie('cookieB').value).toEqual('2');
	});
});
