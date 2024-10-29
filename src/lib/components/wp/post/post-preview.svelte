<script lang="ts">
	import { run } from 'svelte/legacy';

	import { formatDate } from '$lib/strings';
	import { fragment, graphql, type PostPreview } from '$houdini';

	interface Props {
		post: PostPreview;
	}

	let { post }: Props = $props();

	let data = $derived(fragment(
		post,
		graphql`
			fragment PostPreview on ContentNode {
				... on NodeWithTitle {
					title
				}

				... on NodeWithExcerpt {
					excerpt
				}

				... on ContentNode {
					uri
					dateGmt
				}

				... on NodeWithAuthor {
					author {
						node {
							name
						}
					}
				}
			}
		`,
	));

	let date: string = $state();

	run(() => {
		if ($data.dateGmt) {
			date = formatDate($data.dateGmt);
		}
	});

	let cleanExcerpt = $derived($data.excerpt?.replace(/<[^>]*>?/gm, ''));
</script>

<li>
	<article>
		<h2><a href={$data.uri} rel="bookmark">{$data.title}</a></h2>
		<p class="details">
			Posted {date || 'IN THE FUTURE'} by {$data.author?.node.name ?? 'Unknown'}
		</p>
		{#if $data.excerpt}
			<p>
				{@html cleanExcerpt}
				<a class="readmore" href={$data.uri}>Read More »</a>
			</p>
		{/if}
	</article>
</li>

<style lang="postcss">
	li {
		padding-left: 0;
	}
	p {
		padding-bottom: var(--size-fluid-1);
	}

	h2 {
		font-size: var(--font-size-3);
	}

	.details {
		font-size: var(--font-size-0);
		font-style: italic;
	}
</style>
