<script>
	import { getContext, onMount } from 'svelte';

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
		createMeasure = await dependencyContainer.resolve('createMeasure');
		const subscribeRelatedMeasures = await dependencyContainer.resolve(
			'subscribeRelatedMeasures'
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

{#each measures as measure}
	<p>{measure.value}</p>
{/each}
