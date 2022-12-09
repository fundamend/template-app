import AbstractAuthenticationService from '@template-app/abstract-service-authentication';

export default class AuthenticationService extends AbstractAuthenticationService {
	#Clerk;
	#CLERK_FRONTEND_API;
	#clerk;

	constructor({ CLERK_FRONTEND_API }) {
		super();
		this.#CLERK_FRONTEND_API = CLERK_FRONTEND_API;
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
	async #initialize() {
		// Clerk expects document when importing, so we have to defere the import to here.
		// This means that calling any function of the AuthenticationService has to happen after ir or after onMount(), otherwise it will fail.
		if (!this.#Clerk) {
			this.#Clerk = (await import('@clerk/clerk-js')).default;
		}
		if (!this.#clerk) {
			this.#clerk = new this.#Clerk(this.#CLERK_FRONTEND_API);
		}
		if (this.#clerk.isReady()) {
			return Promise.resolve(this.#clerk);
		} else {
			await this.#clerk.load();
			return this.#clerk;
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
