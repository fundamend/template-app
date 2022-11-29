<script>
	import { onMount } from 'svelte';
	import * as Sentry from '@sentry/browser';
	import { BrowserTracing } from '@sentry/tracing';
	import { base, assets } from '$app/paths';

	const sentryDSN = import.meta.env.PUBLIC_SENTRY_DSN;
	const environment = import.meta.env.PUBLIC_ENVIRONMENT;
	const version = __APP_VERSION__;
	let authenticationService;

	const dropdown = [
		{
			text: 'Menu',
			children: [
				{
					text: 'Account',
					href: `${base}/account`
				},
				{
					text: 'Logout',
					href: `${base}/logout`
				}
			]
		}
	];

	if (!environment === 'development') {
		Sentry.init({
			dsn: sentryDSN,
			environment: environment,
			release: version,
			integrations: [new BrowserTracing()],
			tracesSampleRate: 1.0
		});
	}

	let isLoggedInPromise;

	onMount(async () => {
		await import('@fundamend/components-layout');
		await import('@fundamend/css');
		const AuthenticationService = await import(
			'@template-app/service-authentication-clerk'
		).default;
		authenticationService = new AuthenticationService({
			clerkFrontendApi: import.meta.env.PUBLIC_CLERK_FRONTEND_API
		});
		isLoggedInPromise = authenticationService.isLoggedIn();
	});
</script>

<header>
	<fundamend-box class="width:100">
		<fundamend-stack x class="width:100">
			<fundamend-cluster start>
				<a href="{base}/">Home</a>
			</fundamend-cluster>
			<fundamend-cluster center>
				<a href="{base}/public">Public</a>
				{#await isLoggedInPromise then isLoggedIn}
					{#if isLoggedIn}
						<a href="{base}/private">Private</a>
					{/if}
				{/await}
			</fundamend-cluster>
			<fundamend-cluster end>
				{#await isLoggedInPromise then isLoggedIn}
					{#if isLoggedIn}
						<fundamend-dropdown data-items={JSON.stringify(dropdown)} />
					{:else}
						<a href="{base}/login">Login</a>
					{/if}
				{/await}
			</fundamend-cluster>
		</fundamend-stack>
	</fundamend-box>
</header>

<slot />

<style>
	header {
		background-color: lightgray;
	}

	fundamend-cluster {
		width: 33.3%;
	}
</style>
