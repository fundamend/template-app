<script>
	import { onMount } from 'svelte';
	import { base, assets } from '$app/paths';

	onMount(async () => {
		const auth = await (await import('$lib/auth.js')).default;
		await auth.logOut(async () => {
			window.location.replace(`${base}/`);
		});
	});
</script>

<p>logging out...</p>
