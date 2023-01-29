<script>
	import { getContext, onMount } from 'svelte';
	import DimensionGrid from '$lib/components/DimensionGrid.svelte';

	const dependencyContainer = getContext('dependencyContainer');
	let dimensions = [];

	onMount(async () => {
		const subscribeDimensions = await dependencyContainer.resolve(
			'subscribeDimensions'
		);

		subscribeDimensions((results) => {
			dimensions = results;
		});
	});
</script>

<DimensionGrid {dimensions} />
