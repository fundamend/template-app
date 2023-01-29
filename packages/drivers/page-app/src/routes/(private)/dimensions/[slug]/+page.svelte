<script>
	import { getContext, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import DimensionDetails from '$lib/components/DimensionDetails.svelte';

	const dependencyContainer = getContext('dependencyContainer');

	let findDimensions;
	let dimensionPromise;
	let dimension;

	function handleDelete() {
		goto('/dimensions');
	}

	onMount(async () => {
		findDimensions = await dependencyContainer.resolve('findDimensions');

		// TODO: maybe there is a better way to do this
		dimensionPromise = new Promise((resolve) => {
			findDimensions([['name', '==', $page.params.slug]]).then((result) => {
				dimension = result[0];
				resolve();
			});
		});
	});
</script>

{#await dimensionPromise then _}
	{#if dimension}
		<DimensionDetails {dimension} on:delete={handleDelete} />
	{/if}
{/await}
