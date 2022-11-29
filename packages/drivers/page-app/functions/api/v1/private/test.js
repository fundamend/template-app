import CookieHandler from '@template-app/adapter-cookie-handler';
import JWTHandler from '@template-app/adapter-jwt-handler';

export async function onRequest({ request }) {
	const cookieHandler = new CookieHandler();
	const jwtHandler = new JWTHandler();
	cookieHandler.parse(request.headers.get('Cookie') || '');
	const sessionToken = cookieHandler.getCookie('__session');

	if (!sessionToken) {
		return new Response(JSON.stringify({ message: 'no token' }));
	} else {
		return new Response(JSON.stringify(jwtHandler.decode(sessionToken)));
	}
}
