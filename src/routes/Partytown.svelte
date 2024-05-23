<script lang="ts">
	import { PUBLIC_GA_ID } from '$env/static/public';
	import { partytownSnippet } from '@builder.io/partytown/integration';
</script>

<svelte:head>
		<script>
			// Forward the necessary functions to the web worker layer
			partytown = {
				forward: ['dataLayer.push', 'gtag'],
			};
		</script>

		{@html '<script>' + partytownSnippet() + '</script>'}

		<script
			type="text/partytown"
			src="https://www.googletagmanager.com/gtag/js?id={PUBLIC_GA_ID}"
		></script>

		<script type="text/partytown">
			window.dataLayer = window.dataLayer || [];
			window.gtag = function () {
				dataLayer.push(arguments);
			};
			gtag('js', new Date());
			gtag('config', '{PUBLIC_GA_ID}');
		</script>
</svelte:head>
