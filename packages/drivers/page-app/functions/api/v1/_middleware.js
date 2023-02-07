import CrashService from '@fundamend/service-crash-sentry';
import { version } from '@template-app/page-app/package.json';

const reportCrash = async (context) => {
	try {
		return await context.next();
	} catch (error) {
		if (context.env.PUBLIC_ENVIRONMENT !== 'development') {
			const crashService = new CrashService({
				context: context,
				SENTRY_DSN: context.env.PUBLIC_SENTRY_DSN,
				ENVIRONMENT: context.env.PUBLIC_ENVIRONMENT,
				VERSION: version
			});
			await crashService.captureException(error);
			return new Response('Something went wrong' + error, {
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
