<script>
	import { onMount } from 'svelte';
	import { base, assets } from '$app/paths';

	let authenticationService;

	onMount(async () => {
		const AuthenticationService = await import(
			'@template-app/service-authentication-service-clerk'
		).default;
		authenticationService = new AuthenticationService({
			clerkFrontendApi: import.meta.env.PUBLIC_CLERK_FRONTEND_API
		});
		await authenticationService.logOut(async () => {
			window.location.replace(`${base}/`);
		});
	});
</script>

<p>logging out...</p>
