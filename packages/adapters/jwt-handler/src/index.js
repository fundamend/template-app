import AbstractJWTHandler from '@template-app/abstract-jwt-handler';
import jwt from '@tsndr/cloudflare-worker-jwt';

export default class JWTHandler extends AbstractJWTHandler {
	constructor() {
		super();
	}

	verify(token, secret, options) {
		jwt.verify(token, secret, { algorithm: options.algorithm });
	}

	decode(token) {
		jwt.decode(token);
	}
}
