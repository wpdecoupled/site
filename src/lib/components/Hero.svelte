<section class={`hero ${$$props.class}`}>
	<slot />
</section>

<style lang="postcss">
	.hero {
		width: 100%;
		aspect-ratio: var(--ratio-golden);
	}
</style>
