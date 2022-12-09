<script>
	import { getContext, onMount } from 'svelte';

	const dependencyContainer = getContext('dependencyContainer');

	onMount(async () => {
		const authenticationService = await dependencyContainer.resolve(
			'AuthenticationService'
		);
		await authenticationService.logIn();
	});
</script>

<p>logging in...</p>
