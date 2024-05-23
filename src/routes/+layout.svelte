<script lang="ts">
	import '../app.postcss';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import Seo from './Seo.svelte';
	import Partytown from './Partytown.svelte';

	import type { LayoutData } from './$houdini';

	export let data: LayoutData;

	let year = new Date().getFullYear();

	$: ({ LayoutQuery } = data);
</script>

{#if $LayoutQuery.data?.nodeByUri}
	<Seo data={$LayoutQuery.data.nodeByUri} />
{/if}
<Partytown />
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
			'header' min-content
			'main' auto
			'footer' min-content
			'post-footer' min-content
			/ 1fr;
		gap: var(--size-fluid-1);
		min-height: 100dvh;
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
