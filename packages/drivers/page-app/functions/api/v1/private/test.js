import CookieService from '@fundamend/service-cookie';
import JWTService from '@fundamend/service-jwt';

export async function onRequest({ request }) {
	const cookieService = new CookieService();
	const jwtService = new JWTService();
	cookieService.parse(request.headers.get('Cookie') || '');
	const sessionToken = cookieService.getCookie('__session').value;

	if (!sessionToken) {
		return new Response(JSON.stringify({ message: 'no token' }));
	} else {
		return new Response(JSON.stringify(await jwtService.decode(sessionToken)));
	}
}
