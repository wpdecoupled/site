import { PUBLIC_WP_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from './$types';

export const GET = (async ({ url }) => {
	const sitemap_url = PUBLIC_WP_URL + url.pathname + url.search
	const resp = await fetch(sitemap_url);

	if (!resp.ok) {
		console.error('Error fetching', sitemap_url, resp.status);
		error(resp.status);
	}

	return new Response(resp.body, {
		status: StatusCodes.OK,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/xml' },
	});
}) satisfies RequestHandler;
