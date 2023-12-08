import type { ComponentType } from 'svelte';

const blocks = new Map<string, ComponentType>();

export function getBlocks() {
	return blocks;
}

export function registerBlock(name: string, component: ComponentType) {
	blocks.set(name, component);
}

export function registerBlocks(blocks: Record<string, ComponentType>) {
	Object.entries(blocks).forEach(([name, component]) => {
		registerBlock(name, component);
	});
}
