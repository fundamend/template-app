<script>
	import { getContext, onMount } from 'svelte';
	import Dimension from '$lib/components/Dimension.svelte';

	const dependencyContainer = getContext('dependencyContainer');
	let createDimension;
	let dimensions = [];

	async function handleCreate() {
		await createDimension(new Date().toISOString());
	}

	onMount(async () => {
		createDimension = await dependencyContainer.resolve('createDimension');
		const subscribeDimensions = await dependencyContainer.resolve(
			'subscribeDimensions'
		);

		subscribeDimensions((results) => {
			dimensions = results;
		});
	});
</script>

<fundamend-box class="width:100 height:100">
	<fundamend-center>
		<h1>Dimensions</h1>
		<button on:click={handleCreate}>+</button>
		{#each dimensions as dimension}
			<Dimension {dimension} />
		{/each}
	</fundamend-center>
</fundamend-box>
