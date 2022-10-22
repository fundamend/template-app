<script>
	let disabled = false;
	let promise = Promise.resolve({});

	async function fetchTest() {
		disabled = true;
		const response = await self.fetch('/api/v1/test');
		disabled = false;

		if (response.ok) {
			return response.json();
		} else {
			throw new Error(test);
		}
	}

	function handleClick() {
		promise = fetchTest();
	}
</script>

<button on:click={ handleClick } { disabled }>Load Test</button>

{#await promise}
	<p>...waiting</p>
{:then test}
	<p>{ test.message }</p>
{:catch error}
	<p style="color: red">{ error.message }</p>
{/await}
