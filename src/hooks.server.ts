import * as Sentry from '@sentry/sveltekit';
import { partytownSnippet } from '@builder.io/partytown/integration';

import type { Handle, HandleServerError } from '@sveltejs/kit';

import { PUBLIC_SENTRY_DSN, PUBLIC_SENTRY_ENV } from '$env/static/public';

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
	environment: PUBLIC_SENTRY_ENV || 'development',
	tracesSampleRate: 0.1,
});

Sentry.setTag('svelteKit', 'server');

const myErrorHandler: HandleServerError = ({ error, event }) => {
	console.error('An error occurred on the server side:', error, event);
};

export const handleError = Sentry.handleErrorWithSentry(myErrorHandler);

export const handle: Handle = async function ({ event, resolve }) {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%partytown.script%', `<script>${partytownSnippet()}</script>`),
		preload: ({ type }) => type === 'js' || type === 'css' || type === 'font',
	});

	response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

	return response;
};
