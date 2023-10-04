<footer class="wrapper center">
	<section class="definition vcenter">
		<div>
			<p><b>Decoupled WordPress</b> - / diˈkʌp əld / wɜrd-prɛs /</p>
			<dfn class="prose">
				Using WordPress data via an API to provide content to user experiences beyond the WordPress
				theming and templating engine. aka "Headless WordPress".
			</dfn>
		</div>
	</section>
	<section class="social">
		<p>Stay up-to-date with the latest decoupled WordPress news, articles, and more:</p>
		<a href="https://twitter.com/wpdecoupled" title="WPDecoupled X(prev. Twitter)">
			<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				><title>X</title><path
					d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
				/></svg
			>
		</a>
	</section>
</footer>

<style lang="postcss">
	@import 'open-props/media';

	footer {
		border-style: solid;
		border-color: var(--primary-color);
		border-bottom-width: var(--border-size-1);
		border-top-width: var(--border-size-1);

		display: flex;
		gap: var(--size-fluid-2);
		flex-direction: row;
		/* grid-template-columns: 1fr 1fr; */
	}

	@media (--md-n-below) {
		footer {
			flex-direction: column-reverse;
		}
	}

	section.social {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		text-wrap: balance;

		& p {
			max-inline-size: var(--size-content-2);
		}
	}
</style>
