export default class AbstractPaymentHandler {
	constructor() {
		if (this.constructor == AbstractPaymentHandler) {
			throw new Error("Abstract classes can't be instantiated.");
		}
	}
}
