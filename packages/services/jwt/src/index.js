import AbstractJWTService from '@template-app/abstract-service-jwt';
import jwt from '@tsndr/cloudflare-worker-jwt';

export default class JWTService extends AbstractJWTService {
	constructor() {
		super();
	}

	async encode(payload, secret, options) {
		const mappedOptions = {
			algorithm: options?.algorithm || 'HS256'
		};
		return await jwt.sign(payload, secret, mappedOptions);
	}

	async verify(token, secret, options) {
		const mappedOptions = {
			algorithm: options?.algorithm || 'HS256'
		};
		return await jwt.verify(token, secret, mappedOptions);
	}

	async decode(token) {
		return await jwt.decode(token);
	}
}
