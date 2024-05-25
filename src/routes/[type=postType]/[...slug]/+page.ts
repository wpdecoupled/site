import { error } from '@sveltejs/kit';
import type { AfterLoadEvent, PostContentVariables } from './$houdini';

export const _PostContentVariables: PostContentVariables = ({ url }) => {
	return {
		uri: url.pathname,
	};
}

export function _houdini_afterLoad(event: AfterLoadEvent) {
	const { data } = event;
	if (!data.PostContent.post) {
		error(404, 'Page not found.');
	}
}
