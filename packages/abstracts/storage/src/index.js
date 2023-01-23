export default class AbstractStorageService {
	constructor() {
		if (this.constructor == AbstractStorageService) {
			throw new Error("Abstract classes can't be instantiated.");
		}
	}

	async create() {
		throw new Error("Method 'create()' must be implemented.");
	}

	async read() {
		throw new Error("Method 'read()' must be implemented.");
	}

	async readAll() {
		throw new Error("Method 'readAll()' must be implemented.");
	}

	async update() {
		throw new Error("Method 'update()' must be implemented.");
	}

	async delete() {
		throw new Error("Method 'delete()' must be implemented.");
	}

	async subscribe() {
		throw new Error("Method 'subscribe()' must be implemented.");
	}

	async find() {
		throw new Error("Method 'find()' must be implemented.");
	}

	async import() {
		throw new Error("Method 'import()' must be implemented.");
	}

	async export() {
		throw new Error("Method 'export()' must be implemented.");
	}
}
