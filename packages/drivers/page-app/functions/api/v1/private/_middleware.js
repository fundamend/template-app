import CookieService from '@fundamend/service-cookie';
import JWTService from '@fundamend/service-jwt';

const validateJWT = async ({ request, next, env }) => {
	const cookieService = new CookieService();
	const jwtService = new JWTService();
	cookieService.parse(request.headers.get('Cookie') || '');
	const sessionToken = cookieService.getCookie('__session').value;

	// TODO: Make this more generic
	const publicKey =
		'-----BEGIN PUBLIC KEY-----\n' +
		env.PUBLIC_CLERK_JWT_VERIFICATION_KEY.match(/.{1,64}/g).join('\n') +
		'\n-----END PUBLIC KEY-----';

	let isValid = false;

	// TODO: Make algorithm a parameter
	if (sessionToken) {
		isValid = await jwtService.verify(sessionToken, publicKey, {
			algorithm: 'RS256'
		});
	}

	if (!isValid) {
		return new Response('invalid session token', { status: 401 });
	} else {
		return next();
	}
};

export const onRequest = [validateJWT];
