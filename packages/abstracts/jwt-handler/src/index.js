export default class AbstractJWTHandler {
	constructor() {
		if (this.constructor == AbstractJWTHandler) {
			throw new Error("Abstract classes can't be instantiated.");
		}
	}

	verify() {
		throw new Error("Method 'verify()' must be implemented.");
	}

	decode() {
		throw new Error("Method 'decode()' must be implemented.");
	}
}
