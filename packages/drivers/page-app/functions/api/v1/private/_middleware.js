import CookieHandler from '@template-app/adapter-cookie-handler';
import JWTHandler from '@template-app/adapter-jwt-handler';

const validateJWT = async ({ request, next, env }) => {
	const cookieHandler = new CookieHandler();
	const jwtHandler = new JWTHandler();
	cookieHandler.parse(request.headers.get('Cookie') || '');
	const sessionToken = cookieHandler.getCookie('__session');

	// TODO: Make this more generic
	const publicKey =
		'-----BEGIN PUBLIC KEY-----\n' +
		env.PUBLIC_CLERK_JWT_VERIFICATION_KEY.match(/.{1,64}/g).join('\n') +
		'\n-----END PUBLIC KEY-----';

	let isValid = false;

	// TODO: Make algorithm a parameter
	if (sessionToken) {
		isValid = await jwtHandler.verify(sessionToken, publicKey, {
			algorithm: 'RS256'
		});
	}

	if (!isValid) {
		return new Response(null, { status: 401 });
	} else {
		return next();
	}
};

export const onRequest = [validateJWT];
