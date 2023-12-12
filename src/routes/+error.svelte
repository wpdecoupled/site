<script lang="ts">
	import SearchInput from './search/input.svelte';
	import { page } from '$app/stores';
</script>

<main id="content" class="wrapper">
	<h1>Search</h1>
	<SearchInput query="" />
	<p>{$page.status}: {$page.error?.message}</p>
</main>

<style lang="postcss">
	#content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	p {
		margin: var(--size-fluid-1) 0;
	}
</style>
