<script>
	import { onMount } from 'svelte';

	let authenticationService;

	onMount(async () => {
		const AuthenticationService = await import(
			'@template-app/service-authentication-clerk'
		).default;
		authenticationService = new AuthenticationService({
			clerkFrontendApi: import.meta.env.PUBLIC_CLERK_FRONTEND_API
		});
		await authenticationService.logIn();
	});
</script>

<p>logging in...</p>
