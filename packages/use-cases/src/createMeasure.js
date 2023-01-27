import { Measure } from '@template-app/entities';

export const makeCreateMeasure = ({ StorageService }) => {
	return async (dimension, measure) => {
		const newMeasure = new Measure();
		newMeasure.dimension = dimension;
		newMeasure.value = measure.value;
		const stored = await StorageService.create('measure', newMeasure);
		return stored;
	};
};
