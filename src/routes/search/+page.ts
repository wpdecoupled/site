import type { PageLoad } from './$types';
import { load_SearchQuery } from '$houdini';

export const prerender = false;

export const load: PageLoad = async (event) => {
	const { url } = event;
	const query = url.searchParams.get('q') ?? '';

	const resp = await load_SearchQuery({ event, variables: { query } });

	return {
		query,
		results: resp.SearchQuery,
	};
};
