const test = async ({ next }) => {
	const response = await next();
	response.headers.set('X-Hello', 'from a Cloudflare Pages middleware');
	return response;
}

export const onRequest = [test];
