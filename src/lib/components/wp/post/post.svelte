<script lang="ts">
	import { fragment, graphql, type PostPage } from '$houdini';

	export let post: PostPage;

	$: data = fragment(
		post,
		graphql(`
			fragment PostPage on Post {
				title
				content
				dateGmt
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
		`)
	);

	$: author = $data.author?.node;
</script>

<article class="">
	<h1>{$data.title}</h1>
	{#if author}
		<div>
			{#if author.avatar}
				<img
					src={author.avatar.url}
					height={author.avatar.height}
					width={author.avatar.width}
					alt={author.name}
				/>
			{/if}
			<div>
				<p>{author.name}</p>
				{#if author.description}
					<p>{author.description}</p>
				{/if}
			</div>
		</div>
	{/if}

	<div class="prose">{@html $data.content}</div>
</article>
