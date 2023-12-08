<script context="module">
	export const name = 'core/heading';
</script>

<script>
	let { attributes } = $$props;
</script>

<svelte:element
	this={`h${attributes.level}`}
	id={attributes.anchor}
	class={attributes.cssClassName}
>
	{@html attributes.content}
</svelte:element>
