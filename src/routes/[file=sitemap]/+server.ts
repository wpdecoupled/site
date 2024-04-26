import { PUBLIC_WP_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from './$types';

export const GET = (async ({ url }) => {
	const resp = await fetch(PUBLIC_WP_URL + url.pathname + url.search);

	if (!resp.ok) {
		console.error('Error fetching', url.pathname, resp.status);
		error(resp.status);
	}

	return new Response(await resp.text(), {
		status: StatusCodes.OK,
		headers: { 'Content-Type': 'application/xml' },
	});
}) satisfies RequestHandler;
