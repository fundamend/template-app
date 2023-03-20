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
		const useCaseFactory = await dependencyContainer.resolve('UseCaseFactory');
		const StorageService = await dependencyContainer.resolve('StorageService');
		readMeasure = useCaseFactory.make('readMeasure', {
			StorageService: StorageService
		});

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
