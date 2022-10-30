<script>
  import { onMount } from 'svelte';

	const clerkFrontendApi = import.meta.env.PUBLIC_CLERK_FRONTEND_API;

	onMount(async () => {
		const Clerk = (await import('@clerk/clerk-js')).default;
		const clerk = new Clerk(clerkFrontendApi);
		await clerk.load ();
		clerk.redirectToSignIn();
	})
</script>

<p>logging in...</p>
