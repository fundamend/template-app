export const makeUpdateDimension = ({ StorageService }) => {
	return async (entity) => {
		await StorageService.update('dimension', entity);
	};
};
