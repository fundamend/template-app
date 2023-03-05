import { Milestone } from '@template-app/entities';

export const makeReadMilestone = ({ StorageService }) => {
	return async (id) => {
		const stored = await StorageService.read('milestone', id);
		const milestone = new Milestone();
		return milestone.fromObject(stored);
	};
};
