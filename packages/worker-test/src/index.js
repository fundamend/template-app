/* global callUndefinedFunction, PUBLIC_ENVIRONMENT, PUBLIC_SENTRY_DSN */

import CrashReporter from '@template-app/adapter-crash-reporter-sentry';
import { version } from '../package.json';

addEventListener('fetch', (event) => {
	const environment = PUBLIC_ENVIRONMENT;
	let crashReporter;

	async function handleRequest(request) {
		try {
			const body = await request.json();
			if (body.fail) {
				callUndefinedFunction();
			}
			return new Response(JSON.stringify(body), {
				headers: { 'Content-type': 'application/json' }
			});
		} catch (error) {
			if (environment != 'development') {
				if (!crashReporter) {
					crashReporter = new CrashReporter({
						dsn: PUBLIC_SENTRY_DSN,
						context: event,
						environment: environment,
						release: version
					});
				}
				crashReporter.captureException(error);
				return new Response('Something went wrong', {
					status: 500,
					statusText: 'Internal Server Error'
				});
			} else {
				throw error;
			}
		}
	}

	event.respondWith(handleRequest(event.request));
});
