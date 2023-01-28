<script>
	import { getContext, onMount } from 'svelte';

	const dependencyContainer = getContext('dependencyContainer');

	export let measure;
	let deleteMeasure;

	function handleClick() {
		deleteMeasure(measure.id);
	}

	onMount(async () => {
		deleteMeasure = await dependencyContainer.resolve('deleteMeasure');
	});
</script>

<p>{measure.value} <button on:click={handleClick}>X</button></p>
