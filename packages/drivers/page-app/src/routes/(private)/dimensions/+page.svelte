<script>
	import { getContext, onMount } from 'svelte';
	import DimensionGrid from '$lib/components/DimensionGrid.svelte';

	const dependencyContainer = getContext('dependencyContainer');
	let dimensions = [];

	onMount(async () => {
		const useCaseFactory = await dependencyContainer.resolve('UseCaseFactory');
		const StorageService = await dependencyContainer.resolve('StorageService');
		const subscribeDimensions = useCaseFactory.make('subscribeDimensions', {
			StorageService: StorageService
		});

		subscribeDimensions((results) => {
			dimensions = results;
		});
	});
</script>

<DimensionGrid {dimensions} />
