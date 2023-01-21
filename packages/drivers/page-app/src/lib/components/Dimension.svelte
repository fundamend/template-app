<script>
	import { getContext, onMount } from 'svelte';

	export let dimension;

	const dependencyContainer = getContext('dependencyContainer');

	let updateDimension;
	let deleteDimension;

	function handleSave() {
		updateDimension(dimension);
	}

	function handleDelete() {
		deleteDimension(dimension.id);
	}

	onMount(async () => {
		updateDimension = await dependencyContainer.resolve('updateDimension');
		deleteDimension = await dependencyContainer.resolve('deleteDimension');
	});
</script>

<input type="text" placeholder="Enter a name" bind:value={dimension.name} />
<button on:click={handleSave}>Save</button>
<button on:click={handleDelete}>X</button>
