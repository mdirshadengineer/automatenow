import * as Sentry from "@sentry/nextjs";
import { isAuthError } from "@supabase/supabase-js";

export type AuthFlow =
  | "pkce_callback"
  | "otp_confirm"
  | "password_reset"
  | "signup_confirm"
  | "sign_in"
  | "sign_out"
  | "sign_up"
  | "forgot_password"
  | "update_password"
  | "resend_confirmation"
  | "resend_password_reset";

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
