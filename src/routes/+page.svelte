<script lang="ts">
	import type { ActionData } from './$types';
	import EmailForm from './EmailForm.svelte';
	import RecentPosts from '$lib/components/wp/content/recent-posts.svelte';
	import PostMiniCard from '$lib/components/wp/post/post-mini-card.svelte';
	import type { PageData } from './$houdini';
	// import { graphql, type RecentPostsType } from '$houdini';

	export let form: ActionData;

	export let data: PageData;

	$: ({ RecentPostsQuery } = data);
</script>

<main class="wrapper">
	<section class="about center add-some-spacing">
		<p class="">
			WPDecoupled will be a place for <s>headless</s>
			decoupled WordPress content! We hope to be
			<em>the</em> place for independent content on building with decoupled WordPress.
		</p>
	</section>
	<section class="recent-posts">
		<RecentPosts>
			{#if $RecentPostsQuery.fetching}
				<p>Loading...</p>
			{:else if !$RecentPostsQuery.data?.contentNodes?.nodes}
				<p>No articles found</p>
			{:else}
				{#each $RecentPostsQuery.data?.contentNodes?.nodes as post}
					<PostMiniCard {post} />
				{/each}
			{/if}
		</RecentPosts>
	</section>
	<section id="signup" class="center add-some-spacing">
		<EmailForm {form} />
	</section>
</main>

<style lang="postcss">
	.add-some-spacing {
		margin: var(--size-fluid-6) 0;
	}
	.about > p {
		font-size: var(--font-size-3);
		line-height: var(--font-lineheight-3);
	}
</style>
