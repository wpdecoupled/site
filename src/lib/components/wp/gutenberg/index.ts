export { default as EditorBlocks } from './EditorBlocks.svelte';
export * from './types';
export * from './api';

import { default as CoreParagraph, name as CoreParagraphName } from './CoreParagraph.svelte';
import { default as CoreHeading, name as CoreHeadingName } from './CoreHeading.svelte';
import { default as CoreImage, name as CoreImageName } from './CoreImage.svelte';

export const defaultBlocks = {
	[CoreParagraphName]: CoreParagraph,
	[CoreHeadingName]: CoreHeading,
	[CoreImageName]: CoreImage,
};
