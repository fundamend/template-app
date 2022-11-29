export default class AbstractCookieService {
	constructor() {
		if (this.constructor == AbstractCookieService) {
			throw new Error("Abstract classes can't be instantiated.");
		}
	}

	parse() {
		throw new Error("Method 'parse()' must be implemented.");
	}

	getCookie() {
		throw new Error("Method 'getCookie()' must be implemented.");
	}
}
