import AbstractCrashService from '@template-app/abstract-service-crash';
import Toucan from 'toucan-js';

export default class CrashService extends AbstractCrashService {
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
