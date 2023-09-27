<script lang="ts">
	import { formatDate } from '$lib/strings';
	import { fragment, graphql, type PostPreview } from '$houdini';

	export let post: PostPreview;

	$: data = fragment(
		post,
		graphql`
			fragment PostPreview on Post {
				title
				excerpt
				uri
				dateGmt
				author {
					node {
						name
					}
				}
			}
		`
	);

	let date: string;

	$: if ($data.dateGmt) {
		date = formatDate($data.dateGmt);
	}

	$: cleanExcerpt = $data.excerpt?.replace(/<[^>]*>?/gm, '');
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
		font-size: var(--font-size-3)
	}

	.details {
		font-size: var(--font-size-0);
		font-style: italic;
	}
</style>
