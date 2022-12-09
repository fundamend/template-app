import { expect, describe, test } from 'vitest';
import CookieService from '@template-app/service-cookie';

describe('When', () => {
	test('Then throw an error', async () => {
		const cookieService = new CookieService();
		await cookieService.parse('');
		await expect(cookieService.getCookie('test')).rejects.toThrow(
			'No cookie with the name test found.'
		);
	});

	test('Then correctly parse the cookie', async () => {
		const cookieService = new CookieService();
		await cookieService.parse('cookieA=1; cookieB=2');
		expect(await cookieService.getCookie('cookieB')).toEqual('2');
	});
});
