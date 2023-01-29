<script>
	import { getContext, onMount } from 'svelte';
	import DimensionGridElement from '$lib/components/DimensionGridElement.svelte';

	export let dimensions;

	const dependencyContainer = getContext('dependencyContainer');
	let createDimension;

	async function handleCreate() {
		await createDimension(new Date().toISOString());
	}

	onMount(async () => {
		createDimension = await dependencyContainer.resolve('createDimension');
	});
</script>

<h1>Dimensions</h1>
<button on:click={handleCreate}>+</button>
{#if dimensions}
	{#each dimensions as dimension}
		<DimensionGridElement {dimension} />
	{/each}
{/if}
