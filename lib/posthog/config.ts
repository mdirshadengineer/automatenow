// PostHog runs only when VERCEL_ENV is "production" (server) or
// NEXT_PUBLIC_VERCEL_ENV is "production" (client bundle).
// In Vercel project settings, set NEXT_PUBLIC_VERCEL_ENV=$VERCEL_ENV for all environments.
export function isPostHogEnabled(): boolean {
  if (process.env.VERCEL_ENV === "production") {
    return true;
  }

  return process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
}
