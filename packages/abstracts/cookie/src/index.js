export default class AbstractCookieService {
	constructor() {
		if (this.constructor == AbstractCookieService) {
			throw new Error("Abstract classes can't be instantiated.");
		}
	}

	async parse() {
		throw new Error("Method 'parse()' must be implemented.");
	}

	async getCookie() {
		throw new Error("Method 'getCookie()' must be implemented.");
	}
}
