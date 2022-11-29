import CrashHandler from '@template-app/adapter-crash-handler-sentry';
import { version } from '@template-app/page-app/package.json';

const reportCrash = async (context) => {
	try {
		return await context.next();
	} catch (error) {
		if (context.env.PUBLIC_ENVIRONMENT != 'development') {
			const crashHandler = new CrashHandler({
				context: context,
				dsn: context.env.PUBLIC_SENTRY_DSN,
				environment: context.env.PUBLIC_ENVIRONMENT,
				release: version
			});
			crashHandler.captureException(error);
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
