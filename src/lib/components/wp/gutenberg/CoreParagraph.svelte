<script context="module">
	export const name = 'core/paragraph';
	export const GraphQLFragment = `
	... on CoreParagraph {
						attributes {
							anchor
							align
							gradient
							lock
							placeholder
							textColor
							anchor
							fontSize
							fontFamily
							dropCap
							direction
							cssClassName
							content
						}
					}`;
</script>

<script>
	let { attributes } = $$props;
</script>

<p id={attributes.anchor} class={attributes.cssClassName}>{@html attributes.content}</p>
