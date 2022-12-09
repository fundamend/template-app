export default class AbstractCrashService {
	constructor() {
		if (this.constructor == AbstractCrashService) {
			throw new Error("Abstract classes can't be instantiated.");
		}
	}

	async captureException() {
		throw new Error("Method 'captureException()' must be implemented.");
	}
}
