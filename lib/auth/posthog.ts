import { isAuthError } from "@supabase/supabase-js";
import type { AuthFlow } from "@/lib/auth/sentry";
import { captureServerEvent } from "@/lib/posthog/server";

export async function captureAuthRouteEvent(
  distinctId: string,
  flow: AuthFlow,
  outcome: "success" | "failure",
  extra?: Record<string, unknown>,
) {
  await captureServerEvent(distinctId, `auth_route_${flow}_${outcome}`, {
    flow,
    outcome,
    ...extra,
  });
}

export function getAuthDistinctId(
  userId?: string | null,
  email?: string | null,
): string {
  if (userId) {
    return userId;
  }

  if (email) {
    return email;
  }

  return "anonymous";
}

export function getAuthErrorCode(error: unknown): string | undefined {
  if (isAuthError(error)) {
    return error.code ?? undefined;
  }

  return undefined;
}
