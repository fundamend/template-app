import Base from '@template-app/entities/src/base.js';

export class Measure extends Base {
	#value;
	#dimension;
	#timestamp;

	constructor(id) {
		super(id);
		this.#timestamp = new Date().toISOString();
	}

	set value(value) {
		this.#value = value;
	}

	get value() {
		return this.#value;
	}

	set dimension(dimension) {
		this.#dimension = dimension;
	}

	get dimension() {
		return this.#dimension;
	}

	set timestamp(timestamp) {
		this.#timestamp = new Date(timestamp).toISOString();
	}

	get timestamp() {
		return this.#timestamp;
	}

	fromObject(object) {
		return Object.assign(this, object);
	}

	toJSON() {
		return {
			id: this.id,
			value: this.value,
			dimension: this.dimension,
			timestamp: this.timestamp
		};
	}
}
