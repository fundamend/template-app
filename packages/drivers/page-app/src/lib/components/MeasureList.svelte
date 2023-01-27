<script>
	import { getContext, onMount } from 'svelte';

	export let dimension;
	const dependencyContainer = getContext('dependencyContainer');

	let measure;
	let createMeasure;

	function handleCreate() {
		measure = {
			dimension: dimension,
			value: 1.23
		};

		createMeasure(dimension, measure);
	}

	onMount(async () => {
		createMeasure = await dependencyContainer.resolve('createMeasure');
	});
</script>

<h2>Measures</h2>
<button on:click={handleCreate}>+</button>
