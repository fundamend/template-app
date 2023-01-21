import { Dimension } from '@template-app/entities';

export const makeCreateDimension = ({ StorageService }) => {
	return async (name) => {
		const dimension = new Dimension();
		dimension.name = name;
		const stored = await StorageService.create('dimension', dimension);
		return stored;
	};
};
