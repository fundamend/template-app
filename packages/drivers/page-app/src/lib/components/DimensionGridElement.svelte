<script>
	export let dimension;
</script>

{#if dimension}
	<a href={`/dimension?name=${dimension.name}`}>
		<h2>{dimension.name}</h2>
	</a>
{/if}
