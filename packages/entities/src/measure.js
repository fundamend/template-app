import Base from '@template-app/entities/src/base.js';

export class Measure extends Base {
	#value;
	#dimension;
	#timestamp;

	constructor(id) {
		super(id);
		this.#timestamp = new Date().toISOString();
	}

	get value() {
		return this.#value;
	}

	set value(value) {
		this.#value = value;
	}

	get dimension() {
		return this.#dimension;
	}

	set dimension(dimension) {
		this.#dimension = dimension;
	}

	get timestamp() {
		return this.#timestamp;
	}

	set timestamp(timestamp) {
		this.#timestamp = new Date(timestamp).toISOString();
	}
}
