import { isAuthError } from "@supabase/supabase-js";

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  email_not_confirmed:
    "Your email hasn't been confirmed yet. Check your inbox (and spam) for the confirmation link, then try signing in again.",
  invalid_credentials: "Incorrect email or password. Please try again.",
  email_exists:
    "An account with this email already exists. Try signing in instead.",
  user_banned:
    "This account has been disabled. Contact support if you need help.",
  over_email_send_rate_limit:
    "Too many emails have been sent to this address. Wait a few minutes, then check your inbox (and spam) for an earlier confirmation link before requesting another.",
  signup_disabled: "New signups are currently disabled.",
  session_not_found:
    "Your password reset link has expired or is invalid. Request a new reset link and try again.",
  same_password: "Choose a different password than your current one.",
  weak_password: "Password is too weak. Use a stronger password and try again.",
  captcha_failed:
    "Verification failed. Please complete the security check and try again.",
};

const EXPECTED_AUTH_ERROR_CODES = new Set([
  "email_not_confirmed",
  "invalid_credentials",
  "email_exists",
  "user_banned",
  "over_email_send_rate_limit",
  "signup_disabled",
  "session_not_found",
  "same_password",
  "weak_password",
  "captcha_failed",
]);

const FALLBACK_MESSAGE = "Something went wrong. Please try again.";

export function isExpectedAuthError(error: unknown): boolean {
  return (
    isAuthError(error) &&
    typeof error.code === "string" &&
    EXPECTED_AUTH_ERROR_CODES.has(error.code)
  );
}

export function getAuthErrorMessage(error: unknown): string {
  if (isAuthError(error) && error.code && AUTH_ERROR_MESSAGES[error.code]) {
    return AUTH_ERROR_MESSAGES[error.code];
  }

  return FALLBACK_MESSAGE;
}

export function isEmailNotConfirmedError(error: unknown): boolean {
  return isAuthError(error) && error.code === "email_not_confirmed";
}

export function isEmailRateLimitError(error: unknown): boolean {
  return isAuthError(error) && error.code === "over_email_send_rate_limit";
}

export const RESEND_CONFIRMATION_COOLDOWN_SECONDS = 60;
