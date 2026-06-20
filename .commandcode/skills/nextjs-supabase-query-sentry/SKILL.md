---
name: nextjs-supabase-query-sentry
description: Build, review, and debug AutomateNow Next.js features that use Supabase for backend data or auth, TanStack Query for client data fetching and mutations, and Sentry for error monitoring. Use for App Router features, route handlers, server actions, Supabase SSR clients, RLS-aware database access, query key design, optimistic updates, cache invalidation, error boundaries, Sentry capture/instrumentation, or production issue fixes involving these tools.
---

# Next.js Supabase Query Sentry

## Operating Mode

Favor AutomateNow's installed versions and local conventions over memory. For Next.js work, read the relevant files under `node_modules/next/dist/docs/` before changing code because this project uses Next.js 16 canary-era behavior and common examples may be stale.

Start every task by locating:

- `package.json` for exact versions and whether `@tanstack/react-query` is installed.
- `app/`, `lib/supabase/`, `proxy.ts`, and existing provider files.
- `supabase/migrations/`, `database.types.ts`, and any existing RLS policies.
- Sentry config files, instrumentation files, error boundaries, and existing capture patterns.

Use the smallest reference needed:

- Read `references/nextjs-supabase.md` for App Router, Supabase SSR, auth, and server/backend patterns.
- Read `references/tanstack-query.md` for query keys, hooks, mutations, invalidation, and error propagation.
- Read `references/sentry.md` for what to capture, what to tag, and how to avoid noisy instrumentation.

## Workflow

1. Verify local docs and installed versions before coding.
2. Identify the runtime boundary: server component, client component, route handler, server action, edge function, or browser hook.
3. Keep Supabase access server-side by default. Move data fetching to TanStack Query only when client freshness, interactivity, polling, optimistic updates, or cache coordination is valuable.
4. Type Supabase rows and payloads from generated database types when available. Do not edit generated types by hand.
5. Normalize errors at boundaries. Return user-safe messages to the UI and preserve technical context in Sentry.
6. Add loading, empty, success, and error states for user-facing query surfaces.
7. Run `bun run lint` and `bun run typecheck` before handing off code when feasible.

## Design Defaults

- Prefer server components for initial protected data reads.
- Prefer route handlers or server actions for privileged writes, validation, and service-role work.
- Prefer client Supabase only for user-scoped browser behavior such as auth flows or realtime subscriptions that truly need browser state.
- Prefer TanStack Query hooks for client-owned async state, not for static server-rendered content.
- Prefer query keys shaped like domain arrays: `["workflows", workspaceId, filters]`.
- Prefer Sentry spans, tags, and structured context over broad `captureException` calls with no metadata.

## Hard Rules

- Never expose Supabase service-role keys to client bundles.
- Never bypass RLS for user-scoped product paths unless there is a documented server-only administrative reason.
- Never call `supabase.auth.getSession()` as the authority for protected server data when the safer project pattern uses verified user retrieval.
- Never swallow mutation or route handler errors without logging, capture, or a typed user response.
- Never edit `components/ui/` shadcn files or generated Supabase types by hand.
