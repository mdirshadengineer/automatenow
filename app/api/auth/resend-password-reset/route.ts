import { type } from "arktype";
import { type NextRequest, NextResponse } from "next/server";
import {
  authErrorResponse,
  authSuccessResponse,
  parseTurnstileToken,
  verifyRequestTurnstile,
} from "@/lib/auth/api-route";
import { captureAuthRouteEvent, getAuthDistinctId } from "@/lib/auth/posthog";
import { getRequestOrigin } from "@/lib/auth/redirect";
import { forgotPasswordSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const turnstileFailure = await verifyRequestTurnstile(
    request,
    parseTurnstileToken(body),
  );

  if (turnstileFailure) {
    return turnstileFailure;
  }

  const parsed = forgotPasswordSchema({
    email: body.email,
  });

  if (parsed instanceof type.errors) {
    return NextResponse.json(
      { code: "validation_error", message: "Invalid email address." },
      { status: 400 },
    );
  }

  const { response, supabase } = authSuccessResponse(request);
  const requestOrigin = getRequestOrigin(request);
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.email, {
    redirectTo: `${requestOrigin}/confirm?next=/update-password`,
  });

  if (error) {
    return authErrorResponse(error, "resend_password_reset", {
      distinctId: getAuthDistinctId(null, parsed.email),
    });
  }

  await captureAuthRouteEvent(
    getAuthDistinctId(null, parsed.email),
    "resend_password_reset",
    "success",
  );

  return response;
}
