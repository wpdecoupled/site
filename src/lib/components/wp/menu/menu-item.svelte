<script lang="ts">
	import { fragment, graphql } from '$houdini';

	/* @type { import('$houdini').MenuItem } */
	export let menuItemData: MenuItem;

	$: data = fragment(
		menuItemData,
		graphql(`
			fragment MenuItem on MenuItem {
				url
				uri
				label
				title
				cssClasses
				target
			}
		`)
	);

	$: ({ title, target } = $data);
</script>

<li class="nav-item">
	<a href={$data.uri} {title} class={$data.cssClasses} {target}>{$data.label}</a>
</li>

<style lang="postcss">
	li {
		list-style: none;
		white-space: nowrap;
		width: max-content;
	}
</style>
