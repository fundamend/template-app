import { Dimension } from '@template-app/entities';

export const makeReadDimension = ({ StorageService }) => {
	return async (id) => {
		const stored = await StorageService.read('dimension', id);
		const dimension = new Dimension();
		return dimension.fromObject(stored);
	};
};
