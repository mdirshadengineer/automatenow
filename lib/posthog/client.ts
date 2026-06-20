"use client";

import posthog from "posthog-js";
import { isPostHogEnabled } from "@/lib/posthog/config";
import type { AuthFormName, PostHogEventName } from "@/lib/posthog/events";
import { POSTHOG_EVENTS } from "@/lib/posthog/events";

export function captureProductEvent(
  event: PostHogEventName,
  properties?: Record<string, unknown>,
) {
  if (!isPostHogEnabled()) {
    return;
  }

  posthog.capture(event, properties);
}

export function identifyPostHogUser(user: {
  id: string;
  email?: string | null;
  created_at?: string;
  app_metadata?: { provider?: string };
}) {
  if (!isPostHogEnabled()) {
    return;
  }

  posthog.identify(user.id, {
    email: user.email ?? undefined,
    created_at: user.created_at,
    auth_provider: user.app_metadata?.provider,
  });
}

export function resetPostHogUser() {
  if (!isPostHogEnabled()) {
    return;
  }

  posthog.reset();
}

export function captureFormValidationFailed(
  form: AuthFormName,
  fields: string[],
) {
  captureProductEvent(POSTHOG_EVENTS.AUTH_FORM_VALIDATION_FAILED, {
    form,
    fields,
    field_count: fields.length,
  });
}

export function captureTurnstileFailed(form?: AuthFormName) {
  captureProductEvent(POSTHOG_EVENTS.AUTH_TURNSTILE_FAILED, {
    ...(form ? { form } : {}),
  });
}
