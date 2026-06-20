import { PostHog } from "posthog-node";
import { env } from "@/env";
import { isPostHogEnabled } from "@/lib/posthog/config";

export function createPostHogServer() {
  return new PostHog(env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, {
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
}

export async function captureServerEvent(
  distinctId: string,
  event: string,
  properties?: Record<string, unknown>,
) {
  if (!isPostHogEnabled()) {
    return;
  }

  const posthog = createPostHogServer();
  posthog.capture({ distinctId, event, properties });
  await posthog.shutdown();
}
