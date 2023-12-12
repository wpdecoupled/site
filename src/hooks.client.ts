import * as SentrySvelte from '@sentry/svelte';

import type { HandleClientError } from '@sveltejs/kit';

import { PUBLIC_SENTRY_DSN, PUBLIC_SENTRY_ENV } from '$env/static/public';

SentrySvelte.init({
	dsn: PUBLIC_SENTRY_DSN,
	environment: PUBLIC_SENTRY_ENV || 'development',
	integrations: [new SentrySvelte.BrowserTracing(), new SentrySvelte.Replay()],
	tracesSampleRate: 1.0,
	// This sets the sample rate at 10%. You may want to change it to 100% while in development
  // and then sample at a lower rate in production:
  replaysSessionSampleRate: 0.1,
  // If you're not already sampling the entire session, change the sample rate to 100% when
  // sampling sessions where errors occur:
  replaysOnErrorSampleRate: 1.0,
});

SentrySvelte.setTag('svelteKit', 'browser');

// This will catch errors in load functions from +page.ts files
export const handleError: HandleClientError = ({ error, event }) => {
	const errorId = crypto.randomUUID();
	SentrySvelte.captureException(error, {
		contexts: { sveltekit: { event, errorId } },
	});

	return {
		message: error.message,
		errorId,
	};
};
