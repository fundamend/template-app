import { Measure } from '@template-app/entities';

export const makeCreateMeasure = ({ StorageService }) => {
	return async (dimension, measure) => {
		const newMeasure = new Measure();
		newMeasure.dimension = dimension;
		newMeasure.value = measure.value;
		const stored = await StorageService.create('measure', newMeasure);
		await StorageService.relate(
			{ id: dimension, type: 'dimension' },
			'measures',
			{ id: stored, type: 'measure' }
		);
		return stored;
	};
};
