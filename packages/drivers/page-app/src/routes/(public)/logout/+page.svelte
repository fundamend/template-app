<script>
	import { getContext, onMount } from 'svelte';
	import { base } from '$app/paths';

	const dependencyContainer = getContext('dependencyContainer');

	onMount(async () => {
		const authenticationService = await dependencyContainer.resolve(
			'AuthenticationService'
		);
		await authenticationService.logOut(async () => {
			window.location.replace(`${base}/`);
		});
	});
</script>

<p>logging out...</p>
