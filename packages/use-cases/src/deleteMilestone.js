export const makeDeleteMilestone = ({ StorageService }) => {
	return async (id) => {
		return await StorageService.delete('milestone', id);
	};
};
