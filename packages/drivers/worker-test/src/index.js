/* global callUndefinedFunction, PUBLIC_ENVIRONMENT, PUBLIC_SENTRY_DSN */

import CrashService from '@template-app/service-crash-sentry';
import { version } from '@template-app/worker-test/package.json';

addEventListener('fetch', (event) => {
	const environment = PUBLIC_ENVIRONMENT;
	let crashService;

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
				if (!crashService) {
					crashService = new CrashService({
						dsn: PUBLIC_SENTRY_DSN,
						context: event,
						environment: environment,
						release: version
					});
				}
				crashService.captureException(error);
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
