export const makeUpdateMeasure = ({ StorageService }) => {
	return async (entity) => {
		await StorageService.update('measure', entity);
	};
};
