import Toucan from 'toucan-js';

export default class CrashReporter {
	#sentry;

	constructor(parameters) {
		this.#sentry = new Toucan({
			dsn: parameters.dsn,
			context: parameters.context,
			environment: parameters.environment,
			release: parameters.version
		});
	}

	captureException(exception) {
		this.#sentry.captureException(exception);
	}
}
