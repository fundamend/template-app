/* global callUndefinedFunction, PUBLIC_ENVIRONMENT, PUBLIC_SENTRY_DSN */

import CrashHandler from '@template-app/adapter-crash-handler-sentry';
import { version } from '@template-app/worker-stripe/package.json';

addEventListener('fetch', (event) => {
	const environment = PUBLIC_ENVIRONMENT;
	let crashHandler;

	async function handleRequest() {
		try {
			callUndefinedFunction();
		} catch (error) {
			if (environment != 'development') {
				if (!crashHandler) {
					crashHandler = new CrashHandler({
						dsn: PUBLIC_SENTRY_DSN,
						context: event,
						environment: environment,
						release: version
					});
				}
				crashHandler.captureException(error);
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
