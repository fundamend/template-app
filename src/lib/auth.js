import Clerk from '@clerk/clerk-js';
const clerkFrontendApi = import.meta.env.PUBLIC_CLERK_FRONTEND_API;

let clerk;

async function init() {
	if (!clerk) {
		clerk = new Clerk(clerkFrontendApi);
		await clerk.load();
	}
	return clerk;
}

export default init();
