import sentryPlugin from '@cloudflare/pages-plugin-sentry';

const test = async ({ next }) => {
	const response = await next();
	response.headers.set('X-Hello', 'from a Cloudflare Pages middleware');
	return response;
}

export const onRequest = [
	(context) => {
		return sentryPlugin({ dsn: context.env.SENTRY_DSN })(context);
	},
	test
];
