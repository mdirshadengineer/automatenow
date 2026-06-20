import { createServerClient } from "@supabase/ssr";
import { isAuthError } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "@/database.types";
import { env } from "@/env";
import { captureAuthRouteEvent, getAuthErrorCode } from "@/lib/auth/posthog";
import type { AuthFlow } from "@/lib/auth/sentry";
import { captureAuthRouteError } from "@/lib/auth/sentry";
import { verifyTurnstileToken } from "@/lib/turnstile";

export function createAuthRouteClient(
  request: NextRequest,
  response: NextResponse,
) {
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

export function getClientIp(request: NextRequest): string | undefined {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
}

export async function verifyRequestTurnstile(
  request: NextRequest,
  token: string | undefined,
): Promise<NextResponse | null> {
  if (!token) {
    return captchaFailedResponse();
  }

  const result = await verifyTurnstileToken(token, getClientIp(request));

  if (!result.success) {
    return captchaFailedResponse();
  }

  return null;
}

export function captchaFailedResponse() {
  return NextResponse.json(
    {
      code: "captcha_failed",
      message:
        "Verification failed. Please complete the security check and try again.",
    },
    { status: 403 },
  );
}

export function authSuccessResponse(request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  return { response, supabase: createAuthRouteClient(request, response) };
}

export async function authErrorResponse(
  error: unknown,
  flow: AuthFlow,
  options?: {
    distinctId?: string;
    extra?: Record<string, unknown>;
  },
) {
  captureAuthRouteError(error, flow, options?.extra);

  await captureAuthRouteEvent(
    options?.distinctId ?? "anonymous",
    flow,
    "failure",
    {
      error_code: getAuthErrorCode(error),
      ...options?.extra,
    },
  );

  if (isAuthError(error)) {
    return NextResponse.json(
      {
        code: error.code ?? "unknown",
        message: error.message,
      },
      { status: error.status ?? 400 },
    );
  }

  return NextResponse.json(
    {
      code: "unknown",
      message: "Something went wrong. Please try again.",
    },
    { status: 500 },
  );
}

export function parseTurnstileToken(body: unknown): string | undefined {
  if (typeof body !== "object" || body === null) {
    return undefined;
  }

  const token = (body as { turnstileToken?: unknown }).turnstileToken;
  return typeof token === "string" && token.length > 0 ? token : undefined;
}
