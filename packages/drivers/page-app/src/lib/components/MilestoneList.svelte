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
		createMilestone = await dependencyContainer.resolve('createMilestone');
		const subscribeRelatedMilestones = await dependencyContainer.resolve(
			'subscribeRelatedMilestones'
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
