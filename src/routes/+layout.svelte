<script lang="ts">
	import '../app.postcss';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import Analytics from './Analytics.svelte';

	import type { LayoutData } from './$houdini';

	export let data: LayoutData;

	let year = new Date().getFullYear();

	$: ({ LayoutQuery } = data);
</script>

<svelte:head>
	{@html $LayoutQuery.data?.nodeByUri?.seo?.fullHead ?? ''}
	{@html $LayoutQuery.data?.nodeByUri?.seo?.jsonLd?.raw ?? ''}
</svelte:head>

<Analytics />
<div class="layout">
	<div class="header">
		<Header data={LayoutQuery} />
	</div>
	<div class="main">
		<slot />
	</div>
	<div class="footer">
		<Footer />
	</div>
	<div class="post-footer wrapper">
		<p class="post-footer-line">Copyright &#xa9; {year} - AVLIT, LLC. All Rights Reserved.</p>
		<p class="post-footer-line">
			Hosting sponsored by
			<a
				href="https://wpengine.com/atlas/?utm_source=wpdecoupled&utm_campaign=hosting_sponsor"
				target="_blank"
				rel="noreferrer">WPEngine Atlas</a
			>
		</p>
	</div>
</div>

<style lang="postcss">
	.layout {
		display: grid;
		grid:
			'header' auto
			'main' max-content
			'footer' auto
			'post-footer' auto
			/ 1fr;
		gap: var(--size-fluid-1);
	}

	.header {
		grid-area: header;
	}

	.main {
		grid-area: main;
	}

	.footer {
		grid-area: footer;
	}

	.post-footer {
		grid-area: post-footer;

		width: 100%;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		gap: var(--size-4);
	}
	.post-footer-line {
		font-size: var(--font-size-0);
	}

	.post-footer-line a {
		margin-inline: 0;
		padding-inline: 0;
	}
</style>
