<script lang="ts">
	import MenuItem from './menu-item.svelte';

	export let nav;
</script>

<nav class="wrapper">
	<ul>
		{#each nav.data.menu.menuItems.nodes as menuItem}
			<MenuItem menuItemData={menuItem} />
		{/each}
	</ul>
</nav>

<style lang="postcss">
	nav {
		width: 100%;

		border-style: solid;
		border-color: var(--primary-color);
		border-bottom-width: var(--border-size-1);
		border-top-width: var(--border-size-1);
	}
	nav ul {
		width: fit-content;
		display: flex;
		justify-content: space-between;

		gap: var(--size-fluid-4);
		padding: var(--size-fluid-1) 0;
		margin: auto;
	}
</style>
