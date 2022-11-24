import AbstractCrashReporter from '@template-app/abstract-crash-reporter';
import Toucan from 'toucan-js';

export default class CrashReporter extends AbstractCrashReporter {
	#sentry;

	constructor(parameters) {
		super();
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