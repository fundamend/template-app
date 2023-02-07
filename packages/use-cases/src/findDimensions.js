import { Dimension } from '@template-app/entities';

export const makeFindDimensions = ({ StorageService }) => {
	return async (query) => {
		const stored = await StorageService.find('dimension', query, 'measures');
		console.log('stored', stored);
		return stored?.map((s) => {
			const dimension = new Dimension();
			return dimension.fromObject(s);
		});
	};
};
