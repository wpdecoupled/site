<script lang="ts">
</script>

<main class="wrapper">
	<section class="about center">
		<p class="">
			WPDecoupled will be a place for <s>headless</s>
			decoupled WordPress countent! We hope to be
			<em>the</em> place for independent content on building with decoupled WordPress.
		</p>
	</section>
	<section class="definition center">
		<p>Decoupled WordPress</p>
		<p>/ diˈkʌp əld / wɜrd-prɛs /</p>
		<br />
		<dfn class="prose"
			>Using WordPress data via an API to provide content to other User Experiences beyond the
			WordPress themeing and templating engine.</dfn
		>
	</section>
</main>

<style lang="postcss">
	@layer components {
		section {
			border-bottom: var(--border-size-1) dashed var(--primary-color);
		}
		.about,
		.definition {
			height: var(--size-14);
		}
		.about > p {
			font-size: var(--font-size-3);
			line-height: var(--font-lineheight-3);
		}
	}
</style>
