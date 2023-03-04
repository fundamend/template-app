import Base from '@template-app/entities/src/base.js';

export class Milestone extends Base {
	#dimension;
	#threshold;
	#type;
	#reached;

	constructor(id) {
		super(id);
		this.reached = false;
	}

	set dimension(dimension) {
		this.#dimension = dimension;
	}

	get dimension() {
		return this.#dimension;
	}

	set threshold(threshold) {
		this.#threshold = threshold;
	}

	get threshold() {
		return this.#threshold;
	}

	set type(type) {
		this.#type = type;
	}

	get type() {
		return this.#type;
	}

	set reached(reached) {
		this.#reached = reached;
	}

	get reached() {
		return this.#reached;
	}

	fromObject(object) {
		return Object.assign(this, object);
	}

	toJSON() {
		return {
			id: this.id,
			dimension: this.dimension,
			threshold: this.threshold,
			type: this.type,
			reached: this.reached
		};
	}
}
