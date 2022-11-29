export default class AbstractJWTService {
	constructor() {
		if (this.constructor == AbstractJWTService) {
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
