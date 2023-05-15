<script lang="ts">
	import { Logo } from '$lib/components';
	import MenuList from '$lib/components/wp/menu/menu-list.svelte';
	import type { LayoutData } from './$houdini';

	export let data: LayoutData["LayoutQuery"];

	$: ({ data: resultData } = $data);
</script>

<header class="center">
	<a class="wrapper logo" href="/">
		<Logo />
	</a>
	<!-- <div>THEME SWITCHER HERE</div> -->
	{#if resultData?.menu}
		<MenuList data={resultData.menu} />
	{/if}
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.logo {
		text-decoration: none;
	}
</style>
