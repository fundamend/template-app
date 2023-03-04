<script>
	import { getContext, onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	import MeasureList from '$lib/components/MeasureList.svelte';
	import MilestoneList from '$lib/components/MilestoneList.svelte';

	const dependencyContainer = getContext('dependencyContainer');
	const dispatch = createEventDispatcher();

	export let dimension;

	let updateDimension;
	let deleteDimension;

	function handleSave() {
		updateDimension(dimension);
	}

	function handleDelete() {
		deleteDimension(dimension.id);
		dispatch('delete');
	}

	onMount(async () => {
		updateDimension = await dependencyContainer.resolve('updateDimension');
		deleteDimension = await dependencyContainer.resolve('deleteDimension');
	});

	// TODO: MeasureList should just take a list of measures which should be loaded here
</script>

{#if dimension}
	<input type="text" placeholder="Enter a name" bind:value={dimension.name} />
	<button on:click={handleSave}>Save</button>
	<button on:click={handleDelete}>X</button>
	<MeasureList dimension={dimension.id} />
	<MilestoneList dimension={dimension.id} />
{/if}
