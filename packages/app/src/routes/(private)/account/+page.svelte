<script>
	import { onMount } from 'svelte';

	onMount(async () => {
		const auth = await (await import('$lib/auth.js')).default;
		await auth.userProfile();
	});
</script>

<p>redirecting...</p>
