import { load_LayoutQuery } from '$houdini';
import { searchHandler } from './search/searchHandler';
import { dev } from '$app/environment';

import type { LayoutLoad } from './$types';

export const trailingSlash = 'always';
export const ssr = true;
export const prerender = false;

export const load: LayoutLoad = async (event) => {
	searchHandler(event);

	if (!dev) {
		event.setHeaders({
			'cache-control': 'public, max-age=300, stale-while-revalidate=60, stale-if-error=86400',
		});
	}

	return {
		...(await load_LayoutQuery({
			event,
			variables: {
				uri: event.url.pathname,
			},
		})),
	};
};
