export default class AbstractCrashReporter {
	constructor() {
		if (this.constructor == AbstractCrashReporter) {
			throw new Error("Abstract classes can't be instantiated.");
		}
	}

	captureException() {
		throw new Error("Method 'captureException()' must be implemented.");
	}
}
