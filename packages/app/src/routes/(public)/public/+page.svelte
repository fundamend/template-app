<script>
	let failPromise = Promise.resolve({});

	async function fetchFail() {
		const response = await self.fetch('/api/v1/public/fail');

		if (response.ok) {
			return response.json();
		} else {
			throw new Error(test);
		}
	}

	function handleFailClick() {
		failPromise = fetchFail();
	}
</script>

<fundamend-box class="width:100 height:100">
	<fundamend-center>
		<h1>Public</h1>
		<button on:click={handleFailClick}>Fail</button>
		{#await failPromise}
			<p>...waiting</p>
		{:then failTest}
			<p>{JSON.stringify(failTest)}</p>
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</fundamend-center>
</fundamend-box>
