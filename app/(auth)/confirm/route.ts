import { createServerClient } from "@supabase/ssr";
import type { EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "@/database.types";
import { env } from "@/env";
import { getRequestOrigin, getSafeRedirectPath } from "@/lib/auth/redirect";
import {
  captureAuthRouteError,
  captureAuthRouteWarning,
} from "@/lib/auth/sentry";

function createAuthRouteClient(request: NextRequest, response: NextResponse) {
  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
          for (const [key, value] of Object.entries(headers)) {
            response.headers.set(key, value);
          }
        },
      },
    },
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const authError = searchParams.get("error");
  const next = getSafeRedirectPath(
    searchParams.get("next"),
    type === "recovery" ? "/update-password" : "/",
  );
  const requestOrigin = getRequestOrigin(request);

  if (authError) {
    captureAuthRouteWarning(
      "Confirm route received auth error",
      "otp_confirm",
      {
        authError,
        errorCode: searchParams.get("error_code"),
        next,
      },
    );

    return NextResponse.redirect(
      `${requestOrigin}/error?error=auth_confirm_error`,
    );
  }

  const hasCodeFlow = Boolean(code);
  const hasOtpFlow = Boolean(token_hash && type);

  if (!hasCodeFlow && !hasOtpFlow) {
    captureAuthRouteWarning(
      "Confirm route missing code or token_hash/type",
      type === "recovery" ? "password_reset" : "otp_confirm",
      { type, hasTokenHash: Boolean(token_hash), hasCode: Boolean(code) },
    );

    return NextResponse.redirect(
      `${requestOrigin}/error?error=auth_confirm_missing_params`,
    );
  }

  const response = NextResponse.redirect(`${requestOrigin}${next}`);
  const supabase = createAuthRouteClient(request, response);

  const { error } = hasCodeFlow
    ? await supabase.auth.exchangeCodeForSession(code as string)
    : await supabase.auth.verifyOtp({
        type: type as EmailOtpType,
        token_hash: token_hash as string,
      });

  if (error) {
    captureAuthRouteError(
      error,
      hasCodeFlow
        ? "pkce_callback"
        : type === "recovery"
          ? "password_reset"
          : "otp_confirm",
      { type, next, flow: hasCodeFlow ? "code" : "otp" },
    );

    return NextResponse.redirect(
      `${requestOrigin}/error?error=auth_confirm_error`,
    );
  }

  return response;
}
