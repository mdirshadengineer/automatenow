# TanStack Query Patterns

## First Checks

- Confirm `@tanstack/react-query` is installed and identify the major version from `package.json`.
- Locate an existing `QueryClientProvider` before adding one. In Next.js App Router, providers belong in a client component imported by the root layout or the nearest route segment that needs queries.
- Prefer official local or package docs when available because options and defaults differ across major versions.

## Query Boundaries

Use TanStack Query for client-owned async state:

- filterable or refreshable lists
- mutation flows with pending and optimistic states
- dashboard widgets with independent loading states
- realtime or polling surfaces
- cache coordination across components

Do not replace simple server-rendered reads with query hooks when there is no client interaction benefit.

## Query Keys

Use stable array keys from broad to narrow:

```ts
export const workflowKeys = {
  all: ["workflows"] as const,
  list: (workspaceId: string, filters: WorkflowFilters) =>
    [...workflowKeys.all, "list", workspaceId, filters] as const,
  detail: (workflowId: string) =>
    [...workflowKeys.all, "detail", workflowId] as const,
};
```

Keep objects in keys serializable and stable. Normalize search params and filters before using them in keys.

## Fetchers

Fetchers should throw on non-OK responses so query error states and Sentry integrations can observe failures.

```ts
async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }
  return response.json() as Promise<T>;
}
```

For Supabase-backed client queries, prefer calling a typed route handler when the request needs server validation, cross-table composition, hidden fields, or Sentry context. Direct browser Supabase queries are acceptable for simple user-scoped reads protected by RLS.

## Mutations

Make mutation functions small and typed. On success, invalidate or update the exact query keys affected. Use optimistic updates only when rollback behavior is obvious and the UI benefit is meaningful.

```ts
const queryClient = useQueryClient();

const createWorkflow = useMutation({
  mutationFn: (input: CreateWorkflowInput) =>
    fetchJson<Workflow>("/api/workflows", {
      method: "POST",
      body: JSON.stringify(input),
    }),
  onSuccess: (workflow) => {
    queryClient.invalidateQueries({
      queryKey: workflowKeys.list(workflow.workspaceId, {}),
    });
  },
});
```

## UI States

Every query surface should handle loading, error, empty, and success states. Mutations should disable duplicate submits, show pending state, and provide a user-safe error message.

Use error boundaries or reset boundaries for complex pages. For small panels, render local error UI with a retry control.
