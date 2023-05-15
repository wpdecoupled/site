import type { LayoutQueryVariables } from './$houdini';

export const trailingSlash = 'always';

export const _LayoutQueryVariables: LayoutQueryVariables = (event) => {
	return {
		uri: event.url.pathname,
	};
};
