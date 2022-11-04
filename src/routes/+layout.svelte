<script>
	import { onMount } from 'svelte';
	import * as Sentry from "@sentry/browser";
	import { BrowserTracing } from "@sentry/tracing";

	const sentryDSN = import.meta.env.PUBLIC_SENTRY_DSN;
	const environment = import.meta.env.PUBLIC_NODE_ENV;
	const version = __APP_VERSION__;

	if (!environment === 'development') {
		Sentry.init({
			dsn: sentryDSN,
			environment: environment,
			release: version,
			integrations: [new BrowserTracing()],
			tracesSampleRate: 1.0,
		});
	}

	let auth;

	onMount(async () => {
		auth = await (await import('$lib/auth.js')).default;
	});
</script>

<header>
	<a href="/">Home</a>
	<a href="/test">Test</a>
	{#if auth?.session?.status === 'active'}
		<a href="/logout">Logout</a>
	{:else}
		<a href="/login">Login</a>
	{/if}
</header>

<slot></slot>
