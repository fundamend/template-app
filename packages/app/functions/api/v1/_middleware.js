import CrashReporter from '../../../../../lib/sentry-crash-reporter';
import pkg from '../../../package.json';

const reportCrash = async (context) => {
	try {
		return await context.next();
	} catch (error) {
		console.log('#### CrashReporter');
		if(context.env.NODE_ENV != 'development') {
		const crashReporter = new CrashReporter({
			context: context,
			dsn: context.env.SENTRY_DSN,
			environment: context.env.NODE_ENV,
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
