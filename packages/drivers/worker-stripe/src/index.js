/* global callUndefinedFunction, PUBLIC_ENVIRONMENT, PUBLIC_SENTRY_DSN */

import CrashService from '@template-app/service-crash-sentry';
import { version } from '@template-app/worker-stripe/package.json';

addEventListener('fetch', (event) => {
	const environment = PUBLIC_ENVIRONMENT;
	let crashService;

	async function handleRequest() {
		try {
			callUndefinedFunction();
		} catch (error) {
			if (environment != 'development') {
				if (!crashService) {
					crashService = new CrashService({
						dsn: PUBLIC_SENTRY_DSN,
						context: event,
						environment: environment,
						release: version
					});
				}
				crashService.captureException(error);
				return new Response(JSON.stringify({ received: true }), {
					headers: { 'Content-type': 'application/json' }
				});
			} else {
				throw error;
			}
		}
	}

	event.respondWith(handleRequest(event.request));
});
