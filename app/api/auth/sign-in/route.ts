import { type } from "arktype";
import { type NextRequest, NextResponse } from "next/server";
import {
  authErrorResponse,
  authSuccessResponse,
  parseTurnstileToken,
  verifyRequestTurnstile,
} from "@/lib/auth/api-route";
import { captureAuthRouteEvent, getAuthDistinctId } from "@/lib/auth/posthog";
import { loginSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const turnstileFailure = await verifyRequestTurnstile(
    request,
    parseTurnstileToken(body),
  );

  if (turnstileFailure) {
    return turnstileFailure;
  }

  const parsed = loginSchema({
    email: body.email,
    password: body.password,
  });

  if (parsed instanceof type.errors) {
    return NextResponse.json(
      { code: "validation_error", message: "Invalid email or password." },
      { status: 400 },
    );
  }

  const { response, supabase } = authSuccessResponse(request);
  const { data, error } = await supabase.auth.signInWithPassword(parsed);

  if (error) {
    return authErrorResponse(error, "sign_in", {
      distinctId: getAuthDistinctId(null, parsed.email),
    });
  }

  await captureAuthRouteEvent(
    getAuthDistinctId(data.user?.id, parsed.email),
    "sign_in",
    "success",
  );

  return response;
}
