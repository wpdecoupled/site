<script lang="ts">
	import { fragment, graphql, type SeoData, type SeoData$data } from '$houdini';

	export let data: SeoData;

	$: uriItemData = fragment(
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
		`)
	);

	$: seo = $uriItemData?.seo;
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
