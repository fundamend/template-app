import Clerk from '@clerk/clerk-js';
const clerkFrontendApi = import.meta.env.PUBLIC_CLERK_FRONTEND_API;

let clerk;

async function init() {
	if (!clerk) {
		clerk = new Clerk(clerkFrontendApi);
		await clerk.load();
	}
	return auth;
}

async function isLoggedIn() {
	return (await clerk?.session?.status) === 'active' ? true : false;
}

async function logIn() {
	await clerk.redirectToSignIn();
}

async function logOut(callback) {
	await clerk.signOut(async () => {
		await callback();
	});
}

async function userProfile() {
	await clerk.redirectToUserProfile();
}

const auth = {
	isLoggedIn: isLoggedIn,
	logIn: logIn,
	logOut: logOut,
	userProfile: userProfile
};

export default init();
