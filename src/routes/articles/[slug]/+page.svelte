<script lang="ts">
	import type { PageData } from './$houdini';

	export let data: PageData;

	$: ({ Article } = data);
</script>

<main class="wrapper">
	{#if $Article.fetching}
		<p>Loading...</p>
	{:else if !$Article.data?.post}
		<p>No article found</p>
	{:else}
		<article class="">
			<h1>{$Article.data.post.title}</h1>
			<div class="prose">{@html $Article.data.post.content}</div>
		</article>
	{/if}
</main>
