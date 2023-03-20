<script>
	import { getContext, onMount } from 'svelte';

	const dependencyContainer = getContext('dependencyContainer');

	export let milestone;
	let deleteMilestone;

	function handleClick() {
		deleteMilestone(milestone.id);
	}

	onMount(async () => {
		const useCaseFactory = await dependencyContainer.resolve('UseCaseFactory');
		const StorageService = await dependencyContainer.resolve('StorageService');
		deleteMilestone = useCaseFactory.make('deleteMilestone', {
			StorageService: StorageService
		});
	});
</script>

{#if milestone}
	<p>
		<a href={`milestone?id=${milestone.id}`}>{milestone.threshold}</a>
		<button on:click={handleClick}>X</button>
	</p>
{/if}
