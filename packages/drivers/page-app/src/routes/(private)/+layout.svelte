<script>
	import { getContext, onMount } from 'svelte';
	import { base } from '$app/paths';

	const dependencyContainer = getContext('dependencyContainer');

	let isLoggedInPromise;

	onMount(async () => {
		const authenticationService = await dependencyContainer.resolve(
			'AuthenticationService'
		);
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
