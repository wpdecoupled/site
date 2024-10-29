<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<ul>
	{@render children?.()}
</ul>

<style lang="postcss">
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: var(--size-fluid-2);
		list-style: none;
		padding: 0;
	}
</style>
