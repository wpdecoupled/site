<script lang="ts">
	import PostArchive from '$lib/components/wp/post/post-archive.svelte';
	import PostPreview from '$lib/components/wp/post/post-preview.svelte';
	import type { PageData } from './$houdini';

	export let data: PageData;

	$: ({ GuidePosts } = data);
</script>

<main class="wrapper">
	<h1 class="visuallyhidden">Guides</h1>
	{#if $GuidePosts.fetching}
		<p>Loading...</p>
	{:else if !$GuidePosts.data?.guides?.nodes}
		<p>No guides found</p>
	{:else}
		<PostArchive>
			{#each $GuidePosts.data?.guides?.nodes as post}
				<PostPreview {post} />
			{/each}
		</PostArchive>
	{/if}
</main>
