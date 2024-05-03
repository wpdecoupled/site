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
		`),
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
