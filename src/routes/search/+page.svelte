<script lang="typescript">
	import type { PageData } from './$houdini';

	export let data: PageData;
</script>

<main id="content" class="wrapper">
	<h1>Search</h1>
	{#if data?.query}
		<p>Search query: "{data?.query}"</p>
	{/if}

	{#if data?.results}
		{#each data?.results as result}
			<a href={result.node.uri}>
				<p>{result.node.title}</p>
			</a>
		{/each}
	{/if}
</main>
