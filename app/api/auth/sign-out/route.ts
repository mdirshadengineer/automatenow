import type { NextRequest } from "next/server";
import {
  authErrorResponse,
  authSuccessResponse,
} from "@/lib/auth/api-route";
import { captureAuthRouteEvent, getAuthDistinctId } from "@/lib/auth/posthog";

export async function POST(request: NextRequest) {
  const { response, supabase } = authSuccessResponse(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase.auth.signOut({ scope: "local" });

  if (error) {
    return authErrorResponse(error, "sign_out", {
      distinctId: getAuthDistinctId(user?.id, user?.email),
    });
  }

  await captureAuthRouteEvent(
    getAuthDistinctId(user?.id, user?.email),
    "sign_out",
    "success",
  );

  return response;
}
