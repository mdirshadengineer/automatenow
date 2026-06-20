import { type } from "arktype";
import { type NextRequest, NextResponse } from "next/server";
import {
  authErrorResponse,
  authSuccessResponse,
  parseTurnstileToken,
  verifyRequestTurnstile,
} from "@/lib/auth/api-route";
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
  const { error } = await supabase.auth.resend({
    type: "signup",
    email: parsed.email,
    options: {
      emailRedirectTo: `${requestOrigin}/confirm?next=/`,
    },
  });

  if (error) {
    return authErrorResponse(error, "resend_confirmation");
  }

  return response;
}
