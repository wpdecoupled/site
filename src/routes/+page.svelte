<script lang="ts">
	import type { ActionData } from './$types';
	import EmailForm from "./EmailForm.svelte"
	export let form: ActionData;
</script>

<main class="wrapper">
	<section class="about center">
		<p class="">
			WPDecoupled will be a place for <s>headless</s>
			decoupled WordPress content! We hope to be
			<em>the</em> place for independent content on building with decoupled WordPress.
		</p>
	</section>
	<section id="signup" class="center">
		<EmailForm form={form} />
	</section>
</main>

<style lang="postcss">
	section {
		height: 35vh;
	}
	.about > p {
		font-size: var(--font-size-3);
		line-height: var(--font-lineheight-3);
	}
</style>
