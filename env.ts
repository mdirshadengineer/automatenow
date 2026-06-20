import { createEnv } from "@t3-oss/env-nextjs";
import { type } from "arktype";

export const env = createEnv({
  server: {
    TURNSTILE_SECRET_KEY: type("string > 0"),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: type("string.url"),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: type("string > 0"),
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: type("string > 0"),
    NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: type("string > 0"),
    NEXT_PUBLIC_POSTHOG_HOST: type("string.url"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN:
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  },
});
