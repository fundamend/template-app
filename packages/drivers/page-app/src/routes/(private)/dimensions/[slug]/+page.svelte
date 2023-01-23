<script>
	import { getContext, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const dependencyContainer = getContext('dependencyContainer');

	let findDimensions;
	let updateDimension;
	let deleteDimension;
	let dimensionPromise;
	let dimension;

	function handleSave() {
		updateDimension(dimension);
	}

	function handleDelete() {
		deleteDimension(dimension.id);
		goto('/dimensions');
	}

	onMount(async () => {
		findDimensions = await dependencyContainer.resolve('findDimensions');
		updateDimension = await dependencyContainer.resolve('updateDimension');
		deleteDimension = await dependencyContainer.resolve('deleteDimension');

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
		<input type="text" placeholder="Enter a name" bind:value={dimension.name} />
		<button on:click={handleSave}>Save</button>
		<button on:click={handleDelete}>X</button>
	{/if}
{/await}
