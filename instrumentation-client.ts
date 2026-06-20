// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";
import { env } from "@/env";
import { isPostHogEnabled } from "@/lib/posthog/config";

if (isPostHogEnabled()) {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    defaults: "2026-01-30",
    person_profiles: "identified_only",
  });

  posthog.register({
    environment: process.env.NODE_ENV,
    ...(process.env.NEXT_PUBLIC_APP_VERSION
      ? { app_version: process.env.NEXT_PUBLIC_APP_VERSION }
      : {}),
  });
}

Sentry.init({
  dsn: "https://2b365b55cce198b3fe065c67c437dbbf@o4508642775990272.ingest.de.sentry.io/4511582329372752",

  // Add optional integrations for additional features
  integrations: [
    Sentry.replayIntegration(),
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
