<script>
  import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(async () => {
		const auth = await (await import('$lib/auth.js')).default;
		await auth.signOut(async () => {
			await goto('/');
		});
	})
</script>

<p>logging out...</p>
