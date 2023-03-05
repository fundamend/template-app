import { Milestone } from '@template-app/entities';

export const makeFindMilestones = ({ StorageService }) => {
	return async (query) => {
		const stored = await StorageService.find('milestone', query);
		return stored?.map((s) => {
			const milestone = new Milestone();
			return milestone.fromObject(s);
		});
	};
};
