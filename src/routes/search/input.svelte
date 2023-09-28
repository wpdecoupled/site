<script lang="typescript">
	let q = '';
	let label = 'Search';
</script>

<form class="search-container" action="/search">
	<input type="search" value={q} name="q" placeholder={label} spellcheck="false" aria-label={label} />
</form>

<style lang="postcss">
</style>
