<script>
	/* global __APP_VERSION__ */
	import { onMount, setContext } from 'svelte';
	import { base } from '$app/paths';

	import AuthenticationService from '@template-app/service-authentication-clerk';
	import CrashService from '@template-app/service-crash-sentry-browser';
	import DependencyContainer from '@template-app/service-dependency-container-awilix';

	const dependencyContainer = new DependencyContainer();

	dependencyContainer.register([
		// values
		{
			type: 'value',
			name: 'CLERK_FRONTEND_API',
			value: import.meta.env.PUBLIC_CLERK_FRONTEND_API
		},
		{
			type: 'value',
			name: 'ENVIRONMENT',
			value: import.meta.env.PUBLIC_ENVIRONMENT
		},
		{
			type: 'value',
			name: 'SENTRY_DSN',
			value: import.meta.env.PUBLIC_SENTRY_DSN
		},
		{
			type: 'value',
			name: 'SENTRY_TRACE_SAMPLE_RATE',
			value: import.meta.env.PUBLIC_SENTRY_TRACE_SAMPLE_RATE
		},
		{ type: 'value', name: 'VERSION', value: __APP_VERSION__ },
		// classes
		{
			type: 'class',
			name: 'AuthenticationService',
			value: AuthenticationService,
			singleton: true
		},
		{
			type: 'class',
			name: 'CrashService',
			value: CrashService,
			singleton: true
		}
	]);

	setContext('dependencyContainer', dependencyContainer);

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

	let isLoggedInPromise;

	onMount(async () => {
		await import('@fundamend/components-layout');
		await import('@fundamend/css');

		const environment = await dependencyContainer.resolve('ENVIRONMENT');

		if (environment !== 'development') {
			await dependencyContainer.resolve('CrashService');
		}

		const authenticationService = await dependencyContainer.resolve(
			'AuthenticationService'
		);

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
