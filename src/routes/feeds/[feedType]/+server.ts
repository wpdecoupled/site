import { createHash } from 'node:crypto';
import { Temporal } from '@js-temporal/polyfill';
import { StatusCodes } from 'http-status-codes';

import { error } from '@sveltejs/kit';

import { createFeed } from '$lib/feed';
import { ArticleFeedQueryStore } from '$houdini';

import type { RequestHandler } from './$types';

type ResponseData = {
	content_type: string;
	body: string;
};

const feedStore = new ArticleFeedQueryStore();

export const GET = (async (event) => {
	const { params, setHeaders, request: req, url } = event;

	// Get needed Reqest info
	const if_modified_since = req.headers.get('if-modified-since');
	const if_none_match = req.headers.get('if-none-match');
	const { feedType } = params;
	const site_url = url.origin;

	//Fetch content from WP
	const { data: feed_data } = await feedStore.fetch({ event });

	const last_modified = Temporal.PlainDateTime.from(
		feed_data?.last_modified?.nodes[0].modifiedGmt ?? '',
		{
			overflow: 'constrain',
		}
	);

	//Create feed
	if (!feed_data) {
		throw error(StatusCodes.INTERNAL_SERVER_ERROR, {
			message: 'Failed to fetch feed data',
			errorId: 'feed-fetch-failed',
		});
	}
	const feed = createFeed({ feed_data, last_modified, site_url });

	// Generate Response Body and Content-Type
	let resp: ResponseData;

	switch (feedType) {
		case 'feed.json':
			resp = {
				content_type: 'application/feed+json',
				body: feed.json1(),
			};
			break;
		case 'feed.atom':
			resp = {
				content_type: 'application/atom+xml',
				body: feed.atom1(),
			};
			break;
		case 'rss.xml':
			resp = {
				content_type: 'application/rss+xml',
				body: feed.rss2(),
			};
			break;
		default:
			throw error(StatusCodes.NOT_FOUND);
	}

	// Spec specifies hash bieng in quotes
	const etag_for_body = `"${createHash('md5').update(resp.body).digest('hex')}"`;

	// Set Response Headers
	setHeaders({
		Vary: 'if-modified-since, if-none-match',
		'Cache-Control': 'max-age=0, must-revalidate, stale-if-error=86400',
		'Content-Type': resp.content_type,
		ETag: etag_for_body,
		'Last-Modified': last_modified.toString(),
	});

	if (
		// Checks if the `if_none_match` header matches current response's etag
		if_none_match === etag_for_body ||
		// Checks `if_modified_since` is after `last_modified`
		(if_modified_since && Temporal.PlainDateTime.compare(last_modified, if_modified_since) < 0)
	) {
		return new Response(null, { status: StatusCodes.NOT_MODIFIED });
	} else {
		return new Response(resp.body, { status: StatusCodes.OK });
	}
}) satisfies RequestHandler;
