<script lang="ts">
	import { page } from '$app/stores';
	import { classNames } from '$lib/strings';
	import { fragment, graphql, type MenuItem } from '$houdini';

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
	$: current_url = $page.url.pathname;
</script>

<li class="nav-item">
	<a
		href={$data.uri}
		{title}
		class={classNames($data.cssClasses, { current: current_url === $data.uri })}
		{target}>{$data.label}</a
	>
</li>

<style lang="postcss">
	li {
		list-style: none;
		white-space: nowrap;
		width: max-content;
	}


	a.current {
		text-decoration-style: wavy;
	}
</style>
