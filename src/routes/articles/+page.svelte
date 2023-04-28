<script lang="ts">
	import PostArchive from '$lib/components/wp/post/post-archive.svelte';
	import PostPreview from '$lib/components/wp/post/post-preview.svelte';
	import type { PageData } from './$houdini';

	export let data: PageData;

	$: ({ Posts } = data);
</script>

<main class="wrapper">
	<h1 class="visuallyhidden">Articles</h1>
	{#if $Posts.fetching}
		<p>Loading...</p>
	{:else if !$Posts.data?.posts?.nodes}
		<p>No articles found</p>
	{:else}
		<PostArchive>
			{#each $Posts.data?.posts?.nodes as post}
				<PostPreview  post={post} />
			{/each}
		</PostArchive>
	{/if}
</main>

