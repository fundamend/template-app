<script>
	import { onMount } from 'svelte';

	let auth;

	onMount(async () => {
		auth = await (await import('$lib/auth.js')).default;
	});
</script>

<h1>Test</h1>
