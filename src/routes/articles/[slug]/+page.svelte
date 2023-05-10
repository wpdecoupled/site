<script lang="ts">
	import Post from "$lib/components/wp/post/post.svelte";

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
		<Post post={$Article.data.post} />
	{/if}
</main>
