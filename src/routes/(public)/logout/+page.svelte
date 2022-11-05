<script>
  import { onMount } from 'svelte';

	onMount(async () => {
		const auth = await (await import('$lib/auth.js')).default;
		await auth.logOut(async () => {
			window.location.replace('/');
		});
	})
</script>

<p>logging out...</p>
