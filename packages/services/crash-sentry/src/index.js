import AbstractCrashService from '@template-app/abstract-service-crash';
import Toucan from 'toucan-js';

export default class CrashService extends AbstractCrashService {
	#sentry;

	constructor({ context, SENTRY_DSN, ENVIRONMENT, VERSION }) {
		super();

		// TODO: context has to include waitUntil for events to be send. See https://github.com/robertcepa/toucan-js
		// see here for options to implement: https://github.com/jeffijoe/awilix/issues/148
		// Use scoped container that sets only context?
		this.#sentry = new Toucan({
			context: context,
			dsn: SENTRY_DSN,
			environment: ENVIRONMENT,
			release: VERSION
		});
	}

	async captureException(exception) {
		this.#sentry.captureException(exception);
	}
}
