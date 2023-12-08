<script lang="ts">
</script>

<div class="card-tray">
	<header class="tray-header">
		<h2>Recent</h2>
	</header>
	<ul class="tray-list">
		<slot />
	</ul>
</div>

<style lang="postcss">
	.card-tray {
		display: flex;
		width: calc(100vw - (2 * var(--size-fluid-1)));
		max-width: 100%;
		overflow: visible;
	}

	.tray-header, .tray-list {
		padding-top: var(--size-6);
	}

	.tray-header h2 {
		display: flex;
		writing-mode: sideways-lr;
		padding: 0 var(--size-5) 0 var(--size-3);
		letter-spacing: var(--font-letterspacing-4);
		font-size: var(--font-size-8);
		text-decoration: 1px overline var(--primary-color);

	}

	.tray-list {
		display: flex;
		gap: var(--size-3);
		padding-bottom: var(--size-6);
		padding-left: var(--size-8);
		padding-right: var(--size-6);
		overflow-y: visible;
		overflow-x: scroll;
		scrollbar-gutter: always;
	}
</style>
