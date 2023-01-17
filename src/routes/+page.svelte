<script lang="ts">
	import { Wrapper, Hero } from '$lib/components/index';
</script>

<Wrapper>
	<main>
		<Hero>
			<div class="definition">
				<p>Decoupled WordPress</p>
				<p>/ diˈkʌp əld / wɜrd-prɛs /</p>
				<dfn>Insert a definition here</dfn>
			</div>
		</Hero>
	</main>
</Wrapper>

<style lang="postcss">
	main {
		height: 2000px;
	}

	.definition {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
	}
</style>
