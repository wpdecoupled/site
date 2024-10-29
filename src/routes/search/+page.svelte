<script lang="ts">
	import SearchInput from './input.svelte';
	import type { PageData } from './$houdini';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { query, results } = $derived(data);
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
						<h3>{result.node.title}</h3>
					</a>
					{#if result.node.excerpt}
						<p>{@html result.node.excerpt}</p>
					{/if}
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

	li {
		border: dashed 1px var(--primary-color);
		margin: var(--size-fluid-1) 0;
		padding: var(--size-fluid-1) 0;
	}

	h3 {
		font-size: var(--font-size-4);
	}
</style>
