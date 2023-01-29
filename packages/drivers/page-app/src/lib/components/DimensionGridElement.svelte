<script>
	export let dimension;
</script>

{#if dimension}
	<a href="/dimensions/{dimension.name}">
		<h2>{dimension.name}</h2>
	</a>
{/if}
