import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	return param.endsWith('.php') || param.endsWith('.php/');
};
