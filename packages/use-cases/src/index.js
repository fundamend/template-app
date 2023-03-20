import { makeCreateDimension } from '@template-app/use-cases/src/createDimension.js';
import { makeCreateMeasure } from '@template-app/use-cases/src/createMeasure.js';
import { makeCreateMilestone } from '@template-app/use-cases/src/createMilestone.js';
import { makeDeleteDimension } from '@template-app/use-cases/src/deleteDimension.js';
import { makeDeleteMeasure } from '@template-app/use-cases/src/deleteMeasure.js';
import { makeDeleteMilestone } from '@template-app/use-cases/src/deleteMilestone.js';
import { makeListDimensions } from '@template-app/use-cases/src/listDimensions.js';
import { makeReadDimension } from '@template-app/use-cases/src/readDimension.js';
import { makeReadMeasure } from '@template-app/use-cases/src/readMeasure.js';
import { makeReadMilestone } from '@template-app/use-cases/src/readMilestone.js';
import { makeSubscribeDimensions } from '@template-app/use-cases/src/subscribeDimensions.js';
import { makeUpdateDimension } from '@template-app/use-cases/src/updateDimension.js';
import { makeUpdateMeasure } from '@template-app/use-cases/src/updateMeasure.js';
import { makeUpdateMilestone } from '@template-app/use-cases/src/updateMilestone.js';
import { makeFindDimensions } from '@template-app/use-cases/src/findDimensions.js';
import { makeFindMilestones } from '@template-app/use-cases/src/findMilestones.js';
import { makeFindRelatedMeasures } from '@template-app/use-cases/src/findRelatedMeasures.js';
import { makeSubscribeRelatedMeasures } from '@template-app/use-cases/src/subscribeRelatedMeasures.js';
import { makeSubscribeRelatedMilestones } from '@template-app/use-cases/src/subscribeRelatedMilestones.js';
import { makeUpdateMilestoneReached } from '@template-app/use-cases/src/updateMilestoneReached.js';

export default class UseCaseFactory {
	#useCases = {
		createDimension: makeCreateDimension,
		createMeasure: makeCreateMeasure,
		createMilestone: makeCreateMilestone,
		deleteDimension: makeDeleteDimension,
		deleteMeasure: makeDeleteMeasure,
		deleteMilestone: makeDeleteMilestone,
		listDimensions: makeListDimensions,
		readDimension: makeReadDimension,
		readMeasure: makeReadMeasure,
		readMilestone: makeReadMilestone,
		subscribeDimensions: makeSubscribeDimensions,
		updateDimension: makeUpdateDimension,
		updateMeasure: makeUpdateMeasure,
		updateMilestone: makeUpdateMilestone,
		findDimensions: makeFindDimensions,
		findMilestones: makeFindMilestones,
		findRelatedMeasures: makeFindRelatedMeasures,
		subscribeRelatedMeasures: makeSubscribeRelatedMeasures,
		subscribeRelatedMilestones: makeSubscribeRelatedMilestones,
		updateMilestoneReached: makeUpdateMilestoneReached
	};

	constructor() {}

	make(useCaseName, dependencies) {
		if (this.#useCases[useCaseName]) {
			return this.#useCases[useCaseName](dependencies);
		} else {
			throw new Error(
				`Could not find use case with name "${useCaseName}"! Did you define it in UseCaseFactory?`
			);
		}
	}
}
