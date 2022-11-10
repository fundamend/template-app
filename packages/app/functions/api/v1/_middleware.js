import sentryPlugin from '@cloudflare/pages-plugin-sentry';
import pkg from '../../../package.json';

const test = async ({ next }) => {
	const response = await next();
	response.headers.set('X-Hello', 'from a Cloudflare Pages middleware');
	return response;
};

export const onRequest = [
	(context) => {
		return sentryPlugin({
			dsn: context.env.SENTRY_DSN,
			environment: context.env.NODE_ENV,
			release: pkg.version
		})(context);
	},
	test
];
