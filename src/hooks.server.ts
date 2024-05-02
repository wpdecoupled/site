import * as Sentry from '@sentry/sveltekit';

import type { Handle, HandleServerError } from '@sveltejs/kit';

import { PUBLIC_SENTRY_DSN, PUBLIC_SENTRY_ENV } from '$env/static/public';

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
	environment: PUBLIC_SENTRY_ENV || 'development',
	tracesSampleRate: 1.0,
});

Sentry.setTag('svelteKit', 'server');

const myErrorHandler: HandleServerError = ({ error, event }) => {
  console.error("An error occurred on the server side:", error, event);
};


export const handleError = Sentry.handleErrorWithSentry(myErrorHandler);

export const handle: Handle = async function ({ event, resolve }) {
	const response = await resolve(event, {
		preload: ({
			type, path
		}) => {
			if (type == 'font') return false;

			switch (path) {
				case '/fonts/BungeeShade-RegularSubset.woff2':
				case '/fonts/Lora-Regular.woff2':
				case '/fonts/Lora-Bold.woff2':
					return true;
				default:
					return false;
			}

		}
	});
	response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

	return response;
};
