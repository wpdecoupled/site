<script lang="ts">
	export let query = '';
	let label = 'Search';
</script>

		<form class="search-container" action="/search">
			<label for="search" class="visuallyhidden">Search</label>
			<input
				id="search"
				type="search"
				value={query}
				name="q"
				placeholder={label}
				spellcheck="false"
				aria-label={label}
			/>
		</form>

<style lang="postcss">
	label {
		background-color: var(--surface-2);
		padding-block: var(--size-1);
		padding-inline: var(--size-2);
	}

	.search-container {
		width: 100%;
		max-width: var(--size-content-3);
	}

	#search {
		width: 100%;
	}
</style>
