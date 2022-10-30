<script>
  import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	const clerkFrontendApi = import.meta.env.PUBLIC_CLERK_FRONTEND_API;

	onMount(async () => {
		const Clerk = (await import('@clerk/clerk-js')).default;
		const clerk = new Clerk(clerkFrontendApi);
		await clerk.load ();
		await clerk.signOut(async () => {
			await goto('/');
		});
	})
</script>

<p>logging out...</p>
