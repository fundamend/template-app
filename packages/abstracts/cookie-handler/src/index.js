export default class AbstractCookieHandler {
	constructor() {
		if (this.constructor == AbstractCookieHandler) {
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
