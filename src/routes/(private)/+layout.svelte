<script>
	import { onMount } from 'svelte';

	let auth;

	onMount(async () => {
		auth = await (await import('$lib/auth.js')).default;
	});
</script>

<div class="indicator"></div>

{#if auth?.session?.status === 'active'}
	<slot></slot>
{:else if auth?.session === undefined}
	Loading...
{:else}
	You are not logged in...
{/if}

<style>
	.indicator {
		border: 1px solid red;
	}
</style>
