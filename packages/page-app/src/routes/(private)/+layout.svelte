<script>
	import { onMount } from 'svelte';
	import { base, assets } from '$app/paths';

	let isLoggedInPromise;

	onMount(async () => {
		const auth = await (await import('$lib/auth.js')).default;
		isLoggedInPromise = auth.isLoggedIn();
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
