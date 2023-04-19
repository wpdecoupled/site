<script lang="ts">
	import '../app.postcss';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import Analytics from './Analytics.svelte';

	import type { LayoutData } from './$houdini';

	export let data: LayoutData;

	$: ({ primaryNavMenu } = data);
</script>

<Analytics />
<div class="layout">
	<div class="header">
		<Header data={primaryNavMenu} />
	</div>
	<div class="main">
		<slot />
	</div>
	<div class="footer">
		<Footer />
	</div>
	<div class="post-footer wrapper">
		<p class="post-footer-line">Copyright &#xa9; 2023 - AVLIT, LLC. All Rights Reserved.</p>
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
		padding: var(--size-fluid-1) 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
	.post-footer > p {
		font-size: var(--font-size-0);
		width: fit-content;
		white-space: nowrap;
	}
</style>
