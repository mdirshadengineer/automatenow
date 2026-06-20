<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Overview

**AutomateNow** — an early-stage automation and workflow platform. AI-powered workflows, no-code automation, and a visual builder.

- **Stack:** Next.js 16 (canary), React 19, shadcn/ui (Radix Nova), Tailwind CSS v4, TypeScript (strict), Biome v2, Bun
- **Integrations:** Supabase (auth + DB), Sentry (error monitoring), Vercel (deployment)
- **Design:** Warm gold/honey amber primary, Source Sans 3 + Geist Mono, dark/light mode via next-themes

# Development Workflow

## Commands

| Command | Action |
|---|---|
| `bun dev` | Start dev server |
| `bun run build` | Production build |
| `bun run lint` | Biome check (always run before commit) |
| `bun run format` | Biome format --write |
| `bun run typecheck` | tsc --noEmit (always run before commit) |

## Branch Strategy

- Branch from `main` for feature work
- Branch name pattern: `{scope}-{feature}` (e.g. `supabase-auth-and-landing-page`)
- PRs merge back into `main`

## Code Quality

- **Primary linter/formatter:** Biome (check before every commit)
  - Recommended rules + next + react domains enabled
  - VCS integration on (respects .gitignore)
- **TypeScript:** Strict mode, `tsc --noEmit` before commit
- **Secondary linter:** ESLint with `eslint-config-next`
- **No test runner configured yet**

## Project Structure

```
├── app/
│   ├── (auth)/             # Auth route group (centered card layout)
│   │   ├── layout.tsx
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   ├── update-password/
│   │   ├── sign-up-success/
│   │   ├── error/
│   │   └── confirm/route.ts
│   ├── (root)/             # Landing page route group
│   │   └── page.tsx
│   ├── auth/callback/route.ts
│   ├── api/
│   ├── layout.tsx          # Root layout (ThemeProvider, AppProviders, Analytics, fonts)
│   ├── global-error.tsx    # Sentry global error boundary
│   └── globals.css
├── components/
│   ├── auth/               # 11 auth components (login-form, signup-form, etc.)
│   ├── landing/            # 5 landing page sections
│   ├── providers/          # AppProviders, AuthQuerySync
│   ├── theme/              # ThemeProvider, ThemeMenuSection
│   ├── devtools/           # TanStack devtools (dev only)
│   └── ui/                 # 47 shadcn/ui components (do not edit by hand)
├── hooks/
│   ├── mutations/          # use-auth-mutations (6 TanStack Query mutations)
│   ├── use-user.ts         # useUser() — React Query wrapper
│   └── use-mobile.ts       # useIsMobile() — 768px breakpoint
├── lib/
│   ├── supabase/           # Client & server Supabase helpers
│   ├── auth/               # redirect.ts, sentry.ts
│   ├── queries/            # Auth API call functions
│   ├── utils.ts            # cn() utility
│   ├── validation.ts       # Arktype schemas (login, signup, etc.)
│   ├── validation-adapters.ts
│   ├── auth-errors.ts      # Error code→message map
│   ├── query-client.ts     # Singleton QueryClient
│   └── query-keys.ts       # Centralized query key factory
├── public/                 # Static assets, images
├── supabase/
│   ├── config.toml         # Local Supabase config
│   └── migrations/         # DB migrations (empty)
├── AGENTS.md
├── biome.json
├── components.json         # shadcn/ui config (Radix Nova, Tabler Icons)
├── database.types.ts       # Auto-generated Supabase types (empty — no tables yet)
├── env.ts                  # Runtime env validation (t3-env + arktype)
├── instrumentation.ts      # Server/edge Sentry init
├── instrumentation-client.ts # Client Sentry init (Replay, Feedback, tracing)
├── next.config.ts          # Sentry source maps, Cron, tree-shaking
├── postcss.config.mjs      # @tailwindcss/postcss
├── proxy.ts                # Next.js middleware (Supabase session)
├── sentry.client.config.ts
├── sentry.server.config.ts
├── sentry.edge.config.ts
└── tsconfig.json
```

## Conventions

- **Imports:** Use `@/` path alias (e.g. `@/components/ui/button`)
- **shadcn/ui components:** Installed via `bunx --bun shadcn@latest add <name>`, placed in `components/ui/`, never edited directly
- **Supabase types:** Auto-generated in `database.types.ts`, do not edit by hand
- **Contributing:** No formal process yet; open PRs, keep changes focused
