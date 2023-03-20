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
		const useCaseFactory = await dependencyContainer.resolve('UseCaseFactory');
		const StorageService = await dependencyContainer.resolve('StorageService');
		createDimension = useCaseFactory.make('createDimension', {
			StorageService: StorageService
		});
	});
</script>

<h1>Dimensions</h1>
<button on:click={handleCreate}>+</button>
{#if dimensions}
	{#each dimensions as dimension}
		<DimensionGridElement {dimension} />
	{/each}
{/if}
