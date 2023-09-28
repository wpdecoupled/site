<script lang="ts">
	import { page } from '$app/stores';
	import { Logo } from '$lib/components';
	import MenuList from '$lib/components/wp/menu/menu-list.svelte';
	import Search from './search/input.svelte';
	import type { LayoutData } from './$houdini';

	export let data: LayoutData['LayoutQuery'];

	$: ({ data: resultData } = $data);
</script>

<header class="center">
	<a class="wrapper logo" href="/">
		<Logo />
	</a>
	{#if !$page.url.pathname.startsWith('/search')}
		<Search />
	{/if}
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
