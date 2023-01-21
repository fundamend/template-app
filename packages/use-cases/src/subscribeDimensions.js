import { Dimension } from '@template-app/entities';

export const makeSubscribeDimensions = ({ StorageService }) => {
	return async (callback) => {
		await StorageService.subscribe('dimension', (results) => {
			const mappedResults = results.map((result) => {
				const dimension = new Dimension();
				return dimension.fromObject(result);
			});
			callback(mappedResults);
		});
	};
};
