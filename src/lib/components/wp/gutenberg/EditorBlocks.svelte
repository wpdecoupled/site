<script lang="ts" context="module">
	import type { EditorBlocks } from './types';
	import { getBlocks } from './api';

	const availableBlocks = getBlocks();
</script>

<script lang="ts">
	import { flatListToHierarchical } from './utils';

	export let blocks: EditorBlocks = [];

	const hierarchicalBlocks = flatListToHierarchical(blocks);
</script>

{#each hierarchicalBlocks as block}
	{#if availableBlocks.has(block.name)}
		<svelte:component this={availableBlocks.get(block.name)} {...block}>
			{#if block.innerBlocks}
				<svelte:self blocks={block.innerBlocks} />
			{/if}
		</svelte:component>
	{:else}
		<h3>Unknown block type: {block.name}</h3>
		<pre>
		{JSON.stringify(block, null, 2)}
	</pre>
	{/if}
	<!-- <svelte:component this={block.name} {block} /> -->
	<!-- {/if} -->
{/each}
