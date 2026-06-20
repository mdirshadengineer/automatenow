import { isAuthError } from "@supabase/supabase-js";
import { type } from "arktype";
import { type NextRequest, NextResponse } from "next/server";
import {
  authErrorResponse,
  authSuccessResponse,
  parseTurnstileToken,
  verifyRequestTurnstile,
} from "@/lib/auth/api-route";
import { getRequestOrigin } from "@/lib/auth/redirect";
import { signupSchema } from "@/lib/validation";

const DUPLICATE_SIGNUP_CODES = new Set(["email_exists"]);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const turnstileFailure = await verifyRequestTurnstile(
    request,
    parseTurnstileToken(body),
  );

  if (turnstileFailure) {
    return turnstileFailure;
  }

  const parsed = signupSchema({
    email: body.email,
    password: body.password,
  });

  if (parsed instanceof type.errors) {
    return NextResponse.json(
      { code: "validation_error", message: "Invalid signup details." },
      { status: 400 },
    );
  }

  const { response, supabase } = authSuccessResponse(request);
  const requestOrigin = getRequestOrigin(request);
  const { data, error } = await supabase.auth.signUp({
    email: parsed.email,
    password: parsed.password,
    options: {
      emailRedirectTo: `${requestOrigin}/confirm?next=/`,
    },
  });

  if (error) {
    if (isAuthError(error) && DUPLICATE_SIGNUP_CODES.has(error.code ?? "")) {
      return response;
    }

    return authErrorResponse(error, "sign_up");
  }

  if (data.user?.identities?.length === 0) {
    return response;
  }

  return response;
}
