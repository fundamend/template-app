export default class AbstractPaymentService {
	constructor() {
		if (this.constructor == AbstractPaymentService) {
			throw new Error("Abstract classes can't be instantiated.");
		}
	}
}
