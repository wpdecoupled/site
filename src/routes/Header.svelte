<script lang="ts">
	import { Logo } from '$lib/components';
</script>

<header class=" center">
	<a class="wrapper logo" href="/">
		<Logo />
	</a>
	<!-- <nav> -->
	<!-- <a href="/blog">Blog</a> -->
	<!-- </nav> -->
	<!-- <div>THEME SWITCHER HERE</div> -->
	<nav class="wrapper">
		<ul />
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

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
		padding: var(--size-fluid-1) 0;
		margin: auto;
	}

	li {
		list-style: none;
	}

	.logo {
		text-decoration: none;
	}
</style>
