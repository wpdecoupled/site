<script lang="ts">
	import { formatDate } from '$lib/strings';
	import { fragment, graphql, type PostPreview } from '$houdini';

	export let post: PostPreview;

	$: title = fragment(
		post,
		graphql`
			fragment PostTitle on NodeWithTitle {
				title
			}
		`
	)

	$: excerpt = fragment(
		post,
		graphql`
			fragment PostExcerpt on NodeWithExcerpt {
				excerpt
			}
		`
	)

	$: meta = fragment(
		post,
		graphql`
			fragment PostMeta on ContentNode {
				uri
				dateGmt
			}
		`
	)

	$: author = fragment(
		post,
		graphql`
			fragment PostAuthor on NodeWithAuthor {
				author {
					node {
						name
					}
				}
			}
		`
	)

	let date: string;

	$: if ($meta.dateGmt) {
		date = formatDate($meta.dateGmt);
	}

	$: cleanExcerpt = $excerpt.excerpt?.replace(/<[^>]*>?/gm, '');
</script>

<li>
	<article>
		<h2><a href={$meta.uri} rel="bookmark">{$title.title}</a></h2>
		<p class="details">
			Posted {date || 'IN THE FUTURE'} by {$author.author?.node.name ?? 'Unknown'}
		</p>
		{#if $excerpt.excerpt}
			<p>
				{@html cleanExcerpt}
				<a class="readmore" href={$meta.uri}>Read More »</a>
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
		font-size: var(--font-size-3)
	}

	.details {
		font-size: var(--font-size-0);
		font-style: italic;
	}
</style>
