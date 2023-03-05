import { Before, After, setWorldConstructor } from '@cucumber/cucumber';
import sinon from 'sinon';
import World from './world.js';
import AbstractStorageService from '@fundamend/service-storage-abstract';
import {
	makeCreateDimension,
	makeCreateMeasure,
	makeCreateMilestone,
	makeDeleteDimension,
	makeDeleteMeasure,
	makeDeleteMilestone,
	makeFindDimensions,
	makeFindMilestones,
	makeFindRelatedMeasures,
	makeListDimensions,
	makeReadDimension,
	makeReadMeasure,
	makeReadMilestone,
	makeSubscribeDimensions,
	makeSubscribeRelatedMeasures,
	makeSubscribeRelatedMilestones,
	makeUpdateDimension,
	makeUpdateMeasure,
	makeUpdateMilestone
} from '@template-app/use-cases';

setWorldConstructor(World);

class MockStorageService extends AbstractStorageService {
	constructor() {
		super();
	}
}

Before(function () {
	this.mockStorageService = new MockStorageService();

	this.createDimension = makeCreateDimension({
		StorageService: this.mockStorageService
	});
	this.createMeasure = makeCreateMeasure({
		StorageService: this.mockStorageService
	});
	this.createMilestone = makeCreateMilestone({
		StorageService: this.mockStorageService
	});
	this.deleteDimension = makeDeleteDimension({
		StorageService: this.mockStorageService
	});
	this.deleteMeasure = makeDeleteMeasure({
		StorageService: this.mockStorageService
	});
	this.deleteMilestone = makeDeleteMilestone({
		StorageService: this.mockStorageService
	});
	this.findDimension = makeFindDimensions({
		StorageService: this.mockStorageService
	});
	this.findMilestones = makeFindMilestones({
		StorageService: this.mockStorageService
	});
	this.findRelatedMeasures = makeFindRelatedMeasures({
		StorageService: this.mockStorageService
	});
	this.listDimensions = makeListDimensions({
		StorageService: this.mockStorageService
	});
	this.readDimension = makeReadDimension({
		StorageService: this.mockStorageService
	});
	this.readMeasure = makeReadMeasure({
		StorageService: this.mockStorageService
	});
	this.readMilestone = makeReadMilestone({
		StorageService: this.mockStorageService
	});
	this.subscribeDimensions = makeSubscribeDimensions({
		StorageService: this.mockStorageService
	});
	this.subscribeRelatedMeasures = makeSubscribeRelatedMeasures({
		StorageService: this.mockStorageService
	});
	this.subscribeRelatedMilestones = makeSubscribeRelatedMilestones({
		StorageService: this.mockStorageService
	});
	this.updateDimension = makeUpdateDimension({
		StorageService: this.mockStorageService
	});
	this.updateMeasure = makeUpdateMeasure({
		StorageService: this.mockStorageService
	});
	this.updateMilestone = makeUpdateMilestone({
		StorageService: this.mockStorageService
	});
});

After(function () {
	sinon.restore();
});
