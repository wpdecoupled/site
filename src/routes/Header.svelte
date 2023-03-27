<script lang="ts">
	import { Logo } from '$lib/components';
	import MenuList from '$lib/components/wp/menu/menu-list.svelte';
	export let nav;
</script>

<header class="center">
	<a class="wrapper logo" href="/">
		<Logo />
	</a>
	<!-- <div>THEME SWITCHER HERE</div> -->
	<MenuList {nav} />
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
