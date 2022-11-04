<script>
  import { onMount } from 'svelte';

	onMount(async () => {
		const auth = await (await import('$lib/auth.js')).default;
		auth.redirectToSignIn();
	})
</script>

<p>logging in...</p>
