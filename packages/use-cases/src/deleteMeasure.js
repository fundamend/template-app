export const makeDeleteMeasure = ({ StorageService }) => {
	return async (id) => {
		return await StorageService.delete('measure', id);
	};
};
