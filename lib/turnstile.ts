import * as Sentry from "@sentry/nextjs";
import { env } from "@/env";

type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export type TurnstileVerifyResult = {
  success: boolean;
  errorCodes?: string[];
};

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<TurnstileVerifyResult> {
  const body: Record<string, string> = {
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  };

  if (remoteIp) {
    body.remoteip = remoteIp;
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );

  const data = (await response.json()) as TurnstileVerifyResponse;

  if (!data.success) {
    Sentry.captureMessage("Turnstile verification failed", {
      level: "warning",
      extra: { errorCodes: data["error-codes"], remoteIp },
    });
  }

  return {
    success: data.success,
    errorCodes: data["error-codes"],
  };
}
