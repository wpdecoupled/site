<script lang="ts">
	// import { enhance } from '$app/forms';
	import SearchInput from './input.svelte';

	let dialog: HTMLDialogElement = $state();
</script>

<div class="search-layout">
	<button
		type="button"
		aria-label="Open search dialog"
		onclick={() => {
			dialog.showModal();
		}}
		><svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
			/>
		</svg>
	</button>

	<dialog id="search-dialog" bind:this={dialog}>
		<SearchInput />
	</dialog>
</div>

<style lang="postcss">
	@import 'open-props/media';
	.search-layout {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	svg {
		width: var(--size-8);
		height: var(--size-8);
		/* filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4)); */
	}

	button {
		background: none;
		border: none;
		cursor: pointer;
		box-shadow: none;
	}

	dialog {
		width: 100%;
		max-width: var(--size-content-3);
	}
</style>
