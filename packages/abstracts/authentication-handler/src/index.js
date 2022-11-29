export default class AbstractAuthenticationHandler {
	constructor() {
		if (this.constructor == AbstractAuthenticationHandler) {
			throw new Error("Abstract classes can't be instantiated.");
		}
	}

	async logIn() {
		throw new Error("Method 'logIn()' must be implemented.");
	}

	async logOut() {
		throw new Error("Method 'logOut()' must be implemented.");
	}

	async isLoggedIn() {
		throw new Error("Method 'isLoggedIn()' must be implemented.");
	}

	async isLoggedOut() {
		throw new Error("Method 'isLoggedOut()' must be implemented.");
	}
}
