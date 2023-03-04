import { Milestone } from '@template-app/entities';

export const makeCreateMilestone = ({ StorageService }) => {
	return async (dimension, milestone) => {
		const newMilestone = new Milestone();
		newMilestone.dimension = dimension;
		newMilestone.threshold = milestone.threshold;
		newMilestone.type = milestone.type;
		newMilestone.reached = milestone.reached;
		const stored = await StorageService.create('milestone', newMilestone);
		await StorageService.relate(
			{ id: dimension, type: 'dimension' },
			'milestones',
			{ id: stored, type: 'milestone' }
		);
		return stored;
	};
};
