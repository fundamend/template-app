export const makeUpdateMilestone = ({ StorageService }) => {
	return async (entity) => {
		await StorageService.update('milestone', entity);
	};
};
