<script>
	import { getContext, onMount } from 'svelte';
	import { page } from '$app/stores';
	import MilestoneDetails from '$lib/components/MilestoneDetails.svelte';

	const dependencyContainer = getContext('dependencyContainer');

	let readMilestone;
	let milestonePromise;
	let milestone;

	function handleDelete() {
		history.back();
	}

	onMount(async () => {
		const useCaseFactory = await dependencyContainer.resolve('UseCaseFactory');
		const StorageService = await dependencyContainer.resolve('StorageService');
		readMilestone = useCaseFactory.make('readMilestone', {
			StorageService: StorageService
		});

		// TODO: maybe there is a better way to do this
		milestonePromise = new Promise((resolve) => {
			readMilestone($page.url.searchParams.get('id')).then((result) => {
				milestone = result;
				resolve();
			});
		});
	});
</script>

{#await milestonePromise then _}
	{#if milestone}
		<MilestoneDetails {milestone} on:delete={handleDelete} />
	{/if}
{/await}
