<script>
	import { getContext, onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dependencyContainer = getContext('dependencyContainer');
	const dispatch = createEventDispatcher();

	export let measure;

	let updateMeasure;
	let deleteMeasure;

	function handleSave() {
		updateMeasure(measure);
	}

	function handleDelete() {
		deleteMeasure(measure.id);
		dispatch('delete');
	}

	onMount(async () => {
		updateMeasure = await dependencyContainer.resolve('updateMeasure');
		deleteMeasure = await dependencyContainer.resolve('deleteMeasure');
	});
</script>

{#if measure}
	<input type="number" bind:value={measure.value} />
	<button on:click={handleSave}>Save</button>
	<button on:click={handleDelete}>X</button>
{/if}
