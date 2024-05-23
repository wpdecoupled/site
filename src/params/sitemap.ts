import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	return /^(?:.*sitemap.*).(xml|xsl)$/.test(param);
};
