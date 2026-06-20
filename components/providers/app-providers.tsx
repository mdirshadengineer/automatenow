"use client";

import { HotkeysProvider } from "@tanstack/react-hotkeys";
import { QueryClientProvider } from "@tanstack/react-query";
import { TanStackDevtoolsPanel } from "@/components/devtools/tanstack-devtools";
import { AuthQuerySync } from "@/components/providers/auth-query-sync";
import { PostHogAuthSync } from "@/components/providers/posthog-auth-sync";
import { getQueryClient } from "@/lib/query-client";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HotkeysProvider defaultOptions={{ hotkey: { ignoreInputs: true } }}>
        <AuthQuerySync />
        <PostHogAuthSync />
        {children}
        <TanStackDevtoolsPanel />
      </HotkeysProvider>
    </QueryClientProvider>
  );
}
