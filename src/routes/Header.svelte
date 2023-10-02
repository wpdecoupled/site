<script lang="ts">
	import { page } from '$app/stores';
	import { Logo } from '$lib/components';
	import MenuList from '$lib/components/wp/menu/menu-list.svelte';
	import OpenSearch from './search/openSearch.svelte';

	import type { LayoutData } from './$houdini';

	export let data: LayoutData['LayoutQuery'];

	$: ({ data: resultData } = $data);
</script>

<header class="center">
	<div class="banner">
		<div></div>
		<a class="wrapper logo" href="/">
			<Logo />
		</a>
		{#if !$page.url.pathname.startsWith('/search')}
			<OpenSearch />
		{/if}
	</div>
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

	.banner {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
	}

	.logo {
		text-decoration: none;
	}
</style>
