import AbstractCookieService from '@template-app/abstract-service-cookie';
import cookie from 'cookie';

export default class CookieService extends AbstractCookieService {
	#cookies;

	constructor() {
		super();
	}

	async parse(cookies) {
		this.#cookies = cookie.parse(cookies || '');
	}

	async getCookie(name) {
		const value = this.#cookies[name];
		if (!value) {
			throw new Error(`No cookie with the name ${name} found.`);
		}
		return value;
	}
}
