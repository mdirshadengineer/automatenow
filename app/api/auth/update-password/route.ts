import { type } from "arktype";
import { type NextRequest, NextResponse } from "next/server";
import {
  authErrorResponse,
  authSuccessResponse,
  parseTurnstileToken,
  verifyRequestTurnstile,
} from "@/lib/auth/api-route";
import { captureAuthRouteEvent, getAuthDistinctId } from "@/lib/auth/posthog";
import { updatePasswordSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const turnstileFailure = await verifyRequestTurnstile(
    request,
    parseTurnstileToken(body),
  );

  if (turnstileFailure) {
    return turnstileFailure;
  }

  const parsed = updatePasswordSchema({
    password: body.password,
  });

  if (parsed instanceof type.errors) {
    return NextResponse.json(
      { code: "validation_error", message: "Invalid password." },
      { status: 400 },
    );
  }

  const { response, supabase } = authSuccessResponse(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase.auth.updateUser({
    password: parsed.password,
  });

  if (error) {
    return authErrorResponse(error, "update_password", {
      distinctId: getAuthDistinctId(user?.id),
    });
  }

  await captureAuthRouteEvent(
    getAuthDistinctId(user?.id),
    "update_password",
    "success",
  );

  return response;
}
