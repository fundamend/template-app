import { Milestone } from '@template-app/entities';

export const makeSubscribeRelatedMilestones = ({ StorageService }) => {
	return async (entity, query, callback) => {
		await StorageService.subscribeRelated(
			entity.type,
			entity.id,
			'milestones',
			query,
			(results) => {
				const mappedResults = results?.map((result) => {
					const milestone = new Milestone();
					return milestone.fromObject(result);
				});
				callback(mappedResults);
			}
		);
	};
};
