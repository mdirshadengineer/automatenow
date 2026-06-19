import * as Sentry from "@sentry/nextjs";
import { isAuthError } from "@supabase/supabase-js";

type AuthFlow =
  | "pkce_callback"
  | "otp_confirm"
  | "password_reset"
  | "signup_confirm";

export function captureAuthRouteError(
  error: unknown,
  flow: AuthFlow,
  extra?: Record<string, unknown>,
) {
  Sentry.captureException(error, {
    tags: { auth_flow: flow },
    extra: {
      ...extra,
      ...(isAuthError(error)
        ? { authErrorCode: error.code, authErrorStatus: error.status }
        : {}),
    },
  });
}

export function captureAuthRouteWarning(
  message: string,
  flow: AuthFlow,
  extra?: Record<string, unknown>,
) {
  Sentry.captureMessage(message, {
    level: "warning",
    tags: { auth_flow: flow },
    extra,
  });
}
