<script lang="ts">
	import SearchInput from './input.svelte';
	import type { PageData } from './$houdini';

	export let data: PageData;

	$: ({ query, results } = data);
</script>

<main id="content" class="wrapper">
	<h1>Search</h1>
	<SearchInput {query} />
	{#if $results.fetching}
		<p>Searching...</p>
	{:else if $results.errors}
		<p>Something went wrong</p>
	{:else if !$results.data?.contentNodes?.edges.length}
		<p>No results found</p>
	{:else}
		<ol>
			{#each $results.data?.contentNodes?.edges as result}
				<li>
					<a href={result.node.uri}>
						<p>{result.node.title}</p>
					</a>
				</li>
			{/each}
		</ol>
	{/if}
</main>

<style lang="postcss">
	#content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	ol {
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>
