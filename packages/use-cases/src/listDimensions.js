import { Dimension } from '@template-app/entities';

export const makeListDimensions = ({ StorageService }) => {
	return async () => {
		const stored = await StorageService.readAll('dimension');
		return stored.map((s) => {
			const dimension = new Dimension();
			return dimension.fromObject(s);
		});
	};
};
