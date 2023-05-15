<script lang="ts">
	import MenuItem from './menu-item.svelte';
	import { fragment, graphql, type MenuItems } from '$houdini';

	export let data: MenuItems | null;

	$: menuItemsData = fragment(
		data,
		graphql(`
			fragment MenuItems on Menu {
				menuItems {
					nodes {
						...MenuItem
					}
				}
			}
		`)
	);
</script>

{#if $menuItemsData && $menuItemsData.menuItems}
	<nav class="wrapper">
		<ul>
			{#each $menuItemsData.menuItems.nodes as menuItem}
				<MenuItem menuItemData={menuItem} />
			{/each}
		</ul>
	</nav>
{/if}

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
		padding: 0;
		margin: auto;
	}
</style>
