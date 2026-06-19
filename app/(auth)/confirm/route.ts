import type { EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { getSafeRedirectPath } from "@/lib/auth/redirect";
import {
  captureAuthRouteError,
  captureAuthRouteWarning,
} from "@/lib/auth/sentry";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = getSafeRedirectPath(
    searchParams.get("next"),
    type === "recovery" ? "/update-password" : "/",
  );

  if (!token_hash || !type) {
    captureAuthRouteWarning(
      "Confirm route missing token_hash or type",
      type === "recovery" ? "password_reset" : "otp_confirm",
      { type, hasTokenHash: Boolean(token_hash) },
    );

    redirect("/error?error=auth_confirm_missing_params");
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash,
  });

  if (error) {
    captureAuthRouteError(
      error,
      type === "recovery" ? "password_reset" : "otp_confirm",
      { type, next },
    );

    redirect("/error?error=auth_confirm_error");
  }

  redirect(next);
}
