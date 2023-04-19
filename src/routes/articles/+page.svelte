<script lang="ts">
	import type { PageData } from './$houdini';

	export let data: PageData;

	$: ({ Articles } = data);
</script>

<main class="wrapper">
	<h1>Articles</h1>
	{#if $Articles.fetching}
		<p>Loading...</p>
	{:else if !$Articles.data?.posts?.nodes}
		<p>No articles found</p>
	{:else}
		<ul>
			{#each $Articles.data?.posts?.nodes as article}
				<li>
					<a href="/articles/{article.slug}">{article.title}</a>
				</li>
			{/each}
		</ul>
	{/if}
</main>
