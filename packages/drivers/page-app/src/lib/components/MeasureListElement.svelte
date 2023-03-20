<script>
	import { getContext, onMount } from 'svelte';

	const dependencyContainer = getContext('dependencyContainer');

	export let measure;
	let deleteMeasure;

	function handleClick() {
		deleteMeasure(measure.id);
	}

	onMount(async () => {
		const useCaseFactory = await dependencyContainer.resolve('UseCaseFactory');
		const StorageService = await dependencyContainer.resolve('StorageService');
		deleteMeasure = useCaseFactory.make('deleteMeasure', {
			StorageService: StorageService
		});
	});
</script>

{#if measure}
	<p>
		<a href={`measure?id=${measure.id}`}>{measure.value}</a>
		<button on:click={handleClick}>X</button>
	</p>
{/if}
