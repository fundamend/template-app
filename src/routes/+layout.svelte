<script>
	import { onMount } from 'svelte';
	import * as Sentry from "@sentry/browser";
	import { BrowserTracing } from "@sentry/tracing";

	const sentryDSN = import.meta.env.PUBLIC_SENTRY_DSN;
	const environment = import.meta.env.PUBLIC_NODE_ENV;
	const version = __APP_VERSION__;

	const dropdown = [
		{
			text: 'Menu',
			children: [
				{
					text: 'Account',
					href: '/account'
				},
				{
					text: 'Logout',
					href: '/logout'
				}
			]
		}
	]

	if (!environment === 'development') {
		Sentry.init({
			dsn: sentryDSN,
			environment: environment,
			release: version,
			integrations: [new BrowserTracing()],
			tracesSampleRate: 1.0,
		});
	}

	let isLoggedInPromise;

	onMount(async () => {
		await import('@fundamend/components-layout');
		await import('@fundamend/css');
		const auth = await (await import('$lib/auth.js')).default;
		isLoggedInPromise = auth.isLoggedIn();
	});
</script>

<header>
	<fundamend-box class="width:100">
		<fundamend-stack x class="width:100">
			<fundamend-cluster start>
				<a href="/">Home</a>
			</fundamend-cluster>
			<fundamend-cluster center>
				<a href="/public">Public</a>
				{#await isLoggedInPromise then isLoggedIn}
					{#if isLoggedIn}
						<a href="/private">Private</a>
					{/if}
				{/await}
			</fundamend-cluster>
			<fundamend-cluster end>
				{#await isLoggedInPromise then isLoggedIn}
					{#if isLoggedIn}
						<fundamend-dropdown data-items={JSON.stringify(dropdown)}></fundamend-dropdown>
					{:else}
						<a href="/login">Login</a>
					{/if}
				{/await}
			</fundamend-cluster>
		</fundamend-stack>
	</fundamend-box>
</header>

<slot></slot>

<style>
	header {
		background-color: lightgray;
	}

	fundamend-cluster {
		width: 33.3%;
	}
</style>
