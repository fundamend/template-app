import { Measure } from '@template-app/entities';

export const makeReadMeasure = ({ StorageService }) => {
	return async (id) => {
		const stored = await StorageService.read('measure', id);
		const measure = new Measure();
		return measure.fromObject(stored);
	};
};
