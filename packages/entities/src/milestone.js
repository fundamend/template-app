import Base from '@template-app/entities/src/base.js';

export class Milestone extends Base {
	#dimension;
	#threshold;
	#type;
	#reached;

	constructor(id) {
		super(id);
	}

	get dimension() {
		return this.#dimension;
	}

	set dimension(dimension) {
		this.#dimension = dimension;
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
}
