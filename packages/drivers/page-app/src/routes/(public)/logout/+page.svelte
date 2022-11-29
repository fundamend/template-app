<script>
	import { onMount } from 'svelte';
	import { base, assets } from '$app/paths';

	let authenticationHandler;

	onMount(async () => {
		const AuthenticationHandler = await import(
			'@template-app/adapter-authentication-handler-clerk'
		).default;
		authenticationHandler = new AuthenticationHandler({
			clerkFrontendApi: import.meta.env.PUBLIC_CLERK_FRONTEND_API
		});
		await authenticationHandler.logOut(async () => {
			window.location.replace(`${base}/`);
		});
	});
</script>

<p>logging out...</p>
