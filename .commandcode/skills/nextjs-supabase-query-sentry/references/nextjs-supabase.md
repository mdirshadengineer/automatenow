# Next.js and Supabase Patterns

## First Checks

- Read the relevant local Next.js docs in `node_modules/next/dist/docs/` before implementing App Router APIs.
- Inspect `lib/supabase/server.ts`, `lib/supabase/client.ts`, and `proxy.ts` before creating new helpers.
- Inspect `database.types.ts` and `supabase/migrations/` before writing queries.
- If the task changes schema or RLS, use Supabase migrations and run Supabase advisors when an MCP project is available.

## Runtime Placement

Use server components for initial reads when the data can render with the page and does not require client refresh controls. Use client components with TanStack Query when the user needs refetching, optimistic updates, live filters, polling, or interactive mutation state.

Use route handlers or server actions for writes that need validation, auth checks, Sentry capture, or secrets. Keep service-role access server-only and isolate it in named helpers with narrow use.

Use browser Supabase clients for user-scoped browser capabilities only: auth UI, realtime subscriptions, storage uploads from the browser, or interactive workflows where the browser must initiate the request.

## Auth and RLS

- Verify the user on the server before protected reads and writes.
- Treat RLS as the primary tenant isolation layer; mirror tenant checks in application code for clearer errors, not as a replacement.
- Keep policies small and explicit. Avoid broad `using (true)` policies unless the table is truly public.
- For multi-tenant tables, include workspace or organization IDs in both schema design and query filters.

## Data Access

Prefer typed query helpers near the domain that owns the data. Return plain typed values or discriminated results from server helpers, not raw Supabase response objects across UI boundaries.

When calling Supabase:

```ts
const { data, error } = await supabase
  .from("workflows")
  .select("id,name,status,updated_at")
  .eq("workspace_id", workspaceId)
  .order("updated_at", { ascending: false });

if (error) {
  throw new Error("Failed to load workflows", { cause: error });
}
```

Keep selected columns intentional. Avoid `select("*")` for large or user-facing lists unless the table is small and stable.

## Route Handler Shape

Route handlers should validate input, verify auth, call a domain helper, capture unexpected errors with Sentry, and return stable JSON. Avoid leaking database error text directly to users.

```ts
import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const input = await request.json();
    // validate input and user, then perform the write
    return NextResponse.json({ ok: true });
  } catch (error) {
    Sentry.captureException(error, {
      tags: { surface: "api", operation: "workflow.create" },
    });
    return NextResponse.json(
      { error: "Unable to create workflow" },
      { status: 500 },
    );
  }
}
```

## Schema Changes

For schema work, create a migration, update generated types through the repo's normal command, and check for RLS coverage. Do not hand-edit generated database types.
