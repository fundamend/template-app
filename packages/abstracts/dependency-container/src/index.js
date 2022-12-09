export default class AbstractDependencyContainerService {
	constructor() {
		if (this.constructor == AbstractDependencyContainerService) {
			throw new Error("Abstract classes can't be instantiated.");
		}
	}

	async register() {
		throw new Error("Method 'register()' must be implemented.");
	}

	async resolve() {
		throw new Error("Method 'resolve()' must be implemented.");
	}
}
