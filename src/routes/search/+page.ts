import type { PageLoad } from './$types';
import { load_SearchQuery } from '$houdini';
import { error } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';

export const prerender = false;

export const load: PageLoad = async (event) => {
	const { url } = event;
	const query = url.searchParams.get('q');

	if (!query) {
		error(StatusCodes.BAD_REQUEST, {
        			message: 'Missing search query',
        		});
	}

	const resp = await load_SearchQuery({ event, variables: { query } });

	return {
		query,
		results: resp.SearchQuery,
	};
};
