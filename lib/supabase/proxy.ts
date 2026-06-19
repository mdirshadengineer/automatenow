import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "@/database.types";
import { env } from "@/env";

const authPaths = [
  "/login",
  "/signup",
  "/forgot-password",
  "/update-password",
  "/sign-up-success",
  "/error",
  "/confirm",
  "/auth/callback",
];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }

          supabaseResponse = NextResponse.next({
            request,
          });

          for (const { name, value, options } of cookiesToSet) {
            supabaseResponse.cookies.set(name, value, options);
          }

          for (const [key, value] of Object.entries(headers)) {
            supabaseResponse.headers.set(key, value);
          }
        },
      },
    },
  );

  // IMPORTANT: Do not run code between createServerClient and
  // supabase.auth.getClaims().
  const { data: claimsData } = await supabase.auth.getClaims();

  const { pathname } = request.nextUrl;

  const isAuthPage = authPaths.some((path) => pathname.startsWith(path));
  const isApiRoute = pathname.startsWith("/api");
  const isPublicAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/sentry-example-page");

  if (
    !claimsData?.claims?.sub &&
    !isAuthPage &&
    !isApiRoute &&
    !isPublicAsset
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (claimsData?.claims?.sub && isAuthPage) {
    const sessionAllowedAuthPaths = [
      "/update-password",
      "/confirm",
      "/auth/callback",
    ];
    const allowsSession = sessionAllowedAuthPaths.some((path) =>
      pathname.startsWith(path),
    );

    if (!allowsSession) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
