<script>
	let publicTestPromise = Promise.resolve({});
	let privateTestPromise = Promise.resolve({});

	async function fetchPublicTest() {
		const response = await self.fetch('/api/v1/public/test');

		if (response.ok) {
			return response.json();
		} else {
			throw new Error(test);
		}
	}

	async function fetchPrivateTest() {
		const response = await self.fetch('/api/v1/private/test');

		if (response.ok) {
			return response.json();
		} else {
			throw new Error(test);
		}
	}

	function handlePublicClick() {
		publicTestPromise = fetchPublicTest();
	}

	function handlePrivateClick() {
		privateTestPromise = fetchPrivateTest()
	}
</script>

<button on:click={ handlePublicClick }>Load Test</button>

{#await publicTestPromise}
	<p>...waiting</p>
{:then publicTest}
	<p>{ JSON.stringify(publicTest) }</p>
{:catch error}
	<p style="color: red">{ error.message }</p>
{/await}

<button on:click={ handlePrivateClick }>Load Auth Test</button>

{#await privateTestPromise}
	<p>...waiting</p>
{:then privateTest}
	<p>{ JSON.stringify(privateTest) }</p>
{:catch error}
	<p style="color: red">{ error.message }</p>
{/await}
