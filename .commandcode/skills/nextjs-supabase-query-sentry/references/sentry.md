# Sentry Patterns

## First Checks

- Inspect existing Sentry config and instrumentation before adding files.
- Confirm `@sentry/nextjs` version and use the package docs or installed examples for exact API names.
- Keep instrumentation focused on actionable failures and meaningful spans. Avoid capturing expected validation errors as exceptions.

## What to Capture

Capture unexpected exceptions at server boundaries:

- route handlers
- server actions
- background jobs
- webhooks
- Supabase admin operations
- mutation endpoints

For expected user errors, return typed responses and avoid noisy `captureException` calls. Add breadcrumbs or logs only when they help reconstruct a failure.

## Context

Attach low-cardinality tags and safe context:

```ts
Sentry.captureException(error, {
  tags: {
    surface: "api",
    operation: "workflow.create",
  },
  contexts: {
    workflow: {
      workspaceId,
    },
  },
});
```

Do not attach secrets, access tokens, refresh tokens, raw request bodies with personal data, or service-role keys.

## Error Boundaries

Use Next.js route-level error boundaries for page failures and local error UI for contained panels. When an error boundary reports to Sentry, include route and feature tags if the project pattern supports it.

## Tracing

Use spans for operations where latency matters or where a production issue needs timing context:

- Supabase queries that power key workflows
- route handlers with multiple backend calls
- AI or automation execution steps
- webhook processing

Name spans by operation, not by user data. Add attributes that help group failures without exploding cardinality.
