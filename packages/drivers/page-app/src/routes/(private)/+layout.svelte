<script>
	import { onMount } from 'svelte';
	import { base, assets } from '$app/paths';

	let authenticationService;
	let isLoggedInPromise;

	onMount(async () => {
		const AuthenticationService = await import(
			'@template-app/service-authentication-service-clerk'
		).default;
		authenticationService = new AuthenticationService({
			clerkFrontendApi: import.meta.env.PUBLIC_CLERK_FRONTEND_API
		});
		isLoggedInPromise = authenticationService.isLoggedIn();
	});
</script>

<div class="indicator" />

{#await isLoggedInPromise}
	Loading...
{:then isLoggedIn}
	{#if isLoggedIn}
		<slot />
	{:else}
		<fundamend-center>
			<fundamend-box>
				You are not logged in.<br />
				<a href="{base}/login">Log in here</a>.
			</fundamend-box>
		</fundamend-center>
	{/if}
{/await}

<style>
	.indicator {
		border: 1px solid red;
	}
</style>
