<script lang="ts">
	import { formatDate } from '$lib/strings';
	import { fragment, graphql, type PostMiniCard } from '$houdini';

	export let post: PostMiniCard;

	$: data = fragment(
		post,
		graphql`
			fragment PostMiniCard on ContentNode {
				dateGmt
				uri
				contentType {
					node {
						name
						uri
					}
				}
				... on Guide {
					contentType {
						node {
							uri
						}
					}
				}
				... on NodeWithAuthor {
					author {
						node {
							name
							avatar {
								url
							}
						}
					}
				}
				... on NodeWithTitle {
					title
				}
			}
		`,
	);

	let date: string;

	$: if ($data.dateGmt) {
		date = formatDate($data.dateGmt);
	}
</script>

<li class="card">
	<article>
		<section>
			{#if 'title' in $data}
				<h2><a href={$data.uri} rel="bookmark">{$data.title}</a></h2>
			{/if}
			<p class="details">
				<a class="content-link" href={$data.contentType?.node.uri}>
					<b>{$data.contentType?.node.name === 'post' ? 'Article' : $data.contentType?.node.name}</b
					>
				</a>
				from {date || 'IN THE FUTURE'}
			</p>
		</section>

		{#if 'author' in $data}
			<section>
				<img class="author-image" src={$data.author?.node.avatar?.url} alt="Author headshot" />
				<span class="author-name">{$data.author?.node.name ?? 'Unknown'}</span>
			</section>
		{/if}
	</article>
</li>

<style lang="postcss">
	li {
		list-style: none;
		/* padding-left: 0; */
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

	.details .content-link {
		text-transform: capitalize;
	}

	.author-image {
		display: inline;
		width: var(--size-6);
		height: var(--size-6);
		border-radius: 50%;
		margin-right: var(--size-1);
		vertical-align: bottom;
	}

	.card {
		min-width: 150px;
		max-width: var(--size-13);
		min-height: var(--size-13);
		background-color: var(--surface-2);
		box-shadow: var(--shadow-2);
		padding: var(--size-2);
		transition: all 0.2s ease-in-out;

		&:not(:first-child) {
			margin-left: -20px;
		}

		&:hover {
			box-shadow: var(--shadow-4);
			transform: rotate(-5deg);
			transform-origin: bottom left;
		}
	}
	.card article {
		display: flex;
		min-width: min-content;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}

	:global(li.card:hover ~ .card) {
		transform: translateX(30px);
	}

	:global(li.card:nth-child(odd)) {
		transform: rotate(1deg);
		margin-top: -2px;
	}
	:global(li.card:nth-child(even)) {
		transform: rotate(-1deg);
	}
</style>
