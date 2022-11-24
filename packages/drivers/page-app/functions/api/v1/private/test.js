import { parse } from 'cookie';
import jwt from '@tsndr/cloudflare-worker-jwt';

export async function onRequest({ request }) {
	const cookies = parse(request.headers.get('Cookie') || '');
	const sessionToken = cookies['__session'];

	if (!sessionToken) {
		return new Response(JSON.stringify({ message: 'no token' }));
	} else {
		return new Response(JSON.stringify(jwt.decode(sessionToken)));
	}
}
