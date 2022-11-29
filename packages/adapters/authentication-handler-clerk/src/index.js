import AbstractAuthenticationHandler from '@template-app/abstract-authentication-handler';
import Clerk from '@clerk/clerk-js';

export default class AuthenticationHandler extends AbstractAuthenticationHandler {
	#clerk;

	constructor(options) {
		super();
		const clerkFrontendApi = options.clerkFrontendApi;
		this.#clerk = new Clerk(clerkFrontendApi);
	}

	/*
	 ** We need an async constructor because we have to wait for Clerk to load.
	 ** There is no really clean way to do this (yet).
	 ** Once solution: https://dev.to/somedood/the-proper-way-to-write-async-constructors-in-javascript-1o8c
	 ** This solution: https://stackoverflow.com/questions/56782792/nodejs-javascript-design-patterns-to-avoid-async-mess
	 ** TODO: What if another implementation of this handler doesn't need this and would therefore be synchronouse?
	 ** Per convention, always use async factory functions for all handlers, even if not required?
	 ** Maybe better for passing in dependencies where needed?
	 */
	#initialize() {
		if (this.#clerk.isReady()) {
			return Promise.resolve(this.#clerk);
		} else {
			return this.#clerk.load().then((instance) => {
				this.#clerk = instance;
				return instance;
			});
		}
	}

	async logIn() {
		const clerk = await this.#initialize();
		await clerk.redirectToSignIn();
	}

	async logOut(callback) {
		const clerk = await this.#initialize();
		await clerk.signOut(async () => {
			await callback();
		});
	}

	async isLoggedIn() {
		const clerk = await this.#initialize();
		return (await clerk.session?.status) === 'active' ? true : false;
	}

	async isLoggedOut() {
		return !(await this.isLoggedIn());
	}
}
