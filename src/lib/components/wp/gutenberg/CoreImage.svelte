<script context="module">
	import { classNames } from '$lib/strings';

	export const name = 'core/image';
</script>

<script>
	import ConditionalWrapper from './ConditionalWrapper.svelte';

	let { attributes } = $$props;

	const includeWrapper = Boolean(attributes.align);
	const inclideLink = Boolean(attributes.href);
</script>

<ConditionalWrapper
	condition={includeWrapper}
	tag="div"
	class={classNames('wp-block-image', attributes.className)}
>
	<figure
		id={attributes.anchor}
		class={classNames(attributes.cssClassName, {
			'wp-block-image': !includeWrapper,
		})}
	>
		<ConditionalWrapper
			condition={inclideLink}
			tag="a"
			class={attributes.linkClass}
			href={attributes.href}
			rel={attributes.rel}
			target={attributes.linkTarget}
		>
			<img
				src={attributes.src}
				alt={attributes.alt}
				class={`wp-image-${attributes.id}`}
				width={attributes.width}
				height={attributes.height}
				title={attributes.title}
			/>
		</ConditionalWrapper>

		{#if attributes.caption}
			<figcaption class="wp-element-caption">{attributes.caption}</figcaption>
		{/if}
	</figure>
</ConditionalWrapper>
