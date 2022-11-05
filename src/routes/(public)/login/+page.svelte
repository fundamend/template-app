<script>
  import { onMount } from 'svelte';

	onMount(async () => {
		const auth = await (await import('$lib/auth.js')).default;
		await auth.logIn();
	})
</script>

<p>logging in...</p>
