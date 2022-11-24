export default class Test {
	#name;

	constructor(name) {
		this.name = name?.trim() || 'undefined';
	}

	get name() {
		return this.#name;
	}

	set name(name) {
		this.#name = name;
	}
}
