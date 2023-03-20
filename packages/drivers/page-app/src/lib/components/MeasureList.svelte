<script>
	import { getContext, onMount } from 'svelte';
	import MeasureListElement from '$lib/components/MeasureListElement.svelte';

	export let dimension;
	const dependencyContainer = getContext('dependencyContainer');

	let measure;
	let createMeasure;
	let measures = [];

	function handleCreate() {
		measure = {
			dimension: dimension,
			value: 1.23
		};

		createMeasure(dimension, measure);
	}

	onMount(async () => {
		const useCaseFactory = await dependencyContainer.resolve('UseCaseFactory');
		const StorageService = await dependencyContainer.resolve('StorageService');
		createMeasure = useCaseFactory.make('createMeasure', {
			StorageService: StorageService
		});
		const subscribeRelatedMeasures = useCaseFactory.make(
			'subscribeRelatedMeasures',
			{ StorageService: StorageService }
		);

		subscribeRelatedMeasures(
			{ type: 'dimension', id: dimension },
			[],
			(results) => {
				measures = results;
			}
		);
	});
</script>

<h2>Measures</h2>
<button on:click={handleCreate}>+</button>

{#if measures}
	{#each measures as measure}
		<MeasureListElement {measure} />
	{/each}
{/if}
