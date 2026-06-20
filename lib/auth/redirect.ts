import type { NextRequest } from "next/server";

export function getSafeRedirectPath(
  next: string | null,
  fallback = "/",
): string {
  if (!next?.startsWith("/") || next.startsWith("//")) {
    return fallback;
  }

  return next;
}

export function getRequestOrigin(request: NextRequest): string {
  const { origin } = new URL(request.url);
  const forwardedHost = request.headers
    .get("x-forwarded-host")
    ?.split(",")[0]
    ?.trim();
  const forwardedProto =
    request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ?? "https";

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return origin;
}
