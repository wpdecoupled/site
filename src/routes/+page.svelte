<script lang="ts">
	import type { ActionData } from './$types';
	import EmailForm from './EmailForm.svelte';
	import RecentPosts from '$lib/components/wp/content/recent-posts.svelte';
	import PostMiniCard from '$lib/components/wp/post/post-mini-card.svelte';
	import type { PageData } from './$houdini';
	import { HomePageQueryStore } from '$houdini';

	export let form: ActionData;

	export let data: PageData;

	$: ({ HomePageQuery } = data);
</script>

<main class="wrapper">
	{#if $HomePageQuery.fetching}
		<p>Loading...</p>
	{:else}
		<section class="about center add-some-spacing">
			{#if !$HomePageQuery.data?.page}
				<p>No content found</p>
			{:else}
				<h1>{$HomePageQuery.data.page.title}</h1>
				<br />
				<p>
					{@html $HomePageQuery.data.page.content.replaceAll(/<\/?p>/g, '')}
				</p>
			{/if}
		</section>
		<section class="recent-posts">
			<RecentPosts>
				{#if !$HomePageQuery.data?.contentNodes?.nodes}
					<p>No articles found</p>
				{:else}
					{#each $HomePageQuery.data?.contentNodes?.nodes as post}
						<PostMiniCard {post} />
					{/each}
				{/if}
			</RecentPosts>
		</section>
		<section id="signup" class="center add-some-spacing">
			<EmailForm {form} />
		</section>
	{/if}
</main>

<style lang="postcss">
	.add-some-spacing {
		margin: var(--size-fluid-6) 0;
	}

	.about > h1 {
		max-inline-size: unset;
	}
	.about > p {
		font-size: var(--font-size-3);
		line-height: var(--font-lineheight-3);
	}
</style>
