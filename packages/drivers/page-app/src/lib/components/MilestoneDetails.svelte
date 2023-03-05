<script>
	import { getContext, onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dependencyContainer = getContext('dependencyContainer');
	const dispatch = createEventDispatcher();

	export let milestone;

	let updateMilestone;
	let deleteMilestone;

	function handleSave() {
		updateMilestone(milestone);
	}

	function handleDelete() {
		deleteMilestone(milestone.id);
		dispatch('delete');
	}

	onMount(async () => {
		updateMilestone = await dependencyContainer.resolve('updateMilestone');
		deleteMilestone = await dependencyContainer.resolve('deleteMilestone');
	});
</script>

{#if milestone}
	<input type="number" bind:value={milestone.threshold} />
	<button on:click={handleSave}>Save</button>
	<button on:click={handleDelete}>X</button>
{/if}
