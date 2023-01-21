export default class Base {
	#id;

	constructor(id) {
		this.id = id;
	}

	set id(id) {
		this.#id = id;
	}

	get id() {
		return this.#id;
	}

	fromObject() {
		throw new Error("Method 'fromObject' must be implemented.");
	}

	// Is called by JSON.stringify(object)
	toJSON() {
		throw new Error("Method 'toJSON' must be implemented.");
	}
}
