<script lang="ts">
	import { error } from '@sveltejs/kit';
	import Post from '$lib/components/wp/post/post.svelte';

	import type { PageData } from './$houdini';

	export let data: PageData;

	$: ({ PostContent } = data);
</script>

<main class="wrapper">
	{#if $PostContent.fetching}
		<p>Loading...</p>
	{:else if $PostContent.data?.post == undefined}
		<p>Not Found</p>
	{:else}
		<Post post={$PostContent.data.post} />
	{/if}
</main>
