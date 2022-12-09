import AbstractDependencyContainerService from '@template-app/abstract-service-dependency-container';
import { createContainer, asValue, asClass } from 'awilix';

export default class DependencyContainerService extends AbstractDependencyContainerService {
	#container;

	constructor() {
		super();

		this.#container = createContainer();
	}

	async register(entities) {
		entities.forEach((entity) => {
			switch (entity.type) {
				case 'value':
					this.#registerValue(entity.name, entity.value);
					break;
				case 'class':
					if (entity.singleton) {
						this.#registerSingletonClass(entity.name, entity.value);
					} else {
						this.#registerClass(entity.name, entity.value);
					}
					break;
				default:
					throw new Error(
						`Don't know how to register '${entity.type}' with name '${entity.name}'`
					);
			}
		});
	}

	async resolve(name) {
		return this.#container.resolve(name);
	}

	#registerValue(name, value) {
		this.#container.register({ [name]: asValue(value) });
	}

	#registerClass(name, value) {
		this.#container.register({ [name]: asClass(value) });
	}

	#registerSingletonClass(name, value) {
		this.#container.register({ [name]: asClass(value).singleton() });
	}
}
