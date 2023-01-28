import { Measure } from '@template-app/entities';

export const makeFindRelatedMeasures = ({ StorageService }) => {
	return async (entity, query) => {
		const stored = await StorageService.findRelated(
			entity.type,
			entity.id,
			'measures',
			query
		);
		return stored.map((s) => {
			const measure = new Measure();
			return measure.fromObject(s);
		});
	};
};
