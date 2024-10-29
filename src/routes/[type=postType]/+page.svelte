<script lang="ts">
	import PostArchive from '$lib/components/wp/post/post-archive.svelte';
	import PostPreview from '$lib/components/wp/post/post-preview.svelte';
	import type { PageData } from './$houdini';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { PostArchive: PostArchiveData } = $derived(data);
</script>

<main class="wrapper">
	<h1 class="visuallyhidden">Articles</h1>
	{#if $PostArchiveData.fetching}
		<p>Loading...</p>
	{:else if !$PostArchiveData.data?.contentType?.contentNodes?.nodes}
		<p>No articles found</p>
	{:else}
		<PostArchive>
			{#each $PostArchiveData.data?.contentType?.contentNodes?.nodes as post}
				<PostPreview {post} />
			{/each}
		</PostArchive>
	{/if}
</main>
