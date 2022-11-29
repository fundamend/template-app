import AbstractJWTService from '@template-app/abstract-service-jwt';
import jwt from '@tsndr/cloudflare-worker-jwt';

export default class JWTService extends AbstractJWTService {
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
