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
		/* border-radius: var(--radius-2) 0 0 var(--radius-2); */
	}

	#search {
		/* width: 0; */
		/* transition: all 0.2s ease-in-out; */
		/* padding: 0; */
		/* border-radius: 0 var(--radius-2) var(--radius-2) 0; */
		max-width: var(--size-content-2);
		width: 100%;
		/* &:focus {
			padding: var(--size-2);
		} */
	}
</style>
