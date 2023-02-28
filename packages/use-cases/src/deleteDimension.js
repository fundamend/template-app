export const makeDeleteDimension = ({ StorageService }) => {
	return async (id) => {
		return await StorageService.delete('dimension', id);
	};
};
