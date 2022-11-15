import CrashReporter from '../../../lib/sentry-crash-reporter.js';
import { version } from '../package.json';

addEventListener('fetch', (event) => {
	const environment =  NODE_ENV;
	let crashReporter;

	async function handleRequest(request) {
		try {
			const body = await request.json();
			if(body.fail) {
				callUndefinedFunction();
			}
			return new Response(JSON.stringify(body), {
				headers: { 'Content-type': 'application/json' }
			});
		} catch (error) {
			if(environment != 'development') {
				if (!crashReporter) {
					crashReporter = new CrashReporter({
						dsn: SENTRY_DSN,
						context: event,
						environment: environment,
						release: version
					});
				}
				crashReporter.captureException(error);
				return new Response('Something went wrong', {
					status: 500,
					statusText: 'Internal Server Error',
				});
			} else {
				throw error;
			}
		}
	}

	event.respondWith(handleRequest(event.request));
});
