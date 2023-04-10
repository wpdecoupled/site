import crypto from 'node:crypto';

import * as SentryNode from '@sentry/node';
import '@sentry/tracing';

import type { Handle, HandleServerError } from '@sveltejs/kit';

import * as PSV from '$env/static/public';

SentryNode.init({
	dsn: PSV.PUBLIC_DSN,
	environment: PSV?.PUBLIC_SENTRY_ENV || 'development',
	tracesSampleRate: 1.0,
	// Add the Http integration for tracing
	integrations: [new SentryNode.Integrations.Http()],
});

SentryNode.setTag('svelteKit', 'server');

export const handleError: HandleServerError = ({ error, event }) => {
	const errorId = crypto.randomUUID();
	SentryNode.captureException(error, { contexts: { sveltekit: { event, errorId } } });

	return {
		message: error.message,
		errorId,
	};
};

export const handle: Handle = async function ({ event, resolve }) {
	const response = await resolve(event);
	response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

	return response;
};
