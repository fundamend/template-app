import AbstractCookieService from '@template-app/abstract-service-cookie';
import { parse } from 'cookie';

export default class CookieService extends AbstractCookieService {
	#cookies;

	constructor(cookies) {
		super();
		this.parse(cookies);
	}

	parse(cookies) {
		this.#cookies = parse(cookies || '');
	}

	getCookie(name) {
		const cookie = this.#cookies[name];
		if (!cookie) {
			throw new Error(`No cookie with the name ${name} found.`);
		}
		return {
			name: cookie.name,
			value: cookie.value
		};
	}
}
