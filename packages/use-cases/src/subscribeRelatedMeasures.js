import { Measure } from '@template-app/entities';

export const makeSubscribeRelatedMeasures = ({ StorageService }) => {
	return async (entity, query, callback) => {
		await StorageService.subscribeRelated(
			entity.type,
			entity.id,
			'measures',
			query,
			(results) => {
				const mappedResults = results.map((result) => {
					const measure = new Measure();
					return measure.fromObject(result);
				});
				callback(mappedResults);
			}
		);
	};
};
