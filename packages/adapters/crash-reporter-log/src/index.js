import AbstractCrashReporter from '@template-app/abstract-crash-reporter';

export default class CrashReporter extends AbstractCrashReporter {
	constructor() {
		super();
	}

	captureException(exception) {
		console.log(exception);
	}
}
