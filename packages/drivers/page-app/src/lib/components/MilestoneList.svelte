<script>
	import { getContext, onMount } from 'svelte';
	import MilestoneListElement from '$lib/components/MilestoneListElement.svelte';

	export let dimension;
	const dependencyContainer = getContext('dependencyContainer');

	let milestone;
	let createMilestone;
	let milestones = [];

	function handleCreate() {
		milestone = {
			threshold: 12.3,
			type: 'gt',
			reached: false
		};

		createMilestone(dimension, milestone);
	}

	onMount(async () => {
		const useCaseFactory = await dependencyContainer.resolve('UseCaseFactory');
		const StorageService = await dependencyContainer.resolve('StorageService');
		const updateMilestoneReached = useCaseFactory.make(
			'updateMilestoneReached',
			{ StorageService: StorageService }
		);
		createMilestone = useCaseFactory.make('createMilestone', {
			StorageService: StorageService,
			updateMilestoneReached: updateMilestoneReached
		});
		const subscribeRelatedMilestones = useCaseFactory.make(
			'subscribeRelatedMilestones',
			{ StorageService: StorageService }
		);

		subscribeRelatedMilestones(
			{ type: 'dimension', id: dimension },
			[],
			(results) => {
				milestones = results;
			}
		);
	});
</script>

<h2>Milestones</h2>
<button on:click={handleCreate}>+</button>

{#if milestones}
	{#each milestones as milestone}
		<MilestoneListElement {milestone} />
	{/each}
{/if}
