<script lang="ts">
	import { formatDate } from '$lib/strings';
	import { fragment, graphql, type GuidePage } from '$houdini';

	export let post: GuidePage;

	$: data = fragment(
		post,
		graphql(`
			fragment GuidePage on Guide {
				title
				content
				modifiedGmt
				author {
					node {
						name
						description
						avatar {
							url
							height
							width
						}
					}
				}
			}
		`),
	);

	$: author = $data.author?.node;
</script>

<article class="prose">
	<header>
		<h1>{$data.title}</h1>
		<p class="top-intro">
			{author?.name ?? 'Unknown'}&nbsp;-&nbsp; Last Updated
			<time datetime={$data.modifiedGmt}>{formatDate($data.modifiedGmt)}</time>
		</p>
	</header>

	<div class="content">{@html $data.content}</div>

	<footer>
		{#if author}
			<div class="author-card">
				{#if author.avatar}
					<img
						src={author.avatar.url}
						height={author.avatar.height}
						width={author.avatar.width}
						alt={author.name}
						loading="lazy"
					/>
				{/if}
				<div>
					<h2>About {author.name}</h2>
					{#if author.description}
						<p>{author.description}</p>
					{/if}
				</div>
			</div>
		{/if}
	</footer>
</article>

<style lang="postcss">
	:global(:is(h1, h2, h3, h4, h5, h6) > a) {
		display: inline-block;
	}

	article {
		margin: auto;
	}

	h1 {
		max-inline-size: 100%;
	}

	header,
	.content {
		margin-bottom: var(--size-fluid-4);
	}

	.top-intro {
		font-size: smaller;
		font-style: italic;
		padding-top: var(--size-fluid-1);
	}

	footer {
		border: 1px dashed var(--primary-color);
		/* border-radius: var(--radius-1); */
		padding: var(--size-fluid-1);
	}

	.author-card {
		display: flex;
		align-items: center;
	}

	.author-card img {
		border-radius: 50%;
		height: 100%;
		margin-right: var(--size-fluid-1);
	}

	:global(.prose .content p) {
		padding-bottom: var(--size-fluid-1);
		line-height: var(--font-lineheight-4);
		letter-spacing: var(--font-letterspacing-1);
	}

	:global(.prose .content li) {
		padding-bottom: var(--size-fluid-1);
		line-height: var(--font-lineheight-2);
		letter-spacing: var(--font-letterspacing-1);
	}

	:global(.prose .content h2) {
		padding-bottom: var(--size-fluid-2);
		font-size: var(--font-size-5);
		line-height: var(--font-lineheight-4);
	}
</style>
