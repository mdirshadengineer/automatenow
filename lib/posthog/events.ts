export const POSTHOG_EVENTS = {
  AUTH_SIGNED_IN: "auth_signed_in",
  AUTH_SIGNED_UP: "auth_signed_up",
  AUTH_SIGNED_OUT: "auth_signed_out",
  AUTH_PASSWORD_UPDATED: "auth_password_updated",
  AUTH_PASSWORD_RESET_REQUESTED: "auth_password_reset_requested",
  AUTH_CONFIRMATION_RESENT: "auth_confirmation_resent",
  AUTH_EMAIL_CONFIRMED: "auth_email_confirmed",
  AUTH_FORM_VALIDATION_FAILED: "form_validation_failed",
  AUTH_TURNSTILE_FAILED: "turnstile_failed",
  LANDING_CTA_CLICKED: "landing_cta_clicked",
  LANDING_FEATURES_VIEWED: "landing_features_viewed",
  LANDING_NAV_CLICKED: "landing_nav_clicked",
} as const;

export type PostHogEventName =
  (typeof POSTHOG_EVENTS)[keyof typeof POSTHOG_EVENTS];

export type AuthFormName =
  | "login"
  | "signup"
  | "forgot_password"
  | "update_password";
