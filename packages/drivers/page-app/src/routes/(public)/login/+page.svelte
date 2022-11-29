<script>
	import { onMount } from 'svelte';

	let authenticationHandler;

	onMount(async () => {
		const AuthenticationHandler = await import(
			'@template-app/adapter-authentication-handler-clerk'
		).default;
		authenticationHandler = new AuthenticationHandler({
			clerkFrontendApi: import.meta.env.PUBLIC_CLERK_FRONTEND_API
		});
		await authenticationHandler.logIn();
	});
</script>

<p>logging in...</p>
