import AbstractCrashService from '@template-app/abstract-service-crash';

export default class CrashService extends AbstractCrashService {
	constructor() {
		super();
	}

	async captureException(exception) {
		console.log(exception);
	}
}
