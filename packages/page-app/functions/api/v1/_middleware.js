import CrashReporter from '@template-app/adapter-crash-reporter-sentry';
import pkg from '../../../package.json';

const reportCrash = async (context) => {
	try {
		return await context.next();
	} catch (error) {
		if (context.env.PUBLIC_ENVIRONMENT != 'development') {
			const crashReporter = new CrashReporter({
				context: context,
				dsn: context.env.PUBLIC_SENTRY_DSN,
				environment: context.env.PUBLIC_ENVIRONMENT,
				release: pkg.version
			});
			crashReporter.captureException(error);
			return new Response('Something went wrong', {
				status: 500,
				statusText: 'Internal Server Error'
			});
		} else {
			throw error;
		}
	}
};

const test = async (context) => {
	const response = await context.next();
	response.headers.set('X-Hello', 'from a Cloudflare Pages middleware');
	return response;
};

export const onRequest = [reportCrash, test];
