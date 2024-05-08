import type { PageLoad } from './$types';

import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { load_PostContent } from '$houdini';

export const load: PageLoad = async (event) => {
	const data = await load_PostContent({ event, variables: { uri: event.url.pathname } });

	const postContent = get(data.PostContent);

	if (!postContent.data?.post) {
		error(404, 'Post not found');
	}

	return data;
};
