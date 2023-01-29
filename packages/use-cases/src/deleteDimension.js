export const makeDeleteDimension = ({ StorageService }) => {
	// TODO: delete related measures and milestones
	return async (id) => {
		return await StorageService.delete('dimension', id);
	};
};
