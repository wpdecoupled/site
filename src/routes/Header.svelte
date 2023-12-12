<script lang="ts">
	import { page } from '$app/stores';
	import { Logo } from '$lib/components';
	import MenuList from '$lib/components/wp/menu/menu-list.svelte';
	import OpenSearch from './search/openSearch.svelte';

	import type { LayoutData } from './$houdini';

	export let data: LayoutData['LayoutQuery'];

	$: ({ data: resultData } = $data);
</script>

<header class="center bottom-border">
	<div class="banner bottom-border">
		<div />
		<a class="wrapper logo" href="/">
			<Logo />
		</a>
		<div class="search-area">
			{#if !$page.url.pathname.startsWith('/search')}
				<OpenSearch />
			{/if}
		</div>
	</div>
	<!-- <div>THEME SWITCHER HERE</div> -->
	<div class="">
		{#if resultData?.menu}
			<MenuList data={resultData.menu} />
		{/if}
	</div>
</header>

<style lang="postcss">
	@import 'open-props/media';

	header {
		display: flex;
		justify-content: space-between;
	}

	.banner {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
	}

	@media (--md-n-below) {
		.search-area {
			border-style: solid;
			border-color: var(--primary-color);
			border-top-width: var(--border-size-1);
		}
		.banner {
			grid-template-columns: 1fr;
		}
	}

	.logo {
		text-decoration: none;
	}

	.bottom-border {
		border-style: solid;
		border-color: var(--primary-color);
		border-bottom-width: var(--border-size-1);
		/* border-top-width: var(--border-size-1); */
	}
</style>
