import AbstractStorageService from '@template-app/abstract-service-storage';
import { MemorySource } from '@orbit/memory';
import { IndexedDBSource } from '@orbit/indexeddb';
import { Coordinator, SyncStrategy } from '@orbit/coordinator';

export default class StorageService extends AbstractStorageService {
	#ORBIT_SCHEMA;
	#memory;
	#backup;

	constructor({ ORBIT_SCHEMA }) {
		super();
		this.#ORBIT_SCHEMA = ORBIT_SCHEMA;
	}

	async #initialize() {
		if (!this.#memory) {
			this.#memory = new MemorySource({
				schema: this.#ORBIT_SCHEMA,
				autoValidate: false //TODO: add validation
			});

			this.#backup = new IndexedDBSource({
				schema: this.#ORBIT_SCHEMA,
				name: 'backup',
				autoValidate: false //TODO: add validation
			});

			const coordinator = new Coordinator({
				sources: [this.#memory, this.#backup]
			});

			const backupMemorySync = new SyncStrategy({
				source: 'memory',
				target: 'backup',
				blocking: true
			});

			coordinator.addStrategy(backupMemorySync);

			let allRecords = await this.#backup.query((q) => q.findRecords());
			await this.#memory.sync((t) => allRecords.map((r) => t.addRecord(r)));
			await coordinator.activate();
		}
		return this.#memory;
	}

	async create(type, entity) {
		const memory = await this.#initialize();
		const mappedEntity = this.#mapFromObject(type, [entity.toJSON()])[0];
		mappedEntity.id = self.crypto.randomUUID();
		await memory.update((t) => [t.addRecord(mappedEntity)]);
		return mappedEntity.id;
	}

	async relate(entityFrom, type, entityTo) {
		const memory = await this.#initialize();
		await memory.update((t) =>
			t.addToRelatedRecords(
				{ id: entityFrom.id, type: entityFrom.type },
				type,
				{ id: entityTo.id, type: entityTo.type }
			)
		);
	}

	async read(type, id) {
		const memory = await this.#initialize();
		const result = await memory.query((q) =>
			q.findRecord({ type: type, id: id })
		);
		return this.#mapToObject([result]);
	}

	async readAll(type) {
		const memory = await this.#initialize();
		const results = await memory.query((q) => q.findRecords(type));
		return this.#mapToObject(results);
	}

	async update(type, entity) {
		const memory = await this.#initialize();
		await memory.update((t) =>
			t.updateRecord(this.#mapFromObject(type, [entity.toJSON()])[0])
		);
	}

	async delete(type, id) {
		const memory = await this.#initialize();
		await memory.update((q) => q.removeRecord({ type: type, id: id }));
	}

	async subscribe(type, callback) {
		const memory = await this.#initialize();

		// return instant results
		callback(await this.readAll(type));

		// setup live query to update results on changes
		const liveQuery = memory.cache.liveQuery((q) => q.findRecords(type));
		liveQuery.subscribe(async (update) => {
			const results = await update.query();
			callback(this.#mapToObject(results));
		});
	}

	async find(type, query) {
		const memory = await this.#initialize();
		const filter = query.map((q) => this.#mapToFilter(q)) || [];
		const results = await memory.query((q) =>
			q.findRecords(type).filter(...filter)
		);
		return this.#mapToObject(results);
	}

	async findRelated(type, id, relatedType, query) {
		const memory = await this.#initialize();
		const filter = query.map((q) => this.#mapToFilter(q)) || [];
		const results = await memory.query((q) =>
			q
				.findRelatedRecords({ id: id, type: type }, relatedType)
				.filter(...filter)
		);
		return this.#mapToObject(results);
	}

	async subscribeRelated(type, id, relatedType, query, callback) {
		const memory = await this.#initialize();
		const filter = query.map((q) => this.#mapToFilter(q)) || [];

		// return instant results
		callback(await this.findRelated(type, id, relatedType, query));

		const liveQuery = memory.cache.liveQuery((q) =>
			q
				.findRelatedRecords({ id: id, type: type }, relatedType)
				.filter(...filter)
		);
		liveQuery.subscribe(async (update) => {
			const results = await update.query();
			callback(this.#mapToObject(results));
		});
	}

	async import() {
		// TODO
	}

	async export() {
		// TODO
	}

	// map from plain js objects to orbitjs record objects
	#mapFromObject = (type, objects) => {
		return objects?.map((object) => {
			const { id, ...attributes } = object;
			return { id: id, type: type, attributes: attributes };
		});
	};

	// map from orbitjs record objects to plain js objects
	#mapToObject = (records) => {
		return records?.map((record) => {
			return { id: record.id, ...record.attributes };
		});
	};

	// map from query array to orbitjs filter
	#mapToFilter = (query) => {
		let operation;
		switch (query[1]) {
			case '==':
				operation = 'equal';
				break;
			case '<':
				operation = 'lt';
				break;
			case '>':
				operation = 'gt';
				break;
			case '<=':
				operation = 'lte';
				break;
			case '>=':
				operation = 'gte';
				break;
		}
		return { attribute: query[0], op: operation, value: query[2] };
	};
}
