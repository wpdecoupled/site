import * as Sentry from '@sentry/sveltekit';

import type { HandleClientError } from '@sveltejs/kit';

import { PUBLIC_SENTRY_DSN, PUBLIC_SENTRY_ENV } from '$env/static/public';

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
	environment: PUBLIC_SENTRY_ENV || 'development',
	integrations: [],
	tracesSampleRate: 0.1,
	// This sets the sample rate at 10%. You may want to change it to 100% while in development
	// and then sample at a lower rate in production:
});

Sentry.setTag('svelteKit', 'browser');

const myErrorHandler: HandleClientError = ({ error, event }) => {
	console.error('An error occurred on the client side:', error, event);
};

export const handleError = Sentry.handleErrorWithSentry(myErrorHandler);
