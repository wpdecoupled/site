//Blocks that can be edited to create content and layouts
export interface EditorBlock {
	// The API version of the Gutenberg Block
	apiVersion: number;
	// The name of the category the Block belongs to
	blockEditorCategoryName: string;
	// The id of the Block
	clientId: string;
	// CSS Classnames to apply to the block
	cssClassNames: string[];
	// The inner blocks of the Block
	innerBlocks: EditorBlock[];
	// Whether the block is Dynamic (server rendered)
	isDynamic: boolean;
	// The name of the Block
	name: string;
	// The parent id of the Block
	parentClientId: string;
	// The rendered HTML for the block
	renderedHtml: string;
}

export type EditorBlocks = Readonly<EditorBlock>[];
