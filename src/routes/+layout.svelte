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
		<p class="copyright">Copyright &#xa9; 2023 - WPDecoupled. All Rights Reserved.</p>
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

	.copyright {
		margin: auto;
		width: fit-content;
	}
</style>
