<script>
	import { getContext, onMount } from 'svelte';
	import { page } from '$app/stores';
	import MeasureDetails from '$lib/components/MeasureDetails.svelte';

	const dependencyContainer = getContext('dependencyContainer');

	let readMeasure;
	let measurePromise;
	let measure;

	function handleDelete() {
		history.back();
	}

	onMount(async () => {
		readMeasure = await dependencyContainer.resolve('readMeasure');

		// TODO: maybe there is a better way to do this
		measurePromise = new Promise((resolve) => {
			readMeasure($page.url.searchParams.get('id')).then((result) => {
				measure = result;
				resolve();
			});
		});
	});
</script>

{#await measurePromise then _}
	{#if measure}
		<MeasureDetails {measure} on:delete={handleDelete} />
	{/if}
{/await}
