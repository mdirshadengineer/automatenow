import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "@/database.types";
import { env } from "@/env";
import { getRequestOrigin, getSafeRedirectPath } from "@/lib/auth/redirect";
import {
  captureAuthRouteError,
  captureAuthRouteWarning,
} from "@/lib/auth/sentry";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = getSafeRedirectPath(searchParams.get("next"));
  const requestOrigin = getRequestOrigin(request);

  if (!code) {
    captureAuthRouteWarning(
      "Auth callback missing code parameter",
      "pkce_callback",
      {
        next,
      },
    );

    return NextResponse.redirect(
      `${requestOrigin}/error?error=auth_callback_missing_code`,
    );
  }

  const response = NextResponse.redirect(`${requestOrigin}${next}`);

  const supabase = createServerClient<Database>(
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

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    captureAuthRouteError(error, "pkce_callback", { next });

    return NextResponse.redirect(
      `${requestOrigin}/error?error=auth_callback_error`,
    );
  }

  return response;
}
