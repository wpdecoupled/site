<script lang="ts">
	import '../app.postcss';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
</script>

<div class="layout">
	<div class="header">
		<Header />
	</div>
	<div class="main">
		<slot />
	</div>
	<div class="footer">
		<Footer />
	</div>
	<div class="post-footer">
		<p class="post-footer-line">Copyright &#xa9; 2023 - Alex Moon. All Rights Reserved.</p>

		<p class="post-footer-line">
			Hosting Sponsored by <u
				><a href="https://wpengine.com/atlas/" target="_blank" rel="noreferrer">WPEngine Atlas</a
				></u
			>
		</p>
	</div>
</div>

<style lang="postcss">
	.layout {
		display: grid;
		grid:
			'header' auto
			'main' 1fr
			'footer' auto
			/ 1fr;
		gap: 8px;
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
		margin: var(--size-4) auto;
	}
	.post-footer > p {
		font-size: var(--font-size-0);
		width: fit-content;
		white-space: nowrap;
	}
</style>
