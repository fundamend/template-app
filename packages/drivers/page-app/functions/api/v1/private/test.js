import CookieService from '@template-app/service-cookie';
import JWTService from '@template-app/service-jwt';

export async function onRequest({ request }) {
	const cookieService = new CookieService();
	const jwtService = new JWTService();
	cookieService.parse(request.headers.get('Cookie') || '');
	const sessionToken = cookieService.getCookie('__session');

	if (!sessionToken) {
		return new Response(JSON.stringify({ message: 'no token' }));
	} else {
		return new Response(JSON.stringify(jwtService.decode(sessionToken)));
	}
}
