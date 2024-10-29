<script lang="ts">
	import { page } from '$app/stores';
	import { classNames } from '$lib/strings';
	import { fragment, graphql, type MenuItem } from '$houdini';

	interface Props {
		menuItemData: MenuItem;
	}

	let { menuItemData }: Props = $props();

	let data = $derived(fragment(
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
		`),
	));

	let { title, target } = $derived($data);
	let current_url = $derived($page.url.pathname);
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
