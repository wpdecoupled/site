import crypto from "node:crypto";

import * as SentrySvelte from "@sentry/svelte";

import type { HandleClientError } from "@sveltejs/kit";

import { PUBLIC_SENTRY_DSN, PUBLIC_SENTRY_ENV } from "$env/static/public";

SentrySvelte.init({
  dsn: PUBLIC_SENTRY_DSN,
  environment: PUBLIC_SENTRY_ENV || "development",
  integrations: [new SentrySvelte.BrowserTracing()],
  tracesSampleRate: 1.0,
});

SentrySvelte.setTag("svelteKit", "browser");

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
