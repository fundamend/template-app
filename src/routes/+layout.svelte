<script>
	import { onMount } from 'svelte';

	const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API;
	let clerkPromise = Promise.resolve();

	// TODO: have one singleton clerk instance in the store that is created once logging in and destroyed on logout
	onMount(async () => {
		const Clerk = (await import('@clerk/clerk-js')).default;
		const clerk = new Clerk(clerkFrontendApi);
		await clerk.load ();
		clerkPromise = clerk.session?.status;
	});
</script>

<header>
	{#await clerkPromise}
		<p>...waiting</p>
	{:then session}
		{#if session === 'active'}
			<a href="/logout">Logout</a>
		{:else}
			<a href="/login">Login</a>
		{/if}
	{:catch error}
		<p style="color: red">{ error.message }</p>
	{/await}
</header>

<slot></slot>
