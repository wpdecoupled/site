import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return /^(?:.*sitemap.*).(xml|xsl)$/.test(param);
}) satisfies ParamMatcher;
