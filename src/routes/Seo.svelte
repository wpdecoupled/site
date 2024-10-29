<script lang="ts">
	import { fragment, graphql, type SeoData } from '$houdini';

	interface Props {
		data: SeoData;
	}

	let { data }: Props = $props();

	let uriItemData = $derived(fragment(
		data,
		graphql(`
			fragment SeoData on UniformResourceIdentifiable {
				... on NodeWithRankMathSeo {
					seo {
						fullHead
						jsonLd {
							raw
						}
					}
				}
			}
		`),
	));

	let seo = $derived($uriItemData?.seo);
</script>

<svelte:head>
	{#if seo}
		{#if seo.fullHead}
			{@html seo.fullHead}
		{/if}
		{#if seo.jsonLd?.raw}
			{@html seo.jsonLd.raw}
		{/if}
	{/if}
</svelte:head>
