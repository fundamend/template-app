<script>
	import { onMount } from 'svelte';
	import * as Sentry from "@sentry/browser";
	import { BrowserTracing } from "@sentry/tracing";

	const sentryDSN = import.meta.env.PUBLIC_SENTRY_DSN;
	const clerkFrontendApi = import.meta.env.PUBLIC_CLERK_FRONTEND_API;
	const environment = import.meta.env.PUBLIC_NODE_ENV;
	const version = __APP_VERSION__;

	Sentry.init({
		dsn: sentryDSN,
		environment: environment,
		release: version,
		integrations: [new BrowserTracing()],
		tracesSampleRate: 1.0,
	});

	let clerkPromise = Promise.resolve();

	const sentryTest = () => {
		myUndefined();
	};

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

	<button on:click={sentryTest()}>Sentry Test {environment}</button>
</header>

<slot></slot>
