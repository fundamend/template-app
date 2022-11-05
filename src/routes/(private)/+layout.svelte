<script>
	import { onMount } from 'svelte';

	let isLoggedInPromise;

	onMount(async () => {
		const auth = await (await import('$lib/auth.js')).default;
		isLoggedInPromise = auth.isLoggedIn();
	});
</script>

<div class="indicator"></div>

{#await isLoggedInPromise}
	Loading...
{:then isLoggedIn}
	{#if isLoggedIn}
		<slot></slot>
	{:else}
		<fundamend-center>
			<fundamend-box>
				You are not logged in.<br>
				<a href="/login">Log in here</a>.
			</fundamend-box>
		</fundamend-center>
	{/if}
{/await}

<style>
	.indicator {
		border: 1px solid red;
	}
</style>
