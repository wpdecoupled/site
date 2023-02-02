<script lang="ts">
	import { Logo } from "$lib/components"
</script>
<div id="header-container">
	<header class="wrapper wide">
		<a class="logo" href="/">
			<Logo />
		</a>
		<!-- <nav> -->
			<!-- <a href="/blog">Blog</a> -->
			<!-- </nav> -->
			<!-- <div>THEME SWITCHER HERE</div> -->
		</header>
</div>

<style>
	header {
		display: flex;
		justify-content: space-between;
		margin: auto;
	}

	#header-container {
		background-color: var(--primary-highlight-color);

	}

</style>
