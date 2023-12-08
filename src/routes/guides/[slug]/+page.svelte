<script lang="ts">
	import Post from '$lib/components/wp/content/guide.svelte';

	import type { PageData } from './$houdini';

	export let data: PageData;

	$: ({ Guide } = data);
</script>

<main class="wrapper">
	{#if $Guide.fetching}
		<p>Loading...</p>
	{:else if !$Guide.data?.guide}
		<p>No article found</p>
	{:else}
		<Post post={$Guide.data.guide} />
	{/if}
</main>
