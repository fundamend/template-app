/* global callUndefinedFunction, PUBLIC_ENVIRONMENT, PUBLIC_SENTRY_DSN */

import CrashHandler from '@template-app/adapter-crash-handler-sentry';
import { version } from '@template-app/worker-test/package.json';

addEventListener('fetch', (event) => {
	const environment = PUBLIC_ENVIRONMENT;
	let crashHandler;

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
				if (!crashHandler) {
					crashHandler = new CrashHandler({
						dsn: PUBLIC_SENTRY_DSN,
						context: event,
						environment: environment,
						release: version
					});
				}
				crashHandler.captureException(error);
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
