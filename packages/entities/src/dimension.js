import Base from '@template-app/entities/src/base.js';

export class Dimension extends Base {
	#name;

	constructor(id) {
		super(id);
	}

	set name(name) {
		this.#name = name;
	}

	get name() {
		return this.#name;
	}

	fromObject(object) {
		return Object.assign(this, object);
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name
		};
	}
}
