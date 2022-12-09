import AbstractCrashService from '@template-app/abstract-service-crash';
import * as Sentry from '@sentry/browser';
import { BrowserTracing } from '@sentry/tracing';

export default class CrashService extends AbstractCrashService {
	constructor({ SENTRY_DSN, SENTRY_TRACE_SAMPLE_RATE, ENVIRONMENT, VERSION }) {
		super();

		Sentry.init({
			dsn: SENTRY_DSN,
			environment: ENVIRONMENT,
			release: VERSION,
			integrations: [new BrowserTracing()],
			tracesSampleRate: SENTRY_TRACE_SAMPLE_RATE
		});
	}
}
