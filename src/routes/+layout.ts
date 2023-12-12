import { load_LayoutQuery } from '$houdini';
import { searchHandler } from './search/searchHandler';

import type { LayoutLoad } from './$types';

export const trailingSlash = 'always';
export const ssr = true;

export const load: LayoutLoad = async (event) => {
	searchHandler(event);

	event.setHeaders({
		'cache-control': 'public, max-age=20, stale-while-revalidate=60, stale-if-error=86400',
	});

	return {
		...(await load_LayoutQuery({
			event,
			variables: {
				uri: event.url.pathname,
			},
		})),
	};
};
